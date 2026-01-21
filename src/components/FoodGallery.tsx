import React from 'react';
export function FoodGallery() {
  return (
    <section className="w-full bg-neutral-950">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Item 1 */}
        <div className="group relative aspect-[4/3] md:aspect-square overflow-hidden cursor-pointer">
          <img
            src="/2_0.png"
            alt="Signature Dish"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-amber-400 font-serif text-2xl italic mb-2">
                Signature
              </p>
              <p className="text-white tracking-[0.2em] text-sm uppercase">
                Ravenshade Dining
              </p>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="group relative aspect-[4/3] md:aspect-square overflow-hidden cursor-pointer">
          <img
            src="/4_0.png"
            alt="Premium Appetizers"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-amber-400 font-serif text-2xl italic mb-2">
                Exquisite
              </p>
              <p className="text-white tracking-[0.2em] text-sm uppercase">
                Taste & Atmosphere
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}