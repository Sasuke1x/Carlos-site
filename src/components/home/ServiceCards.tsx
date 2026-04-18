import Link from "next/link";
import { Home } from "lucide-react";

import { DEFAULT_HOMEPAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import type { ServiceCard } from "@/sanity/types";

export interface ServiceCardsProps {
  title?: string;
  cards?: ServiceCard[];
}

const ServiceCards = ({
  title = DEFAULT_HOMEPAGE.serviceCardsTitle,
  cards,
}: ServiceCardsProps) => {
  const resolved =
    cards && cards.length > 0 ? cards : DEFAULT_HOMEPAGE.serviceCards ?? [];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          {title ? (
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          ) : null}
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#d4a847]" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {resolved.map((service, index) => {
            const Icon = getIcon(service.icon, Home);
            const key = service.title ?? `service-${index}`;
            return (
              <div
                key={key}
                className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#065f46]/10">
                  <Icon className="h-7 w-7 text-[#065f46]" />
                </div>
                {service.title ? (
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                ) : null}
                {service.bullets && service.bullets.length > 0 ? (
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
                ) : null}
                {service.buttonLabel && service.buttonHref ? (
                  <Link
                    href={service.buttonHref}
                    className="mt-6 inline-flex items-center rounded-lg bg-[#065f46] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#065f46]/90"
                  >
                    {service.buttonLabel}
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
