const BASE_URL = "https://public.api.hospitable.com/v2";

const getHeaders = (): HeadersInit => ({
  Authorization: `Bearer ${process.env.HOSPITABLE_API_KEY}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

export type HospitableCalendarDay = {
  date: string;
  day: string;
  min_stay: number;
  closed_for_checkin: boolean;
  closed_for_checkout: boolean;
  status: {
    reason: "AVAILABLE" | "BLOCKED" | "RESERVED";
    source: string | null;
    source_type: string;
    available: boolean;
  };
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
};

export type CalendarApiResponse = {
  data: {
    listing_id: string;
    provider: string;
    start_date: string;
    end_date: string;
    days: HospitableCalendarDay[];
  };
};

export type CalendarDay = {
  date: string;
  available: boolean;
  reason: "AVAILABLE" | "BLOCKED" | "RESERVED";
  price: string | null;
  priceAmount: number | null;
  minStay: number;
};

export const fetchPropertyCalendar = async (
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<CalendarDay[]> => {
  try {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });

    const response = await fetch(
      `${BASE_URL}/properties/${propertyId}/calendar?${params.toString()}`,
      { headers: getHeaders(), next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error(
        `Hospitable calendar API error: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const json: CalendarApiResponse = await response.json();
    const days = json.data?.days ?? [];

    return days.map((day) => ({
      date: day.date,
      available: day.status.available,
      reason: day.status.reason,
      price: day.price?.formatted ?? null,
      priceAmount: day.price?.amount ?? null,
      minStay: day.min_stay,
    }));
  } catch (error) {
    console.error("Failed to fetch calendar from Hospitable:", error);
    return [];
  }
};

export type HospitableProperty = {
  id: string;
  name: string;
  public_name: string;
  picture: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    display: string;
    coordinates: { latitude: string; longitude: string };
  };
  summary: string;
  description: string;
  capacity: {
    max: number | null;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  checkin: string;
  checkout: string;
  property_type: string;
  room_type: string;
  listed: boolean;
  house_rules: {
    pets_allowed: boolean;
    smoking_allowed: boolean;
    events_allowed: boolean;
  };
};

export const fetchProperties = async (): Promise<HospitableProperty[] | null> => {
  try {
    const response = await fetch(`${BASE_URL}/properties`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        `Hospitable properties API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const json = await response.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Failed to fetch properties from Hospitable:", error);
    return null;
  }
};
