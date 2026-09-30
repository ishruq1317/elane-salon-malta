export type GenderCategory = 'women' | 'men' | 'kids' | 'unisex';

export type ServiceCategory = 
  | 'haircuts'
  | 'colour'
  | 'styling'
  | 'treatments'
  | 'grooming'
  | 'bridal'
  | 'beauty'
  | 'nails'
  | 'makeup'
  | 'facials'
  | 'home-service';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  genderCategory: GenderCategory;
  shortDesc: string;
  fullDesc: string;
  whoItsFor: string[];
  includedSteps: string[];
  preparation: string[];
  aftercare: string[];
  durationMin: number;
  adultPriceMin: number;
  adultPriceMax: number;
  childPriceMin?: number;
  childPriceMax?: number;
  serviceAssurance: string;
  heroImage: string;
  gallery: string[];
  faqs: ServiceFAQ[];
  featured?: boolean;
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  availableDays: string[];
  instagram?: string;
}

export interface Review {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId?: string;
  stylistName?: string;
  customerName: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  scores?: {
    service: number;
    staff: number;
    ambiance: number;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'haircare' | 'skincare' | 'styling' | 'aftercare' | 'wellness';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  shortDesc: string;
  description: string;
  ingredients: string[];
  usage: string[];
  inStock: boolean;
  volume: string;
}

export type BookingLocationType = 'SALON' | 'HOME_SERVICE';

export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  stylistId: string;
  stylistName: string;
  locationType: BookingLocationType;
  homeAddress?: string;
  homeArea?: string;
  travelFee?: number;
  date: string;
  time: string;
  durationMin: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface EventPackage {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  startingPrice: number;
  duration: string;
  idealFor: string;
  attendees: string;
  includedServices: string[];
  description: string;
}

export interface CartItem {
  id: string;
  type: 'SERVICE' | 'PRODUCT';
  title: string;
  price: number;
  image: string;
  quantity: number;
  durationMin?: number;
  serviceId?: string;
  productId?: string;
  options?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CLIENT' | 'ADMIN';
  avatar?: string;
  beautyProfile?: {
    hairType?: string;
    skinType?: string;
    allergies?: string;
    preferredStylist?: string;
  };
}

export interface EventInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  numberOfPeople: number;
  budgetRange: string;
  servicesNeeded: string[];
  message: string;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED';
  createdAt: string;
}
