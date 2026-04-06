# CEO Hosting U Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the CEO Hosting U website to match Carlos's launch brief — new branding, restructured homepage, fixed booking flow with real pricing, VIP funnel, and updated navigation.

**Architecture:** Incremental modification of existing Next.js 16 App Router site. Replace homepage sections, update navigation/footer, fix the Hospitable booking API integration to use real prices, add VIP pages. No new frameworks or major dependencies.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Hospitable API, TypeScript

---

## File Map

### New Files
- `src/components/home/HeroSection.tsx` — New hero with headline + property photo
- `src/components/home/TriadAuthority.tsx` — Triad badge + local authority section
- `src/components/home/ServiceCards.tsx` — 3-card "What We Do" section
- `src/components/home/SmartSystems.tsx` — Smart Systems badge + automation description
- `src/components/home/VipClub.tsx` — VIP club CTA section
- `src/components/home/FinalCta.tsx` — "Ready to Get Started?" section
- `src/app/vip/page.tsx` — VIP signup form page
- `src/app/vip/thank-you/page.tsx` — VIP thank-you page
- `src/app/api/vip/route.ts` — VIP form submission API handler
- `public/images/branding/` — Logo assets directory (ceo-hosting-u-logo.png, triad-badge.png, smart-systems-badge.png)

### Modified Files
- `src/app/page.tsx` — Replace homepage section imports
- `src/components/layout/Header.tsx` — New nav items, image logo
- `src/components/layout/Footer.tsx` — Restructured footer with contact/about info
- `src/app/layout.tsx` — Update metadata, OG tags, brand name
- `src/app/api/book/route.ts` — Fix hardcoded pricing
- `src/components/properties/BookingCalendar.tsx` — Add cancellation policy, fix brand name
- `src/app/renovation/page.tsx` — Replace placeholder cards
- `src/app/ai-automation/page.tsx` — Fix brand name
- `src/app/contact/page.tsx` — Fix brand name
- `src/app/about/page.tsx` — Fix brand name
- `src/app/property-management/page.tsx` — Fix brand name

### Deleted Files (after replacement)
- `src/components/home/Hero.tsx` — Replaced by HeroSection.tsx
- `src/components/home/WhoWeServe.tsx` — No longer used
- `src/components/home/FeaturedProperties.tsx` — No longer used
- `src/components/home/WhyBookDirect.tsx` — No longer used
- `src/components/home/AboutPreview.tsx` — No longer used
- `src/components/home/OwnerCTA.tsx` — No longer used

---

## Task 1: Brand Name Fix — Site-Wide Rename

**Files:**
- Modify: `src/app/layout.tsx:17-39` (metadata)
- Modify: `src/components/layout/Header.tsx:61-73,139-148` (logo text)
- Modify: `src/components/layout/Footer.tsx:21-44` (footer logo text)
- Modify: `src/components/properties/BookingCalendar.tsx:435` (booking confirmation)
- Modify: All page files with "HostingYou" references

- [ ] **Step 1: Find all occurrences of "HostingYou" in the codebase**

Run: `grep -r "HostingYou\|Hosting You\|HostingU\|hostingyou\|hosting-you" src/ --include="*.tsx" --include="*.ts" -l`

This will identify every file that needs updating.

- [ ] **Step 2: Update layout.tsx metadata**

In `src/app/layout.tsx`, change the metadata object:

```tsx
export const metadata: Metadata = {
  title: {
    template: "%s | CEO Hosting U",
    default: "CEO Hosting U | Furnished Housing & Property Management in the Triad",
  },
  description:
    "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.",
  keywords: [
    "furnished housing triad nc",
    "short term rental lexington nc",
    "property management triad",
    "corporate housing greensboro",
    "insurance housing winston-salem",
    "CEO Hosting U",
  ],
  openGraph: {
    title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
    description:
      "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
    type: "website",
    images: ["/images/og-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
    description:
      "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
    images: ["/images/og-preview.png"],
  },
};
```

