import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { logout } from '../features/auth/authSlice';
import { Plus, Archive, LogOut } from 'lucide-react';
import { Car } from '../types';

export const Admin: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [myCars, setMyCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (!session) {
                    navigate('/login');
                }
            });
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchMyAds = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('cars')
                    .select('*')
                    .eq('owner_id', user.id) // Раскомментируй, когда добавишь колонку

                if (error) throw error;
                setMyCars(data || []);
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyAds();
    }, [user]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        navigate('/login');
    };

    if (!user) return <div className="p-10 text-center">Загрузка профиля...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-20 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Шапка кабинета */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Мои объявления</h1>
                        <p className="text-gray-500">Управляйте вашим автопарком</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                            <LogOut className="w-4 h-4" /> Выйти
                        </button>
                        <Link to="/create-ad" className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Plus className="w-4 h-4" /> Создать объявление
                        </Link>
                    </div>
                </div>

                {/* Табы (Активные / Архив) */}
                <div className="flex gap-6 border-b border-gray-300 mb-8">
                    <button className="pb-3 border-b-2 border-primary font-bold text-black">Активные ({myCars.length})</button>
                    <button className="pb-3 text-gray-500 hover:text-black">Архив (0)</button>
                </div>

                {/* Список машин */}
                {loading ? (
                    <div className="text-center py-10">Загрузка...</div>
                ) : myCars.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-xl text-gray-500 mb-4">У вас пока нет объявлений</p>
                        <Link to="/create-ad" className="text-primary font-bold hover:underline">Создать первое объявление</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 group relative">
                                {/* Картинка */}
                                <div className="h-48 overflow-hidden bg-gray-100">
                                    <img src={car.image_url} alt={car.brand} className="w-full h-full object-cover" />
                                </div>

                                {/* Инфо */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Активно</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4">{car.price_per_day.toLocaleString()} ₽ / день</p>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Редактировать</button>
                                        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-500" title="В архив">
                                            <Archive className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
