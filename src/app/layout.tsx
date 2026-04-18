import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DEFAULT_SITE_SETTINGS } from "@/sanity/fallbacks";
import { sanityFetch } from "@/sanity/lib/fetch";
import { imageUrl } from "@/sanity/lib/image";
import {
  footerSettingsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type { FooterSettings, SiteSettings } from "@/sanity/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const FALLBACK_METADATA_TITLE =
  "CEO Hosting U | Furnished Housing & Property Management in the Triad";
const FALLBACK_METADATA_DESCRIPTION =
  "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.";
const FALLBACK_METADATA_KEYWORDS = [
  "CEO Hosting U",
  "Corporate Housing Lexington NC",
  "Short-Term Rental Triad NC",
  "Furnished Rentals Near Winston-Salem",
  "Lexington NC short term rentals",
  "corporate housing Triad North Carolina",
  "furnished homes Greensboro High Point",
];
const FALLBACK_OG_IMAGE = "/images/og-preview.png";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SiteSettings>(siteSettingsQuery);
  const seo = siteSettings?.defaultSeo;
  const ogFromSeo = imageUrl(seo?.ogImage, 1200);
  const ogFromSite = imageUrl(siteSettings?.ogImage, 1200);
  const ogImage = ogFromSeo ?? ogFromSite ?? FALLBACK_OG_IMAGE;

  const title = seo?.metaTitle ?? FALLBACK_METADATA_TITLE;
  const description = seo?.metaDescription ?? FALLBACK_METADATA_DESCRIPTION;
  const keywords =
    seo?.keywords && seo.keywords.length > 0
      ? seo.keywords
      : FALLBACK_METADATA_KEYWORDS;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceohostingu.com",
    ),
    title: {
      default: title,
      template: `%s | ${siteSettings?.siteName ?? DEFAULT_SITE_SETTINGS.siteName}`,
    },
    description,
    keywords,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [siteSettings, footerSettings] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<FooterSettings>(footerSettingsQuery),
  ]);

  const logoUrl = imageUrl(siteSettings?.logo, 400);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          siteName={siteSettings?.siteName}
          logoUrl={logoUrl}
          logoAlt={siteSettings?.logo?.alt}
          contactPhone={siteSettings?.contactPhone}
          phoneDisplay={siteSettings?.phoneDisplay}
        />
        <main className="min-h-screen pt-32">{children}</main>
        <Footer
          footerSettings={footerSettings}
          siteSettings={siteSettings}
          logoUrl={logoUrl}
        />
      </body>
    </html>
  );
};

export default RootLayout;
