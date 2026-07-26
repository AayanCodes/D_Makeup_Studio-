export type ServiceCategory = 'bridal' | 'hair' | 'skincare' | 'nails' | 'makeup';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number; // in INR
  originalPrice?: number;
  depositAmount: number; // deposit required for booking
  durationMinutes: number;
  description: string;
  popular?: boolean;
  includes: string[];
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  image: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
}

export interface TransformationItem {
  id: string;
  title: string;
  category: ServiceCategory;
  beforeImage: string;
  afterImage: string;
  description: string;
  artistName: string;
  servicesUsed: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'hair' | 'makeup' | 'skincare' | 'bridal';
  season: 'summer' | 'monsoon' | 'winter' | 'all-season';
  author: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  rating: number;
  comment: string;
  image?: string;
  verified: boolean;
  location: string;
}

export interface BookingRequest {
  id?: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceIds: string[];
  stylistId?: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  totalAmount: number;
  depositPaid: number;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  paymentTransactionId?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt?: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    days: string;
    timing: string;
  }[];
  googleMapsEmbedUrl: string;
  googleMapsUrl: string;
}
