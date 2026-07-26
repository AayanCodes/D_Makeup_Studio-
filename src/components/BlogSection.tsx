import React, { useState } from 'react';
import { BLOG_POSTS_DATA } from '../data/salonData';
import { BlogPost } from '../types';
import { Sparkles, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';

interface BlogSectionProps {
  onOpenAiAdvisor: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenAiAdvisor }) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS_DATA.filter(post => 
    selectedSeason === 'all' || post.season === selectedSeason || post.season === 'all-season'
  );

  return (
    <section id="blog" className="py-16 sm:py-24 bg-[#faf7f2] border-b border-[#e5e0d8] text-[#1a1a1a] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800">
              D Studio Journal & Advice
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#1a1a1a] tracking-tight mt-1">
              Seasonal Hair & Makeup Tips
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-2 max-w-xl">
              Pro beauty insights, weather-proof skincare routines, and pre-bridal checklists written by our studio master MUAs in Bijnor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAiAdvisor}
              className="px-6 py-3 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Get AI Beauty Advice</span>
            </button>
          </div>
        </div>

        {/* Season Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-400 flex items-center gap-1 mr-2">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'monsoon', label: 'Monsoon Care' },
            { id: 'summer', label: 'Summer Glow' },
            { id: 'winter', label: 'Winter Skincare' },
          ].map((season) => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSeason === season.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#fdfaf6] text-neutral-600 border border-[#e5e0d8] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
              }`}
            >
              {season.label}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#fdfaf6] border border-[#e5e0d8] flex flex-col justify-between group hover:border-[#1a1a1a] transition-all duration-300"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden bg-neutral-200 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.2em]">
                  {post.category} • {post.season}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3 h-3 text-amber-800" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl italic text-[#1a1a1a] line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="bg-[#faf7f2] border border-[#e5e0d8] text-neutral-600 text-[9px] uppercase tracking-wider px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-3 px-4 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#fdfaf6] border border-[#e5e0d8] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8 text-[#1a1a1a]">
            
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-[#1a1a1a] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer z-20"
              >
                ✕
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="bg-amber-300 text-neutral-950 text-[9px] font-bold px-2.5 py-0.5 uppercase tracking-[0.2em]">
                  {selectedPost.category} Guide
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl italic mt-1 text-white">
                  {selectedPost.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-300 mt-1">By {selectedPost.author} • {selectedPost.date}</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-4 text-neutral-800 leading-relaxed text-xs sm:text-sm whitespace-pre-line font-sans">
              {selectedPost.content}

              <div className="mt-8 pt-6 border-t border-[#e5e0d8] bg-[#faf7f2] p-6 border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg italic text-[#1a1a1a]">Have questions regarding this beauty routine?</p>
                  <p className="text-xs text-neutral-600 mt-0.5">Visit D Makeup Studio at Shakti Chowk or get instant AI analysis.</p>
                </div>
                <button
                  onClick={() => { setSelectedPost(null); onOpenAiAdvisor(); }}
                  className="px-5 py-2.5 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Ask AI Advisor
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

