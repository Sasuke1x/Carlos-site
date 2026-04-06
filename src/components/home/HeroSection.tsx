import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
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
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif"
              alt="Bright furnished living room in the Triad"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
