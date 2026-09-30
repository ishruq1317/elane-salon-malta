"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EVENT_PACKAGES } from "@/data/events";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  Heart,
} from "lucide-react";

export default function EventsPage() {
  const { submitEventInquiry } = useApp();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding / Bridal Party",
    date: "",
    location: "Sliema / St. Julian's area",
    numberOfPeople: 4,
    budgetRange: "€600 – €1,200",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Bridal Hair Updo",
    "Bridal Makeup",
  ]);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    submitEventInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      date: formData.date || "2026-11-15",
      location: formData.location,
      numberOfPeople: Number(formData.numberOfPeople),
      budgetRange: formData.budgetRange,
      servicesNeeded: selectedServices,
      message: formData.message,
    });

    setFormSubmitted(true);
  };

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Bespoke Celebrations &amp; Productions
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Weddings &amp; Private Events
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          Whether you are tying the knot in a historic Maltese palazzo, hosting a corporate gala, or coordinating a high-fashion editorial campaign, our multi-stylist events collective delivers seamless artistry.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Curated Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Event Packages
          </h2>
          <p className="text-xs text-taupe">Demo package pricing based on typical party compositions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-ivory border border-sand shadow-sm hover:shadow-card transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/30">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-charcoal/90 text-ivory px-3 py-1 text-xs font-semibold">
                  From €{pkg.startingPrice}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold font-bold">
                      {pkg.idealFor} • {pkg.attendees}
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal font-medium mt-1">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-taupe mt-1">{pkg.description}</p>
                  </div>

                  {/* Included Services List */}
                  <div className="space-y-2 pt-2 border-t border-sand/50">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal block">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-taupe">
                      {pkg.includedServices.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-sand/60 flex items-center justify-between">
                  <span className="text-xs text-taupe flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {pkg.duration}
                  </span>

                  <a
                    href="#quote"
                    className="py-2.5 px-4 bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Request Package</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Event Quote Enquiry Form */}
      <div id="quote" className="bg-ivory border border-sand p-8 sm:p-12 shadow-card max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Concierge Consultation
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Request An Event Quote
          </h3>
          <p className="text-xs text-taupe">
            Share your event vision and our lead coordinator will respond within 24 hours with a custom proposal.
          </p>
        </div>

        {formSubmitted ? (
          <div className="text-center py-10 space-y-4 bg-[#FAF7F2] border border-sand p-6 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
            <h4 className="font-serif text-2xl text-charcoal">Enquiry Received</h4>
            <p className="text-xs text-taupe max-w-md mx-auto">
              Thank you, {formData.name}. Your request for {formData.eventType} has been logged in our demo management system.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/account"
                className="inline-block py-2.5 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-light transition-colors"
              >
                View in Customer Dashboard
              </Link>
              <Link
                href="/"
                className="inline-block py-2.5 px-6 border border-sand text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-sand/30 transition-colors"
              >
                Return to Atelier Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Vella"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.mt"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+356 7900 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                >
                  <option value="Wedding / Bridal Party">Wedding / Bridal Party</option>
                  <option value="Black-Tie Gala / Awards">Black-Tie Gala / Awards</option>
                  <option value="Fashion Editorial / Lookbook">Fashion Editorial / Lookbook</option>
                  <option value="Milestone Birthday / VIP Gathering">Milestone Birthday / VIP Gathering</option>
                  <option value="Corporate Grooming Suite">Corporate Grooming Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Approximate Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Venue / Location in Malta
                </label>
                <input
                  type="text"
                  placeholder="e.g. Villa Bologna, Attard or Sliema Atelier"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Number of Attendees Receiving Styling
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({ ...formData, numberOfPeople: Number(e.target.value) })}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Services required checklist */}
            <div className="space-y-2 pt-1">
              <label className="block text-taupe-dark font-medium">
                Required Services (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Bridal Hair Updo",
                  "Bridal Makeup",
                  "Bridesmaids Styling",
                  "Groom Scissor & Beard Grooming",
                  "Airbrush Makeup",
                  "Mother of Bride Blowout",
                  "On-Set Photo Touchups",
                ].map((srv) => {
                  const active = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-1.5 rounded-none border text-xs transition-colors ${
                        active
                          ? "bg-charcoal text-ivory border-charcoal font-medium"
                          : "bg-[#FAF7F2] text-charcoal/70 border-sand hover:bg-sand/30"
                      }`}
                    >
                      {active ? "✓ " : "+ "}
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-taupe-dark font-medium mb-1">
                Special Requests or Vision Notes
              </label>
              <textarea
                rows={4}
                placeholder="Share your wedding theme, schedule constraints, dress neckline, or specific stylist requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors flex items-center justify-center gap-2 btn-luxury"
            >
              <Send className="w-3.5 h-3.5 text-gold" />
              <span>Submit Event Quote Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
