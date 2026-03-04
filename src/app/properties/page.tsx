import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse our professionally managed furnished homes in Lexington, NC serving the greater Triad region.",
};

const PropertiesPage = () => {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="pb-6">
          <h1 className="text-[28px] font-semibold text-gray-900">
            All properties
          </h1>
          <p className="mt-1 text-[15px] text-gray-500">
            Professionally managed furnished homes in Lexington, NC &middot; Triad region
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="group block"
              aria-label={`View ${property.name}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={property.heroImage}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {property.name}
                  </h2>
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
                <p className="mt-1">
                  <span className="text-[15px] font-semibold text-gray-900">
                    {property.tagline}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PropertiesPage;
