"use client";

import React from "react";
import Link from "next/link";
import { Review } from "@/types";
import { Star, CheckCircle, Sparkles } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-ivory border border-sand p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-card transition-shadow">
      <div className="space-y-3">
        {/* Rating Stars & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(review.rating)
                    ? "fill-gold text-gold"
                    : "text-sand-dark"
                }`}
              />
            ))}
            <span className="text-xs font-semibold text-charcoal ml-1">
              {review.rating}.0
            </span>
          </div>

          {review.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] text-olive font-semibold bg-olive/10 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3 text-olive" />
              Verified Booking
            </span>
          )}
        </div>

        {/* Text */}
        <p className="text-xs text-charcoal/85 leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Category sub-scores if available */}
        {review.scores && (
          <div className="pt-1 flex items-center gap-3 text-[10px] text-taupe border-t border-sand/40">
            <span>Service: {review.scores.service}★</span>
            <span>Staff: {review.scores.staff}★</span>
            <span>Ambiance: {review.scores.ambiance}★</span>
          </div>
        )}
      </div>

      {/* Author & Service Meta */}
      <div className="pt-3 border-t border-sand/60 flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-charcoal block">
            {review.customerName}
          </span>
          <span className="text-[11px] text-gold font-medium block">
            {review.serviceName}
          </span>
        </div>

        <span className="text-[10px] text-taupe">{review.date}</span>
      </div>
    </div>
  );
}
