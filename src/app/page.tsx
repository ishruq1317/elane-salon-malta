"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Home,
  Users,
  ChevronRight,
  Heart,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { STYLISTS } from "@/data/stylists";
import { REVIEWS } from "@/data/reviews";
import { SALON_INFO } from "@/data/salonInfo";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { StylistCard } from "@/components/shared/StylistCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { QuickDiscoveryCarousel } from "@/components/home/QuickDiscoveryCarousel";

export default function HomePage() {
  const [activeReviewFilter, setActiveReviewFilter] = useState("all");

  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 6);

  // Quick Discovery Categories
  const categories = [
    {
      title: "Women",
      subtitle: "Couture Cuts, Balayage & Treatments",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      href: "/women",
    },
    {
      title: "Men",
      subtitle: "Precision Fades & Barbering Rituals",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      href: "/men",
    },
    {
      title: "Kids",
      subtitle: "Gentle Junior & Teen Styling",
      image: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=800&q=80",
      href: "/kids",
    },
    {
      title: "Facials & Spa",
      subtitle: "Hydra-Glow Dermal Therapies",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      href: "/services?category=facials",
    },
    {
      title: "Nails & Hands",
      subtitle: "Russian Dry Gel Manicures",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
      href: "/services?category=nails",
    },
    {
      title: "Makeup",
      subtitle: "Red Carpet & Gala Artistry",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      href: "/services?category=makeup",
    },
    {
      title: "Bridal",
      subtitle: "Weddings & Destination Brides",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      href: "/events",
    },
    {
      title: "Home Service",
      subtitle: "Concierge Styling Across Malta",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      href: "/home-service",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      title: "Sunlit Riviera Balayage",
      stylist: "Sofia Camilleri",
    },
    {
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      title: "Architectural French Bob",
      stylist: "Luca Briffa",
    },
    {
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      title: "Executive Scissor Taper",
      stylist: "Marco Vella",
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      title: "Mdina Destination Bride",
      stylist: "Maya Schembri",
    },
    {
      url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
      title: "Russian Gel Apex Finish",
      stylist: "Elena Galea",
    },
    {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      title: "Cellular Hydra Radiance",
      stylist: "Elena Galea",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal text-ivory">
        {/* Cinematic Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=2000&q=85"
            alt="ÉLANE Atelier Interior and Model"
            className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Subtle Live Availability Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory/10 backdrop-blur-md border border-ivory/20 text-sand text-xs tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Next Available Slot: Today at 4:30 PM (Sliema Atelier)</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ivory font-light leading-[1.08]">
              Beauty, Crafted <br />
              <span className="italic font-normal text-gold">Around You.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-sand/85 font-light leading-relaxed">
              Premium hair, beauty and grooming services in Malta — delivered with precision, care and individuality in our Sliema atelier or at your residence.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg btn-luxury"
            >
              Book An Appointment
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 border border-sand/40 hover:border-sand text-ivory hover:bg-ivory/10 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              Explore Services
            </Link>
          </div>

          {/* Quick Metrics Bar at Base of Hero */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-ivory/15 text-center">
            {SALON_INFO.stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-gold font-light block">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-sand/70 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK SERVICE DISCOVERY (Expanded Full-Width Window) */}
      <section className="w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-[0.2em] font-semibold">
              <span>Curated Disciplines</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Quick Discovery
            </h2>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Curated atelier disciplines revolving seamlessly in an expanded continuous loop from right to left.
            </p>
          </div>
        </div>

        {/* Expanded Carousel Track */}
        <QuickDiscoveryCarousel categories={categories} />
      </section>

      {/* SECTION 3: SIGNATURE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-sand/60 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
              Atelier Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Signature Services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* SECTION 4: WHY ÉLANE — Split Screen Editorial */}
      <section className="bg-ivory border-y border-sand py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Editorial Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-sand shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                  alt="ÉLANE Senior Stylist Consulting with Client"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-charcoal text-ivory p-6 max-w-xs shadow-2xl border border-gold/30 hidden sm:block">
                <span className="font-serif text-2xl text-gold font-light block leading-none mb-2">
                  &ldquo;
                </span>
                <p className="text-xs text-sand/90 italic leading-relaxed">
                  Hair architecture is not about following trends; it is about honoring your individuality.
                </p>
                <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block mt-3">
                  — Sofia Camilleri, Director
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                  The ÉLANE Standard
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
                  More than a salon. <br />
                  <span className="italic font-normal">A sanctuary of craft.</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed">
                Founded in Sliema, ÉLANE bridges the gap between high-fashion editorial styling and serene personal well-being. Every ritual begins with an unhurried diagnosis of texture, cranial harmony, and lifestyle demands.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF7F2] border border-sand/70 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-charcoal text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-gold" /> European Formulations
                  </div>
                  <p className="text-xs text-taupe leading-relaxed">
                    Formaldehyde-free organic botanicals and bio-fermented hair masques.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-sand/70 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-charcoal text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-olive" /> 7-Day Assurance
                  </div>
                  <p className="text-xs text-taupe leading-relaxed">
                    Complimentary checkup and tone adjustment consultation on all colour.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-sand/70 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-charcoal text-xs uppercase tracking-wider">
                    <Home className="w-4 h-4 text-gold" /> Island-Wide Concierge
                  </div>
                  <p className="text-xs text-taupe leading-relaxed">
                    Home, yacht, and hotel appointments delivered with portable luxury equipment.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-sand/70 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-charcoal text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-gold" /> Master Specialists
                  </div>
                  <p className="text-xs text-taupe leading-relaxed">
                    Dedicated leads for women&apos;s colour, men&apos;s grooming, aesthetic facials, and bridal.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE BEFORE / AFTER SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Real Atelier Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Before & After
          </h2>
          <p className="text-xs sm:text-sm text-taupe">
            Automated animatic reveal sweeping continuously from left to right and right to left. Drag or touch anywhere to manually inspect details.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* SECTION 6: MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-sand/60 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
              Masters of the Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Meet The Team
            </h2>
          </div>
          <Link
            href="/about#team"
            className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors"
          >
            <span>Learn More About Our Stylists</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STYLISTS.slice(0, 3).map((stylist) => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </div>
      </section>

      {/* SECTION 7: EVENTS & WEDDINGS */}
      <section className="bg-charcoal text-ivory py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                Weddings & Bespoke Occasions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-tight">
                Celebrations, Styled to <br />
                <span className="italic font-normal text-gold">Perfection.</span>
              </h2>
              <p className="text-xs sm:text-sm text-sand/85 max-w-xl leading-relaxed">
                From historic Mdina palazzos and Gozo coastal villas to fashion editorial productions in Valletta. Our event team coordinates multi-artist timing for bridal parties, corporate summits, and milestone galas.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-sand">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> Destination Weddings
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> Bridal Party Packages
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> Fashion & Shoot Styling
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/events"
                  className="px-6 py-3.5 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-widest transition-colors btn-luxury"
                >
                  Plan Your Event
                </Link>
                <Link
                  href="/events#quote"
                  className="px-6 py-3.5 border border-sand/40 hover:border-sand text-ivory text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Request Event Quote
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] border border-gold/30 overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Bridal Couture Hair & Makeup Malta"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: HOME SERVICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-ivory border border-sand shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                Luxury At Your Residence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
                Beauty, wherever you are.
              </h2>
              <p className="text-xs sm:text-sm text-taupe leading-relaxed max-w-2xl">
                Experience full salon excellence from the discrete comfort of your home, private villa, or yacht. Our specialists travel across Sliema, St. Julian&apos;s, Valletta, Mdina, and beyond with complete professional equipment.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-charcoal">
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Home Hair Styling
                </div>
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Bridal Home Suite
                </div>
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Men&apos;s Home Grooming
                </div>
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Junior Haircuts
                </div>
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Red Carpet Makeup
                </div>
                <div className="p-2.5 bg-sand/30 border border-sand/60">
                  ✓ Senior Care Styling
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/booking?location=home"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-gold" />
                  <span>Book Home Service</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-[3/4] overflow-hidden border border-sand">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
                  alt="ÉLANE At Home Concierge Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: VERIFIED REVIEWS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Verified Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Client Impressions
          </h2>
          <p className="text-xs sm:text-sm text-taupe">
            Every review is tied to an authentic completed appointment at our Sliema atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* SECTION 10: EDITORIAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-sand/60 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
              Visual Diary
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Atelier Portfolio
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors"
          >
            <span>View Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden bg-sand/30 border border-sand"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover luxury-image-hover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-ivory">
                <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                  {img.stylist}
                </span>
                <h4 className="font-serif text-lg font-medium">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: FINAL BOOKING CTA */}
      <section className="bg-charcoal text-ivory py-24 relative overflow-hidden border-t border-charcoal-muted">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
            Begin Your Experience
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-ivory font-light leading-tight">
            Your next look <span className="italic font-normal text-gold">starts here.</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-sand/80 leading-relaxed font-light">
            Reserve your consultation with our master stylists in Sliema or arrange a private home styling concierge appointment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl btn-luxury"
            >
              Book An Appointment
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-sand/40 hover:border-sand text-ivory text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
