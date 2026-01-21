import React from 'react';
import { ReservationSection } from '../components/ReservationSection';
export function ReservePage() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 animate-fade-in">
      <ReservationSection />

      {/* Footer */}
      <footer className="w-full bg-neutral-950 py-12 border-t border-neutral-900 text-center">
        <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Ravenshade Thonglor. All rights
          reserved.
        </p>
      </footer>
    </div>);

}