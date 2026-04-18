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

// ---------- About Page ----------

export const DEFAULT_ABOUT_PAGE: AboutPage = {
  heroTitle: "About Us",
  heroSubtitle: "Family-Owned. Professionally Operated. Built for Comfort.",
  storyTitle: "What We Combine",
  // storyContent and heroDescription are rich text — leave undefined so
  // the page renders its hardcoded paragraphs when Sanity is empty.
  values: [
    {
      icon: "heart",
      title: "Hospitality Principles",
      description:
        "Every decision starts with the guest experience — clean spaces, clear communication, and thoughtful touches.",
    },
    {
      icon: "building",
      title: "Real Estate Expertise",
      description:
        "Deep understanding of property value, market trends, and what makes a rental perform at the highest level.",
    },
    {
      icon: "cog",
      title: "Modern Automation",
      description:
        "Smart systems handle scheduling, pricing, and communication so nothing falls through the cracks.",
    },
    {
      icon: "mappin",
      title: "Local Knowledge",
      description:
        "Rooted in the Triad region with hands-on knowledge of the neighborhoods, regulations, and community.",
    },
  ],
};

// ---------- Property Management Page ----------

export const DEFAULT_MANAGEMENT_PAGE: ManagementPage = {
  heroTitle: "Property Management",
  heroDescription:
    "Full-service short-term and corporate rental management for property owners in the Triad region. From listing optimization to guest communication and cleaning coordination — we take care of everything so you can enjoy consistent, hands-off income.",
  servicesTitle: "What We Handle For You",
  services: [
    {
      icon: "chart",
      title: "Multi-Platform Listing Management",
      description:
        "We list and optimize your property across Airbnb, Vrbo, Booking.com, and more to maximize visibility and bookings.",
    },
    {
      icon: "home",
      title: "Direct Booking Website Exposure",
      description:
        "Your property gets featured on our direct booking platform, reducing commission fees and building your brand.",
    },
    {
      icon: "mail",
      title: "Guest Communication Automation",
      description:
        "Automated yet personal messaging handles inquiries, check-in instructions, and reviews around the clock.",
    },
    {
      icon: "sparkles",
      title: "Professional Cleaning Coordination",
      description:
        "Our vetted cleaning teams ensure every turnover meets hotel-level standards, every single time.",
    },
    {
      icon: "chart",
      title: "Revenue Optimization",
      description:
        "Dynamic pricing, seasonal adjustments, and market analysis keep your property earning at peak performance.",
    },
    {
      icon: "tools",
      title: "In-House Renovation Services",
      description:
        "Need upgrades? Our renovation team handles everything from cosmetic refreshes to full remodels — all in-house.",
    },
  ],
  processTitle: "How It Works",
  processSteps: [],
  consultationCtaTitle: "Request a Consultation",
  consultationCtaDescription:
    "Whether you own one property or several, we'd love to learn about your goals. Fill out the form and a member of our team will reach out within 24 hours to discuss how we can help you earn more with less effort.",
};

// ---------- Renovation Page ----------

export const DEFAULT_RENOVATION_PAGE: RenovationPage = {
  heroTitle: "Renovation & Value-Add Services",
  heroDescription:
    "We specialize in upgrading properties to modern standards through strategic renovations, layout improvements, and cosmetic enhancements designed to increase rental performance and long-term value. Our experience in both construction and rental operations allows us to renovate with performance in mind — not just appearance.",
  servicesTitle: "Our Renovation Services",
  services: [
    {
      icon: "shield",
      title: "Strategic Property Assessment",
      description:
        "We evaluate each property to identify the highest-impact improvements for your budget and goals.",
    },
    {
      icon: "building",
      title: "Layout Optimization",
      description:
        "Reconfigure spaces to maximize usable square footage, improve flow, and increase guest capacity.",
    },
    {
      icon: "sparkles",
      title: "Modern Cosmetic Upgrades",
      description:
        "Fresh finishes, modern fixtures, and curated design choices that photograph beautifully and impress guests.",
    },
    {
      icon: "tools",
      title: "Kitchen & Bath Renovations",
      description:
        "Full kitchen and bathroom remodels that combine style, durability, and functionality for rental properties.",
    },
    {
      icon: "chart",
      title: "Value-Add for Rental Performance",
      description:
        "Every renovation decision is driven by data — we upgrade what moves the needle on nightly rates and occupancy.",
    },
    {
      icon: "hardhat",
      title: "Fix & Flip Project Management",
      description:
        "End-to-end project management for fix-and-flip investments, from acquisition analysis to final sale.",
    },
  ],
  galleryTitle: "Our Work",
  galleryDescription:
    "We partner with property owners across the Triad to deliver renovation projects that increase value and rental performance.",
  galleryItems: [
    {
      title: "Kitchen & Bath Remodels",
      description:
        "Modern upgrades that increase property value and guest satisfaction.",
    },
    {
      title: "Full Property Renovations",
      description:
        "End-to-end project management for fix & flip or rental conversion.",
    },
    {
      title: "Value-Add Improvements",
      description:
        "Strategic upgrades designed to maximize return on investment.",
    },
  ],
  ctaTitle: "Ready to Transform Your Property?",
  ctaDescription:
    "Whether you're preparing a home for short-term rental, planning a flip, or simply want to increase your property's value — we'd love to talk.",
  ctaButtonLabel: "Learn About Our Projects",
  ctaButtonHref: "/contact",
};

