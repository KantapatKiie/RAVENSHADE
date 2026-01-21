import { Footer } from "../components/Footer";
import frontMain from "../assets/front_main.png";
import frontMainDetail from "../assets/front_main_detail.png";

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
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-amber-500/20">
              <img
                src={frontMainDetail}
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
                  href="https://www.google.com/maps?sca_esv=cc34ee859529854e&rlz=1C5CHFA_enTH1182TH1182&output=search&q=oxalis+bar&source=lnms&fbs=ADc_l-a5L-oxxunx5BQU92zbhUnmksqua1A-f08QnDrgMZy0s_yAFoB7a283VuWwXT6YphPDm52vPoyplbEhE-vCVD0Mw5y7HXbrua_DrXLknYUsyXz5TzkEQwfdqPyPPl42oWfIi67J6dvJYQqT793AWSg6D5o8YjL5JsNsgI6X9IjbkGivW6SjYLTtoXG7taIunf8XyBw6T8MoOEzg4RLO3Mp03dT1W3d1t6wQQ7SZB-UIfsoyPwAUhU1jfb9d-Y8k3kUJWN-pXOHz6K6qSGZk4jzZfddn6kRNGvGSkf-9xz0bb5kzii4&entry=mc&ved=1t:200715&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline text-white"
                >
                  <p className="text-lg">
                    714/6-7 Sukhumvit Rd, Klongtan
                    <br />
                    Klongtei, Bangkok 10110
                  </p>
                </a>
              </div>
              <div>
                <p className="text-amber-400/80 text-sm uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-lg">+66 94 896 5465</p>
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
                <span className="text-amber-400">3:00 PM - 11:00 PM</span>
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
