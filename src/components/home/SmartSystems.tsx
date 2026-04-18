import Link from "next/link";
import Image from "next/image";

import {
  DEFAULT_HOMEPAGE,
  FALLBACK_SMART_SYSTEMS_BADGE_SRC,
} from "@/sanity/fallbacks";
import { imageUrl } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types";

export interface SmartSystemsProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  smartSystemsBadge?: SanityImage;
}

const SmartSystems = ({
  title = DEFAULT_HOMEPAGE.smartSystemsTitle,
  description = DEFAULT_HOMEPAGE.smartSystemsDescription,
  buttonLabel = DEFAULT_HOMEPAGE.smartSystemsButtonLabel,
  buttonHref = DEFAULT_HOMEPAGE.smartSystemsButtonHref,
  smartSystemsBadge,
}: SmartSystemsProps) => {
  const badgeUrl =
    imageUrl(smartSystemsBadge, 320) ?? FALLBACK_SMART_SYSTEMS_BADGE_SRC;
  const badgeAlt =
    smartSystemsBadge?.alt ?? "Smart Systems by CEO Hosting U";

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {title ? (
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {title}
          </h2>
        ) : null}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <Image
              src={badgeUrl}
              alt={badgeAlt}
              width={160}
              height={160}
              className="h-36 w-36 object-contain"
            />
          </div>
          <div>
            {description ? (
              <p className="text-gray-600 leading-relaxed">{description}</p>
            ) : null}
            {buttonLabel && buttonHref ? (
              <Link
                href={buttonHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#065f46] transition-colors hover:text-[#065f46]/80"
              >
                {buttonLabel} &rarr;
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSystems;
