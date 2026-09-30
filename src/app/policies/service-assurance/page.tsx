import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "7-Day Service Assurance (Demo) | ÉLANE Atelier Malta",
};

export default function ServiceAssurancePolicyPage() {
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
          Client Peace of Mind
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
          7-Day Service Assurance Policy
        </h1>
        <p className="text-xs text-olive font-semibold">
          [DEMO PROJECT DOCUMENTATION — FOR DEMONSTRATION PURPOSES ONLY]
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-taupe-dark leading-relaxed">
        <div className="p-4 bg-sand/30 border border-sand text-xs text-charcoal space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-olive">
            <ShieldCheck className="w-4 h-4 text-olive" />
            <span>Official Demo Policy Statement</span>
          </div>
          <p className="italic">
            &ldquo;Demo Service Assurance: If you experience an issue related to your ÉLANE service within 7 days, contact our Sliema salon reception for an assessment and complimentary adjustment consultation. Terms and exclusions apply.&rdquo;
          </p>
        </div>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">1. Hair Colour &amp; Balayage Tonal Checkups</h3>
          <p>
            Hair porosity can occasionally interact unexpectedly with sea water, hard minerals, or sun exposure. If your tone requires a gloss shift or slight tonal cooling within 7 calendar days of your appointment, we provide a complimentary gloss bath checkup.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">2. Precision Haircut Fine-Tuning</h3>
          <p>
            Living with your new haircut for a few days reveals how it behaves with your morning styling routine. If an angle feels too dense or face-framing layers need slight feathering, book a quick 15-minute adjustment with your stylist.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">3. Gel Nail Lift Repairs</h3>
          <p>
            For Russian gel manicures, any accidental chipping or lifting occurring within 7 days of treatment is repaired complimentary at our Sliema nail studio.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl text-charcoal font-medium">4. Exclusions &amp; Demo Notice</h3>
          <p>
            This policy applies exclusively to adjustments aligned with the original consultation goals. Substantial changes of mind (e.g. requesting a complete brunette-to-platinum shift) constitute a new service. Clearly marked as demo platform policy for portfolio presentation.
          </p>
        </section>
      </div>
    </div>
  );
}
