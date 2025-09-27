import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="p-7 rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-lg mt-4 text-center" aria-label="Hero">
      <div>
        <h2 className="font-playfair text-4xl m-0 mb-2 text-slate-800">Home-cooked taste, served with love</h2>
        <p className="m-0 mb-3.5 text-slate-600">Simple menu. Fresh ingredients, 100% Veg</p>
      </div>
    </section>
  );
};