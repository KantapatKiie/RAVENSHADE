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
                <span>123 Thonglor Soi 10, Bangkok 10110</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href="tel:+6621234567"
                  className="hover:text-amber-400 transition-colors"
                >
                  +66 2 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href="mailto:info@ravenshade.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  info@ravenshade.com
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
              Mon - Sun
              <br />
              6:00 PM - 2:00 AM
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-900 rounded-lg hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-900 rounded-lg hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
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
