import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/salonData';
import { Testimonial } from '../types';
import { Star, MessageSquarePlus, ShieldCheck, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    clientName: '',
    serviceName: 'Signature HD Bridal Makeup',
    rating: 5,
    location: 'Bijnor',
    comment: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.comment) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      clientName: formData.clientName,
      serviceName: formData.serviceName,
      date: 'Just now',
      rating: formData.rating,
      comment: formData.comment,
      verified: true,
      location: formData.location || 'Bijnor'
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage('Thank you! Your review has been published.');
    setTimeout(() => {
      setShowAddModal(false);
      setSubmittedMessage('');
      setFormData({
        clientName: '',
        serviceName: 'Signature HD Bridal Makeup',
        rating: 5,
        location: 'Bijnor',
        comment: ''
      });
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#fdfaf6] border-b border-[#e5e0d8] text-[#1a1a1a] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
              Verified Client Voices
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight mt-1">
              Loved by Brides Across Bijnor
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-2 max-w-xl">
              Read authentic experiences from clients who booked their bridal, hair, and facial sessions at D Makeup Studio, Shakti Chowk.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center gap-2"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-[#faf7f2] p-6 sm:p-8 border border-[#e5e0d8] hover:border-[#1a1a1a] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars and Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating
                            ? 'fill-amber-700 text-amber-700'
                            : 'fill-neutral-200 text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] font-bold text-amber-900 bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20">
                      <ShieldCheck className="w-3 h-3 text-amber-800" />
                      Verified Client
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-sm sm:text-base font-serif italic text-neutral-800 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#e5e0d8] flex items-center justify-between text-xs">
                <div>
                  <p className="font-serif italic font-normal text-[#1a1a1a] text-base">{item.clientName}</p>
                  <p className="text-[10px] uppercase tracking-wider text-amber-800 font-bold">{item.serviceName}</p>
                </div>
                <div className="text-right text-[10px] uppercase tracking-wider text-neutral-400">
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fdfaf6] max-w-lg w-full p-6 sm:p-8 border border-[#e5e0d8] space-y-6 text-[#1a1a1a]">
            
            <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-4">
              <div>
                <h3 className="font-serif text-3xl italic text-[#1a1a1a]">Write a Review</h3>
                <p className="text-xs text-neutral-500 mt-1">Share your experience at D Makeup Studio Bijnor</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-[#1a1a1a] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {submittedMessage ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Pooja Verma"
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Service Availed</label>
                    <input
                      type="text"
                      value={formData.serviceName}
                      onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Your Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Bijnor / Chandpur"
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5) Very Good</option>
                    <option value={3}>⭐⭐⭐ (3/5) Good</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Your Review Comment *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Tell us about the makeup, hairstyling, cleanliness, or staff..."
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-neutral-600 hover:text-[#1a1a1a]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

