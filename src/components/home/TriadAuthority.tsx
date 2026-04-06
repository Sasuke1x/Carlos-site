import Image from "next/image";

const TriadAuthority = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="flex-shrink-0">
            <Image
              src="/images/branding/triad-badge.png"
              alt="Triad North Carolina"
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#065f46]">
              Proudly Serving the North Carolina Triad
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#065f46]">
              Winston-Salem · Greensboro · High Point · Lexington
            </p>
            <p className="mt-3 max-w-xl text-gray-600 leading-relaxed">
              Locally based in Lexington, CEO Hosting U serves the Triad with
              furnished housing, property management, renovation, and partnership
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriadAuthority;
