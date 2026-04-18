/**
 * TypeScript interfaces that mirror the schemas defined in
 * /studio-mizeent/schemaTypes. Fields are all optional — Sanity may
 * return a partial document while Carlos is filling it in, and the
 * site must still work thanks to the fallbacks in `./fallbacks.ts`.
 */

import type { PortableTextBlock } from "@portabletext/react";

// ---------- Shared Objects ----------

export interface SanityImage {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  alt?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface Link {
  label?: string;
  href?: string;
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "tiktok";

export interface SocialLink {
  platform?: SocialPlatform;
  url?: string;
}

export type IconName =
  | "home"
  | "key"
  | "hardhat"
  | "building"
  | "wrench"
  | "tools"
  | "sparkles"
  | "shield"
  | "chart"
  | "heart"
  | "star"
  | "phone"
  | "mail"
  | "mappin"
  | "bot"
  | "cog";

export interface ServiceCard {
  title?: string;
  icon?: IconName;
  bullets?: string[];
  buttonLabel?: string;
  buttonHref?: string;
}

export interface ProcessStep {
  step?: number;
  title?: string;
  description?: string;
}

export interface ValueItem {
  title?: string;
  description?: string;
  icon?: IconName;
}

export interface CarouselSlide {
  image?: SanityImage;
  propertyName?: string;
  propertySlug?: string;
}

export interface InfoCard {
  icon?: IconName;
  label?: string;
  value?: string;
  href?: string;
}

export interface TestimonialItem {
  name?: string;
  role?: string;
  quote?: string;
  rating?: number;
}

export interface GalleryItem {
  title?: string;
  description?: string;
  image?: SanityImage;
}

// ---------- Singletons ----------

export interface SiteSettings {
  siteName?: string;
  logo?: SanityImage;
  triadBadge?: SanityImage;
  smartSystemsBadge?: SanityImage;
  ogImage?: SanityImage;
  contactEmail?: string;
  contactPhone?: string;
  phoneDisplay?: string;
  location?: string;
  locationDescription?: string;
  socialLinks?: SocialLink[];
  defaultSeo?: Seo;
}

export interface FooterSettings {
  tagline?: string;
  description?: string;
  servicesLinks?: Link[];
  quickLinks?: Link[];
  copyrightText?: string;
  showSocialLinks?: boolean;
}

export interface Homepage {
  // Hero
  heroHeadlineStart?: string;
  heroHeadlineGreen?: string;
  heroHeadlineEnd?: string;
  heroSubheadline?: string;
  heroSupportLine?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  heroCarouselSlides?: CarouselSlide[];

  // Triad
  triadHeading?: string;
  triadCities?: string;
  triadDescription?: string;

  // Services
  serviceCardsTitle?: string;
  serviceCards?: ServiceCard[];

  // Smart Systems
  smartSystemsTitle?: string;
  smartSystemsDescription?: string;
  smartSystemsButtonLabel?: string;
  smartSystemsButtonHref?: string;

  // VIP
  vipTitle?: string;
  vipDescription?: string;
  vipButtonLabel?: string;
  vipButtonHref?: string;

  // Final CTA
  finalCtaTitle?: string;
  finalCtaCallLabel?: string;
  finalCtaSubmitLabel?: string;
  finalCtaSubmitHref?: string;

  seo?: Seo;
}

export interface AboutPage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: PortableTextBlock[];
  storyTitle?: string;
  storyContent?: PortableTextBlock[];
  values?: ValueItem[];
  seo?: Seo;
}

export interface ManagementPage {
  heroTitle?: string;
  heroDescription?: string;
  servicesTitle?: string;
  services?: ValueItem[];
  processTitle?: string;
  processSteps?: ProcessStep[];
  consultationCtaTitle?: string;
  consultationCtaDescription?: string;
  seo?: Seo;
}

export interface RenovationPage {
  heroTitle?: string;
  heroDescription?: string;
  servicesTitle?: string;
  services?: ValueItem[];
  galleryTitle?: string;
  galleryDescription?: string;
  galleryItems?: GalleryItem[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  seo?: Seo;
}

export interface AiAutomationPage {
  heroTitle?: string;
  heroDescription?: string;
  servicesTitle?: string;
  services?: ValueItem[];
  processTitle?: string;
  processSteps?: ProcessStep[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  seo?: Seo;
}

export interface ContactPage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  infoCards?: InfoCard[];
  formTitle?: string;
  formDescription?: string;
  responseTimeMessage?: string;
  thankYouTitle?: string;
  thankYouMessage?: string;
  mapEmbedUrl?: string;
  seo?: Seo;
}

// ---------- Documents (site-writable) ----------

export type FormSubmissionType = "contact" | "vip";
export type FormSubmissionStatus = "new" | "contacted" | "archived";
export type ContactInquiryType = "guest" | "owner" | "service";

export interface FormSubmission {
  _id?: string;
  formType?: FormSubmissionType;
  submittedAt?: string;
  status?: FormSubmissionStatus;
  notes?: string;
  email?: string;
  phone?: string;
  // Contact
  name?: string;
  message?: string;
  inquiryType?: ContactInquiryType;
  // VIP
  firstName?: string;
  emailConsent?: boolean;
  smsConsent?: boolean;
  // Abuse tracking
  ipHash?: string;
  userAgent?: string;
}

export interface VipPage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  discountPercent?: number;
  emailConsentLabel?: string;
  smsConsentLabel?: string;
  submitButtonLabel?: string;
  thankYouTitle?: string;
  thankYouMessage?: string;
  thankYouButtonLabel?: string;
  thankYouButtonHref?: string;
  seo?: Seo;
}

// ---------- Documents ----------

export interface Testimonial {
  _id?: string;
  name?: string;
  role?: string;
  location?: string;
  quote?: string;
  rating?: number;
  propertyStayed?: {
    _ref?: string;
    slug?: string;
    name?: string;
  };
  featured?: boolean;
  createdAt?: string;
}
