import { Wine, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Wine className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
              <span className="font-serif text-xl text-white tracking-wider">
                RAVENSHADE
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Exclusive cocktail bar & restaurant in the heart of Thonglor
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#/"
                  className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#/menu"
                  className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#/reserve"
                  className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-neutral-400 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <a
                  href="https://maps.app.goo.gl/JyBvn3vDZ9Ayx9Ei9"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  141, 2nd floor, UR Thonglor 13 alley, Klongton-Nua Watthana, Bangkok, Thailand, 10110
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href="tel:+66826954956"
                  className="hover:text-amber-400 transition-colors"
                >
                  082 695 4956
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href="mailto:ravenshade.bkk@gmail.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  ravenshade.bkk@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider">
              Hours
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              Tuesday - Sunday
              <br />
              6:00 PM - Until Late
              <br />
              <span className="text-red-400">Monday: Closed</span>
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/ravenshade.thonglor/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg hover:scale-110 transition-transform duration-300"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/ravenshade.thonglor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1877F2] rounded-lg hover:scale-110 transition-transform duration-300"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-900 text-center">
          <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Ravenshade Thonglor. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
