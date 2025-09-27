import React from 'react';
import { MenuItemView } from './MenuItemView';
import type { MenuCategory, MenuItem, SelectedItem, AiRecommendation } from '../types';

interface AiSearchResultsProps {
  recommendations: AiRecommendation[];
  menuData: MenuCategory[];
  selectedItems: Map<string, SelectedItem>;
  onUpdateItem: (item: MenuItem, change: number) => void;
}

// Helper to find an item by ID from the full menuData
const findItemById = (id: string, menuData: MenuCategory[]): MenuItem | null => {
  for (const category of menuData) {
    const foundItem = category.items.find(item => item.id === id);
    if (foundItem) {
      return foundItem;
    }
  }
  return null;
};

export const AiSearchResults: React.FC<AiSearchResultsProps> = ({ recommendations, menuData, selectedItems, onUpdateItem }) => {
  return (
    <div 
      className="bg-white p-5 rounded-2xl shadow-[0_8px_32px_var(--shadow-color)] animate-[fadeIn_0.5s_ease-in-out] border border-[var(--border-color)]"
      style={{ animationFillMode: 'forwards', opacity: 0 }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="text-[var(--brand-primary)] text-lg font-bold mb-3 border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
        ✨ AI Recommendations
      </div>
      <div>
        {recommendations.map((rec, index) => {
          const item = findItemById(rec.id, menuData);
          if (!item) return null;

          return (
            <MenuItemView 
              key={item.id} 
              item={item} 
              isLast={index === recommendations.length - 1}
              selectedQuantity={selectedItems.get(item.id)?.quantity || 0}
              onUpdate={onUpdateItem}
              recommendationReason={rec.reason}
            />
          );
        })}
      </div>
    </div>
  );
};
