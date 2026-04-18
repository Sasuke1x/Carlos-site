import type { Metadata } from "next";

import FinalCta from "@/components/home/FinalCta";
import HeroSection from "@/components/home/HeroSection";
import ServiceCards from "@/components/home/ServiceCards";
import SmartSystems from "@/components/home/SmartSystems";
import TriadAuthority from "@/components/home/TriadAuthority";
import VipClub from "@/components/home/VipClub";
import { DEFAULT_HOMEPAGE, DEFAULT_SITE_SETTINGS } from "@/sanity/fallbacks";
import { sanityFetch } from "@/sanity/lib/fetch";
import { imageUrl } from "@/sanity/lib/image";
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { Homepage, SiteSettings } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await sanityFetch<Homepage>(homepageQuery);
  const seo = homepage?.seo;
  if (!seo) return {};

  const ogImage = imageUrl(seo.ogImage, 1200);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: ogImage
      ? {
          title: seo.metaTitle ?? undefined,
          description: seo.metaDescription ?? undefined,
          images: [ogImage],
        }
      : undefined,
    twitter: ogImage
      ? {
          card: "summary_large_image",
          title: seo.metaTitle ?? undefined,
          description: seo.metaDescription ?? undefined,
          images: [ogImage],
        }
      : undefined,
  };
}

const HomePage = async () => {
  const [homepage, siteSettings] = await Promise.all([
    sanityFetch<Homepage>(homepageQuery),
    sanityFetch<SiteSettings>(siteSettingsQuery),
  ]);

  const data: Homepage = { ...DEFAULT_HOMEPAGE, ...(homepage ?? {}) };
  const site: SiteSettings = {
    ...DEFAULT_SITE_SETTINGS,
    ...(siteSettings ?? {}),
  };

  return (
    <>
      <HeroSection
        headlineStart={data.heroHeadlineStart}
        headlineGreen={data.heroHeadlineGreen}
        headlineEnd={data.heroHeadlineEnd}
        subheadline={data.heroSubheadline}
        supportLine={data.heroSupportLine}
        primaryCtaLabel={data.heroPrimaryCtaLabel}
        primaryCtaHref={data.heroPrimaryCtaHref}
        secondaryCtaLabel={data.heroSecondaryCtaLabel}
        secondaryCtaHref={data.heroSecondaryCtaHref}
        carouselSlides={data.heroCarouselSlides}
      />
      <TriadAuthority
        heading={data.triadHeading}
        cities={data.triadCities}
        description={data.triadDescription}
        triadBadge={site.triadBadge}
      />
      <ServiceCards title={data.serviceCardsTitle} cards={data.serviceCards} />
      <SmartSystems
        title={data.smartSystemsTitle}
        description={data.smartSystemsDescription}
        buttonLabel={data.smartSystemsButtonLabel}
        buttonHref={data.smartSystemsButtonHref}
        smartSystemsBadge={site.smartSystemsBadge}
      />
      <VipClub
        title={data.vipTitle}
        description={data.vipDescription}
        buttonLabel={data.vipButtonLabel}
        buttonHref={data.vipButtonHref}
      />
      <FinalCta
        title={data.finalCtaTitle}
        callLabel={data.finalCtaCallLabel}
        submitLabel={data.finalCtaSubmitLabel}
        submitHref={data.finalCtaSubmitHref}
        contactPhone={site.contactPhone}
      />
    </>
  );
};

export default HomePage;
