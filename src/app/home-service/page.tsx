"use client";

import React from "react";
import Link from "next/link";
import { SALON_INFO } from "@/data/salonInfo";
import {
  Home,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Check,
} from "lucide-react";

export default function HomeServicePage() {
  const treatments = [
    {
      title: "Private Villa & Penthouse Blowout",
      desc: "Signature ÉLANE polished blowout and luxury sensory wash using portable Italian backwash basins.",
      time: "60 mins",
      price: "From €75",
    },
    {
      title: "Bridal Suite & Destination Wedding",
      desc: "Complete hair and camera-ready makeup on your wedding morning at your hotel, villa, or palazzo.",
      time: "180 mins",
      price: "From €350",
    },
    {
      title: "Executive Residence Barbering",
      desc: "Precision haircut, hot-towel straight-razor contouring, and invigorating scalp massage in complete discretion.",
      time: "60 mins",
      price: "From €65",
    },
    {
      title: "Family Multi-Service Styling",
      desc: "Simultaneous mother & daughter or father & son haircutting sessions at your residence.",
      time: "90 mins",
      price: "From €120",
    },
    {
      title: "Red Carpet Gala Pre-Event Prep",
      desc: "Full evening makeup, faux lash mapping, and glamorous upstyling before black-tie galas in Valletta.",
      time: "90 mins",
      price: "From €140",
    },
    {
      title: "Senior Care & Gentle Home Service",
      desc: "Compassionate, patient hair styling and hand care tailored for elderly clients in their home surroundings.",
      time: "60 mins",
      price: "From €55",
    },
  ];

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold flex items-center justify-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-gold" />
          <span>ÉLANE Concierge Services</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Beauty, Wherever <br />
          <span className="italic font-normal text-gold">You Are.</span>
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          Enjoy the full repertoire of our Sliema atelier delivered directly to your residence, private villa, or yacht across Malta with sterile portable equipment.
        </p>
      </div>

      {/* Editorial Visual Banner */}
      <div className="relative aspect-[21/9] overflow-hidden border border-sand shadow-card">
        <img
          src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1600&q=80"
          alt="Home Service Hair & Makeup Concierge Malta"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* Service Treatments Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Available On Location
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Home Treatments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t, idx) => (
            <div key={idx} className="p-6 bg-ivory border border-sand space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-serif text-xl text-charcoal font-medium">{t.title}</h4>
                  <span className="text-xs font-semibold text-charcoal shrink-0">{t.price}</span>
                </div>
                <p className="text-xs text-taupe leading-relaxed">{t.desc}</p>
              </div>

              <div className="pt-3 border-t border-sand/40 flex items-center justify-between text-xs text-taupe">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" /> {t.time}
                </span>
                <Link
                  href="/booking?location=home"
                  className="text-xs font-semibold text-charcoal hover:text-gold uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Zones Table & Rates */}
      <div className="bg-ivory border border-sand p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Transparent Travel Logistics
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-charcoal font-light">
            Malta Geographic Coverage Zones
          </h3>
          <p className="text-xs text-taupe max-w-xl leading-relaxed">
            Our specialists travel throughout Malta. A modest travel concierge fee is added to cover transit, vehicle parking, and portable equipment setup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {SALON_INFO.homeServiceAreas.map((zone, idx) => (
            <div key={idx} className="p-4 bg-[#FAF7F2] border border-sand space-y-2">
              <span className="font-serif text-2xl text-gold font-light">€{zone.fee}</span>
              <h5 className="font-serif text-base text-charcoal font-medium">{zone.area}</h5>
              <div className="text-[11px] text-taupe flex items-center gap-1">
                <Clock className="w-3 h-3" /> Transit: ~{zone.transitTime}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-sand/30 border border-sand text-xs text-charcoal space-y-1">
          <div className="flex items-center gap-2 font-semibold text-olive">
            <ShieldCheck className="w-4 h-4 text-olive" />
            <span>Punctuality &amp; Safety Commitment</span>
          </div>
          <p className="text-[11px] text-taupe-dark">
            Our specialists arrive 15 minutes before the scheduled start time to establish a clean, protective workstation. Should transit delays exceed 15 minutes, your travel fee is credited.
          </p>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/booking?location=home"
            className="inline-flex items-center gap-2 py-3.5 px-8 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors btn-luxury"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Book Home Service Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
