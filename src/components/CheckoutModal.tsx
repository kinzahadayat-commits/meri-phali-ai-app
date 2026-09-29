import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  AlertCircle,
  Truck,
  FileText,
} from 'lucide-react';
import { CartItem, OrderSubmission } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: OrderSubmission) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'pickup'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSubmission | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, current) => sum + current.item.price * current.quantity, 0);
  const deliveryFee = paymentMethod === 'pickup' ? 0 : subtotal > 1500 ? 0 : RESTAURANT_INFO.deliveryFee;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (paymentMethod === 'cod' && !address.trim())) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order: OrderSubmission = {
        orderId: `AB-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: customerName.trim(),
        phone: phone.trim(),
        deliveryAddress: paymentMethod === 'pickup' ? 'Self-Pickup at Al Baik Cafe' : address.trim(),
        deliveryNotes: notes.trim(),
        paymentMethod,
        items: [...items],
        subtotal,
        deliveryFee,
        total,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 700);
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    setCustomerName('');
    setPhone('');
    setAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-zinc-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm">
              AB
            </div>
            <div>
              <h3 className="text-base font-bold font-display leading-tight">
                {confirmedOrder ? 'Order Confirmed!' : 'Complete Your Order'}
              </h3>
              <p className="text-xs text-zinc-400">
                {confirmedOrder ? `Order ID: ${confirmedOrder.orderId}` : 'Al Baik Cafe Fast Checkout'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Prototype Demo Checkout:</strong> No real payments are processed. This connects to local cash-on-delivery or in-store order queues.
          </span>
        </div>

        {confirmedOrder ? (
          /* Confirmation & Tracking View */
          <div className="p-6 space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black font-display text-zinc-900">
                Thank You, {confirmedOrder.customerName}!
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Your meal order has been received by our kitchen and is being freshly cooked.
              </p>
              <div className="inline-block mt-3 bg-red-50 border border-red-200 text-red-700 font-mono text-sm px-4 py-1.5 rounded-full font-bold">
                Order Tracking #{confirmedOrder.orderId}
              </div>
            </div>

            {/* Simulated Live Timeline */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Live Order Status
              </p>
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex flex-col items-center text-emerald-700">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1">
                    ✓
                  </div>
                  <span>Received</span>
                </div>
                <div className="flex-1 h-1 bg-emerald-500 mx-2" />
                <div className="flex flex-col items-center text-red-600 font-bold">
                  <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center mb-1 animate-pulse">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Frying Hot</span>
                </div>
                <div className="flex-1 h-1 bg-zinc-200 mx-2" />
                <div className="flex flex-col items-center text-zinc-400">
                  <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center mb-1">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span>On The Way</span>
                </div>
              </div>
              <p className="text-center text-xs text-zinc-500 mt-3">
                Estimated Delivery: <strong className="text-zinc-800">{RESTAURANT_INFO.deliveryTimeEstimate}</strong>
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="border border-zinc-200 rounded-2xl p-4 bg-white text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 font-bold text-zinc-800">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Itemized Receipt</span>
                </span>
                <span>Qty × Price</span>
              </div>

              {confirmedOrder.items.map((it) => (
                <div key={it.item.id} className="flex justify-between text-zinc-600">
                  <span>{it.item.name}</span>
                  <span className="font-semibold text-zinc-900">
                    {it.quantity} × Rs. {it.item.price}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-zinc-100 space-y-1">
                <div className="flex justify-between text-zinc-500">
                  <span>Delivery Address</span>
                  <span className="font-medium text-zinc-800 truncate max-w-[200px]">
                    {confirmedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Payment Method</span>
                  <span className="font-semibold uppercase text-zinc-800">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Store Pickup'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-zinc-900 pt-1 font-display">
                  <span>Total Amount</span>
                  <span className="text-red-700">Rs. {confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.orderHotline.split(' ')[0]}`}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Kitchen to Confirm</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-center text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Fulfillment Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">
                Order Fulfillment
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-red-600 bg-red-50/60 text-red-700'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Doorstep Delivery (COD)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pickup')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'pickup'
                      ? 'border-red-600 bg-red-50/60 text-red-700'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Self Takeaway Pickup</span>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Customer Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Asad Ali"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {paymentMethod === 'cod' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Delivery Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Flat #, Street, Sector, Landmark"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Cooking / Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra spicy, extra garlic sauce, ring the bell"
                  className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Order Summary */}
            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-600">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-semibold text-zinc-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-zinc-900">
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200 font-display">
                <span>Total Due</span>
                <span className="text-red-700">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing order...</span>
              ) : (
                <span>Place Order · Rs. {total.toLocaleString()} (Cash on Delivery)</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
