import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions (Demo) | ÉLANE Atelier Malta",
};

export default function TermsPolicyPage() {
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
          Legal Disclaimer
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-olive font-semibold">
          [DEMO PROJECT DOCUMENTATION — FOR DEMONSTRATION PURPOSES ONLY]
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-taupe-dark leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">1. Prototype Demonstration Notice</h3>
          <p>
            This website represents an advanced commercial prototype created for demonstrating modern digital salon management, e-commerce, and appointment architecture in Malta. All business identities, appointments, reviews, and transactions are simulated.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">2. Intellectual Property</h3>
          <p>
            Brand marks, custom typography treatments, component layouts, and bespoke architectural code are designed as an original creative showcase. Reference websites served solely as UX benchmarks for information architecture.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">3. Booking Validity</h3>
          <p>
            No real credit card charges or monetary deductions will be executed on this demo platform. All bookings generate demonstrative confirmation codes (e.g. ELN-2026-XXXXX) for evaluation purposes.
          </p>
        </section>
      </div>
    </div>
  );
}
