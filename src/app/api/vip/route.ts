import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { firstName, email, phone, emailConsent, smsConsent } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { error: "First name, email, and phone are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const submission = {
      id: randomUUID(),
      type: "vip",
      firstName,
      email,
      phone,
      emailConsent: !!emailConsent,
      smsConsent: !!smsConsent,
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data", "submissions");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
      path.join(dataDir, `${submission.id}.json`),
      JSON.stringify(submission, null, 2)
    );

    console.log(`VIP signup received: ${firstName} (${email})`);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("VIP API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};
