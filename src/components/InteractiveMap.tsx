import React, { useState } from 'react';
import {
  MapPin,
  Star,
  ArrowUpRight,
  Plus,
  Minus,
  RotateCcw,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Listing } from '../types';

interface InteractiveMapProps {
  listings: Listing[];
  selectedCity: string;
  onOpenDetails: (listing: Listing) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  listings,
  selectedCity,
  onOpenDetails,
}) => {
  const [activeListingId, setActiveListingId] = useState<string | null>(
    listings[0]?.id || null
  );
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeListing = listings.find((l) => l.id === activeListingId) || listings[0];

  // Calculate normalized coordinate positions within current city bounds
  const lats = listings.map((l) => l.coordinates.lat);
  const lngs = listings.map((l) => l.coordinates.lng);
  const minLat = Math.min(...lats, 19.8);
  const maxLat = Math.max(...lats, 20.6);
  const minLng = Math.min(...lngs, 75.1);
  const maxLng = Math.max(...lngs, 75.8);

  const getPositionPercent = (lat: number, lng: number) => {
    const latSpan = maxLat - minLat || 0.5;
    const lngSpan = maxLng - minLng || 0.5;
    // Invert latitude so north is at the top
    const top = 12 + (1 - (lat - minLat) / latSpan) * 72;
    const left = 10 + ((lng - minLng) / lngSpan) * 78;
    return {
      top: `${Math.max(10, Math.min(88, top))}%`,
      left: `${Math.max(8, Math.min(90, left))}%`,
    };
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDE7DC] shadow-sm overflow-hidden mb-8 transition-all">
      {/* Map Control Bar */}
      <div className="p-4 sm:px-6 bg-[#FAF7F2] border-b border-[#EDE7DC] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-[#1E1B2E]">
              Interactive Map · {selectedCity}
            </h3>
            <p className="text-[11px] text-gray-500">
              {listings.length} places plotted with verified coordinates & live directions
            </p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#EDE7DC]">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="p-1.5 text-gray-600 hover:text-[#7C3AED] hover:bg-gray-50 rounded-lg cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1.5 text-gray-500 font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 text-gray-600 hover:text-[#7C3AED] hover:bg-gray-50 rounded-lg cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-gray-600 hover:text-[#7C3AED] hover:bg-gray-50 rounded-lg cursor-pointer ml-1"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="relative h-[500px] bg-[#EFE9DE] overflow-hidden select-none">
        
        {/* Vector Background Canvas */}
        <div
          className="absolute inset-0 transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Cartographic Terrain Patterns */}
          <svg className="w-full h-full opacity-45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-streets" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D5CCC0" strokeWidth="1" />
                <circle cx="30" cy="30" r="1.5" fill="#C0B5A5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-streets)" />
            
            {/* Kham River Curve */}
            <path
              d="M 120 -50 Q 280 200 480 320 T 920 540"
              fill="none"
              stroke="#BFDBFE"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* National Highway MH SH 22 / Jalgaon Highway */}
            <path
              d="M 80 480 L 360 310 L 820 60"
              fill="none"
              stroke="#E2D9CC"
              strokeWidth="12"
            />
            <path
              d="M 280 -60 L 380 560"
              fill="none"
              stroke="#E2D9CC"
              strokeWidth="8"
            />
          </svg>

          {/* Regional Landmarks Labels */}
          <div className="absolute top-8 left-16 text-[11px] font-extrabold uppercase tracking-widest text-[#8F816F] opacity-75 pointer-events-none">
            Verul / Ellora Hills & Khuldabad
          </div>
          <div className="absolute top-1/2 left-1/3 text-[11px] font-extrabold uppercase tracking-widest text-[#8F816F] opacity-75 pointer-events-none">
            Daulatabad Citadel Range
          </div>
          <div className="absolute bottom-16 right-1/4 text-[11px] font-extrabold uppercase tracking-widest text-[#8F816F] opacity-75 pointer-events-none">
            Chhatrapati Sambhajinagar City Core
          </div>

          {/* Plotted Interactive Pins */}
          {listings.map((item) => {
            const isSelected = item.id === activeListingId;
            const pos = getPositionPercent(item.coordinates.lat, item.coordinates.lng);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveListingId(item.id)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 cursor-pointer z-20 ${
                  isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                }`}
                title={`${item.name} (${item.area})`}
              >
                <div
                  className={`relative flex items-center justify-center p-2.5 rounded-full shadow-lg transition-all ${
                    isSelected
                      ? 'bg-[#7C3AED] text-white ring-4 ring-[#7C3AED]/30 shadow-[#7C3AED]/50'
                      : item.isVerifiedAttraction
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white text-[#1E1B2E] hover:bg-[#7C3AED] hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 stroke-[2.5]" />
                </div>
                
                {/* Floating Pin Label */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-[#1E1B2E] text-white opacity-100 z-50'
                      : 'bg-white/95 text-gray-700 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {item.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Listing Active Floating Card */}
        {activeListing && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-40 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-[#EDE7DC] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex gap-3">
              <img
                src={activeListing.image}
                alt={activeListing.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                  <span className="text-[#7C3AED] font-bold truncate">
                    {activeListing.category}
                  </span>
                  {activeListing.isVerifiedAttraction ? (
                    <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold text-[10px]">
                      Demo Data
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-sm sm:text-base text-[#1E1B2E] truncate">
                  {activeListing.name}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 text-[#FBBF24] shrink-0" />
                  <span className="truncate">{activeListing.area}</span>
                  <span>·</span>
                  <div className="flex items-center gap-0.5 text-gray-800 font-bold">
                    <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                    <span>{activeListing.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions: Google Maps Directions & View Details */}
            <div className="mt-3 pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
              <a
                href={activeListing.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-gray-100 text-[#1E1B2E] text-xs font-semibold rounded-xl border border-[#EDE7DC] transition-colors cursor-pointer"
                title="Open in Google Maps for turn-by-turn directions"
              >
                <Navigation className="w-3 h-3 text-[#7C3AED]" />
                <span>Directions</span>
                <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
              </a>

              <button
                type="button"
                onClick={() => onOpenDetails(activeListing)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
