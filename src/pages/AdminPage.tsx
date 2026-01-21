import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Lock,
  LogOut,
  Filter,
  RefreshCw,
} from "lucide-react";
import { api } from "../services/api";

interface Reservation {
  id: number;
  name: string;
  phone: string;
  email?: string;
  reservation_date: string;
  reservation_time: string;
  number_of_guests: number;
  reservation_type: "regular" | "group" | "private";
  special_requests?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

interface AvailabilityDate {
  id: number;
  date: string;
  is_closed: boolean;
  blocked_by?: "private" | "group";
  notes?: string;
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availabilityDates, setAvailabilityDates] = useState<
    AvailabilityDate[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [filterDate, setFilterDate] = useState(getTodayDate());
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [activeTab, setActiveTab] = useState<"reservations" | "availability">(
    "reservations",
  );

  const [newAvailability, setNewAvailability] = useState({
    date: getTodayDate(),
    is_closed: false,
    blocked_by: "" as "" | "private" | "group",
    notes: "",
  });

  // Simple password authentication (in production, use proper auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper backend authentication
    if (password === "ravenshade2026") {
      setIsAuthenticated(true);
      setLoginError("");
      
      // Save session with expiry time
      const expiryTime = rememberMe 
        ? Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        : Date.now() + (24 * 60 * 60 * 1000); // 24 hours
      
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminAuthExpiry", expiryTime.toString());
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminAuthExpiry");
  };

  // Check if already authenticated and session not expired
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    const expiryTime = localStorage.getItem("adminAuthExpiry");
    
    if (authStatus === "true" && expiryTime) {
      const expiry = parseInt(expiryTime);
      if (Date.now() < expiry) {
        setIsAuthenticated(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem("adminAuth");
        localStorage.removeItem("adminAuthExpiry");
      }
    }
  }, []);

