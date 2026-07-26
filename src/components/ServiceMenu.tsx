import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/salonData';
import { Sparkles, Clock, Check, Calendar, Search, ShieldCheck } from 'lucide-react';

interface ServiceMenuProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'bridal', label: 'Bridal Packages' },
    { id: 'makeup', label: 'Party Glam' },
    { id: 'hair', label: 'Hair & Keratin' },
    { id: 'skincare', label: 'Facials & Glow' },
    { id: 'nails', label: 'Nails & Extensions' },
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.includes.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#faf7f2] border-b border-[#e5e0d8] scroll-mt-12 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
            Service Menu & Transparent Pricing
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight">
            Curated Beauty & Bridal Offerings
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Transparent pricing with flexible deposit booking. Premium international makeup brands & sterilized hygienic equipment at Shakti Chowk, Bijnor.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Keratin, HydraFacial, Bridal HD)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#fdfaf6] border border-[#e5e0d8] text-xs text-[#1a1a1a] placeholder-neutral-400 focus:outline-none focus:border-[#1a1a1a] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#fdfaf6] text-neutral-600 border border-[#e5e0d8] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-[#fdfaf6] border border-[#e5e0d8] max-w-md mx-auto p-6">
            <p className="text-neutral-500 text-xs">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#fdfaf6] border border-[#e5e0d8] flex flex-col justify-between group hover:border-[#1a1a1a] transition-all duration-300"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-52 overflow-hidden bg-neutral-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 group-hover:scale-105 transition-all duration-150 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                      {service.category}
                    </span>

                    {/* Popular Badge */}
                    {service.popular && (
                      <span className="absolute top-3 right-3 bg-amber-700 text-white text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Signature
                      </span>
                    )}

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#1a1a1a]/90 backdrop-blur-xs p-2.5 flex items-baseline justify-between text-white border border-white/10">
                      <div>
                        <span className="text-xl font-serif italic">₹{service.price.toLocaleString('en-IN')}</span>
                        {service.originalPrice && (
                          <span className="text-[10px] text-neutral-400 line-through ml-2">
                            ₹{service.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Deposit ₹{service.depositAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-500">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-amber-800" />
                        {service.durationMinutes} Mins Session
                      </span>
                      <span className="text-emerald-800 font-bold">Open Slots</span>
                    </div>

                    <h3 className="font-serif text-2xl italic text-[#1a1a1a]">
                      {service.name}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Includes List */}
                    <div className="pt-3 border-t border-[#e5e0d8]">
                      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-2">Package Highlights:</p>
                      <ul className="space-y-1.5">
                        {service.includes.slice(0, 4).map((inc, idx) => (
                          <li key={idx} className="text-[11px] text-neutral-700 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="w-full py-3 px-4 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Process Deposit (₹{service.depositAmount})</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

