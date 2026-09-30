"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { STYLISTS } from "@/data/stylists";
import { REVIEWS } from "@/data/reviews";
import { SERVICES } from "@/data/services";
import { useApp } from "@/context/AppContext";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import {
  Clock,
  ShieldCheck,
  Calendar,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Heart,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: Service;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { addToCart, savedServiceIds, toggleSaveService } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const isSaved = savedServiceIds.includes(service.id);

  const matchingReviews = REVIEWS.filter(
    (r) => r.serviceId === service.id || r.serviceName.toLowerCase().includes(service.title.toLowerCase())
  );
  const displayReviews = matchingReviews.length > 0 ? matchingReviews : REVIEWS.slice(0, 2);

  const relevantStylists = STYLISTS.filter((st) =>
    st.specialties.some(
      (sp) =>
        service.title.toLowerCase().includes(sp.toLowerCase()) ||
        sp.toLowerCase().includes(service.category)
    )
  );
  const displayStylists = relevantStylists.length > 0 ? relevantStylists : STYLISTS.slice(0, 2);

  const relatedServices = SERVICES.filter(
    (s) =>
      s.id !== service.id &&
      (s.category === service.category || s.genderCategory === service.genderCategory)
  ).slice(0, 3);

  const handleAddServiceToCart = () => {
    addToCart({
      id: `cart-srv-${service.id}`,
      type: "SERVICE",
      title: service.title,
      price: service.adultPriceMin,
      image: service.heroImage,
      quantity: 1,
      durationMin: service.durationMin,
      serviceId: service.slug,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-taupe">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-charcoal">Services</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{service.title}</span>
        </div>
      </div>

      {/* Hero Service Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Media Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-sand shadow-card bg-sand/20">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleSaveService(service.id)}
                aria-label={isSaved ? "Remove from saved" : "Save service"}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory/85 backdrop-blur-sm text-charcoal hover:text-red-700 flex items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <Heart
                  className={`w-4.5 h-4.5 ${isSaved ? "fill-red-600 text-red-600" : "text-charcoal"}`}
                />
              </button>
            </div>

            {/* Gallery Thumbnails if available */}
            {service.gallery && service.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {service.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden border border-sand bg-sand/20"
                  >
                    <img
                      src={img}
                      alt={`${service.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Service Meta & Booking Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-sand/40 text-charcoal text-[10px] uppercase tracking-widest font-semibold">
                  {service.category}
                </span>
                <span className="text-[11px] text-taupe font-medium">
                  {service.genderCategory === "women"
                    ? "Women's Atelier"
                    : service.genderCategory === "men"
                    ? "Men's Suite"
                    : "Unisex Service"}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
                {service.title}
              </h1>
              <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Service Specs */}
            <div className="p-5 bg-ivory border border-sand space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-taupe uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold" /> Estimated Duration
                </span>
                <span className="font-semibold text-charcoal">
                  ~{service.durationMin} minutes
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs border-t border-sand/50 pt-2">
                <span className="text-taupe uppercase tracking-wider text-[11px]">
                  Adult Pricing Tier
                </span>
                <span className="font-serif text-xl font-medium text-charcoal">
                  €{service.adultPriceMin} – €{service.adultPriceMax}
                </span>
              </div>

              {service.childPriceMin && (
                <div className="flex items-baseline justify-between text-xs border-t border-sand/50 pt-2">
                  <span className="text-taupe uppercase tracking-wider text-[11px]">
                    Junior / Child Tier
                  </span>
                  <span className="font-serif text-base text-charcoal">
                    €{service.childPriceMin} – €{service.childPriceMax}
                  </span>
                </div>
              )}
            </div>

            {/* Assurance Disclaimer */}
            <div className="p-4 bg-sand/30 border border-sand space-y-1.5 text-xs">
              <div className="flex items-center gap-2 font-semibold text-olive">
                <ShieldCheck className="w-4 h-4 text-olive" />
                <span>Demo Service Assurance</span>
              </div>
              <p className="text-[11px] text-taupe-dark leading-relaxed">
                {service.serviceAssurance}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/booking?service=${service.slug}`}
                className="w-full py-4 bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 btn-luxury shadow-md"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Book This Service Now</span>
              </Link>

              <button
                onClick={handleAddServiceToCart}
                className="w-full py-3.5 border border-charcoal text-charcoal hover:bg-sand/30 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToCart ? "Added to Bag" : "Add Service to Bag"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Details Tabs & Expectations */}
      <section className="bg-ivory border-y border-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Who It's For */}
            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-3">
              <h3 className="font-serif text-xl text-charcoal flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" /> Who It Is For
              </h3>
              <ul className="space-y-2 text-xs text-taupe leading-relaxed">
                {service.whoItsFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Experience */}
            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-3">
              <h3 className="font-serif text-xl text-charcoal flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" /> What Is Included
              </h3>
              <ul className="space-y-2 text-xs text-taupe leading-relaxed">
                {service.includedSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-serif font-bold text-gold text-xs">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation & Aftercare */}
            <div className="p-6 bg-[#FAF7F2] border border-sand space-y-4">
              <div className="space-y-2">
                <h4 className="font-serif text-base text-charcoal font-medium">Preparation</h4>
                <ul className="space-y-1.5 text-xs text-taupe leading-relaxed">
                  {service.preparation.map((prep, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sand-dark">•</span>
                      <span>{prep}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-sand/40">
                <h4 className="font-serif text-base text-charcoal font-medium">Aftercare & Longevity</h4>
                <ul className="space-y-1.5 text-xs text-taupe leading-relaxed">
                  {service.aftercare.map((care, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sand-dark">•</span>
                      <span>{care}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Stylists for this service */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
            Certified Practitioners
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-charcoal font-light">
            Available Specialists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayStylists.map((st) => (
            <div key={st.id} className="p-5 bg-ivory border border-sand flex items-center gap-4">
              <img
                src={st.avatar}
                alt={st.name}
                className="w-14 h-14 rounded-full object-cover border border-sand shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-charcoal font-medium truncate">
                    {st.name}
                  </h4>
                  <span className="text-xs text-gold font-medium">{st.rating} ★</span>
                </div>
                <p className="text-[11px] text-taupe truncate">{st.role}</p>
                <Link
                  href={`/booking?service=${service.slug}&stylist=${st.id}`}
                  className="inline-flex items-center gap-1 text-[11px] text-charcoal hover:text-gold font-semibold uppercase tracking-wider mt-2"
                >
                  <span>Book with {st.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service-Specific Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-sand/60 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
              Client Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal font-light">
              Service Reviews
            </h2>
          </div>
          <span className="text-xs text-taupe">
            {displayReviews.length} Verified Impression{displayReviews.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* Service FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
              Treatment FAQs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-light">
              Common Inquiries
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-ivory border border-sand">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left font-serif text-base text-charcoal flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-taupe transition-transform ${
                      activeFaq === idx ? "rotate-180 text-charcoal" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-taupe leading-relaxed pt-2 mt-2 border-t border-sand/40">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-sand/60 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-1">
              Complementary Rituals
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal font-light">
              You May Also Appreciate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard key={rel.id} service={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
