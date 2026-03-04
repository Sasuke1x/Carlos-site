import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const OwnerCTA = () => {
  return (
    <section className="px-6 py-16 lg:px-10" aria-labelledby="owner-cta-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-3xl bg-[#022c22]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/properties/mize-road/57d3136b-9d85-46cc-8691-cde73f2f1c72.jpg.avif"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#022c22] via-[#022c22]/95 to-[#022c22]/70" />

          <div className="relative flex flex-col items-start gap-6 px-8 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-16">
            <div className="max-w-lg">
              <h2
                id="owner-cta-heading"
                className="text-2xl font-semibold text-white sm:text-3xl"
              >
                Own property in the Triad?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Let us manage it for you. We handle everything from listing
                optimization to guest communication and cleaning coordination.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <Link
                href="/property-management"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#d4a847] px-6 py-3.5 text-sm font-semibold text-[#022c22] transition-all hover:bg-[#c9982c]"
                aria-label="Learn about property management"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                aria-label="Contact us"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
