import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, Calendar, RefreshCw } from 'lucide-react';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [skinType, setSkinType] = useState('Combination');
  const [hairType, setHairType] = useState('Frizzy / Dry');
  const [occasion, setOccasion] = useState('HD Bridal Makeup');
  const [season, setSeason] = useState('Monsoon / Humidity');
  const [skinConcerns, setSkinConcerns] = useState('Sweat-proof makeup & glass skin glow');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerateTips = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai/beauty-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skinType,
          hairType,
          occasion,
          season,
          skinConcerns
        })
      });

      const data = await res.json();
      if (data.success && data.consultation) {
        setResult(data.consultation);
      } else {
        throw new Error(data.error || 'Failed to get recommendation');
      }
    } catch (err: any) {
      setError(err.message || 'Server error while generating tips.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans text-[#1a1a1a]">
      <div className="bg-[#fdfaf6] border border-[#e5e0d8] max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e0d8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a1a1a] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl italic text-[#1a1a1a]">AI Beauty & Style Advisor</h3>
              <p className="text-xs text-neutral-500">Personalized consultation by D Makeup Studio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-800 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleGenerateTips} className="space-y-4">
            
            <p className="text-xs text-neutral-600 bg-[#faf7f2] p-3 border border-[#e5e0d8]">
              Tell our AI about your skin type and upcoming occasion to receive custom pre-event skincare checklists & hair styling tips for North Indian climate.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Skin Type</label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                >
                  <option value="Oily / Acne-prone">Oily / Acne-prone</option>
                  <option value="Dry / Flaky">Dry / Flaky</option>
                  <option value="Combination">Combination</option>
                  <option value="Sensitive">Sensitive</option>
                  <option value="Normal">Normal Glow</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Hair Texture</label>
                <select
                  value={hairType}
                  onChange={(e) => setHairType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                >
                  <option value="Frizzy / Unmanageable">Frizzy / Unmanageable</option>
                  <option value="Fine / Thin">Fine / Thin</option>
                  <option value="Thick & Wavy">Thick & Wavy</option>
                  <option value="Chemically Treated">Chemically Treated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Upcoming Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                >
                  <option value="HD Bridal Makeup">HD Bridal Makeup</option>
                  <option value="Engagement / Sangeet Night">Engagement / Sangeet Night</option>
                  <option value="Party / Wedding Guest">Party / Wedding Guest</option>
                  <option value="Pre-Bridal Skincare Prep">Pre-Bridal Skincare Prep</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Current Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                >
                  <option value="Monsoon / Humidity">Monsoon / Humidity</option>
                  <option value="Summer Heat">Summer Heat</option>
                  <option value="Winter Cold">Winter Cold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Main Concern / Goal</label>
              <input
                type="text"
                value={skinConcerns}
                onChange={(e) => setSkinConcerns(e.target.value)}
                placeholder="e.g. Need 12-hour sweat-proof makeup, dark circle conceal"
                className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>

            {error && <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2.5 border border-rose-200">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1a1a1a] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Skin & Climate Needs...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Personal Consultation Plan</span>
                </>
              )}
            </button>

          </form>
        ) : (
          <div className="space-y-4">
            
            <div className="bg-[#faf7f2] p-4 border border-[#e5e0d8] text-xs leading-relaxed text-[#1a1a1a]">
              <p className="font-serif italic text-base font-bold text-[#1a1a1a] mb-1">Master MUA Advice:</p>
              <p>{result.personalizedAdvice}</p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">✨ Pre-Event Skincare Checklist:</p>
              <ul className="space-y-1 text-xs text-neutral-700">
                {result.preEventSkincareTips?.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5 bg-[#faf7f2] p-2 border border-[#e5e0d8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.hairStylingTip && (
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">💇‍♀️ Hair Care Recommendation:</p>
                <div className="bg-[#faf7f2] p-2.5 border border-[#e5e0d8] text-xs text-neutral-700">
                  {Array.isArray(result.hairStylingTip) ? result.hairStylingTip.join(' • ') : result.hairStylingTip}
                </div>
              </div>
            )}

            <div className="p-4 bg-[#1a1a1a] text-white border border-[#e5e0d8] text-xs flex justify-between items-center">
              <div>
                <p className="text-[9px] text-amber-300 font-bold uppercase tracking-widest">Recommended Package:</p>
                <p className="font-serif italic text-base text-white">{result.recommendedStudioPackage}</p>
              </div>
              <button
                onClick={() => { onClose(); onOpenBooking(); }}
                className="px-4 py-2 bg-white text-[#1a1a1a] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 cursor-pointer flex items-center gap-1 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Package</span>
              </button>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setResult(null)}
                className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-600 hover:text-[#1a1a1a] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Different Parameters</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#faf7f2] text-[#1a1a1a] border border-[#e5e0d8] hover:border-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

