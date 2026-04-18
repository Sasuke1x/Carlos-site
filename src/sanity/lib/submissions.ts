// Server-only helper. Only import from API route handlers.

import { createHash } from "crypto";
import type { NextRequest } from "next/server";

import { writeClient } from "./writeClient";
import type {
  ContactInquiryType,
  FormSubmission,
  FormSubmissionType,
} from "../types";

type CreateSubmissionResult =
  | { ok: true; id: string; honeypot?: boolean }
  | { ok: false; status: number; error: string };

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  type?: ContactInquiryType;
  website?: string; // honeypot
};

type VipPayload = {
  firstName?: string;
  email?: string;
  phone?: string;
  emailConsent?: boolean;
  smsConsent?: boolean;
  website?: string; // honeypot
};

type SubmissionParams =
  | { formType: "contact"; payload: ContactPayload; request: NextRequest }
  | { formType: "vip"; payload: VipPayload; request: NextRequest };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
// Fallback salt if SUBMISSION_IP_SALT isn't set. Rate limiting still works;
// the only thing the salt protects is the ability to correlate IPs across
// a dataset dump. Safe to ship.
const FALLBACK_SALT = "ceo-hosting-u-fallback-salt-v1";

const hashIp = (ip: string): string => {
  const salt = process.env.SUBMISSION_IP_SALT || FALLBACK_SALT;
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
};

const extractIp = (request: NextRequest): string => {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") || "0.0.0.0";
};

const isRateLimited = async (ipHash: string): Promise<boolean> => {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const count = await writeClient.fetch<number>(
    `count(*[_type == "formSubmission" && ipHash == $ipHash && submittedAt > $since])`,
    { ipHash, since }
  );
  return count >= RATE_LIMIT_MAX;
};

export const createSubmission = async (
  params: SubmissionParams
): Promise<CreateSubmissionResult> => {
  const { payload, request } = params;

  // 1. Honeypot — silently succeed so bots don't learn they were caught
  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return { ok: true, id: "honeypot", honeypot: true };
  }

  // 2. Validate shared fields
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    return { ok: false, status: 400, error: "A valid email is required." };
  }

  // 3. Per-type validation
  if (params.formType === "contact") {
    if (!params.payload.name) {
      return { ok: false, status: 400, error: "Name is required." };
    }
    if (!params.payload.message) {
      return { ok: false, status: 400, error: "Message is required." };
    }
  } else {
    if (!params.payload.firstName) {
      return { ok: false, status: 400, error: "First name is required." };
    }
    if (!params.payload.phone) {
      return { ok: false, status: 400, error: "Phone is required." };
    }
  }

  // 4. Rate limit
  const ipHash = hashIp(extractIp(request));
  try {
    if (await isRateLimited(ipHash)) {
      return {
        ok: false,
        status: 429,
        error: "Too many submissions. Please try again later.",
      };
    }
  } catch (err) {
    // If the rate-limit query fails, fall through rather than block a real user.
    // The write below will surface the real config error.
    console.warn("Rate-limit check failed, allowing submission through:", err);
  }

  // 5. Create document
  const userAgent = request.headers.get("user-agent") || undefined;
  const doc: Omit<FormSubmission, "_id"> & { _type: "formSubmission" } = {
    _type: "formSubmission",
    formType: params.formType as FormSubmissionType,
    status: "new",
    submittedAt: new Date().toISOString(),
    email: payload.email,
    phone: payload.phone,
    ipHash,
    userAgent,
  };

  if (params.formType === "contact") {
    doc.name = params.payload.name;
    doc.message = params.payload.message;
    doc.inquiryType = params.payload.type;
  } else {
    doc.firstName = params.payload.firstName;
    doc.emailConsent = !!params.payload.emailConsent;
    doc.smsConsent = !!params.payload.smsConsent;
  }

  try {
    const created = await writeClient.create(doc);
    return { ok: true, id: created._id };
  } catch (err) {
    console.error("Failed to write formSubmission to Sanity:", err);
    return {
      ok: false,
      status: 500,
      error: "Failed to submit. Please try again.",
    };
  }
};
