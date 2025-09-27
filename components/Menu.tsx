import React from 'react';
import { MenuCard } from './MenuCard';
import type { MenuCategory, MenuItem, SelectedItem } from '../types';

interface MenuProps {
  menuData: MenuCategory[];
  selectedItems: Map<string, SelectedItem>;
  onUpdateItem: (item: MenuItem, change: number) => void;
}

export const Menu: React.FC<MenuProps> = ({ menuData, selectedItems, onUpdateItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
      {menuData.map((category) => (
        <MenuCard 
          key={category.id} 
          category={category} 
          selectedItems={selectedItems}
          onUpdateItem={onUpdateItem}
        />
      ))}
    </div>
  );
};
