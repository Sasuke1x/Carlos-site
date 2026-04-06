import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceohostingu.com"
  ),
  title: {
    default: "CEO Hosting U | Furnished Housing & Property Management in the Triad",
    template: "%s | CEO Hosting U",
  },
  description:
    "Furnished housing and property management in the North Carolina Triad. Short-term, mid-term, insurance housing, and investor solutions in Winston-Salem, Greensboro, High Point, and Lexington.",
  keywords: [
    "CEO Hosting U",
    "Corporate Housing Lexington NC",
    "Short-Term Rental Triad NC",
    "Furnished Rentals Near Winston-Salem",
    "Lexington NC short term rentals",
    "corporate housing Triad North Carolina",
    "furnished homes Greensboro High Point",
  ],
  openGraph: {
    title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
    description:
      "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
    type: "website",
    images: ["/images/og-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEO Hosting U — Furnished Housing & Property Management in the Triad",
    description:
      "Short-term and mid-term furnished housing in Winston-Salem, Greensboro, High Point, and Lexington NC.",
    images: ["/images/og-preview.png"],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
