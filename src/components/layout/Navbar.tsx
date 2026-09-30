"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Search,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  Calendar,
  Sparkles,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, cart, setIsCartOpen, setIsSearchOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Kids", href: "/kids" },
    { label: "Services", href: "/services" },
    { label: "Events", href: "/events" },
    { label: "Home Service", href: "/home-service" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-subtle border-b border-sand/50 py-3"
            : "bg-[#FAF7F2]/80 backdrop-blur-sm py-4 border-b border-sand/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left / Brand Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex flex-col items-start focus:outline-none">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-charcoal group-hover:text-gold transition-colors uppercase">
                  ÉLANE
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-taupe font-medium -mt-1">
                  Atelier Malta
                </span>
              </Link>
            </div>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs xl:text-[13px] tracking-wider uppercase font-medium transition-colors relative ${
                      isActive
                        ? "text-charcoal font-semibold"
                        : "text-charcoal/75 hover:text-charcoal"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Utilities & Book Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="p-2 text-charcoal/80 hover:text-charcoal hover:bg-sand/40 rounded-full transition-colors"
                title="Search services, stylists, products"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
                className="p-2 text-charcoal/80 hover:text-charcoal hover:bg-sand/40 rounded-full transition-colors relative"
                title="Shopping Bag & Saved Services"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-charcoal-dark text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Link */}
              <Link
                href={user ? "/account" : "/login"}
                aria-label="Account profile"
                className="p-2 text-charcoal/80 hover:text-charcoal hover:bg-sand/40 rounded-full transition-colors flex items-center gap-1.5"
                title={user ? `Account (${user.name})` : "Login / Register"}
              >
                <UserIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {user && (
                  <span className="hidden xl:inline text-xs font-medium text-charcoal max-w-[80px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                )}
              </Link>

              {/* Admin Panel Button (beside User button, requires admin credentials) */}
              <Link
                href="/admin"
                aria-label="Admin Operations Panel"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  user?.role === "ADMIN"
                    ? "bg-charcoal text-gold border-charcoal shadow-xs"
                    : "bg-ivory/80 text-charcoal/80 border-sand hover:border-gold hover:text-charcoal hover:bg-sand/30"
                }`}
                title="Salon Management Portal (Requires Admin Credentials)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Admin</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle mobile menu"
                className="lg:hidden p-2 text-charcoal hover:bg-sand/40 rounded-md transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between z-50 border-l border-sand">
            <div>
              {/* Drawer Header */}
              <div className="p-5 flex items-center justify-between border-b border-sand/60">
                <Link
                  href="/"
                  className="font-serif text-2xl tracking-[0.2em] font-normal text-charcoal uppercase"
                >
                  ÉLANE
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-charcoal/80 hover:text-charcoal rounded-full hover:bg-sand/40 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-sm text-sm font-medium tracking-wide uppercase transition-colors ${
                        isActive
                          ? "bg-sand/40 text-charcoal font-semibold border-l-2 border-gold"
                          : "text-charcoal/80 hover:bg-sand/20 hover:text-charcoal"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-taupe" />
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-sand/60 mt-3 space-y-1">
                  <Link
                    href="/shop"
                    className="flex items-center justify-between px-4 py-3 rounded-sm text-sm font-medium tracking-wide uppercase text-charcoal/80 hover:bg-sand/20"
                  >
                    <span>Product Boutique</span>
                    <ChevronRight className="w-4 h-4 text-taupe" />
                  </Link>

                  <Link
                    href={user ? "/account" : "/login"}
                    className="flex items-center justify-between px-4 py-3 rounded-sm text-sm font-medium tracking-wide uppercase text-charcoal/80 hover:bg-sand/20"
                  >
                    <span>{user ? "My Account & Bookings" : "Customer Sign In / Register"}</span>
                    <UserIcon className="w-4 h-4 text-taupe" />
                  </Link>

                  <Link
                    href="/admin"
                    className="flex items-center justify-between px-4 py-3 rounded-sm text-xs font-medium tracking-wide uppercase text-olive bg-olive/10"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-olive" /> Salon Manager SaaS
                    </span>
                    <ChevronRight className="w-4 h-4 text-olive" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer & Quick Booking */}
            <div className="p-5 border-t border-sand/60 bg-ivory/60 space-y-4">
              <Link
                href="/booking"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors text-center"
              >
                <Calendar className="w-4 h-4 text-gold" />
                Book An Appointment
              </Link>

              <div className="text-xs text-taupe-dark space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>123 Triq il-Kbira, Sliema, Malta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>+356 2138 4900</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>Mon–Sat: 09:00 – 19:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
