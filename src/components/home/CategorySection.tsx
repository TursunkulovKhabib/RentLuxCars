import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { setFilter } from '../../features/cars/carsSlice';

const CATEGORIES = [
    {
        id: 'executive',
        title: 'Executive',
        image: '/images/categories/executive.jpg',
        fontClass: 'font-garamond text-6xl tracking-normal', // Шрифт Garamond
    },
    {
        id: 'sport',
        title: 'Sports',
        image: '/images/categories/sports.jpg',
        fontClass: 'font-island text-8xl tracking-wide', // Шрифт Island Moments (крупнее, так как он рукописный)
    },
    {
        id: 'family',
        title: 'Family',
        image: '/images/categories/family.jpg',
        fontClass: 'font-sans text-5xl tracking-widest font-light', // Обычный Montserrat
    }
];

export const CategorySection: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <section className="py-6 px-4 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                    <Link
                        key={cat.id}
                        to="/catalog"
                        onClick={() => dispatch(setFilter(cat.id as any))}
                        className="group relative h-[200px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 block"
                    >
                        {/* Картинка фона */}
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Затемнение (Overlay) */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

                        {/* Текст по центру */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3
                                className={`text-white text-shadow-md transition-transform duration-500 group-hover:-translate-y-2 ${cat.fontClass}`}
                            >
                                {cat.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
