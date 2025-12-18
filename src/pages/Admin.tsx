import React, { useEffect, useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { logout } from '../features/auth/authSlice';
import { Plus, Archive, LogOut, RotateCw, Loader2 } from 'lucide-react';

export const Admin: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [myCars, setMyCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

    useEffect(() => {
        const fetchMyAds = async () => {
            setLoading(true);
            try {
                let data = [];
                let error = null;

                if (user) {
                    const response = await supabase
                        .from('cars')
                        .select('*')
                        .eq('owner_id', user.id);
                    data = response.data || [];
                    error = response.error;
                } else {
                    const localIds = JSON.parse(localStorage.getItem('my_ads') || '[]');
                    if (localIds.length > 0) {
                        const response = await supabase
                            .from('cars')
                            .select('*')
                            .in('id', localIds);
                        data = response.data || [];
                        error = response.error;
                    }
                }
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

    const handleArchive = async (carId: number) => {
        const { error } = await supabase
            .from('cars')
            .update({ is_available: false })
            .eq('id', carId);

        if (error) {
            alert("Ошибка архивации: " + error.message);
            return;
        }

        setMyCars(myCars.map(car =>
            car.id === carId ? { ...car, is_available: false } : car
        ));
    };

    const handleRestore = async (carId: number) => {
        const { error } = await supabase
            .from('cars')
            .update({ is_available: true })
            .eq('id', carId);

        if (error) {
            alert("Ошибка восстановления: " + error.message);
            return;
        }

        setMyCars(myCars.map(car =>
            car.id === carId ? { ...car, is_available: true } : car
        ));
    };

    const activeCars = useMemo(() => myCars.filter(car => car.is_available), [myCars]);
    const archivedCars = useMemo(() => myCars.filter(car => !car.is_available), [myCars]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-10 pb-20 px-4 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Шапка */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Мои объявления</h1>
                        <p className="text-gray-500 mt-2">Управляйте вашим автопарком</p>
                    </div>
                    <div className="flex gap-3">
                        {user && <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-white"><LogOut className="w-4 h-4" /> Выйти</button>}
                        <Link to="/create-ad" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium"><Plus className="w-5 h-5" /> Создать</Link>
                    </div>
                </div>

                {/* Табы */}
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                    <button onClick={() => setActiveTab('active')} className={`pb-3 font-semibold ${activeTab === 'active' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
                        Активные ({activeCars.length})
                    </button>
                    <button onClick={() => setActiveTab('archived')} className={`pb-3 font-semibold ${activeTab === 'archived' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
                        Архив ({archivedCars.length})
                    </button>
                </div>

                {/* Контент */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400"><Loader2 className="w-8 h-8 animate-spin mx-auto"/></div>
                ) : (
                    <>
                        {/* Активные объявления */}
                        {activeTab === 'active' && (
                            activeCars.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                                    <p className="text-xl text-gray-600 mb-4">У вас нет активных объявлений</p>
                                    <Link to="/create-ad" className="text-[#C84A4A] font-bold hover:underline">Создать объявление</Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {activeCars.map((car) => (
                                        <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border group">
                                            <div className="h-56 overflow-hidden bg-gray-200"><img src={car.image_url} alt={car.brand} className="w-full h-full object-cover"/></div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold mb-1">{car.brand} {car.model}</h3>
                                                <p className="text-[#C84A4A] font-bold text-lg mb-4">{car.price_per_day.toLocaleString()} ₽ / день</p>
                                                <div className="flex gap-3 pt-4 border-t">
                                                    <Link to={`/catalog/${car.id}`} className="flex-1 py-2 text-center font-bold bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-800">Просмотр</Link>
                                                    <button onClick={() => handleArchive(car.id)} className="p-2 border rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500" title="В архив"><Archive className="w-5 h-5"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* Архивные объявления */}
                        {activeTab === 'archived' && (
                            archivedCars.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                                    <p className="text-xl text-gray-600">Архив пуст</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {archivedCars.map((car) => (
                                        <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border group opacity-70">
                                            <div className="h-56 overflow-hidden bg-gray-200"><img src={car.image_url} alt={car.brand} className="w-full h-full object-cover"/></div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold mb-1">{car.brand} {car.model}</h3>
                                                <p className="font-bold text-lg mb-4">{car.price_per_day.toLocaleString()} ₽ / день</p>
                                                <button onClick={() => handleRestore(car.id)} className="w-full py-2 flex items-center justify-center gap-2 font-bold bg-green-100 rounded-lg hover:bg-green-200 text-green-800">
                                                    <RotateCw className="w-4 h-4"/> Восстановить
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

