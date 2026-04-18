import { client } from "./client";

type FetchParams = Record<string, unknown>;

interface SanityFetchOptions {
  /** ISR revalidation time in seconds. Defaults to 60s. */
  revalidate?: number;
  /** Optional cache tags for on-demand revalidation. */
  tags?: string[];
}

/**
 * Typed wrapper around the Sanity client. Returns `null` on any error
 * so the calling component can apply its hardcoded fallbacks and the
 * site keeps rendering even when Sanity is empty or unavailable.
 */
export async function sanityFetch<T>(
  query: string,
  params: FetchParams = {},
  options: SanityFetchOptions = {},
): Promise<T | null> {
  const { revalidate = 60, tags } = options;
  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate,
        ...(tags ? { tags } : {}),
      },
    });
    return result ?? null;
  } catch (err) {
    // Never blow up the page render — log and fall back.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanityFetch] query failed, falling back:", err);
    }
    return null;
  }
}
