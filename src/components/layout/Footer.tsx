import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_SITE_SETTINGS,
  FALLBACK_LOGO_SRC,
} from "@/sanity/fallbacks";
import type { FooterSettings, SiteSettings } from "@/sanity/types";

export interface FooterProps {
  footerSettings?: FooterSettings | null;
  siteSettings?: SiteSettings | null;
  logoUrl?: string | null;
}

function formatCopyright(text: string | undefined, siteName: string): string {
  const year = new Date().getFullYear();
  if (text) return text.replace(/\{year\}/g, String(year));
  return `© ${year} ${siteName}. All rights reserved.`;
}

const Footer = ({ footerSettings, siteSettings, logoUrl }: FooterProps) => {
  const footer = { ...DEFAULT_FOOTER_SETTINGS, ...(footerSettings ?? {}) };
  const site = { ...DEFAULT_SITE_SETTINGS, ...(siteSettings ?? {}) };

  const siteName = site.siteName ?? DEFAULT_SITE_SETTINGS.siteName;
  const resolvedLogo = logoUrl ?? FALLBACK_LOGO_SRC;
  const contactEmail = site.contactEmail;
  const phoneDisplay = site.phoneDisplay;
  const contactPhone = site.contactPhone;
  const location = site.location;
  const locationDescription = site.locationDescription;

  const servicesLinks = footer.servicesLinks ?? [];
  const quickLinks = footer.quickLinks ?? [];
  const description = footer.description;

  return (
    <footer className="bg-[#022c22] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src={resolvedLogo}
                alt={siteName}
                width={160}
                height={48}
                className="h-16 w-auto"
              />
            </Link>
            {description ? (
              <p className="text-sm text-gray-300 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) =>
                link.label && link.href ? (
                  <li key={`${link.href}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactEmail ? (
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactEmail}
                  </a>
                </li>
              ) : null}
              {contactPhone && phoneDisplay ? (
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                  <a
                    href={`tel:${contactPhone}`}
                    className="hover:text-white transition-colors"
                  >
                    {phoneDisplay}
                  </a>
                </li>
              ) : null}
              {location ? (
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                  <span>
                    {location}
                    {locationDescription ? ` — ${locationDescription}` : ""}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) =>
                link.label && link.href ? (
                  <li key={`${link.href}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-400">
            {formatCopyright(footer.copyrightText, siteName)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
