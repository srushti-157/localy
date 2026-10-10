import React from 'react';
import { X, Filter, RotateCcw, Check, Star } from 'lucide-react';
import { CategoryType, PriceLevel } from '../types';
import { CATEGORIES_LIST } from '../data/listingsData';

interface SimpleFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CategoryType | null;
  onSelectCategory: (cat: CategoryType | null) => void;
  selectedPrice: PriceLevel | null;
  onSelectPrice: (price: PriceLevel | null) => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  onlyPureVeg: boolean;
  onTogglePureVeg: () => void;
  onReset: () => void;
  activeFiltersCount: number;
}

const PRICE_OPTIONS: PriceLevel[] = ['Free', '₹', '₹₹', '₹₹₹'];

export const SimpleFilterModal: React.FC<SimpleFilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedPrice,
  onSelectPrice,
  minRating,
  onSelectMinRating,
  onlyPureVeg,
  onTogglePureVeg,
  onReset,
  activeFiltersCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#EDE7DC] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#EDE7DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-base text-[#1E1B2E]">
              Filter Listings
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls Body */}
        <div className="p-5 space-y-5">
          
          {/* Pure Veg Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs text-emerald-950 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Pure Vegetarian Options Only</span>
            </div>
            <button
              type="button"
              onClick={onTogglePureVeg}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                onlyPureVeg ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  onlyPureVeg ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 1. Category */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-[#7C3AED] text-white font-bold'
                    : 'bg-[#FAF7F2] text-gray-700 hover:bg-gray-100 border border-[#EDE7DC]'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES_LIST.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onSelectCategory(selectedCategory === c.name ? null : c.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === c.name
                      ? 'bg-[#7C3AED] text-white font-bold'
                      : 'bg-[#FAF7F2] text-gray-700 hover:bg-gray-100 border border-[#EDE7DC]'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price / Cost */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Price Range / Budget
            </label>
            <div className="grid grid-cols-5 gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#EDE7DC]">
              <button
                type="button"
                onClick={() => onSelectPrice(null)}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedPrice === null
                    ? 'bg-white text-[#1E1B2E] shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Any
              </button>
              {PRICE_OPTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onSelectPrice(selectedPrice === p ? null : p)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedPrice === p
                      ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Minimum Rating */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Any Rating', val: 0 },
                { label: '4.5+ ★', val: 4.5 },
                { label: '4.8+ ★', val: 4.8 },
              ].map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => onSelectMinRating(r.val)}
                  className={`py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    minRating === r.val
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED] font-bold'
                      : 'bg-[#FAF7F2] text-gray-700 border-[#EDE7DC] hover:border-gray-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EDE7DC] flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#F43F5E] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};
