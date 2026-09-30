"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export interface CategoryItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge?: string;
}

interface QuickDiscoveryCarouselProps {
  categories: CategoryItem[];
}

export function QuickDiscoveryCarousel({ categories }: QuickDiscoveryCarouselProps) {
  // 4 sets of categories ensures continuous, seamless infinite repetition across any wide screen
  const loopedCategories = [
    ...categories,
    ...categories,
    ...categories,
    ...categories,
  ];

  return (
    <div className="relative w-full select-none overflow-hidden py-3">
      {/* Hardware-accelerated continuous infinite keyframe animation: Right to Left (gentle, unhurried pace) */}
      <style>{`
        @keyframes continuousLoopRightToLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-continuous-right-to-left {
          animation: continuousLoopRightToLeft 68s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Expanded Edge-to-Edge Viewport Window */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Luxury Vignette Fades on Left & Right Screen Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-ivory via-ivory/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-ivory via-ivory/70 to-transparent z-10" />

        {/* Continuous expanded track flowing smoothly from right to left */}
        <div className="flex items-center gap-6 sm:gap-7 w-max animate-continuous-right-to-left py-4">
          {loopedCategories.map((cat, index) => {
            const originalIndex = index % categories.length;
            const formattedIndex = String(originalIndex + 1).padStart(2, "0");

            return (
              <Link
                key={`${cat.title}-${index}`}
                href={cat.href}
                className="group relative flex-shrink-0 w-72 sm:w-80 md:w-[340px] lg:w-[360px] h-[420px] sm:h-[460px] md:h-[480px] overflow-hidden bg-charcoal border border-sand/70 shadow-sm flex flex-col justify-between p-7 sm:p-8 transition-all duration-500 hover:border-gold/90 hover:shadow-xl"
              >
                {/* Background Image with Rich Editorial Treatment */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />

                {/* Top Header: Category Index Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase font-mono font-medium tracking-widest text-ivory/90 bg-charcoal/60 backdrop-blur-md border border-ivory/15">
                    <span>{formattedIndex}</span>
                    <span className="text-gold">/</span>
                    <span>Atelier</span>
                  </span>

                  <div className="w-8 h-8 rounded-full bg-ivory/20 backdrop-blur-xs flex items-center justify-center text-ivory group-hover:bg-gold group-hover:text-charcoal transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Content: Title, Subtitle, Direct Link prompt */}
                <div className="relative z-10 space-y-2.5">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-light group-hover:text-gold transition-colors tracking-wide">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sand/85 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-sand/70 group-hover:text-gold transition-colors">
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subtle Ambient Footer (Aligned to page container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between pt-3 border-t border-sand/40 text-[11px] text-taupe">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>8 Curated Disciplines • Continuous Cinematic Showcase</span>
          </div>
          <div>
            <span className="hidden sm:inline">Click any category to explore dedicated services & master stylists</span>
          </div>
        </div>
      </div>
    </div>
  );
}
