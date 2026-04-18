# Form Submissions in Sanity CMS — Design

**Status:** Approved, ready for implementation plan
**Date:** 2026-04-18
**Owner:** Monty
**Context:** Contact and VIP forms currently POST to API routes that write JSON files to local disk. On Vercel/serverless that filesystem is ephemeral — Carlos (site owner) has no way to see submissions. This design wires both forms into Sanity so Carlos sees a unified submission inbox in the Studio.

## Goals

- Every contact and VIP form submission becomes a `formSubmission` document in Sanity.
- Carlos can triage submissions from the Studio: see newest first, mark status (`new` / `contacted` / `archived`), and jot follow-up notes.
- Basic abuse protection so the public endpoints don't get overrun by bots.
- Thank-you copy for both forms is CMS-editable (VIP already is; bring Contact to parity).

## Non-goals

- No email notifications to Carlos on new submissions. He'll check the Studio. (May revisit.)
- No admin dashboard outside of Sanity Studio.
- No Upstash/Redis or other external infra for rate limiting.
- No migration of existing file-based submissions. The `data/submissions/` writes never persisted in production, so there's nothing to preserve.

## Architecture

```
[Contact Form]  ──► /api/contact ─┐
                                  │
[VIP Form]      ──► /api/vip     ─┤
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │  Submission handler     │
                    │  1. Honeypot check      │
                    │  2. Validate fields     │
                    │  3. Rate-limit check    │  ◄── queries Sanity for recent
                    │     (ipHash, 1h window) │      submissions from same ipHash
                    │  4. Write formSubmission│
                    └─────────────┬───────────┘
                                  │
                                  ▼
                    Sanity (writeClient, SANITY_API_WRITE_TOKEN)
                                  │
                                  ▼
                    [Carlos] ──► Studio ──► "Submissions" list
                                              ├─ filter by status
                                              ├─ edit status + notes
                                              └─ sorted newest first
```

The existing Sanity read path (CDN client in [src/sanity/lib/client.ts](src/sanity/lib/client.ts)) is untouched. A second, write-capable client is added for server-only use.

## Schema — `formSubmission`

New document type at `studio-mizeent/schemaTypes/documents/formSubmission.ts`, registered in [schemaTypes/index.ts](studio-mizeent/schemaTypes/index.ts).

```ts
formSubmission {
  // Type & metadata
  formType:      "contact" | "vip"                          // required
  submittedAt:   datetime                                   // required, server-set
  status:        "new" | "contacted" | "archived"           // default "new"
  notes:         text                                       // Carlos's follow-up notes

  // Shared
  email:         string                                     // required
  phone:         string

  // Contact-only (when formType === "contact")
  name:          string
  message:       text
  inquiryType:   "guest" | "owner" | "service"

  // VIP-only (when formType === "vip")
  firstName:     string
  emailConsent:  boolean
  smsConsent:    boolean

  // Abuse tracking — hidden from default list view
  ipHash:        string       // SHA-256(IP + fixed server-side salt)
  userAgent:     string
}
```

**Validation rules**

- `email`, `submittedAt`, `formType`, `status` required.
- When `formType === "contact"`: `name` and `message` required. Handled via conditional `validation` in the schema.
- When `formType === "vip"`: `firstName` and `phone` required.

**Studio preview**

- Title: `name || firstName` (whichever exists).
- Subtitle: `email · formType · status · relative date`.
- A small status pill helps Carlos scan.

**Orderings**

- Default: `submittedAt desc` (newest first).
- Secondary: group by `status` for triage mode.

## Studio structure

Add a "Submissions" list item to [studio-mizeent/structure.ts](studio-mizeent/structure.ts), placed **after the divider below VIP page** (i.e., at the top of the collections section, above Properties and Testimonials). That puts Carlos's inbox in the first place he'd look after opening the Studio.

## Contact thank-you parity

