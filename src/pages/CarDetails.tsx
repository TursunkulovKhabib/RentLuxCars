import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarById } from '../api/carsApi';
import { Car } from '../types';
import { ChevronLeft } from 'lucide-react';

export const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCar = async () => {
            if (!id) return;
            try {
                const data = await fetchCarById(id);
                setCar(data);
            } catch (error) {
                console.error("Failed to load car", error);
            } finally {
                setLoading(false);
            }
        };
        loadCar();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
    if (!car) return <div className="min-h-screen flex items-center justify-center">Машина не найдена</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Кнопка назад */}
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-black transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Назад к каталогу
                </button>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* Левая колонка: Фото */}
                <div className="space-y-4">
                    {/* Главное фото */}
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
                        <img
                            src={car.image_url}
                            alt={car.model}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Миниатюры */}
                    <div className="grid grid-cols-4 gap-2">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-300 cursor-pointer hover:opacity-80 transition-opacity">

                            </div>
                        ))}
                    </div>
                </div>

                {/* Правая колонка: Инфо */}
                <div>
                    {/* Заголовок */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-black mb-0">
                            {car.brand}
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-black/80">
                            {car.model}
                        </h2>
                    </div>

                    {/* Сетка характеристик */}
                    <div className="bg-[#D9D9D9] p-6 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Объем</p>
                            <p className="text-sm font-semibold">{car.specs.engine || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Мощность</p>
                            <p className="text-sm font-semibold">{car.specs.power || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Разгон</p>
                            <p className="text-sm font-semibold">{car.specs["0-100"] || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Привод</p>
                            <p className="text-sm font-semibold">{car.specs.drive || 'Задний'}</p>
                        </div>
                    </div>

                    {/* Текстовое описание и цена */}
                    <div className="bg-[#D9D9D9] p-8 rounded-xl relative">
                        <p className="text-sm md:text-base leading-relaxed text-gray-800 mb-20 italic">
                            {car.description ||
                                "Это не просто гиперкар — это квинтэссенция гоночных технологий, воплощенная в дорожном автомобиле. Уникальная аэродинамика создает прижимную силу, сравнимую с гоночными прототипами. Рев двигателя и молниеносные ускорения до 100 км/ч — это чистая магия для истинных ценителей."
                            }
                        </p>

                        {/* Нижняя панель */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-400/30">
                            <div className="text-center md:text-left">
                    <span className="text-primary font-bold uppercase text-sm tracking-widest block mb-1">
                       {car.category}
                    </span>
                                <span className="text-3xl font-bold text-black">
                       {car.price_per_day.toLocaleString()} ₽
                    </span>
                            </div>

                            <button className="bg-primary text-white text-lg font-medium py-3 px-10 rounded-lg hover:bg-red-700 transition-shadow shadow-lg shadow-red-900/20 w-full md:w-auto">
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