  // Auto-fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
      fetchAvailability();
    }
  }, [isAuthenticated]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAdminReservations();
      // Handle both array and object response formats
      if (Array.isArray(data)) {
        setReservations(data);
      } else if (data && Array.isArray(data.reservations)) {
        setReservations(data.reservations);
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      // Don't show error if API is not ready yet
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      const data = await api.getAdminAvailability();
      // Handle both array and object response formats
      if (Array.isArray(data)) {
        setAvailabilityDates(data);
      } else if (data && Array.isArray(data.dates)) {
        setAvailabilityDates(data.dates);
      } else {
        setAvailabilityDates([]);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      // Don't show error if API is not ready yet
      setAvailabilityDates([]);
    }
  };

  const handleUpdateReservationStatus = async (
    id: number,
    status: "confirmed" | "cancelled",
  ) => {
    try {
      await api.updateReservationStatus(id, status);
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Failed to update reservation status");
    }
  };

  const handleAddAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.setAvailability({
        date: newAvailability.date,
        is_closed: newAvailability.is_closed,
        blocked_by: newAvailability.blocked_by || undefined,
        notes: newAvailability.notes || undefined,
      });
      setNewAvailability({
        date: "",
        is_closed: false,
        blocked_by: "",
        notes: "",
      });
      fetchAvailability();
    } catch (error) {
      console.error("Error setting availability:", error);
      alert("Failed to set availability");
    }
  };

  const handleDeleteAvailability = async (id: number) => {
    if (!confirm("Are you sure you want to delete this availability setting?"))
      return;
    try {
      await api.deleteAvailability(id);
      fetchAvailability();
    } catch (error) {
      console.error("Error deleting availability:", error);
      alert("Failed to delete availability");
    }
  };

  // Filter reservations - ensure it's always an array
  const filteredReservations = Array.isArray(reservations)
    ? reservations.filter((res) => {
        // Extract date part only (YYYY-MM-DD) from ISO string
        const resDate = res.reservation_date.split('T')[0];
        
        if (filterDate && resDate !== filterDate) return false;
        if (filterType !== "all" && res.reservation_type !== filterType)
          return false;
        if (filterStatus !== "all" && res.status !== filterStatus) return false;
        return true;
      })
    : [];

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-amber-950/20 backdrop-blur-md border border-amber-500/20 p-8 rounded-sm">
            <div className="text-center mb-8">
              <Lock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h1 className="text-3xl font-serif text-white mb-2">
                Admin Login
              </h1>
              <p className="text-neutral-400 text-sm">Ravenshade Thonglor</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-amber-100/60 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-amber-500/30 text-white p-3 rounded focus:border-amber-400 focus:outline-none"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="rememberMe" className="text-neutral-300 text-sm cursor-pointer">
                  Remember me for 7 days
                </label>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded hover:bg-amber-500/20 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-neutral-400">
              Manage reservations and availability
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-800">
          <button
            onClick={() => {
              setActiveTab("reservations");
              fetchReservations();
            }}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "reservations"
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => {
              setActiveTab("availability");
              fetchAvailability();
            }}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "availability"
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Availability
          </button>
        </div>

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div>
            {/* Filters */}
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-medium">Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 text-sm mb-2">
                    Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="regular">Regular</option>
                    <option value="group">Group</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 text-sm mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={fetchReservations}
                    className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 p-2 rounded hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Reservations List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-neutral-400">Loading reservations...</p>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="text-center py-12 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">No reservations found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white text-lg font-medium mb-1">
                              {reservation.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  reservation.reservation_type === "private"
                                    ? "bg-purple-500/20 text-purple-400"
                                    : reservation.reservation_type === "group"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-green-500/20 text-green-400"
                                }`}
                              >
                                {reservation.reservation_type.toUpperCase()}
                              </span>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  reservation.status === "confirmed"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : reservation.status === "cancelled"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {reservation.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            {new Date(
                              reservation.reservation_date,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Clock className="w-4 h-4 text-amber-400" />
                            {reservation.reservation_time.substring(0, 5)}
                          </div>
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Phone className="w-4 h-4 text-amber-400" />
                            {reservation.phone}
                          </div>
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Users className="w-4 h-4 text-amber-400" />
                            {reservation.number_of_guests} guests
                          </div>
                          {reservation.email && (
                            <div className="flex items-center gap-2 text-neutral-300 md:col-span-2">
                              <Mail className="w-4 h-4 text-amber-400" />
                              {reservation.email}
                            </div>
                          )}
                        </div>

                        {reservation.special_requests && (
                          <div className="mt-3 p-3 bg-black/20 border border-neutral-700 rounded text-sm text-neutral-300">
                            <span className="text-amber-400 font-medium">
                              Note:{" "}
                            </span>
                            {reservation.special_requests}
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateReservationStatus(
                                  reservation.id,
                                  "confirmed",
                                )
                              }
                              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded hover:bg-emerald-500/20 transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateReservationStatus(
                                  reservation.id,
                                  "cancelled",
                                )
                              }
                              className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded hover:bg-red-500/20 transition-colors text-sm"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel
                            </button>
                          </>
                        )}
                        {reservation.status === "confirmed" && (
                          <button
                            onClick={() =>
                              handleUpdateReservationStatus(
                                reservation.id,
                                "cancelled",
                              )
                            }
                            className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded hover:bg-red-500/20 transition-colors text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div>
            {/* Add New Availability */}
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Set Availability</h3>
                <button
                  onClick={fetchAvailability}
                  className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded hover:bg-amber-500/20 transition-colors flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>

              <form onSubmit={handleAddAvailability} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newAvailability.date}
                      onChange={(e) =>
                        setNewAvailability({
                          ...newAvailability,
                          date: e.target.value,
                        })
                      }
                      className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Block Type
                    </label>
                    <select
                      value={newAvailability.blocked_by}
                      onChange={(e) =>
                        setNewAvailability({
                          ...newAvailability,
                          blocked_by: e.target.value as
                            | ""
                            | "private"
                            | "group",
                        })
                      }
                      className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none"
                    >
                      <option value="">Available</option>
                      <option value="private">Private Event</option>
                      <option value="group">Group Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 text-sm mb-2">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={newAvailability.notes}
                    onChange={(e) =>
                      setNewAvailability({
                        ...newAvailability,
                        notes: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-amber-500/30 text-white p-2 rounded focus:border-amber-400 focus:outline-none"
                    placeholder="Optional notes..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_closed"
                    checked={newAvailability.is_closed}
                    onChange={(e) =>
                      setNewAvailability({
                        ...newAvailability,
                        is_closed: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="is_closed"
                    className="text-neutral-300 text-sm"
                  >
                    Mark as closed (no bookings allowed)
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-2 rounded hover:bg-amber-500/20 transition-colors"
                >
                  Save Availability
                </button>
              </form>
            </div>

            {/* Availability List */}
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-4">Configured Dates</h3>

              {availabilityDates.length === 0 ? (
                <div className="text-center py-12 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                  <p className="text-neutral-400">No availability settings</p>
                </div>
              ) : (
                availabilityDates.map((avail) => (
                  <div
                    key={avail.id}
                    className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-medium">
                          {new Date(avail.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {avail.is_closed && (
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                            CLOSED
                          </span>
                        )}
                        {avail.blocked_by && (
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                            {avail.blocked_by.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {avail.notes && (
                        <p className="text-neutral-400 text-sm">
                          {avail.notes}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteAvailability(avail.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
