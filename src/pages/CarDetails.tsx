import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Gauge, Zap, Settings, Phone, X, Check } from 'lucide-react';

export const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            if (!id) return;
            const { data } = await supabase.from('cars').select('*').eq('id', id).single();
            setCar(data);
            setLoading(false);
        };
        fetchCar();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Загрузка...</div>;
    if (!car) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Машина не найдена</div>;

    const specs = typeof car.specs === 'string' ? JSON.parse(car.specs) : car.specs;

    return (
        <div className="min-h-screen bg-[#121212] text-white pb-20 font-sans selection:bg-[#4A90E2] selection:text-white">

            {/* Навигация */}
            <div className="max-w-[1200px] mx-auto px-6 py-8">
                <Link to="/catalog" className="group inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-[#4A90E2] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">Назад в каталог</span>
                </Link>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* ЛЕВАЯ КОЛОНКА: Фото */}
                <div className="lg:col-span-7 sticky top-8">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-[#1A1A1A] shadow-2xl relative group">
                        <img
                            src={car.image_url}
                            alt={car.model}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Photo'}
                        />
                        {/* Градиент снизу для объема */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                {/* ПРАВАЯ КОЛОНКА: Информация */}
                <div className="lg:col-span-5 flex flex-col h-full justify-center">

                    {/* Заголовки */}
                    <div className="mb-8">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 uppercase text-white">
                            {car.brand}
                        </h1>
                        <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-blue-300">
                            {car.model}
                        </h2>
                    </div>

                    {/* Описание - улучшенная читаемость */}
                    <div className="prose prose-invert max-w-none mb-10">
                        <p className="text-gray-300 text-lg leading-8 font-light whitespace-pre-line border-l-2 border-[#4A90E2] pl-6">
                            {car.description || `Аренда автомобиля ${car.brand} ${car.model} — это комфорт и надежность. Автомобиль прошел полную проверку и готов к вашим поездкам.`}
                        </p>
                    </div>

                    {/* Характеристики - Glassmorphism */}
                    {specs && (
                        <div className="grid grid-cols-3 gap-3 mb-10">
                            {[
                                { label: 'Разгон', value: specs['0-100'], icon: Gauge },
                                { label: 'Мощность', value: specs.power, icon: Zap },
                                { label: 'Привод', value: specs.drive, icon: Settings },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center transition-all hover:bg-white/10">
                                    <item.icon className="w-5 h-5 mx-auto mb-2 text-[#4A90E2]" />
                                    <div className="text-base font-bold text-white mb-1">{item.value || '-'}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-gray-500">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Блок цены и кнопки */}
                    <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Стоимость аренды</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">{car.price_per_day.toLocaleString()} ₽</span>
                                <span className="text-sm text-gray-500 font-normal">/ сутки</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPhoneModal(true)}
                            className="w-full sm:w-auto bg-[#C84A4A] hover:bg-[#B03E3E] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_10px_20px_rgba(200,74,74,0.2)] hover:shadow-[0_15px_30px_rgba(200,74,74,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            <span>Бронировать</span>
                        </button>
                    </div>

                    {/* Доп. инфо */}
                    <div className="mt-6 flex gap-6 justify-center sm:justify-start text-sm text-gray-500">
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Полная страховка</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Без залога</span>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showPhoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1A1A1A] p-8 rounded-3xl max-w-sm w-full border border-gray-700 relative text-center shadow-2xl transform transition-all scale-100">
                        <button onClick={() => setShowPhoneModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2"><X className="w-6 h-6" /></button>

                        <div className="w-16 h-16 bg-[#C84A4A]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C84A4A]">
                            <Phone className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-white">Связаться с нами</h3>
                        <p className="text-gray-400 text-sm mb-6">Позвоните нам для уточнения деталей и бронирования {car.brand} {car.model}</p>

                        <div className="bg-black/30 p-5 rounded-2xl mb-6 border border-white/5">
                            <a href="tel:+79995432222" className="text-2xl font-bold text-white hover:text-[#C84A4A] transition-colors block">
                                +7 999 543 22 22
                            </a>
                            <p className="text-xs text-gray-500 mt-2">Ежедневно с 9:00 до 22:00</p>
                        </div>

                        <button onClick={() => setShowPhoneModal(false)} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Закрыть окно
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
