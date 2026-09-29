import React from 'react';
import { Crown } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  customName?: string;
  customTagline?: string;
  branch?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  customName = 'AL BAIK CAFE',
  customTagline = 'Taste jo yaad reh jaye!',
  branch = 'KALASKY',
}) => {
  const isDark = variant === 'dark';

  const badgeSize =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-13 h-13' : 'w-11 h-11';
  const titleSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Crown Badge */}
      <div
        className={`${badgeSize} rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-950 flex flex-col items-center justify-center text-white shadow-md shadow-red-700/30 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden border-2 border-amber-400 shrink-0`}
      >
        <Crown className="w-5 h-5 text-amber-300 drop-shadow-sm" />
        <span className="text-[7px] font-black uppercase text-white tracking-widest leading-none mt-0.5">
          ALBAIK
        </span>
      </div>

      {/* Typography Brand Lockup matching flyer */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`${titleSize} font-black tracking-tight font-display uppercase leading-none ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            <span className="text-red-600">AL BAIK</span>{' '}
            <span className={isDark ? 'text-white' : 'text-zinc-900'}>CAFE</span>
          </span>
          <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
            {branch}
          </span>
        </div>

        <span className="text-[11px] font-bold text-amber-500 leading-tight mt-0.5 flex items-center gap-1 italic">
          "{customTagline}"
        </span>
      </div>
    </div>
  );
};
