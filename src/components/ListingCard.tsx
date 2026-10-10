import React from 'react';
import { Heart, Star, MapPin, ArrowUpRight, ShieldCheck, Sparkles, Clock, Calendar } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenDetails: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  return (
    <div
      onClick={() => onOpenDetails(listing)}
      className="group bg-white rounded-3xl border border-[#EDE7DC] overflow-hidden hover:border-[#7C3AED]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Photograph Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={listing.image}
          alt={listing.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {listing.isVerifiedAttraction ? (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-600/95 backdrop-blur-md text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Heritage</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/90 backdrop-blur-md text-[10px] font-bold text-white shadow-sm">
                DEMO DATA
              </span>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={(e) => onToggleFavorite(listing.id, e)}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#F43F5E] hover:bg-white transition-all shadow-md active:scale-90 cursor-pointer"
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Overlay: Area & Price */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-semibold z-10 pointer-events-none">
          <div className="flex items-center gap-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{listing.area}</span>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-[11px] font-mono tabular-nums">
            {listing.price}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 font-medium">
            <span className="text-[#7C3AED] font-semibold">{listing.category}</span>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1 text-gray-700">
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              <span className="font-bold tabular-nums">{listing.rating.toFixed(1)}</span>
              <span className="text-gray-400">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#7C3AED] transition-colors line-clamp-1 leading-snug">
            {listing.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-[#4B465C] line-clamp-2 mt-1 leading-relaxed">
            {listing.tagline}
          </p>

          {/* Event date or timings callout */}
          {listing.eventDate ? (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#F43F5E] font-medium bg-rose-50 px-2.5 py-1 rounded-xl">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{listing.eventDate}</span>
            </div>
          ) : listing.timings ? (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-600 font-medium bg-gray-50 px-2.5 py-1 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
              <span className="truncate">{listing.timings}</span>
            </div>
          ) : null}
        </div>

        {/* Card Footer: Tags & View Details */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
          <div className="text-[11px] text-gray-400 truncate max-w-[170px]">
            {listing.tags.slice(0, 2).join(' · ')}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] group-hover:text-[#F43F5E] transition-colors cursor-pointer"
          >
            <span>View details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
