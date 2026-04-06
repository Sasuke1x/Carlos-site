import Link from "next/link";

const VipClub = () => {
  return (
    <section className="bg-[#f8f6f0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              CEO Hosting U VIP Club
            </h2>
            <p className="mt-2 max-w-lg text-gray-600">
              Join the VIP list for exclusive direct-booking discounts, priority
              access to open dates, and early notifications on new properties.
            </p>
          </div>
          <Link
            href="/vip"
            className="inline-flex flex-shrink-0 items-center rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg"
          >
            Join VIP + Save 15%
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VipClub;
