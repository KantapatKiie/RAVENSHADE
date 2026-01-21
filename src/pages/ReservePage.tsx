import React from 'react';
import { ReservationSection } from '../components/ReservationSection';
import { Footer } from '../components/Footer';
export function ReservePage() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 animate-fade-in">
      <ReservationSection />
      <Footer />
    </div>);

}