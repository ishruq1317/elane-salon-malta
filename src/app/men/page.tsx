"use client";

import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Scissors } from "lucide-react";

export default function MenPage() {
  const menServices = SERVICES.filter(
    (s) => s.genderCategory === "men" || s.genderCategory === "unisex"
  );

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold flex items-center justify-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-gold" />
          <span>ÉLANE Uomo &amp; Barbering Atelier</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Men&apos;s Grooming Suite
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          Directed by Master Barber Marco Vella. Merging traditional Mediterranean hot-towel straight-razor rituals with British precision scissor architecture and scalp detox therapies.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Men's Grooming Ritual Banner */}
      <div className="bg-charcoal text-ivory p-8 sm:p-12 border border-charcoal-muted grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            The Traditional Ritual
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-light">
            Eucalyptus Hot Towel &amp; Straight Razor Contour
          </h3>
          <p className="text-xs text-sand/80 leading-relaxed max-w-2xl">
            Every executive haircut and beard service includes steam towel pore opening, botanical cedarwood pre-shave oil, single-use surgical steel razor outlining, and cold towel pore reduction.
          </p>
        </div>

        <div className="lg:col-span-4 flex sm:justify-end">
          <Link
            href="/booking?category=men"
            className="px-6 py-3.5 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-widest transition-colors btn-luxury"
          >
            Book Men&apos;s Ritual
          </Link>
        </div>
      </div>
    </div>
  );
}
