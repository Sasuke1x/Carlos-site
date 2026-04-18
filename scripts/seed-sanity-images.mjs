/**
 * Uploads brand images and hero carousel images to Sanity assets,
 * then patches the siteSettings and homepage singletons to reference them.
 *
 * Run: SANITY_AUTH_TOKEN=... node scripts/seed-sanity-images.mjs
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

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

async function uploadImage(relativePath, label, filename) {
  const fullPath = path.join(publicDir, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing file: ${fullPath}`);
  }
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, { filename });
  console.log(`  ✓ Uploaded ${label}: ${asset._id}`);
  return asset._id;
}

function imageRef(assetId, alt) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

const HERO_SLIDES = [
  {
    src: "images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
    filename: "mize-road-retreat.avif",
    propertyName: "Modern 3BR Family Home Near Park",
    propertySlug: "mize-road-retreat",
  },
  {
    src: "images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
    filename: "downtown-lexington-condo.avif",
    propertyName: "Cozy 2BR Condo in Downtown Lexington",
    propertySlug: "downtown-lexington-condo",
  },
  {
    src: "images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
    filename: "modern-lexington-apartment.avif",
    propertyName: "Modern 3BR Apartment Near I-85",
    propertySlug: "modern-lexington-apartment",
  },
  {
    src: "images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
    filename: "family-retreat-hot-tub.avif",
    propertyName: "Family 3BR Retreat with Hot Tub",
    propertySlug: "family-retreat-hot-tub",
  },
];

async function run() {
  console.log("Uploading brand images...");
  const logoId = await uploadImage(
    "images/branding/ceo-hosting-u-logo.png",
    "CEO Hosting U logo",
    "ceo-hosting-u-logo.png",
  );
  const triadId = await uploadImage(
    "images/branding/triad-badge.png",
    "Triad badge",
    "triad-badge.png",
  );
  const smartId = await uploadImage(
    "images/branding/smart-systems-badge.png",
    "Smart Systems badge",
    "smart-systems-badge.png",
  );

  console.log("\nUploading hero carousel images...");
  const slideAssets = [];
  for (const slide of HERO_SLIDES) {
    const assetId = await uploadImage(
      slide.src,
      slide.propertyName,
      slide.filename,
    );
    slideAssets.push({ ...slide, assetId });
  }

  console.log("\nPatching siteSettings with brand images...");
  await client
    .patch("siteSettings")
    .set({
      logo: imageRef(logoId, "CEO Hosting U"),
      triadBadge: imageRef(triadId, "Triad North Carolina badge"),
      smartSystemsBadge: imageRef(smartId, "Smart Systems by CEO Hosting U badge"),
    })
    .commit();
  console.log("  ✓ siteSettings patched");

  console.log("\nPatching homepage with hero carousel slides...");
  const heroCarouselSlides = slideAssets.map((slide, i) => ({
    _key: `slide${i + 1}`,
    _type: "carouselSlide",
    image: imageRef(slide.assetId, slide.propertyName),
    propertyName: slide.propertyName,
    propertySlug: slide.propertySlug,
  }));
  await client.patch("homepage").set({ heroCarouselSlides }).commit();
  console.log(`  ✓ homepage patched with ${heroCarouselSlides.length} slides`);

  console.log("\n✅ Done. All images uploaded and wired up.");
}

run().catch((err) => {
  console.error("✗ Failed:", err.message);
  if (err.response?.body) console.error(JSON.stringify(err.response.body, null, 2));
  process.exit(1);
});
