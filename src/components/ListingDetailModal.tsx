import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Share2,
  Check,
  ShieldCheck,
  AlertTriangle,
  Navigation,
  ExternalLink,
  CheckCircle2,
  Ticket,
  Car,
  Utensils,
  Lightbulb,
  Hotel,
  Wifi,
  Sparkles,
} from 'lucide-react';
import { Listing } from '../types';

interface ListingDetailModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'hotel' | 'transport' | 'tips'>('overview');

  if (!isOpen || !listing) return null;

  const galleryImages = listing.gallery && listing.gallery.length > 0
    ? listing.gallery
    : [listing.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#EDE7DC] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Photographic Header & Multi-Image Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-gray-900 overflow-hidden">
          <img
            src={galleryImages[selectedImageIndex] || listing.image}
            alt={listing.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

          {/* Top action buttons */}
          <div className="absolute top-3 inset-x-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              {listing.isVerifiedAttraction ? (
                <span className="px-3 py-1 rounded-xl bg-emerald-600/95 backdrop-blur-md text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Place</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-amber-500/95 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  DEMO DATA
                </span>
              )}
              <span className="px-3 py-1 rounded-xl bg-black/50 backdrop-blur-md text-white text-xs font-semibold">
                {listing.category}
              </span>
              {listing.isPureVeg && (
                <span className="px-2.5 py-1 rounded-xl bg-emerald-700/95 backdrop-blur-md text-white text-[11px] font-bold">
                  🟢 Pure Veg
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer shadow-md"
                title="Share link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(listing.id)}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-[#F43F5E] flex items-center justify-center transition-all cursor-pointer shadow-md"
                title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-gray-700'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="absolute top-14 left-4 flex gap-1.5 z-10">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-11 h-8 rounded-lg overflow-hidden border-2 transition-transform cursor-pointer ${
                    selectedImageIndex === idx ? 'border-white scale-110 shadow-md' : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Key Highlights in Photo Scrim */}
          <div className="absolute bottom-3 inset-x-5 text-white">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
              {listing.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-white/90 mt-1">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
                {listing.area}, {listing.city}
              </span>
              <span>·</span>
              <span className="font-mono font-bold">{listing.price}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                <span className="font-bold">{listing.rating.toFixed(1)}</span>
                <span className="text-white/70">({listing.reviewCount} reviews)</span>
              </span>
              {listing.cuisine && (
                <>
                  <span>·</span>
                  <span className="font-medium text-amber-200">{listing.cuisine}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#EDE7DC] bg-[#FAF7F2] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-xs'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overview
          </button>

          {listing.menu && listing.menu.length > 0 && (
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-2 px-3 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                activeTab === 'menu'
                  ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Menu & Dishes ({listing.menu.length})</span>
            </button>
          )}

          {listing.hotelInfo && (
            <button
              onClick={() => setActiveTab('hotel')}
              className={`py-2 px-3 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                activeTab === 'hotel'
                  ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Hotel Tariff & Rooms</span>
            </button>
          )}

          {listing.transport && (
            <button
              onClick={() => setActiveTab('transport')}
              className={`py-2 px-3 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                activeTab === 'transport'
                  ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Transport & Fares</span>
            </button>
          )}

          {listing.visitorTips && listing.visitorTips.length > 0 && (
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-2 px-3 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                activeTab === 'tips'
                  ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Visitor Tips</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
          
          {/* Status Label Banner */}
          {listing.isVerifiedAttraction ? (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Verified Place / Heritage Monument:</span>{' '}
                Accurate visiting information and genuine historical coordinates in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">DEMO DATA:</span>{' '}
                This is an illustrative demonstration listing with sample menu items and prices for prototype demonstration.
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Tagline & Full Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  About this spot
                </h4>
                <p className="text-base font-semibold text-[#1E1B2E] mb-2 leading-snug">
                  {listing.tagline}
                </p>
                <p className="text-sm text-[#4B465C] leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {listing.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/60 border border-purple-100/80 text-xs text-[#4C1D95] font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Info if applicable */}
              {listing.eventInfo && (
                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 space-y-2 text-xs">
                  <h4 className="font-bold text-[#F43F5E] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Event & Booking Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800">
                    <div><span className="font-bold">Organizer:</span> {listing.eventInfo.organizer}</div>
                    <div><span className="font-bold">Tickets:</span> {listing.eventInfo.ticketPrice}</div>
                    <div className="sm:col-span-2"><span className="font-bold">Venue:</span> {listing.eventInfo.venue}</div>
                  </div>
                </div>
              )}

              {/* Practical Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE7DC]">
                <div className="space-y-1">
                  <span className="font-bold text-gray-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" /> Location & Address
                  </span>
                  <p className="text-gray-800 font-medium pl-5">{listing.address}</p>
                </div>

                {listing.timings && (
                  <div className="space-y-1">
                    <span className="font-bold text-gray-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#7C3AED]" /> Hours / Timings
                    </span>
                    <p className="text-gray-800 font-medium pl-5">{listing.timings}</p>
                  </div>
                )}

                {listing.entryFee && (
                  <div className="space-y-1 sm:col-span-2">
                    <span className="font-bold text-gray-500 flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-[#F43F5E]" /> Ticket & Entry Fee
                    </span>
                    <p className="text-gray-800 font-medium pl-5">{listing.entryFee}</p>
                  </div>
                )}

                {listing.phone && (
                  <div className="space-y-1">
                    <span className="font-bold text-gray-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#7C3AED]" /> Contact Phone
                    </span>
                    <p className="text-gray-800 font-medium pl-5">{listing.phone}</p>
                  </div>
                )}
              </div>

              {/* Facilities */}
              {listing.facilities && listing.facilities.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Facilities Available
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.facilities.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Attractions */}
              {listing.nearbyAttractions && listing.nearbyAttractions.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nearby Sights & Distance
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.nearbyAttractions.map((sight) => (
                      <span
                        key={sight}
                        className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] text-[#4C1D95] text-xs font-medium border border-[#EDE7DC]"
                      >
                        📍 {sight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DETAILED FOOD MENU */}
          {activeTab === 'menu' && listing.menu && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDE7DC]">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1E1B2E]">
                    Specialty Dishes & Pricing
                  </h4>
                  <p className="text-xs text-gray-500">
                    Sample prices in INR (₹) with authentic preparation notes
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Veg
                  </span>
                  <span className="flex items-center gap-1 text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Non-Veg
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {listing.menu.map((dish, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] flex items-start justify-between gap-3 hover:bg-white hover:border-[#7C3AED]/30 transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          dish.isVeg
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-rose-600 text-rose-600'
                        }`}
                        title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                      </span>
                      <div>
                        <h5 className="font-display font-bold text-xs sm:text-sm text-[#1E1B2E]">
                          {dish.name}
                        </h5>
                        {dish.description && (
                          <p className="text-xs text-[#4B465C] mt-0.5 leading-relaxed">
                            {dish.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="font-mono font-bold text-xs sm:text-sm text-[#7C3AED] bg-white px-2.5 py-1 rounded-xl border border-[#EDE7DC] shrink-0">
                      {dish.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: HOTEL INFO */}
          {activeTab === 'hotel' && listing.hotelInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Room Tariff Range
                  </div>
                  <p className="font-display font-bold text-sm text-[#7C3AED]">
                    {listing.hotelInfo.roomPriceRange}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Check-In / Check-Out
                  </div>
                  <p className="font-display font-bold text-sm text-[#1E1B2E]">
                    In: {listing.hotelInfo.checkIn} · Out: {listing.hotelInfo.checkOut}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#EDE7DC] space-y-2 text-xs">
                <span className="font-bold text-gray-700">Suitable For:</span>
                <p className="text-gray-600">{listing.hotelInfo.suitableFor}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Hotel Amenities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {listing.hotelInfo.amenities.map((am) => (
                    <span
                      key={am}
                      className="px-2.5 py-1 rounded-xl bg-purple-50 text-[#7C3AED] text-xs font-semibold border border-purple-200"
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Proximity to Sights & Terminals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {listing.hotelInfo.proximityToAttractions.map((prox, idx) => (
                    <div key={idx} className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                      🚗 {prox}
                    </div>
                  ))}
                </div>
              </div>

              {listing.hotelInfo.bookingUrl && (
                <div className="pt-2">
                  <a
                    href={listing.hotelInfo.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#F43F5E] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>View Booking Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRANSPORTATION & FARES */}
          {activeTab === 'transport' && listing.transport && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-[#4C1D95]">
                <span className="font-bold">Estimated Transit Information:</span>{' '}
                {listing.transport.note}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7C3AED]" /> Estimated Travel Time
                  </div>
                  <p className="font-display font-bold text-sm text-[#1E1B2E]">
                    {listing.transport.estimatedTimeFromCenter}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-[#F43F5E]" /> Estimated Typical Fare
                  </div>
                  <p className="font-display font-bold text-sm text-[#1E1B2E]">
                    {listing.transport.estimatedFareFromCenter}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-[#EDE7DC] space-y-1">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    🛵 Auto-Rickshaw / Local Autos
                  </span>
                  <p className="text-gray-600 pl-4">{listing.transport.autoRickshaw}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EDE7DC] space-y-1">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    🚗 App Cabs (Ola / Rapido / Uber)
                  </span>
                  <p className="text-gray-600 pl-4">{listing.transport.cabs}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EDE7DC] space-y-1">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    🚌 Public MSRTC / City Bus
                  </span>
                  <p className="text-gray-600 pl-4">{listing.transport.publicBus}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VISITOR TIPS */}
          {activeTab === 'tips' && listing.visitorTips && (
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-[#1E1B2E]">
                Practical Tips for Visitors
              </h4>
              <div className="space-y-2">
                {listing.visitorTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Direct Live Map Links */}
        <div className="p-4 sm:px-6 bg-[#FAF7F2] border-t border-[#EDE7DC] flex flex-wrap items-center justify-between gap-3">
          
          {/* Working Google Maps / OpenStreetMap Links */}
          <div className="flex items-center gap-2">
            <a
              href={listing.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-100 text-[#1E1B2E] text-xs font-bold rounded-xl border border-[#EDE7DC] transition-colors cursor-pointer"
              title="Open in Google Maps for turn-by-turn directions"
            >
              <Navigation className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>

            {listing.openStreetMapUrl && (
              <a
                href={listing.openStreetMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-[#EDE7DC] transition-colors cursor-pointer"
              >
                <span>OpenStreetMap</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(listing.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 text-[#F43F5E] border-rose-200'
                  : 'bg-white text-gray-700 border-[#EDE7DC] hover:border-gray-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#F43F5E]' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#1E1B2E] hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