// ---------- AI & Automation Page ----------

export const DEFAULT_AI_AUTOMATION_PAGE: AiAutomationPage = {
  heroTitle: "AI & Business Automation Services",
  heroDescription:
    "Helping local businesses run efficiently and modernize operations. We bring enterprise-grade technology solutions to small and mid-sized businesses in the Triad region and beyond.",
  servicesTitle: "Our Services",
  services: [
    {
      icon: "home",
      title: "Website Setup & Development",
      description:
        "Modern, fast, and mobile-responsive websites built to convert visitors into customers.",
    },
    {
      icon: "bot",
      title: "AI Chatbot Integration",
      description:
        "24/7 intelligent chatbots that handle customer inquiries, book appointments, and qualify leads automatically.",
    },
    {
      icon: "chart",
      title: "Marketing Funnels",
      description:
        "Strategic funnels that guide prospects from awareness to action with automated follow-up sequences.",
    },
    {
      icon: "heart",
      title: "CRM Automation",
      description:
        "Streamline your customer relationships with automated workflows, reminders, and pipeline management.",
    },
    {
      icon: "sparkles",
      title: "Social Media Management",
      description:
        "Consistent, branded content across platforms with scheduling, engagement tracking, and performance analytics.",
    },
    {
      icon: "chart",
      title: "Data Analytics & Reporting",
      description:
        "Actionable insights from your business data presented in clear dashboards and automated reports.",
    },
  ],
  processTitle: "How It Works",
  processSteps: [
    {
      step: 1,
      title: "Discovery Call",
      description:
        "We learn about your business, goals, and current pain points to identify the best solutions.",
    },
    {
      step: 2,
      title: "Custom Strategy",
      description:
        "We build a tailored plan with clear timelines, deliverables, and measurable outcomes.",
    },
    {
      step: 3,
      title: "Launch & Optimize",
      description:
        "We implement, test, and continuously refine your systems for maximum performance.",
    },
  ],
  ctaTitle: "Ready to Modernize Your Business?",
  ctaDescription:
    "Let's talk about how AI and automation can save you time, reduce costs, and grow your revenue.",
  ctaButtonLabel: "Work With Us",
  ctaButtonHref: "/contact",
};

// ---------- Contact Page ----------

export const DEFAULT_CONTACT_PAGE: ContactPage = {
  heroTitle: "Get in Touch",
  heroSubtitle: "Contact",
  heroDescription:
    "Have a question about booking, property management, or our services? We'd love to hear from you.",
  infoCards: [
    {
      icon: "mail",
      label: "Email",
      value: "Mizeenterprise1@gmail.com",
      href: "mailto:Mizeenterprise1@gmail.com",
    },
    {
      icon: "mappin",
      label: "Location",
      value: "Lexington, NC",
    },
    {
      icon: "sparkles",
      label: "Response Time",
      value: "Within 24 hours",
    },
  ],
  formTitle: "Send Us a Message",
  formDescription:
    "Fill out the form below and we'll get back to you as soon as possible.",
  responseTimeMessage: "We respond to every inquiry within 24 hours.",
};

// ---------- VIP Page ----------

export const DEFAULT_VIP_PAGE: VipPage = {
  heroTitle: "Join the CEO Hosting U VIP List",
  heroSubtitle: "VIP Club",
  heroDescription:
    "Save on future direct bookings + get priority access to open dates",
  discountPercent: 15,
  emailConsentLabel:
    "I agree to receive email offers and updates from CEO Hosting U",
  smsConsentLabel: "I agree to receive text messages from CEO Hosting U",
  submitButtonLabel: "Join the VIP List",
  thankYouTitle: "Welcome to the VIP List!",
  thankYouMessage:
    "You're now a CEO Hosting U VIP member. Enjoy 15% off your next direct booking and priority access to open dates.",
  thankYouButtonLabel: "Browse Properties & Book Direct",
  thankYouButtonHref: "/properties",
};
