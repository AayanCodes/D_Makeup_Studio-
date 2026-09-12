import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, STYLISTS_DATA, STUDIO_INFO } from '../data/salonData';
import { BookingRequest } from '../types';
import { Calendar, CheckCircle, Loader2, Download, ArrowLeft, ArrowRight, Lock, ShieldCheck, QrCode, Copy, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedStylistId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedStylistId
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('stylist-deepika');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('11:00 AM');
  
  // Client details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi' | 'card' | 'netbanking'>('qr');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [upiApp, setUpiApp] = useState<string>('gpay');
  const [upiId, setUpiId] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');

  // Processing & Confirmation
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  // Set initial default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);

    if (preSelectedServiceId) {
      setSelectedServiceIds([preSelectedServiceId]);
    } else {
      setSelectedServiceIds(['serv-hd-bridal']);
    }

    if (preSelectedStylistId) {
      setSelectedStylistId(preSelectedStylistId);
    }
  }, [preSelectedServiceId, preSelectedStylistId, isOpen]);

  if (!isOpen) return null;

  // Calculations
  const selectedServices = SERVICES_DATA.filter(s => selectedServiceIds.includes(s.id));
  const totalAmount = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const totalDeposit = selectedServices.reduce((acc, s) => acc + s.depositAmount, 0);
  const remainingBalance = totalAmount - totalDeposit;

  const availableTimeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:30 PM',
    '03:00 PM', '04:30 PM', '06:00 PM', '07:00 PM'
  ];

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter(sId => sId !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const handleProcessPaymentAndBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setErrorMsg('Please provide your name and valid phone number.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      // Send request to server
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          clientEmail,
          serviceIds: selectedServiceIds,
          stylistId: selectedStylistId,
          bookingDate,
          bookingTime,
          notes,
          totalAmount,
          depositPaid: totalDeposit,
          paymentMethod
        })
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        setStep(5); // Confirmation receipt step
      } else {
        throw new Error(data.error || 'Payment authorization failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans text-[#1a1a1a]">
      <div className="bg-[#fdfaf6] border border-[#e5e0d8] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl my-6">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1a1a1a] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-[#1a1a1a] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl italic">Online Appointment Booking</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300">D Makeup Studio • Shakti Chowk, Bijnor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Bar (If not on receipt) */}
        {step < 5 && (
          <div className="bg-[#faf7f2] px-6 py-3 border-b border-[#e5e0d8] flex items-center justify-between text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-400">
            <span className={step >= 1 ? 'text-[#1a1a1a]' : ''}>1. Services</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#1a1a1a]' : ''}>2. Date & Artist</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#1a1a1a]' : ''}>3. Details</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#1a1a1a]' : ''}>4. Secure Deposit</span>
          </div>
        )}

        <div className="p-6 space-y-6">

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-2xl italic text-[#1a1a1a]">Select Service(s) to Book</h4>
                <p className="text-xs text-neutral-500">Choose one or multiple services. Deposit secures your salon slot.</p>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {SERVICES_DATA.map((srv) => {
                  const isSelected = selectedServiceIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#faf7f2] border-[#1a1a1a]'
                          : 'bg-[#fdfaf6] border-[#e5e0d8] hover:border-[#1a1a1a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#1a1a1a]"
                        />
                        <div>
                          <p className="font-bold text-xs text-[#1a1a1a]">{srv.name}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{srv.durationMinutes} mins • {srv.category}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xs text-[#1a1a1a]">₹{srv.price.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Deposit: ₹{srv.depositAmount}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary Pill */}
              <div className="bg-[#1a1a1a] text-white p-4 flex items-center justify-between text-xs">
                <div>
                  <p className="text-neutral-400">Total Service Value: <span className="text-white font-bold">₹{totalAmount.toLocaleString('en-IN')}</span></p>
                  <p className="text-amber-300 font-bold mt-0.5 text-[10px] uppercase tracking-wider">Required Deposit Now: ₹{totalDeposit.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-white text-[#1a1a1a] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Choose Date</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE, TIME & STYLIST */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-2xl italic text-[#1a1a1a]">Choose Appointment Date & Artist</h4>
                <p className="text-xs text-neutral-500">Pick your preferred date, time slot, and preferred specialist.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Select Specialist / MUA</label>
                  <select
                    value={selectedStylistId}
                    onChange={(e) => setSelectedStylistId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  >
                    {STYLISTS_DATA.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                    <option value="any">Any Available Top Specialist</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-2">Available Time Slots *</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setBookingTime(slot)}
                      className={`py-2 text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        bookingTime === slot
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-[#faf7f2] text-neutral-700 border-[#e5e0d8] hover:border-[#1a1a1a]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-[#1a1a1a] text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Client Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CLIENT DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-2xl italic text-[#1a1a1a]">Your Contact & Event Details</h4>
                <p className="text-xs text-neutral-500">Deposit receipt & appointment details will be sent to your phone/WhatsApp.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Occasion / Special Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Red bridal lehenga, need heavy jewelry setting or skin allergy notes..."
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#e5e0d8] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!clientName || !clientPhone) {
                      setErrorMsg('Please enter your Name and Phone Number.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(4);
                  }}
                  className="px-5 py-2.5 bg-[#1a1a1a] text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>Proceed to Pay Deposit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMsg && <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2 border border-rose-200">{errorMsg}</p>}
            </div>
          )}

          {/* STEP 4: SECURE DEPOSIT PAYMENT CHECKOUT */}
          {step === 4 && (
            <form onSubmit={handleProcessPaymentAndBook} className="space-y-5">
              
              <div className="bg-[#faf7f2] p-4 border border-[#e5e0d8] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#1a1a1a] font-bold">
                  <span className="text-[10px] uppercase tracking-wider">🔒 Secure Deposit Summary</span>
                  <span className="font-serif italic text-base">Amount Due Now: ₹{totalDeposit.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[11px] text-neutral-600 flex justify-between">
                  <span>Selected Services: {selectedServices.map(s => s.name).join(', ')}</span>
                  <span>Balance Due at Studio: ₹{remainingBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-2">Select Payment Option *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`py-2.5 px-2 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'qr'
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xs'
                        : 'bg-[#faf7f2] text-neutral-700 border-[#e5e0d8] hover:border-neutral-400'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>Scan QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-2 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xs'
                        : 'bg-[#faf7f2] text-neutral-700 border-[#e5e0d8] hover:border-neutral-400'
                    }`}
                  >
                    <span>📱 UPI ID</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-2 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xs'
                        : 'bg-[#faf7f2] text-neutral-700 border-[#e5e0d8] hover:border-neutral-400'
                    }`}
                  >
                    <span>💳 Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2.5 px-2 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xs'
                        : 'bg-[#faf7f2] text-neutral-700 border-[#e5e0d8] hover:border-neutral-400'
                    }`}
                  >
                    <span>🏦 NetBanking</span>
                  </button>
                </div>
              </div>

              {/* QR Code Scan Form */}
              {paymentMethod === 'qr' && (
                <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8] space-y-4 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="relative p-3 bg-white border-2 border-amber-300/80 rounded-xl shadow-md inline-block">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          `upi://pay?pa=dmakeupstudio@upi&pn=D%20Makeup%20Studio%20Bijnor&am=${totalDeposit}&cu=INR&tn=Deposit%20for%20Booking`
                        )}&margin=8`}
                        alt="D Makeup Studio Official UPI QR Code"
                        className="w-44 h-44 object-contain rounded"
                      />
                      <div className="absolute inset-x-0 bottom-1 flex justify-center">
                        <span className="bg-[#1a1a1a] text-amber-300 text-[8px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded shadow-xs">
                          Instant Scan & Pay
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider">
                        D MAKEUP STUDIO & ACADEMY
                      </p>
                      <p className="text-[11px] font-medium text-neutral-600">
                        Deposit Amount Due: <strong className="text-amber-700 font-serif text-sm">₹{totalDeposit.toLocaleString('en-IN')}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Copyable UPI VPA section */}
                  <div className="bg-white p-2.5 border border-[#e5e0d8] flex items-center justify-between text-xs max-w-sm mx-auto">
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">Salon UPI ID</span>
                      <span className="font-mono font-bold text-[#1a1a1a] text-xs">dmakeupstudio@upi</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('dmakeupstudio@upi');
                        setCopiedUpi(true);
                        setTimeout(() => setCopiedUpi(false), 2000);
                      }}
                      className="px-2.5 py-1.5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUpi ? 'Copied!' : 'Copy ID'}</span>
                    </button>
                  </div>

                  {/* Direct UPI mobile launch button */}
                  <div className="pt-1 flex flex-col items-center gap-1.5">
                    <a
                      href={`upi://pay?pa=dmakeupstudio@upi&pn=D%20Makeup%20Studio%20Bijnor&am=${totalDeposit}&cu=INR&tn=Deposit%20for%20Booking`}
                      className="w-full max-w-sm py-2 bg-amber-400 text-[#1a1a1a] font-bold text-[10px] uppercase tracking-widest hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 rounded-xs border border-amber-500 shadow-2xs"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Tap to Open UPI App on Phone</span>
                    </a>
                    <p className="text-[10px] text-neutral-500 italic">
                      Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI App
                    </p>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8] space-y-3">
                  <div className="flex items-center gap-4 text-xs">
                    {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                      <label key={app} className="flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider text-[10px]">
                        <input
                          type="radio"
                          name="upiApp"
                          checked={upiApp === app}
                          onChange={() => setUpiApp(app)}
                          className="accent-[#1a1a1a]"
                        />
                        <span>{app}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Enter VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi / username@okaxis"
                      className="w-full px-3 py-2 bg-white border border-[#e5e0d8] text-xs text-[#1a1a1a]"
                    />
                  </div>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8] space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8901"
                      className="w-full px-3 py-2 bg-white border border-[#e5e0d8] text-xs text-[#1a1a1a]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#e5e0d8] text-xs text-[#1a1a1a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#e5e0d8] text-xs text-[#1a1a1a]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Form */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-[#faf7f2] border border-[#e5e0d8]">
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-700 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e5e0d8] text-xs text-[#1a1a1a]"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                  </select>
                </div>
              )}

              {errorMsg && <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2 border border-rose-200">{errorMsg}</p>}

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#1a1a1a] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Authorizing Deposit...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay Deposit ₹{totalDeposit} & Confirm</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                256-Bit SSL Encrypted Payment Gateway • Instant Confirmation
              </p>

            </form>
          )}

          {/* STEP 5: CONFIRMATION & DIGITAL RECEIPT */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center">
              
              <div className="w-14 h-14 bg-[#1a1a1a] text-white flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
                  Payment Authorized & Slot Confirmed
                </span>
                <h4 className="font-serif text-3xl italic text-[#1a1a1a] mt-2">
                  Booking Receipt #{confirmedBooking.id}
                </h4>
                <p className="text-xs text-neutral-600">
                  Thank you, <strong className="text-[#1a1a1a]">{confirmedBooking.clientName}</strong>! Your appointment deposit is received.
                </p>
              </div>

              {/* Printable Receipt Card */}
              <div id="printable-receipt" className="bg-[#faf7f2] p-6 border border-[#e5e0d8] text-left text-xs space-y-4">
                
                <div className="flex justify-between items-start border-b border-[#e5e0d8] pb-3">
                  <div>
                    <p className="font-serif italic text-xl text-[#1a1a1a]">{STUDIO_INFO.name}</p>
                    <p className="text-[10px] text-neutral-500">{STUDIO_INFO.address}, {STUDIO_INFO.city}</p>
                    <p className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Helpline: {STUDIO_INFO.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1a1a1a]">Txn ID: {confirmedBooking.paymentTransactionId}</p>
                    <p className="text-[10px] text-neutral-500">Date: {confirmedBooking.bookingDate}</p>
                    <p className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Time: {confirmedBooking.bookingTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-neutral-700">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Client Details:</p>
                    <p className="font-bold text-[#1a1a1a]">{confirmedBooking.clientName}</p>
                    <p>{confirmedBooking.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Payment Status:</p>
                    <p className="text-emerald-800 font-bold">DEPOSIT PAID (₹{confirmedBooking.depositPaid.toLocaleString('en-IN')})</p>
                    <p className="text-neutral-500">Method: {confirmedBooking.paymentMethod.toUpperCase()}</p>
                  </div>
                </div>

                <div className="border-t border-[#e5e0d8] pt-3">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mb-1">Booked Services:</p>
                  <ul className="space-y-1">
                    {SERVICES_DATA.filter(s => confirmedBooking.serviceIds.includes(s.id)).map(s => (
                      <li key={s.id} className="flex justify-between font-medium">
                        <span>• {s.name}</span>
                        <span>₹{s.price.toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#e5e0d8] pt-3 bg-[#fdfaf6] p-3 border flex justify-between items-center text-xs">
                  <div>
                    <p className="text-neutral-600">Total Price: ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</p>
                    <p className="text-emerald-800 font-bold">Deposit Paid: ₹{confirmedBooking.depositPaid.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Balance at Studio:</p>
                    <p className="font-serif italic text-lg text-[#1a1a1a]">
                      ₹{(confirmedBooking.totalAmount - confirmedBooking.depositPaid).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#faf7f2] text-[#1a1a1a] border border-[#e5e0d8] hover:border-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

