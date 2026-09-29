import React from 'react';
import { Drumstick, Zap, Award, Heart } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/restaurantData';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Drumstick: Drumstick,
    Zap: Zap,
    Award: Award,
    Heart: Heart,
  };

  return (
    <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            The Al Baik Promise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Why Choose Al Baik Cafe?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            We don't compromise on taste or quality. Here is what keeps our loyal customers coming back time and again.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.iconName] || Award;
            return (
              <div
                key={item.title}
                className="bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600/20 group-hover:bg-red-600 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:text-white transition-all duration-300 mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
