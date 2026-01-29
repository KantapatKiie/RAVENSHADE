/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { api } from "../services/api";

type ReservationType = "regular" | "group" | "private";
export function ReservationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationType, setReservationType] =
    useState<ReservationType>("regular");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateAvailable, setIsDateAvailable] = useState<boolean | null>(null);
  const [isCheckingDate, setIsCheckingDate] = useState(false);
  const [blockedBy, setBlockedBy] = useState<"private" | "group" | null>(null);
  const [availabilityNotes, setAvailabilityNotes] = useState<string | null>(
    null,
  );
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(
    new Set(),
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    time: "19:00:00",
    guests: "4",
    specialRequests: "",
  });

  // Update guest count when reservation type changes
  useEffect(() => {
    if (reservationType === "regular") {
      setFormData((prev) => ({ ...prev, guests: "4" }));
    } else if (reservationType === "group") {
      setFormData((prev) => ({ ...prev, guests: "10" }));
    } else if (reservationType === "private") {
      setFormData((prev) => ({ ...prev, guests: "45" }));
    }
  }, [reservationType]);

  // Set initial date to today
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check availability when date changes
  useEffect(() => {
    if (selectedDate) {
      checkDateAvailability(selectedDate);
    }
  }, [selectedDate]);

  const checkDateAvailability = async (date: string) => {
    setIsCheckingDate(true);
    try {
      const result = await api.checkAvailability(date);
      const isAvailable = result.available && !result.is_closed;
      setIsDateAvailable(isAvailable);
      setBlockedBy(result.blocked_by || null);
      setAvailabilityNotes(result.notes || null);

      // Update unavailable dates cache
      if (!isAvailable) {
        setUnavailableDates((prev) => new Set(prev).add(date));
      } else {
        setUnavailableDates((prev) => {
          const newSet = new Set(prev);
          newSet.delete(date);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setIsDateAvailable(null);
      setBlockedBy(null);
      setAvailabilityNotes(null);
    } finally {
      setIsCheckingDate(false);
    }
  };

  // Check if a date should be disabled in the calendar
  const isDateDisabled = (date: Date): boolean => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return unavailableDates.has(dateString);
  };

  // Preload availability for visible month
  const handleMonthChange = useCallback(async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Check availability for all days in the month
    const checkPromises = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const checkDate = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      checkDate.setHours(0, 0, 0, 0);
      
      // Only check future dates
      if (checkDate >= today) {
        const dateYear = checkDate.getFullYear();
        const dateMonth = String(checkDate.getMonth() + 1).padStart(2, '0');
        const dateDay = String(checkDate.getDate()).padStart(2, '0');
        const dateString = `${dateYear}-${dateMonth}-${dateDay}`;
        checkPromises.push(
          api.checkAvailability(dateString).then((result) => ({
            date: dateString,
            available: result.available && !result.is_closed,
          })),
        );
      }
    }

    try {
      const results = await Promise.all(checkPromises);
      setUnavailableDates((prevDates) => {
        const newUnavailableDates = new Set(prevDates);
        results.forEach((result) => {
          if (!result.available) {
            newUnavailableDates.add(result.date);
          }
        });
        return newUnavailableDates;
      });
    } catch (error) {
      console.error("Error preloading month availability:", error);
    }
  }, []);

  // Initialize selected date and preload month on mount
  useEffect(() => {
    const initDate = getTodayDate();
    setSelectedDate(initDate);
    handleMonthChange(new Date());
  }, [handleMonthChange]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    }
  };

  const getDateFromString = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString + "T00:00:00");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isDateAvailable) {
      alert("Sorry, this date is not available. Please select another date.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Clean phone number - remove all non-digit characters
      const cleanedPhone = formData.phone.replace(/\D/g, "");

      // Validate phone number (9-11 digits)
      if (cleanedPhone.length < 9 || cleanedPhone.length > 11) {
        alert("Please enter a valid phone number (9-11 digits)");
        setIsSubmitting(false);
        return;
      }

      const reservationData = {
        name: formData.name,
        phone: cleanedPhone,
        email: formData.email || undefined,
        reservation_date: selectedDate,
        reservation_time: formData.time,
        number_of_guests: parseInt(formData.guests),
        reservation_type: reservationType,
        special_requests: formData.specialRequests || undefined,
      };

      await api.createReservation(reservationData);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        time: "19:00:00",
        guests: "4",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create reservation. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and limit to 11 digits
                        if (/^\d*$/.test(value) && value.length <= 11) {
                          setFormData({ ...formData, phone: value });
                        }
                      }}
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20"
                      placeholder="0012345678"
                      maxLength={11}
                      pattern="\d*"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 group md:col-span-2">
                    <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                      <User className="w-3 h-3 mr-2" /> Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Date with Availability Check */}
                  <div className="space-y-2 group md:col-span-2">
                    <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                      <Calendar className="w-3 h-3 mr-2" /> Date
                    </label>
                    <DatePicker
                      selected={getDateFromString(selectedDate)}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      filterDate={(date) => !isDateDisabled(date)}
                      onMonthChange={handleMonthChange}
                      className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light placeholder-white/20 cursor-pointer"
                      wrapperClassName="w-full"
                      calendarClassName="bg-neutral-900 border border-amber-500/30"
                    />

                    {/* Availability Indicator */}
                    {selectedDate &&
                      !isCheckingDate &&
                      isDateAvailable !== null && (
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
                                  Not Available
                                </p>
                                <p className="text-red-300/70 text-xs">
                                  {blockedBy === "private" &&
                                    "วันนี้ถูกจองเป็นงานปิดร้านแล้ว (This date is fully booked for a private event)"}
                                  {blockedBy === "group" &&
                                    "วันนี้ถูกจองเป็นกรุ๊ปแล้ว (This date is booked for a group reservation)"}
                                  {!blockedBy &&
                                    "This date is not available. Please select another date."}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                    {isCheckingDate && (
                      <div className="mt-3 p-3 rounded-sm border border-amber-500/30 bg-amber-500/5 flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <p className="text-amber-400 text-sm">
                          Checking availability...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Time & Guests Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        <Clock className="w-3 h-3 mr-2" /> Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none"
                      >
                        {reservationType === "private" ? (
                          <>
                            <option className="bg-neutral-900" value="13:00:00">
                              13:00 (Ends at 21:00)
                            </option>
                            <option className="bg-neutral-900" value="14:00:00">
                              14:00 (Ends at 22:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="15:00:00">
                              15:00 (Ends at 23:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="16:00:00">
                              16:00 (Ends at 00:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="17:00:00">
                              17:00 (Ends at 01:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="18:00:00">
                              18:00 (Ends at 02:00)
                            </option>
                            <option className="bg-neutral-900" value="19:00:00">
                              19:00 (Ends at 03:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="20:00:00">
                              20:00 (Ends at 04:00 + 4,500 THB/hr)
                            </option>
                            <option className="bg-neutral-900" value="21:00:00">
                              21:00 (Ends at 05:00 + 4,500 THB/hr)
                            </option>
                          </>
                        ) : (
                          <>
                            <option className="bg-neutral-900" value="18:00:00">
                              18:00
                            </option>
                            <option className="bg-neutral-900" value="19:00:00">
                              19:00
                            </option>
                            <option className="bg-neutral-900" value="20:00:00">
                              20:00
                            </option>
                            <option className="bg-neutral-900" value="21:00:00">
                              21:00
                            </option>
                            <option className="bg-neutral-900" value="22:00:00">
                              22:00
                            </option>
                            <option className="bg-neutral-900" value="23:00:00">
                              23:00
                            </option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2 group">
                      <label className="flex items-center text-xs text-amber-100/60 uppercase tracking-widest group-focus-within:text-amber-400 transition-colors">
                        <Users className="w-3 h-3 mr-2" /> Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className="w-full bg-white/5 border-b border-amber-500/30 text-white p-3 focus:border-amber-400 focus:outline-none focus:bg-white/10 transition-all font-light appearance-none"
                      >
                        {reservationType === "regular" && (
                          <>
                            <option className="bg-neutral-900" value="1">
                              1 Person
                            </option>
                            <option className="bg-neutral-900" value="2">
                              2 People
                            </option>
                            <option className="bg-neutral-900" value="3">
                              3 People
                            </option>
                            <option className="bg-neutral-900" value="4">
                              4 People
                            </option>
                            <option className="bg-neutral-900" value="5">
                              5 People
                            </option>
                            <option className="bg-neutral-900" value="6">
                              6 People
                            </option>
                            <option className="bg-neutral-900" value="7">
                              7 People
                            </option>
                            <option className="bg-neutral-900" value="8">
                              8 People
                            </option>
                            <option className="bg-neutral-900" value="10">
                              9-10 People
                            </option>
                            <option className="bg-neutral-900" value="15">
                              11-15 People
                            </option>
                            <option className="bg-neutral-900" value="20">
                              16-20 People
                            </option>
                            <option className="bg-neutral-900" value="25">
                              21-25 People
                            </option>
                            <option className="bg-neutral-900" value="30">
                              26-30 People
                            </option>
                            <option className="bg-neutral-900" value="35">
                              31-35 People
                            </option>
                            <option className="bg-neutral-900" value="40">
                              36-40 People
                            </option>
                          </>
                        )}
                        {reservationType === "group" && (
                          <>
                            <option className="bg-neutral-900" value="10">
                              8-10 People
                            </option>
                            <option className="bg-neutral-900" value="15">
                              11-15 People
                            </option>
                            <option className="bg-neutral-900" value="20">
                              16-20 People
                            </option>
                            <option className="bg-neutral-900" value="30">
                              21-30 People
                            </option>
                            <option className="bg-neutral-900" value="40">
                              31-40 People
                            </option>
                          </>
                        )}
                        {reservationType === "private" && (
                          <>
                            <option className="bg-neutral-900" value="45">
                              40-45 People
                            </option>
                            <option className="bg-neutral-900" value="50">
                              46-50 People
                            </option>
                            <option className="bg-neutral-900" value="55">
                              51-55 People
                            </option>
                            <option className="bg-neutral-900" value="60">
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
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
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
