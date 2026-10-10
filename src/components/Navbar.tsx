import React, { useState } from 'react';
import { Heart, MapPin, ChevronDown } from 'lucide-react';
import { CITIES } from '../data/listingsData';

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (cityLabel: string) => void;
  favoritesCount: number;
  onToggleFavoritesOnly: () => void;
  showingFavoritesOnly: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  favoritesCount,
  onToggleFavoritesOnly,
  showingFavoritesOnly,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#F43F5E] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-display font-black text-xl">L</span>
            </div>
            <div>
              <span className="font-display text-2xl font-black tracking-tight text-[#1E1B2E]">
                LOCALY<span className="text-[#F43F5E]">.</span>
              </span>
            </div>
          </a>
        </div>

        {/* Right side controls: City Selector & Small Favorites Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#4C1D95] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/15 rounded-xl border border-[#7C3AED]/20 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Select City"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
              <span className="max-w-[140px] sm:max-w-none truncate">{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE7DC] py-2 z-50">
                <div className="px-3.5 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Location (India)
                </div>
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCity(c.label);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCity === c.label
                        ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-bold'
                        : 'text-gray-700 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{c.label}</span>
                    {selectedCity === c.label && <span className="text-[#7C3AED] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Small Favorites Button */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              showingFavoritesOnly
                ? 'bg-[#F43F5E] text-white border-[#F43F5E] shadow-sm'
                : 'bg-white text-gray-700 hover:text-[#F43F5E] border-[#EDE7DC] hover:border-rose-200'
            }`}
            title="View saved favorites"
          >
            <Heart className={`w-4 h-4 ${showingFavoritesOnly || favoritesCount > 0 ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                showingFavoritesOnly ? 'bg-white text-[#F43F5E]' : 'bg-[#F43F5E] text-white'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
