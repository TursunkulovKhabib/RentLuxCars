import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getCars, setFilter } from '../features/cars/carsSlice';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const FILTERS = [
    { value: 'all', label: 'ALL' },
    { value: 'sport', label: 'SPORTS' },
    { value: 'executive', label: 'EXECUTIVE' },
    { value: 'family', label: 'FAMILY' },
] as const;

export const Catalog: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, status, filter } = useAppSelector((state) => state.cars);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getCars());
        }
    }, [status, dispatch]);

    const filteredCars = filter === 'all'
        ? list
        : list.filter(car => car.category === filter);

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Заголовок категории (синий, как на макете) */}
            <div className="pt-8 pb-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-[#4A90E2] uppercase tracking-wide">
                    {filter === 'all' ? 'Our Fleet' : filter}
                </h1>
            </div>

            {/* Панель фильтров */}
            <div className="max-w-[1400px] mx-auto px-6 mb-8 flex justify-end items-center gap-4 text-gray-400">
                <Filter className="w-5 h-5" />
                <div className="flex gap-4 text-sm font-medium">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => dispatch(setFilter(f.value))}
                            className={`uppercase transition-colors ${filter === f.value ? 'text-black font-bold' : 'hover:text-black'}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Сетка машин */}
            <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {status === 'loading' && <p className="text-center col-span-full">Загрузка авто...</p>}

                {status === 'succeeded' && filteredCars.map((car) => (
                    <Link to={`/catalog/${car.id}`} key={car.id} className="block group">
                        <div className="bg-[#D9D9D9] rounded-lg overflow-hidden relative aspect-[4/3] mb-2">
                            <img
                                src={car.image_url}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Car'}
                            />
                            {/* Бейджик (опционально) */}
                            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                                Available
                            </div>
                        </div>

                        {/* Инфо о машине */}
                        <div className="bg-[#1E1E1E] text-white p-4 rounded-b-lg flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-medium leading-none">{car.brand}</h3>
                                <p className="text-xs text-gray-400 mt-1">{car.model}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">{car.price_per_day.toLocaleString()} ₽</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
