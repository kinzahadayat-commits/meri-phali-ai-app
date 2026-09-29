import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Truck,
  FileText,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { CartItem, OrderSubmission, RestaurantInfo } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  restaurantInfo?: RestaurantInfo;
  onOrderSuccess: (order: OrderSubmission) => void;
}

// Clean international WhatsApp phone number formatter
function formatWhatsAppNumber(phoneStr: string): string {
  if (!phoneStr) return '923086410064';
  const digits = phoneStr.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '92' + digits.substring(1);
  }
  if (digits.startsWith('92')) {
    return digits;
  }
  if (digits.length === 10 && digits.startsWith('3')) {
    return '92' + digits;
  }
  return digits || '923086410064';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  restaurantInfo = RESTAURANT_INFO,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa'>('cod');
  const [isDispatched, setIsDispatched] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, current) => sum + current.item.price * current.quantity, 0);
  const deliveryFee =
    fulfillmentType === 'pickup' ? 0 : subtotal > 1500 ? 0 : restaurantInfo.deliveryFee || 100;
  const total = subtotal + deliveryFee;

  // Build the pre-filled WhatsApp message
  const buildWhatsAppMessage = () => {
    const paymentLabel =
      paymentMethod === 'cod'
        ? fulfillmentType === 'pickup'
          ? 'Cash on Pickup'
          : 'Cash on Delivery (COD)'
        : paymentMethod === 'jazzcash'
        ? 'JazzCash'
        : 'Easypaisa';

    const fulfillmentLabel =
      fulfillmentType === 'pickup'
        ? 'Store Pickup (Self Takeaway)'
        : 'Doorstep Delivery';

    const deliveryAddressText =
      fulfillmentType === 'pickup'
        ? `Store Pickup (${restaurantInfo.name}, ${restaurantInfo.address})`
        : address.trim();

    // Itemized list with sizes, descriptions, and quantities
    const itemsList = items
      .map((ci, idx) => {
        const sizeInfo = ci.selectedSize ? ` [${ci.selectedSize}]` : '';
        const itemTotal = (ci.item.price * ci.quantity).toLocaleString();
        return `${idx + 1}. *${ci.item.name}*${sizeInfo}\n   • Qty: ${ci.quantity} × Rs. ${ci.item.price.toLocaleString()} = Rs. ${itemTotal}`;
      })
      .join('\n\n');

    const messageLines = [
      `*AL BAIK CAFE - NEW ORDER*`,
      `----------------------------------------`,
      `*CUSTOMER DETAILS:*`,
      `• Name: ${customerName.trim()}`,
      `• Phone: ${phone.trim()}`,
      ``,
      `*ORDERED ITEMS:*`,
      itemsList,
      ``,
      `*ORDER SUMMARY:*`,
      `• Subtotal: Rs. ${subtotal.toLocaleString()}`,
      `• Delivery Fee: ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}`,
      `• *TOTAL AMOUNT: Rs. ${total.toLocaleString()}*`,
      ``,
      `*DELIVERY & PAYMENT:*`,
      `• Order Type: ${fulfillmentLabel}`,
      `• Address: ${deliveryAddressText}`,
      `• Payment Method: ${paymentLabel}`,
      notes.trim() ? `• Special Notes: ${notes.trim()}` : '',
      `----------------------------------------`,
      `_Please confirm my order and share estimated preparation time. Thank you!_`,
    ].filter(Boolean);

    return messageLines.join('\n');
  };

  const handleOrderOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (fulfillmentType === 'delivery' && !address.trim())) {
      return;
    }

    const messageText = buildWhatsAppMessage();
    const rawNumber = restaurantInfo.whatsapp || restaurantInfo.phone || '0308-6410064';
    const targetWhatsAppNumber = formatWhatsAppNumber(rawNumber);
    const waUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;

    setGeneratedMessage(messageText);
    setGeneratedWhatsAppUrl(waUrl);
    setIsDispatched(true);

    // Open WhatsApp using an anchor link
    try {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to trigger link click:', err);
    }

    // Record order submission for local state
    const orderRecord: OrderSubmission = {
      orderId: `AB-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryAddress: fulfillmentType === 'pickup' ? 'Store Pickup' : address.trim(),
      deliveryNotes: notes.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onOrderSuccess(orderRecord);
  };

  const handleCopyMessage = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setIsDispatched(false);
    setGeneratedWhatsAppUrl('');
    setGeneratedMessage('');
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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-zinc-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-zinc-950 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-600/30">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display leading-tight">
                {isDispatched ? 'Order Dispatched to WhatsApp' : 'Order on WhatsApp'}
              </h3>
              <p className="text-xs text-zinc-400">
                {restaurantInfo.name} · Direct Kitchen Confirmation
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

        {/* WhatsApp Direct Order Bar */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center gap-2.5 text-xs text-emerald-950">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <span>
            <strong>Direct WhatsApp Ordering:</strong> Your complete order details will be sent directly to Al Baik Cafe on WhatsApp for instant confirmation.
          </span>
        </div>

        {isDispatched ? (
          /* WhatsApp Dispatched Confirmation View */
          <div className="p-6 space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Check className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-black font-display text-zinc-900">
                Order Sent to WhatsApp!
              </h4>
              <p className="text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                Your pre-filled order has been opened in WhatsApp with <strong className="text-zinc-900">{restaurantInfo.name}</strong> ({restaurantInfo.phone}).
              </p>
            </div>

            {/* Direct Open WhatsApp Button */}
            <div className="space-y-3">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 active:scale-95 text-sm uppercase tracking-wider text-center"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Open WhatsApp Chat Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-200"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Order Copied to Clipboard!' : 'Copy Order Text to Clipboard'}</span>
              </button>
            </div>

            {/* Message Preview Box */}
            <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Pre-filled WhatsApp Message:</span>
                </span>
                <span className="text-emerald-700 font-bold">Total: Rs. {total.toLocaleString()}</span>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-xs text-zinc-700 leading-relaxed max-h-48 overflow-y-auto bg-white p-3 rounded-xl border border-zinc-200/80">
                {generatedMessage}
              </pre>
            </div>

            {/* Done Action */}
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-xl text-center text-xs transition-colors"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleOrderOnWhatsApp} className="p-6 space-y-5">
            {/* Fulfillment Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">
                Order Fulfillment <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Doorstep Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Store Pickup</span>
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
                    placeholder="e.g. 0300 1234567"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
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
                      placeholder="Street, Mohallah, Sector, Landmark, Kalasky"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Payment Method Selection */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                  Payment Method <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {fulfillmentType === 'pickup' ? 'Cash at Pickup' : 'Cash on Delivery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50 text-red-800'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    JazzCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    Easypaisa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra spicy, extra sauce, don't ring the bell"
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
                <span>Total Amount</span>
                <span className="text-emerald-700">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* WhatsApp Submit Action */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 text-sm sm:text-base uppercase tracking-wider"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order on WhatsApp · Rs. {total.toLocaleString()}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