- [ ] **Step 3: Update Header.tsx logo text**

In `src/components/layout/Header.tsx`, find the desktop logo rendering (~line 61-73) and mobile logo (~line 139-148). Replace all instances of "You" with "U" in the logo text spans:

Desktop logo (around line 69):
```tsx
<span className="text-[#d4a847] font-bold">CEO</span>{" "}
<span className={`font-bold ${useTransparent ? "text-white" : "text-[#065f46]"}`}>Hosting</span>
<span className="text-[#d4a847] font-bold"> U</span>
```

Mobile logo (around line 143):
```tsx
<span className="text-[#d4a847] font-bold">CEO</span>{" "}
<span className="text-[#065f46] font-bold">Hosting</span>
<span className="text-[#d4a847] font-bold"> U</span>
```

- [ ] **Step 4: Update Footer.tsx logo text**

In `src/components/layout/Footer.tsx`, find the logo section (~line 24-28) and update:

```tsx
<span className="text-[#d4a847] font-bold">CEO</span>{" "}
<span className="text-[#065f46] font-bold">Hosting</span>
<span className="text-[#d4a847] font-bold"> U</span>
```

Also update the copyright line (~line 112):
```tsx
© {new Date().getFullYear()} CEO Hosting U. All rights reserved.
```

- [ ] **Step 5: Update BookingCalendar.tsx confirmation text**

In `src/components/properties/BookingCalendar.tsx`, line 435:
```tsx
<p className="mt-3 text-center text-[11px] text-gray-400">
  Your reservation will be managed through CEO Hosting U
</p>
```

- [ ] **Step 6: Update remaining page files**

In each page file, search for "HostingYou" or "HostingU" and replace with "Hosting U":
- `src/app/about/page.tsx`
- `src/app/renovation/page.tsx`
- `src/app/ai-automation/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/property-management/page.tsx`
- `src/app/properties/page.tsx`
- `src/app/properties/[slug]/page.tsx`

- [ ] **Step 7: Verify no remaining instances**

Run: `grep -r "HostingYou" src/ --include="*.tsx" --include="*.ts"`

