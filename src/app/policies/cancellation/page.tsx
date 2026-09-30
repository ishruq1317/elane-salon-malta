import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cancellation Terms (Demo) | ÉLANE Atelier Malta",
};

export default function CancellationPolicyPage() {
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
          Cancellation &amp; Rescheduling Terms
        </h1>
        <p className="text-xs text-olive font-semibold">
          [DEMO PROJECT DOCUMENTATION — FOR DEMONSTRATION PURPOSES ONLY]
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-taupe-dark leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">1. 24-Hour Notice</h3>
          <p>
            Should you need to reschedule or cancel your atelier visit, we respectfully request at least 24 hours notice. This courtesy enables us to offer the reserved time slot to waitlisted guests.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">2. Self-Service Modifications</h3>
          <p>
            You can reschedule or cancel any upcoming appointment with a single click directly inside your <Link href="/account" className="text-gold underline">Client Dashboard</Link> without penalty.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">3. Bridal &amp; Group Bookings</h3>
          <p>
            Due to the dedicated scheduling of multi-stylist teams, bridal party and bespoke private event bookings require a 7-day notice for date adjustments.
          </p>
        </section>
      </div>
    </div>
  );
}
