"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

import { DEFAULT_SITE_SETTINGS, FALLBACK_LOGO_SRC } from "@/sanity/fallbacks";

export interface HeaderProps {
  siteName?: string;
  logoUrl?: string | null;
  logoAlt?: string;
  contactPhone?: string;
  phoneDisplay?: string;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Management", href: "/property-management" },
  { label: "Renovation", href: "/renovation" },
];

const Header = ({
  siteName = DEFAULT_SITE_SETTINGS.siteName,
  logoUrl,
  logoAlt,
  contactPhone = DEFAULT_SITE_SETTINGS.contactPhone,
  phoneDisplay = DEFAULT_SITE_SETTINGS.phoneDisplay,
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const resolvedLogo = logoUrl ?? FALLBACK_LOGO_SRC;
  const resolvedLogoAlt = logoAlt ?? siteName ?? "CEO Hosting U";
  const telHref = contactPhone ? `tel:${contactPhone}` : undefined;

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 sm:px-6 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={resolvedLogo}
              alt={resolvedLogoAlt}
              width={200}
              height={60}
              className="h-14 w-auto sm:h-20 lg:h-24"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-[#065f46]/10 text-[#065f46]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="hidden rounded-full bg-[#065f46] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#053e2e] lg:inline-flex"
            >
              Book Now
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link href="/" onClick={closeMenu}>
              <Image
                src={resolvedLogo}
                alt={resolvedLogoAlt}
                width={160}
                height={48}
                className="h-14 w-auto"
              />
            </Link>
            <button
              type="button"
              className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-5 py-6" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center rounded-xl px-5 py-4 text-lg font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-[#065f46] text-white"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTAs */}
          <div className="border-t border-gray-100 p-5 space-y-3">
            <Link
              href="/properties"
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-xl bg-[#065f46] px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-[#053e2e]"
            >
              Book Now
            </Link>
            {telHref && phoneDisplay ? (
              <a
                href={telHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#d4a847] px-5 py-4 text-base font-semibold text-[#d4a847] transition-colors hover:bg-[#d4a847]/5"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
