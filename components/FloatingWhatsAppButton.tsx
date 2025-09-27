import React from 'react';
import type { SelectedItem } from '../types';

interface OrderSummaryBarProps {
  selectedItems: Map<string, SelectedItem>;
  whatsAppUrl: string;
}

export const OrderSummaryBar: React.FC<OrderSummaryBarProps> = ({ selectedItems, whatsAppUrl }) => {
  const orderItems = Array.from(selectedItems.values());
  const itemCount = orderItems.reduce((total, { quantity }) => total + quantity, 0);
  const totalPrice = orderItems.reduce((total, { item, quantity }) => {
    const price = parseInt(item.price.replace('/-', ''), 10);
    return total + (price * quantity);
  }, 0);

  const isVisible = itemCount > 0;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
      aria-live="polite"
      role="status"
    >
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded-full no-underline font-extrabold bg-green-500 hover:bg-green-600 text-white shadow-xl transition-transform transform hover:scale-105 active:scale-95"
        aria-label={`Order ${itemCount} items for a total of ${totalPrice} rupees on WhatsApp`}
      >
        <div className="pl-5 py-2.5">
          <div className="font-bold text-sm leading-tight">{itemCount} {itemCount > 1 ? 'items' : 'item'}</div>
          <div className="font-extrabold text-lg leading-tight">{totalPrice}/-</div>
        </div>
        <div className="h-8 w-px bg-white/25 mx-3"></div>
        <div className="flex items-center gap-2 pr-5">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.05 4.94A9.96 9.96 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.45 1.27 4.94l-1.27 4.68 4.8-1.25c1.45.77 3.08 1.18 4.79 1.18h.01c5.52 0 10-4.48 10-10 0-2.76-1.12-5.26-2.95-7.06zm-7.05 15.21h-.01c-1.55 0-3.05-.44-4.35-1.25l-.31-.18-3.24.84.86-3.15-.2-.32a8.03 8.03 0 0 1-1.28-4.48c0-4.42 3.59-8 8-8s8 3.58 8 8c0 4.42-3.59 8-8 8zM16.49 9.8c-.26-.13-1.56-.77-1.8-0.86-.24-.09-.42-.13-.59.13-.17.26-.68.86-.83 1.02-.15.17-.3.19-.56.06s-1.04-.38-1.99-1.23c-.74-.66-1.23-1.47-1.4-1.72-.17-.25-.02-.38.12-.5.12-.12.26-.31.39-.47.13-.15.17-.25.26-.42.08-.17.04-.31-.02-.44s-.59-1.42-.81-1.92c-.22-.5-.44-.43-.59-.43h-.49c-.17 0-.42.06-.64.31-.22.25-.86.83-.86 2.02s.88 2.34 1 2.5c.12.15 1.75 2.67 4.24 3.73 2.49 1.06 2.49.71 2.94.68.45-.02 1.56-.64 1.78-1.25.22-.62.22-1.15.15-1.25-.07-.1-.24-.16-.5-.29z" />
            </svg>
          <span className="font-bold">Order Now</span>
        </div>
      </a>
    </div>
  );
};