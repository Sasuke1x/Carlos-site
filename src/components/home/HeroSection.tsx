"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    src: "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
    alt: "Furnished kitchen and dining area",
  },
  {
    src: "/images/properties/linwood-retreat/48b67188-6121-41a3-a86b-d4927f80b705.jpeg.avif",
    alt: "Family retreat with hot tub",
  },
  {
    src: "/images/properties/mize-road/57d3136b-9d85-46cc-8691-cde73f2f1c72.jpg.avif",
    alt: "Cozy Mize Road home",
  },
  {
    src: "/images/properties/salisbury-apt-b/22874c14-36af-45ba-b4ba-6e8c34a3eb56.jpeg.avif",
    alt: "Modern Lexington apartment",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            {heroImages.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
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
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/50"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
