"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICES } from "@/data/services";
import { STYLISTS } from "@/data/stylists";
import { PRODUCTS } from "@/data/products";
import { EVENT_PACKAGES } from "@/data/events";
import { Search, X, Sparkles, User, ShoppingBag, Calendar, ArrowRight } from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsSearchOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingServices = cleanQuery
    ? SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.category.toLowerCase().includes(cleanQuery) ||
          s.shortDesc.toLowerCase().includes(cleanQuery)
      ).slice(0, 5)
    : [];

  const matchingStylists = cleanQuery
    ? STYLISTS.filter(
        (st) =>
          st.name.toLowerCase().includes(cleanQuery) ||
          st.specialties.some((sp) => sp.toLowerCase().includes(cleanQuery)) ||
          st.role.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingProducts = cleanQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const hasResults =
    matchingServices.length > 0 || matchingStylists.length > 0 || matchingProducts.length > 0;

  const handleSelect = (url: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/70 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-none border border-sand shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-sand bg-ivory">
          <Search className="w-5 h-5 text-taupe shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments, balayage, stylists, products..."
            className="w-full bg-transparent text-charcoal text-sm sm:text-base placeholder:text-taupe focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-taupe hover:text-charcoal p-1 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-taupe hover:text-charcoal px-2 py-1 bg-sand/40 font-medium"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!cleanQuery && (
          <div className="p-6 space-y-4">
            <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {["Signature Balayage", "Men's Skin Fade", "Hydra-Glow Facial", "Russian Manicure", "Bridal Experience", "Home Service", "Silk Glow Elixir"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-sand/30 hover:bg-sand/60 text-xs text-charcoal transition-colors border border-sand/50"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results Container */}
        {cleanQuery && (
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-sand/40 p-4 space-y-4">
            {/* Services Group */}
            {matchingServices.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold" /> Atelier Services
                </span>
                <div className="space-y-1">
                  {matchingServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelect(`/services/${service.slug}`)}
                      className="w-full text-left p-2.5 hover:bg-sand/30 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-serif text-base text-charcoal group-hover:text-gold transition-colors">
                          {service.title}
                        </div>
                        <div className="text-xs text-taupe line-clamp-1">
                          {service.shortDesc}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-xs font-semibold text-charcoal">
                          From €{service.adultPriceMin}
                        </span>
                        <span className="text-[10px] text-taupe block">
                          {service.durationMin}m
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stylists Group */}
            {matchingStylists.length > 0 && (
              <div className="space-y-2 pt-3">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-bold flex items-center gap-1.5">
                  <User className="w-3 h-3 text-gold" /> Master Stylists
                </span>
                <div className="space-y-1">
                  {matchingStylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => handleSelect(`/about#team`)}
                      className="w-full text-left p-2.5 hover:bg-sand/30 transition-colors flex items-center gap-3 group"
                    >
                      <img
                        src={stylist.avatar}
                        alt={stylist.name}
                        className="w-9 h-9 rounded-full object-cover border border-sand"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                          {stylist.name}
                        </div>
                        <div className="text-xs text-taupe">
                          {stylist.role} • {stylist.rating} ★
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-taupe group-hover:text-charcoal transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products Group */}
            {matchingProducts.length > 0 && (
              <div className="space-y-2 pt-3">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-bold flex items-center gap-1.5">
                  <ShoppingBag className="w-3 h-3 text-gold" /> Boutique Products
                </span>
                <div className="space-y-1">
                  {matchingProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(`/shop/${product.slug}`)}
                      className="w-full text-left p-2.5 hover:bg-sand/30 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-taupe">{product.brand}</div>
                      </div>
                      <span className="text-xs font-semibold text-charcoal">
                        €{product.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!hasResults && (
              <div className="text-center py-8 text-taupe">
                <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-taupe-light mt-1">
                  Try searching for balayage, facial, grooming, or manicure.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-sand/20 border-t border-sand flex items-center justify-between text-[11px] text-taupe">
          <span>Press ESC or click outside to dismiss</span>
          <Link
            href="/services"
            onClick={() => setIsSearchOpen(false)}
            className="text-charcoal font-medium hover:text-gold flex items-center gap-1"
          >
            View all services <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
