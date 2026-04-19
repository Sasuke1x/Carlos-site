import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { managementPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_MANAGEMENT_PAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import type { ManagementPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<ManagementPage>(managementPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "Property Management | CEO Hosting U",
    description:
      "Full-service short-term and corporate rental management for property owners in the Triad region. Multi-platform listings, guest communication, cleaning, and revenue optimization.",
  });
}

const PropertyManagementPageRoute = async () => {
  const page = await sanityFetch<ManagementPage>(managementPageQuery);
  const data: ManagementPage = { ...DEFAULT_MANAGEMENT_PAGE, ...(page ?? {}) };
  const services =
    data.services && data.services.length > 0
      ? data.services
      : DEFAULT_MANAGEMENT_PAGE.services ?? [];
  const processSteps =
    data.processSteps && data.processSteps.length > 0
      ? data.processSteps
      : DEFAULT_MANAGEMENT_PAGE.processSteps ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Property Management
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {data.heroTitle ?? (
              <>
                We Manage. You Earn.
                <br />
                <span className="text-gold-400">We Handle the Rest.</span>
              </>
            )}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            {data.heroDescription}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-950 focus:outline-none"
            >
              Request a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-green-700 px-8 py-3.5 font-semibold text-white transition-colors hover:border-green-500 hover:bg-green-900 focus:ring-2 focus:ring-green-700/50 focus:ring-offset-2 focus:ring-offset-green-950 focus:outline-none"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              {data.servicesTitle ?? "What We Handle For You"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our end-to-end management services cover every aspect of
              short-term rental operations.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = getIcon(service.icon, Home);
              return (
                <article
                  key={service.title ?? idx}
                  className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors group-hover:bg-gold-400/20 group-hover:text-gold-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-950">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps (optional — only rendered when Carlos adds them in Sanity) */}
      {processSteps.length > 0 && (
        <section className="bg-green-50/50 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-green-950 md:text-4xl">
              {data.processTitle ?? "How It Works"}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {processSteps.map((item, idx) => (
                <div key={item.title ?? idx} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-800 text-lg font-bold text-gold-400">
                    {String(item.step ?? idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-950">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Form */}
      <section
        id="consultation"
        className="scroll-mt-8 bg-green-50/50 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
                {data.consultationCtaTitle ?? "Request a Consultation"}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {data.consultationCtaDescription ??
                  "Whether you own one property or several, we'd love to learn about your goals. Fill out the form and a member of our team will reach out within 24 hours to discuss how we can help you earn more with less effort."}
              </p>
              <div className="space-y-4">
                {[
                  "No long-term contracts required",
                  "Transparent pricing, no hidden fees",
                  "Local team based in Lexington, NC",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800">
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-green-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg md:p-10">
              <ConsultationForm
                thankYouTitle={data.consultationThankYouTitle}
                thankYouMessage={data.consultationThankYouMessage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyManagementPageRoute;
