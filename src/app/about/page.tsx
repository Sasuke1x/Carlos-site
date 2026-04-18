import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

// Silences "Unknown block type 'undefined'" when Sanity returns a block
// whose _type wasn't projected — just render the children.
const portableTextComponents: PortableTextComponents = {
  unknownType: ({ children }) => <p>{children}</p>,
  unknownBlockStyle: ({ children }) => <p>{children}</p>,
};

/**
 * Sanity sometimes returns portable-text arrays whose blocks are missing
 * `_type`. Keep only well-formed blocks so PortableText doesn't warn /
 * error on malformed input.
 */
function normalizeBlocks(
  blocks: PortableTextBlock[] | undefined,
): PortableTextBlock[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.filter(
    (block): block is PortableTextBlock =>
      !!block &&
      typeof block === "object" &&
      "_type" in block &&
      typeof block._type === "string",
  );
}

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_ABOUT_PAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import type { AboutPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<AboutPage>(aboutPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "About Us | CEO Hosting U",
    description:
      "Family-owned, professionally operated short-term rental company based in Lexington, NC. Learn about our mission, team, and commitment to quality.",
  });
}

const AboutPageRoute = async () => {
  const page = await sanityFetch<AboutPage>(aboutPageQuery);
  const data: AboutPage = { ...DEFAULT_ABOUT_PAGE, ...(page ?? {}) };
  const values =
    data.values && data.values.length > 0
      ? data.values
      : DEFAULT_ABOUT_PAGE.values ?? [];
  const heroDescriptionBlocks = normalizeBlocks(data.heroDescription);
  const storyContentBlocks = normalizeBlocks(data.storyContent);

  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            {data.heroTitle ?? "About Us"}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {data.heroSubtitle ? (
              data.heroSubtitle
            ) : (
              <>
                Family-Owned.
                <br />
                Professionally Operated.
                <br />
                <span className="text-gold-400">Built for Comfort.</span>
              </>
            )}
          </h1>
          {heroDescriptionBlocks.length > 0 && (
            <div className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200 [&_p]:mb-4 last:[&_p]:mb-0">
              <PortableText
                value={heroDescriptionBlocks}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            {storyContentBlocks.length > 0 ? (
              <div className="space-y-6 [&_p]:mb-0">
                <PortableText
                  value={storyContentBlocks}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <>
                <p>
                  We are a modern housing company based in Lexington, North
                  Carolina, serving the greater Triad region. As a family-owned
                  operation, we understand the importance of safety, comfort,
                  and reliability when choosing a place to stay.
                </p>
                <p>
                  Our mission is to provide clean, thoughtfully prepared homes
                  where families and professionals can feel at ease — whether
                  staying for a weekend, a month, or longer.
                </p>
                <p>
                  What sets us apart is our integrated approach. In addition to
                  managing short-term and corporate rentals, we operate a
                  renovation and development division that upgrades and
                  improves the homes we manage. This ensures every property
                  meets high standards of quality, functionality, and
                  presentation.
                </p>
                <p>
                  Our long-term vision is to build a network of professionally
                  managed furnished homes throughout the Triad — creating
                  dependable housing solutions for families, professionals, and
                  property owners alike.
                </p>
                <p className="font-medium text-green-950">
                  When you stay with us, you&apos;re not just booking a house.
                  You&apos;re choosing a team committed to consistency and
                  care.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-green-50/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              {data.storyTitle ?? "What We Combine"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our strength comes from blending multiple disciplines into one
              unified operation.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => {
              const Icon = getIcon(value.icon);
              return (
                <article
                  key={value.title ?? idx}
                  className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-800 text-gold-400">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-950">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personal Touch / Quote */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Quote
            className="mx-auto mb-6 h-10 w-10 text-gold-400"
            aria-hidden="true"
          />
          <blockquote className="mb-6 text-2xl leading-relaxed font-medium text-green-950 md:text-3xl">
            &ldquo;As a husband and father, I value integrity, community, and
            professional service.&rdquo;
          </blockquote>
          <div>
            <p className="text-lg font-semibold text-green-900">
              Carlos E Ontiveros
            </p>
            <p className="text-gold-500">Founder, CEO Hosting U</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mb-10 text-lg text-green-200">
            Whether you&apos;re looking for a place to stay or a team to manage
            your property — we&apos;re here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPageRoute;
