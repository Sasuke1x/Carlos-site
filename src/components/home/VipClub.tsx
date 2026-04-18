import Link from "next/link";

import { DEFAULT_HOMEPAGE } from "@/sanity/fallbacks";

export interface VipClubProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

const VipClub = ({
  title = DEFAULT_HOMEPAGE.vipTitle,
  description = DEFAULT_HOMEPAGE.vipDescription,
  buttonLabel = DEFAULT_HOMEPAGE.vipButtonLabel,
  buttonHref = DEFAULT_HOMEPAGE.vipButtonHref,
}: VipClubProps) => {
  return (
    <section className="bg-[#f8f6f0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            {title ? (
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-lg text-gray-600">{description}</p>
            ) : null}
          </div>
          {buttonLabel && buttonHref ? (
            <Link
              href={buttonHref}
              className="inline-flex flex-shrink-0 items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
            >
              {buttonLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default VipClub;
