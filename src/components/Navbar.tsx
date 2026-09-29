import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Settings2 } from 'lucide-react';
import { RestaurantInfo } from '../types/restaurant';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrder: () => void;
  onOpenEditData: () => void;
  restaurantInfo: RestaurantInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrder,
  onOpenEditData,
  restaurantInfo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu & Pizzas', href: '#menu' },
    { name: 'Offers', href: '#offers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-1.5 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="truncate">
              Now Serving Hot Pizzas in All Flavours, Crispy Chicken & Fresh Fast Food!
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotline: {restaurantInfo.orderHotline.split(' ')[0]}</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span>{restaurantInfo.deliveryTimeEstimate} Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-zinc-100'
            : 'bg-white py-4 border-b border-zinc-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: New Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="group"
            >
              <Logo
                customName={restaurantInfo.name}
                customTagline={restaurantInfo.tagline}
              />
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-700">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="hover:text-red-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Edit Data Button */}
              <button
                type="button"
                onClick={onOpenEditData}
                title="Edit Cafe Data & Menu Items"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-red-600 bg-zinc-100 hover:bg-red-50 border border-zinc-200/80 px-2.5 sm:px-3 py-2 rounded-xl transition-all shadow-xs"
              >
                <Settings2 className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden sm:inline">Edit Data</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                aria-label={`View cart with ${cartCount} items`}
                className="relative p-2.5 text-zinc-700 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA */}
              <button
                type="button"
                onClick={onOpenOrder}
                className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2.5 rounded-xl shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all whitespace-nowrap active:scale-95"
              >
                Order Now
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-zinc-700 hover:text-red-600 hover:bg-zinc-100 rounded-lg transition-colors ml-1"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-zinc-800 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenEditData();
                  }}
                  className="w-full bg-zinc-100 text-zinc-800 font-bold py-2.5 rounded-xl text-center text-sm flex items-center justify-center gap-2"
                >
                  <Settings2 className="w-4 h-4 text-red-600" />
                  <span>Edit Cafe Details & Menu</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOrder();
                  }}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-md text-center"
                >
                  Order Now
                </button>
                <a
                  href={`tel:${restaurantInfo.orderHotline.split(' ')[0]}`}
                  className="w-full border border-zinc-200 text-zinc-800 font-semibold py-2.5 rounded-xl text-center text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  Call: {restaurantInfo.orderHotline.split(' ')[0]}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
