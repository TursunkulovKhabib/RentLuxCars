import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#E5E5E5] border-b-2 border-primary py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      {/* Логотип */}
      <Link to="/" className="text-2xl md:text-3xl font-medium text-black tracking-tight hover:opacity-80 transition-opacity">
        RentLuxCars
      </Link>

      {/* Кнопка меню (Бургер) */}
      <button
        className="p-2 hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-8 h-8 text-black" strokeWidth={1.5} />
      </button>
    </header>
  );
};
