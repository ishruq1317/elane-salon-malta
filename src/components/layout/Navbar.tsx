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
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { user, cart, setIsCartOpen, setIsSearchOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
        className={`sticky top-0 z-40 transition-all duration-300 relative ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-subtle border-b border-sand/50 py-3"
            : "bg-[#FAF7F2]/80 backdrop-blur-sm py-4 border-b border-sand/30"
        }`}
      >
        {/* Animated Page Transition Route Line across page switches */}
        <motion.div
          key={pathname}
          initial={{ scaleX: 0, opacity: 1, originX: 0 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold via-sand-light to-gold shadow-xs z-50 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left / Brand Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex flex-col items-start focus:outline-none transition-transform duration-300 hover:scale-[1.02]">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-charcoal group-hover:text-gold transition-colors duration-300 uppercase">
                  ÉLANE
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-taupe font-medium -mt-1 group-hover:text-gold/80 transition-colors">
                  Atelier Malta
                </span>
              </Link>
            </div>

            {/* Center Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-1 xl:space-x-1.5"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredLink === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className={`group relative px-3 py-1.5 text-xs xl:text-[13px] tracking-wider uppercase font-medium transition-colors select-none flex items-center justify-center cursor-pointer ${
                      isActive
                        ? "text-charcoal font-semibold"
                        : "text-charcoal/75 hover:text-charcoal"
                    }`}
                  >
                    {/* Animated Sliding Active Pill (Framer Motion layoutId moves smoothly across page changes) */}
                    {isActive && (
                      <motion.div
                        layoutId="active-navbar-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-sand/35 rounded-xs -z-10 shadow-xs border-b-2 border-gold"
                      />
                    )}

                    {/* Cursor Pointer Hover Backdrop (Fluid spring highlight following the cursor) */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hover-navbar-pill"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        className="absolute inset-0 bg-sand/20 rounded-xs -z-10"
                      />
                    )}

                    {/* Title Text with Spring Micro-Lift & Color Shift on Pointer Hover */}
                    <span className="relative z-10 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:text-gold flex items-center gap-1">
                      <span>{link.label}</span>

                      {/* Delicate Sparkle Dot on hover */}
                      <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shadow-xs" />
                    </span>

                    {/* Expanding Gold Underline on Pointer Hover (Only for inactive items) */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent w-0 group-hover:w-4/5 transition-all duration-300 ease-out rounded-full pointer-events-none" />
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
