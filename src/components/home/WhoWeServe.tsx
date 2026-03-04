import {
  Stethoscope,
  Briefcase,
  ShieldCheck,
  HardHat,
  Users,
} from "lucide-react";

const audiences = [
  {
    icon: Stethoscope,
    title: "Traveling Nurses",
    description: "Furnished homes near hospitals and clinics throughout the Triad.",
  },
  {
    icon: Briefcase,
    title: "Corporate Relocations",
    description: "Move-in ready housing for professionals transitioning to the area.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Displacement",
    description: "Safe, welcoming homes for families displaced by emergencies.",
  },
  {
    icon: HardHat,
    title: "Construction Crews",
    description: "Convenient stays for crews working projects in the Triad.",
  },
  {
    icon: Users,
    title: "Visiting Families",
    description: "Spacious homes for reunions, events, or extended visits.",
  },
] as const;

const WhoWeServe = () => {
  return (
    <section className="border-t border-gray-100 px-6 py-16 lg:px-10" aria-labelledby="who-we-serve-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            id="who-we-serve-heading"
            className="text-[22px] font-semibold text-gray-900"
          >
            Who we serve
          </h2>
          <p className="max-w-md text-[15px] text-gray-500">
            Whether you&apos;re here for work, recovery, or family &mdash; we have a home ready.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-8 text-center transition-all duration-200 hover:border-[#d4a847]/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#065f46]/5 transition-colors duration-200 group-hover:bg-[#d4a847]/10">
                <audience.icon
                  className="h-5 w-5 text-[#065f46] transition-colors duration-200 group-hover:text-[#d4a847]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                {audience.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Conveniently located near{" "}
          <span className="font-medium text-gray-900">Winston-Salem</span>,{" "}
          <span className="font-medium text-gray-900">High Point</span>, and{" "}
          <span className="font-medium text-gray-900">Greensboro</span>
        </p>
      </div>
    </section>
  );
};

export default WhoWeServe;
