/**
 * GROQ queries for all singletons and document types used by the site.
 *
 * Image fields are resolved to include the asset reference so that the
 * `urlFor()` helper in `./image.ts` can build CDN URLs. Fields use
 * explicit projections so schema changes in the studio don't break
 * the shape the Next.js app expects.
 */

// ---------- Fragments ----------

const imageFragment = /* groq */ `{
  _type,
  asset,
  hotspot,
  crop,
  alt
}`;

const seoFragment = /* groq */ `{
  metaTitle,
  metaDescription,
  keywords,
  "ogImage": ogImage${imageFragment},
  noIndex
}`;

const linkFragment = /* groq */ `{
  label,
  href
}`;

const socialLinkFragment = /* groq */ `{
  platform,
  url
}`;

const serviceCardFragment = /* groq */ `{
  title,
  icon,
  bullets,
  buttonLabel,
  buttonHref
}`;

const valueItemFragment = /* groq */ `{
  title,
  description,
  icon
}`;

const processStepFragment = /* groq */ `{
  step,
  title,
  description
}`;

const carouselSlideFragment = /* groq */ `{
  "image": image${imageFragment},
  propertyName,
  propertySlug
}`;

const infoCardFragment = /* groq */ `{
  icon,
  label,
  value,
  href
}`;

const galleryItemFragment = /* groq */ `{
  title,
  description,
  "image": image${imageFragment}
}`;

// ---------- Queries ----------

export const siteSettingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  siteName,
  "logo": logo${imageFragment},
  "triadBadge": triadBadge${imageFragment},
  "smartSystemsBadge": smartSystemsBadge${imageFragment},
  "ogImage": ogImage${imageFragment},
  contactEmail,
  contactPhone,
  phoneDisplay,
  location,
  locationDescription,
  socialLinks[]${socialLinkFragment},
  defaultSeo${seoFragment}
}
`;

export const footerSettingsQuery = /* groq */ `
*[_type == "footerSettings"][0]{
  tagline,
  description,
  servicesLinks[]${linkFragment},
  quickLinks[]${linkFragment},
  copyrightText,
  showSocialLinks
}
`;

export const homepageQuery = /* groq */ `
*[_type == "homepage"][0]{
  heroHeadlineStart,
  heroHeadlineGreen,
  heroHeadlineEnd,
  heroSubheadline,
  heroSupportLine,
  heroPrimaryCtaLabel,
  heroPrimaryCtaHref,
  heroSecondaryCtaLabel,
  heroSecondaryCtaHref,
  heroCarouselSlides[]${carouselSlideFragment},
  triadHeading,
  triadCities,
  triadDescription,
  serviceCardsTitle,
  serviceCards[]${serviceCardFragment},
  smartSystemsTitle,
  smartSystemsDescription,
  smartSystemsButtonLabel,
  smartSystemsButtonHref,
  vipTitle,
  vipDescription,
  vipButtonLabel,
  vipButtonHref,
  finalCtaTitle,
  finalCtaCallLabel,
  finalCtaSubmitLabel,
  finalCtaSubmitHref,
  seo${seoFragment}
}
`;

export const aboutPageQuery = /* groq */ `
*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  storyTitle,
  storyContent,
  values[]${valueItemFragment},
  seo${seoFragment}
}
`;

export const managementPageQuery = /* groq */ `
*[_type == "managementPage"][0]{
  heroTitle,
  heroDescription,
  servicesTitle,
  services[]${valueItemFragment},
  processTitle,
  processSteps[]${processStepFragment},
  consultationCtaTitle,
  consultationCtaDescription,
  consultationThankYouTitle,
  consultationThankYouMessage,
  seo${seoFragment}
}
`;

export const renovationPageQuery = /* groq */ `
*[_type == "renovationPage"][0]{
  heroTitle,
  heroDescription,
  servicesTitle,
  services[]${valueItemFragment},
  galleryTitle,
  galleryDescription,
  galleryItems[]${galleryItemFragment},
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
  seo${seoFragment}
}
`;

export const aiAutomationPageQuery = /* groq */ `
*[_type == "aiAutomationPage"][0]{
  heroTitle,
  heroDescription,
  servicesTitle,
  services[]${valueItemFragment},
  processTitle,
  processSteps[]${processStepFragment},
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
  seo${seoFragment}
}
`;

export const contactPageQuery = /* groq */ `
*[_type == "contactPage"][0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  infoCards[]${infoCardFragment},
  formTitle,
  formDescription,
  responseTimeMessage,
  thankYouTitle,
  thankYouMessage,
  mapEmbedUrl,
  seo${seoFragment}
}
`;

export const vipPageQuery = /* groq */ `
*[_type == "vipPage"][0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  discountPercent,
  emailConsentLabel,
  smsConsentLabel,
  submitButtonLabel,
  thankYouTitle,
  thankYouMessage,
  thankYouButtonLabel,
  thankYouButtonHref,
  seo${seoFragment}
}
`;

/**
 * Featured testimonials first, then newest, capped to a reasonable number.
 */
export const testimonialsQuery = /* groq */ `
*[_type == "testimonial"] | order(featured desc, createdAt desc)[0...12]{
  _id,
  name,
  role,
  location,
  quote,
  rating,
  featured,
  createdAt,
  propertyStayed->{
    "slug": slug.current,
    name
  }
}
`;
