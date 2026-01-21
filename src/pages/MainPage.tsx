import React from 'react';
import { Hero } from '../components/Hero';
import { InfoSection } from '../components/InfoSection';
import { CapacitySection } from '../components/CapacitySection';
import { FoodGallery } from '../components/FoodGallery';
import { CocktailShowcase } from '../components/CocktailShowcase';
export function MainPage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <InfoSection />
      <CapacitySection />
      <FoodGallery />
      <CocktailShowcase />

      {/* Footer */}
      <footer className="w-full bg-neutral-950 py-12 border-t border-neutral-900 text-center">
        <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Ravenshade Thonglor. All rights
          reserved.
        </p>
      </footer>
    </div>);

}