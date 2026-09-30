"use client";

import React from "react";
import Link from "next/link";
import { Service } from "@/types";
import { useApp } from "@/context/AppContext";
import { Clock, ShieldCheck, Heart, ArrowRight, Calendar, ShoppingBag } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "featured" | "compact";
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const { savedServiceIds, toggleSaveService, addToCart } = useApp();
  const isSaved = savedServiceIds.includes(service.id);

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  const handleQuickAddService = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: `cart-srv-${service.id}`,
      type: "SERVICE",
      title: service.title,
      price: service.adultPriceMin,
      image: service.heroImage,
      quantity: 1,
      durationMin: service.durationMin,
      serviceId: service.slug,
    });
  };

  return (
    <div className="group bg-ivory border border-sand hover:border-gold/60 transition-all duration-300 shadow-sm hover:shadow-card flex flex-col justify-between overflow-hidden relative">
      {/* Top Image & Overlays */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/30">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover luxury-image-hover"
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
          {service.category}
        </div>

        {/* Save Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveService(service.id);
          }}
          aria-label={isSaved ? "Remove from saved" : "Save service"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ivory/85 backdrop-blur-sm text-charcoal hover:text-red-700 flex items-center justify-center transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 ${isSaved ? "fill-red-600 text-red-600" : "text-charcoal"}`}
          />
        </button>

        {/* Duration Chip at bottom right of image */}
        <div className="absolute bottom-3 right-3 bg-ivory/90 backdrop-blur-sm text-charcoal text-[11px] font-medium px-2 py-0.5 flex items-center gap-1">
          <Clock className="w-3 h-3 text-taupe" />
          <span>{formatDuration(service.durationMin)}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-xl text-charcoal font-normal group-hover:text-gold transition-colors">
              <Link href={`/services/${service.slug}`}>{service.title}</Link>
            </h3>
          </div>

          <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="pt-2 border-t border-sand/50 space-y-1">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-taupe uppercase tracking-wider text-[11px]">
              Adults:
            </span>
            <span className="font-medium text-charcoal text-sm">
              €{service.adultPriceMin} – €{service.adultPriceMax}
            </span>
          </div>

          {service.childPriceMin && (
            <div className="flex items-baseline justify-between text-xs text-taupe">
              <span className="uppercase tracking-wider text-[10px]">
                Junior / Child:
              </span>
              <span>
                €{service.childPriceMin} – €{service.childPriceMax}
              </span>
            </div>
          )}

          {/* Service Guarantee badge */}
          <div className="flex items-center gap-1.5 pt-1.5 text-[10px] text-olive font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-olive shrink-0" />
            <span className="truncate">Demo Assurance: 7-Day Consultation</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            href={`/services/${service.slug}`}
            className="py-2.5 px-3 text-center border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-sand/30 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <Link
            href={`/booking?service=${service.slug}`}
            className="py-2.5 px-3 text-center bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 btn-luxury"
          >
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Book</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
