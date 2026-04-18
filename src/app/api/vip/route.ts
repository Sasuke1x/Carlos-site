import { NextRequest, NextResponse } from "next/server";

import { createSubmission } from "@/sanity/lib/submissions";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const result = await createSubmission({
      formType: "vip",
      payload: {
        firstName: body.firstName,
        email: body.email,
        phone: body.phone,
        emailConsent: body.emailConsent,
        smsConsent: body.smsConsent,
        website: body.website,
      },
      request,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("VIP API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};
