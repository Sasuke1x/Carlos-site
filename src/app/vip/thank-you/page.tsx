import Link from "next/link";
import { CheckCircle } from "lucide-react";

const VipThankYouPage = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#065f46]/10">
          <CheckCircle className="h-8 w-8 text-[#065f46]" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Welcome to the VIP List!
        </h1>
        <p className="mt-4 text-gray-600">
          You&apos;re now a CEO Hosting U VIP member. Enjoy 15% off your next
          direct booking and priority access to open dates.
        </p>
        <Link
          href="/properties"
          className="mt-8 inline-flex items-center rounded-lg bg-[#065f46] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#065f46]/90 hover:shadow-lg"
        >
          Browse Properties & Book Direct
        </Link>
      </div>
    </section>
  );
};

export default VipThankYouPage;
