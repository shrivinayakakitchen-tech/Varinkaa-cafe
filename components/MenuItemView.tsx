import React from 'react';
import type { MenuItem } from '../types';

interface MenuItemViewProps {
  item: MenuItem;
  isLast: boolean;
  selectedQuantity: number;
  onUpdate: (item: MenuItem, change: number) => void;
}

const QuantityButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="w-8 h-8 flex items-center justify-center font-bold text-lg bg-gray-100 rounded-full text-blue-700 hover:bg-gray-200 transition-transform duration-150 active:scale-90 transform">
    {children}
  </button>
);

export const MenuItemView: React.FC<MenuItemViewProps> = ({ item, isLast, selectedQuantity, onUpdate }) => {
  const handleAdd = () => onUpdate(item, 1);
  const handleIncrease = () => onUpdate(item, 1);
  const handleDecrease = () => onUpdate(item, -1);

  return (
    <div className={`flex items-center py-2.5 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-sky-100/70 ${!isLast ? 'border-b border-dashed border-black/5' : ''}`}>
      <div className="flex-grow">
        <div className="font-bold">{item.name}</div>
        {item.description && <div className="text-sm text-[#7a6a56]">{item.description}</div>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        <div className="font-extrabold text-[#4b4b4b] w-12 text-right">{item.price}</div>
        {selectedQuantity === 0 ? (
          <button onClick={handleAdd} className="px-3 py-1.5 text-xs font-bold bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-150 shadow-sm transform hover:scale-105 active:scale-95">
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full p-1">
            <QuantityButton onClick={handleDecrease}>-</QuantityButton>
            <span className="font-bold w-4 text-center">{selectedQuantity}</span>
            <QuantityButton onClick={handleIncrease}>+</QuantityButton>
          </div>
        )}
      </div>
    </div>
  );
};