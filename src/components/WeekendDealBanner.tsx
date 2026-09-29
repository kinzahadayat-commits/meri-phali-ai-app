import React from 'react';
import { Sparkles, Calendar, ArrowRight, PhoneCall, ShieldCheck, Flame, Tag } from 'lucide-react';
import { ASSET_IMAGES } from '../data/restaurantData';
import { SpecialOffer } from '../types/restaurant';

interface WeekendDealBannerProps {
  weekendOffer: SpecialOffer;
  onAddOfferToCart: (offer: SpecialOffer) => void;
  phone: string;
}

export const WeekendDealBanner: React.FC<WeekendDealBannerProps> = ({
  weekendOffer,
  onAddOfferToCart,
  phone,
}) => {
  return (
    <section className="py-12 bg-gradient-to-r from-red-950 via-red-900 to-zinc-950 text-white relative overflow-hidden border-y-4 border-amber-400">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Weekend Deal Info matching flyer */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="bg-amber-400 text-zinc-950 font-black text-xs uppercase px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Time Offer!
              </span>
              <span className="bg-red-600 text-white font-extrabold text-xs uppercase px-3 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Saturday & Sunday Only
              </span>
            </div>

            {/* Flyer Title */}
            <div>
              <p className="text-amber-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
                Al Baik Cafe Kalasky · "Taste jo yaad reh jaye!"
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase mt-1 leading-[1.05]">
                WEEKEND <span className="text-amber-400">DEAL</span>
              </h2>
            </div>

            {/* Large Price Highlight from Flyer */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 max-w-lg mx-auto lg:mx-0 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="flex items-center gap-2 text-zinc-300 text-sm">
                  <span>Regular Price:</span>
                  <span className="line-through text-zinc-400 font-bold">Rs. 1,250</span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">Now Only</span>
                  <span className="text-4xl sm:text-5xl font-black font-display text-white">
                    Rs. 1,100
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-bold mt-1">
                  ★ Save Rs. 150 on Any Large Pizza of Your Choice!
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onAddOfferToCart(weekendOffer)}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-sm uppercase px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  <Tag className="w-4 h-4 text-zinc-950" />
                  <span>Order Weekend Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Flyer Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-zinc-300">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hot & Cheesy</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fresh Dough</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Best Taste</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* Quick Hotline Call */}
            <div className="text-xs text-zinc-400">
              Call to order directly: <a href={`tel:${phone}`} className="text-amber-400 font-bold underline hover:text-white">{phone}</a> (Opposite Total Parco Pump, Near Sabzi Mandi, Kalasky)
            </div>
          </div>

          {/* Right Column: High Quality Crown Pizza Visual matching the flyer */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/80 group">
              <img
                src={ASSET_IMAGES.heroPizza}
                alt="Al Baik Weekend Deal: 1 Large Pizza for Rs. 1100"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs uppercase px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                1 Large Pizza
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  Saturday & Sunday Exclusive
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
                  Freshly Baked Crown Crust Pizza
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                  Loaded with chicken tikka, fajita chunks, olives, and melted mozzarella.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
