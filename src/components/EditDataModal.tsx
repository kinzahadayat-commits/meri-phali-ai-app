import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Store,
  Utensils,
  Tag,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { RestaurantInfo, MenuItem, SpecialOffer } from '../types/restaurant';

interface EditDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantInfo: RestaurantInfo;
  onSaveRestaurantInfo: (info: RestaurantInfo) => void;
  menuItems: MenuItem[];
  onSaveMenuItems: (items: MenuItem[]) => void;
  specialOffers: SpecialOffer[];
  onSaveSpecialOffers: (offers: SpecialOffer[]) => void;
  onResetAllData: () => void;
}

export const EditDataModal: React.FC<EditDataModalProps> = ({
  isOpen,
  onClose,
  restaurantInfo,
  onSaveRestaurantInfo,
  menuItems,
  onSaveMenuItems,
  specialOffers,
  onSaveSpecialOffers,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'menu' | 'offers'>('info');

  // Local state copies for editing
  const [infoDraft, setInfoDraft] = useState<RestaurantInfo>({ ...restaurantInfo });
  const [menuDraft, setMenuDraft] = useState<MenuItem[]>([...menuItems]);
  const [offersDraft, setOffersDraft] = useState<SpecialOffer[]>([...specialOffers]);

  // New item draft
  const [newItem, setNewItem] = useState<{
    name: string;
    categoryId: 'pizza' | 'burger' | 'appetizer' | 'roll' | 'drinks';
    price: number;
    description: string;
    tag: string;
  }>({
    name: '',
    categoryId: 'pizza',
    price: 890,
    description: '',
    tag: 'Fresh',
  });

  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSaveAll = () => {
    onSaveRestaurantInfo(infoDraft);
    onSaveMenuItems(menuDraft);
    onSaveSpecialOffers(offersDraft);
    setSavedSuccessMessage(true);
    setTimeout(() => {
      setSavedSuccessMessage(false);
      onClose();
    }, 1200);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || newItem.price <= 0) return;

    const catNameMap: Record<string, string> = {
      pizza: 'Pizza (All Flavours)',
      burger: 'Burgers',
      appetizer: 'Appetizers & Fries',
      roll: 'Rolls & Shawarma',
      drinks: 'Drinks',
    };

    const created: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newItem.name.trim(),
      categoryId: newItem.categoryId,
      categoryName: catNameMap[newItem.categoryId] || 'Food',
      description: newItem.description.trim() || 'Delicious freshly prepared item at Al Baik Cafe.',
      price: newItem.price,
      priceDisplay: `Rs. ${newItem.price.toLocaleString()}`,
      image:
        newItem.categoryId === 'pizza'
          ? menuItems.find((i) => i.categoryId === 'pizza')?.image || menuItems[0].image
          : menuItems[0].image,
      popular: true,
      tags: newItem.tag ? [newItem.tag] : ['Special'],
      sizesAvailable: newItem.categoryId === 'pizza' ? ['Small 7"', 'Medium 10"', 'Large 13"'] : undefined,
    };

    setMenuDraft([created, ...menuDraft]);
    setNewItem({
      name: '',
      categoryId: 'pizza',
      price: 890,
      description: '',
      tag: 'Fresh',
    });
  };

  const handleUpdateItemPrice = (id: string, newPrice: number) => {
    setMenuDraft((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              price: newPrice,
              priceDisplay: `Rs. ${newPrice.toLocaleString()}`,
            }
          : it
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setMenuDraft((prev) => prev.filter((it) => it.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Reset all cafe data, menu items, and deals back to initial default?')) {
      onResetAllData();
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-zinc-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-zinc-950 text-white p-5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display leading-tight text-white">
                Edit Cafe Data & Menu
              </h2>
              <p className="text-xs text-zinc-400">
                Customize cafe details, add new pizza flavours, and update prices in real-time
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 bg-zinc-50 px-5 pt-3 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'info'
                ? 'border-red-600 text-red-600 bg-white shadow-xs'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Cafe Contact & Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'menu'
                ? 'border-red-600 text-red-600 bg-white shadow-xs'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Menu Items & Pizzas ({menuDraft.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'offers'
                ? 'border-red-600 text-red-600 bg-white shadow-xs'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Deals ({offersDraft.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {savedSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Changes Saved Successfully!</p>
                <p className="text-xs text-emerald-700">All data has been updated and applied to the website.</p>
              </div>
            </div>
          )}

          {/* TAB 1: CAFE DETAILS */}
          {activeTab === 'info' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={infoDraft.name}
                    onChange={(e) => setInfoDraft({ ...infoDraft, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={infoDraft.tagline}
                    onChange={(e) => setInfoDraft({ ...infoDraft, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Cafe Address
                </label>
                <input
                  type="text"
                  value={infoDraft.address}
                  onChange={(e) => setInfoDraft({ ...infoDraft, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    General Phone
                  </label>
                  <input
                    type="text"
                    value={infoDraft.phone}
                    onChange={(e) => setInfoDraft({ ...infoDraft, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">
                    WhatsApp Number (Receives All Orders)
                  </label>
                  <input
                    type="text"
                    value={infoDraft.whatsapp}
                    onChange={(e) => setInfoDraft({ ...infoDraft, whatsapp: e.target.value })}
                    placeholder="e.g. 0308-6410064 or 923086410064"
                    className="w-full px-3 py-2 text-sm bg-emerald-50/50 border border-emerald-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-emerald-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Order Hotline
                  </label>
                  <input
                    type="text"
                    value={infoDraft.orderHotline}
                    onChange={(e) => setInfoDraft({ ...infoDraft, orderHotline: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={infoDraft.email}
                    onChange={(e) => setInfoDraft({ ...infoDraft, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={infoDraft.openingHours}
                  onChange={(e) => setInfoDraft({ ...infoDraft, openingHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Delivery Fee (Rs.)
                  </label>
                  <input
                    type="number"
                    value={infoDraft.deliveryFee}
                    onChange={(e) =>
                      setInfoDraft({ ...infoDraft, deliveryFee: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Min Order (Rs.)
                  </label>
                  <input
                    type="number"
                    value={infoDraft.minimumOrder}
                    onChange={(e) =>
                      setInfoDraft({ ...infoDraft, minimumOrder: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    value={infoDraft.deliveryTimeEstimate}
                    onChange={(e) =>
                      setInfoDraft({ ...infoDraft, deliveryTimeEstimate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MENU ITEMS & ADD PIZZA */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Quick Add New Food / Pizza Form */}
              <div className="bg-red-50/60 border border-red-200/90 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-600" />
                  Add a New Pizza Flavor or Menu Item
                </h3>

                <form onSubmit={handleAddNewItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                      Item / Flavor Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Malai Boti Pizza"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-zinc-300 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newItem.categoryId}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          categoryId: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-zinc-300 rounded-xl"
                    >
                      <option value="pizza">🍕 Pizza (All Flavours)</option>
                      <option value="burger">🍔 Burgers</option>
                      <option value="appetizer">🍟 Appetizers & Fries</option>
                      <option value="roll">🌯 Rolls & Shawarma</option>
                      <option value="drinks">🥤 Drinks</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      required
                      min={50}
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-zinc-300 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Items List for fast inline price editing */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                  Current Menu Items & Flavours (Adjust Prices Below)
                </h4>

                <div className="space-y-2 divide-y divide-zinc-100 max-h-[400px] overflow-y-auto pr-1">
                  {menuDraft.map((it) => (
                    <div
                      key={it.id}
                      className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl hover:bg-zinc-50 border border-zinc-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-100 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-zinc-900">{it.name}</span>
                            <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                              {it.categoryName}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 line-clamp-1 max-w-md">{it.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-zinc-500">Rs.</span>
                          <input
                            type="number"
                            value={it.price}
                            onChange={(e) => handleUpdateItemPrice(it.id, Number(e.target.value))}
                            className="w-24 px-2 py-1 text-xs sm:text-sm font-bold border border-zinc-300 rounded-lg text-right"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem(it.id)}
                          className="text-zinc-400 hover:text-red-600 p-1.5 rounded-lg transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIAL OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-500">
                Update prices and bundle titles for today's special promotional deals:
              </p>

              <div className="space-y-3">
                {offersDraft.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 border border-zinc-200 rounded-2xl bg-zinc-50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 text-sm">{deal.title}</span>
                      <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                        {deal.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">
                          Discounted Deal Price (Rs.)
                        </label>
                        <input
                          type="number"
                          value={deal.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setOffersDraft((prev) =>
                              prev.map((o) =>
                                o.id === deal.id
                                  ? { ...o, price: val, priceDisplay: `Rs. ${val.toLocaleString()}` }
                                  : o
                              )
                            );
                          }}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold bg-white border border-zinc-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">
                          Original Regular Price (Rs.)
                        </label>
                        <input
                          type="number"
                          value={deal.originalPrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setOffersDraft((prev) =>
                              prev.map((o) =>
                                o.id === deal.id
                                  ? {
                                      ...o,
                                      originalPrice: val,
                                      originalPriceDisplay: `Rs. ${val.toLocaleString()}`,
                                    }
                                  : o
                              )
                            );
                          }}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold bg-white border border-zinc-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-zinc-500 hover:text-red-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-zinc-200/60 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-zinc-700 hover:bg-zinc-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
