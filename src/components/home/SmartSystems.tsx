import Link from "next/link";
import Image from "next/image";

const SmartSystems = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Automate With Smart Systems
        </h2>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <Image
              src="/images/branding/smart-systems-badge.png"
              alt="Smart Systems by CEO Hosting U"
              width={160}
              height={160}
              className="h-36 w-36 object-contain"
            />
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed">
              CEO Hosting U helps businesses and property operations become more
              automated through AI, CRM workflows, follow-up systems, data
              tracking, and lead capture.
            </p>
            <Link
              href="/ai-automation"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#065f46] transition-colors hover:text-[#065f46]/80"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSystems;
