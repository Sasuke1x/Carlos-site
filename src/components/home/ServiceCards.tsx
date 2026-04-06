import Link from "next/link";
import { Home, KeyRound, HardHat } from "lucide-react";

const services = [
  {
    title: "Furnished Housing",
    icon: Home,
    bullets: ["Short- and mid-term stays", "Direct booking focus"],
    button: { label: "Book a Stay", href: "/properties" },
  },
  {
    title: "Property Management",
    icon: KeyRound,
    bullets: ["Listing optimization", "Guest messaging + cleaning"],
    button: { label: "Learn More", href: "/property-management" },
  },
  {
    title: "Renovation + Partnerships",
    icon: HardHat,
    bullets: ["Construction collaborations", "Value-add project support"],
    button: { label: "Learn More", href: "/renovation" },
  },
];

const ServiceCards = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#d4a847]" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#065f46]/10">
                  <Icon className="h-7 w-7 text-[#065f46]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center justify-center gap-2 text-sm text-gray-500"
                    >
                      <span className="text-[#065f46]">&#10003;</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.button.href}
                  className="mt-6 inline-flex items-center rounded-lg bg-[#065f46] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#065f46]/90"
                >
                  {service.button.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
