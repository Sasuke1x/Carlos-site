import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Bot,
  TrendingUp,
  Users,
  Share2,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Business Automation | CEO Hosting U",
  description:
    "Helping local businesses run efficiently and modernize operations with website development, AI chatbots, marketing funnels, CRM automation, and more.",
};

const services = [
  {
    icon: Globe,
    title: "Website Setup & Development",
    description:
      "Modern, fast, and mobile-responsive websites built to convert visitors into customers.",
  },
  {
    icon: Bot,
    title: "AI Chatbot Integration",
    description:
      "24/7 intelligent chatbots that handle customer inquiries, book appointments, and qualify leads automatically.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Funnels",
    description:
      "Strategic funnels that guide prospects from awareness to action with automated follow-up sequences.",
  },
  {
    icon: Users,
    title: "CRM Automation",
    description:
      "Streamline your customer relationships with automated workflows, reminders, and pipeline management.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Consistent, branded content across platforms with scheduling, engagement tracking, and performance analytics.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Reporting",
    description:
      "Actionable insights from your business data presented in clear dashboards and automated reports.",
  },
];

const AiAutomationPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            AI &amp; Automation
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            AI &amp; Business{" "}
            <span className="text-gold-400">Automation Services</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            Helping local businesses run efficiently and modernize operations.
            We bring enterprise-grade technology solutions to small and
            mid-sized businesses in the Triad region and beyond.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-950 md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              From your first website to advanced AI integrations — we help
              businesses modernize at every stage.
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

      {/* How It Works */}
      <section className="bg-green-50/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-green-950 md:text-4xl">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery Call",
                description:
                  "We learn about your business, goals, and current pain points to identify the best solutions.",
              },
              {
                step: "02",
                title: "Custom Strategy",
                description:
                  "We build a tailored plan with clear timelines, deliverables, and measurable outcomes.",
              },
              {
                step: "03",
                title: "Launch & Optimize",
                description:
                  "We implement, test, and continuously refine your systems for maximum performance.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-800 text-lg font-bold text-gold-400">
                  {item.step}
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
            Ready to Modernize Your Business?
          </h2>
          <p className="mb-10 text-lg text-green-200">
            Let&apos;s talk about how AI and automation can save you time, reduce
            costs, and grow your revenue.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none"
          >
            Work With Us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AiAutomationPage;
