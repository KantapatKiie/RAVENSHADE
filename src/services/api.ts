const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  reservation_date: string;
  reservation_time: string;
  number_of_guests: number;
  reservation_type: "regular" | "group" | "private";
  special_requests?: string;
}

export interface AvailabilityResponse {
  date: string;
  available: boolean;
  available_capacity: number;
  total_capacity: number;
  is_closed: boolean;
  blocked_by?: "private" | "group";
  notes?: string;
}

export interface TimeSlot {
  time: string;
  max_reservations: number;
  current_reservations: number;
  available: boolean;
}

export const api = {
  async checkAvailability(date: string): Promise<AvailabilityResponse> {
    const response = await fetch(`${API_URL}/api/availability/${date}`);
    if (!response.ok) throw new Error("Failed to check availability");
    return response.json();
  },

  async createReservation(data: ReservationData) {
    const response = await fetch(`${API_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create reservation");
    }

    return response.json();
  },

  async getTimeSlots(
    date: string,
  ): Promise<{ date: string; timeSlots: TimeSlot[] }> {
    const response = await fetch(
      `${API_URL}/api/availability/${date}/timeslots`,
    );
    if (!response.ok) throw new Error("Failed to get time slots");
    return response.json();
  },
};
