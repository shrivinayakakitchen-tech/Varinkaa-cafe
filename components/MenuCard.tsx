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
      className="bg-white p-4 rounded-xl shadow-[0_12px_28px_rgba(11,10,8,0.04)] transition-transform duration-150 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(11,10,8,0.06)] animate-[fadeIn_0.5s_ease-in-out]"
      style={{ animationFillMode: 'forwards', opacity: 0 }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="text-blue-800 font-extrabold mb-2.5">{category.title}</div>
      <div>
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