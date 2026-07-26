import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA } from '../data/salonData';
import { Sparkles, UserCheck, ArrowRight } from 'lucide-react';

interface TransformationGalleryProps {
  onOpenBooking: () => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    'trans-bridal-1': 50,
    'trans-hair-1': 50,
    'trans-sangeet-1': 50,
    'trans-nails-1': 50,
  });

  const categories = [
    { id: 'all', label: 'All Transformations' },
    { id: 'bridal', label: 'Bridal Makeovers' },
    { id: 'makeup', label: 'Party Glam' },
    { id: 'hair', label: 'Keratin & Hair' },
    { id: 'nails', label: 'Nail Art' },
  ];

  const filteredItems = TRANSFORMATIONS_DATA.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const handleSliderMove = (id: string, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX: number | undefined;
    if ('touches' in e && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent<HTMLDivElement>).clientX;
    }
    if (clientX === undefined) return;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPositions(prev => ({ ...prev, [id]: percentage }));
  };

  return (
    <section id="transformations" className="py-16 sm:py-24 bg-[#fdfaf6] border-b border-[#e5e0d8] scroll-mt-12 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
            Portfolio Highlights
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight">
            Before & After Makeovers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Drag the interactive slider line left and right on any photo to reveal the real makeover crafted by D Makeup Studio artists.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#faf7f2] text-neutral-600 border border-[#e5e0d8] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredItems.map((item) => {
            const pos = sliderPositions[item.id] ?? 50;

            return (
              <div
                key={item.id}
                className="bg-[#faf7f2] border border-[#e5e0d8] flex flex-col justify-between group hover:border-[#1a1a1a] transition-all"
              >
                {/* Interactive Slider Container */}
                <div
                  className="relative h-72 sm:h-96 select-none cursor-ew-resize overflow-hidden bg-[#1a1a1a] touch-none"
                  onMouseDown={(e) => handleSliderMove(item.id, e)}
                  onMouseMove={(e) => handleSliderMove(item.id, e)}
                  onTouchStart={(e) => handleSliderMove(item.id, e)}
                  onTouchMove={(e) => handleSliderMove(item.id, e)}
                  onPointerDown={(e) => handleSliderMove(item.id, e)}
                  onPointerMove={(e) => {
                    if (e.buttons === 1 || e.pointerType === 'touch') {
                      handleSliderMove(item.id, e);
                    }
                  }}
                >
                  {/* AFTER Image (Full width background - Vibrant Makeover) */}
                  <img
                    src={item.afterImage}
                    alt={`${item.title} After`}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-[9px] font-bold px-2.5 py-1 z-10 uppercase tracking-[0.2em]">
                    AFTER
                  </span>

                  {/* BEFORE Image (Clipped overlay using clipPath) */}
                  <div
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} Before`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-neutral-900/90 text-neutral-300 text-[9px] font-bold px-2.5 py-1 z-10 uppercase tracking-[0.2em]">
                      BEFORE
                    </span>
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-amber-300 shadow-2xl z-20 pointer-events-none"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1a1a1a] text-amber-300 flex items-center justify-center text-xs font-bold border-2 border-amber-300 shadow-lg">
                      ↔
                    </div>
                  </div>

                  {/* Instruction Hint */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a]/80 text-amber-200 text-[9px] uppercase tracking-[0.15em] font-medium px-3 py-1 border border-white/10 z-10 pointer-events-none">
                    Drag / Slide finger to compare
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      <span className="flex items-center gap-1 font-bold text-[#1a1a1a]">
                        <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                        MUA: {item.artistName}
                      </span>
                      <span className="text-neutral-400">Editorial Verified</span>
                    </div>

                    <h3 className="font-serif text-2xl italic text-[#1a1a1a]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.servicesUsed.map((srv, idx) => (
                        <span key={idx} className="bg-[#fdfaf6] text-neutral-800 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 border border-[#e5e0d8]">
                          • {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenBooking}
                      className="w-full py-3 px-4 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Similar Look</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

