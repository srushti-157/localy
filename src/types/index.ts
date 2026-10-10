export type CategoryType =
  | 'Food & Cafes'
  | 'Tourist Places'
  | 'Hotels & Stays'
  | 'Events'
  | 'Activities'
  | 'Local Services'
  | 'Learning'
  | 'Opportunities';

export type PriceLevel = 'Free' | '₹' | '₹₹' | '₹₹₹';

export interface MenuItem {
  name: string;
  price: string;
  isVeg: boolean;
  description?: string;
}

export interface TransportEstimate {
  autoRickshaw: string;
  cabs: string; // Ola / Rapido / Uber status
  publicBus: string;
  estimatedFareFromCenter: string;
  estimatedTimeFromCenter: string;
  note: string;
}

export interface EventInfo {
  venue: string;
  organizer: string;
  ticketPrice: string;
  bookingLink?: string;
  contactPerson?: string;
}

export interface HotelInfo {
  starRating?: number;
  roomPriceRange: string; // e.g. "₹3,500 – ₹7,000 / night"
  checkIn: string; // "2:00 PM"
  checkOut: string; // "12:00 PM"
  amenities: string[];
  proximityToAttractions: string[];
  suitableFor: string; // "Families, Couples & Cave Tour Tourists"
  bookingUrl?: string;
}

export interface Listing {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: CategoryType;
  city: string;
  area: string;
  address: string;
  price: PriceLevel;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[]; // Multiple high-res photos
  isVerifiedAttraction: boolean; // True for real monuments like Bibi Ka Maqbara, Ellora Caves, etc.
  isDemoData: boolean; // Explicit indicator for unverified sample listings
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  openStreetMapUrl?: string;
  timings?: string;
  entryFee?: string;
  eventDate?: string;
  phone?: string;
  tags: string[];
  highlights: string[];
  nearbyAttractions?: string[];
  facilities?: string[];
  visitorTips?: string[];
  cuisine?: string;
  isPureVeg?: boolean;
  isOpenNow?: boolean;
  menu?: MenuItem[]; // Detailed food menu
  transport?: TransportEstimate; // Auto / Ola / Rapido / Bus estimates
  eventInfo?: EventInfo;
  hotelInfo?: HotelInfo;
}

export interface CityOption {
  id: string;
  name: string;
  label: string;
  state: string;
  centerCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface SimpleFilterState {
  searchQuery: string;
  selectedCity: string;
  selectedCategory: CategoryType | null;
  selectedPrice: PriceLevel | null;
  minRating: number;
  onlyFavorites: boolean;
  onlyPureVeg?: boolean;
  selectedCuisine?: string | null;
  onlyOpenNow?: boolean;
}
