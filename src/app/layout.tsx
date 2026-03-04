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
  title: {
    default: "CEO HostingYou | Modern Furnished Homes in the Triad, NC",
    template: "%s | CEO HostingYou",
  },
  description:
    "Professionally managed short-term and corporate housing in Lexington, NC serving the greater Triad region. Book your stay directly for the best rates.",
  keywords: [
    "Corporate Housing Lexington NC",
    "Short-Term Rental Triad NC",
    "Furnished Rentals Near Winston-Salem",
    "Lexington NC short term rentals",
    "corporate housing Triad North Carolina",
    "furnished homes Greensboro High Point",
  ],
  openGraph: {
    title: "CEO HostingYou | Modern Furnished Homes in the Triad, NC",
    description:
      "Professionally managed short-term and corporate housing in Lexington, NC serving the greater Triad region.",
    type: "website",
    locale: "en_US",
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
