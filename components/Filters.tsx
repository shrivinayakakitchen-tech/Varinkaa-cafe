import React from 'react';
import type { FilterCategory } from '../types';

interface FiltersProps {
  categories: FilterCategory[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2.5 my-5" role="tablist" aria-label="Filter menu categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`px-3.5 py-2 rounded-full border font-bold cursor-pointer transition-all duration-200 transform active:scale-95 ${
            activeFilter === category.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white/50 text-blue-800 border-blue-200 hover:bg-white hover:border-blue-400 hover:scale-105'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
