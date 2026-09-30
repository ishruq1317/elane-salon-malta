"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Booking, CartItem, Product, Review, Service, User, EventInquiry } from "@/types";
import { REVIEWS as INITIAL_REVIEWS } from "@/data/reviews";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loginAsDemoClient: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  
  bookings: Booking[];
  createBooking: (newBooking: Omit<Booking, "id" | "bookingNumber" | "createdAt" | "status">) => Booking;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  updateBookingStatus: (bookingId: string, newStatus: Booking["status"]) => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  savedServiceIds: string[];
  toggleSaveService: (serviceId: string) => void;

  reviews: Review[];
  addReview: (newReview: Omit<Review, "id" | "date" | "verified">) => void;

  eventInquiries: EventInquiry[];
  submitEventInquiry: (inquiry: Omit<EventInquiry, "id" | "createdAt" | "status">) => void;
}

const DEMO_CLIENT: User = {
  id: "usr-client-1",
  name: "Emma Borg",
  email: "emma.borg@example.mt",
  phone: "+356 7922 4118",
  role: "CLIENT",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  beautyProfile: {
    hairType: "Naturally Wavy, Fine to Medium Density, Lightened Ends",
    skinType: "Combination / Sensitive to coastal humidity",
    preferredStylist: "Sofia Camilleri",
  },
};

const DEMO_ADMIN: User = {
  id: "usr-admin-1",
  name: "Julian Camilleri (Salon Director)",
  email: "admin@elane-demo.mt",
  phone: "+356 2138 4900",
  role: "ADMIN",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "bk-1",
    bookingNumber: "ELN-2026-10428",
    customerId: "usr-client-1",
    customerName: "Emma Borg",
    customerEmail: "emma.borg@example.mt",
    customerPhone: "+356 7922 4118",
    serviceId: "signature-balayage",
    serviceName: "Signature French Balayage",
    serviceCategory: "colour",
    stylistId: "sofia-camilleri",
    stylistName: "Sofia Camilleri",
    locationType: "SALON",
    date: "2026-10-14",
    time: "15:30",
    durationMin: 150,
    totalPrice: 165,
    status: "CONFIRMED",
    notes: "Prefers golden honey dimension over ash tones. Warm chamomile tea please.",
    createdAt: "2026-09-28T10:14:00Z",
  },
  {
    id: "bk-2",
    bookingNumber: "ELN-2026-09842",
    customerId: "usr-client-1",
    customerName: "Emma Borg",
    customerEmail: "emma.borg@example.mt",
    customerPhone: "+356 7922 4118",
    serviceId: "hydra-glow-cellular-facial",
    serviceName: "Hydra-Glow Cellular Facial Therapy",
    serviceCategory: "facials",
    stylistId: "elena-galea",
    stylistName: "Elena Galea",
    locationType: "SALON",
    date: "2026-08-22",
    time: "11:00",
    durationMin: 75,
    totalPrice: 125,
    status: "COMPLETED",
    notes: "Post-holiday skin revival.",
    createdAt: "2026-08-15T14:22:00Z",
  },
  {
    id: "bk-3",
    bookingNumber: "ELN-2026-08711",
    customerId: "usr-client-1",
    customerName: "Emma Borg",
    customerEmail: "emma.borg@example.mt",
    customerPhone: "+356 7922 4118",
    serviceId: "precision-haircut-blowout",
    serviceName: "Precision Atelier Haircut & Blowout",
    serviceCategory: "haircuts",
    stylistId: "luca-briffa",
    stylistName: "Luca Briffa",
    locationType: "SALON",
    date: "2026-07-10",
    time: "14:00",
    durationMin: 60,
    totalPrice: 65,
    status: "COMPLETED",
    notes: "Light face framing layers.",
    createdAt: "2026-07-01T09:10:00Z",
  },
  {
    id: "bk-4",
    bookingNumber: "ELN-2026-10499",
    customerId: "usr-client-2",
    customerName: "Julian Mifsud",
    customerEmail: "julian.m@example.mt",
    customerPhone: "+356 7944 8821",
    serviceId: "mens-executive-grooming",
    serviceName: "Executive Men's Haircut & Styling",
    serviceCategory: "grooming",
    stylistId: "marco-vella",
    stylistName: "Marco Vella",
    locationType: "SALON",
    date: "2026-10-02",
    time: "16:30",
    durationMin: 45,
    totalPrice: 45,
    status: "CONFIRMED",
    notes: "Regular side taper, matte clay finish.",
    createdAt: "2026-09-29T16:00:00Z",
  },
];

