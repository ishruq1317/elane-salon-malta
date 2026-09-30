"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ArrowRight, User, Mail, Phone, Lock, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useApp();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+356 ");
  const [preferredService, setPreferredService] = useState("French Balayage");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `usr-${Date.now()}`,
      name: fullName.trim() || "New Client",
      email: email.trim(),
      phone: phone.trim(),
      role: "CLIENT",
      beautyProfile: {
        hairType: "Consultation upon arrival",
        preferredStylist: "Sofia Camilleri",
      },
    });
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Atelier Privileges
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
          Create Your Account
        </h1>
        <p className="text-xs text-taupe">
          Join ÉLANE to view your upcoming bookings, history, and tailored styling advice.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-ivory border border-sand space-y-4 text-xs shadow-sm">
        <div>
          <label className="block text-taupe-dark font-medium mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Maria Caruana"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-taupe-dark font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="maria@example.mt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-taupe-dark font-medium mb-1">
            Contact Phone (Malta / International)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-taupe-dark font-medium mb-1">
            Primary Service Interest
          </label>
          <select
            value={preferredService}
            onChange={(e) => setPreferredService(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="French Balayage">French Balayage &amp; Highlights</option>
            <option value="Precision Cut">Precision Architectural Haircut</option>
            <option value="Men's Barbering">Executive Men&apos;s Barbering</option>
            <option value="Dermal Facial">Hydra-Glow Dermal Facial</option>
            <option value="Bridal Couture">Bridal Couture &amp; Makeup</option>
            <option value="Russian Manicure">Russian Dry Manicure</option>
            <option value="Home Service">At-Home Concierge</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors flex items-center justify-center gap-2 mt-2"
        >
          <span>Complete Registration</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold" />
        </button>
      </form>

      <div className="text-center text-xs text-taupe">
        Already registered?{" "}
        <Link href="/login" className="text-charcoal font-semibold hover:text-gold underline">
          Sign In here
        </Link>
      </div>
    </div>
  );
}
