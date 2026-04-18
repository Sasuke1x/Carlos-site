import type { Metadata } from "next";

import { imageUrl } from "./image";
import type { Seo } from "../types";

export interface PageMetadataFallbacks {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Build a Next.js Metadata object from a Sanity SEO object, falling back to
 * provided hardcoded values. Safe to call with a null seo.
 */
export function buildPageMetadata(
  seo: Seo | undefined | null,
  fallbacks: PageMetadataFallbacks,
): Metadata {
  const title = seo?.metaTitle ?? fallbacks.title;
  const description = seo?.metaDescription ?? fallbacks.description;
  const keywords =
    seo?.keywords && seo.keywords.length > 0 ? seo.keywords : fallbacks.keywords;
  const ogImage = imageUrl(seo?.ogImage, 1200);

  return {
    title,
    description,
    keywords,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: ogImage
      ? {
          title,
          description,
          images: [ogImage],
        }
      : undefined,
    twitter: ogImage
      ? {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        }
      : undefined,
  };
}
