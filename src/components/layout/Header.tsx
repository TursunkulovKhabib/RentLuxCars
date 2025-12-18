import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const closeMenu = () => setIsMenuOpen(false);

    const LINKS = [
        { name: 'Все машины', path: '/catalog' },
        { name: 'Создать объявление', path: '/create-ad' },
        { name: 'Контакты', path: '/contacts' },
    ];

    return (
        <>
            <header className="sticky top-0 z-[100] w-full bg-[#E5E5E5] border-b-2 border-primary py-4 px-6 flex items-center justify-between shadow-sm">
                <Link to="/" className="text-2xl font-medium text-black tracking-tight z-50 relative" onClick={closeMenu}>
                    RentLuxCars
                </Link>

                {/* Кнопка Бургера */}
                <button
                    className="p-2 z-50 relative hover:bg-black/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </header>

            {/* Затемнение фона */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            />

            {/* Боковое меню */}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-[#E5E5E5] z-40 shadow-2xl transform transition-transform duration-300 ease-in-out pt-24 px-8 flex flex-col gap-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {LINKS.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={closeMenu}
                        className={`text-xl font-medium hover:text-primary uppercase tracking-wide border-b border-gray-300 pb-2 ${location.pathname === link.path ? 'text-primary' : 'text-black'}`}
                    >
                        {link.name}
                    </Link>
                ))}

                {user && (
                    <Link
                        to="/admin"
                        onClick={closeMenu}
                        className={`text-xl font-medium hover:text-primary uppercase tracking-wide border-b border-gray-300 pb-2 ${location.pathname === '/admin' ? 'text-primary' : 'text-black'}`}
                    >
                        Мои объявления
                    </Link>
                )}

                <div className="mt-auto mb-10">
                    {user ? (
                        <Link to="/admin" onClick={closeMenu} className="flex items-center gap-2 text-primary font-bold text-xl">
                            <User className="w-6 h-6" /> Личный кабинет
                        </Link>
                    ) : (
                        <Link to="/login" onClick={closeMenu} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                            Войти в аккаунт
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};
