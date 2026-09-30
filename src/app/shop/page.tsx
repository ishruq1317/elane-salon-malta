"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Formulations" },
    { id: "haircare", label: "Haircare & Masques" },
    { id: "skincare", label: "Dermal Skincare" },
    { id: "styling", label: "Styling & Texturizing" },
    { id: "wellness", label: "Scalp Wellness" },
  ];

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>ÉLANE Botanical Lab</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Boutique Formulations
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          Bespoke haircare elixirs and clinical dermal therapies formulated in European laboratories to defend against Mediterranean sun, salinity, and humidity.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-sand/60 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all border ${
              selectedCategory === cat.id
                ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                : "bg-ivory text-charcoal/70 border-sand hover:bg-sand/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Boutique Delivery Promise */}
      <div className="p-8 bg-ivory border border-sand flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-gold font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Malta Island-Wide Delivery &amp; Atelier Pickup</span>
          </div>
          <p className="text-xs text-taupe max-w-xl">
            Complimentary doorstep courier delivery across Malta on orders over €75, or select in-person pickup at our Sliema atelier.
          </p>
        </div>

        <Link
          href="/booking"
          className="px-6 py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors shrink-0"
        >
          Book An In-Salon Treatment
        </Link>
      </div>
    </div>
  );
}
