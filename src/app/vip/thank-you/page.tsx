import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { vipPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_VIP_PAGE } from "@/sanity/fallbacks";
import type { VipPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Welcome to the VIP List | CEO Hosting U",
  description: "Thanks for joining the CEO Hosting U VIP Club.",
  robots: { index: false, follow: false },
};

const VipThankYouPage = async () => {
  const page = await sanityFetch<VipPage>(vipPageQuery);
  const data: VipPage = { ...DEFAULT_VIP_PAGE, ...(page ?? {}) };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#065f46]/10">
          <CheckCircle className="h-8 w-8 text-[#065f46]" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          {data.thankYouTitle ?? "Welcome to the VIP List!"}
        </h1>
        <p className="mt-4 text-gray-600">
          {data.thankYouMessage ??
            `You're now a CEO Hosting U VIP member. Enjoy ${
              data.discountPercent ?? 15
            }% off your next direct booking and priority access to open dates.`}
        </p>
        <Link
          href={data.thankYouButtonHref ?? "/properties"}
          className="mt-8 inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
        >
          {data.thankYouButtonLabel ?? "Browse Properties & Book Direct"}
        </Link>
      </div>
    </section>
  );
};

export default VipThankYouPage;
