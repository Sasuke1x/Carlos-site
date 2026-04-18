import Link from "next/link";

import { DEFAULT_HOMEPAGE, DEFAULT_SITE_SETTINGS } from "@/sanity/fallbacks";

export interface FinalCtaProps {
  title?: string;
  callLabel?: string;
  submitLabel?: string;
  submitHref?: string;
  contactPhone?: string;
}

const FinalCta = ({
  title = DEFAULT_HOMEPAGE.finalCtaTitle,
  callLabel = DEFAULT_HOMEPAGE.finalCtaCallLabel,
  submitLabel = DEFAULT_HOMEPAGE.finalCtaSubmitLabel,
  submitHref = DEFAULT_HOMEPAGE.finalCtaSubmitHref,
  contactPhone = DEFAULT_SITE_SETTINGS.contactPhone,
}: FinalCtaProps) => {
  const telHref = contactPhone ? `tel:${contactPhone}` : undefined;

  return (
    <section className="bg-[#065f46]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        {title ? (
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {callLabel && telHref ? (
            <a
              href={telHref}
              className="inline-flex items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
            >
              {callLabel}
            </a>
          ) : null}
          {submitLabel && submitHref ? (
            <Link
              href={submitHref}
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              {submitLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
