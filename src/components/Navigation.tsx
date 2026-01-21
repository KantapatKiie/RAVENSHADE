import React from 'react';
import { Wine } from 'lucide-react';
interface NavigationProps {
  currentPage: string;
}
export function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#/" className="flex items-center gap-3 group">
          <Wine
            className="h-6 w-6 text-amber-400 group-hover:text-amber-300 transition-colors"
            strokeWidth={1.5} />

          <span className="font-serif text-xl text-white tracking-wider group-hover:text-amber-100 transition-colors">
            RAVENSHADE
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a
            href="#/"
            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 ${currentPage === 'main' ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-neutral-400'}`}>

            Home
          </a>
          <a
            href="#/about"
            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 ${currentPage === 'about' ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-neutral-400'}`}>

            About
          </a>
          <a
            href="#/menu"
            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 ${currentPage === 'menu' ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-neutral-400'}`}>

            Menu
          </a>
          <a
            href="#/reserve"
            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-400 ${currentPage === 'reserve' ? 'text-amber-400 border-b border-amber-400 pb-1' : 'text-neutral-400'}`}>

            Reserve
          </a>
        </div>
      </div>
    </nav>);

}