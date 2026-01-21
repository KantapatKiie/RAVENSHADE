import { Wine } from "lucide-react";
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/1_0.png"
          alt="Ravenshade Interior"
          className="h-full w-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 animate-fade-in opacity-90">
          <Wine
            className="h-16 w-16 text-amber-400 mx-auto mb-4 opacity-90"
            strokeWidth={1}
          />
        </div>

        <h1 className="mb-2 text-5xl font-bold tracking-widest text-white sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="block drop-shadow-2xl">RAVENSHADE</span>
        </h1>

        <p className="mb-12 text-xl font-light tracking-[0.3em] text-amber-100/90 sm:text-2xl md:text-3xl">
          THONGLOR
        </p>

        {/* CTA Button */}
        <a
          href="#/reserve"
          className="group relative px-8 py-4 bg-transparent overflow-hidden border border-amber-500/50 hover:border-amber-400 transition-colors duration-300 mt-8"
        >
          <div className="absolute inset-0 w-0 bg-amber-500/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-amber-400 group-hover:text-amber-200 tracking-[0.2em] uppercase text-sm font-medium">
            จองโต๊ะ / Reserve Table
          </span>
        </a>
      </div>

      {/* Bottom Right Tagline */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <p className="text-sm font-light tracking-[0.2em] text-amber-400/80 uppercase border-b border-amber-400/30 pb-1">
          Private Cocktail Bar
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>
      </div>
    </section>
  );
}
