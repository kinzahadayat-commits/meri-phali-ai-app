import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, Plus } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/restaurantData';
import { CustomerReview } from '../types/restaurant';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: newName.trim(),
      cityOrTag: 'Sample Customer Review',
      rating: newRating,
      comment: newComment.trim(),
      favoriteDish: newFavorite.trim() || 'Crispy Chicken & Burger',
      date: 'Just now',
    };

    setReviews([newRev, ...reviews]);
    setNewName('');
    setNewComment('');
    setNewFavorite('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 font-display tracking-tight">
              What People Love About Us
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg mt-2 max-w-xl">
              Real smiles and genuine appreciation for the crispy crunch, hearty portions, and welcoming cafe hospitality.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg">
              Sample Reviews (Demonstration)
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold bg-zinc-900 text-white px-3.5 py-2 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Close Form' : 'Test Add Review'}</span>
            </button>
          </div>
        </div>

        {/* Add Review Drawer/Card */}
        {showAddForm && (
          <form
            onSubmit={handleAddReview}
            className="mb-10 bg-zinc-50 border border-zinc-200 p-6 rounded-2xl max-w-xl mx-auto shadow-sm"
          >
            <h3 className="text-base font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-red-600" />
              Add a Sample Customer Review
            </h3>

            {submittedMessage ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Thank you! Your sample review was added to the list.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Rating
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Great</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Favorite Item
                    </label>
                    <input
                      type="text"
                      value={newFavorite}
                      onChange={(e) => setNewFavorite(e.target.value)}
                      placeholder="e.g. Zinger Burger"
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Review Text
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What did you love about the food and service?"
                    className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm"
                >
                  Post Review
                </button>
              </div>
            )}
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`}
                    />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-zinc-700 text-sm leading-relaxed mb-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/70">
                <p className="font-bold text-zinc-900 text-sm">{rev.customerName}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500 mt-0.5">
                  <span className="text-red-700 font-semibold truncate max-w-[140px]">
                    {rev.favoriteDish}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
