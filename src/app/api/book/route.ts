import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://public.api.hospitable.com/v2";

type BookingRequest = {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body: BookingRequest = await request.json();

    const { propertyId, checkIn, checkOut, guests, firstName, lastName, email, phone } = body;

    if (!propertyId || !checkIn || !checkOut || !guests || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today) {
      return NextResponse.json(
        { error: "Check-in date must be in the future" },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    // Fetch calendar data to check availability AND get real pricing
    const calendarRes = await fetch(
      `${BASE_URL}/properties/${propertyId}/calendar?start_date=${checkIn}&end_date=${checkOut}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HOSPITABLE_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    if (!calendarRes.ok) {
      console.error("Failed to fetch calendar for pricing:", calendarRes.status);
      return NextResponse.json(
        { error: "Unable to verify availability. Please try again." },
        { status: 502 }
      );
    }

    const calendarData = await calendarRes.json();
    const days = calendarData.data?.days ?? [];

    // Check availability
    const unavailable = days.filter(
      (d: { status: { available: boolean } }) => !d.status.available
    );
    if (unavailable.length > 0) {
      return NextResponse.json(
        { error: "Some selected dates are unavailable. Please choose different dates." },
        { status: 409 }
      );
    }

    // Calculate real total from Hospitable's per-night pricing
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let totalAccommodation = 0;
    for (const day of days) {
      if (day.price?.amount) {
        totalAccommodation += day.price.amount;
      }
    }

    if (totalAccommodation === 0) {
      console.error("No pricing data available for selected dates");
      return NextResponse.json(
        { error: "Pricing unavailable for these dates. Please try again or contact us." },
        { status: 400 }
      );
    }

    const hospitable_body = {
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests: { adults: guests },
      guest: {
        first_name: firstName,
        last_name: lastName,
        email,
        ...(phone ? { phone } : {}),
      },
      language: "en",
      financials: {
        currency: "USD",
        accommodation: totalAccommodation,
      },
    };

    const res = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HOSPITABLE_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hospitable_body),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Hospitable reservation error:", json);
      return NextResponse.json(
        { error: json.reason_phrase ?? "Failed to create reservation" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: {
        id: json.data.id,
        code: json.data.code,
        checkIn: json.data.check_in,
        checkOut: json.data.check_out,
        nights: json.data.nights,
        status: json.data.status,
      },
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};
