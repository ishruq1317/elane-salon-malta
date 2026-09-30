"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICES } from "@/data/services";
import { Booking, Service } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Star,
  ShieldCheck,
  Heart,
  ShoppingBag,
  LogOut,
  Edit3,
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    logout,
    bookings,
    cancelBooking,
    rescheduleBooking,
    savedServiceIds,
    toggleSaveService,
    addReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"appointments" | "profile" | "saved">("appointments");
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("2026-10-18");
  const [newTime, setNewTime] = useState("16:00");

  const [reviewModalBooking, setReviewModalBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl text-charcoal">Sign In Required</h2>
        <p className="text-xs text-taupe">Please sign in to view your client dashboard.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider"
        >
          Sign In / Demo Login
        </Link>
      </div>
    );
  }

  // Filter client bookings
  const clientBookings = bookings.filter(
    (b) =>
      b.customerId === user.id ||
      b.customerEmail?.toLowerCase() === user.email?.toLowerCase() ||
      b.customerName?.toLowerCase().includes(user.name.split(" ")[0].toLowerCase()) ||
      b.customerId === "guest-usr"
  );

  const upcomingBookings = clientBookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "RESCHEDULED"
  );
  const pastBookings = clientBookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED"
  );

  // Saved wishlist services
  const savedServices = SERVICES.filter((s) => savedServiceIds.includes(s.id));

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleModalBooking) {
      rescheduleBooking(rescheduleModalBooking.id, newDate, newTime);
      setRescheduleModalBooking(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewModalBooking && reviewText.trim()) {
      addReview({
        serviceId: reviewModalBooking.serviceId,
        serviceName: reviewModalBooking.serviceName,
        stylistId: reviewModalBooking.stylistId,
        stylistName: reviewModalBooking.stylistName,
        customerName: user.name,
        rating: reviewRating,
        text: reviewText.trim(),
        scores: {
          service: reviewRating,
          staff: 5,
          ambiance: 5,
        },
      });
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setReviewModalBooking(null);
        setReviewText("");
      }, 1500);
    }
  };

  const nextBooking = upcomingBookings[0];

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Client Header Bar */}
      <div className="p-6 sm:p-8 bg-ivory border border-sand flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-sand"
          />
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              ÉLANE Atelier Client
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-taupe">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/booking"
            className="flex-1 md:flex-none py-2.5 px-5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors flex items-center justify-center gap-2 btn-luxury"
          >
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>New Appointment</span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="py-2.5 px-3 border border-sand text-taupe hover:text-charcoal hover:bg-sand/30 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-sand/60 pb-3">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "appointments"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          My Appointments ({clientBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "saved"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          Saved Wishlist ({savedServices.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "profile"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          Beauty Profile &amp; Preferences
        </button>
      </div>

      {/* Tab 1: Appointments */}
      {activeTab === "appointments" && (
        <div className="space-y-10">
          {/* NEXT APPOINTMENT SPOTLIGHT */}
          {nextBooking && (
            <div className="p-6 sm:p-8 bg-[#FAF7F2] border-2 border-gold/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-sand/60 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Next Scheduled Appointment
                </span>
                <span className="font-mono text-xs font-semibold bg-sand/50 px-2 py-0.5 text-charcoal">
                  {nextBooking.bookingNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">
                    {nextBooking.serviceName}
                  </h3>
                  <p className="text-xs text-taupe mt-1">
                    With Senior Stylist: <strong>{nextBooking.stylistName}</strong>
                  </p>
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-none">
                    Status: {nextBooking.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-charcoal">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>{nextBooking.date} at {nextBooking.time} (~{nextBooking.durationMin} mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>
                      {nextBooking.locationType === "SALON"
                        ? "Sliema Atelier (123 Triq il-Kbira)"
                        : `Home Service (${nextBooking.homeAddress || nextBooking.homeArea})`}
                    </span>
                  </div>
                  <div className="text-xs text-taupe pt-1">
                    Price: <strong>€{nextBooking.totalPrice}</strong>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <button
                    onClick={() => setRescheduleModalBooking(nextBooking)}
                    className="py-2.5 px-4 bg-charcoal text-ivory hover:bg-charcoal-light text-xs uppercase tracking-wider font-semibold transition-colors text-center"
                  >
                    Reschedule Time
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you wish to cancel this appointment?")) {
                        cancelBooking(nextBooking.id);
                      }
                    }}
                    className="py-2 px-4 border border-sand text-taupe hover:text-red-700 hover:border-red-300 text-xs uppercase tracking-wider font-medium transition-colors text-center"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ALL BOOKINGS LIST */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-charcoal">Booking History</h3>

            <div className="divide-y divide-sand/60 border border-sand bg-ivory">
              {clientBookings.length === 0 ? (
                <div className="p-8 text-center text-xs text-taupe">
                  No appointments found. Book your first appointment to see it here.
                </div>
              ) : (
                clientBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg text-charcoal font-medium">
                          {b.serviceName}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-100 text-emerald-800"
                              : b.status === "COMPLETED"
                              ? "bg-sand/60 text-charcoal"
                              : b.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="text-xs text-taupe flex flex-wrap gap-4">
                        <span>Specialist: {b.stylistName}</span>
                        <span>Date: {b.date} @ {b.time}</span>
                        <span>Ref: {b.bookingNumber}</span>
                        <span>Total: €{b.totalPrice}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status === "COMPLETED" && (
                        <button
                          onClick={() => setReviewModalBooking(b)}
                          className="py-2 px-3 border border-sand hover:border-gold text-charcoal text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                          <span>Write Review</span>
                        </button>
                      )}

                      {(b.status === "CONFIRMED" || b.status === "RESCHEDULED") && (
                        <button
                          onClick={() => setRescheduleModalBooking(b)}
                          className="py-2 px-3 bg-charcoal text-ivory hover:bg-charcoal-light text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Modify
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Services */}
      {activeTab === "saved" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-charcoal">Saved Services Wishlist</h3>
            <span className="text-xs text-taupe">{savedServices.length} saved</span>
          </div>

          {savedServices.length === 0 ? (
            <div className="text-center py-16 bg-ivory border border-sand space-y-3">
              <Heart className="w-8 h-8 text-taupe mx-auto" />
              <p className="font-serif text-lg text-charcoal">Your wishlist is currently empty.</p>
              <Link
                href="/services"
                className="inline-block px-5 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedServices.map((s) => (
                <div key={s.id} className="p-5 bg-ivory border border-sand flex flex-col justify-between space-y-4">
                  <div className="flex gap-3">
                    <img
                      src={s.heroImage}
                      alt={s.title}
                      className="w-16 h-16 object-cover border border-sand shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-base text-charcoal truncate">{s.title}</h4>
                      <span className="text-xs font-semibold text-charcoal block mt-0.5">
                        From €{s.adultPriceMin}
                      </span>
                      <span className="text-[10px] text-taupe block">~{s.durationMin} mins</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-sand/50">
                    <Link
                      href={`/booking?service=${s.slug}`}
                      className="flex-1 py-2 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider text-center hover:bg-charcoal-light"
                    >
                      Book Now
                    </Link>
                    <button
                      onClick={() => toggleSaveService(s.id)}
                      className="p-2 border border-sand text-taupe hover:text-red-600"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Beauty Profile */}
      {activeTab === "profile" && (
        <div className="p-8 bg-ivory border border-sand space-y-6 max-w-2xl">
          <div className="border-b border-sand/60 pb-3">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Atelier Records
            </span>
            <h3 className="font-serif text-2xl text-charcoal mt-1">Beauty Profile &amp; History</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-taupe-dark font-medium mb-1">Hair Type &amp; Porosity</label>
              <input
                type="text"
                defaultValue={user.beautyProfile?.hairType || "Naturally Wavy, Fine to Medium Density"}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-taupe-dark font-medium mb-1">Skin Notes &amp; Sensitivity</label>
              <input
                type="text"
                defaultValue={user.beautyProfile?.skinType || "Sensitive to salt humidity"}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-taupe-dark font-medium mb-1">Preferred Master Stylist</label>
              <input
                type="text"
                defaultValue={user.beautyProfile?.preferredStylist || "Sofia Camilleri"}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert("Beauty profile preferences updated.")}
                className="px-6 py-2.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-light"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] border border-sand max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setRescheduleModalBooking(null)}
              className="absolute top-4 right-4 text-taupe hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="font-serif text-2xl text-charcoal">Reschedule Appointment</h4>
            <p className="text-xs text-taupe">
              Modify the date and time for {rescheduleModalBooking.serviceName}.
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs pt-2">
              <div>
                <label className="block text-taupe-dark font-medium mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-ivory border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">New Time</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-ivory border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:30">05:30 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
              >
                Confirm Reschedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] border border-sand max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setReviewModalBooking(null)}
              className="absolute top-4 right-4 text-taupe hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>

            {reviewSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
                <h4 className="font-serif text-2xl text-charcoal">Review Published</h4>
                <p className="text-xs text-taupe">
                  Thank you! Your verified review has been posted to {reviewModalBooking.serviceName}.
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-sand/60 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                    Verified Appointment Review
                  </span>
                  <h4 className="font-serif text-xl text-charcoal mt-1">
                    Rate Your Experience
                  </h4>
                  <p className="text-xs text-taupe mt-0.5">
                    {reviewModalBooking.serviceName} with {reviewModalBooking.stylistName}
                  </p>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-taupe-dark font-medium mb-1">
                      Overall Rating (1–5 Stars)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewRating
                                ? "fill-gold text-gold"
                                : "text-sand-dark"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-taupe-dark font-medium mb-1">
                      Your Written Feedback
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share your thoughts on the consultation, precision, tone, and atelier ambiance..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full bg-ivory border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
