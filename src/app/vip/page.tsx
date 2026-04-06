"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Gift } from "lucide-react";

const VipPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    emailConsent: false,
    smsConsent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/vip/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-16 lg:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a847]/10">
            <Gift className="h-7 w-7 text-[#d4a847]" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Join the CEO Hosting U VIP List
          </h1>
          <p className="mt-3 text-gray-600">
            Save on future direct bookings + get priority access to open dates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="vip-first-name" className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="vip-first-name"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label htmlFor="vip-email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="vip-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="vip-phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="vip-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailConsent}
                onChange={(e) => setFormData({ ...formData, emailConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#065f46] focus:ring-[#065f46]"
              />
              <span className="text-sm text-gray-600">
                I agree to receive email offers and updates from CEO Hosting U
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.smsConsent}
                onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#065f46] focus:ring-[#065f46]"
              />
              <span className="text-sm text-gray-600">
                I agree to receive text messages from CEO Hosting U
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d4a847] px-6 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-[#d4a847]/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the VIP List"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VipPage;
