import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: string;
  formType: "contact" | "consultation";
};

export const POST = async (request: NextRequest) => {
  try {
    const body: ContactRequest = await request.json();

    const { name, email, message, formType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const submission = {
      ...body,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    const dir = join(process.cwd(), "data", "submissions");
    await mkdir(dir, { recursive: true });
    await writeFile(
      join(dir, `${submission.id}.json`),
      JSON.stringify(submission, null, 2)
    );

    console.log(
      `[${formType?.toUpperCase() ?? "CONTACT"}] New submission from ${name} (${email}): ${message.slice(0, 100)}...`
    );

    return NextResponse.json({
      success: true,
      message:
        formType === "consultation"
          ? "Consultation request received. We'll be in touch within 24 hours."
          : "Message received. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
};
