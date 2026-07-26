import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceMenu } from './components/ServiceMenu';
import { TransformationGallery } from './components/TransformationGallery';
import { StylistProfiles } from './components/StylistProfiles';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { ContactAndMap } from './components/ContactAndMap';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BookingLookupModal } from './components/BookingLookupModal';
import { AiConsultantModal } from './components/AiConsultantModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [preSelectedStylistId, setPreSelectedStylistId] = useState<string | undefined>(undefined);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedStylistId(stylistId);
    setIsBookingOpen(true);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-rose-200 selection:text-rose-900 antialiased">
      {/* Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
          onExploreMenu={handleExploreMenu}
        />

        <ServiceMenu
          onSelectServiceToBook={(srvId) => handleOpenBooking(srvId)}
        />

        <TransformationGallery
          onOpenBooking={() => handleOpenBooking('serv-hd-bridal')}
        />

        <StylistProfiles
          onSelectStylistToBook={(stId) => handleOpenBooking(undefined, stId)}
        />

        <Testimonials />

        <BlogSection
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        <ContactAndMap />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Booking Modal with Deposit Payment */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedStylistId={preSelectedStylistId}
      />

      {/* Receipt Lookup Modal */}
      <BookingLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />

      {/* AI Beauty Advisor Modal */}
      <AiConsultantModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
