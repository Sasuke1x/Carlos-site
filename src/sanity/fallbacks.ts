/**
 * Hardcoded fallback values used when Sanity returns null or a partial
 * document. These mirror the values that were baked into the
 * components before this wiring. The site MUST continue to render
 * every section correctly even when Sanity is empty.
 */

import type {
  AboutPage,
  AiAutomationPage,
  ContactPage,
  FooterSettings,
  Homepage,
  ManagementPage,
  RenovationPage,
  SiteSettings,
  VipPage,
} from "./types";

// ---------- Site Settings ----------

export const DEFAULT_SITE_SETTINGS: Required<
  Pick<
    SiteSettings,
    | "siteName"
    | "contactEmail"
    | "contactPhone"
    | "phoneDisplay"
    | "location"
    | "locationDescription"
  >
> &
  SiteSettings = {
  siteName: "CEO Hosting U",
  contactEmail: "Mizeenterprise1@gmail.com",
  contactPhone: "+13368835635",
  phoneDisplay: "(336) 883-5635",
  location: "Lexington, NC",
  locationDescription: "Serving the Triad",
  socialLinks: [],
  defaultSeo: {
    metaTitle:
      "CEO Hosting U | Furnished Housing & Property Management in the Triad",
    metaDescription:
      "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.",
    keywords: [
      "CEO Hosting U",
      "Corporate Housing Lexington NC",
      "Short-Term Rental Triad NC",
      "Furnished Rentals Near Winston-Salem",
      "Lexington NC short term rentals",
      "corporate housing Triad North Carolina",
      "furnished homes Greensboro High Point",
    ],
    noIndex: false,
  },
};

// Fallback logo / badge paths live in /public — components use these
// only when the Sanity image has no asset reference yet.
export const FALLBACK_LOGO_SRC = "/images/branding/ceo-hosting-u-logo.png";
export const FALLBACK_TRIAD_BADGE_SRC = "/images/branding/triad-badge.png";
export const FALLBACK_SMART_SYSTEMS_BADGE_SRC =
  "/images/branding/smart-systems-badge.png";

// ---------- Footer ----------

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  tagline: "Family-owned. Professionally operated.",
  description:
    "Family-owned. Professionally operated. Furnished housing and property management in the North Carolina Triad.",
  servicesLinks: [
    { label: "Properties", href: "/properties" },
    { label: "Property Management", href: "/property-management" },
    { label: "Renovation", href: "/renovation" },
    { label: "AI & Automation", href: "/ai-automation" },
  ],
  quickLinks: [
    { label: "Book a Stay", href: "/properties" },
    { label: "Join VIP Club", href: "/vip" },
    { label: "Contact Us", href: "/contact" },
  ],
  copyrightText: "© {year} CEO Hosting U. All rights reserved.",
  showSocialLinks: true,
};

// ---------- Homepage ----------

export const DEFAULT_HOMEPAGE: Homepage = {
  // Hero
  heroHeadlineStart: "Furnished Housing &",
  heroHeadlineGreen: "Property Management",
  heroHeadlineEnd: "in the Triad",
  heroSubheadline: "For Travelers, Homeowners & Investors",
  heroSupportLine:
    "Short-term · Mid-term · Insurance Housing · Investor Solutions",
  heroPrimaryCtaLabel: "Book a Stay",
  heroPrimaryCtaHref: "/properties",
  heroSecondaryCtaLabel: "Partner With Us",
  heroSecondaryCtaHref: "/property-management",
  heroCarouselSlides: [],

  // Triad
  triadHeading: "Proudly Serving the North Carolina Triad",
  triadCities: "Winston-Salem · Greensboro · High Point · Lexington",
  triadDescription:
    "Locally based in Lexington, CEO Hosting U serves the Triad with furnished housing, property management, renovation, and partnership opportunities.",

  // Services
  serviceCardsTitle: "What We Do",
  serviceCards: [
    {
      title: "Furnished Housing",
      icon: "home",
      bullets: ["Short- and mid-term stays", "Direct booking focus"],
      buttonLabel: "Book a Stay",
      buttonHref: "/properties",
    },
    {
      title: "Property Management",
      icon: "key",
      bullets: ["Listing optimization", "Guest messaging + cleaning"],
      buttonLabel: "Learn More",
      buttonHref: "/property-management",
    },
    {
      title: "Renovation + Partnerships",
      icon: "hardhat",
      bullets: ["Construction collaborations", "Value-add project support"],
      buttonLabel: "Learn More",
      buttonHref: "/renovation",
    },
  ],

  // Smart Systems
  smartSystemsTitle: "Automate With Smart Systems",
  smartSystemsDescription:
    "CEO Hosting U helps businesses and property operations become more automated through AI, CRM workflows, follow-up systems, data tracking, and lead capture.",
  smartSystemsButtonLabel: "Learn More",
  smartSystemsButtonHref: "/ai-automation",

  // VIP
  vipTitle: "CEO Hosting U VIP Club",
  vipDescription:
    "Join the VIP list for exclusive direct-booking discounts, priority access to open dates, and early notifications on new properties.",
  vipButtonLabel: "Join VIP + Save 15%",
  vipButtonHref: "/vip",

  // Final CTA
  finalCtaTitle: "Ready to Get Started?",
  finalCtaCallLabel: "Call Now",
  finalCtaSubmitLabel: "Submit Property",
  finalCtaSubmitHref: "/property-management#consultation",
};

/**
 * Hardcoded fallback slides used when Sanity hasn't filled the
 * heroCarouselSlides array yet. Points at images in /public.
 */
export const DEFAULT_HERO_CAROUSEL = [
  {
    src: "/images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
    name: "Modern 3BR Family Home Near Park",
    slug: "mize-road-retreat",
  },
  {
    src: "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
    name: "Cozy 2BR Condo in Downtown Lexington",
    slug: "downtown-lexington-condo",
  },
  {
    src: "/images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
    name: "Modern 3BR Apartment Near I-85",
    slug: "modern-lexington-apartment",
  },
  {
    src: "/images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
    name: "Family 3BR Retreat with Hot Tub",
    slug: "family-retreat-hot-tub",
  },
];

// ---------- Other page singletons ----------
// These are intentionally minimal — the page components still keep
// their hardcoded copy. Only SEO fallbacks are wired up for now.

export const DEFAULT_ABOUT_PAGE: AboutPage = {
  heroTitle: "About CEO Hosting U",
  heroSubtitle: "Family-owned. Professionally operated.",
};

export const DEFAULT_MANAGEMENT_PAGE: ManagementPage = {
  heroTitle: "Property Management",
};

export const DEFAULT_RENOVATION_PAGE: RenovationPage = {
  heroTitle: "Renovation + Partnerships",
};

export const DEFAULT_AI_AUTOMATION_PAGE: AiAutomationPage = {
  heroTitle: "AI & Automation",
};

export const DEFAULT_CONTACT_PAGE: ContactPage = {
  heroTitle: "Contact Us",
};

export const DEFAULT_VIP_PAGE: VipPage = {
  heroTitle: "CEO Hosting U VIP Club",
  discountPercent: 15,
};
