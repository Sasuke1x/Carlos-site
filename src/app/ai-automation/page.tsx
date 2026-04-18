import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { aiAutomationPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_AI_AUTOMATION_PAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import type { AiAutomationPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<AiAutomationPage>(aiAutomationPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "AI & Business Automation | CEO Hosting U",
    description:
      "Helping local businesses run efficiently and modernize operations with website development, AI chatbots, marketing funnels, CRM automation, and more.",
  });
}

const AiAutomationPageRoute = async () => {
  const page = await sanityFetch<AiAutomationPage>(aiAutomationPageQuery);
  const data: AiAutomationPage = {
    ...DEFAULT_AI_AUTOMATION_PAGE,
    ...(page ?? {}),
  };
  const services =
    data.services && data.services.length > 0
      ? data.services
      : DEFAULT_AI_AUTOMATION_PAGE.services ?? [];
  const processSteps =
    data.processSteps && data.processSteps.length > 0
      ? data.processSteps
      : DEFAULT_AI_AUTOMATION_PAGE.processSteps ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            AI &amp; Automation
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {data.heroTitle ?? (
              <>
                AI &amp; Business{" "}
                <span className="text-gold-400">Automation Services</span>
              </>
            )}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            {data.heroDescription}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              {data.servicesTitle ?? "Our Services"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              From your first website to advanced AI integrations — we help
              businesses modernize at every stage.
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

      {/* How It Works */}
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

      {/* CTA */}
      <section className="bg-green-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {data.ctaTitle ?? "Ready to Modernize Your Business?"}
          </h2>
          <p className="mb-10 text-lg text-green-200">
            {data.ctaDescription ??
              "Let's talk about how AI and automation can save you time, reduce costs, and grow your revenue."}
          </p>
          <Link
            href={data.ctaButtonHref ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none"
          >
            {data.ctaButtonLabel ?? "Work With Us"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AiAutomationPageRoute;
