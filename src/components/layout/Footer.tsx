"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Shield,
  Instagram,
  Facebook,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SALON_INFO } from "@/data/salonInfo";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-sand border-t border-charcoal-muted/60 pt-16 pb-12 overflow-hidden relative">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-charcoal-muted/50">
          {/* Column 1: Brand Statement (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-serif text-3xl tracking-[0.2em] font-normal text-ivory uppercase block">
                ÉLANE
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium block mt-0.5">
                Haute Beauté & Grooming Atelier
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-taupe pr-4">
              A sanctuary of European craftsmanship, personalized hair architecture, and bespoke dermal wellness nestled in Sliema, Malta. Beauty, curated around you.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-taupe">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-charcoal-muted flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-charcoal-muted flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-charcoal-muted flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-taupe">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About the Atelier
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-gold transition-colors">
                  Women's Menu
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-gold transition-colors">
                  Men's Grooming
                </Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-gold transition-colors">
                  Junior Atelier (Kids)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  Complete Catalogue
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold transition-colors">
                  Events & Weddings
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gold transition-colors">
                  Boutique Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-taupe">
              <li>
                <Link href="/services/signature-balayage" className="hover:text-gold transition-colors">
                  Signature Balayage
                </Link>
              </li>
              <li>
                <Link href="/services/precision-haircut-blowout" className="hover:text-gold transition-colors">
                  Precision Haircut
                </Link>
              </li>
              <li>
                <Link href="/services/mens-executive-grooming" className="hover:text-gold transition-colors">
                  Men's Precision Fade
                </Link>
              </li>
              <li>
                <Link href="/services/hydra-glow-cellular-facial" className="hover:text-gold transition-colors">
                  Hydra-Glow Facial
                </Link>
              </li>
              <li>
                <Link href="/services/bridal-couture-hair-makeup" className="hover:text-gold transition-colors">
                  Bridal Couture
                </Link>
              </li>
              <li>
                <Link href="/services/russian-manicure-gel-couture" className="hover:text-gold transition-colors">
                  Russian Dry Gel Nails
                </Link>
              </li>
              <li>
                <Link href="/home-service" className="hover:text-gold transition-colors">
                  Malta Home Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Policies (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-taupe">
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link href="/about#faq" className="hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies/booking" className="hover:text-gold transition-colors">
                  Booking Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/cancellation" className="hover:text-gold transition-colors">
                  Cancellation Terms
                </Link>
              </li>
              <li>
                <Link href="/policies/service-assurance" className="hover:text-gold transition-colors">
                  7-Day Service Assurance
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Visit & Newsletter (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory">
              Sliema Atelier
            </h4>
            <div className="text-xs text-taupe space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{SALON_INFO.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{SALON_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{SALON_INFO.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Mon–Sat 09:00 – 19:00 (Thu to 20:30)</span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-sand block mb-2 font-medium">
                The ÉLANE Gazette
              </span>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-gold py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed to seasonal styling edits.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="bg-charcoal-light border border-charcoal-muted px-3 py-2 text-xs text-ivory placeholder:text-taupe-dark focus:outline-none focus:border-gold w-full rounded-l-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="bg-gold hover:bg-gold-light text-charcoal px-3 py-2 text-xs font-medium transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe">
          <p>
            © 2026 ÉLANE Salon Malta — Fictional Commercial Prototype & Management Suite.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 text-taupe-light">
              <Shield className="w-3.5 h-3.5 text-gold" /> Demo Data Notice: Prices in EUR (€)
            </span>
            <Link href="/admin" className="text-gold hover:underline">
              Atelier Management Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
