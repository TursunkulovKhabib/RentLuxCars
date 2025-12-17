import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { logout } from '../features/auth/authSlice';

export const Admin: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Если нет юзера, кидаем на логин
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen p-8 bg-background">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Панель менеджера</h1>
                    <button onClick={handleLogout} className="text-red-600 hover:underline">Выйти</button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Активные заявки на аренду</h2>
                    <p className="text-gray-500">Пока нет новых заявок.</p>
                </div>
            </div>
        </div>
    );
};
