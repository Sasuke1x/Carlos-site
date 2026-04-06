import Link from "next/link";

const FinalCta = () => {
  return (
    <section className="bg-[#065f46]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+13368835635"
            className="inline-flex items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
          >
            Call Now
          </a>
          <Link
            href="/property-management#consultation"
            className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Submit Property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
