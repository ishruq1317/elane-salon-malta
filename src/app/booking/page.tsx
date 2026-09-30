import React, { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Book An Appointment | ÉLANE Atelier Malta",
  description:
    "Schedule your luxury salon appointment or home styling concierge in Sliema, Malta. Select your treatment, stylist, date, and preferred location.",
};

export default function BookingPage() {
  return (
    <div className="py-6">
      <Suspense
        fallback={
          <div className="max-w-xl mx-auto py-24 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-gold animate-spin mx-auto" />
            <p className="font-serif text-xl text-charcoal">Loading Booking Atelier...</p>
          </div>
        }
      >
        <BookingWizard />
      </Suspense>
    </div>
  );
}
