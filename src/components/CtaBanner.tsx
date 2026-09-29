import React from 'react';
import { ArrowRight, PhoneCall, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CtaBannerProps {
  onOrderNow: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 mb-4 border border-white/10">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Freshly Cooked to Order</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4 max-w-3xl mx-auto">
          Hungry? Your Favorite Meal Is Just One Click Away!
        </h2>

        <p className="text-red-100 text-base sm:text-xl font-normal max-w-2xl mx-auto mb-8">
          Explore our menu and order your favorite meal today. Savor the authentic crunch and mouthwatering flavor delivered straight to your door.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOrderNow}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <span>Order Now</span>
            <ArrowRight className="w-5 h-5 text-zinc-950" />
          </button>

          <a
            href={`tel:${RESTAURANT_INFO.orderHotline.split(' ')[0]}`}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>Call to Order: {RESTAURANT_INFO.orderHotline.split(' ')[0]}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
