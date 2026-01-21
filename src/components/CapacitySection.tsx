import React from 'react';
import { Wine } from 'lucide-react';
export function CapacitySection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/1-1_0.png"
          alt="Venue Capacity"
          className="h-full w-full object-cover" />

        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="bg-amber-950/30 backdrop-blur-md border border-amber-500/20 p-8 md:p-16 text-center rounded-sm shadow-2xl">
          {/* Header Icon */}
          <div className="mb-10 flex justify-center">
            <Wine className="h-10 w-10 text-amber-200/80" strokeWidth={1} />
          </div>

          {/* Main Capacity Info */}
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-lg md:text-xl text-amber-100 tracking-[0.15em] uppercase font-light mb-2">
                Maximum Capacity
              </h3>
              <p className="text-3xl md:text-4xl font-serif text-white">
                40 Seats
              </p>
            </div>

            <div className="w-16 h-px bg-amber-500/30 mx-auto"></div>

            <div>
              <h3 className="text-lg md:text-xl text-amber-100 tracking-[0.15em] uppercase font-light mb-2">
                Private Event Capacity
              </h3>
              <p className="text-3xl md:text-4xl font-serif text-white">
                60 Persons
              </p>
            </div>
          </div>

          {/* Pricing & Contact */}
          <div className="space-y-6 bg-black/20 p-8 rounded-sm border border-white/5">
            <div className="space-y-2">
              <p className="text-neutral-300 font-light text-lg">
                สำหรับ PRIVATE EVENT
              </p>
              <p className="text-2xl md:text-3xl text-amber-400 font-serif">
                เริ่มต้นที่ 40,000 THB
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-neutral-300 font-light">
                สอบถามรายละเอียดเพิ่มเติม
              </p>
              <p className="text-xl text-white tracking-wide">
                K.รัก 082-695-4956
              </p>
            </div>
          </div>

          {/* Social Link */}
          <div className="mt-10">
            <a
              href="https://www.facebook.com/ravenshade.thonglor"
              className="text-xs md:text-sm text-amber-500/70 hover:text-amber-400 tracking-[0.2em] uppercase transition-colors border-b border-transparent hover:border-amber-400">

              facebook.com/ravenshade.thonglor
            </a>
          </div>
        </div>
      </div>
    </section>);

}