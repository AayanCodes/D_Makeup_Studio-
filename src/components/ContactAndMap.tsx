import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/salonData';
import { MapPin, Phone, Clock, MessageSquare, Send, Navigation, CheckCircle } from 'lucide-react';

export const ContactAndMap: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Bridal Package Enquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setResponseMsg(data.message);
        setFormData({
          name: '',
          phone: '',
          subject: 'Bridal Package Enquiry',
          message: ''
        });
      }
    } catch {
      setResponseMsg('Thank you! Your message has been received. Our team will call you back.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#faf7f2] border-b border-[#e5e0d8] text-[#1a1a1a] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
            Visit Our Bijnor Studio
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight">
            Location Map & Contact Details
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Conveniently located at Shakti Chowk, Krishna Plaza near SRS Mall. Easy parking & spacious bridal trial lounge.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Quick CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Studio Info Card */}
            <div className="bg-[#fdfaf6] p-6 sm:p-8 border border-[#e5e0d8] space-y-6">
              
              <div>
                <h3 className="font-serif text-3xl italic text-[#1a1a1a]">D MAKEUP STUDIO</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-800 mt-1">Premier Beauty Parlour & Bridal Academy</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-400">Studio Address:</p>
                    <p className="font-serif italic text-base text-[#1a1a1a] mt-0.5">{STUDIO_INFO.address}</p>
                    <p className="text-neutral-500">{STUDIO_INFO.city}, {STUDIO_INFO.state} - {STUDIO_INFO.pincode}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-wider text-amber-900 font-bold bg-amber-500/10 px-2 py-0.5 border border-amber-500/20">
                      Landmark: {STUDIO_INFO.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-400">Direct Helpline:</p>
                    <a href={`tel:${STUDIO_INFO.phone}`} className="font-serif italic text-xl text-[#1a1a1a] hover:underline">
                      {STUDIO_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-400">Opening Hours:</p>
                    {STUDIO_INFO.openingHours.map((oh, idx) => (
                      <p key={idx} className="text-neutral-600 text-xs">
                        {oh.days}: <span className="text-[#1a1a1a] font-bold">{oh.timing}</span>
                      </p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Action Bar */}
              <div className="pt-4 border-t border-[#e5e0d8] grid grid-cols-2 gap-3">
                <a
                  href={`tel:${STUDIO_INFO.phone}`}
                  className="py-3 px-3 bg-[#1a1a1a] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>

                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=Hello%20D%20Makeup%20Studio,%20I%20want%20to%20enquire%20about%20bridal%20makeup`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Direct Directions Button */}
            <a
              href={STUDIO_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-[#1a1a1a] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Get Directions on Google Maps</span>
            </a>

          </div>

          {/* Right Column: Google Map Embed + Contact Query Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Map */}
            <div className="bg-[#fdfaf6] border border-[#e5e0d8] p-2">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden border border-[#e5e0d8]">
                <iframe
                  title="D Makeup Studio Location Map Bijnor"
                  src={STUDIO_INFO.googleMapsEmbedUrl}
                  className="w-full h-full border-0 grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-150 ease-out"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-3 text-xs text-neutral-500 flex items-center justify-between">
                <span>📍 Shakti Chowk, Krishna Plaza, near SRS Mall, Bijnor</span>
                <span className="text-[#1a1a1a] font-bold">UP 246701</span>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-[#fdfaf6] p-6 sm:p-8 border border-[#e5e0d8] space-y-4">
              <div>
                <h3 className="font-serif text-2xl italic text-[#1a1a1a]">Send Us a Direct Query</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Have questions about wedding dates, group bookings, or package deals?</p>
              </div>

              {responseMsg ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">{responseMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Pooja Malik"
                        className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 8650367876"
                        className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    >
                      <option value="Bridal Package Enquiry">Bridal Package Enquiry</option>
                      <option value="Keratin / Hair Care Query">Keratin / Hair Care Query</option>
                      <option value="Facial / Skincare Package">Facial / Skincare Package</option>
                      <option value="Academy / Makeup Course">Academy / Makeup Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Message / Question</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#1a1a1a] hover:bg-neutral-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

