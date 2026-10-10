import React from 'react';
import { Heart, MapPin, ShieldCheck } from 'lucide-react';
import { CITIES } from '../data/listingsData';

interface FooterProps {
  onSelectCity: (cityLabel: string) => void;
  selectedCity: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCity,
  selectedCity,
}) => {
  return (
    <footer className="bg-[#1E1B2E] text-white pt-12 pb-10 border-t border-purple-950/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#F43F5E] flex items-center justify-center text-white font-black text-lg font-display">
                L
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                LOCALY<span className="text-[#F43F5E]">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              "Your city has more to offer." Discover UNESCO heritage monuments, authentic local food, cultural events, and community opportunities in Chhatrapati Sambhajinagar (Aurangabad).
            </p>
          </div>

          {/* Quick Cities */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Cities (Maharashtra)
            </h4>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCity(c.label);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    selectedCity === c.label
                      ? 'bg-[#7C3AED] text-white border-transparent'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Heritage & Data Policy
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real historical information is verified for major attractions including Bibi Ka Maqbara, Ellora Caves, Ajanta Caves, Daulatabad Fort, Panchakki, and Soneri Mahal. Unverified cafes, events, and services are designated as demonstration records.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} LOCALY · Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Made for easy local discovery</span>
            <Heart className="w-3.5 h-3.5 fill-[#F43F5E] text-[#F43F5E]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
