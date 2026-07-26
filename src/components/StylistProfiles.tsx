import React from 'react';
import { STYLISTS_DATA } from '../data/salonData';
import { Star, Calendar } from 'lucide-react';

interface StylistProfilesProps {
  onSelectStylistToBook: (stylistId: string) => void;
}

export const StylistProfiles: React.FC<StylistProfilesProps> = ({ onSelectStylistToBook }) => {
  return (
    <section id="stylists" className="py-16 sm:py-24 bg-[#faf7f2] border-b border-[#e5e0d8] text-[#1a1a1a] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
            Our Stylists & Masters
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight">
            Meet the Masters of Artistry
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Our certified team brings years of high-fashion bridal artistry, precision hair architecture, and advanced dermal care to Shakti Chowk, Bijnor.
          </p>
        </div>

        {/* Stylists Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS_DATA.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-[#fdfaf6] border border-[#e5e0d8] flex flex-col justify-between group hover:border-[#1a1a1a] transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-200">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#1a1a1a]/90 text-white px-2.5 py-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{stylist.rating} ({stylist.reviewsCount})</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.2em]">
                  {stylist.experienceYears}+ Yrs Master
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl italic text-[#1a1a1a]">
                    {stylist.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 mt-0.5">
                    {stylist.role}
                  </p>

                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {stylist.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="mt-4 pt-3 border-t border-[#e5e0d8]">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.map((spec, idx) => (
                        <span key={idx} className="bg-[#faf7f2] border border-[#e5e0d8] text-neutral-800 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5">
                          • {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectStylistToBook(stylist.id)}
                    className="w-full py-3 px-4 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {stylist.name.split(' ')[0]}</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

