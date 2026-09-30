import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-28 px-4 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center mx-auto text-gold">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
          404 — Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
          Atelier Destination Unavailable
        </h1>
        <p className="text-xs text-taupe leading-relaxed">
          The requested salon route could not be found or may have been rearranged.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gold" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
