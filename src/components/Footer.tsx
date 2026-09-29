import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  Settings2,
} from 'lucide-react';
import { RestaurantInfo } from '../types/restaurant';
import { Logo } from './Logo';

interface FooterProps {
  restaurantInfo: RestaurantInfo;
  onOpenEditData?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ restaurantInfo, onOpenEditData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu & Pizzas', href: '#menu' },
    { name: 'Offers', href: '#offers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Logo
              variant="dark"
              customName={restaurantInfo.name}
              customTagline={restaurantInfo.tagline}
            />

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Your destination for golden crispy fried chicken, hand-tossed artisan pizzas in all flavours, specialty zinger burgers, loaded fries, and icy refreshments prepared fresh daily.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href={restaurantInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all text-xs font-bold"
                  aria-label="Facebook"
                >
                  FB
                </a>
                {/* Instagram */}
                <a
                  href={restaurantInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all text-xs font-bold"
                  aria-label="Instagram"
                >
                  IG
                </a>
                {/* TikTok */}
                <a
                  href={restaurantInfo.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-700 transition-all text-xs font-bold"
                  aria-label="TikTok"
                >
                  TT
                </a>
                {/* YouTube */}
                <a
                  href={restaurantInfo.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all text-xs font-bold"
                  aria-label="YouTube"
                >
                  YT
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-xs text-red-500">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Contact & Hours
              </h4>
              {onOpenEditData && (
                <button
                  type="button"
                  onClick={onOpenEditData}
                  className="text-xs font-semibold text-zinc-400 hover:text-amber-400 flex items-center gap-1"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Edit Data</span>
                </button>
              )}
            </div>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{restaurantInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-white">
                  {restaurantInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-white">
                  {restaurantInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{restaurantInfo.openingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-500 bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg">
                Independent fast food restaurant serving quality meals. All menu prices, contact details, and locations can be updated via the Edit Data panel.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Al Baik Cafe. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Fresh Taste Guaranteed</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
