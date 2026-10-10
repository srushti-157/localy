import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { SimpleFilterModal } from './components/SimpleFilterModal';
import { InteractiveMap } from './components/InteractiveMap';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Footer } from './components/Footer';
import {
  INITIAL_LISTINGS,
  AURANGABAD_CITY_LABEL,
} from './data/listingsData';
import { Listing, CategoryType, PriceLevel } from './types';
import {
  Search,
  X,
  Filter,
  RotateCcw,
  Sparkles,
  MapPin,
  Map,
  Grid,
} from 'lucide-react';

export default function App() {
  // Opening animation session state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('localy_intro_played');
    } catch {
      return true;
    }
  });

  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('localy_favorites_india');
      return saved ? JSON.parse(saved) : ['att-1', 'att-2', 'food-1'];
    } catch {
      return ['att-1', 'att-2', 'food-1'];
    }
  });

  // Listings data
  const [listings] = useState<Listing[]>(INITIAL_LISTINGS);

  // Selected city defaulting to Chhatrapati Sambhajinagar (Aurangabad)
  const [selectedCity, setSelectedCity] = useState<string>(AURANGABAD_CITY_LABEL);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Selected category (null = All)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  // Price & Rating & Veg filter states
  const [selectedPrice, setSelectedPrice] = useState<PriceLevel | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyPureVeg, setOnlyPureVeg] = useState(false);

  // Favorites-only toggle
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // View Mode: 'grid' vs 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Modals & toast
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('localy_favorites_india', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('localy_intro_played', 'true');
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to favorites');
        return [...prev, id];
      }
    });
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedPrice(null);
    setMinRating(0);
    setOnlyPureVeg(false);
    setOnlyFavorites(false);
  };

  // Filter listings based on city, search query, category, price, rating, pure veg, favorites
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // 1. City check
      if (item.city !== selectedCity) return false;

      // 2. Favorites check
      if (onlyFavorites && !favorites.includes(item.id)) return false;

      // 3. Category check
      if (selectedCategory && item.category !== selectedCategory) return false;

      // 4. Price check
      if (selectedPrice && item.price !== selectedPrice) return false;

      // 5. Rating check
      if (minRating > 0 && item.rating < minRating) return false;

      // 6. Pure veg filter check
      if (onlyPureVeg && item.category === 'Food & Cafes' && !item.isPureVeg) {
        return false;
      }

      // 7. Search query check (case-insensitive across name, tagline, description, area, tags, menu dishes, cuisine)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesArea = item.area.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesMenu = item.menu?.some((m) => m.name.toLowerCase().includes(query)) || false;
        const matchesCuisine = item.cuisine?.toLowerCase().includes(query) || false;

        if (
          !matchesName &&
          !matchesTagline &&
          !matchesDesc &&
          !matchesCat &&
          !matchesArea &&
          !matchesTags &&
          !matchesMenu &&
          !matchesCuisine
        ) {
          return false;
        }
      }

      return true;
    });
  }, [listings, selectedCity, searchQuery, selectedCategory, selectedPrice, minRating, onlyPureVeg, onlyFavorites, favorites]);

  // Category counts for current city
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    listings
      .filter((l) => l.city === selectedCity)
      .forEach((l) => {
        counts[l.category] = (counts[l.category] || 0) + 1;
      });
    return counts;
  }, [listings, selectedCity]);

  // Active simple filters count (excluding search query)
  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedPrice ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyPureVeg ? 1 : 0) +
    (onlyFavorites ? 1 : 0);

  const suggestedSearches = [
    'Bibi Ka Maqbara',
    'Ellora Caves',
    'Soneri Mahal',
    'Daulatabad Fort',
    'Hotels',
    'Naan Qalia',
    'Thali',
    'Pani Puri',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B2E] relative overflow-x-hidden">
      
      {/* 1. Opening Animation (Only runs once on initial session visit) */}
      {showIntro && <OpeningAnimation onComplete={handleIntroComplete} />}

      {/* Floating subtle ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#7C3AED]/10 to-[#F43F5E]/10 blur-3xl animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-[#FBBF24]/15 via-[#F43F5E]/10 to-transparent blur-3xl animate-float-reverse"
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1B2E] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-white/10 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-[#FBBF24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={(newCity) => {
          setSelectedCity(newCity);
          handleClearAll();
        }}
        favoritesCount={favorites.length}
        onToggleFavoritesOnly={() => setOnlyFavorites((prev) => !prev)}
        showingFavoritesOnly={onlyFavorites}
      />

      {/* Main Simplified Homepage Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 relative z-10">
        
        {/* Welcome Header */}
        <div className="pt-1 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-[#7C3AED] text-xs font-bold border border-purple-100/80 shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Discovering {selectedCity}</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B2E] tracking-tight">
            Your city has{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#F43F5E] bg-clip-text text-transparent">
              more to offer.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#4B465C] max-w-2xl font-normal leading-relaxed">
            Discover UNESCO world heritage caves, authentic Mughlai cuisine, local Maharashtrian thalis, luxury stays, cultural events, and reliable local transit.
          </p>
        </div>

        {/* 1. SIMPLE SEARCH BAR + ONE FILTER BUTTON */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          
          {/* Main Search Input */}
          <div className="relative flex-1 flex items-center bg-white rounded-2xl border border-[#EDE7DC] shadow-xs focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/10 transition-all">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, food, events, hotels..."
              className="w-full pl-11 pr-10 py-3.5 text-sm sm:text-base text-[#1E1B2E] placeholder:text-gray-400 rounded-2xl bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ONE Simple Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer border shrink-0 ${
              activeFiltersCount > 0
                ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm shadow-[#7C3AED]/25'
                : 'bg-white text-gray-700 hover:text-[#7C3AED] border-[#EDE7DC] hover:border-[#7C3AED]/30 shadow-xs'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-white text-[#7C3AED] rounded-full text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Suggested Searches */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-gray-500 no-scrollbar">
          <span className="shrink-0 font-medium text-gray-400">Popular:</span>
          {suggestedSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSearchQuery(item)}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#7C3AED]/10 text-gray-600 hover:text-[#7C3AED] border border-[#EDE7DC] transition-colors whitespace-nowrap cursor-pointer shrink-0 font-medium"
            >
              {item}
            </button>
          ))}
        </div>

        {/* 2. CATEGORY BUTTONS WITH EMOJIS */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          categoryCounts={categoryCounts}
        />

        {/* Active Filters / Favorites Status Bar */}
        {(onlyFavorites || selectedCategory || selectedPrice || minRating > 0 || onlyPureVeg || searchQuery) && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white rounded-2xl border border-[#EDE7DC] text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-gray-400 font-medium">Active:</span>

              {onlyFavorites && (
                <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#F43F5E] font-bold border border-rose-200 flex items-center gap-1">
                  <span>Favorites Only</span>
                  <button onClick={() => setOnlyFavorites(false)} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {onlyPureVeg && (
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                  <span>🟢 Pure Veg Only</span>
                  <button onClick={() => setOnlyPureVeg(false)} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-[#7C3AED] font-bold border border-purple-200 flex items-center gap-1">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory && (
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-[#7C3AED] font-bold border border-purple-200 flex items-center gap-1">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPrice && (
                <span className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-700 font-bold border border-gray-200 flex items-center gap-1">
                  <span>Price: {selectedPrice}</span>
                  <button onClick={() => setSelectedPrice(null)} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-700 font-bold border border-gray-200 flex items-center gap-1">
                  <span>{minRating}+ ★</span>
                  <button onClick={() => setMinRating(0)} className="hover:text-black cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-[#F43F5E] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* View Switcher: Grid View vs Interactive Map */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs sm:text-sm font-bold text-gray-600">
            Showing <span className="text-[#7C3AED] font-black tabular-nums">{filteredListings.length}</span> places
            {selectedCategory ? ` in ${selectedCategory}` : ''}
          </div>

          {/* Toggle between Grid View & Interactive Map */}
          <div className="flex items-center p-1 bg-white rounded-2xl border border-[#EDE7DC] shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#1E1B2E] text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* 3. DISPLAY CONTENT: INTERACTIVE MAP OR LISTING CARDS */}
        {viewMode === 'map' ? (
          <InteractiveMap
            listings={filteredListings}
            selectedCity={selectedCity}
            onOpenDetails={(item) => setActiveListing(item)}
          />
        ) : (
          <div>
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((item) => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={(selected) => setActiveListing(selected)}
                  />
                ))}
              </div>
            ) : (
              /* Friendly Empty State with Clear Search Button */
              <div className="bg-white rounded-3xl border border-[#EDE7DC] p-10 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#1E1B2E] mb-2">
                  No matching places found
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  We couldn't find any places matching "{searchQuery || 'your filters'}" in {selectedCity}. Try checking your spelling or clearing filters to explore all local attractions.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-bold rounded-2xl transition-all cursor-pointer shadow-md shadow-[#7C3AED]/20 inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Search & Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ONE Simple Filter Modal */}
      <SimpleFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        onSelectPrice={setSelectedPrice}
        minRating={minRating}
        onSelectMinRating={setMinRating}
        onlyPureVeg={onlyPureVeg}
        onTogglePureVeg={() => setOnlyPureVeg((prev) => !prev)}
        onReset={() => {
          setSelectedCategory(null);
          setSelectedPrice(null);
          setMinRating(0);
          setOnlyPureVeg(false);
        }}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Listing Detail Modal */}
      <ListingDetailModal
        listing={activeListing}
        isOpen={Boolean(activeListing)}
        onClose={() => setActiveListing(null)}
        isFavorite={Boolean(activeListing && favorites.includes(activeListing.id))}
        onToggleFavorite={(id) => toggleFavorite(id)}
      />

      {/* Footer */}
      <Footer
        onSelectCity={(newCity) => {
          setSelectedCity(newCity);
          handleClearAll();
        }}
        selectedCity={selectedCity}
      />

    </div>
  );
}
