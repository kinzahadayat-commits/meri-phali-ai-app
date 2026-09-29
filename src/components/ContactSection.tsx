import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Edit2,
  Save,
} from 'lucide-react';
import { RestaurantInfo } from '../types/restaurant';

interface ContactSectionProps {
  restaurantInfo: RestaurantInfo;
  onUpdateRestaurantInfo?: (updated: RestaurantInfo) => void;
  onOpenEditDataModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  restaurantInfo,
  onUpdateRestaurantInfo,
  onOpenEditDataModal,
}) => {
  // Editable contact info state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [address, setAddress] = useState(restaurantInfo.address);
  const [phone, setPhone] = useState(restaurantInfo.phone);
  const [email, setEmail] = useState(restaurantInfo.email);
  const [hours, setHours] = useState(restaurantInfo.openingHours);

  useEffect(() => {
    setAddress(restaurantInfo.address);
    setPhone(restaurantInfo.phone);
    setEmail(restaurantInfo.email);
    setHours(restaurantInfo.openingHours);
  }, [restaurantInfo]);

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 700);
  };

  const handleToggleEdit = () => {
    if (isEditingInfo && onUpdateRestaurantInfo) {
      onUpdateRestaurantInfo({
        ...restaurantInfo,
        address,
        phone,
        email,
        openingHours: hours,
      });
    }
    setIsEditingInfo(!isEditingInfo);
  };

  return (
    <section id="contact" className="py-20 bg-zinc-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 font-display tracking-tight">
              Contact Al Baik Cafe
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg mt-2 max-w-xl">
              Have questions, feedback, or catering inquiries? Reach out to us or drop by for a hot pizza or crispy meal!
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleEdit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:border-red-600 px-3 py-2 rounded-xl transition-colors shadow-xs"
            >
              {isEditingInfo ? (
                <>
                  <Save className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Save Contact Details</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Inline Edit Details</span>
                </>
              )}
            </button>

            {onOpenEditDataModal && (
              <button
                type="button"
                onClick={onOpenEditDataModal}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-xl transition-colors"
              >
                All Cafe Data Settings
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards + Map Placeholder */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-4">
                Cafe Information
              </h3>

              {isEditingInfo && (
                <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mb-4">
                  Editing mode active: Change the fields below and click "Save Contact Details".
                </p>
              )}

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-400 uppercase">Address</p>
                    {isEditingInfo ? (
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-sm font-semibold text-zinc-800 border border-zinc-300 rounded px-2 py-1 mt-1"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-zinc-800 leading-snug">{address}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-400 uppercase">Phone & Hotline</p>
                    {isEditingInfo ? (
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-sm font-semibold text-zinc-800 border border-zinc-300 rounded px-2 py-1 mt-1"
                      />
                    ) : (
                      <div className="space-y-0.5">
                        <a href={`tel:${phone}`} className="text-sm font-bold text-red-600 hover:underline block">
                          {phone} (WhatsApp & Calls)
                        </a>
                        {restaurantInfo.secondaryPhone && (
                          <a href={`tel:${restaurantInfo.secondaryPhone}`} className="text-xs font-semibold text-zinc-600 hover:text-red-600 block">
                            {restaurantInfo.secondaryPhone} (Alternate)
                          </a>
                        )}
                        {restaurantInfo.proprietor && (
                          <p className="text-[11px] text-zinc-500 font-medium">
                            Proprietor: <span className="font-bold text-zinc-800">{restaurantInfo.proprietor}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-400 uppercase">Email Address</p>
                    {isEditingInfo ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm font-semibold text-zinc-800 border border-zinc-300 rounded px-2 py-1 mt-1"
                      />
                    ) : (
                      <a href={`mailto:${email}`} className="text-sm font-semibold text-zinc-800 hover:text-red-600">
                        {email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-400 uppercase">Opening Hours</p>
                    {isEditingInfo ? (
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full text-sm font-semibold text-zinc-800 border border-zinc-300 rounded px-2 py-1 mt-1"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-zinc-800">{hours}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9] bg-zinc-100 flex flex-col items-center justify-center text-center p-6 border-b border-zinc-200">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#991b1b_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg mx-auto mb-2 animate-bounce">
                    <MapPin className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 font-display">
                    Al Baik Cafe Location
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
                    {address}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    [Replaceable with official Google Maps embed iframe]
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 flex items-center justify-between text-xs font-semibold text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-red-600" />
                  Free customer parking available
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-700 hover:underline font-bold"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold font-display text-zinc-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-sm text-zinc-500 mb-6">
              Fill out the form below and our management team will get back to you shortly.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-emerald-900 font-display">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-emerald-700 mt-1 max-w-sm mx-auto">
                  Thank you for reaching out to Al Baik Cafe. We have received your message and will contact you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 0000000"
                      className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you'd like to ask or share..."
                    className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
