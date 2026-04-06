# CEO Hosting U Website Redesign — Design Spec

**Date:** 2026-04-05
**Client:** Carlos (CEO Hosting U)
**Source:** Launch Brief PDF + client feedback

---

## 1. Branding

### Name Change
- Rename **"CEO HostingYou"** to **"CEO Hosting U"** site-wide (all components, text, meta tags, alt text)

### Logo Assets
- Extract from provided PDF and place in `/public/images/branding/`:
  - `ceo-hosting-u-logo.png` — main logo (header, footer)
  - `triad-badge.png` — Triad NC badge (homepage local authority section)
  - `smart-systems-badge.png` — Smart Systems badge (homepage AI section, AI page)
- Replace the current text-based logo in Header and Footer with the image logo

### Brand Asset Rules (from brief)
- **Main logo**: header and footer only
- **Triad badge**: "Proudly Serving the North Carolina Triad" section only
- **Smart Systems badge**: AI/automation section and AI page only
- Do NOT stack all badges in the hero

---

## 2. Navigation

### New Structure
```
[CEO Hosting U Logo]   Home   Properties   Management   Renovation   [Book Now]
```

- **Home** → `/`
- **Properties** → `/properties`
- **Management** → `/property-management`
- **Renovation** → `/renovation`
- **Book Now** (CTA button style) → `/properties`

### Removed from Nav
- **AI & Automation** — page stays at `/ai-automation`, linked from Smart Systems homepage section
- **About** — content moves to footer
- **Contact** — contact info (email, location) moves to footer

### Mobile Nav
- Same items in slide-out menu
- "Book Now" as prominent CTA at bottom of mobile menu

---

## 3. Homepage Redesign

Replace all 6 current homepage sections (Hero, WhoWeServe, FeaturedProperties, WhyBookDirect, AboutPreview, OwnerCTA) with the following:

### Section 1: Hero
- **Headline:** "Furnished Housing & Property Management in the Triad"
- **Subheadline:** "For Travelers, Homeowners & Investors"
- **Support line:** "Short-term · Mid-term · Insurance Housing · Investor Solutions"
- **Buttons:** "Book a Stay" (→ `/properties`) and "Partner With Us" (→ `/property-management`)
- **Right side:** Bright interior/home photo from existing property images
- **Style:** Clean, bright background with generous white space. No dark overlays.

### Section 2: Triad Authority
- **Layout:** Triad badge image on left, text on right
- **Heading:** "Proudly Serving the North Carolina Triad"
- **Cities (bold):** Winston-Salem · Greensboro · High Point · Lexington
- **Description:** "Locally based in Lexington, CEO Hosting U serves the Triad with furnished housing, property management, renovation, and partnership opportunities."

### Section 3: What We Do (Service Cards)
- **Title:** "What We Do" with gold accent line
- **3 cards in a row:**

| Card | Title | Bullets | Button |
|------|-------|---------|--------|
| 1 | Furnished Housing | Short- and mid-term stays, Direct booking focus | Book a Stay → `/properties` |
| 2 | Property Management | Listing optimization, Guest messaging + cleaning | Learn More → `/property-management` |
| 3 | Renovation + Partnerships | Construction collaborations, Value-add project support | Learn More → `/renovation` |

