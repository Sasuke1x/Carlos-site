/**
 * Re-uploads the transparent logo to Sanity and patches siteSettings.
 *
 * Run: SANITY_AUTH_TOKEN=... node scripts/replace-logo.mjs
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "branding",
  "ceo-hosting-u-logo.png",
);

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

async function run() {
  console.log("Uploading transparent logo to Sanity...");
  const stream = fs.createReadStream(logoPath);
  const asset = await client.assets.upload("image", stream, {
    filename: "ceo-hosting-u-logo-transparent.png",
  });
  console.log(`  ✓ Asset ID: ${asset._id}`);

  console.log("Patching siteSettings.logo...");
  await client
    .patch("siteSettings")
    .set({
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "CEO Hosting U",
      },
    })
    .commit();
  console.log("  ✓ siteSettings.logo patched");
  console.log("\n✅ Done.");
}

run().catch((err) => {
  console.error("✗ Failed:", err.message);
  if (err.response?.body)
    console.error(JSON.stringify(err.response.body, null, 2));
  process.exit(1);
});
