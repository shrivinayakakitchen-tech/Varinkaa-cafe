import React from 'react';
import type { SelectedItem, MenuItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: Map<string, SelectedItem>;
  onUpdateItem: (item: MenuItem, change: number) => void;
  whatsAppUrl: string;
  onBrowseMenu: () => void;
}

const QuantityButton: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean }> = ({ onClick, children, disabled }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className="w-7 h-7 flex items-center justify-center font-bold text-lg bg-gray-100 rounded-full text-[var(--accent-primary)] hover:bg-gray-200 transition-transform duration-150 active:scale-90 transform disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);


export const Cart: React.FC<CartProps> = ({ isOpen, onClose, selectedItems, onUpdateItem, whatsAppUrl, onBrowseMenu }) => {
  const orderItems = Array.from(selectedItems.values());
  
  const totalPrice = orderItems.reduce((total, { item, quantity }) => {
    const price = parseInt(item.price.replace('/-', ''), 10);
    return total + (price * quantity);
  }, 0);

  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} role="dialog" aria-modal="true" aria-labelledby="cart-heading">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true"></div>

      {/* Cart Panel */}
      <div className={`relative w-full max-w-md bg-[var(--bg-primary)] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)] bg-white">
          <h2 id="cart-heading" className="text-xl font-bold text-[var(--text-primary)]">Your Order</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">Your cart is empty</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Add some delicious items from the menu!</p>
              <button
                onClick={onBrowseMenu}
                className="mt-6 px-5 py-2.5 text-sm font-bold bg-[var(--accent-primary)] text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-md shadow-blue-500/30 transform hover:scale-105 active:scale-100"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-color)]">
              {orderItems.map(({ item, quantity }) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="flex-1">
                    <p className="font-bold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <QuantityButton onClick={() => onUpdateItem(item, -1)}>-</QuantityButton>
                     <span className="font-bold w-5 text-center text-[var(--text-primary)]">{quantity}</span>
                     <QuantityButton onClick={() => onUpdateItem(item, 1)}>+</QuantityButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {orderItems.length > 0 && (
          <div className="p-5 border-t border-[var(--border-color)] bg-white shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-[var(--text-secondary)]">Grand Total</span>
              <span className="text-2xl font-bold text-[var(--text-primary)]">{totalPrice}/-</span>
            </div>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl no-underline font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 transition-transform transform hover:scale-102 active:scale-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.05 4.94A9.96 9.96 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.45 1.27 4.94l-1.27 4.68 4.8-1.25c1.45.77 3.08 1.18 4.79 1.18h.01c5.52 0 10-4.48 10-10 0-2.76-1.12-5.26-2.95-7.06zm-7.05 15.21h-.01c-1.55 0-3.05-.44-4.35-1.25l-.31-.18-3.24.84.86-3.15-.2-.32a8.03 8.03 0 0 1-1.28-4.48c0-4.42 3.59-8 8-8s8 3.58 8 8c0 4.42-3.59 8-8 8zM16.49 9.8c-.26-.13-1.56-.77-1.8-0.86-.24-.09-.42-.13-.59.13-.17.26-.68.86-.83 1.02-.15.17-.3.19-.56.06s-1.04-.38-1.99-1.23c-.74-.66-1.23-1.47-1.4-1.72-.17-.25-.02-.38.12-.5.12-.12.26-.31.39-.47.13-.15.17-.25.26-.42.08-.17.04-.31-.02-.44s-.59-1.42-.81-1.92c-.22-.5-.44-.43-.59-.43h-.49c-.17 0-.42.06-.64.31-.22.25-.86.83-.86 2.02s.88 2.34 1 2.5c.12.15 1.75 2.67 4.24 3.73 2.49 1.06 2.49.71 2.94.68.45-.02 1.56-.64 1.78-1.25.22-.62.22-1.15.15-1.25-.07-.1-.24-.16-.5-.29z" />
              </svg>
              <span>Place Order on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};