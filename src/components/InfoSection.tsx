import React from 'react';
export function InfoSection() {
  return (
    <section className="relative w-full bg-neutral-900 py-20 md:py-32">
      {/* Background texture/image if needed, using a subtle dark pattern or just color */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
          {/* Hours - Left Side */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right space-y-6">
            <div className="w-full max-w-md space-y-6 border-r-0 border-amber-500/20 md:border-r md:pr-12">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-wide">
                OPEN HOUR
              </h2>

              <div className="space-y-2">
                <p className="text-xl md:text-2xl text-amber-400 font-light tracking-wider">
                  6:00 PM – UNTIL LATE
                </p>
                <p className="text-sm md:text-base text-neutral-400 tracking-[0.2em] uppercase">
                  Tuesday – Sunday
                </p>
                <p className="text-sm md:text-base text-red-400 tracking-[0.2em] uppercase mt-2">
                  Monday: Closed
                </p>
              </div>

              <div className="pt-8 space-y-3">
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <span className="h-px w-8 bg-amber-500/50"></span>
                  <p className="text-neutral-300 tracking-widest text-sm">
                    DINE-IN AVAILABLE
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <span className="h-px w-8 bg-amber-500/50"></span>
                  <p className="text-neutral-300 tracking-widest text-sm">
                    PARKING AVAILABLE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location - Right Side */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <div className="w-full max-w-md space-y-6 md:pl-12">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-wide">
                THONGLOR 13
              </h2>

              <div className="space-y-2 font-light text-neutral-300 text-lg md:text-xl leading-relaxed">
                <p>141, 2ND FLOOR,</p>
                <p>UR THONGLOR 13 ALLEY,</p>
                <p>KLONGTON-NUA WATTHANA,</p>
                <p>BANGKOK, THAILAND 10110</p>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href="https://maps.app.goo.gl/JyBvn3vDZ9Ayx9Ei9"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border border-amber-500/30 px-8 py-3 text-sm tracking-[0.2em] text-amber-400 hover:bg-amber-500/10 transition-colors duration-300 uppercase">
                  Ravenshade Location
                </a>
                <span className="block text-neutral-500 text-xs">or</span>
                <a
                  href="https://maps.app.goo.gl/j3GmVJfD8x4UStWq7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border border-amber-500/30 px-8 py-3 text-sm tracking-[0.2em] text-amber-400 hover:bg-amber-500/10 transition-colors duration-300 uppercase">
                  Car Park
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}