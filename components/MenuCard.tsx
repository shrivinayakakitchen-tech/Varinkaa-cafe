import React from 'react';
import { MenuItemView } from './MenuItemView';
import type { MenuCategory, MenuItem, SelectedItem } from '../types';

interface MenuCardProps {
  category: MenuCategory;
  selectedItems: Map<string, SelectedItem>;
  onUpdateItem: (item: MenuItem, change: number) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ category, selectedItems, onUpdateItem }) => {
  return (
    <div 
      className="bg-white p-5 rounded-2xl shadow-[0_8px_32px_var(--shadow-color)] transition-transform duration-200 ease-in-out hover:-translate-y-1 animate-[fadeIn_0.5s_ease-in-out] border border-[var(--border-color)]"
      style={{ animationFillMode: 'forwards', opacity: 0 }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="text-[var(--brand-primary)] text-lg font-bold mb-3 border-b border-[var(--border-color)] pb-3">{category.title}</div>
      <div>
        {/* FIX: Corrected the order of parameters in the map function. The first argument is the item, and the second is the index. */}
        {category.items.map((item, index) => (
          <MenuItemView 
            key={item.id} 
            item={item} 
            isLast={index === category.items.length - 1}
            selectedQuantity={selectedItems.get(item.id)?.quantity || 0}
            onUpdate={onUpdateItem}
          />
        ))}
      </div>
    </div>
  );
};
