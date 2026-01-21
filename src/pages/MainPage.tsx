import React from 'react';
import { Hero } from '../components/Hero';
import { InfoSection } from '../components/InfoSection';
import { CapacitySection } from '../components/CapacitySection';
import { FoodGallery } from '../components/FoodGallery';
import { CocktailShowcase } from '../components/CocktailShowcase';
import { Footer } from '../components/Footer';
export function MainPage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <InfoSection />
      <CapacitySection />
      <FoodGallery />
      <CocktailShowcase />
      <Footer />
    </div>);

}