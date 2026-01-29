import React, { useState } from 'react';
import { Wine, Menu, X } from 'lucide-react';
interface NavigationProps {
  currentPage: string;
}
export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '#/', label: 'Home', page: 'main' },
    { href: '#/about', label: 'About', page: 'about' },
    { href: '#/menu', label: 'Menu', page: 'menu' },
    { href: '#/reserve', label: 'Reserve', page: 'reserve' },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#/" className="flex items-center gap-3 group flex-shrink-0">
            <Wine
              className="h-6 w-6 text-amber-400 group-hover:text-amber-300 transition-colors"
              strokeWidth={1.5} />

            <span className="font-serif text-xl text-white tracking-wider group-hover:text-amber-100 transition-colors">
              RAVENSHADE
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.page}
                href={item.href}
                className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 whitespace-nowrap ${currentPage === item.page ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-neutral-400'}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-400 hover:text-amber-300 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-amber-500/20 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.page}
                  href={item.href}
                  onClick={handleMenuClick}
                  className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 py-2 ${currentPage === item.page ? 'text-amber-400 border-l-2 border-amber-400 pl-4' : 'text-neutral-400 pl-4'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </nav>);

}