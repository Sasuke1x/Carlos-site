import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";
import type { SanityImage } from "../types";

const builder = createImageUrlBuilder({
  projectId: projectId || "dy5vkbef",
  dataset: dataset || "production",
});

/**
 * Build a URL for any Sanity image. Returns null if the image has no
 * asset reference yet (e.g. Sanity is empty and we're relying on the
 * hardcoded fallback in the component).
 */
export function urlFor(source: SanityImageSource | SanityImage | undefined | null) {
  if (!source) return null;
  // Image objects without an asset aren't safe to build URLs from.
  const maybe = source as SanityImage;
  if (!maybe.asset?._ref && !maybe.asset?.url) return null;
  return builder.image(source as SanityImageSource);
}

/** Convenience: returns a string URL or null. */
export function imageUrl(
  source: SanityImageSource | SanityImage | undefined | null,
  width?: number,
  height?: number,
): string | null {
  const b = urlFor(source);
  if (!b) return null;
  let out = b.auto("format").fit("max");
  if (width) out = out.width(width);
  if (height) out = out.height(height);
  return out.url();
}
