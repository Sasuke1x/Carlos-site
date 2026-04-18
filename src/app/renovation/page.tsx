import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  LayoutGrid,
  Paintbrush,
  ChefHat,
  TrendingUp,
  HardHat,
  ArrowRight,
} from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { renovationPageQuery } from "@/sanity/lib/queries";
import type { RenovationPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<RenovationPage>(renovationPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "Renovation & Fix/Flip | CEO Hosting U",
    description:
      "Strategic property renovations, layout improvements, and cosmetic enhancements designed to increase rental performance and long-term value in the Triad region.",
  });
}

const services = [
  {
    icon: ClipboardCheck,
    title: "Strategic Property Assessment",
    description:
      "We evaluate each property to identify the highest-impact improvements for your budget and goals.",
  },
  {
    icon: LayoutGrid,
    title: "Layout Optimization",
    description:
      "Reconfigure spaces to maximize usable square footage, improve flow, and increase guest capacity.",
  },
  {
    icon: Paintbrush,
    title: "Modern Cosmetic Upgrades",
    description:
      "Fresh finishes, modern fixtures, and curated design choices that photograph beautifully and impress guests.",
  },
  {
    icon: ChefHat,
    title: "Kitchen & Bath Renovations",
    description:
      "Full kitchen and bathroom remodels that combine style, durability, and functionality for rental properties.",
  },
  {
    icon: TrendingUp,
    title: "Value-Add for Rental Performance",
    description:
      "Every renovation decision is driven by data — we upgrade what moves the needle on nightly rates and occupancy.",
  },
  {
    icon: HardHat,
    title: "Fix & Flip Project Management",
    description:
      "End-to-end project management for fix-and-flip investments, from acquisition analysis to final sale.",
  },
];

const RenovationPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Renovation &amp; Fix/Flip
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Renovation &amp;{" "}
            <span className="text-gold-400">Value-Add Services</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            We specialize in upgrading properties to modern standards through
            strategic renovations, layout improvements, and cosmetic
            enhancements designed to increase rental performance and long-term
            value. Our experience in both construction and rental operations
            allows us to renovate with performance in mind — not just
            appearance.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              Our Renovation Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              From cosmetic refreshes to full gut renovations, we handle every
              phase with precision and purpose.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors group-hover:bg-gold-400/20 group-hover:text-gold-500">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-green-950">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery / CTA */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Our Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            We partner with property owners across the Triad to deliver
            renovation projects that increase value and rental performance.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Kitchen & Bath Remodels",
                desc: "Modern upgrades that increase property value and guest satisfaction.",
              },
              {
                title: "Full Property Renovations",
                desc: "End-to-end project management for fix & flip or rental conversion.",
              },
              {
                title: "Value-Add Improvements",
                desc: "Strategic upgrades designed to maximize return on investment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>

      {/* CTA */}
      <section className="bg-green-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Property?
          </h2>
          <p className="mb-10 text-lg text-green-200">
            Whether you&apos;re preparing a home for short-term rental, planning
            a flip, or simply want to increase your property&apos;s value —
            we&apos;d love to talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none"
          >
            Learn About Our Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RenovationPage;
