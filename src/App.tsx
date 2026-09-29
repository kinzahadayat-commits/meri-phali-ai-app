/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  SpecialOffer,
  OrderSubmission,
  RestaurantInfo,
} from './types/restaurant';
import {
  INITIAL_RESTAURANT_INFO,
  INITIAL_MENU_ITEMS,
  INITIAL_SPECIAL_OFFERS,
} from './data/restaurantData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EditDataModal } from './components/EditDataModal';
import { ShoppingBag } from 'lucide-react';

const STORAGE_KEYS = {
  INFO: 'albaik_cafe_info_v3',
  MENU: 'albaik_cafe_menu_v3',
  OFFERS: 'albaik_cafe_offers_v3',
};

export default function App() {
  // Persistent restaurant info
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      return saved ? JSON.parse(saved) : INITIAL_RESTAURANT_INFO;
    } catch {
      return INITIAL_RESTAURANT_INFO;
    }
  });

  // Persistent menu items (including all pizza flavours)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Persistent special deals
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : INITIAL_SPECIAL_OFFERS;
    } catch {
      return INITIAL_SPECIAL_OFFERS;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEditDataOpen, setIsEditDataOpen] = useState(false);

  // Save to localStorage when updated
  const handleSaveRestaurantInfo = (updated: RestaurantInfo) => {
    setRestaurantInfo(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveMenuItems = (updated: MenuItem[]) => {
    setMenuItems(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSpecialOffers = (updated: SpecialOffer[]) => {
    setSpecialOffers(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetAllData = () => {
    setRestaurantInfo(INITIAL_RESTAURANT_INFO);
    setMenuItems(INITIAL_MENU_ITEMS);
    setSpecialOffers(INITIAL_SPECIAL_OFFERS);
    try {
      localStorage.removeItem(STORAGE_KEYS.INFO);
      localStorage.removeItem(STORAGE_KEYS.MENU);
      localStorage.removeItem(STORAGE_KEYS.OFFERS);
    } catch (e) {
      console.error(e);
    }
  };

  // Inline menu price updates
  const handleUpdateItemPrice = (itemId: string, newPrice: number) => {
    const updated = menuItems.map((it) =>
      it.id === itemId
        ? {
            ...it,
            price: newPrice,
            priceDisplay: `Rs. ${newPrice.toLocaleString()}`,
          }
        : it
    );
    handleSaveMenuItems(updated);
  };

  // Add standard menu item or customized pizza to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedSize?: string
  ) => {
    const uniqueId = selectedSize ? `${item.id}-${selectedSize}` : item.id;
    const resolvedName = selectedSize ? `${item.name} (${selectedSize})` : item.name;

    const itemToCart: MenuItem = {
      ...item,
      id: uniqueId,
      name: resolvedName,
    };

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === uniqueId);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === uniqueId
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prev, { item: itemToCart, quantity }];
    });
  };

  // Add bundled promotional offer to cart
  const handleAddOfferToCart = (offer: SpecialOffer) => {
    const bundleItem: MenuItem = {
      id: offer.id,
      name: offer.title,
      categoryId: 'pizza',
      categoryName: 'Special Deal',
      description: offer.itemsIncluded.join(' + '),
      price: offer.price,
      priceDisplay: offer.priceDisplay,
      image: offer.image,
      popular: true,
    };
    handleAddToCart(bundleItem, 1);
    setIsCartOpen(true);
  };

  // Quantity updates
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  // Remove from cart
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order success
  const handleOrderSuccess = (order: OrderSubmission) => {
    setCartItems([]);
  };

  // Quick scroll to menu
  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Order now trigger
  const handleOrderNow = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    } else {
      handleExploreMenu();
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Navigation with new Logo & Edit Data Trigger */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={handleOrderNow}
        onOpenEditData={() => setIsEditDataOpen(true)}
        restaurantInfo={restaurantInfo}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOrderNow={handleOrderNow}
          onExploreMenu={handleExploreMenu}
          restaurantInfo={restaurantInfo}
        />

        {/* 2. About Us Section */}
        <About />

        {/* 3. Categorized Food Menu with All Pizza Flavours */}
        <MenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
          onOpenOrderModal={() => setIsCheckoutOpen(true)}
          onUpdateItemPrice={handleUpdateItemPrice}
          onOpenEditData={() => setIsEditDataOpen(true)}
        />

        {/* 4. Special Offers Section */}
        <SpecialOffers
          offers={specialOffers}
          onAddOfferToCart={handleAddOfferToCart}
          onOpenEditData={() => setIsEditDataOpen(true)}
        />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Food & Cafe Gallery */}
        <Gallery />

        {/* 7. Customer Reviews */}
        <Reviews />

        {/* 8. Call To Action Banner */}
        <CtaBanner onOrderNow={handleOrderNow} />

        {/* 9. Contact Information & Location Form */}
        <ContactSection
          restaurantInfo={restaurantInfo}
          onUpdateRestaurantInfo={handleSaveRestaurantInfo}
          onOpenEditDataModal={() => setIsEditDataOpen(true)}
        />
      </main>

      {/* 10. Dark Charcoal Footer with Logo */}
      <Footer
        restaurantInfo={restaurantInfo}
        onOpenEditData={() => setIsEditDataOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* WhatsApp Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        restaurantInfo={restaurantInfo}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Interactive Cafe Data & Menu Manager Modal */}
      <EditDataModal
        isOpen={isEditDataOpen}
        onClose={() => setIsEditDataOpen(false)}
        restaurantInfo={restaurantInfo}
        onSaveRestaurantInfo={handleSaveRestaurantInfo}
        menuItems={menuItems}
        onSaveMenuItems={handleSaveMenuItems}
        specialOffers={specialOffers}
        onSaveSpecialOffers={handleSaveSpecialOffers}
        onResetAllData={handleResetAllData}
      />

      {/* Floating Quick Cart Pill on Mobile */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && !isEditDataOpen && (
        <div className="fixed bottom-4 right-4 z-40 sm:hidden">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 active:scale-95 border-2 border-white"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <span className="text-xs uppercase tracking-wider font-extrabold">View Order</span>
          </button>
        </div>
      )}
    </div>
  );
}
