"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Search, Sparkles } from "lucide-react";

function ServicesCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "duration">("featured");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Junior" },
    { id: "colour", label: "Balayage & Colour" },
    { id: "haircuts", label: "Haircuts" },
    { id: "facials", label: "Facials & Spa" },
    { id: "nails", label: "Nails" },
    { id: "makeup", label: "Makeup" },
    { id: "home-service", label: "Home Service" },
  ];

  let filtered = SERVICES.filter((s) => {
    // Category match
    if (selectedCategory === "women" && s.genderCategory !== "women" && s.genderCategory !== "unisex") return false;
    if (selectedCategory === "men" && s.genderCategory !== "men" && s.genderCategory !== "unisex") return false;
    if (selectedCategory === "kids" && s.genderCategory !== "kids") return false;
    if (selectedCategory !== "all" && selectedCategory !== "women" && selectedCategory !== "men" && selectedCategory !== "kids") {
      if (s.category !== selectedCategory) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchDesc = s.shortDesc.toLowerCase().includes(q);
      const matchCat = s.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.adultPriceMin - b.adultPriceMin;
    if (sortBy === "price-desc") return b.adultPriceMin - a.adultPriceMin;
    if (sortBy === "duration") return a.durationMin - b.durationMin;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          The Complete Service Menu
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Atelier Services Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          Filter through our full repertoire of hair architecture, French balayage, executive barbering, dermal therapy, and island-wide concierge styling.
        </p>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-ivory border border-sand shadow-sm">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal placeholder:text-taupe focus:outline-none focus:border-gold"
          />
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-[11px] uppercase tracking-wider text-taupe shrink-0">
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="featured">Featured / Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration">Duration: Shortest First</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all border ${
              selectedCategory === cat.id
                ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                : "bg-ivory text-charcoal/70 border-sand hover:bg-sand/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-taupe border-b border-sand/40 pb-2">
          <span>Showing {filtered.length} service{filtered.length === 1 ? "" : "s"}</span>
          <span className="text-[11px]">All prices include consultation &amp; blowout</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-ivory border border-sand space-y-3">
            <p className="font-serif text-xl text-charcoal">No services match your filter.</p>
            <p className="text-xs text-taupe">Try clearing your search term or selecting another category.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-4 py-2 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto py-24 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-gold animate-spin mx-auto" />
          <p className="font-serif text-xl text-charcoal">Loading Services Menu...</p>
        </div>
      }
    >
      <ServicesCatalogueContent />
    </Suspense>
  );
}
