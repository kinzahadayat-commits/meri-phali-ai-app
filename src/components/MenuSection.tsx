import React, { useState, useMemo } from 'react';
import {
  Utensils,
  Plus,
  Minus,
  Check,
  Search,
  Flame,
  Sparkles,
  Edit3,
  Pizza,
  LayoutGrid,
  Rows3,
} from 'lucide-react';
import { MenuItem, MenuCategoryId } from '../types/restaurant';
import { MENU_CATEGORIES } from '../data/restaurantData';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number, selectedSize?: string, customPrice?: number) => void;
  onOpenOrderModal: (item?: MenuItem) => void;
  onUpdateItemPrice?: (itemId: string, newPrice: number) => void;
  onOpenEditData?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onAddToCart,
  onUpdateItemPrice,
  onOpenEditData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [itemSelectedSizes, setItemSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Inline price editing
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[itemId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [itemId]: next };
    });
  };

  const handleSizeSelect = (itemId: string, sizeName: string) => {
    setItemSelectedSizes((prev) => ({ ...prev, [itemId]: sizeName }));
  };

  const getItemEffectivePrice = (item: MenuItem, selectedSizeName?: string | null): number => {
    if (!item.sizePrices || !selectedSizeName) {
      return item.price;
    }
    const lower = selectedSizeName.toLowerCase();
    if (lower.includes('medium') && item.sizePrices.medium) {
      return item.sizePrices.medium;
    }
    if (lower.includes('large') && item.sizePrices.large) {
      return item.sizePrices.large;
    }
    if (lower.includes('small') && item.sizePrices.small) {
      return item.sizePrices.small;
    }
    return item.price;
  };

  const handleAdd = (item: MenuItem) => {
    const qty = itemQuantities[item.id] || 1;
    const selectedSize = itemSelectedSizes[item.id] || (item.sizesAvailable ? item.sizesAvailable[0] : undefined);
    const unitPrice = getItemEffectivePrice(item, selectedSize);
    onAddToCart(item, qty, selectedSize, unitPrice);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1600);
  };

  const startEditPrice = (item: MenuItem) => {
    setEditingPriceId(item.id);
    setTempPrice(item.price.toString());
  };

  const saveEditPrice = (itemId: string) => {
    const parsed = parseInt(tempPrice, 10);
    if (!isNaN(parsed) && parsed > 0 && onUpdateItemPrice) {
      onUpdateItemPrice(itemId, parsed);
    }
    setEditingPriceId(null);
  };

  return (
    <section id="menu" className="py-20 bg-zinc-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Official Menu Card & Prices
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 font-display tracking-tight mb-4">
            Al Baik Cafe Kalasky Menu
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Explore our authentic menu with freshly baked pizzas in all 13 flavours, crispy zinger & tower burgers, hot wings, cheesy fries, and shawarmas.
          </p>

          {/* Quick Notice with Edit Data Shortcut */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-600 bg-white border border-zinc-200 px-4 py-2 rounded-xl shadow-xs">
            <Edit3 className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Actual menu prices loaded directly from official flyer.</span>
            {onOpenEditData && (
              <button
                type="button"
                onClick={onOpenEditData}
                className="font-bold text-red-600 underline hover:text-red-700"
              >
                Edit Cafe Data
              </button>
            )}
          </div>
        </div>

        {/* Controls: Categories, Search, and Layout Alignment Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex-1">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/80'
                  }`}
                >
                  {cat.id === 'pizza' && <Pizza className="w-4 h-4 text-amber-300" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pizza, burger, wings..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Layout Toggle: Grid vs Side-by-Side Horizontal Card View */}
            <div className="flex items-center bg-white border border-zinc-200 p-1 rounded-xl shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'grid'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                title="List View"
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'list'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
                aria-label="List View"
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-md mx-auto">
            <Utensils className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-800 mb-1">No items found</h3>
            <p className="text-sm text-zinc-500 mb-4">Try searching for something else or reset filters.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : layoutMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredItems.map((item) => {
              const qty = itemQuantities[item.id] || 1;
              const isAdded = addedItemNotice === item.id;
              const isEditingPrice = editingPriceId === item.id;
              const selectedSize =
                itemSelectedSizes[item.id] || (item.sizesAvailable ? item.sizesAvailable[0] : null);
              const unitPrice = getItemEffectivePrice(item, selectedSize);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.popular && (
                        <span className="bg-amber-500 text-zinc-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                      {item.spicy && (
                        <span className="bg-red-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          Spicy
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2.5 right-3 text-[11px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Body Content with balanced heights */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title slot */}
                      <div className="min-h-[2.5rem] flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </div>

                      {/* Description slot */}
                      <p className="text-zinc-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3 min-h-[2.5rem]">
                        {item.description}
                      </p>

                      {/* Sizes Picker for Pizzas */}
                      <div className="min-h-[2rem] mb-3 flex items-center">
                        {item.sizesAvailable && item.sizesAvailable.length > 0 ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.sizesAvailable.map((sizeStr) => (
                              <button
                                key={sizeStr}
                                type="button"
                                onClick={() => handleSizeSelect(item.id, sizeStr)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${
                                  selectedSize === sizeStr
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200/80'
                                }`}
                              >
                                {sizeStr}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-zinc-400 font-medium">
                            Freshly prepared to order
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Baseline Pinned to Bottom */}
                    <div className="pt-3 border-t border-zinc-100 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          {isEditingPrice ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-zinc-500">Rs.</span>
                              <input
                                type="number"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-20 px-2 py-0.5 text-sm border border-red-500 rounded font-bold"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => saveEditPrice(item.id)}
                                className="bg-emerald-600 text-white text-xs px-2 py-1 rounded font-bold"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1.5 group/price">
                              <span className="font-extrabold text-xl text-zinc-900 tracking-tight font-display text-red-600">
                                Rs. {unitPrice.toLocaleString()}
                              </span>
                              <button
                                type="button"
                                onClick={() => startEditPrice(item)}
                                title="Edit price"
                                className="opacity-40 group-hover/price:opacity-100 p-1 text-zinc-400 hover:text-red-600 transition-opacity"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white hover:text-zinc-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-zinc-900">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white hover:text-zinc-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Add to Order Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md shadow-red-600/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>
                              Add {qty > 1 ? `(${qty})` : ''} · Rs. {(unitPrice * qty).toLocaleString()}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW: Side-by-side card with accurate horizontal alignment */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {filteredItems.map((item) => {
              const qty = itemQuantities[item.id] || 1;
              const isAdded = addedItemNotice === item.id;
              const selectedSize =
                itemSelectedSizes[item.id] || (item.sizesAvailable ? item.sizesAvailable[0] : null);
              const unitPrice = getItemEffectivePrice(item, selectedSize);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all p-3 sm:p-4 flex flex-row gap-4 items-center group"
                >
                  {/* Left Side: Image perfectly aligned with text height */}
                  <div className="relative w-32 sm:w-44 self-stretch min-h-[150px] sm:min-h-[170px] rounded-2xl overflow-hidden bg-zinc-900 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {(item.popular || item.spicy) && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] uppercase font-bold px-1.5 py-0.5 rounded shadow-xs">
                        {item.popular ? 'Popular' : 'Spicy'}
                      </span>
                    )}

                    <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Right Side: Text & Actions */}
                  <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 group-hover:text-red-700 transition-colors truncate">
                          {item.name}
                        </h3>
                        <span className="font-black text-sm text-red-600 shrink-0 font-display">
                          Rs. {unitPrice.toLocaleString()}
                        </span>
                      </div>

                      <p className="text-zinc-600 text-xs line-clamp-2 leading-relaxed mb-2">
                        {item.description}
                      </p>

                      {/* Sizes Picker */}
                      {item.sizesAvailable && item.sizesAvailable.length > 0 && (
                        <div className="flex items-center gap-1 mb-2 flex-wrap">
                          {item.sizesAvailable.map((sizeStr) => (
                            <button
                              key={sizeStr}
                              type="button"
                              onClick={() => handleSizeSelect(item.id, sizeStr)}
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-all ${
                                selectedSize === sizeStr
                                  ? 'bg-red-600 text-white'
                                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                              }`}
                            >
                              {sizeStr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                      <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-600 hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-zinc-900">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-600 hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? 'Added!' : 'Add to Order'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
