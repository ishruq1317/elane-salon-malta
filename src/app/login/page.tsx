"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Shield, User, ArrowRight, Lock, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loginAsDemoClient, loginAsDemoAdmin, setUser } = useApp();

  const [email, setEmail] = useState("emma.borg@example.mt");
  const [password, setPassword] = useState("••••••••");

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "usr-custom",
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      email,
      phone: "+356 7900 1234",
      role: "CLIENT",
    });
    router.push("/account");
  };

  const handleDemoClient = () => {
    loginAsDemoClient();
    router.push("/account");
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    router.push("/admin");
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
          Customer Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
          Sign In to ÉLANE
        </h1>
        <p className="text-xs text-taupe">
          Access your appointments, service history, and saved styling preferences.
        </p>
      </div>

      {/* Quick Demo Switcher Card */}
      <div className="p-4 bg-sand/30 border border-sand space-y-2 text-xs">
        <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px] block flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold" /> One-Click Demo Credentials
        </span>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleDemoClient}
            className="py-2 px-3 bg-ivory border border-sand hover:border-gold text-charcoal font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-sand-dark" />
            <span>Emma (Client)</span>
          </button>
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="py-2 px-3 bg-charcoal text-ivory hover:bg-charcoal-light font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span>Salon Admin</span>
          </button>
        </div>
      </div>

      {/* Standard Login Form */}
      <form onSubmit={handleCustomLogin} className="p-6 bg-ivory border border-sand space-y-4 text-xs shadow-sm">
        <div>
          <label className="block text-taupe-dark font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-taupe-dark font-medium">
              Password
            </label>
            <span className="text-[10px] text-taupe hover:text-charcoal cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-sand pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light hover:text-gold transition-colors flex items-center justify-center gap-2 mt-2"
        >
          <span>Sign In</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold" />
        </button>
      </form>

      <div className="text-center text-xs text-taupe space-y-2">
        <p>
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-charcoal font-semibold hover:text-gold underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
