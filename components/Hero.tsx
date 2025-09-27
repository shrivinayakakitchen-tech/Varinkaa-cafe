import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-[0_8px_32px_var(--shadow-color)] mt-6 text-center border border-[var(--border-color)]" aria-label="Hero">
      <div>
        <h2 className="font-playfair text-4xl m-0 mb-2 text-[var(--brand-primary)]">Home-cooked taste, served with love</h2>
        <p className="m-0 mb-3.5 text-lg text-[var(--text-secondary)]">Simple menu. Fresh ingredients, 100% Veg</p>
      </div>
    </section>
  );
};