"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Management", href: "/property-management" },
  { label: "Renovation", href: "/renovation" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const useTransparent = false;

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCloseMobileMenu();
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        useTransparent
          ? "bg-transparent"
          : "bg-white/95 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/branding/ceo-hosting-u-logo.png"
            alt="CEO Hosting U"
            width={200}
            height={60}
            className="h-24 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                useTransparent
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-gray-700 hover:bg-black/5 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/properties"
            className={`hidden rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 sm:inline-flex ${
              useTransparent
                ? "bg-white text-[#065f46] hover:bg-white/90"
                : "bg-[#065f46] text-white hover:bg-[#053e2e]"
            }`}
          >
            Book Now
          </Link>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full p-2.5 transition-colors lg:hidden ${
              useTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={handleCloseMobileMenu}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleKeyDown}
        className={`fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link
            href="/"
            onClick={handleCloseMobileMenu}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/branding/ceo-hosting-u-logo.png"
              alt="CEO Hosting U"
              width={180}
              height={54}
              className="h-9 w-auto"
            />
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            onClick={handleCloseMobileMenu}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleCloseMobileMenu}
                  className="block rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-100 px-4 py-5">
          <Link
            href="/properties"
            onClick={handleCloseMobileMenu}
            className="flex w-full items-center justify-center rounded-xl bg-[#065f46] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#053e2e]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
