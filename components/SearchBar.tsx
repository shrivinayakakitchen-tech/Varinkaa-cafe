import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, isLoading }) => {
  return (
    <div className="my-6 relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Ask AI to find a dish... e.g., 'cheesy snack'"
        className="w-full px-5 py-3.5 pl-10 pr-16 rounded-full border-2 border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-all duration-200 bg-white shadow-sm placeholder-gray-400"
        aria-label="Search for a dish with AI"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-[var(--accent-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <div className="text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] px-1.5 py-0.5 rounded-md pointer-events-none">
            ✨ AI
          </div>
        )}
      </div>
    </div>
  );
};