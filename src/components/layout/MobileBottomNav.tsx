"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Home, Sparkles, Calendar, ShoppingBag, User } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart, user, setIsCartOpen } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Hide on booking wizard or admin portal to give full screen focus
  if (!pathname || pathname === "/booking" || pathname.startsWith("/admin")) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isServicesActive =
    pathname.startsWith("/services") || pathname === "/women" || pathname === "/men";
  const isAccountActive =
    pathname.startsWith("/account") || pathname === "/login" || pathname === "/register";

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-sand/80 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isHomeActive ? "text-charcoal font-bold" : "text-taupe hover:text-charcoal"
          }`}
        >
          <Home className="w-4 h-4 mb-1" />
          <span>Home</span>
        </Link>

        <Link
          href="/services"
          className={`flex flex-col items-center py-1 px-3 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isServicesActive ? "text-charcoal font-bold" : "text-taupe hover:text-charcoal"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-1" />
          <span>Services</span>
        </Link>

        {/* Center Prominent Book Button */}
        <Link
          href="/booking"
          className="flex flex-col items-center justify-center -mt-5 bg-charcoal text-ivory w-12 h-12 rounded-full shadow-lg border-2 border-gold hover:bg-charcoal-light transition-transform active:scale-95"
          aria-label="Book appointment"
        >
          <Calendar className="w-5 h-5 text-gold" />
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center py-1 px-3 text-[10px] uppercase tracking-wider font-medium text-taupe hover:text-charcoal transition-colors relative"
        >
          <ShoppingBag className="w-4 h-4 mb-1" />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 w-3.5 h-3.5 bg-gold text-charcoal-dark font-bold text-[9px] rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <Link
          href={user ? "/account" : "/login"}
          className={`flex flex-col items-center py-1 px-3 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isAccountActive ? "text-charcoal font-bold" : "text-taupe hover:text-charcoal"
          }`}
        >
          <User className="w-4 h-4 mb-1" />
          <span>{user ? "Account" : "Sign In"}</span>
        </Link>
      </div>
    </div>
  );
}
