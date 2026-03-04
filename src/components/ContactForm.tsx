"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "guest",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-green-50 p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-800">
          <Send className="h-7 w-7 text-white" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-green-950">
          Message Sent!
        </h3>
        <p className="text-green-800">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Contact us"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-green-950"
        >
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/20 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-green-950"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/20 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-medium text-green-950"
        >
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/20 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contact-type"
          className="mb-1.5 block text-sm font-medium text-green-950"
        >
          Inquiry Type
        </label>
        <select
          id="contact-type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-green-800 focus:ring-2 focus:ring-green-800/20 focus:outline-none"
        >
          <option value="guest">Guest Inquiry</option>
          <option value="owner">Property Owner</option>
          <option value="service">Service Inquiry</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-green-950"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/20 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 font-semibold text-green-950 transition-colors hover:bg-gold-400 focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