Expected: No results.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "fix: rename CEO HostingYou to CEO Hosting U site-wide"
```

---

## Task 2: Extract Logo Assets from PDF

**Files:**
- Create: `public/images/branding/ceo-hosting-u-logo.png`
- Create: `public/images/branding/triad-badge.png`
- Create: `public/images/branding/smart-systems-badge.png`

- [ ] **Step 1: Create branding directory**

```bash
mkdir -p public/images/branding
```

- [ ] **Step 2: Extract logos from the PDF**

Use an image extraction tool or manually screenshot/export the following from `_DealOs.pdf`:

1. **CEO Hosting U logo** (PDF page 7 or 8 — the standalone logo without "Furnished Housing" tagline). This is the clean version with the house silhouette, circuit nodes, crane, and "CEO Hosting U" text with 5 gold stars on a green banner.

2. **Triad badge** (PDF page 6 — the "TRIAD NORTH CAROLINA" shield badge with skyline, train, and NC map).

3. **Smart Systems badge** (PDF page 1 — the "SMART SYSTEMS BY CEO HOSTING U" shield badge with house and circuit board design).

Save each as PNG with transparent background if possible. Target dimensions:
- Logo: ~400px wide
- Triad badge: ~400px wide
- Smart Systems badge: ~400px wide

- [ ] **Step 3: Optimize images**

If available, run through an image optimizer:
```bash
npx sharp-cli -i public/images/branding/*.png -o public/images/branding/ --resize 400
```

Or use any PNG optimization tool to keep file sizes reasonable (<200KB each).

- [ ] **Step 4: Commit**

```bash
git add public/images/branding/
git commit -m "feat: add CEO Hosting U brand assets (logo, triad badge, smart systems badge)"
```

---

## Task 3: Update Navigation

**Files:**
- Modify: `src/components/layout/Header.tsx:13-20` (NAV_ITEMS), `61-73` (desktop logo), `92-101` (CTA button)

- [ ] **Step 1: Update NAV_ITEMS array**

In `src/components/layout/Header.tsx`, replace lines 13-20:

```tsx
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Management", href: "/property-management" },
  { label: "Renovation", href: "/renovation" },
];
```

- [ ] **Step 2: Update the CTA button text**

Find the "Book a stay" button (~line 92-101) and change it:

```tsx
<Link
  href="/properties"
  className={`hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
    useTransparent
      ? "bg-white text-[#065f46] hover:bg-white/90"
      : "bg-[#065f46] text-white hover:bg-[#065f46]/90"
  }`}
>
  Book Now
</Link>
```

- [ ] **Step 3: Update the desktop logo to use image**

Replace the text-based logo in the desktop section (~lines 61-73) with the image logo:

```tsx
<Link href="/" className="flex items-center gap-2">
  <Image
    src="/images/branding/ceo-hosting-u-logo.png"
    alt="CEO Hosting U"
    width={160}
    height={48}
    className="h-10 w-auto"
    priority
  />
</Link>
```

Add `import Image from "next/image";` at the top of the file if not already present.

- [ ] **Step 4: Update the mobile logo similarly**

Replace the mobile logo section (~lines 139-148):

```tsx
<Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
  <Image
    src="/images/branding/ceo-hosting-u-logo.png"
    alt="CEO Hosting U"
    width={140}
    height={42}
    className="h-9 w-auto"
  />
</Link>
```

- [ ] **Step 5: Update mobile menu CTA button text**

Find the mobile "Book a stay" button in the mobile menu and change to "Book Now" pointing to `/properties`.

- [ ] **Step 6: Verify navigation renders**

Run: `npm run dev`

Check desktop and mobile nav in browser. Verify:
- Logo image loads
- 4 nav items: Home, Properties, Management, Renovation
- "Book Now" CTA button links to /properties
- Mobile menu works

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: update navigation to match launch brief (Home, Properties, Management, Renovation, Book Now)"
```

---

## Task 4: Restructure Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx` (full rewrite of content)

- [ ] **Step 1: Rewrite Footer.tsx**

Replace the full content of `src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const SERVICES_LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "Property Management", href: "/property-management" },
  { label: "Renovation", href: "/renovation" },
  { label: "AI & Automation", href: "/ai-automation" },
];

const Footer = () => {
  return (
    <footer className="bg-[#022c22] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/branding/ceo-hosting-u-logo.png"
                alt="CEO Hosting U"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Family-owned. Professionally operated. Furnished housing and
              property management in the North Carolina Triad.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <a href="mailto:Mizeenterprise1@gmail.com" className="hover:text-white transition-colors">
                  Mizeenterprise1@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <a href="tel:+13368835635" className="hover:text-white transition-colors">
                  (336) 883-5635
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <span>Lexington, NC — Serving the Triad</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Book a Stay
                </Link>
              </li>
              <li>
                <Link
                  href="/vip"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Join VIP Club
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CEO Hosting U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Verify footer renders**

Run dev server and check footer shows 4 columns with contact info, phone number, and VIP link.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: restructure footer with contact info, phone, VIP link"
```

---

## Task 5: Homepage — New Sections

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/TriadAuthority.tsx`
- Create: `src/components/home/ServiceCards.tsx`
- Create: `src/components/home/SmartSystems.tsx`
- Create: `src/components/home/VipClub.tsx`
- Create: `src/components/home/FinalCta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left — Copy */}
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Furnished Housing &{" "}
              <span className="text-[#065f46]">Property Management</span>{" "}
              in the Triad
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              For Travelers, Homeowners & Investors
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Short-term · Mid-term · Insurance Housing · Investor Solutions
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
              >
                Book a Stay
              </Link>
              <Link
                href="/property-management"
                className="inline-flex items-center rounded-lg border-2 border-[#065f46] px-6 py-3 text-sm font-semibold text-[#065f46] transition-all hover:bg-[#065f46]/5"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Right — Property Photo */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/properties/salisbury-unit-a/living-room.avif"
              alt="Bright furnished living room in the Triad"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

