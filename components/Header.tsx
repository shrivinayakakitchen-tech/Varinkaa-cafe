import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  itemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ itemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevItemCount = useRef(itemCount);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    prevItemCount.current = itemCount;
  }, [itemCount]);

  return (
    <header className={`sticky top-4 z-40 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg bg-white/80 rounded-2xl shadow-lg shadow-[var(--shadow-color)] border border-gray-200/80' : ''}`}>
      <div className="flex items-center justify-between gap-4 p-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-extrabold font-playfair text-2xl shadow-inner flex-shrink-0">
            VC
          </div>
          <div>
            <h1 className="m-0 text-xl font-bold text-[var(--text-primary)]">VARNIKAA CAFE</h1>
            <div className="text-[var(--text-secondary)] text-sm">Fresh • Local • Homely</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a className="hidden sm:flex items-center justify-center h-11 px-4 bg-white border border-[var(--border-color)] rounded-full no-underline text-[var(--text-primary)] font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95" href="tel:+919434320315">
            Call
          </a>
          <a className="sm:hidden flex items-center justify-center w-11 h-11 bg-white border border-[var(--border-color)] rounded-full no-underline text-[var(--text-primary)] hover:bg-gray-50 transition-colors active:scale-95" href="tel:+919434320315" aria-label="Call Varnikaa cafe">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
           <button 
            onClick={onCartClick}
            className={`relative flex items-center justify-center w-11 h-11 bg-[var(--accent-primary)] rounded-full text-white hover:bg-blue-600 transition-all duration-200 active:scale-95 shadow-md shadow-blue-500/30 ${isAnimating ? 'cart-animate' : ''}`} 
            aria-label={`Open cart with ${itemCount} items`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};