VIP already has CMS-editable thank-you fields in [vipPage.ts](studio-mizeent/schemaTypes/singletons/vipPage.ts#L64-L87) rendered by [/vip/thank-you/page.tsx](src/app/vip/thank-you/page.tsx). Contact's success copy is hardcoded in [ContactForm.tsx:52-67](src/components/ContactForm.tsx#L52-L67).

**Changes:**

1. Add a `thanks` group to [contactPage.ts](studio-mizeent/schemaTypes/singletons/contactPage.ts) with:
   - `thankYouTitle: string` (default: `"Message Sent!"`)
   - `thankYouMessage: text` (default: `"Thank you for reaching out. We'll get back to you within 24 hours."`)
2. Extend the `contactPageQuery` in [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts) to pull these fields.
3. Add them to `DEFAULT_CONTACT_PAGE` in [src/sanity/fallbacks.ts](src/sanity/fallbacks.ts).
4. Pass them from [contact/page.tsx](src/app/contact/page.tsx) into `<ContactForm title={...} message={...} />`.
5. Update [ContactForm.tsx](src/components/ContactForm.tsx) to accept those props and render them in the existing success state. Fall back to hardcoded defaults if props are missing (keeps the component usable without breakage).

The success UX stays identical — same inline green card, just CMS-driven copy.

## Write-capable Sanity client

New file: `src/sanity/lib/writeClient.ts`. Server-only.

```ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
```

**New env var:** `SANITY_API_WRITE_TOKEN` — created in the Sanity project dashboard with **Editor** role (write access, not Admin). Added to `.env.local` for dev and to Vercel project env for prod. **No `NEXT_PUBLIC_` prefix** — this must never ship to the browser.

If the token is missing at runtime, the API routes return a 500 with a clear error (caught by the existing try/catch). The failure surfaces immediately rather than silently dropping submissions.

## API route rewrites

### Shared helper: `src/sanity/lib/submissions.ts`

Centralizes honeypot, rate-limit, ipHash, and document creation so both routes are thin.

```ts
export async function createSubmission(params: {
  formType: "contact" | "vip"
  payload: Record<string, unknown>       // raw form body
  request: NextRequest
}): Promise<{ ok: true; id: string } | { ok: false; status: number; error: string }>
```

Responsibilities:

1. **Honeypot check.** If `payload.website` (or a similar invisible field we add to both forms) is non-empty, return `{ ok: true, id: "honeypot" }` without writing anything. Silent-success — bots shouldn't learn they were caught.
2. **Extract IP** from `request.headers.get("x-forwarded-for")` (take the first IP if comma-separated), fall back to `request.headers.get("x-real-ip")`. Hash as `SHA-256(ip + SUBMISSION_IP_SALT)`. `SUBMISSION_IP_SALT` is a new env var (any random string); if missing, use a hardcoded fallback and log a warning — not worth blocking submissions over.
3. **Rate-limit check.** GROQ query: `count(*[_type == "formSubmission" && ipHash == $ipHash && submittedAt > $since])` where `$since = now - 1h`. If count ≥ 5, return `{ ok: false, status: 429, error: "Too many submissions. Please try again later." }`.
4. **Validate** per-formType required fields.
5. **Create document** via `writeClient.create({...})`. Return the document's `_id`.

### `/api/contact/route.ts`

Becomes ~20 lines. Accepts the existing shape, maps to `formSubmission` fields (`name`, `email`, `phone`, `message`, `inquiryType` from `type`, `formType: "contact"`), calls `createSubmission`. Remove all `fs`/`mkdir`/`writeFile` code. Remove `data/submissions` writes entirely. Keep the success response shape intact so the existing frontend handler doesn't break.

### `/api/vip/route.ts`

Same pattern. Maps `firstName`, `email`, `phone`, `emailConsent`, `smsConsent`, `formType: "vip"`. Remove `fs` code. Keep the `{ success: true, id }` response shape so the VIP form's `router.push("/vip/thank-you")` keeps working.

## Honeypot field

Add a visually-hidden `website` input to both forms:

```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  className="absolute left-[-9999px] h-0 w-0 opacity-0"
/>
```

Real users never interact with it; bots auto-fill every field. The form's submit handler sends its value along with the rest of the payload.

## Rate-limit design notes

- 5 submissions per IP-hash per rolling hour is generous for humans (nobody submits a contact form 5 times an hour) but cuts off most bot loops.
- Storing `ipHash` (not raw IP) keeps us from retaining identifiable network info indefinitely. The hash is deterministic so it still works as a rate-limit key.
- The Sanity query adds one extra read per submission (~50ms). Acceptable — these routes aren't on a hot path.
- If abuse ever gets past this, the next step is Upstash or Vercel Rate Limit middleware. Intentionally out of scope.

## Files changed / created

**Create:**
- `studio-mizeent/schemaTypes/documents/formSubmission.ts`
- `src/sanity/lib/writeClient.ts`
- `src/sanity/lib/submissions.ts`

**Modify:**
- `studio-mizeent/schemaTypes/index.ts` — register `formSubmission`
- `studio-mizeent/structure.ts` — add "Submissions" list item
- `studio-mizeent/schemaTypes/singletons/contactPage.ts` — add `thanks` group + fields
- `src/sanity/lib/queries.ts` — extend `contactPageQuery` with thank-you fields
- `src/sanity/fallbacks.ts` — add thank-you defaults to `DEFAULT_CONTACT_PAGE`
- `src/sanity/types.ts` — add `formSubmission` type and thank-you fields to `ContactPage`
- `src/app/contact/page.tsx` — pass thank-you props to `<ContactForm />`
- `src/components/ContactForm.tsx` — accept props, render in success state, add honeypot
- `src/components/vip/VipForm.tsx` — add honeypot
- `src/app/api/contact/route.ts` — replace fs writes with `createSubmission`
- `src/app/api/vip/route.ts` — replace fs writes with `createSubmission`
- `.env.local` — add `SANITY_API_WRITE_TOKEN` and `SUBMISSION_IP_SALT`

## Testing plan

**Local:**
1. Submit each form with valid data — confirm a `formSubmission` doc appears in Studio with correct fields.
2. Submit with honeypot filled — confirm NO doc created, user sees success.
3. Submit 6 times in a row from same IP — confirm 6th returns 429 and NO doc created.
4. Submit contact form without name — confirm 400 error and NO doc created.
5. Open a submission in Studio, change status to "contacted", add a note — confirm it saves.
6. Edit the contact page's thank-you copy in Studio, submit contact form — confirm success state shows new copy.

**Deploy:**
1. Add `SANITY_API_WRITE_TOKEN` and `SUBMISSION_IP_SALT` to Vercel env.
2. Deploy; submit one real contact and one real VIP from the live site.
3. Confirm both appear in Carlos's Studio inbox.
4. Hand off to Carlos — have him mark one "contacted" and add a note, confirm it sticks.

## Open questions

None at this time. Email notifications were considered and explicitly deferred.
