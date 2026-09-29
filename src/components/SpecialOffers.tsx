import React, { useState } from 'react';
import { Tag, Sparkles, Check, ArrowRight, Flame, LayoutGrid, Rows3, PhoneCall } from 'lucide-react';
import { SpecialOffer } from '../types/restaurant';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onAddOfferToCart: (offer: SpecialOffer) => void;
  onOpenEditData?: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  offers,
  onAddOfferToCart,
  onOpenEditData,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'combos' | 'pizzas' | 'burgers'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'side-by-side'>('grid');

  // Show all 12 deals from the flyer
  const filteredOffers = offers.filter((deal) => {
    if (filterType === 'all') return true;
    if (filterType === 'pizzas') {
      return (
        deal.title.toLowerCase().includes('pizza') ||
        deal.description.toLowerCase().includes('pizza') ||
        deal.itemsIncluded.some((item) => item.toLowerCase().includes('pizza'))
      );
    }
    if (filterType === 'burgers') {
      return (
        deal.title.toLowerCase().includes('zinger') ||
        deal.description.toLowerCase().includes('zinger') ||
        deal.itemsIncluded.some((item) => item.toLowerCase().includes('zinger'))
      );
    }
    if (filterType === 'combos') {
      return deal.itemsIncluded.length >= 3;
    }
    return true;
  });

  return (
    <section id="offers" className="py-20 bg-gradient-to-b from-white via-red-50/20 to-white relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching the Al Baik Deals Flyer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>Official Flyer Deals (Deal 1 to Deal 12)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 font-display tracking-tight">
              Al Baik Cafe Special Deals
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg mt-2 max-w-2xl">
              Freshly prepared value meals straight from our official restaurant flyer. Choose your favourite deal and order hot & fresh!
            </p>
          </div>

          {/* Filter options and Picture Alignment View Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'all'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                All 12 Deals
              </button>
              <button
                type="button"
                onClick={() => setFilterType('combos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'combos'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Mega Combos
              </button>
              <button
                type="button"
                onClick={() => setFilterType('pizzas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'pizzas'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Pizza Deals
              </button>
              <button
                type="button"
                onClick={() => setFilterType('burgers')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'burgers'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Zinger Packs
              </button>
            </div>

            {/* Layout alignment switcher: Grid vs Picture-aligned Side-by-Side */}
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Grid Cards"
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                title="Side-by-Side (Picture aligned with text)"
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Rows3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Side-by-Side</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'side-by-side' ? (
          /* SIDE-BY-SIDE VIEW: Picture aligned directly with text */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {filteredOffers.map((deal) => {
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border-2 border-zinc-200/90 hover:border-red-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group items-stretch relative"
                >
                  {/* Left Side: Picture matching text height */}
                  <div className="relative sm:w-2/5 min-h-[220px] sm:min-h-full bg-zinc-900 overflow-hidden shrink-0">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Dark Deal Capsule matching flyer */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-zinc-950/90 text-white font-serif italic font-black text-sm px-3 py-1 rounded-xl shadow-md border border-white/20">
                        {deal.title}
                      </span>
                    </div>

                    {/* Diagonal Blue Price Banner matching flyer */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-600 text-white font-black text-xs uppercase px-2.5 py-1 rounded-lg shadow-md tracking-wider">
                        {deal.dealOnlyPrice || `ONLY ON ${deal.price}`}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        {deal.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Text & Actions harmoniously aligned */}
                  <div className="p-5 sm:w-3/5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black font-display text-zinc-900 group-hover:text-red-600 transition-colors">
                            {deal.title}
                          </h3>
                          {deal.timingNote && (
                            <span className="bg-amber-400 text-zinc-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-xs">
                              {deal.timingNote}
                            </span>
                          )}
                        </div>
                        <span className="bg-red-50 text-red-700 font-extrabold text-xs px-2.5 py-0.5 rounded-md whitespace-nowrap">
                          {deal.priceDisplay}
                        </span>
                      </div>

                      <p className="text-zinc-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        {deal.description}
                      </p>

                      {/* Items checklist matching flyer */}
                      <div className="bg-zinc-50 rounded-2xl p-3 mb-3 border border-zinc-100">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-1.5 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-red-600" />
                          <span>Items Included:</span>
                        </p>
                        <ul className="space-y-1.5">
                          {deal.itemsIncluded.map((itemStr, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span
                                className={
                                  itemStr.includes('SATURDAY') || itemStr.includes('Dine Inn')
                                    ? 'text-red-700 font-black'
                                    : ''
                                }
                              >
                                {itemStr}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price and Order Button */}
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 mt-auto">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-red-600 font-display">
                            {deal.priceDisplay}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">
                          {deal.dealOnlyPrice || `ONLY ON ${deal.price}`}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddOfferToCart(deal)}
                        className="bg-red-600 hover:bg-red-700 text-white font-black py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg shadow-red-600/25 transition-all flex items-center gap-1.5 text-xs shrink-0 active:scale-95 uppercase tracking-wider"
                      >
                        <span>Order Deal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* GRID VIEW: 3-column flyer card layout matching the flyer aesthetic */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredOffers.map((deal) => {
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border-2 border-zinc-200/90 hover:border-red-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative h-full"
                >
                  {/* Top Badge & Picture */}
                  <div className="relative aspect-[16/11] w-full bg-zinc-950 overflow-hidden shrink-0">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />

                    {/* Dark Deal Capsule matching flyer */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-zinc-950/90 text-white font-serif italic font-black text-sm px-3 py-1 rounded-xl shadow-md border border-white/20">
                        {deal.title}
                      </span>
                    </div>

                    {/* Diagonal Blue Price Banner matching flyer */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-600 text-white font-black text-xs uppercase px-2.5 py-1 rounded-lg shadow-md tracking-wider">
                        {deal.dealOnlyPrice || `ONLY ON ${deal.price}`}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block truncate">
                        {deal.tagline}
                      </span>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black font-display text-white">
                          {deal.title}
                        </h3>
                        {deal.timingNote && (
                          <span className="bg-amber-400 text-zinc-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-xs">
                            {deal.timingNote}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* What's included with clean checklist matching flyer */}
                      <div className="bg-zinc-50 rounded-2xl p-3.5 mb-4 border border-zinc-100 min-h-[9rem] flex flex-col justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-red-600" />
                          <span>Items Included:</span>
                        </p>
                        <ul className="space-y-1.5">
                          {deal.itemsIncluded.map((itemStr, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span
                                className={
                                  itemStr.includes('SATURDAY') || itemStr.includes('Dine Inn')
                                    ? 'text-red-700 font-black'
                                    : 'truncate'
                                }
                              >
                                {itemStr}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pricing and Action pinned to bottom baseline */}
                    <div className="pt-3 border-t border-zinc-100 mt-auto">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-red-600 font-display">
                              {deal.priceDisplay}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">
                            {deal.dealOnlyPrice || `ONLY ON ${deal.price}`}
                          </span>
                        </div>

                        <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded uppercase">
                          Special Deal
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddOfferToCart(deal)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-2.5 px-3 rounded-xl shadow-md hover:shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                      >
                        <span>Order {deal.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Flyer Bottom Banner Hotline matching the uploaded flyer footer */}
        <div className="mt-12 bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-red-600 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-black uppercase text-amber-400 tracking-widest">
              Al Baik Cafe Kalasky · Special Deals Hotline
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white">
              بلمقابل ٹوٹل پمپ نزد سبزی منڈی کیلاسکَے
            </h3>
            <p className="text-xs text-zinc-400">
              Proprietor: <strong className="text-white">Zaman Aslam</strong> · JazzCash & Easypaisa accepted for fast home delivery
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:03086410064"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>0308-6410064 (WhatsApp)</span>
            </a>
            <a
              href="tel:03007112031"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl border border-zinc-700 transition-all flex items-center gap-2 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-red-500" />
              <span>0300-7112031</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
