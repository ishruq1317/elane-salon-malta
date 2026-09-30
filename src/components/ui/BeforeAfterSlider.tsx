"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MoveHorizontal, Pause, Play, Sparkles } from "lucide-react";

interface Transformation {
  id: string;
  category: string;
  title: string;
  stylist: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "balayage",
    category: "Signature Balayage",
    title: "Mediterranean Sun-Kissed French Balayage",
    stylist: "Sofia Camilleri",
    description: "Transitioned from brassy, dull box-dye into multidimensional champagne and biscuit blonde with seamless root blend.",
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "haircut",
    category: "Precision Cut",
    title: "Architectural French Bob & Curtain Fringe",
    stylist: "Luca Briffa",
    description: "Sculpted heavy lifeless length into a sharp, buoyant chin-length bob tailored to jawline contour.",
    beforeImage: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "grooming",
    category: "Men's Fade & Beard",
    title: "Executive Razor Fade & Beard Sculpt",
    stylist: "Marco Vella",
    description: "De-bulked overgrown density into a crisp drop fade with hot-lather razor symmetry and cedarwood nourishment.",
    beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bridal",
    category: "Bridal Couture",
    title: "Luminous Mediterranean Bride & Hollywood Waves",
    stylist: "Maya Schembri & Sofia Camilleri",
    description: "Timeless glass-skin finish paired with high-gloss waves that resisted sea breezes at a sea-cliff Mdina ceremony.",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
];

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0); // Current phase in radians [0, 2*PI]

  const activeItem = TRANSFORMATIONS[activeTab];

  // Measure exact container width for pixel-perfect clipping without distortion
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Autonomous animatic sweep from left to right and right to left
  useEffect(() => {
    if (!isAutoPlaying || isDragging) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = null;
      return;
    }

    // Full round-trip duration: 6 seconds (left -> right -> left)
    const cycleDuration = 6000;
    const angularSpeed = (2 * Math.PI) / cycleDuration;

    const animateSweep = (currentTime: number) => {
      if (lastTimeRef.current !== null) {
        const delta = currentTime - lastTimeRef.current;
        phaseRef.current = (phaseRef.current + delta * angularSpeed) % (2 * Math.PI);

        // Sine wave oscillation between 12% and 88% (Center: 50%, Amplitude: 38%)
        // Naturally slows down at the turnarounds (12% and 88%) and glides gracefully through the middle
        const newPos = 50 + 38 * Math.sin(phaseRef.current);
        setSliderPosition(newPos);
      }
      lastTimeRef.current = currentTime;
      animationRef.current = requestAnimationFrame(animateSweep);
    };

    animationRef.current = requestAnimationFrame(animateSweep);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoPlaying, isDragging]);

  // Handle manual interaction
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);

    // Sync phase so resumption is smooth from the manual position
    const clampedRatio = Math.max(-1, Math.min(1, (percent - 50) / 38));
    phaseRef.current = Math.asin(clampedRatio);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Auto-Sweep Status Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {TRANSFORMATIONS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(idx);
                // When user clicks a new transformation, keep sweeping smoothly
              }}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-all border ${
                activeTab === idx
                  ? "bg-charcoal text-ivory border-charcoal shadow-xs"
                  : "bg-ivory/60 text-charcoal/70 border-sand hover:bg-sand/40 hover:text-charcoal"
              }`}
            >
              {t.category}
            </button>
          ))}
        </div>

        {/* Ambient Animatic Sweep Status & Play/Pause */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-ivory border border-sand/70 text-[11px] text-taupe font-medium">
            <span className="relative flex h-2 w-2">
              {isAutoPlaying && !isDragging && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span className="uppercase tracking-wider">
              {isDragging ? "Manual Drag" : isAutoPlaying ? "Auto Sweep: Left ↔ Right" : "Paused"}
            </span>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 border border-sand/70 bg-ivory hover:bg-sand/30 text-charcoal transition-colors"
            title={isAutoPlaying ? "Pause Auto Sweep" : "Resume Auto Sweep"}
            aria-label={isAutoPlaying ? "Pause Auto Sweep" : "Resume Auto Sweep"}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-gold" />
            ) : (
              <Play className="w-3.5 h-3.5 text-gold" />
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Display */}
      <div className="max-w-4xl mx-auto bg-ivory border border-sand p-3 sm:p-4 shadow-card">
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full overflow-hidden select-none cursor-ew-resize rounded-none"
        >
          {/* AFTER Image (Full background) */}
          <img
            src={activeItem.afterImage}
            alt={`${activeItem.title} - After`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 z-10 bg-charcoal/85 backdrop-blur-sm text-ivory px-3 py-1 text-[11px] font-semibold uppercase tracking-widest pointer-events-none shadow-xs">
            After
          </div>

          {/* BEFORE Image (Clipped overlay with animatic width) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none will-change-[width]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeItem.beforeImage}
              alt={`${activeItem.title} - Before`}
              className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none filter saturate-75 brightness-95"
              style={{
                width: `${containerWidth}px`,
                maxWidth: `${containerWidth}px`,
              }}
            />
            <div className="absolute top-4 left-4 z-10 bg-sand/90 backdrop-blur-sm text-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-widest shadow-xs">
              Before
            </div>
          </div>

          {/* Divider Handle (Animatic sweep line) */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-ivory shadow-2xl pointer-events-none will-change-[left]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-charcoal text-gold border-2 border-ivory flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Transformation Details Info Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-sand/50 mt-3 text-xs">
          <div>
            <h4 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
              {activeItem.title}
            </h4>
            <p className="text-taupe mt-0.5 line-clamp-2 max-w-xl text-xs sm:text-sm">
              {activeItem.description}
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-taupe block">
              Crafted by
            </span>
            <span className="font-medium text-charcoal text-sm">
              {activeItem.stylist}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
