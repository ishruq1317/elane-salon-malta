import React from "react";
import Link from "next/link";
import { ShieldCheck, Calendar, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Booking Policy (Demo) | ÉLANE Atelier Malta",
};

export default function BookingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-taupe hover:text-charcoal transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Atelier
      </Link>

      <div className="space-y-2 border-b border-sand/60 pb-4">
        <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
          Atelier Protocols
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
          Booking &amp; Reservation Policy
        </h1>
        <p className="text-xs text-olive font-semibold">
          [DEMO PROJECT DOCUMENTATION — FOR DEMONSTRATION PURPOSES ONLY]
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-taupe-dark leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">1. Appointment Scheduling</h3>
          <p>
            Appointments at ÉLANE (Sliema, Malta) may be reserved online via our booking engine or by phone. We allocate generous time windows for every guest to ensure detailed diagnostic consultations and unhurried execution.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">2. Punctuality &amp; Arrival</h3>
          <p>
            We invite guests to arrive 10 minutes prior to their scheduled time to enjoy our herbal tea, espresso, or prosecco reception lounge while reviewing hair goals with their stylist.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">3. Home Service Bookings</h3>
          <p>
            Home service appointments require advance scheduling and an address within Malta. Our concierge team contacts clients 2 hours prior to arrival to confirm parking and room setup logistics.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">4. Service Pricing</h3>
          <p>
            All listed prices are in Euros (€) and include consultation, sensory cleansing, and signature blowout finish unless specifically designated as an add-on.
          </p>
        </section>
      </div>
    </div>
  );
}
