// Server-only — imported exclusively from API route handlers under
// /src/app/api/*. Must never be imported by a client component because
// the SANITY_API_WRITE_TOKEN must not ship to the browser.

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Server-only Sanity client with write access. NEVER import this in a
// client component — the token must not ship to the browser. The API
// routes under /src/app/api/* use it to create formSubmission documents.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
