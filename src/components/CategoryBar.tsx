import React from 'react';
import { CategoryType } from '../types';
import { CATEGORIES_LIST } from '../data/listingsData';

interface CategoryBarProps {
  selectedCategory: CategoryType | null;
  onSelectCategory: (cat: CategoryType | null) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="py-2">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {/* All Button */}
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
            selectedCategory === null
              ? 'bg-[#1E1B2E] text-white border-[#1E1B2E] shadow-sm scale-102'
              : 'bg-white text-gray-700 border-[#EDE7DC] hover:border-[#7C3AED]/40 hover:bg-[#FAF7F2]'
          }`}
        >
          ✨ All Places
        </button>

        {/* 7 Specific Category Buttons */}
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = categoryCounts[cat.name] || 0;

          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => onSelectCategory(isSelected ? null : cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white border-transparent shadow-md shadow-[#7C3AED]/20 scale-102'
                  : 'bg-white text-gray-700 border-[#EDE7DC] hover:border-[#7C3AED]/40 hover:bg-[#FAF7F2]'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
