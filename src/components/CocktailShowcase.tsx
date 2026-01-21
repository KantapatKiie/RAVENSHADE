import React from 'react';
export function CocktailShowcase() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/7_0.png"
          alt="Cocktail Selection"
          className="h-full w-full object-cover object-center" />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 drop-shadow-lg">
          Crafted Perfection
        </h2>
        <p className="text-amber-200/80 text-lg md:text-xl tracking-widest font-light max-w-xl drop-shadow-md">
          EXPERIENCE OUR SIGNATURE SELECTION
        </p>
      </div>
    </section>);

}