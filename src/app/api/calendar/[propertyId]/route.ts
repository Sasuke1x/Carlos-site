import { NextRequest, NextResponse } from "next/server";
import { fetchPropertyCalendar } from "@/lib/hospitable";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) => {
  const { propertyId } = await params;

  if (!propertyId) {
    return NextResponse.json(
      { error: "Property ID is required" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const now = new Date();

  const startDate =
    searchParams.get("start_date") ??
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const endDate =
    searchParams.get("end_date") ??
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  try {
    const calendar = await fetchPropertyCalendar(
      propertyId,
      startDate,
      endDate
    );

    return NextResponse.json(
      { data: calendar },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Calendar API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar data" },
      { status: 500 }
    );
  }
};
