import Image from "next/image";

import {
  DEFAULT_HOMEPAGE,
  FALLBACK_TRIAD_BADGE_SRC,
} from "@/sanity/fallbacks";
import { imageUrl } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types";

export interface TriadAuthorityProps {
  heading?: string;
  cities?: string;
  description?: string;
  triadBadge?: SanityImage;
}

const TriadAuthority = ({
  heading = DEFAULT_HOMEPAGE.triadHeading,
  cities = DEFAULT_HOMEPAGE.triadCities,
  description = DEFAULT_HOMEPAGE.triadDescription,
  triadBadge,
}: TriadAuthorityProps) => {
  const badgeUrl = imageUrl(triadBadge, 400) ?? FALLBACK_TRIAD_BADGE_SRC;
  const badgeAlt = triadBadge?.alt ?? "Triad North Carolina";

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="flex-shrink-0">
            <Image
              src={badgeUrl}
              alt={badgeAlt}
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </div>
          <div>
            {heading ? (
              <h2 className="text-3xl font-bold text-[#065f46]">{heading}</h2>
            ) : null}
            {cities ? (
              <p className="mt-3 text-lg font-semibold text-[#065f46]">
                {cities}
              </p>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriadAuthority;
