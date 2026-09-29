import React from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, current) => sum + current.item.price * current.quantity, 0);
  const deliveryFee = subtotal > 1500 ? 0 : RESTAURANT_INFO.deliveryFee;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Cart Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-zinc-900 leading-none">
                  Your Order Cart
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-xl transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900 font-display">
                  Your cart is empty
                </h4>
                <p className="text-sm text-zinc-500 max-w-xs mt-1 mb-6">
                  Add crispy chicken, sizzling burgers, or loaded fries from our menu to get started!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div key={cartItem.item.id} className="py-4 flex gap-3 items-center">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-zinc-100 shrink-0 border border-zinc-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-zinc-900 truncate">
                      {cartItem.item.name}
                    </h5>
                    <p className="text-xs text-red-600 font-extrabold font-display">
                      Rs. {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-600 hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-zinc-900">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-600 hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-zinc-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (Deals &gt; Rs. 1,500)</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-zinc-900 pt-2 border-t border-zinc-200 font-display">
                  <span>Total</span>
                  <span className="text-red-700">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Notice */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 bg-white p-2 rounded-lg border border-zinc-200">
                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Prototype ordering system. Cash on delivery or pickup.</span>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
