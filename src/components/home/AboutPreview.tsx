import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="border-t border-gray-100 px-6 py-16 lg:px-10" aria-labelledby="about-preview-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/properties/linwood-retreat/a9941843-dbc2-4c84-a475-e4c22113f2cd.jpeg.avif"
              alt="One of our furnished homes in Lexington, NC"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a847]">
              About CEO Hosting U
            </p>
            <h2
              id="about-preview-heading"
              className="mt-3 text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl"
            >
              Family-owned.
              <br />
              Professionally operated.
              <br />
              <span className="text-[#065f46]">Built for comfort.</span>
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-gray-500">
              We&apos;re a modern housing company based in Lexington, North
              Carolina, serving the greater Triad region. Every property meets
              high standards of quality, functionality, and presentation &mdash;
              because when you stay with us, you&apos;re choosing a team
              committed to consistency and care.
            </p>

            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#065f46] transition-colors hover:text-[#053e2e]"
              aria-label="Learn more about CEO Hosting U"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
