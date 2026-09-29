import React from 'react';
import { Drumstick, Star, Heart, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../data/restaurantData';

export const About: React.FC = () => {
  const features = [
    {
      icon: Drumstick,
      title: 'Fresh & Delicious',
      description: 'Quality ingredients and freshly prepared food seasoned with authentic herbs, golden crusting, and signature marinades.',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'Friendly and customer-focused service making sure every dine-in, takeaway, and doorstep delivery exceeds expectations.',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: Heart,
      title: 'Made With Care',
      description: 'Every pizza, burger, and chicken meal is prepared with attention to taste, hygiene, and authentic flavors.',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Visual Media with Matched Height & Symmetrical Alignment */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-zinc-200 group h-full min-h-[380px] lg:min-h-[520px] flex flex-col justify-end">
              <img
                src={ASSET_IMAGES.cafeAmbiance}
                alt="Al Baik Cafe Dining Experience and Modern Atmosphere"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent pointer-events-none" />

              {/* Bottom aligned text over image */}
              <div className="relative z-10 p-6 sm:p-8 text-white">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md inline-block mb-2">
                  Comfortable & Clean Dining
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                  Dine-In, Takeaway & Fast Delivery
                </h3>
                <p className="text-sm text-zinc-300 mt-2 max-w-md">
                  Enjoy great artisan pizzas, sizzling fried chicken, and burgers with family and friends in a welcoming atmosphere.
                </p>

                {/* Micro trust stats aligned inside */}
                <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-6">
                  <div>
                    <span className="text-xl font-black font-display text-amber-400">100%</span>
                    <span className="block text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">Fresh Daily</span>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <span className="text-xl font-black font-display text-amber-400">30–45m</span>
                    <span className="block text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">Fast Delivery</span>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <span className="text-xl font-black font-display text-amber-400">Secret Blend</span>
                    <span className="block text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">Signature Spices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative & 3 Feature Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Section Tag */}
              <div className="text-xs font-extrabold tracking-widest text-red-700 uppercase mb-2">
                About Al Baik Cafe
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 font-display leading-tight mb-4">
                Welcome to <span className="text-red-700">Al Baik Cafe</span>, Where Taste Meets Quality
              </h2>

              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-6">
                Welcome to Al Baik Cafe, where great taste meets quality and freshness. We serve delicious fast food, freshly baked pizzas in all popular flavours, and refreshing beverages prepared with care. Our goal is to provide customers with tasty food, friendly service, and a comfortable dining experience.
              </p>

              {/* 3 Mandated Feature Cards */}
              <div className="space-y-3.5 mb-6">
                {features.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-4 rounded-2xl bg-zinc-50 hover:bg-red-50/40 border border-zinc-200/80 transition-all flex items-start gap-4"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.badgeColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Commitments List aligned at the bottom */}
            <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-zinc-700 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                No artificial fillers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Hygiene certified kitchen
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Always hot on arrival
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
