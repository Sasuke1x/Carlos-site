import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { renovationPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_RENOVATION_PAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import { imageUrl } from "@/sanity/lib/image";
import type { RenovationPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<RenovationPage>(renovationPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "Renovation & Fix/Flip | CEO Hosting U",
    description:
      "Strategic property renovations, layout improvements, and cosmetic enhancements designed to increase rental performance and long-term value in the Triad region.",
  });
}

const RenovationPageRoute = async () => {
  const page = await sanityFetch<RenovationPage>(renovationPageQuery);
  const data: RenovationPage = { ...DEFAULT_RENOVATION_PAGE, ...(page ?? {}) };
  const services =
    data.services && data.services.length > 0
      ? data.services
      : DEFAULT_RENOVATION_PAGE.services ?? [];
  const galleryItems =
    data.galleryItems && data.galleryItems.length > 0
      ? data.galleryItems
      : DEFAULT_RENOVATION_PAGE.galleryItems ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Renovation &amp; Fix/Flip
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {data.heroTitle ?? (
              <>
                Renovation &amp;{" "}
                <span className="text-gold-400">Value-Add Services</span>
              </>
            )}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            {data.heroDescription}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              {data.servicesTitle ?? "Our Renovation Services"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              From cosmetic refreshes to full gut renovations, we handle every
              phase with precision and purpose.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = getIcon(service.icon, Home);
              return (
                <article
                  key={service.title ?? idx}
                  className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors group-hover:bg-gold-400/20 group-hover:text-gold-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-950">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Gallery / CTA */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {data.galleryTitle ?? "Our Work"}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          {data.galleryDescription ??
            "We partner with property owners across the Triad to deliver renovation projects that increase value and rental performance."}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {galleryItems.map((item, idx) => {
            const imgSrc = imageUrl(item.image, 800);
            return (
              <div
                key={item.title ?? idx}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                {imgSrc && (
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={imgSrc}
                      alt={item.image?.alt ?? item.title ?? ""}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-green-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {data.ctaTitle ?? "Ready to Transform Your Property?"}
          </h2>
          <p className="mb-10 text-lg text-green-200">
            {data.ctaDescription ??
              "Whether you're preparing a home for short-term rental, planning a flip, or simply want to increase your property's value — we'd love to talk."}
          </p>
          <Link
            href={data.ctaButtonHref ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none"
          >
            {data.ctaButtonLabel ?? "Learn About Our Projects"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RenovationPageRoute;
