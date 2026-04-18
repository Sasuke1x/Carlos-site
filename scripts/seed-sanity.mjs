/**
 * Seeds the Sanity project with initial singleton content so the live
 * site reads from Sanity instead of hardcoded fallbacks on day one.
 *
 * Run: node scripts/seed-sanity.mjs
 *
 * Uses SANITY_AUTH_TOKEN env var (export SANITY_AUTH_TOKEN=...).
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("SANITY_AUTH_TOKEN env var is required");
  process.exit(1);
}

const client = createClient({
  projectId: "dy5vkbef",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "CEO Hosting U",
    contactEmail: "Mizeenterprise1@gmail.com",
    contactPhone: "+13368835635",
    phoneDisplay: "(336) 883-5635",
    location: "Lexington, NC",
    locationDescription: "Serving the Triad",
    socialLinks: [],
    defaultSeo: {
      _type: "seo",
      metaTitle: "CEO Hosting U | Furnished Housing & Property Management in the Triad",
      metaDescription: "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.",
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
  },
  {
    _id: "footerSettings",
    _type: "footerSettings",
    tagline: "Family-owned. Professionally operated.",
    description: "Family-owned. Professionally operated. Furnished housing and property management in the North Carolina Triad.",
    servicesLinks: [
      { _key: "svc1", _type: "link", label: "Properties", href: "/properties" },
      { _key: "svc2", _type: "link", label: "Property Management", href: "/property-management" },
      { _key: "svc3", _type: "link", label: "Renovation", href: "/renovation" },
      { _key: "svc4", _type: "link", label: "AI & Automation", href: "/ai-automation" },
    ],
    quickLinks: [
      { _key: "q1", _type: "link", label: "Book a Stay", href: "/properties" },
      { _key: "q2", _type: "link", label: "Join VIP Club", href: "/vip" },
      { _key: "q3", _type: "link", label: "Contact Us", href: "/contact" },
    ],
    copyrightText: "© {year} CEO Hosting U. All rights reserved.",
    showSocialLinks: true,
  },
  {
    _id: "homepage",
    _type: "homepage",
    heroHeadlineStart: "Furnished Housing &",
    heroHeadlineGreen: "Property Management",
    heroHeadlineEnd: "in the Triad",
    heroSubheadline: "For Travelers, Homeowners & Investors",
    heroSupportLine: "Short-term · Mid-term · Insurance Housing · Investor Solutions",
    heroPrimaryCtaLabel: "Book a Stay",
    heroPrimaryCtaHref: "/properties",
    heroSecondaryCtaLabel: "Partner With Us",
    heroSecondaryCtaHref: "/property-management",
    heroCarouselSlides: [],
    triadHeading: "Proudly Serving the North Carolina Triad",
    triadCities: "Winston-Salem · Greensboro · High Point · Lexington",
    triadDescription: "Locally based in Lexington, CEO Hosting U serves the Triad with furnished housing, property management, renovation, and partnership opportunities.",
    serviceCardsTitle: "What We Do",
    serviceCards: [
      {
        _key: "sc1",
        _type: "serviceCard",
        title: "Furnished Housing",
        icon: "home",
        bullets: ["Short- and mid-term stays", "Direct booking focus"],
        buttonLabel: "Book a Stay",
        buttonHref: "/properties",
      },
      {
        _key: "sc2",
        _type: "serviceCard",
        title: "Property Management",
        icon: "key",
        bullets: ["Listing optimization", "Guest messaging + cleaning"],
        buttonLabel: "Learn More",
        buttonHref: "/property-management",
      },
      {
        _key: "sc3",
        _type: "serviceCard",
        title: "Renovation + Partnerships",
        icon: "hardhat",
        bullets: ["Construction collaborations", "Value-add project support"],
        buttonLabel: "Learn More",
        buttonHref: "/renovation",
      },
    ],
    smartSystemsTitle: "Automate With Smart Systems",
    smartSystemsDescription: "CEO Hosting U helps businesses and property operations become more automated through AI, CRM workflows, follow-up systems, data tracking, and lead capture.",
    smartSystemsButtonLabel: "Learn More",
    smartSystemsButtonHref: "/ai-automation",
    vipTitle: "CEO Hosting U VIP Club",
    vipDescription: "Join the VIP list for exclusive direct-booking discounts, priority access to open dates, and early notifications on new properties.",
    vipButtonLabel: "Join VIP + Save 15%",
    vipButtonHref: "/vip",
    finalCtaTitle: "Ready to Get Started?",
    finalCtaCallLabel: "Call Now",
    finalCtaSubmitLabel: "Submit Property",
    finalCtaSubmitHref: "/property-management#consultation",
    seo: {
      _type: "seo",
      metaTitle: "CEO Hosting U | Furnished Housing & Property Management in the Triad",
      metaDescription: "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.",
      keywords: ["CEO Hosting U", "Triad NC", "furnished housing"],
      noIndex: false,
    },
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "About CEO Hosting U",
    heroSubtitle: "Family-owned. Professionally operated.",
    heroDescription: "We're a local team serving the North Carolina Triad with furnished housing, property management, and renovation partnerships for travelers, homeowners, and investors.",
    storyTitle: "Our Story",
    storyContent: [
      {
        _key: "story1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "span1",
            _type: "span",
            text: "CEO Hosting U started in Lexington, NC with a simple goal: deliver clean, comfortable, professionally managed stays for travelers across the Triad. Today we serve short-term, mid-term, insurance, and investor-driven needs across Winston-Salem, Greensboro, High Point, and Lexington.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    values: [
      {
        _key: "v1",
        _type: "valueItem",
        title: "Local Expertise",
        description: "We live and work in the Triad and know our markets.",
        icon: "home",
      },
      {
        _key: "v2",
        _type: "valueItem",
        title: "Professional Standards",
        description: "Five-star cleanliness, communication, and care on every stay.",
        icon: "key",
      },
      {
        _key: "v3",
        _type: "valueItem",
        title: "Partnership-Driven",
        description: "We collaborate with owners, contractors, and investors to grow together.",
        icon: "building",
      },
    ],
    seo: {
      _type: "seo",
      metaTitle: "About Us | CEO Hosting U",
      metaDescription: "Family-owned, professionally operated furnished housing and property management in the North Carolina Triad.",
      keywords: ["about CEO Hosting U", "Triad property management"],
      noIndex: false,
    },
  },
  {
    _id: "managementPage",
    _type: "managementPage",
    heroTitle: "Property Management",
    heroDescription: "Full-service short-term rental management for property owners in the North Carolina Triad. We handle listings, guests, cleaning, and optimization.",
    servicesTitle: "What We Handle",
    services: [
      { _key: "m1", _type: "serviceCard", title: "Listing Optimization", bullets: ["Professional photos", "Dynamic pricing"], icon: "home" },
      { _key: "m2", _type: "serviceCard", title: "Guest Communication", bullets: ["24/7 messaging", "Review management"], icon: "key" },
      { _key: "m3", _type: "serviceCard", title: "Cleaning & Maintenance", bullets: ["Vetted cleaners", "Preventative care"], icon: "tools" },
    ],
    processTitle: "How It Works",
    processSteps: [
      { _key: "p1", _type: "processStep", step: 1, title: "Discovery Call", description: "We learn your property, goals, and timeline." },
      { _key: "p2", _type: "processStep", step: 2, title: "Onboard & Launch", description: "We photograph, list, and start taking bookings." },
      { _key: "p3", _type: "processStep", step: 3, title: "Manage & Optimize", description: "We handle operations and send monthly reports." },
    ],
    consultationCtaTitle: "Get a Free Consultation",
    consultationCtaDescription: "Tell us about your property and we'll share what's possible.",
    seo: {
      _type: "seo",
      metaTitle: "Property Management | CEO Hosting U",
      metaDescription: "Full-service short-term rental management in the North Carolina Triad.",
      keywords: ["property management Triad", "STR management NC"],
      noIndex: false,
    },
  },
  {
    _id: "renovationPage",
    _type: "renovationPage",
    heroTitle: "Renovation + Partnerships",
    heroDescription: "Value-add renovations and fix-and-flip project management for property owners and investors across the Triad.",
    servicesTitle: "Our Services",
    services: [
      { _key: "r1", _type: "serviceCard", title: "Kitchen & Bath Remodels", bullets: ["Modern upgrades that increase property value and guest satisfaction."], icon: "hardhat" },
      { _key: "r2", _type: "serviceCard", title: "Full Property Renovations", bullets: ["End-to-end project management for fix & flip or rental conversion."], icon: "tools" },
      { _key: "r3", _type: "serviceCard", title: "Value-Add Improvements", bullets: ["Strategic upgrades designed to maximize return on investment."], icon: "wrench" },
    ],
    galleryTitle: "Our Work",
    galleryDescription: "We partner with property owners across the Triad to deliver renovation projects that increase value and rental performance.",
    galleryItems: [
      { _key: "g1", _type: "galleryItem", title: "Kitchen & Bath Remodels", description: "Modern upgrades that increase property value and guest satisfaction." },
      { _key: "g2", _type: "galleryItem", title: "Full Property Renovations", description: "End-to-end project management for fix & flip or rental conversion." },
      { _key: "g3", _type: "galleryItem", title: "Value-Add Improvements", description: "Strategic upgrades designed to maximize return on investment." },
    ],
    ctaTitle: "Discuss Your Project",
    ctaDescription: "Have a property to transform? Let's talk.",
    ctaButtonLabel: "Discuss Your Project",
    ctaButtonHref: "/contact",
    seo: {
      _type: "seo",
      metaTitle: "Renovation + Partnerships | CEO Hosting U",
      metaDescription: "Value-add renovations and fix-and-flip partnerships in the North Carolina Triad.",
      keywords: ["renovation Triad NC", "fix and flip Lexington"],
      noIndex: false,
    },
  },
  {
    _id: "aiAutomationPage",
    _type: "aiAutomationPage",
    heroTitle: "AI & Business Automation",
    heroDescription: "CEO Hosting U helps local businesses and property operations become more automated through AI, CRM workflows, follow-up systems, data tracking, and lead capture.",
    servicesTitle: "What We Automate",
    services: [
      { _key: "a1", _type: "serviceCard", title: "Website & Chatbot Setup", bullets: ["Website development", "AI chatbot integration"], icon: "tools" },
      { _key: "a2", _type: "serviceCard", title: "Marketing Automation", bullets: ["Lead funnels", "Email + SMS campaigns"], icon: "building" },
      { _key: "a3", _type: "serviceCard", title: "CRM & Reporting", bullets: ["Customer data capture", "Analytics & dashboards"], icon: "wrench" },
    ],
    processTitle: "How It Works",
    processSteps: [
      { _key: "ap1", _type: "processStep", step: 1, title: "Discovery Call", description: "We map your current tools and workflows." },
      { _key: "ap2", _type: "processStep", step: 2, title: "Custom Strategy", description: "We design a system that fits your business." },
      { _key: "ap3", _type: "processStep", step: 3, title: "Launch & Optimize", description: "We build, deploy, and refine over time." },
    ],
    ctaTitle: "Ready to Modernize Your Business?",
    ctaDescription: "Save time, cut costs, and grow revenue with smart systems.",
    ctaButtonLabel: "Contact Us",
    ctaButtonHref: "/contact",
    seo: {
      _type: "seo",
      metaTitle: "AI & Automation | CEO Hosting U",
      metaDescription: "Practical AI, CRM, and business automation for local businesses in the Triad.",
      keywords: ["AI automation", "CRM setup", "business automation Triad"],
      noIndex: false,
    },
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Get in Touch",
    heroSubtitle: "We're here to help",
    heroDescription: "Whether you're a traveler, homeowner, or investor, we'd love to hear from you.",
    infoCards: [
      { _key: "i1", _type: "infoCard", icon: "home", label: "Email", value: "Mizeenterprise1@gmail.com", href: "mailto:Mizeenterprise1@gmail.com" },
      { _key: "i2", _type: "infoCard", icon: "key", label: "Phone", value: "(336) 883-5635", href: "tel:+13368835635" },
      { _key: "i3", _type: "infoCard", icon: "building", label: "Location", value: "Lexington, NC — Serving the Triad" },
    ],
    formTitle: "Send Us a Message",
    formDescription: "Fill out the form and we'll get back to you within 24 hours.",
    responseTimeMessage: "We respond within 24 hours.",
    seo: {
      _type: "seo",
      metaTitle: "Contact Us | CEO Hosting U",
      metaDescription: "Contact CEO Hosting U for furnished housing, property management, or partnership inquiries in the NC Triad.",
      keywords: ["contact CEO Hosting U", "Triad property management contact"],
      noIndex: false,
    },
  },
  {
    _id: "vipPage",
    _type: "vipPage",
    heroTitle: "Join the CEO Hosting U VIP List",
    heroSubtitle: "Save 15% on direct bookings",
    heroDescription: "Save on future direct bookings + get priority access to open dates",
    discountPercent: 15,
    emailConsentLabel: "I agree to receive email offers and updates from CEO Hosting U",
    smsConsentLabel: "I agree to receive text messages from CEO Hosting U",
    submitButtonLabel: "Join the VIP List",
    thankYouTitle: "Welcome to the VIP List!",
    thankYouMessage: "You're now a CEO Hosting U VIP member. Enjoy 15% off your next direct booking and priority access to open dates.",
    thankYouButtonLabel: "Browse Properties & Book Direct",
    thankYouButtonHref: "/properties",
    seo: {
      _type: "seo",
      metaTitle: "VIP Club | CEO Hosting U",
      metaDescription: "Join the CEO Hosting U VIP Club for direct booking discounts and priority access.",
      keywords: ["VIP club", "direct booking discount", "Triad rentals"],
      noIndex: false,
    },
  },
];

async function run() {
  console.log(`Seeding ${documents.length} documents to Sanity (dy5vkbef/production)...`);

  const tx = client.transaction();
  for (const doc of documents) {
    tx.createOrReplace(doc);
  }

  try {
    const res = await tx.commit();
    console.log(`✓ Transaction committed. ${res.results.length} documents written.`);
    for (const r of res.results) {
      console.log(`  - ${r.id} (${r.operation})`);
    }
  } catch (err) {
    console.error("✗ Transaction failed:", err.message);
    if (err.details) console.error(JSON.stringify(err.details, null, 2));
    process.exit(1);
  }
}

run();
