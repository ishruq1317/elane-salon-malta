"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICES } from "@/data/services";
import { STYLISTS } from "@/data/stylists";
import { SALON_INFO } from "@/data/salonInfo";
import { Service, Stylist, BookingLocationType } from "@/types";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Home,
  Building,
  Check,
  AlertCircle,
  Download,
} from "lucide-react";

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceSlug = searchParams?.get("service") || null;
  const preselectedStylistId = searchParams?.get("stylist") || null;
  const preselectedLocation = searchParams?.get("location") || null;

  const { user, createBooking } = useApp();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [anyStylist, setAnyStylist] = useState(false);
  const [locationType, setLocationType] = useState<BookingLocationType>(
    preselectedLocation === "home" ? "HOME_SERVICE" : "SALON"
  );
  const [homeAddress, setHomeAddress] = useState("");
  const [homeArea, setHomeArea] = useState(SALON_INFO.homeServiceAreas[0].area);
  const [selectedDate, setSelectedDate] = useState("2026-10-06");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [customerName, setCustomerName] = useState(user?.name || "Emma Borg");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "emma.borg@example.mt");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+356 7922 4118");
  const [notes, setNotes] = useState("");
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Sync pre-selected query parameters
  useEffect(() => {
    if (preselectedServiceSlug) {
      const match = SERVICES.find((s) => s.slug === preselectedServiceSlug);
      if (match) setSelectedService(match);
    }

    if (preselectedStylistId) {
      const matchSt = STYLISTS.find((st) => st.id === preselectedStylistId);
      if (matchSt) setSelectedStylist(matchSt);
    }
  }, [preselectedServiceSlug, preselectedStylistId]);

  // Update customer info if user logs in
  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
      setCustomerEmail(user.email);
      setCustomerPhone(user.phone);
    }
  }, [user]);

  // Category filter state for step 1
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const filteredServices = SERVICES.filter((s) => {
    if (categoryFilter === "all") return true;
    if (categoryFilter === "women") return s.genderCategory === "women";
    if (categoryFilter === "men") return s.genderCategory === "men";
    if (categoryFilter === "kids") return s.genderCategory === "kids";
    if (categoryFilter === "facials") return s.category === "facials";
    if (categoryFilter === "home-service") return s.category === "home-service";
    return true;
  });

  // Calculate pricing breakdown
  const basePrice = selectedService ? selectedService.adultPriceMin : 0;
  const currentAreaFee =
    locationType === "HOME_SERVICE"
      ? SALON_INFO.homeServiceAreas.find((a) => a.area === homeArea)?.fee || 25
      : 0;
  const finalPrice = basePrice + currentAreaFee;

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedStylist && !anyStylist) return;
    if (step === 3 && locationType === "HOME_SERVICE" && !homeAddress.trim()) {
      alert("Please provide your residence address in Malta for Home Service.");
      return;
    }
    if (step < 7) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 7) {
      // Create confirmed booking
      if (!selectedService) return;
      const assignedStylist =
        selectedStylist ||
        STYLISTS[Math.floor(Math.random() * STYLISTS.length)];

      const booking = createBooking({
        customerId: user?.id || "guest-usr",
        customerName: customerName.trim() || "Guest Client",
        customerEmail: customerEmail.trim() || "client@example.mt",
        customerPhone: customerPhone.trim() || "+356 7900 0000",
        serviceId: selectedService.slug,
        serviceName: selectedService.title,
        serviceCategory: selectedService.category,
        stylistId: assignedStylist.id,
        stylistName: assignedStylist.name,
        locationType,
        homeAddress: locationType === "HOME_SERVICE" ? homeAddress : undefined,
        homeArea: locationType === "HOME_SERVICE" ? homeArea : undefined,
        travelFee: currentAreaFee,
        date: selectedDate,
        time: selectedTime,
        durationMin: selectedService.durationMin,
        totalPrice: finalPrice,
        notes: notes.trim(),
      });

      setConfirmedBookingId(booking.bookingNumber);
      setStep(8);
      try {
        import("canvas-confetti").then((mod) => {
          mod.default({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#B99A68", "#DED4C7", "#171513"],
          });
        });
      } catch {
        // ignore
      }
    }
  };

  const handlePrev = () => {
    if (step > 1 && step < 8) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const timeSlots = [
    { time: "09:30", label: "Morning" },
    { time: "11:00", label: "Morning" },
    { time: "12:15", label: "Noon" },
    { time: "14:00", label: "Afternoon" },
    { time: "15:30", label: "Afternoon" },
    { time: "17:00", label: "Late Afternoon" },
    { time: "18:15", label: "Evening" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Stepper Progress Bar (Steps 1–7) */}
      {step < 8 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-taupe mb-2">
            <span>
              Step {step} of 7:{" "}
              {step === 1 && "Select Treatment"}
              {step === 2 && "Choose Specialist"}
              {step === 3 && "Select Location"}
              {step === 4 && "Choose Date"}
              {step === 5 && "Choose Time"}
              {step === 6 && "Guest Information"}
              {step === 7 && "Review & Confirm"}
            </span>
            <span className="text-gold font-semibold">{Math.round((step / 7) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-sand/40 overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              ÉLANE Atelier Malta
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Select Your Treatment
            </h2>
            <p className="text-xs text-taupe">
              Explore our menu of bespoke hair architecture, dermal therapies, and signature grooming.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: "All Treatments" },
              { id: "women", label: "Women" },
              { id: "men", label: "Men" },
              { id: "kids", label: "Junior (Kids)" },
              { id: "facials", label: "Facials & Spa" },
              { id: "home-service", label: "Home Service" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors border ${
                  categoryFilter === cat.id
                    ? "bg-charcoal text-ivory border-charcoal"
                    : "bg-ivory text-charcoal/70 border-sand hover:bg-sand/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {filteredServices.map((service) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 border transition-all cursor-pointer flex gap-4 ${
                    isSelected
                      ? "bg-sand/30 border-gold shadow-sm ring-1 ring-gold"
                      : "bg-ivory border-sand hover:border-sand-dark hover:bg-ivory-light"
                  }`}
                >
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-20 h-20 object-cover shrink-0 border border-sand"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold">
                          {service.category}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-gold shrink-0" />
                        )}
                      </div>
                      <h4 className="font-serif text-lg text-charcoal font-medium truncate">
                        {service.title}
                      </h4>
                      <p className="text-xs text-taupe line-clamp-1 mt-0.5">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs border-t border-sand/40">
                      <span className="font-medium text-charcoal">
                        From €{service.adultPriceMin}
                      </span>
                      <span className="text-taupe flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" /> ~{service.durationMin} mins
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Choose Stylist */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Artisan Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Choose Your Specialist
            </h2>
            <p className="text-xs text-taupe">
              Select your preferred stylist or aesthetician, or allow us to assign the first available master.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {/* Any Stylist Option */}
            <div
              onClick={() => {
                setAnyStylist(true);
                setSelectedStylist(null);
              }}
              className={`p-5 border cursor-pointer flex flex-col items-center justify-center text-center space-y-3 transition-all ${
                anyStylist
                  ? "bg-sand/30 border-gold ring-1 ring-gold shadow-sm"
                  : "bg-ivory border-sand hover:border-sand-dark"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-sand/40 flex items-center justify-center text-charcoal">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-charcoal">Any Available Master</h4>
                <p className="text-xs text-taupe mt-1">
                  Guaranteed earliest availability tailored to your treatment.
                </p>
              </div>
              {anyStylist && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gold font-semibold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" /> Selected
                </span>
              )}
            </div>

            {/* Stylists List */}
            {STYLISTS.map((stylist) => {
              const isSelected = selectedStylist?.id === stylist.id && !anyStylist;
              return (
                <div
                  key={stylist.id}
                  onClick={() => {
                    setSelectedStylist(stylist);
                    setAnyStylist(false);
                  }}
                  className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                    isSelected
                      ? "bg-sand/30 border-gold ring-1 ring-gold shadow-sm"
                      : "bg-ivory border-sand hover:border-sand-dark"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={stylist.avatar}
                      alt={stylist.name}
                      className="w-14 h-14 object-cover rounded-full border border-sand"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gold font-medium">
                          {stylist.rating} ★
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-gold" />}
                      </div>
                      <h4 className="font-serif text-base text-charcoal font-medium truncate">
                        {stylist.name}
                      </h4>
                      <p className="text-[11px] text-taupe truncate">
                        {stylist.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-sand/40 text-[10px] text-taupe">
                    <span className="font-medium text-charcoal">Specialty: </span>
                    <span>{stylist.specialties[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Choose Location */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Atelier or Residence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Select Appointment Setting
            </h2>
            <p className="text-xs text-taupe">
              Enjoy our Sliema atelier sanctuary or have our senior specialists travel to your private residence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* Salon Option */}
            <div
              onClick={() => setLocationType("SALON")}
              className={`p-6 border cursor-pointer space-y-3 transition-all ${
                locationType === "SALON"
                  ? "bg-sand/30 border-gold ring-1 ring-gold shadow-sm"
                  : "bg-ivory border-sand hover:border-sand-dark"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-sand/40 flex items-center justify-center text-charcoal">
                  <Building className="w-5 h-5 text-gold" />
                </div>
                {locationType === "SALON" && <Check className="w-5 h-5 text-gold" />}
              </div>
              <div>
                <h4 className="font-serif text-xl text-charcoal">Sliema Atelier</h4>
                <p className="text-xs text-taupe mt-1">
                  123 Triq il-Kbira, Sliema, Malta
                </p>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed pt-2 border-t border-sand/40">
                Full access to our Italian backwash basins, private consultation lounge, and complimentary espresso & prosecco bar.
              </p>
              <span className="inline-block text-xs font-semibold text-olive">
                No travel concierge surcharge
              </span>
            </div>

            {/* Home Service Option */}
            <div
              onClick={() => setLocationType("HOME_SERVICE")}
              className={`p-6 border cursor-pointer space-y-3 transition-all ${
                locationType === "HOME_SERVICE"
                  ? "bg-sand/30 border-gold ring-1 ring-gold shadow-sm"
                  : "bg-ivory border-sand hover:border-sand-dark"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-sand/40 flex items-center justify-center text-charcoal">
                  <Home className="w-5 h-5 text-gold" />
                </div>
                {locationType === "HOME_SERVICE" && <Check className="w-5 h-5 text-gold" />}
              </div>
              <div>
                <h4 className="font-serif text-xl text-charcoal">Luxury Home Service</h4>
                <p className="text-xs text-taupe mt-1">
                  Private Villa, Penthouse, or Yacht across Malta
                </p>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed pt-2 border-t border-sand/40">
                Our specialists bring mobile styling basins, ring lights, and sterile toolkits straight to your door.
              </p>
              <span className="inline-block text-xs font-semibold text-gold">
                Travel fee: €20 – €40 based on zone
              </span>
            </div>
          </div>

          {/* Conditional Home Service Address Form */}
          {locationType === "HOME_SERVICE" && (
            <div className="p-6 bg-ivory border border-sand space-y-4 animate-in fade-in duration-200">
              <h4 className="font-serif text-lg text-charcoal flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" /> Home Service Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-taupe-dark mb-1">
                    Malta Geographic Zone
                  </label>
                  <select
                    value={homeArea}
                    onChange={(e) => setHomeArea(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    {SALON_INFO.homeServiceAreas.map((area) => (
                      <option key={area.area} value={area.area}>
                        {area.area} (+€{area.fee})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-taupe-dark mb-1">
                    Full Residence Address & Entry Notes
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apt 4, Portomaso Tower, St. Julian's"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <p className="text-[11px] text-taupe italic">
                * Note: Home service availability varies by area and appointment schedule. Specialists require access to a standard electrical outlet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Choose Date */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Calendar Schedule
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Choose Your Date
            </h2>
            <p className="text-xs text-taupe">
              Select from available appointment dates for October 2026.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-4">
            {[
              { date: "2026-10-02", day: "Fri", num: "02", avail: true },
              { date: "2026-10-03", day: "Sat", num: "03", avail: true },
              { date: "2026-10-04", day: "Sun", num: "04", avail: false },
              { date: "2026-10-05", day: "Mon", num: "05", avail: true },
              { date: "2026-10-06", day: "Tue", num: "06", avail: true },
              { date: "2026-10-07", day: "Wed", num: "07", avail: true },
              { date: "2026-10-08", day: "Thu", num: "08", avail: true },
              { date: "2026-10-09", day: "Fri", num: "09", avail: true },
              { date: "2026-10-10", day: "Sat", num: "10", avail: true },
              { date: "2026-10-11", day: "Sun", num: "11", avail: false },
              { date: "2026-10-12", day: "Mon", num: "12", avail: true },
              { date: "2026-10-13", day: "Tue", num: "13", avail: true },
              { date: "2026-10-14", day: "Wed", num: "14", avail: true },
              { date: "2026-10-15", day: "Thu", num: "15", avail: true },
            ].map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  disabled={!d.avail}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 text-center border transition-all flex flex-col items-center justify-center space-y-1 ${
                    !d.avail
                      ? "opacity-35 bg-sand/10 border-sand/40 cursor-not-allowed"
                      : isSelected
                      ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                      : "bg-ivory border-sand hover:border-gold hover:bg-sand/20"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-70">
                    {d.day}
                  </span>
                  <span className="font-serif text-xl font-bold">{d.num}</span>
                  <span className="text-[9px] uppercase tracking-widest text-gold">
                    {d.avail ? "Available" : "Closed"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 5: Choose Time Slot */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Time Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Select An Available Time
            </h2>
            <p className="text-xs text-taupe">
              Date selected: <strong className="text-charcoal">{selectedDate}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.time;
              return (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-3.5 border transition-all text-center space-y-1 ${
                    isSelected
                      ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                      : "bg-ivory border-sand hover:border-sand-dark hover:bg-sand/20 text-charcoal"
                  }`}
                >
                  <div className="font-serif text-lg font-semibold">{slot.time}</div>
                  <div className="text-[10px] uppercase tracking-widest text-taupe">
                    {slot.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 6: Customer Details */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Client Details
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Your Contact Information
            </h2>
            <p className="text-xs text-taupe">
              Provide appointment confirmation recipient details.
            </p>
          </div>

          <div className="bg-ivory border border-sand p-6 max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-xs font-medium text-taupe-dark mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-taupe-dark mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-taupe-dark mb-1">
                  Phone (Malta / Intl)
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-taupe-dark mb-1">
                Special Requests or Hair/Skin Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Sensitivity to heat, preference for quiet session, or beverage request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 7: Review & Confirm */}
      {step === 7 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Summary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Review Your Appointment
            </h2>
            <p className="text-xs text-taupe">
              Please inspect your appointment details prior to final confirmation.
            </p>
          </div>

          <div className="bg-ivory border border-sand p-6 max-w-xl mx-auto space-y-6">
            <div className="space-y-3 divide-y divide-sand/50 text-xs">
              <div className="flex justify-between pb-2">
                <span className="text-taupe">Treatment:</span>
                <span className="font-semibold text-charcoal text-right">
                  {selectedService?.title}
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <span className="text-taupe">Specialist:</span>
                <span className="font-medium text-charcoal text-right">
                  {anyStylist
                    ? "First Available Senior Specialist"
                    : selectedStylist?.name}
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <span className="text-taupe">Location:</span>
                <span className="font-medium text-charcoal text-right">
                  {locationType === "SALON"
                    ? "Sliema Atelier (123 Triq il-Kbira)"
                    : `Home Service (${homeArea})`}
                </span>
              </div>

              {locationType === "HOME_SERVICE" && homeAddress && (
                <div className="flex justify-between pt-2 pb-2">
                  <span className="text-taupe">Address:</span>
                  <span className="font-medium text-charcoal text-right">
                    {homeAddress}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-2 pb-2">
                <span className="text-taupe">Date & Time:</span>
                <span className="font-medium text-charcoal text-right">
                  {selectedDate} at {selectedTime}
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <span className="text-taupe">Estimated Duration:</span>
                <span className="font-medium text-charcoal text-right">
                  ~{selectedService?.durationMin} minutes
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <span className="text-taupe">Client:</span>
                <span className="font-medium text-charcoal text-right">
                  {customerName} ({customerPhone})
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 space-y-1">
                <div className="flex justify-between text-taupe">
                  <span>Service Base:</span>
                  <span>€{basePrice}</span>
                </div>
                {locationType === "HOME_SERVICE" && (
                  <div className="flex justify-between text-taupe">
                    <span>Travel Concierge Fee:</span>
                    <span>€{currentAreaFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold text-charcoal pt-2 border-t border-sand/60">
                  <span>Total Estimated Price:</span>
                  <span className="font-serif text-xl">€{finalPrice}</span>
                </div>
              </div>
            </div>

            {/* Service Assurance Guarantee Note */}
            <div className="p-3.5 bg-sand/30 border border-sand text-xs text-charcoal/90 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-olive">
                <ShieldCheck className="w-4 h-4 text-olive" />
                <span>Demo Service Assurance Included</span>
              </div>
              <p className="text-[11px] text-taupe-dark">
                Complimentary 7-day consultation & adjustment guarantee on all colour and precision cuts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 8: Confirmed Screen */}
      {step === 8 && (
        <div className="text-center max-w-xl mx-auto py-10 px-4 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-sand/40 border border-gold text-gold flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-gold" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Appointment Reserved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Booking Confirmed
            </h2>
            <p className="text-xs text-taupe max-w-md mx-auto">
              Thank you, {customerName}. Your appointment has been scheduled and recorded in the ÉLANE system.
            </p>
          </div>

          {/* Booking Card */}
          <div className="bg-ivory border border-sand p-6 text-left space-y-3 text-xs shadow-card">
            <div className="flex justify-between items-center border-b border-sand/60 pb-3">
              <span className="text-taupe uppercase tracking-wider text-[11px]">
                Booking Reference
              </span>
              <span className="font-mono text-sm font-bold text-charcoal bg-sand/40 px-2 py-0.5">
                {confirmedBookingId}
              </span>
            </div>

            <div className="space-y-1.5 pt-1 text-charcoal">
              <div className="flex justify-between">
                <span className="text-taupe">Service:</span>
                <span className="font-medium">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Date & Time:</span>
                <span className="font-medium">{selectedDate} @ {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Location:</span>
                <span className="font-medium">
                  {locationType === "SALON"
                    ? "Sliema Atelier (123 Triq il-Kbira)"
                    : `Home Service (${homeAddress || homeArea})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Total:</span>
                <span className="font-semibold text-sm">€{finalPrice}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account"
              className="py-3 px-6 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
            >
              View In Customer Dashboard
            </Link>

            <Link
              href="/admin"
              className="py-3 px-6 bg-sand/60 hover:bg-sand text-charcoal text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-olive" />
              <span>Verify in Admin Portal</span>
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Buttons for Steps 1–7 */}
      {step < 8 && (
        <div className="mt-10 pt-6 border-t border-sand/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 border border-sand text-charcoal hover:bg-sand/30 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-charcoal text-ivory hover:bg-charcoal-light hover:text-gold text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 btn-luxury"
          >
            <span>{step === 7 ? "Confirm Booking" : "Next Step"}</span>
            <ChevronRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      )}
    </div>
  );
}
