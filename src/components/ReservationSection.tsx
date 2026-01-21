import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  MessageSquare,
  Building2,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type ReservationType = "regular" | "group" | "private";
export function ReservationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationType, setReservationType] =
    useState<ReservationType>("regular");
  // Set initial date to today
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  // Mock data: Dates that are fully booked (format: YYYY-MM-DD)
  const bookedDates = [
    "2025-01-25",
    "2025-01-26",
    "2025-02-01",
    "2025-02-14",
    "2025-02-15",
    "2025-02-28",
    "2025-03-08",
    "2025-03-15",
  ];

  const checkDateAvailability = (date: string): boolean => {
    return !bookedDates.includes(date);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      (e.target as HTMLInputElement).showPicker?.();
    } catch (error) {
      // Fallback for browsers that don't support showPicker
      console.log("showPicker not supported");
    }
  };

  const isDateAvailable = selectedDate
    ? checkDateAvailability(selectedDate)
    : null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if date is available before submitting
    if (selectedDate && !checkDateAvailability(selectedDate)) {
      alert("Sorry, this date is fully booked. Please select another date.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  const reservationTypes = [
    {
      id: "regular" as ReservationType,
      label: "จองโต๊ะปกติ",
      sublabel: "Regular Table",
      icon: Users,
    },
    {
      id: "group" as ReservationType,
      label: "จองเป็นกรุ๊ป",
      sublabel: "Group Booking",
      icon: Sparkles,
    },
    {
      id: "private" as ReservationType,
      label: "จองปิดร้าน",
      sublabel: "Private Venue",
      icon: Building2,
    },
  ];

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden bg-neutral-950">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/90 to-neutral-950"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        <div className="bg-amber-950/20 backdrop-blur-md border border-amber-500/20 p-8 md:p-12 rounded-sm shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide">
              Reservations
            </h2>
            <p className="text-amber-400/80 text-sm md:text-base tracking-[0.2em] uppercase font-light">
              Book Your Experience
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mb-6 border border-amber-500/30">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Reservation Received
              </h3>
              <p className="text-neutral-300 font-light max-w-md mx-auto">
                Thank you for your request. We will contact you shortly to
                confirm your reservation at Ravenshade Thonglor.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setSelectedDate("");
                }}
                className="mt-8 text-amber-400 hover:text-amber-300 text-sm tracking-widest uppercase border-b border-amber-400/30 pb-1 hover:border-amber-300 transition-all"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <>
              {/* Reservation Type Selector */}
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reservationTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = reservationType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setReservationType(type.id)}
                        className={`relative p-6 border rounded-sm transition-all duration-300 ${isActive ? "bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10" : "bg-white/5 border-amber-500/20 hover:border-amber-500/40 hover:bg-white/10"}`}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <Icon
                            className={`w-8 h-8 transition-colors ${isActive ? "text-amber-400" : "text-amber-200/60"}`}
                            strokeWidth={1.5}
                          />

                          <div>
                            <p
                              className={`font-light text-lg mb-1 ${isActive ? "text-white" : "text-neutral-300"}`}
                            >
                              {type.label}
                            </p>
                            <p
                              className={`text-xs uppercase tracking-wider ${isActive ? "text-amber-400/80" : "text-neutral-500"}`}
                            >
                              {type.sublabel}
                            </p>
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Type Description */}
                <div className="mt-6 p-4 bg-black/20 border border-amber-500/10 rounded-sm">
                  <p className="text-sm text-neutral-400 font-light text-center">
                    {reservationType === "regular" &&
                      "Perfect for intimate gatherings of 40/60 guests"}
                    {reservationType === "group" &&
                      "Ideal for celebrations with 8-40 guests"}
                    {reservationType === "private" &&
                      "Exclusive venue rental for 40-60 guests, starting at 40,000 THB"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2 group">
                    <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                      <User className="w-3 h-3 mr-2" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 group">
                    <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                      <Phone className="w-3 h-3 mr-2" /> Phone
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>

                  {/* Date with Availability Check */}
                  <div className="space-y-2 group md:col-span-2">
                    <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                      <Calendar className="w-3 h-3 mr-2" /> Date
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={selectedDate}
                      onChange={handleDateChange}
                      onClick={handleDateClick}
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20 [color-scheme:dark] cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    />

                    {/* Availability Indicator */}
                    {selectedDate && (
                      <div
                        className={`mt-3 p-3 rounded-sm border flex items-center gap-3 ${isDateAvailable ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"}`}
                      >
                        {isDateAvailable ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div>
                              <p className="text-emerald-400 text-sm font-medium">
                                Available
                              </p>
                              <p className="text-emerald-300/70 text-xs">
                                This date is available for booking
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <div>
                              <p className="text-red-400 text-sm font-medium">
                                Fully Booked
                              </p>
                              <p className="text-red-300/70 text-xs">
                                This date is not available. Please select
                                another date.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Booked Dates Info */}
                    <div className="mt-4 p-3 bg-black/20 border border-amber-500/10 rounded-sm">
                      <p className="text-xs text-neutral-400 font-light mb-2">
                        <span className="text-amber-400">
                          Upcoming Fully Booked Dates:
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {bookedDates.slice(0, 6).map((date) => {
                          const dateObj = new Date(date + "T00:00:00");
                          const formattedDate = dateObj.toLocaleDateString(
                            "th-TH",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          );
                          return (
                            <span
                              key={date}
                              className="text-xs px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded"
                            >
                              {formattedDate}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time & Guests Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        <Clock className="w-3 h-3 mr-2" /> Time
                      </label>
                      <select className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none">
                        <option className="bg-neutral-900">18:00</option>
                        <option className="bg-neutral-900">19:00</option>
                        <option className="bg-neutral-900">20:00</option>
                        <option className="bg-neutral-900">21:00</option>
                        <option className="bg-neutral-900">22:00</option>
                        <option className="bg-neutral-900">23:00</option>
                      </select>
                    </div>

                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        <Users className="w-3 h-3 mr-2" /> Guests
                      </label>
                      <select className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none">
                        {reservationType === "regular" && (
                          <>
                            <option className="bg-neutral-900">1 Person</option>
                            <option className="bg-neutral-900">2 People</option>
                            <option className="bg-neutral-900">3 People</option>
                            <option className="bg-neutral-900">4 People</option>
                            <option className="bg-neutral-900">5 People</option>
                            <option className="bg-neutral-900">6 People</option>
                            <option className="bg-neutral-900">7 People</option>
                            <option className="bg-neutral-900">8 People</option>
                          </>
                        )}
                        {reservationType === "group" && (
                          <>
                            <option className="bg-neutral-900">
                              8-10 People
                            </option>
                            <option className="bg-neutral-900">
                              11-15 People
                            </option>
                            <option className="bg-neutral-900">
                              16-20 People
                            </option>
                            <option className="bg-neutral-900">
                              21-30 People
                            </option>
                            <option className="bg-neutral-900">
                              31-40 People
                            </option>
                          </>
                        )}
                        {reservationType === "private" && (
                          <>
                            <option className="bg-neutral-900">
                              40-45 People
                            </option>
                            <option className="bg-neutral-900">
                              46-50 People
                            </option>
                            <option className="bg-neutral-900">
                              51-55 People
                            </option>
                            <option className="bg-neutral-900">
                              56-60 People
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Private Event Additional Fields */}
                {reservationType === "private" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-amber-500/10">
                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        Event Type
                      </label>
                      <select className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none">
                        <option className="bg-neutral-900">
                          Corporate Event
                        </option>
                        <option className="bg-neutral-900">
                          Birthday Party
                        </option>
                        <option className="bg-neutral-900">
                          Wedding Reception
                        </option>
                        <option className="bg-neutral-900">
                          Product Launch
                        </option>
                        <option className="bg-neutral-900">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        Budget Range
                      </label>
                      <select className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none">
                        <option className="bg-neutral-900">
                          40,000 - 60,000 THB
                        </option>
                        <option className="bg-neutral-900">
                          60,000 - 80,000 THB
                        </option>
                        <option className="bg-neutral-900">
                          80,000 - 100,000 THB
                        </option>
                        <option className="bg-neutral-900">100,000+ THB</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                <div className="space-y-2 group">
                  <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                    <MessageSquare className="w-3 h-3 mr-2" />
                    {reservationType === "private"
                      ? "Event Details & Requirements"
                      : "Special Requests"}
                  </label>
                  <textarea
                    rows={reservationType === "private" ? 4 : 3}
                    className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20 resize-none"
                    placeholder={
                      reservationType === "private"
                        ? "Please describe your event, special requirements, catering preferences..."
                        : "Allergies, special occasion, seating preference..."
                    }
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="group relative px-12 py-4 bg-transparent overflow-hidden border border-amber-500/30 hover:border-amber-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 w-0 bg-amber-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-amber-400 group-hover:text-amber-300 tracking-[0.2em] uppercase text-sm font-medium">
                      {isSubmitting
                        ? "Processing..."
                        : reservationType === "private"
                          ? "Request Private Booking"
                          : reservationType === "group"
                            ? "Request Group Booking"
                            : "Confirm Booking"}
                    </span>
                  </button>
                </div>

                <p className="text-center text-xs text-neutral-500 font-light mt-4">
                  {reservationType === "private" &&
                    "Our team will contact you within 24 hours to discuss your private event."}
                  {reservationType === "group" &&
                    "For group bookings, we recommend booking at least 3 days in advance."}
                  {reservationType === "regular" &&
                    "For same-day reservations, please call us directly."}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