- Each card has a relevant icon (use lucide-react icons matching the current site's style)

### Section 4: Automate With Smart Systems
- **Title:** "Automate With Smart Systems"
- **Layout:** Smart Systems badge image on left, text on right
- **Description:** "CEO Hosting U helps businesses and property operations become more automated through AI, CRM workflows, follow-up systems, data tracking, and lead capture."
- **Button:** "Learn More →" → `/ai-automation`
- Keep this visually separate from the housing/property sections

### Section 5: CEO Hosting U VIP Club
- **Layout:** Text left, CTA button right
- **Heading:** "CEO Hosting U VIP Club"
- **Description:** Promote direct-booking discounts, priority access to open dates, early notifications
- **Button:** "Join VIP + Save 15%" → `/vip`
- **Background:** Subtle warm/cream tone to differentiate from other sections

### Section 6: Final CTA
- **Background:** Dark green (#065f46)
- **Headline:** "Ready to Get Started?"
- **Buttons:** "Call Now" (gold, `tel:+13368835635`) and "Submit Property" (outlined white, → `/property-management#consultation`)

---

## 4. Booking Flow Fixes

### Problem
Current booking creates Hospitable reservations with hardcoded pricing (`nights * 10000` = $100/night) and no payment collection. Guests can book without paying.

### Fix: Use Real Hospitable Pricing
- **In `/api/book/route.ts`:** Replace the hardcoded `accommodation: nights * 10000` with the actual nightly prices from Hospitable's calendar API
- Sum the real `priceAmount` values for each night in the selected date range
- The calendar data already contains per-night pricing — use it

### Fix: Payment Collection
- Hospitable handles payment processing when Stripe is connected in their dashboard (already set up)
- Ensure the reservation creation payload includes the correct financial data so Hospitable triggers payment
- The guest receives a payment link from Hospitable after the reservation is created

### Cancellation Policy Display
- Add a cancellation policy section to property detail pages, visible before booking:
  - "Cancellations 7-30 days before check-in: 50% refund"
  - "Cancellations less than 7 days before check-in: Non-refundable"
- Display this in the BookingCalendar component near the "Confirm Booking" button
- Configure the matching policy in Hospitable's dashboard (outside of code scope — Carlos to do)

### Guest Reservation Management
- After successful booking, show a link/info for guests to manage their reservation through Hospitable's guest portal
- Hospitable provides a guest portal where guests can cancel using a one-time password
- Include text: "Need to cancel or reschedule? Manage your reservation [here]" with link to Hospitable guest portal
- **Implementation note:** The exact guest portal URL format needs to be discovered from Hospitable's API response (likely returned in the reservation creation response) or documentation during implementation

### Brand Name Fix
- Replace "CEO HostingYou" with "CEO Hosting U" in the booking confirmation text at `BookingCalendar.tsx:435`

---

## 5. VIP Funnel

### New Page: `/vip`

**Headline:** "Join the CEO Hosting U VIP List"
**Offer:** "Save on future direct bookings + get priority access to open dates"

**Form fields:**
- First Name (required)
- Email (required)
- Phone (required)
- Email consent checkbox: "I agree to receive email offers and updates from CEO Hosting U"
- SMS consent checkbox: "I agree to receive text messages from CEO Hosting U"

**On submit:**
- Save to `/data/submissions/` as JSON (same pattern as contact form) with type: "vip"
- Tag data with `type: "vip"` for future CRM integration
- Redirect to `/vip/thank-you`
- **Note:** Local file storage does not persist between Vercel deployments. This is a known limitation — acceptable for launch, will need a database or CRM integration later

### New Page: `/vip/thank-you`

- Confirmation message
- Direct booking link (→ `/properties`)
- Mention of discount (15% off direct bookings)

### Homepage VIP Section
- Links to `/vip` page via the "Join VIP + Save 15%" button

---

## 6. Footer Restructure

### New Footer Layout
Absorb About and Contact info that was removed from nav:

| Column 1: CEO Hosting U | Column 2: Services | Column 3: Contact | Column 4: Connect |
|---|---|---|---|
| Brief about blurb | Properties | Email: Mizeenterprise1@gmail.com | Social links (if any) |
| "Family-owned. Professionally operated." | Property Management | Location: Lexington, NC | VIP signup link |
| | Renovation | Serving the Triad | |
| | AI & Automation | | |

- Main logo in footer header
- Copyright: "© 2026 CEO Hosting U. All rights reserved."

---

## 7. Page Cleanup

### Renovation Page (`/renovation`)
- Replace the 3 "Photos Coming Soon" placeholder cards in the before/after gallery
- Options: use property transformation photos from existing assets, or replace the placeholder section with a different CTA (e.g., "Have a property to transform? Contact us")
- Keep the 6 service cards and CTA sections as-is

### Contact Page (`/contact`)
- Page remains accessible at `/contact` but is not in the main nav
- No structural changes needed — it still works as a standalone page
- Update any "CEO HostingYou" references

### AI & Automation Page (`/ai-automation`)
- Remains at `/ai-automation`, linked from homepage Smart Systems section
- Keep focused on practical automation systems per the brief
- Update any "CEO HostingYou" references

---

## 8. Open Graph / Social Preview

- Add Open Graph meta tags to the root layout (`/src/app/layout.tsx`):
  - `og:title`: "CEO Hosting U — Furnished Housing & Property Management in the Triad"
  - `og:description`: "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC"
  - `og:image`: Social preview image (logo + home photo + tagline)
  - `og:type`: "website"
  - `twitter:card`: "summary_large_image"
- Create a social preview image at `/public/images/og-preview.png` (1200x630)
  - Main logo + bright home image + "Furnished Housing & Property Management in the Triad"

---

## 9. Out of Scope (For Later)

- CRM integration for VIP form (pending Carlos's decision on CRM platform)
- Hospitable dashboard cancellation policy configuration (Carlos to do manually)
- Email notifications for form submissions
- Migrating property data from hardcoded file to Sanity CMS
- DealOS branding/pages (separate project)
- Persistent database for VIP submissions on Vercel (local file storage won't persist between deployments — revisit with Vercel KV or similar)

---

## Technical Notes

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4 (primary), keep existing color system (green/gold)
- **Deployment:** Vercel
- **CMS:** Sanity (configured but properties still hardcoded — no changes needed)
- **Booking:** Hospitable API (key configured locally and on production)
- **Approach:** Modify existing components, don't rebuild from scratch. The component architecture is sound.
