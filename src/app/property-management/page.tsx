import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutList,
  Globe,
  MessageSquare,
  SparklesIcon,
  TrendingUp,
  Hammer,
  ArrowRight,
} from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Property Management | CEO HostingYou",
  description:
    "Full-service short-term and corporate rental management for property owners in the Triad region. Multi-platform listings, guest communication, cleaning, and revenue optimization.",
};

const services = [
  {
    icon: LayoutList,
    title: "Multi-Platform Listing Management",
    description:
      "We list and optimize your property across Airbnb, Vrbo, Booking.com, and more to maximize visibility and bookings.",
  },
  {
    icon: Globe,
    title: "Direct Booking Website Exposure",
    description:
      "Your property gets featured on our direct booking platform, reducing commission fees and building your brand.",
  },
  {
    icon: MessageSquare,
    title: "Guest Communication Automation",
    description:
      "Automated yet personal messaging handles inquiries, check-in instructions, and reviews around the clock.",
  },
  {
    icon: SparklesIcon,
    title: "Professional Cleaning Coordination",
    description:
      "Our vetted cleaning teams ensure every turnover meets hotel-level standards, every single time.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    description:
      "Dynamic pricing, seasonal adjustments, and market analysis keep your property earning at peak performance.",
  },
  {
    icon: Hammer,
    title: "In-House Renovation Services",
    description:
      "Need upgrades? Our renovation team handles everything from cosmetic refreshes to full remodels — all in-house.",
  },
];

const PropertyManagementPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Property Management
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            We Manage. You Earn.
            <br />
            <span className="text-gold-400">We Handle the Rest.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            Full-service short-term and corporate rental management for property
            owners in the Triad region. From listing optimization to guest
            communication and cleaning coordination — we take care of everything
            so you can enjoy consistent, hands-off income.
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
              What We Handle For You
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our end-to-end management services cover every aspect of
              short-term rental operations.
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

      {/* Consultation Form */}
      <section
        id="consultation"
        className="scroll-mt-8 bg-green-50/50 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
                Request a Consultation
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Whether you own one property or several, we&apos;d love to learn
                about your goals. Fill out the form and a member of our team
                will reach out within 24 hours to discuss how we can help you
                earn more with less effort.
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
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyManagementPage;
