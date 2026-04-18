import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

import { sanityFetch } from "@/sanity/lib/fetch";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { contactPageQuery } from "@/sanity/lib/queries";
import { DEFAULT_CONTACT_PAGE } from "@/sanity/fallbacks";
import { getIcon } from "@/sanity/lib/icons";
import type { ContactPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<ContactPage>(contactPageQuery);
  return buildPageMetadata(page?.seo, {
    title: "Contact Us | CEO Hosting U",
    description:
      "Get in touch with CEO Hosting U. Reach out for guest inquiries, property management, or service questions. Based in Lexington, NC, serving the Triad region.",
  });
}

const ContactPageRoute = async () => {
  const page = await sanityFetch<ContactPage>(contactPageQuery);
  const data: ContactPage = { ...DEFAULT_CONTACT_PAGE, ...(page ?? {}) };
  const infoCards =
    data.infoCards && data.infoCards.length > 0
      ? data.infoCards
      : DEFAULT_CONTACT_PAGE.infoCards ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            {data.heroSubtitle ?? "Contact"}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-gold-400">
              {data.heroTitle ?? "Get in Touch"}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-200">
            {data.heroDescription ??
              "Have a question about booking, property management, or our services? We'd love to hear from you."}
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-2 text-2xl font-bold text-green-950">
                {data.formTitle ?? "Send Us a Message"}
              </h2>
              <p className="mb-8 text-gray-600">
                {data.formDescription ??
                  "Fill out the form below and we'll get back to you as soon as possible."}
              </p>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                <ContactForm />
              </div>
              {data.responseTimeMessage && (
                <p className="mt-4 text-sm text-gray-500">
                  {data.responseTimeMessage}
                </p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2" aria-label="Contact information">
              <h2 className="mb-6 text-2xl font-bold text-green-950">
                Contact Info
              </h2>
              <div className="space-y-6">
                {infoCards.map((detail, idx) => {
                  const Icon = getIcon(detail.icon, Mail);
                  return (
                    <div key={detail.label ?? idx} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="font-semibold text-green-900 underline-offset-2 transition-colors hover:text-gold-500 hover:underline focus:outline-none focus:underline"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-green-900">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              {data.mapEmbedUrl ? (
                <div className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-green-100">
                  <iframe
                    src={data.mapEmbedUrl}
                    title="Location map"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  className="mt-10 flex aspect-[4/3] flex-col items-center justify-center rounded-2xl bg-green-100"
                  role="img"
                  aria-label="Map of Lexington, NC area — coming soon"
                >
                  <MapPin
                    className="mb-3 h-10 w-10 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-green-700">
                    Map Coming Soon
                  </p>
                  <p className="text-xs text-green-500">
                    Lexington, NC &middot; Triad Region
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPageRoute;
