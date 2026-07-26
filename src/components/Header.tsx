import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/salonData';
import { Phone, MapPin, Clock, Sparkles, Calendar, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenLookup: () => void;
  onOpenAiAdvisor: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenLookup, onOpenAiAdvisor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfaf6]/95 backdrop-blur-md border-b border-[#e5e0d8]">
      {/* Top Banner Bar */}
      <div className="bg-[#1a1a1a] text-neutral-200 text-[11px] tracking-wider uppercase py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{STUDIO_INFO.address}, {STUDIO_INFO.city}</span>
            </span>
            <span className="hidden sm:inline-block opacity-30">•</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Daily: 09:30 AM - 08:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={`tel:${STUDIO_INFO.phone}`} 
              className="flex items-center gap-1.5 text-neutral-200 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Helpline: {STUDIO_INFO.phone}</span>
            </a>
            <span className="opacity-30">|</span>
            <button 
              onClick={onOpenLookup} 
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors cursor-pointer font-medium tracking-widest"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl italic tracking-tighter leading-none text-[#1a1a1a]">D</span>
              <div className="border-l border-[#1a1a1a] pl-2.5 flex flex-col">
                <span className="uppercase tracking-[0.25em] text-[11px] font-bold text-[#1a1a1a] leading-tight">
                  Makeup Studio
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-sans">
                  Bijnor • Bridal Academy
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#1a1a1a]">
            <button onClick={() => scrollToSection('services')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Services
            </button>
            <button onClick={() => scrollToSection('transformations')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Transformations
            </button>
            <button onClick={() => scrollToSection('stylists')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Stylists
            </button>
            <button onClick={() => scrollToSection('blog')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Blog
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Reviews
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:opacity-60 transition-opacity cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Advisor</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-6 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold bg-[#1a1a1a] text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3.5 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold bg-[#1a1a1a] text-white"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1a1a1a] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdfaf6] border-b border-[#e5e0d8] px-6 pt-4 pb-8 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-[#1a1a1a] text-white font-bold text-[10px] uppercase tracking-[0.15em]"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAiAdvisor(); }}
              className="flex items-center justify-center gap-2 py-3 px-3 border border-[#1a1a1a] text-[#1a1a1a] font-bold text-[10px] uppercase tracking-[0.15em]"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              AI Advisor
            </button>
          </div>

          <div className="divide-y divide-[#e5e0d8] text-[11px] uppercase tracking-[0.15em] font-medium text-[#1a1a1a]">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Services & Menu
            </button>
            <button
              onClick={() => scrollToSection('transformations')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Transformations
            </button>
            <button
              onClick={() => scrollToSection('stylists')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Stylists
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Seasonal Blog
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-3 hover:opacity-60"
            >
              Location & Map
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLookup(); }}
              className="block w-full text-left py-3 text-amber-700 font-bold"
            >
              Lookup Receipt
            </button>
          </div>

          <div className="pt-3 text-[11px] text-neutral-600 flex flex-col gap-1 bg-[#faf7f2] p-4 border border-[#e5e0d8]">
            <p className="font-bold text-[#1a1a1a] uppercase tracking-wider text-[10px]">📍 D Makeup Studio</p>
            <p>{STUDIO_INFO.address}, Bijnor, UP 246701</p>
            <p className="text-[#1a1a1a] font-bold">Helpline: {STUDIO_INFO.phone}</p>
          </div>
        </div>
      )}
    </header>
  );
};