- [ ] **Step 2: Create TriadAuthority.tsx**

```tsx
import Image from "next/image";

const TriadAuthority = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Triad Badge */}
          <div className="flex-shrink-0">
            <Image
              src="/images/branding/triad-badge.png"
              alt="Triad North Carolina"
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-[#065f46]">
              Proudly Serving the North Carolina Triad
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#065f46]">
              Winston-Salem · Greensboro · High Point · Lexington
            </p>
            <p className="mt-3 max-w-xl text-gray-600 leading-relaxed">
              Locally based in Lexington, CEO Hosting U serves the Triad with
              furnished housing, property management, renovation, and partnership
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriadAuthority;
```

- [ ] **Step 3: Create ServiceCards.tsx**

```tsx
import Link from "next/link";
import { Home, KeyRound, HardHat } from "lucide-react";

const services = [
  {
    title: "Furnished Housing",
    icon: Home,
    bullets: ["Short- and mid-term stays", "Direct booking focus"],
    button: { label: "Book a Stay", href: "/properties" },
  },
  {
    title: "Property Management",
    icon: KeyRound,
    bullets: ["Listing optimization", "Guest messaging + cleaning"],
    button: { label: "Learn More", href: "/property-management" },
  },
  {
    title: "Renovation + Partnerships",
    icon: HardHat,
    bullets: ["Construction collaborations", "Value-add project support"],
    button: { label: "Learn More", href: "/renovation" },
  },
];

const ServiceCards = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#d4a847]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#065f46]/10">
                  <Icon className="h-7 w-7 text-[#065f46]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center justify-center gap-2 text-sm text-gray-500"
                    >
                      <span className="text-[#065f46]">&#10003;</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.button.href}
                  className="mt-6 inline-flex items-center rounded-lg bg-[#065f46] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#065f46]/90"
                >
                  {service.button.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
```

- [ ] **Step 4: Create SmartSystems.tsx**

```tsx
import Link from "next/link";
import Image from "next/image";

const SmartSystems = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Automate With Smart Systems
        </h2>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-8 md:flex-row">
          {/* Smart Systems Badge */}
          <div className="flex-shrink-0">
            <Image
              src="/images/branding/smart-systems-badge.png"
              alt="Smart Systems by CEO Hosting U"
              width={160}
              height={160}
              className="h-36 w-36 object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-gray-600 leading-relaxed">
              CEO Hosting U helps businesses and property operations become more
              automated through AI, CRM workflows, follow-up systems, data
              tracking, and lead capture.
            </p>
            <Link
              href="/ai-automation"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#065f46] transition-colors hover:text-[#065f46]/80"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSystems;
```

- [ ] **Step 5: Create VipClub.tsx**

```tsx
import Link from "next/link";

const VipClub = () => {
  return (
    <section className="bg-[#f8f6f0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              CEO Hosting U VIP Club
            </h2>
            <p className="mt-2 max-w-lg text-gray-600">
              Join the VIP list for exclusive direct-booking discounts, priority
              access to open dates, and early notifications on new properties.
            </p>
          </div>
          <Link
            href="/vip"
            className="inline-flex flex-shrink-0 items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
          >
            Join VIP + Save 15%
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VipClub;
```

- [ ] **Step 6: Create FinalCta.tsx**

```tsx
import Link from "next/link";

const FinalCta = () => {
  return (
    <section className="bg-[#065f46]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+13368835635"
            className="inline-flex items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
          >
            Call Now
          </a>
          <Link
            href="/property-management#consultation"
            className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Submit Property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
```

