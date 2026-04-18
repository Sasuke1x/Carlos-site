import { NextRequest, NextResponse } from "next/server";

import { createSubmission } from "@/sanity/lib/submissions";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const result = await createSubmission({
      formType: "contact",
      payload: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        type: body.type,
        website: body.website,
      },
      request,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Message received. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
};
