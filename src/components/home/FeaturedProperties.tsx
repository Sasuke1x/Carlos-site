"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { properties } from "@/lib/properties";

const PropertyCard = ({
  property,
}: {
  property: (typeof properties)[number];
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const images = property.images.slice(0, 5);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block"
      aria-label={`View ${property.name}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === imgIndex ? property.name : ""}
            fill
            className={`object-cover transition-opacity duration-300 ${
              i === imgIndex ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={i === 0}
          />
        ))}

        <button
          onClick={handleToggleLike}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 transition-transform hover:scale-110"
          aria-label={isLiked ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`h-6 w-6 drop-shadow-md ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "fill-black/30 text-white"
            }`}
          />
        </button>

        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white hover:scale-105 group-hover:opacity-100"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white hover:scale-105 group-hover:opacity-100"
          aria-label="Next photo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-[5px] w-[5px] rounded-full transition-all ${
                i === imgIndex
                  ? "bg-white scale-110"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
            {property.name}
          </h3>
          <span className="mt-0.5 flex shrink-0 items-center gap-1 text-sm text-gray-900">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            New
          </span>
        </div>
        <p className="mt-0.5 text-[15px] text-gray-500">
          {property.address.display}
        </p>
        <p className="mt-0.5 text-[15px] text-gray-500">
          {property.capacity.bedrooms} bed{property.capacity.bedrooms > 1 && "s"} &middot;{" "}
          {property.capacity.bathrooms} bath{property.capacity.bathrooms > 1 && "s"} &middot;{" "}
          {property.capacity.guests} guests
        </p>
        <p className="mt-1 text-[15px] text-gray-500">
          <span className="font-semibold text-gray-900">{property.tagline}</span>
        </p>
      </div>
    </Link>
  );
};

const FeaturedProperties = () => {
  return (
    <section className="px-6 py-12 lg:px-10" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="featured-heading"
          className="text-[22px] font-semibold text-gray-900"
        >
          Featured homes in the Triad
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
