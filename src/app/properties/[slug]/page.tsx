import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Users,
  Bed,
  CheckCircle2,
  PawPrint,
  CigaretteOff,
  PartyPopper,
  Clock,
  ChevronRight,
} from "lucide-react";
import { getPropertyBySlug, getAllPropertySlugs } from "@/lib/properties";
import PropertyGallery from "@/components/properties/PropertyGallery";
const HOSPITABLE_SITE_ID = "a179291f-6d0e-4af3-8d0b-f23a48da82ed";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => {
  return getAllPropertySlugs().map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found | CEO Hosting U" };
  }

  return {
    title: `${property.name} | CEO Hosting U`,
    description: property.summary,
  };
};

const PropertyDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="-mt-32 min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#022c22] px-4 pt-40 pb-4"
      >
        <ol className="mx-auto flex max-w-5xl items-center gap-1.5 text-sm text-emerald-200/70">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-white focus:outline-none focus:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </li>
          <li>
            <Link
              href="/properties"
              className="transition-colors hover:text-white focus:outline-none focus:underline"
            >
              Properties
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </li>
          <li>
            <span className="text-white font-medium">{property.name}</span>
          </li>
        </ol>
      </nav>

      {/* Hero header */}
      <section className="bg-[#022c22] px-4 pb-10">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full bg-[#065f46] px-3 py-1 text-xs font-medium text-emerald-100">
            {property.propertyType}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {property.name}
          </h1>
          <p className="mt-2 text-base text-[#d4a847] font-medium sm:text-lg">
            {property.tagline}
          </p>
          <p className="mt-1 text-sm text-emerald-200/70">
            {property.address.display}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        {/* Image Gallery */}
        <section aria-label="Property photos">
          <PropertyGallery images={property.images} />
        </section>

        {/* Quick Stats */}
        <section
          aria-label="Property capacity"
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            {
              icon: BedDouble,
              label: `${property.capacity.bedrooms} ${property.capacity.bedrooms === 1 ? "Bedroom" : "Bedrooms"}`,
            },
            {
              icon: Bath,
              label: `${property.capacity.bathrooms} ${property.capacity.bathrooms === 1 ? "Bathroom" : "Bathrooms"}`,
            },
            {
              icon: Bed,
              label: `${property.capacity.beds} ${property.capacity.beds === 1 ? "Bed" : "Beds"}`,
            },
            {
              icon: Users,
              label: `${property.capacity.guests} Guests`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5"
            >
              <stat.icon
                className="h-5 w-5 flex-shrink-0 text-[#065f46]"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-700">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left column - main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                About This Property
              </h2>
              <p className="mt-3 leading-relaxed text-neutral-600">
                {property.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                Highlights
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {property.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-[#065f46]"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-neutral-700">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                Amenities
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm text-neutral-700 border border-neutral-100"
                  >
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4a847]"
                      aria-hidden="true"
                    />
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>

            {/* Ideal For */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                Ideal For
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.idealFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#065f46]/20 bg-[#065f46]/5 px-4 py-2 text-sm font-medium text-[#065f46]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* House Rules */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                House Rules
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <PawPrint
                    className={`h-5 w-5 flex-shrink-0 ${property.houseRules.petsAllowed ? "text-[#065f46]" : "text-neutral-400"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-neutral-700">
                    Pets{" "}
                    {property.houseRules.petsAllowed
                      ? "Allowed"
                      : "Not Allowed"}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <CigaretteOff
                    className={`h-5 w-5 flex-shrink-0 ${property.houseRules.smokingAllowed ? "text-[#065f46]" : "text-neutral-400"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-neutral-700">
                    Smoking{" "}
                    {property.houseRules.smokingAllowed
                      ? "Allowed"
                      : "Not Allowed"}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <PartyPopper
                    className={`h-5 w-5 flex-shrink-0 ${property.houseRules.eventsAllowed ? "text-[#065f46]" : "text-neutral-400"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-neutral-700">
                    Events{" "}
                    {property.houseRules.eventsAllowed
                      ? "Allowed"
                      : "Not Allowed"}
                  </span>
                </div>
              </div>
            </section>

            {/* Check-in / Check-out */}
            <section>
              <h2 className="text-xl font-semibold text-[#022c22]">
                Check-in & Check-out
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <Clock
                    className="h-5 w-5 flex-shrink-0 text-[#065f46]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      Check-in
                    </p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {property.checkin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <Clock
                    className="h-5 w-5 flex-shrink-0 text-[#065f46]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      Check-out
                    </p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {property.checkout}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="mt-6 rounded-xl bg-amber-50 border border-amber-100 p-5">
              <h3 className="text-sm font-semibold text-amber-800">Cancellation Policy</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-700">
                <li>7–30 days before check-in: 50% refund</li>
                <li>Less than 7 days before check-in: Non-refundable</li>
              </ul>
            </section>
          </div>

          {/* Right column - Booking Widget (sticky sidebar) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-36 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <iframe
                id="booking-iframe"
                sandbox="allow-top-navigation allow-scripts allow-same-origin"
                style={{ width: "100%", height: "520px", border: "none" }}
                frameBorder="0"
                src={`https://booking.hospitable.com/widget/${HOSPITABLE_SITE_ID}/${property.widget_id}`}
                title={`Book ${property.name}`}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
