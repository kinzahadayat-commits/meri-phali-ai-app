import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types/restaurant';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    'All',
    'Hot Pizzas',
    'Fried Chicken',
    'Burgers',
    'Sandwiches',
    'Drinks',
    'Snacks & Sides',
    'Interior & Ambiance',
  ];

  const filteredItems = filterCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <section id="gallery" className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Visual Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 font-display tracking-tight mb-4">
            Our Food & Cafe Gallery
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Take a look inside our kitchen, our signature crispy favorites, and the welcoming space waiting for you.
          </p>

          {/* Gallery Filters */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="text-base font-bold font-display text-white mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden border border-zinc-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors flex items-center justify-center z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="p-6 text-white bg-zinc-900">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold font-display mt-1 text-white">
                {selectedImage.title}
              </h3>
              <p className="text-zinc-300 text-sm mt-2">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
