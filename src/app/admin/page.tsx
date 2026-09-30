"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { STYLISTS } from "@/data/stylists";
import { SERVICES } from "@/data/services";
import { SALON_INFO } from "@/data/salonInfo";
import { Booking } from "@/types";
import {
  ShieldCheck,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  Scissors,
  Check,
  RotateCcw,
  Lock,
} from "lucide-react";

export default function AdminPage() {
  const { user, bookings, updateBookingStatus, eventInquiries, loginAsDemoAdmin } = useApp();
  const [activeTab, setActiveTab] = useState<"agenda" | "staff" | "inquiries" | "metrics">("agenda");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Access Control: The salon operations suite is reserved for administrators only
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-ivory border border-sand p-8 text-center space-y-6 shadow-card">
          <div className="w-14 h-14 rounded-full bg-charcoal text-gold mx-auto flex items-center justify-center shadow-sm">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold block">
              Staff Authorization Required
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal">
              Atelier Portal Restricted
            </h1>
            <p className="text-xs text-taupe leading-relaxed">
              The ÉLANE Operations Portal and administrative verification tools are restricted to authorized salon directors and atelier staff. Customers and clients cannot access salon management controls.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={loginAsDemoAdmin}
              className="w-full py-3 px-4 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
            >
              Sign In As Salon Director (Demo Admin)
            </button>

            <Link
              href="/account"
              className="block w-full py-2.5 px-4 border border-sand text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-sand/30 transition-colors"
            >
              Return to Customer Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status === filterStatus;
  });

  // Calculate SaaS metrics
  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  const homeServiceCount = bookings.filter((b) => b.locationType === "HOME_SERVICE").length;

  return (
    <div className="space-y-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Admin Top Banner */}
      <div className="p-6 bg-charcoal text-ivory border border-charcoal-muted flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/30">
              Salon Management SaaS
            </span>
            <span className="text-xs text-sand/70">Atelier Operations Suite</span>
          </div>
          <h1 className="font-serif text-3xl font-light text-ivory">
            ÉLANE Operations Portal
          </h1>
          <p className="text-xs text-sand/80">
            Sliema Atelier &amp; Malta Island-Wide Concierge Dispatch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="py-2.5 px-4 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            + Create Walk-In Booking
          </Link>
          <Link
            href="/"
            className="py-2.5 px-4 border border-sand/40 hover:border-sand text-ivory text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Public Site
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-ivory border border-sand space-y-1 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">
            Scheduled Revenue
          </span>
          <div className="font-serif text-3xl text-charcoal">€{totalRevenue}</div>
          <span className="text-[11px] text-olive font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% vs last week
          </span>
        </div>

        <div className="p-5 bg-ivory border border-sand space-y-1 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">
            Active Appointments
          </span>
          <div className="font-serif text-3xl text-charcoal">{confirmedCount}</div>
          <span className="text-[11px] text-taupe">
            {completedCount} completed this month
          </span>
        </div>

        <div className="p-5 bg-ivory border border-sand space-y-1 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">
            Home Service Dispatches
          </span>
          <div className="font-serif text-3xl text-charcoal">{homeServiceCount}</div>
          <span className="text-[11px] text-gold font-medium">
            Island-wide coverage
          </span>
        </div>

        <div className="p-5 bg-ivory border border-sand space-y-1 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">
            Pending Event Inquiries
          </span>
          <div className="font-serif text-3xl text-charcoal">
            {eventInquiries.filter((e) => e.status === "PENDING").length}
          </div>
          <span className="text-[11px] text-taupe">
            Weddings &amp; Galas pipeline
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-sand/60 pb-3">
        <button
          onClick={() => setActiveTab("agenda")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "agenda"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          Daily Appointment Board ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "staff"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          Staff Rostering ({STYLISTS.length})
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
            activeTab === "inquiries"
              ? "border-gold text-charcoal font-bold"
              : "border-transparent text-taupe hover:text-charcoal"
          }`}
        >
          Event Enquiries ({eventInquiries.length})
        </button>
      </div>

      {/* Tab 1: Agenda & Bookings Board */}
      {activeTab === "agenda" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-taupe font-medium">
                Filter Status:
              </span>
              {["all", "CONFIRMED", "COMPLETED", "CANCELLED", "RESCHEDULED"].map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium border transition-colors ${
                      filterStatus === st
                        ? "bg-charcoal text-ivory border-charcoal"
                        : "bg-ivory text-taupe border-sand hover:bg-sand/30"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            <span className="text-xs text-taupe">
              Click buttons on any booking to dynamically update status.
            </span>
          </div>

          <div className="border border-sand bg-ivory divide-y divide-sand/60">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-charcoal bg-sand/40 px-2 py-0.5">
                      {b.bookingNumber}
                    </span>
                    <h3 className="font-serif text-lg text-charcoal font-semibold">
                      {b.serviceName}
                    </h3>
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

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-taupe">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gold" /> {b.customerName} ({b.customerPhone})
                    </span>
                    <span className="flex items-center gap-1">
                      <Scissors className="w-3.5 h-3.5 text-gold" /> Specialist: {b.stylistName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> {b.date} @ {b.time} (~{b.durationMin} mins)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />{" "}
                      {b.locationType === "SALON"
                        ? "Sliema Atelier"
                        : `Home: ${b.homeAddress || b.homeArea}`}
                    </span>
                  </div>

                  {b.notes && (
                    <p className="text-[11px] text-taupe-dark italic bg-sand/20 p-2 rounded-sm border border-sand/40 max-w-2xl">
                      Client Note: &ldquo;{b.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Status action toggles */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="font-serif text-base font-semibold text-charcoal mr-2">
                    €{b.totalPrice}
                  </span>

                  {b.status !== "CONFIRMED" && (
                    <button
                      onClick={() => updateBookingStatus(b.id, "CONFIRMED")}
                      className="px-2.5 py-1.5 bg-emerald-700 text-ivory text-[10px] font-semibold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                      title="Set Confirmed"
                    >
                      Confirm
                    </button>
                  )}

                  {b.status !== "COMPLETED" && (
                    <button
                      onClick={() => updateBookingStatus(b.id, "COMPLETED")}
                      className="px-2.5 py-1.5 bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-wider hover:bg-charcoal-light transition-colors"
                      title="Mark Finished"
                    >
                      Complete
                    </button>
                  )}

                  {b.status !== "CANCELLED" && (
                    <button
                      onClick={() => updateBookingStatus(b.id, "CANCELLED")}
                      className="px-2.5 py-1.5 border border-red-300 text-red-700 text-[10px] font-semibold uppercase tracking-wider hover:bg-red-50 transition-colors"
                      title="Cancel Booking"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Staff Rostering */}
      {activeTab === "staff" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STYLISTS.map((st) => (
            <div key={st.id} className="p-6 bg-ivory border border-sand space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={st.avatar}
                  alt={st.name}
                  className="w-12 h-12 rounded-full object-cover border border-sand"
                />
                <div>
                  <h4 className="font-serif text-lg text-charcoal">{st.name}</h4>
                  <p className="text-xs text-taupe">{st.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-sand/50 pt-3">
                <div className="flex justify-between">
                  <span className="text-taupe">Rating:</span>
                  <span className="font-semibold text-charcoal">{st.rating} ★ ({st.reviewCount})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Experience:</span>
                  <span className="font-medium text-charcoal">{st.yearsOfExperience} Years</span>
                </div>
                <div>
                  <span className="text-taupe block mb-1">Rostered Days:</span>
                  <div className="flex flex-wrap gap-1">
                    {st.availableDays.map((d) => (
                      <span key={d} className="px-2 py-0.5 bg-sand/40 text-[10px] font-medium text-charcoal">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-[11px] text-olive font-medium border-t border-sand/40">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Shift Active
                </span>
                <span className="text-taupe">09:00 – 19:00</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Event Inquiries */}
      {activeTab === "inquiries" && (
        <div className="border border-sand bg-ivory divide-y divide-sand/60">
          {eventInquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-taupe">No event enquiries yet.</div>
          ) : (
            eventInquiries.map((inv) => (
              <div key={inv.id} className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                      {inv.eventType}
                    </span>
                    <h4 className="font-serif text-xl text-charcoal mt-0.5">{inv.name}</h4>
                    <p className="text-xs text-taupe">{inv.email} • {inv.phone}</p>
                  </div>

                  <span className="px-2.5 py-1 bg-sand/40 text-charcoal text-xs font-semibold uppercase">
                    Status: {inv.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-taupe bg-[#FAF7F2] p-3 border border-sand/40">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Date:</span>
                    <strong className="text-charcoal">{inv.date}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Location:</span>
                    <strong className="text-charcoal">{inv.location}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Party Size:</span>
                    <strong className="text-charcoal">{inv.numberOfPeople} Guests</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Budget:</span>
                    <strong className="text-charcoal">{inv.budgetRange}</strong>
                  </div>
                </div>

                {inv.servicesNeeded && inv.servicesNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {inv.servicesNeeded.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-ivory border border-sand text-charcoal">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {inv.message && (
                  <p className="text-xs text-charcoal/85 italic bg-ivory p-3 border border-sand/50">
                    &ldquo;{inv.message}&rdquo;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
