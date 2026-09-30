"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Sparkles, Shield, User, X, ExternalLink, Calendar, ShoppingBag } from "lucide-react";

export function DemoBadgeNotice() {
  const { user, loginAsDemoClient, loginAsDemoAdmin, logout } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-charcoal text-ivory text-xs border-b border-charcoal-muted/40 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gold/20 text-gold border border-gold/30 font-medium tracking-wide uppercase text-[10px]">
            <Sparkles className="w-3 h-3 text-gold" /> DEMO PLATFORM
          </span>
          <span className="text-sand/90 hidden sm:inline">
            ÉLANE Haute Beauté & Grooming Atelier (Sliema, Malta) — Commercial Demo Experience
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-charcoal-light rounded border border-charcoal-muted px-2 py-0.5 text-[11px] gap-2">
            <span className="text-taupe">Active:</span>
            {user ? (
              <span className="text-ivory font-medium flex items-center gap-1">
                {user.role === "ADMIN" ? <Shield className="w-3 h-3 text-gold" /> : <User className="w-3 h-3 text-sand" />}
                {user.name.split(" ")[0]} ({user.role})
              </span>
            ) : (
              <span className="text-taupe italic">Guest</span>
            )}
            
            <button
              onClick={user?.role === "ADMIN" ? loginAsDemoClient : loginAsDemoAdmin}
              className="text-gold hover:text-gold-light underline ml-1 font-medium transition-colors"
            >
              Switch to {user?.role === "ADMIN" ? "Client" : "Admin"}
            </button>
          </div>

          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-charcoal-muted text-ivory hover:bg-gold/20 hover:text-gold transition-colors text-[11px]"
          >
            <Shield className="w-3 h-3" /> Admin SaaS
          </Link>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-taupe hover:text-ivory transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
