"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";

const HERO_IMAGES = [
  "/images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
  "/images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
  "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
  "/images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden" aria-label="Hero section">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === currentImage ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/80">
            Lexington, NC &middot; Triad Region
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your next stay,
            <br />
            <span className="bg-gradient-to-r from-[#d4a847] to-[#f0d68a] bg-clip-text text-transparent">
              made simple.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            Professionally managed furnished homes for families and
            professionals in the Triad of North Carolina.
          </p>
        </div>

        <div className="mt-10 w-full max-w-3xl">
          <Link
            href="/properties"
            className="group flex items-center gap-3 rounded-full bg-white/95 px-3 py-3 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:px-4 sm:py-3"
            aria-label="Search properties — view all homes"
          >
            <div className="flex flex-1 items-center gap-3 overflow-hidden sm:gap-0 sm:divide-x sm:divide-gray-200">
              <div className="flex items-center gap-2 px-3 py-1">
                <MapPin className="h-4 w-4 shrink-0 text-[#065f46]" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-800">Lexington, NC</span>
              </div>
              <div className="hidden items-center gap-2 px-4 py-1 sm:flex">
                <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                <span className="text-sm text-gray-400">Any dates</span>
              </div>
              <div className="hidden items-center gap-2 px-4 py-1 md:flex">
                <Users className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                <span className="text-sm text-gray-400">Add guests</span>
              </div>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#065f46] to-[#0d6e3f] text-white shadow-md transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </div>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-6">
          {[
            { n: "4", label: "Properties" },
            { n: "6", label: "Max Guests" },
            { n: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-semibold text-white sm:text-2xl">{stat.n}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentImage ? "w-8 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
