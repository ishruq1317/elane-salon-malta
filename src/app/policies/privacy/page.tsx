import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy (Demo) | ÉLANE Atelier Malta",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-taupe hover:text-charcoal transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Atelier
      </Link>

      <div className="space-y-2 border-b border-sand/60 pb-4">
        <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
          Privacy Policy
        </h1>
        <p className="text-xs text-olive font-semibold">
          [DEMO PROJECT DOCUMENTATION — FOR DEMONSTRATION PURPOSES ONLY]
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-taupe-dark leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">1. Client Data Safeguards</h3>
          <p>
            ÉLANE respects the personal privacy of all atelier guests. Any contact information or appointment history entered into this demo website is stored locally in client session storage and simulated demo stores.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">2. European GDPR Alignment</h3>
          <p>
            In production deployment, all customer data is processed in accordance with the European Union General Data Protection Regulation (GDPR) and Maltese Data Protection Act (Cap. 586).
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">3. Marketing &amp; Communications</h3>
          <p>
            We do not sell or trade customer information. Newsletter subscriptions and appointment SMS reminders may be opted out of at any time within your customer account.
          </p>
        </section>
      </div>
    </div>
  );
}
