import type { Metadata } from "next";
import { Gift } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { vipPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_VIP_PAGE } from "@/sanity/fallbacks";
import type { VipPage } from "@/sanity/types";
import VipForm from "@/components/vip/VipForm";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<VipPage>(vipPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "Join the VIP Club | CEO Hosting U",
    description:
      "Join the CEO Hosting U VIP list for direct-booking discounts, priority access to open dates, and early notifications on new properties.",
  });
}

const VipPageRoute = async () => {
  const page = await sanityFetch<VipPage>(vipPageQuery);
  const data: VipPage = { ...DEFAULT_VIP_PAGE, ...(page ?? {}) };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a847]/10">
            <Gift className="h-7 w-7 text-[#d4a847]" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {data.heroTitle ?? "Join the CEO Hosting U VIP List"}
          </h1>
          <p className="mt-3 text-gray-600">
            {data.heroDescription ??
              "Save on future direct bookings + get priority access to open dates"}
          </p>
        </div>

        <VipForm
          emailConsentLabel={
            data.emailConsentLabel ??
            "I agree to receive email offers and updates from CEO Hosting U"
          }
          smsConsentLabel={
            data.smsConsentLabel ??
            "I agree to receive text messages from CEO Hosting U"
          }
          submitButtonLabel={data.submitButtonLabel ?? "Join the VIP List"}
        />
      </div>
    </section>
  );
};

export default VipPageRoute;
