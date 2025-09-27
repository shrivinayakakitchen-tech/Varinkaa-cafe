import React from 'react';
import type { FilterCategory } from '../types';

interface FiltersProps {
  categories: FilterCategory[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2.5 my-6" role="tablist" aria-label="Filter menu categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`px-4 py-2 rounded-full border-2 font-bold cursor-pointer transition-all duration-200 transform active:scale-95 text-sm ${
            activeFilter === category.id
              ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md shadow-[var(--shadow-color)]'
              : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--brand-secondary)] hover:text-[var(--brand-primary)]'
          } ${activeFilter === 'search' ? '!bg-gray-100 !text-gray-400 !border-gray-200 !cursor-not-allowed' : ''}`}
          disabled={activeFilter === 'search'}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
