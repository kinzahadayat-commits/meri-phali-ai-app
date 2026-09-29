import React from 'react';
import { ArrowRight, Flame, Clock, ShieldCheck, Sparkles, Pizza } from 'lucide-react';
import { ASSET_IMAGES } from '../data/restaurantData';
import { RestaurantInfo } from '../types/restaurant';

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  restaurantInfo: RestaurantInfo;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreMenu, restaurantInfo }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-red-50/30 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial accent glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Prose, Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            {/* Top kicker tag */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-red-50 border border-red-200/80 px-3.5 py-1.5 rounded-full mb-5">
              <Flame className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                100% Fresh · Pizzas · Crispy Chicken · Burgers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 font-display leading-[1.08] mb-5">
              Taste the Difference at{' '}
              <span className="text-red-700 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                {restaurantInfo.name}
              </span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Fresh, delicious and satisfying meals made to bring great taste to every bite. From hand-crafted artisan pizzas in all flavours to extra-crispy golden fried chicken and juicy zinger burgers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-9">
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-base px-6 py-3.5 rounded-xl border-2 border-zinc-200 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Pizza className="w-5 h-5 text-amber-500" />
                <span>Explore Pizzas & Menu</span>
              </button>
            </div>

            {/* Fast Value Trust Indicators */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900">Always Hot</p>
                  <p className="text-[11px] text-zinc-500">Baked & Fried</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900">{restaurantInfo.deliveryTimeEstimate}</p>
                  <p className="text-[11px] text-zinc-500">Fast Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900">100% Halal</p>
                  <p className="text-[11px] text-zinc-500">Pure Taste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Visual Composition Harmoniously Aligned */}
          <div className="lg:col-span-6 relative my-2 lg:my-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Grand Feast Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group">
                <img
                  src={ASSET_IMAGES.pizza}
                  alt="Al Baik Cafe Freshly Baked Artisan Pizza with Stretching Cheese and Spices"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 mb-1.5">
                      <Pizza className="w-3.5 h-3.5 text-amber-400" />
                      All Pizza Flavours Available
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                      Tikka, Fajita, Crown Crust & More
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onOrderNow}
                    className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-md"
                  >
                    Quick Order
                  </button>
                </div>
              </div>

              {/* Floating Highlight Card 1: Crispy Chicken Spotlight */}
              <div className="absolute -top-5 left-2 sm:-left-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 max-w-[210px] animate-bounce duration-1000">
                <img
                  src={ASSET_IMAGES.friedChicken}
                  alt="Fried chicken piece"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Secret Spice</span>
                  </div>
                  <p className="text-xs font-extrabold text-zinc-900">Golden & Crispy</p>
                </div>
              </div>

              {/* Floating Highlight Card 2: Zinger Burger Deal */}
              <div className="absolute -bottom-5 right-2 sm:-right-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 max-w-[220px]">
                <img
                  src={ASSET_IMAGES.zingerBurger}
                  alt="Zinger burger"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div>
                  <p className="text-[11px] font-bold text-red-600 uppercase">Customer Favorite</p>
                  <p className="text-xs font-black text-zinc-900">Zinger Stack</p>
                  <p className="text-[11px] font-semibold text-zinc-500">From Rs. 350</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
