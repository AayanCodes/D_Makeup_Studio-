import React from 'react';
import { STUDIO_INFO } from '../data/salonData';
import { Calendar, Sparkles, MapPin, CheckCircle2, ShieldCheck, Star, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiAdvisor: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiAdvisor, onExploreMenu }) => {
  return (
    <section className="bg-[#fdfaf6] text-[#1a1a1a] border-b border-[#e5e0d8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Top Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Left Column: High-Fashion Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e5e0d8] pb-10 lg:pb-0">
            
            <div className="space-y-6">
              {/* Category Pill */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 bg-[#1a1a1a] text-white">
                  Editorial • Bijnor
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700" />
                  Shakti Chowk, Krishna Plaza
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight text-[#1a1a1a]">
                The Art <br />
                <span className="italic font-normal">of Grace.</span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl font-sans leading-relaxed">
                Bijnor's premier destination for high-fashion transformations and bridal excellence. Specializing in luxury Airbrush HD Makeovers, Keratin smooth hair therapy, and HydraFacials with secure online deposit booking.
              </p>

              {/* Editorial Highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-[#e5e0d8] py-4 text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Certified MUAs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Deposit Receipts</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Process Deposit & Book</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Service Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="px-5 py-3.5 bg-[#faf7f2] border border-[#e5e0d8] text-amber-900 hover:border-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Recommender</span>
              </button>
            </div>

          </div>

          {/* Right Column: Featured Transformation Photo Frame */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-[#faf7f2] p-4 border border-[#e5e0d8] shadow-xs">
              <div className="relative aspect-[4/5] overflow-hidden group touch-none">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                  alt="D Makeup Studio Bridal Transformation"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 transition-all duration-500 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1a1a1a] text-white px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                  Bridal Suite
                </div>
              </div>

              <div className="pt-4 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-2xl italic text-[#1a1a1a]">Royal HD Bridal Package</h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mt-0.5">By Lead MUA Deepika Sharma</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-base text-[#1a1a1a]">₹15,000</p>
                  <p className="text-[9px] uppercase tracking-widest text-amber-800 font-bold">Deposit ₹3,000</p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="p-4 bg-[#f9f5f0] border border-[#e5e0d8]">
              <p className="font-serif italic text-sm text-neutral-700">
                "Deepa gave me the exact flawless bridal look I dreamed of. Simply magical experience in Bijnor!"
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500 mt-2">— Priya S., Married Oct 2024</p>
            </div>

          </div>

        </div>

        {/* Editorial Stats Bar */}
        <div className="mt-12 pt-8 border-t border-[#e5e0d8] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8]">
            <p className="text-3xl font-serif italic text-[#1a1a1a]">1,200+</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mt-1">Brides Transformed</p>
          </div>
          <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8]">
            <p className="text-3xl font-serif italic text-[#1a1a1a]">4.9 ★</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mt-1">Bijnor Studio Rating</p>
          </div>
          <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8]">
            <p className="text-3xl font-serif italic text-[#1a1a1a]">100%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mt-1">MAC & Kryolan Cosmetics</p>
          </div>
          <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8]">
            <p className="text-3xl font-serif italic text-[#1a1a1a]">Instant</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mt-1">Digital Deposit Receipts</p>
          </div>
        </div>

      </div>
    </section>
  );
};

