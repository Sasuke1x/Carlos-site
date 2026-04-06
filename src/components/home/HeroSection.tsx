"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    src: "/images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
    name: "Modern 3BR Family Home Near Park",
    slug: "mize-road-retreat",
  },
  {
    src: "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
    name: "Cozy 2BR Condo in Downtown Lexington",
    slug: "downtown-lexington-condo",
  },
  {
    src: "/images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
    name: "Modern 3BR Apartment Near I-85",
    slug: "modern-lexington-apartment",
  },
  {
    src: "/images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
    name: "Family 3BR Retreat with Hot Tub",
    slug: "family-retreat-hot-tub",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Furnished Housing &{" "}
              <span className="text-[#065f46]">Property Management</span>{" "}
              in the Triad
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              For Travelers, Homeowners & Investors
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Short-term · Mid-term · Insurance Housing · Investor Solutions
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
              >
                Book a Stay
              </Link>
              <Link
                href="/property-management"
                className="inline-flex items-center rounded-lg border-2 border-[#065f46] px-6 py-3 text-sm font-semibold text-[#065f46] transition-all hover:bg-[#065f46]/5"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              {heroSlides.map((slide, index) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.name}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}

              {/* Navigation Arrows */}
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

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to ${heroSlides[index].name}`}
                    type="button"
                  />
                ))}
              </div>
            </div>

            {/* Property Title Below Image */}
            <Link
              href={`/properties/${heroSlides[current].slug}`}
              className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
            >
              <span className="text-sm font-semibold text-gray-800">
                {heroSlides[current].name}
              </span>
              <span className="text-xs font-medium text-[#065f46]">
                View Property →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