- [ ] **Step 7: Update page.tsx to use new sections**

Replace `src/app/page.tsx`:

```tsx
import HeroSection from "@/components/home/HeroSection";
import TriadAuthority from "@/components/home/TriadAuthority";
import ServiceCards from "@/components/home/ServiceCards";
import SmartSystems from "@/components/home/SmartSystems";
import VipClub from "@/components/home/VipClub";
import FinalCta from "@/components/home/FinalCta";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TriadAuthority />
      <ServiceCards />
      <SmartSystems />
      <VipClub />
      <FinalCta />
    </>
  );
};

export default HomePage;
```

- [ ] **Step 8: Delete old homepage components**

```bash
rm src/components/home/Hero.tsx
rm src/components/home/WhoWeServe.tsx
rm src/components/home/FeaturedProperties.tsx
rm src/components/home/WhyBookDirect.tsx
rm src/components/home/AboutPreview.tsx
rm src/components/home/OwnerCTA.tsx
```

- [ ] **Step 9: Verify homepage renders**

Run: `npm run dev`

Check the homepage in browser. Verify all 6 sections render in order, images load, links work.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: redesign homepage to match launch brief (hero, triad, services, smart systems, VIP, CTA)"
```

---

## Task 6: Fix Booking Flow — Real Pricing

**Files:**
- Modify: `src/app/api/book/route.ts:48-92` (calendar fetch + pricing)

- [ ] **Step 1: Update the booking API to fetch and use real prices**

In `src/app/api/book/route.ts`, replace the calendar check and financials section (lines 48-92) with:

```tsx
    // Fetch calendar data to check availability AND get real pricing
    const calendarRes = await fetch(
      `${BASE_URL}/properties/${propertyId}/calendar?start_date=${checkIn}&end_date=${checkOut}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HOSPITABLE_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    if (!calendarRes.ok) {
      console.error("Failed to fetch calendar for pricing:", calendarRes.status);
      return NextResponse.json(
        { error: "Unable to verify availability. Please try again." },
        { status: 502 }
      );
    }

    const calendarData = await calendarRes.json();
    const days = calendarData.data?.days ?? [];

    // Check availability
    const unavailable = days.filter(
      (d: { status: { available: boolean } }) => !d.status.available
    );
    if (unavailable.length > 0) {
      return NextResponse.json(
        { error: "Some selected dates are unavailable. Please choose different dates." },
        { status: 409 }
      );
    }

    // Calculate real total from Hospitable's per-night pricing
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let totalAccommodation = 0;
    for (const day of days) {
      if (day.price?.amount) {
        totalAccommodation += day.price.amount;
      }
    }

    if (totalAccommodation === 0) {
      console.error("No pricing data available for selected dates");
      return NextResponse.json(
        { error: "Pricing unavailable for these dates. Please try again or contact us." },
        { status: 400 }
      );
    }

    const hospitable_body = {
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests: { adults: guests },
      guest: {
        first_name: firstName,
        last_name: lastName,
        email,
        ...(phone ? { phone } : {}),
      },
      language: "en",
      financials: {
        currency: "USD",
        accommodation: totalAccommodation,
      },
    };
```

- [ ] **Step 2: Verify the fix**

The key change is line `accommodation: totalAccommodation` instead of `accommodation: nights * 10000`. The `totalAccommodation` is the sum of `day.price.amount` values from Hospitable's calendar, which are the real nightly prices in cents.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/book/route.ts
git commit -m "fix: use real Hospitable pricing instead of hardcoded $100/night"
```

---

## Task 7: Add Cancellation Policy & Reservation Management to Booking

**Files:**
- Modify: `src/components/properties/BookingCalendar.tsx`

- [ ] **Step 1: Add cancellation policy display before the confirm button**

In `src/components/properties/BookingCalendar.tsx`, in the `step === "details"` section, add a cancellation policy notice between the guest count selector and the error display (before line 411):

```tsx
          {/* Cancellation Policy */}
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3">
            <p className="text-xs font-semibold text-amber-800">Cancellation Policy</p>
            <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
              <li>7–30 days before check-in: 50% refund</li>
              <li>Less than 7 days before check-in: Non-refundable</li>
            </ul>
          </div>
```

- [ ] **Step 2: Update the booking success view with reservation management link**

In the `step === "confirm" && bookingStatus === "success"` section (around lines 275-299), add a reservation management note after the email confirmation text:

```tsx
        <p className="mt-3 text-xs text-gray-400">
          A confirmation will be sent to {email}
        </p>
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Need to cancel or reschedule? Check your confirmation email for a link to manage your reservation.
          </p>
        </div>
```

- [ ] **Step 3: Verify changes render**

Run dev server. Navigate to a property, select dates, proceed to the details step. Verify:
- Cancellation policy is visible before confirming
- After booking, management info appears

- [ ] **Step 4: Commit**

```bash
git add src/components/properties/BookingCalendar.tsx
git commit -m "feat: add cancellation policy display and reservation management info to booking flow"
```

---

## Task 8: VIP Funnel — API Route + Pages

**Files:**
- Create: `src/app/api/vip/route.ts`
- Create: `src/app/vip/page.tsx`
- Create: `src/app/vip/thank-you/page.tsx`

- [ ] **Step 1: Create VIP API route**

Create `src/app/api/vip/route.ts`:

```tsx
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { firstName, email, phone, emailConsent, smsConsent } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { error: "First name, email, and phone are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const submission = {
      id: randomUUID(),
      type: "vip",
      firstName,
      email,
      phone,
      emailConsent: !!emailConsent,
      smsConsent: !!smsConsent,
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data", "submissions");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
      path.join(dataDir, `${submission.id}.json`),
      JSON.stringify(submission, null, 2)
    );

    console.log(`VIP signup received: ${firstName} (${email})`);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("VIP API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};
```

- [ ] **Step 2: Create VIP signup page**

Create `src/app/vip/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Gift } from "lucide-react";

const VipPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    emailConsent: false,
    smsConsent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/vip/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a847]/10">
            <Gift className="h-7 w-7 text-[#d4a847]" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Join the CEO Hosting U VIP List
          </h1>
          <p className="mt-3 text-gray-600">
            Save on future direct bookings + get priority access to open dates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="vip-first-name" className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="vip-first-name"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label htmlFor="vip-email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="vip-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="vip-phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="vip-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailConsent}
                onChange={(e) => setFormData({ ...formData, emailConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#065f46] focus:ring-[#065f46]"
              />
              <span className="text-sm text-gray-600">
                I agree to receive email offers and updates from CEO Hosting U
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.smsConsent}
                onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#065f46] focus:ring-[#065f46]"
              />
              <span className="text-sm text-gray-600">
                I agree to receive text messages from CEO Hosting U
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the VIP List"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VipPage;
```

- [ ] **Step 3: Create VIP thank-you page**

Create `src/app/vip/thank-you/page.tsx`:

```tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const VipThankYouPage = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#065f46]/10">
          <CheckCircle className="h-8 w-8 text-[#065f46]" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Welcome to the VIP List!
        </h1>
        <p className="mt-4 text-gray-600">
          You&apos;re now a CEO Hosting U VIP member. Enjoy 15% off your next
          direct booking and priority access to open dates.
        </p>
        <Link
          href="/properties"
          className="mt-8 inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
        >
          Browse Properties & Book Direct
        </Link>
      </div>
    </section>
  );
};

