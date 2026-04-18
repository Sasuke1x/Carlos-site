"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  DEFAULT_HERO_CAROUSEL,
  DEFAULT_HOMEPAGE,
} from "@/sanity/fallbacks";
import { imageUrl } from "@/sanity/lib/image";
import type { CarouselSlide } from "@/sanity/types";

export interface HeroSectionProps {
  headlineStart?: string;
  headlineGreen?: string;
  headlineEnd?: string;
  subheadline?: string;
  supportLine?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  carouselSlides?: CarouselSlide[];
}

interface ResolvedSlide {
  src: string;
  name: string;
  slug: string;
  alt: string;
}

function resolveSlides(slides: CarouselSlide[] | undefined): ResolvedSlide[] {
  const fromSanity = (slides ?? [])
    .map((slide) => {
      const url = imageUrl(slide.image, 1200);
      if (!url) return null;
      return {
        src: url,
        name: slide.propertyName ?? "",
        slug: slide.propertySlug ?? "",
        alt: slide.image?.alt ?? slide.propertyName ?? "Featured property",
      };
    })
    .filter((s): s is ResolvedSlide => s !== null);

  if (fromSanity.length > 0) return fromSanity;

  return DEFAULT_HERO_CAROUSEL.map((s) => ({
    src: s.src,
    name: s.name,
    slug: s.slug,
    alt: s.name,
  }));
}

const HeroSection = ({
  headlineStart = DEFAULT_HOMEPAGE.heroHeadlineStart,
  headlineGreen = DEFAULT_HOMEPAGE.heroHeadlineGreen,
  headlineEnd = DEFAULT_HOMEPAGE.heroHeadlineEnd,
  subheadline = DEFAULT_HOMEPAGE.heroSubheadline,
  supportLine = DEFAULT_HOMEPAGE.heroSupportLine,
  primaryCtaLabel = DEFAULT_HOMEPAGE.heroPrimaryCtaLabel,
  primaryCtaHref = DEFAULT_HOMEPAGE.heroPrimaryCtaHref,
  secondaryCtaLabel = DEFAULT_HOMEPAGE.heroSecondaryCtaLabel,
  secondaryCtaHref = DEFAULT_HOMEPAGE.heroSecondaryCtaHref,
  carouselSlides,
}: HeroSectionProps) => {
  const heroSlides = resolveSlides(carouselSlides);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, heroSlides.length]);

  const activeSlide = heroSlides[current] ?? heroSlides[0];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              {headlineStart}{" "}
              <span className="text-[#065f46]">{headlineGreen}</span>{" "}
              {headlineEnd}
            </h1>
            {subheadline ? (
              <p className="mt-4 text-lg text-gray-600">{subheadline}</p>
            ) : null}
            {supportLine ? (
              <p className="mt-2 text-sm text-gray-400">{supportLine}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCtaLabel && primaryCtaHref ? (
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
                >
                  {primaryCtaLabel}
                </Link>
              ) : null}
              {secondaryCtaLabel && secondaryCtaHref ? (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center rounded-lg border-2 border-[#065f46] px-6 py-3 text-sm font-semibold text-[#065f46] transition-all hover:bg-[#065f46]/5"
                >
                  {secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              {heroSlides.map((slide, index) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}

              {heroSlides.length > 1 ? (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Previous property"
                    type="button"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Next property"
                    type="button"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === current
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to ${slide.name}`}
                        type="button"
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            {activeSlide && activeSlide.slug ? (
              <Link
                href={`/properties/${activeSlide.slug}`}
                className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {activeSlide.name}
                </span>
                <span className="text-xs font-medium text-[#065f46]">
                  View Property →
                </span>
              </Link>
            ) : activeSlide ? (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-semibold text-gray-800">
                  {activeSlide.name}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
