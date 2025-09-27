import React, { useState, useEffect } from 'react';

interface HeaderProps {
  itemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ itemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 flex items-center justify-between gap-4 p-2 px-1 transition-all duration-300 ${isScrolled ? 'backdrop-saturate-150 backdrop-blur-md bg-white/70 rounded-xl shadow-md' : ''}`}>
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold font-playfair text-2xl shadow-lg flex-shrink-0">
            SV
          </div>
          <div>
            <h1 className="m-0 text-xl font-bold text-slate-800">SHRI VINAYAKA KITCHEN</h1>
            <div className="text-slate-600 text-sm">Fresh • Local • Homely</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Text-based button for medium screens and up */}
          <a className="hidden sm:block bg-blue-50 border border-blue-200/50 px-3 py-2 rounded-lg no-underline text-blue-700 font-bold hover:bg-blue-100 transition-colors" href="tel:+919434320315">
            Call: +91 94343 20315
          </a>
          {/* Icon-based button for small screens */}
          <a className="sm:hidden flex items-center justify-center w-11 h-11 bg-blue-50 border border-blue-200/50 rounded-full no-underline text-blue-700 hover:bg-blue-100 transition-colors active:scale-95" href="tel:+919434320315" aria-label="Call Shri Vinayaka Kitchen">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
           <button 
            onClick={onCartClick}
            className="relative flex items-center justify-center w-11 h-11 bg-blue-50 border border-blue-200/50 rounded-full no-underline text-blue-700 hover:bg-blue-100 transition-colors active:scale-95" 
            aria-label={`Open cart with ${itemCount} items`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};