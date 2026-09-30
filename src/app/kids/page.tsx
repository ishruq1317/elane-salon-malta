"use client";

import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Heart, Sparkles, Calendar, ShieldCheck } from "lucide-react";

export default function KidsPage() {
  const kidsServices = SERVICES.filter((s) => s.genderCategory === "kids");

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-gold" />
          <span>Gentle &amp; Patient Styling</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Junior &amp; Teen Atelier
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          A calm, welcoming experience for young ladies and gentlemen aged 3 to 17. From first haircut celebrations to contemporary trend cuts, taught with care.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kidsServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Parent Serenity Guarantee */}
      <div className="p-8 bg-ivory border border-sand space-y-4 max-w-3xl mx-auto text-center">
        <h3 className="font-serif text-2xl text-charcoal font-light">
          The ÉLANE Junior Promise
        </h3>
        <p className="text-xs text-taupe leading-relaxed">
          We take the stress out of children&apos;s appointments. Parents are invited to sit right beside their child, with quiet chairs, gentle non-sting washes, and patient pacing that respects every child&apos;s rhythm.
        </p>
        <div className="pt-2">
          <Link
            href="/booking?category=kids"
            className="inline-flex items-center gap-2 py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Book Junior Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
