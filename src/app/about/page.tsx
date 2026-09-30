"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Leaf,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { SALON_INFO } from "@/data/salonInfo";
import { STYLISTS } from "@/data/stylists";
import { StylistCard } from "@/components/shared/StylistCard";

export default function AboutPage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Haute Beauté &amp; Grooming
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight">
          Where European Elegance Meets <br />
          <span className="italic font-normal text-gold">Mediterranean Serenity.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-taupe-dark leading-relaxed font-light">
          Founded in Sliema, ÉLANE is an architectural sanctuary dedicated to the craft of personal hair design, clinical aesthetic rituals, and restorative wellness.
        </p>
      </section>

      {/* Atelier Visual Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] overflow-hidden border border-sand shadow-card">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80"
            alt="ÉLANE Atelier Interior Sliema Malta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
        </div>
      </section>

      {/* Our Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
              Our Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Crafted with Intention
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-taupe-dark leading-relaxed">
              <p>
                ÉLANE began with a distinct vision: to abandon the frantic, factory-style atmosphere of commercial hair salons in favor of an intimate European atelier where every appointment receives devoted attention.
              </p>
              <p>
                Located along the vibrant coast of Sliema, Malta, our space was constructed using soft limestone textures, brushed brass, and natural linen. Here, we marry time-honored French and Italian hairdressing techniques with cutting-edge biomimetic hair science designed specifically to defend against Mediterranean sun and sea humidity.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-ivory border border-sand space-y-2">
              <span className="font-serif text-3xl text-gold font-light">15+</span>
              <h4 className="font-serif text-base text-charcoal font-medium">Years of Mastery</h4>
              <p className="text-xs text-taupe leading-relaxed">
                Directors trained in Paris, Milan, and London academies.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-sand space-y-2">
              <span className="font-serif text-3xl text-gold font-light">22k+</span>
              <h4 className="font-serif text-base text-charcoal font-medium">Appointments</h4>
              <p className="text-xs text-taupe leading-relaxed">
                Trusted by Malta residents, diplomats, and international destination guests.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-sand space-y-2">
              <span className="font-serif text-3xl text-gold font-light">100%</span>
              <h4 className="font-serif text-base text-charcoal font-medium">Clean Formulations</h4>
              <p className="text-xs text-taupe leading-relaxed">
                Ammonia-free tints, bio-keratins, and vegan botanical care.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-sand space-y-2">
              <span className="font-serif text-3xl text-gold font-light">7-Day</span>
              <h4 className="font-serif text-base text-charcoal font-medium">Service Assurance</h4>
              <p className="text-xs text-taupe leading-relaxed">
                Complimentary consultation and tone adjustments on all services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="bg-ivory border-y border-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
              Uncompromising Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Our Atelier Standards
            </h2>
            <p className="text-xs sm:text-sm text-taupe">
              How we honor our clients, our craft, and our environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-3">
              <div className="w-10 h-10 rounded bg-sand/40 flex items-center justify-center text-charcoal">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-serif text-xl text-charcoal">Personalized Diagnosis</h4>
              <p className="text-xs text-taupe leading-relaxed">
                No service begins without an unhurried 15-minute diagnostic consultation exploring hair porosity, face symmetry, and lifestyle habits.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-3">
              <div className="w-10 h-10 rounded bg-sand/40 flex items-center justify-center text-charcoal">
                <Leaf className="w-5 h-5 text-olive" />
              </div>
              <h4 className="font-serif text-xl text-charcoal">Sustainable Botanicals</h4>
              <p className="text-xs text-taupe leading-relaxed">
                We partner with European green chemistry laboratories using cold-pressed olive squalane, camellia seed, and algae peptides packaged in recyclable glass.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-3">
              <div className="w-10 h-10 rounded bg-sand/40 flex items-center justify-center text-charcoal">
                <ShieldCheck className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-serif text-xl text-charcoal">Hospital-Grade Hygiene</h4>
              <p className="text-xs text-taupe leading-relaxed">
                Autoclave sterilization for nail instruments, single-use surgical steel razor blades, and freshly laundered organic cotton linens for every guest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Artisan Collective
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Meet Our Specialists
          </h2>
          <p className="text-xs sm:text-sm text-taupe">
            Each ÉLANE master brings specialized European training and an unwavering passion for bespoke craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STYLISTS.map((stylist) => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </div>
      </section>

      {/* Atelier Location & Sliema Visit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory border border-sand p-8 sm:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                Visit Us in Sliema
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                The Sliema Atelier
              </h2>
              <p className="text-xs text-taupe leading-relaxed">
                Conveniently situated in central Sliema, just steps from the coastal promenade. Enjoy easy street access and reserved valet parking upon request.
              </p>

              <div className="space-y-3 text-xs text-charcoal border-t border-sand/60 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">{SALON_INFO.fullAddress}</strong>
                    <span className="text-taupe text-[11px]">Central Sliema, Malta (DEMO Location)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span>{SALON_INFO.phone} / WhatsApp: {SALON_INFO.whatsapp}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span>{SALON_INFO.email}</span>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {SALON_INFO.openingHours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6 text-[11px]">
                        <span className="text-taupe">{h.days}:</span>
                        <span className="font-medium">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Book Atelier Appointment</span>
                </Link>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] bg-sand/30 border border-sand relative overflow-hidden flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-charcoal text-gold flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal">Triq il-Kbira, Sliema</h4>
                  <p className="text-xs text-taupe max-w-xs mt-1">
                    Coordinates: 35.9122° N, 14.5042° E (Malta Coastal Strip)
                  </p>
                </div>
                <div className="p-3 bg-ivory/90 border border-sand text-[11px] text-taupe-dark">
                  ★ Landmark: 2 minutes walk from Sliema Ferries &amp; Tower Road promenade.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
            Concierge Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How far in advance should I book my appointment?",
              a: "For signature balayage and weekend slots in our Sliema atelier, we recommend booking 1 to 2 weeks in advance. However, same-day and next-day appointments frequently open up through our live scheduling ticker.",
            },
            {
              q: "How does the ÉLANE 7-Day Demo Service Assurance work?",
              a: "If you experience any tone shift, uneven reflection, or wish to adjust the silhouette of your haircut within 7 days, contact our reception for a complimentary consultation and adjustment checkup.",
            },
            {
              q: "Can I choose my preferred stylist?",
              a: "Yes, our online booking engine allows you to select your preferred master stylist, or choose 'Any Available Master' for earlier scheduling.",
            },
            {
              q: "Do you offer home and yacht service across Malta?",
              a: "Yes, our Senior Stylists travel to private residences, villas, and yachts across Sliema, St. Julian's, Valletta, Mdina, and Mellieħa with sterile portable backwash stations.",
            },
            {
              q: "Can children and teenagers book appointments?",
              a: "Yes, our Junior Atelier caters to young children (ages 3–12) and teenagers with gentle, patient styling in a calm environment.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-ivory border border-sand space-y-2">
              <h4 className="font-serif text-base text-charcoal font-medium">
                {item.q}
              </h4>
              <p className="text-xs text-taupe leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
