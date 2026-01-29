import { Footer } from "../components/Footer";
import frontMain from "../assets/front_main.png";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={frontMain}
            alt="Ravenshade Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6 tracking-wide">
              About Us
            </h1>
            <p className="text-amber-400/90 text-lg md:text-xl tracking-[0.3em] uppercase">
              Where Elegance Meets Flavor
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              <p>
                Nestled in the heart of Thonglor, Bangkok, Ravenshade represents
                the perfect fusion of contemporary elegance and timeless
                culinary artistry. Since our establishment, we have been
                committed to creating an unforgettable dining experience that
                transcends the ordinary.
              </p>
              <p>
                Our name, Ravenshade, embodies the mystique and sophistication
                we bring to every aspect of our restaurant—from the carefully
                curated ambiance to the meticulously crafted dishes that grace
                your table.
              </p>
              <p>
                We believe that dining is not just about sustenance; it's about
                creating memories, celebrating moments, and savoring the
                artistry that goes into every plate.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-sm border border-amber-500/20">
              <img
                src={frontMain}
                alt="Ravenshade Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-amber-500/30 -z-10"></div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-12 text-center">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="text-amber-400 text-4xl mb-4">🍷</div>
              <h3 className="font-serif text-2xl text-white mb-4">
                Crafted Cocktails
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Our bartenders are artists, crafting each cocktail with
                precision and passion. From classic favorites to innovative
                creations, every drink tells a story.
              </p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="text-amber-400 text-4xl mb-4">🍝</div>
              <h3 className="font-serif text-2xl text-white mb-4">
                Culinary Excellence
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                We source the finest ingredients to create dishes that celebrate
                both Italian tradition and contemporary innovation. Every plate
                is a masterpiece.
              </p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="text-amber-400 text-4xl mb-4">✨</div>
              <h3 className="font-serif text-2xl text-white mb-4">
                Elegant Ambiance
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Our carefully designed space creates an atmosphere of refined
                sophistication, perfect for intimate dinners, celebrations, or
                exclusive events.
              </p>
            </div>
          </div>
        </div>

        {/* HOUSE POLICY Section */}
        <div className="mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-12 text-center">
            House Policy
          </h2>
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-amber-500/20 p-8 md:p-12 rounded-sm max-w-4xl mx-auto">
            <div className="space-y-8 text-neutral-300 leading-relaxed">
              {/* Dress Code */}
              <div>
                <h3 className="text-amber-400 text-xl font-serif mb-3">Dress Code: Smart Casual</h3>
                <p className="mb-2">No slippers/flip-flops and no athletic wear.</p>
                <p className="text-sm text-neutral-400 italic">
                  RAVENSHADE reserves the right to decline entry or service if we feel attire is not appropriate for the venue.
                </p>
              </div>

              {/* Conduct */}
              <div>
                <p className="mb-3">
                  We welcome you to unwind and enjoy your evening. However, we kindly ask all guests to take responsibility for themselves and to respect our space and property.
                </p>
              </div>

              {/* Cleaning Fee */}
              <div className="bg-red-950/20 border border-red-500/20 p-6 rounded">
                <p className="text-red-300">
                  <strong className="text-red-400">Important:</strong> If cleaning is required due to vomiting within the premises, a <strong>3,000 THB cleaning fee</strong> will be added to your bill immediately. This fee is paid directly to the staff member responsible for the clean-up.
                </p>
                <p className="text-neutral-400 text-sm mt-2 italic">
                  Thank you for your kind understanding.
                </p>
              </div>

              {/* Contact Information */}
              <div className="border-t border-neutral-800 pt-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-amber-400 font-medium mb-3">Reservations</h4>
                    <p className="text-sm">Line Official: <a href="https://line.me/R/ti/p/@ravenshade.bkk" className="text-amber-400 hover:underline">@ravenshade.bkk</a></p>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-medium mb-3">Venue Hire / Private Event</h4>
                    <p className="text-sm">Email: <a href="mailto:ravenshade.bkk@gmail.com" className="text-amber-400 hover:underline">ravenshade.bkk@gmail.com</a></p>
                    <p className="text-sm">Line Official: <a href="https://line.me/R/ti/p/@ravenshade.bkk" className="text-amber-400 hover:underline">@ravenshade.bkk</a></p>
                    <p className="text-sm">Tel: <a href="tel:+66826954956" className="text-amber-400 hover:underline">082-695-4956</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-sm">
            <h3 className="font-serif text-3xl text-amber-400 mb-6">
              Visit Us
            </h3>
            <div className="space-y-4 text-neutral-300">
              <div>
                <p className="text-amber-400/80 text-sm uppercase tracking-wider mb-1">
                  Location
                </p>
                <a
                  href="https://maps.app.goo.gl/JyBvn3vDZ9Ayx9Ei9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  <p className="text-lg">
                    141, 2nd floor, UR Thonglor 13 alley
                    <br />
                    Klongton-Nua Watthana, Bangkok 10110
                  </p>
                </a>
              </div>
              <div>
                <p className="text-amber-400/80 text-sm uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:+66826954956"
                  className="hover:text-amber-400 transition-colors"
                >
                  <p className="text-lg">082 695 4956</p>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-sm">
            <h3 className="font-serif text-3xl text-amber-400 mb-6">
              Opening Hours
            </h3>
            <div className="space-y-3 text-neutral-300">
              <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                <span>Tuesday - Sunday</span>
                <span className="text-amber-400">6:00 PM - Until Late</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Monday</span>
                <span className="text-red-400">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            Experience Ravenshade
          </h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
            Join us for an extraordinary dining experience where every detail is
            crafted to perfection.
          </p>
          <a
            href="#/reserve"
            className="inline-block px-12 py-4 bg-transparent border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:text-amber-300 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-0 bg-amber-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative tracking-[0.2em] uppercase text-sm font-medium">
              Make a Reservation
            </span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