const INITIAL_EVENTS: EventInquiry[] = [
  {
    id: "evt-1",
    name: "Sarah Vella",
    email: "sarah.vella@wedding.mt",
    phone: "+356 7933 9021",
    eventType: "Wedding / Bridal Party",
    date: "2026-11-20",
    location: "Villa Bologna, Attard",
    numberOfPeople: 6,
    budgetRange: "€800 – €1,200",
    servicesNeeded: ["Bridal Makeup", "Bridal Updo", "Bridesmaids Styling"],
    message: "Morning ceremony at 11:30 AM. Need 2 stylists on site by 7:00 AM.",
    status: "PENDING",
    createdAt: "2026-09-27T11:20:00Z",
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_CLIENT);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(["signature-balayage", "hydra-glow-cellular-facial"]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [eventInquiries, setEventInquiries] = useState<EventInquiry[]>(INITIAL_EVENTS);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize and persist state to localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUser = localStorage.getItem("elane_user");
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedBookings = localStorage.getItem("elane_bookings");
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedCart = localStorage.getItem("elane_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("elane_wishlist");
      if (savedWishlist) setSavedServiceIds(JSON.parse(savedWishlist));

      const savedRev = localStorage.getItem("elane_reviews");
      if (savedRev) setReviews(JSON.parse(savedRev));

      const savedInq = localStorage.getItem("elane_events");
      if (savedInq) setEventInquiries(JSON.parse(savedInq));
    } catch {
      // Fallback to initial state if storage error
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("elane_user", JSON.stringify(user));
      localStorage.setItem("elane_bookings", JSON.stringify(bookings));
      localStorage.setItem("elane_cart", JSON.stringify(cart));
      localStorage.setItem("elane_wishlist", JSON.stringify(savedServiceIds));
      localStorage.setItem("elane_reviews", JSON.stringify(reviews));
      localStorage.setItem("elane_events", JSON.stringify(eventInquiries));
    } catch {
      // ignore
    }
  }, [user, bookings, cart, savedServiceIds, reviews, eventInquiries, isMounted]);

  const loginAsDemoClient = () => setUser(DEMO_CLIENT);
  const loginAsDemoAdmin = () => setUser(DEMO_ADMIN);
  const logout = () => setUser(null);

  const createBooking = (data: Omit<Booking, "id" | "bookingNumber" | "createdAt" | "status">): Booking => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      bookingNumber: `ELN-2026-${randomSuffix}`,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
    );
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, date: newDate, time: newTime, status: "RESCHEDULED" } : b))
    );
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleSaveService = (serviceId: string) => {
    setSavedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const addReview = (newReview: Omit<Review, "id" | "date" | "verified">) => {
    const fullReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: "Just now",
      verified: true,
    };
    setReviews((prev) => [fullReview, ...prev]);
  };

  const submitEventInquiry = (inquiry: Omit<EventInquiry, "id" | "createdAt" | "status">) => {
    const fullInquiry: EventInquiry = {
      ...inquiry,
      id: `evt-${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    setEventInquiries((prev) => [fullInquiry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loginAsDemoClient,
        loginAsDemoAdmin,
        logout,
        bookings,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        updateBookingStatus,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        savedServiceIds,
        toggleSaveService,
        reviews,
        addReview,
        eventInquiries,
        submitEventInquiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
