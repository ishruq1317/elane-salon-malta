"use client";

import React, { useState } from "react";
import { Stylist } from "@/types";
import { Star, Award, X, Sparkles, Instagram, ArrowRight, User } from "lucide-react";

interface TeamShowcaseCarouselProps {
  stylists: Stylist[];
}

export function TeamShowcaseCarousel({ stylists }: TeamShowcaseCarouselProps) {
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);

  // Duplicate 4x to ensure smooth continuous infinite looping across all screen sizes
  const loopedStylists = [
    ...stylists,
    ...stylists,
    ...stylists,
    ...stylists,
  ];

  return (
    <>
      <div className="relative w-full select-none overflow-hidden py-6">
        {/* Continuous infinite loop animation from left to right */}
        <style>{`
          @keyframes teamLoopLeftToRight {
            0% {
              transform: translate3d(-50%, 0, 0);
            }
            100% {
              transform: translate3d(0%, 0, 0);
            }
          }

          .animate-team-loop-left-to-right {
            animation: teamLoopLeftToRight 52s linear infinite;
            will-change: transform;
          }

          .animate-team-loop-left-to-right:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Soft Luxury Vignette Fades on Left & Right Screen Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/75 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/75 to-transparent z-10" />

        {/* Continuous Track */}
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-team-loop-left-to-right py-6">
          {loopedStylists.map((stylist, index) => {
            return (
              <div
                key={`${stylist.id}-${index}`}
                onClick={() => setSelectedStylist(stylist)}
                className="group relative flex-shrink-0 w-72 sm:w-80 md:w-84 bg-ivory border border-sand/70 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl hover:border-gold hover:ring-2 hover:ring-gold/30"
              >
                {/* Stylist Portrait with Dramatic Pop-Up Effect */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
                  <img
                    src={stylist.avatar}
                    alt={stylist.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-charcoal/85 backdrop-blur-sm text-ivory px-2.5 py-1 text-xs font-semibold flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span>{stylist.rating}</span>
                    <span className="text-[10px] text-sand/80">({stylist.reviewCount})</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 bg-ivory/95 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 shadow-xs border border-sand/50">
                    {stylist.yearsOfExperience} Years Craft
                  </div>

                  {/* Hover Prompt Icon */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Info Container: Profile Only, No Booking Button */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-gold transition-colors tracking-wide">
                      {stylist.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-taupe font-medium">
                      {stylist.role}
                    </p>
                  </div>

                  {/* Specialties Pills */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] px-2 py-0.5 bg-sand/35 text-charcoal border border-sand/60 rounded-xs group-hover:border-gold/50 transition-colors"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Single Clean Profile Action */}
                  <div className="pt-2 border-t border-sand/50">
                    <div className="w-full py-2 px-3 text-center border border-sand bg-ivory text-charcoal group-hover:bg-charcoal group-hover:text-ivory group-hover:border-charcoal text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold" />
                      <span>View Artisan Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Footer Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <div className="flex items-center justify-between pt-2 border-t border-sand/40 text-[11px] text-taupe">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Master Stylists &amp; Aestheticians • Hover picture to inspect profile</span>
            </div>
            <div>
              <span className="hidden sm:inline">Continuous Left-to-Right Showcase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stylist Profile Modal: Strictly Profile & Bio, NO Booking Button */}
      {selectedStylist && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm"
          onClick={() => setSelectedStylist(null)}
        >
          <div
            className="bg-[#FAF7F2] border border-sand max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStylist(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-ivory/80 text-charcoal hover:bg-charcoal hover:text-ivory flex items-center justify-center transition-colors shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2 aspect-[3/4] sm:aspect-auto">
                <img
                  src={selectedStylist.avatar}
                  alt={selectedStylist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    <span>{selectedStylist.rating} Rating ({selectedStylist.reviewCount} reviews)</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    {selectedStylist.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-taupe font-medium">
                    {selectedStylist.role}
                  </p>
                  <p className="text-xs text-charcoal/80 leading-relaxed pt-1">
                    {selectedStylist.bio}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-sand/60">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-taupe block font-semibold mb-1">
                      Disciplines &amp; Craft:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {selectedStylist.specialties.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 bg-sand/30 border border-sand/50 text-charcoal">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedStylist.instagram && (
                    <div className="flex items-center gap-2 text-xs text-taupe pt-1">
                      <Instagram className="w-3.5 h-3.5 text-gold" />
                      <span className="font-medium text-charcoal">{selectedStylist.instagram}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-taupe italic pt-1">
                    Resident Specialist at ÉLANE Haute Beauté &amp; Grooming Atelier (Sliema, Malta)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
