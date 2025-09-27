import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-7 text-center text-slate-500 text-sm">
      © {new Date().getFullYear()} Varnikaa cafe
    </footer>
  );
};