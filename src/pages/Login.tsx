import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setUser, setSession } from '../features/auth/authSlice';
import { Input } from '../components/ui/Input';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user && data.session) {
                dispatch(setUser(data.user));
                dispatch(setSession(data.session));
                navigate('/admin');
            }
        } catch (error: any) {
            alert(error.message || "Ошибка входа");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-[#D9D9D9] p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-300">
                <h1 className="text-4xl font-bold mb-8 text-black">Вход</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        placeholder="Номер телефона (или email)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#EAEAEA] border border-gray-300 placeholder-gray-400"
                    />

                    <Input
                        type="password"
                        placeholder="Пароль (менеджер должен вам его отправить)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#EAEAEA] border border-gray-300 placeholder-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white text-lg font-medium py-3 px-12 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 uppercase tracking-wide w-full md:w-auto"
                    >
                        {loading ? 'Входим...' : 'ВОЙТИ'}
                    </button>
                </form>
            </div>
        </div>
    );
};
