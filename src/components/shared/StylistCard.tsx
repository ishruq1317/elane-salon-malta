"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Stylist } from "@/types";
import { Star, Calendar, Instagram, Award, X, Sparkles } from "lucide-react";

interface StylistCardProps {
  stylist: Stylist;
}

export function StylistCard({ stylist }: StylistCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-ivory border border-sand hover:border-gold/60 transition-all duration-300 shadow-sm flex flex-col justify-between overflow-hidden">
        {/* Stylist Portrait */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
          <img
            src={stylist.avatar}
            alt={stylist.name}
            className="w-full h-full object-cover luxury-image-hover"
            loading="lazy"
          />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-charcoal/85 backdrop-blur-sm text-ivory px-2.5 py-1 text-xs font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>{stylist.rating}</span>
            <span className="text-[10px] text-taupe-light">({stylist.reviewCount})</span>
          </div>

          {/* Experience Chip */}
          <div className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
            {stylist.yearsOfExperience} Years Craft
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors">
              {stylist.name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-taupe font-medium">
              {stylist.role}
            </p>
          </div>

          {/* Specialties */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-taupe-dark font-semibold block">
              Specialties:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stylist.specialties.map((spec) => (
                <span
                  key={spec}
                  className="text-[11px] px-2 py-0.5 bg-sand/40 text-charcoal border border-sand/60"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="py-2 px-3 text-center border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-sand/30 text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Profile
            </button>

            <Link
              href={`/booking?stylist=${stylist.id}`}
              className="py-2 px-3 text-center bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3 h-3 text-gold" />
              <span>Book</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stylist Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] border border-sand max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-ivory/80 text-charcoal hover:bg-charcoal hover:text-ivory flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2 aspect-[3/4] sm:aspect-auto">
                <img
                  src={stylist.avatar}
                  alt={stylist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    <span>{stylist.rating} Rating ({stylist.reviewCount} reviews)</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal">{stylist.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-taupe font-medium">
                    {stylist.role}
                  </p>
                  <p className="text-xs text-charcoal/80 leading-relaxed pt-1">
                    {stylist.bio}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-sand/60">
                  <div className="text-xs text-taupe space-y-1">
                    <div className="font-medium text-charcoal">Available Days:</div>
                    <div>{stylist.availableDays.join(", ")}</div>
                  </div>

                  <Link
                    href={`/booking?stylist=${stylist.id}`}
                    onClick={() => setModalOpen(false)}
                    className="w-full py-2.5 bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>Book with {stylist.name.split(" ")[0]}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
