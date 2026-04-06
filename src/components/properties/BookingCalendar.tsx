"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
} from "lucide-react";

type CalendarDay = {
  date: string;
  available: boolean;
  reason: "AVAILABLE" | "BLOCKED" | "RESERVED";
  price: string | null;
  priceAmount: number | null;
  minStay: number;
};

type BookingCalendarProps = {
  hospitable_id: string;
  airbnbUrl: string;
  propertyName: string;
  maxGuests: number;
};

type BookingStep = "dates" | "details" | "confirm";
type BookingStatus = "idle" | "loading" | "success" | "error";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const formatMonth = (date: Date): string =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getMonthBounds = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const lastDay = new Date(y, m, 0).getDate();
  return {
    start: `${y}-${String(m).padStart(2, "0")}-01`,
    end: `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`,
  };
};

const BookingCalendar = ({
  hospitable_id,
  airbnbUrl,
  propertyName,
  maxGuests,
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [calendarData, setCalendarData] = useState<Map<string, CalendarDay>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [step, setStep] = useState<BookingStep>("dates");

  const [guestCount, setGuestCount] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [bookingError, setBookingError] = useState("");
  const [reservationCode, setReservationCode] = useState("");

  const fetchCalendar = useCallback(
    async (month: Date) => {
      setLoading(true);
      setError(false);

      const { start, end } = getMonthBounds(month);

      try {
        const res = await fetch(
          `/api/calendar/${hospitable_id}?start_date=${start}&end_date=${end}`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const days: CalendarDay[] = json.data ?? [];

        setCalendarData((prev) => {
          const updated = new Map(prev);
          days.forEach((day) => updated.set(day.date, day));
          return updated;
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [hospitable_id]
  );

  useEffect(() => {
    fetchCalendar(currentMonth);
  }, [currentMonth, fetchCalendar]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (dateKey: string) => {
    const dayData = calendarData.get(dateKey);
    if (!dayData?.available) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateKey);
      setCheckOut(null);
      return;
    }

    if (dateKey <= checkIn) {
      setCheckIn(dateKey);
      setCheckOut(null);
      return;
    }

    const start = new Date(checkIn + "T12:00:00");
    const end = new Date(dateKey + "T12:00:00");
    const daysBetween = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    for (let i = 1; i < daysBetween; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      const between = calendarData.get(key);
      if (between && !between.available) {
        setCheckIn(dateKey);
        setCheckOut(null);
        return;
      }
    }

    setCheckOut(dateKey);
  };

  const handleSubmitBooking = async () => {
    if (!checkIn || !checkOut) return;

    setBookingStatus("loading");
    setBookingError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: hospitable_id,
          checkIn,
          checkOut,
          guests: guestCount,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setBookingStatus("error");
        setBookingError(json.error ?? "Booking failed. Please try again.");
        return;
      }

      setReservationCode(json.reservation.code);
      setBookingStatus("success");
      setStep("confirm");
    } catch {
      setBookingStatus("error");
      setBookingError("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setStep("dates");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setGuestCount(1);
    setBookingStatus("idle");
    setBookingError("");
    setReservationCode("");
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const now = new Date();
  const canGoPrev =
    currentMonth.getFullYear() > now.getFullYear() ||
    (currentMonth.getFullYear() === now.getFullYear() &&
      currentMonth.getMonth() > now.getMonth());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDateKey = (day: number): string => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const isPast = (day: number): boolean =>
    new Date(year, month, day) < today;

  const isInRange = (dateKey: string): boolean => {
    if (!checkIn || !checkOut) return false;
    return dateKey > checkIn && dateKey < checkOut;
  };

  const nightCount =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut + "T12:00:00").getTime() -
            new Date(checkIn + "T12:00:00").getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const estimatedTotal = (() => {
    if (!checkIn || !checkOut) return null;
    let total = 0;
    const start = new Date(checkIn + "T12:00:00");
    for (let i = 0; i < nightCount; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      const day = calendarData.get(key);
      if (day?.priceAmount) total += day.priceAmount;
    }
    return total > 0 ? total : null;
  })();

  if (step === "confirm" && bookingStatus === "success") {
    return (
      <div className="text-center py-6">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#065f46]/10">
          <CheckCircle className="h-6 w-6 text-[#065f46]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Booking Confirmed!</h3>
        <p className="mt-1 text-sm text-gray-500">
          Confirmation code: <span className="font-semibold text-[#065f46]">{reservationCode}</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {formatDate(checkIn!)} &rarr; {formatDate(checkOut!)} &middot; {nightCount} {nightCount === 1 ? "night" : "nights"}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          A confirmation will be sent to {email}
        </p>
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Need to cancel or reschedule? Check your confirmation email for a link to manage your reservation.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="mt-5 text-sm font-medium text-[#065f46] hover:underline"
          type="button"
        >
          Book another stay
        </button>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div>
        <button
          onClick={() => setStep("dates")}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-[#065f46] hover:underline"
          type="button"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Change dates
        </button>

        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-[#065f46]" aria-hidden="true" />
            <span>{formatDate(checkIn!)} &rarr; {formatDate(checkOut!)} &middot; {nightCount} {nightCount === 1 ? "night" : "nights"}</span>
          </div>
          {estimatedTotal && (
            <p className="mt-1 ml-6 text-xs text-gray-400">
              Est. total: ${(estimatedTotal / 100).toFixed(0)}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-first-name" className="mb-1 block text-xs font-medium text-gray-500">
                First Name
              </label>
              <input
                id="booking-first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
                placeholder="First"
              />
            </div>
            <div>
              <label htmlFor="booking-last-name" className="mb-1 block text-xs font-medium text-gray-500">
                Last Name
              </label>
              <input
                id="booking-last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
                placeholder="Last"
              />
            </div>
          </div>

          <div>
            <label htmlFor="booking-email" className="mb-1 block text-xs font-medium text-gray-500">
              Email
            </label>
            <input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="booking-phone" className="mb-1 block text-xs font-medium text-gray-500">
              Phone <span className="text-gray-300">(optional)</span>
            </label>
            <input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="booking-guests" className="mb-1 block text-xs font-medium text-gray-500">
              Guests
            </label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <select
                id="booking-guests"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#065f46] focus:ring-1 focus:ring-[#065f46]/20 focus:outline-none"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3">
            <p className="text-xs font-semibold text-amber-800">Cancellation Policy</p>
            <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
              <li>7–30 days before check-in: 50% refund</li>
              <li>Less than 7 days before check-in: Non-refundable</li>
            </ul>
          </div>

        {bookingStatus === "error" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>{bookingError}</p>
          </div>
        )}

        <button
          onClick={handleSubmitBooking}
          disabled={!firstName || !lastName || !email || bookingStatus === "loading"}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#065f46] to-[#0d6e3f] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#065f46] focus:ring-offset-2"
          type="button"
        >
          {bookingStatus === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>

        <p className="mt-3 text-center text-[11px] text-gray-400">
          Your reservation will be managed through CEO Hosting U
        </p>
      </div>
    );
  }

  return (
    <div>
      {checkIn && (
        <div className="mb-3 flex items-center justify-between rounded-lg bg-[#065f46]/5 px-3 py-2">
          <div className="text-xs text-gray-600">
            <span className="font-medium text-[#065f46]">{formatDate(checkIn)}</span>
            {checkOut ? (
              <>
                {" "}&rarr;{" "}
                <span className="font-medium text-[#065f46]">{formatDate(checkOut)}</span>
                <span className="ml-1.5 text-gray-400">
                  ({nightCount} {nightCount === 1 ? "night" : "nights"})
                </span>
              </>
            ) : (
              <span className="ml-1.5 text-gray-400">Select check-out</span>
            )}
          </div>
          <button
            onClick={handleReset}
            className="text-[11px] font-medium text-gray-400 hover:text-gray-600"
            type="button"
            aria-label="Clear selected dates"
          >
            Clear
          </button>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="rounded-full p-1.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="text-sm font-semibold text-gray-900">
          {formatMonth(currentMonth)}
        </h3>
        <button
          onClick={handleNextMonth}
          aria-label="Next month"
          className="rounded-full p-1.5 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {loading && calendarData.size === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-[#065f46]" />
        </div>
      ) : error && calendarData.size === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">Unable to load availability.</p>
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-[#065f46] hover:underline"
          >
            Check on Airbnb instead
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-0.5">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="pb-2 text-center text-[11px] font-medium text-gray-400"
              >
                {d}
              </div>
            ))}

            {cells.map((day, i) => {
              if (day === null) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }

              const dateKey = getDateKey(day);
              const dayData = calendarData.get(dateKey);
              const isAvailable = dayData?.available ?? false;
              const past = isPast(day);
              const price = dayData?.price;
              const isCheckIn = dateKey === checkIn;
              const isCheckOut = dateKey === checkOut;
              const inRange = isInRange(dateKey);

              let cellClass =
                "relative flex aspect-square flex-col items-center justify-center rounded-lg text-[13px] transition-colors ";

              if (isCheckIn || isCheckOut) {
                cellClass += "bg-[#065f46] text-white font-semibold cursor-pointer ";
              } else if (inRange) {
                cellClass +=
                  "bg-[#065f46]/10 text-gray-900 font-medium cursor-pointer hover:bg-[#065f46]/20 ";
              } else if (past) {
                cellClass += "text-gray-300 ";
              } else if (isAvailable) {
                cellClass +=
                  "cursor-pointer bg-[#065f46]/5 font-medium text-gray-900 hover:bg-[#065f46]/15 ";
              } else {
                cellClass += "text-gray-300 line-through ";
              }

              return (
                <button
                  key={dateKey}
                  type="button"
                  disabled={past || !isAvailable}
                  onClick={() => handleDateClick(dateKey)}
                  className={cellClass}
                  aria-label={
                    past
                      ? `${dateKey} — Past date`
                      : isAvailable
                        ? `${dateKey} — Available ${price ?? ""}`
                        : `${dateKey} — Unavailable`
                  }
                  tabIndex={past || !isAvailable ? -1 : 0}
                >
                  <span>{day}</span>
                  {!past && isAvailable && price && !isCheckIn && !isCheckOut && (
                    <span className={`text-[9px] font-normal ${inRange ? "text-[#065f46]" : "text-[#065f46]"}`}>
                      {price.replace("$", "").replace(".00", "")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#065f46]/10" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gray-50 ring-1 ring-gray-200" />
              Unavailable
            </span>
          </div>
        </>
      )}

      {checkIn && checkOut && (
        <button
          onClick={() => setStep("details")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#065f46] to-[#0d6e3f] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#065f46] focus:ring-offset-2"
          type="button"
        >
          Book {nightCount} {nightCount === 1 ? "night" : "nights"}
          {estimatedTotal && (
            <span className="font-normal text-white/80">
              &middot; ~${(estimatedTotal / 100).toFixed(0)}
            </span>
          )}
        </button>
      )}

      {!checkIn && !loading && (
        <p className="mt-3 text-center text-[11px] text-gray-400">
          Select your check-in date to start booking
        </p>
      )}
    </div>
  );
};

export default BookingCalendar;
