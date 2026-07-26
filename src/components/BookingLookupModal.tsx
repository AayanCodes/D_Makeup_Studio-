import React, { useState } from 'react';
import { Search, Loader2, Download } from 'lucide-react';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingLookupModal: React.FC<BookingLookupModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 5) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResults(null);

    try {
      const res = await fetch(`/api/bookings/lookup/${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.bookings);
      } else {
        throw new Error(data.error || 'Search failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to fetch booking details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans text-[#1a1a1a]">
      <div className="bg-[#fdfaf6] border border-[#e5e0d8] max-w-lg w-full p-6 shadow-2xl space-y-5 my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
          <div>
            <h3 className="font-serif text-2xl italic text-[#1a1a1a]">Find My Booking & Receipt</h3>
            <p className="text-xs text-neutral-500">Lookup appointment status using your registered phone number</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-800 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number (e.g. 8650367876)"
            className="flex-1 px-3.5 py-2.5 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Search</span>
          </button>
        </form>

        {errorMsg && <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2 border border-rose-200">{errorMsg}</p>}

        {/* Results */}
        {results !== null && (
          <div className="space-y-4 pt-2 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-xs text-neutral-500 text-center py-6 bg-[#faf7f2] border border-[#e5e0d8]">
                No active bookings found for phone <strong className="text-[#1a1a1a]">{phone}</strong>.
              </p>
            ) : (
              results.map((bk) => (
                <div key={bk.id} className="bg-[#faf7f2] p-4 border border-[#e5e0d8] text-xs space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
                        ✓ DEPOSIT PAID
                      </span>
                      <p className="font-serif italic text-lg text-[#1a1a1a] mt-1">Booking #{bk.id}</p>
                      <p className="text-[11px] text-neutral-500">Client: {bk.clientName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#1a1a1a]">Date: {bk.bookingDate}</p>
                      <p className="text-neutral-600 font-semibold">{bk.bookingTime}</p>
                    </div>
                  </div>

                  <div className="border-t border-[#e5e0d8] pt-2 flex justify-between items-center text-[11px]">
                    <div>
                      <p className="text-neutral-500">Total: ₹{bk.totalAmount}</p>
                      <p className="text-emerald-800 font-bold">Deposit Paid: ₹{bk.depositPaid}</p>
                      <p className="text-amber-900 font-bold">Balance at Salon: ₹{bk.totalAmount - bk.depositPaid}</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[9px] uppercase tracking-[0.15em] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

