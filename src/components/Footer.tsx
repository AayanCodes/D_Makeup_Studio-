import React from 'react';
import { STUDIO_INFO } from '../data/salonData';
import { Phone, MapPin, Heart, Sparkles, Calendar, Search } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenAiAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup, onOpenAiAdvisor }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-[#fdfaf6] border-t border-neutral-800 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white text-[#1a1a1a] flex items-center justify-center font-serif italic font-bold text-lg">
                D
              </div>
              <span className="font-serif text-2xl italic text-white tracking-tight">
                D MAKEUP STUDIO
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Bijnor's premier destination for luxury HD Bridal Makeovers, Airbrush Makeup, Keratin smooth hair care, HydraFacials, and Nail Extensions.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{STUDIO_INFO.address}, {STUDIO_INFO.city}</span>
              </p>
              <p className="flex items-center gap-1.5 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Helpline: {STUDIO_INFO.phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-400">Quick Directory</p>
            <ul className="space-y-2 text-neutral-400 text-xs font-medium">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-amber-300 transition-colors cursor-pointer">Service Menu & Pricing</button></li>
              <li><button onClick={() => scrollToSection('transformations')} className="hover:text-amber-300 transition-colors cursor-pointer">Before & After Portfolio</button></li>
              <li><button onClick={() => scrollToSection('stylists')} className="hover:text-amber-300 transition-colors cursor-pointer">Master Stylists</button></li>
              <li><button onClick={() => scrollToSection('blog')} className="hover:text-amber-300 transition-colors cursor-pointer">Editorial Beauty Journal</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-amber-300 transition-colors cursor-pointer">Client Reviews</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">Location Map & Directions</button></li>
            </ul>
          </div>

          {/* Booking & Tools */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-400">Online Booking & AI</p>
            <div className="space-y-2.5">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-3 bg-white text-[#1a1a1a] hover:bg-neutral-200 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book & Pay Deposit</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="w-full py-2.5 px-3 bg-[#1a1a1a] text-amber-300 border border-amber-400/30 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer hover:border-amber-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Beauty Advisor</span>
              </button>

              <button
                onClick={onOpenLookup}
                className="w-full py-2.5 px-3 bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Booking Receipt</span>
              </button>
            </div>
          </div>

          {/* Business Hours & Location */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-400">Opening Hours</p>
            <div className="bg-neutral-900/80 p-4 border border-neutral-800 space-y-2">
              {STUDIO_INFO.openingHours.map((oh, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-neutral-400">{oh.days}</span>
                  <span className="text-amber-300 font-bold">{oh.timing}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
              * Walk-ins welcome. Prior deposit booking required for bridal slots.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-[10px] uppercase tracking-wider">
          <p>© {new Date().getFullYear()} D Makeup Studio, Bijnor. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for D Makeup Studio • Shakti Chowk, Bijnor</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};

