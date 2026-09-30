"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function WomenPage() {
  const [subFilter, setSubFilter] = useState("all");

  const womenServices = SERVICES.filter(
    (s) => s.genderCategory === "women" || s.genderCategory === "unisex"
  );

  const filtered = womenServices.filter((s) => {
    if (subFilter === "all") return true;
    if (subFilter === "colour") return s.category === "colour";
    if (subFilter === "haircuts") return s.category === "haircuts";
    if (subFilter === "treatments") return s.category === "treatments";
    if (subFilter === "facials") return s.category === "facials";
    if (subFilter === "nails") return s.category === "nails";
    if (subFilter === "makeup") return s.category === "makeup";
    if (subFilter === "bridal") return s.category === "bridal";
    return true;
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Haute Coiffure &amp; Aesthetics
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Women&apos;s Atelier Menu
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          From signature French balayage to precision architectural haircuts, cellular hydra-facials, and couture bridal styling.
        </p>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-sand/60 pb-6">
        {[
          { id: "all", label: "All Offerings" },
          { id: "colour", label: "Balayage & Colour" },
          { id: "haircuts", label: "Precision Haircuts" },
          { id: "treatments", label: "Keratin & Restorative" },
          { id: "facials", label: "Dermal Facials" },
          { id: "nails", label: "Russian Manicure" },
          { id: "makeup", label: "Red Carpet Makeup" },
          { id: "bridal", label: "Bridal Couture" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubFilter(tab.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all border ${
              subFilter === tab.id
                ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                : "bg-ivory text-charcoal/70 border-sand hover:bg-sand/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Assurance Banner */}
      <div className="p-8 bg-ivory border border-sand flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-olive font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-olive" />
            <span>ÉLANE 7-Day Demo Service Assurance</span>
          </div>
          <p className="text-xs text-taupe max-w-xl">
            All colour and precision cuts include a 7-day complimentary tone adjustment consultation.
          </p>
        </div>

        <Link
          href="/booking"
          className="px-6 py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors shrink-0 btn-luxury"
        >
          Book Your Session
        </Link>
      </div>
    </div>
  );
}