export default VipThankYouPage;
```

- [ ] **Step 4: Verify VIP flow**

Run dev server. Go to `/vip`, fill in the form, submit. Verify:
- Form validates required fields
- Redirect to `/vip/thank-you`
- JSON file saved in `data/submissions/`

- [ ] **Step 5: Commit**

```bash
git add src/app/api/vip/route.ts src/app/vip/
git commit -m "feat: add VIP signup funnel with form, API, and thank-you page"
```

---

## Task 9: Renovation Page — Replace Placeholders

**Files:**
- Modify: `src/app/renovation/page.tsx:117-148` (before/after gallery)

- [ ] **Step 1: Replace placeholder gallery with CTA section**

In `src/app/renovation/page.tsx`, replace the before/after gallery section (lines 117-148) with a project inquiry CTA:

```tsx
        {/* Project Gallery / CTA */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Our Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            We partner with property owners across the Triad to deliver
            renovation projects that increase value and rental performance.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Kitchen & Bath Remodels",
                desc: "Modern upgrades that increase property value and guest satisfaction.",
              },
              {
                title: "Full Property Renovations",
                desc: "End-to-end project management for fix & flip or rental conversion.",
              },
              {
                title: "Value-Add Improvements",
                desc: "Strategic upgrades designed to maximize return on investment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
```

Make sure `Link` is imported from `next/link` at the top of the file.

- [ ] **Step 2: Update any "HostingYou" references on the page**

Search the renovation page for any remaining brand name references and fix them.

- [ ] **Step 3: Verify the page renders**

Run dev server, navigate to `/renovation`. No more "Photos Coming Soon" placeholders.

- [ ] **Step 4: Commit**

```bash
git add src/app/renovation/page.tsx
git commit -m "fix: replace renovation page placeholder gallery with project CTA cards"
```

---

## Task 10: Open Graph Social Preview

**Files:**
- Modify: `src/app/layout.tsx` (already done in Task 1, verify OG tags)
- Create: `public/images/og-preview.png`

- [ ] **Step 1: Create OG preview image**

Create a 1200x630 social preview image. This can be done with:
- A design tool (Figma, Canva)
- Or programmatically using the CEO Hosting U logo + a property photo + tagline text

For now, create a simple placeholder by compositing the logo over a property image. The image should include:
- CEO Hosting U logo
- "Furnished Housing & Property Management in the Triad"
- A bright property photo as background

Save as `public/images/og-preview.png`.

- [ ] **Step 2: Verify OG tags in layout.tsx**

Confirm that the metadata in `src/app/layout.tsx` (updated in Task 1) includes:
```tsx
openGraph: {
  title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
  description: "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
  type: "website",
  images: ["/images/og-preview.png"],
},
twitter: {
  card: "summary_large_image",
  title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
  description: "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
  images: ["/images/og-preview.png"],
},
```

- [ ] **Step 3: Commit**

```bash
git add public/images/og-preview.png src/app/layout.tsx
git commit -m "feat: add Open Graph social preview image and meta tags"
```

---

## Task 11: Final Build Verification

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Build completes with no errors. Fix any TypeScript or import errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors. Fix any that appear.

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev`

Test all pages:
- [ ] Homepage: 6 sections render, all links work
- [ ] `/properties`: Page loads, "Book Now" nav item is active
- [ ] `/property-management`: Page loads from nav
- [ ] `/renovation`: No placeholders, project cards show
- [ ] `/ai-automation`: Accessible from homepage Smart Systems link
- [ ] `/contact`: Accessible (not in nav, but page works)
- [ ] `/about`: Accessible (not in nav, but page works)
- [ ] `/vip`: Form works, submits, redirects to thank-you
- [ ] `/vip/thank-you`: Shows confirmation with booking link
- [ ] Property detail pages: Booking calendar shows cancellation policy, real prices
- [ ] Footer: 4 columns, phone number, email, VIP link
- [ ] Mobile nav: 4 items + Book Now CTA
- [ ] Brand name: "CEO Hosting U" everywhere, no "HostingYou"

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address build and smoke test issues"
```
