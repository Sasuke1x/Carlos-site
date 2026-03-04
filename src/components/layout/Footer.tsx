import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_LINKS = [
  { label: "Property Management", href: "/property-management" },
  { label: "Renovation & Fix/Flip", href: "/renovation" },
  { label: "AI & Automation", href: "/ai-automation" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight" aria-label="CEO HostingYou — Go to homepage">
              <span className="text-[13px] font-semibold uppercase tracking-widest text-[#d4a847]">CEO</span>
              <span className="ml-1 text-gray-900">Hosting</span>
              <span className="text-[#d4a847]">You</span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              Professionally operated short-term and corporate rentals
              throughout the Triad region of North Carolina.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <span className="flex items-center gap-2 text-[13px] text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#d4a847]" aria-hidden="true" />
                Lexington, NC
              </span>
              <a
                href="mailto:Mizeenterprise1@gmail.com"
                className="flex items-center gap-2 text-[13px] text-gray-500 transition-colors hover:text-gray-800"
                aria-label="Send email to Mizeenterprise1@gmail.com"
              >
                <Mail className="h-3.5 w-3.5 text-[#d4a847]" aria-hidden="true" />
                Mizeenterprise1@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/properties"
                  className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                >
                  Book a Stay
                </Link>
              </li>
              <li>
                <a
                  href="mailto:Mizeenterprise1@gmail.com"
                  className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CEO HostingYou. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            CEO: Carlos E Ontiveros
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
