import React, { useState } from 'react';
import type { MenuItem } from '../types';

interface MenuItemViewProps {
  item: MenuItem;
  isLast: boolean;
  selectedQuantity: number;
  onUpdate: (item: MenuItem, change: number) => void;
  recommendationReason?: string;
}

const QuantityButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="w-8 h-8 flex items-center justify-center font-bold text-lg bg-gray-100 rounded-full text-[var(--accent-primary)] hover:bg-gray-200 transition-transform duration-150 active:scale-90 transform">
    {children}
  </button>
);

export const MenuItemView: React.FC<MenuItemViewProps> = ({ item, isLast, selectedQuantity, onUpdate, recommendationReason }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAdd = () => {
    onUpdate(item, 1);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1200);
  };

  const handleIncrease = () => onUpdate(item, 1);
  const handleDecrease = () => onUpdate(item, -1);

  return (
    <div className={`flex items-center py-3 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-gray-50/70 ${!isLast ? 'border-b border-dashed border-gray-200' : ''}`}>
      <div className="flex-grow">
        <div className="font-bold text-[var(--text-primary)]">{item.name}</div>
        {recommendationReason ? (
          <div className="mt-1 text-sm text-[var(--text-secondary)] italic">
            &ldquo;{recommendationReason}&rdquo;
          </div>
        ) : item.description ? (
          <div className="text-sm text-[var(--text-secondary)]">{item.description}</div>
        ) : null}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <div className="font-bold text-[var(--text-primary)] w-14 text-right">{item.price}</div>
        <div className="w-28 h-9 flex items-center justify-center"> {/* Container to prevent layout shift */}
          {(() => {
            if (showConfirmation) {
              return (
                <div 
                  className="flex items-center justify-center gap-1.5 w-full h-full text-sm font-bold bg-green-500 text-white rounded-full shadow-sm animate-confirm"
                  aria-live="polite"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Added</span>
                </div>
              );
            }

            if (selectedQuantity > 0) {
              return (
                <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                  <QuantityButton onClick={handleDecrease}>-</QuantityButton>
                  <span className="font-bold w-4 text-center text-[var(--text-primary)]">{selectedQuantity}</span>
                  <QuantityButton onClick={handleIncrease}>+</QuantityButton>
                </div>
              );
            }

            return (
              <button onClick={handleAdd} className="px-4 py-1.5 text-sm font-bold bg-[var(--accent-cta)] text-white rounded-full hover:bg-[var(--accent-cta-hover)] transition-all duration-150 shadow-sm transform hover:scale-105 active:scale-95">
                Add
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
