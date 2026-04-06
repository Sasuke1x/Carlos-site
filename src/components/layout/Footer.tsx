import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const SERVICES_LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "Property Management", href: "/property-management" },
  { label: "Renovation", href: "/renovation" },
  { label: "AI & Automation", href: "/ai-automation" },
];

const Footer = () => {
  return (
    <footer className="bg-[#022c22] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/branding/ceo-hosting-u-logo.png"
                alt="CEO Hosting U"
                width={160}
                height={48}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Family-owned. Professionally operated. Furnished housing and
              property management in the North Carolina Triad.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <a href="mailto:Mizeenterprise1@gmail.com" className="hover:text-white transition-colors">
                  Mizeenterprise1@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <a href="tel:+13368835635" className="hover:text-white transition-colors">
                  (336) 883-5635
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a847]" />
                <span>Lexington, NC — Serving the Triad</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d4a847]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Book a Stay
                </Link>
              </li>
              <li>
                <Link
                  href="/vip"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Join VIP Club
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CEO Hosting U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
