"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SALON_INFO } from "@/data/salonInfo";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Appointment Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Concierge &amp; Reception
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          Contact The Atelier
        </h1>
        <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
          We welcome your inquiries regarding appointments, bridal couture consultations, home service bookings, or bespoke styling events.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Contact Information */}
        <div className="lg:col-span-5 space-y-8 bg-ivory border border-sand p-8 shadow-sm">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Sliema Atelier
            </span>
            <h3 className="font-serif text-2xl text-charcoal">
              Visit or Reach Us
            </h3>
            <p className="text-xs text-taupe leading-relaxed">
              Located in the heart of Sliema, easily accessible from Tower Road and Sliema Ferries.
            </p>
          </div>

          <div className="space-y-4 text-xs text-charcoal border-t border-sand/60 pt-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong>{SALON_INFO.fullAddress}</strong>
                <span className="text-taupe block text-[11px]">Sliema, Malta (DEMO Location)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>{SALON_INFO.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-gold shrink-0" />
              <span>WhatsApp: {SALON_INFO.whatsapp}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>{SALON_INFO.email}</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-2 border-t border-sand/60 pt-4">
            <h4 className="font-serif text-base text-charcoal flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" /> Atelier Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              {SALON_INFO.openingHours.map((h) => (
                <div key={h.days} className="flex justify-between text-taupe">
                  <span>{h.days}:</span>
                  <span className="font-medium text-charcoal">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/booking"
              className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors flex items-center justify-center gap-2 btn-luxury"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Book An Appointment</span>
            </Link>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-ivory border border-sand p-8 shadow-card">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
              <h4 className="font-serif text-3xl text-charcoal">Message Sent</h4>
              <p className="text-xs text-taupe max-w-md mx-auto">
                Thank you, {formData.name}. Our reception concierge has received your message and will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-gold underline font-medium"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="space-y-1 border-b border-sand/60 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                  Send A Message
                </span>
                <h3 className="font-serif text-2xl text-charcoal">
                  Direct Inquiries
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe-dark font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Galea"
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
                    placeholder="david@example.mt"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe-dark font-medium mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+356 "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-taupe-dark font-medium mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="Appointment Inquiry">Appointment Inquiry</option>
                    <option value="Home Service Booking">Home Service Booking</option>
                    <option value="Bridal Consultation">Bridal Consultation</option>
                    <option value="Product Formulation Query">Product Formulation Query</option>
                    <option value="Press & Commercial Collaboration">Press &amp; Commercial Collaboration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-taupe-dark font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="How may our concierge assist your visit?"
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
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
