import {
  DollarSign,
  MessageCircle,
  HeadphonesIcon,
  ShieldCheck,
  Calendar,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Lower fees",
    description: "Skip the platform markups when you book with us directly.",
  },
  {
    icon: MessageCircle,
    title: "Direct communication",
    description: "Reach us by text, email, or phone — no barriers.",
  },
  {
    icon: HeadphonesIcon,
    title: "Local support",
    description: "Fast, personal help from a team that knows your property.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payments",
    description: "Encrypted transactions with full transparency.",
  },
  {
    icon: Calendar,
    title: "Priority booking",
    description: "First access to availability and best extended-stay rates.",
  },
] as const;

const WhyBookDirect = () => {
  return (
    <section className="border-t border-gray-100 px-6 py-16 lg:px-10" aria-labelledby="why-book-heading">
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="why-book-heading"
          className="text-[22px] font-semibold text-gray-900"
        >
          Why book direct?
        </h2>

        <div className="mt-8 grid gap-0 divide-y sm:grid-cols-5 sm:divide-x sm:divide-y-0 divide-gray-100">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-4 px-1 py-5 sm:flex-col sm:items-start sm:gap-3 sm:px-5 sm:py-0 first:sm:pl-0 last:sm:pr-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#065f46]/5">
                <benefit.icon
                  className="h-5 w-5 text-[#065f46]"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookDirect;
