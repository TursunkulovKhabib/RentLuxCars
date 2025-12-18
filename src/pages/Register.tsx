import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setUser, setSession } from '../features/auth/authSlice';
import { Input } from '../components/ui/Input';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // Имя для профиля
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            if (data.user && data.session) {
                dispatch(setUser(data.user));
                dispatch(setSession(data.session));
                alert("Регистрация успешна! Добро пожаловать.");
                navigate('/');
            } else {
                alert("Ссылка для подтверждения отправлена на ваш Email!");
                navigate('/login');
            }

        } catch (error: any) {
            alert("Ошибка регистрации: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h1 className="text-4xl font-bold mb-8 text-black">Регистрация</h1>

                <form onSubmit={handleRegister} className="space-y-6">
                    <Input
                        placeholder="Ваше Имя"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Пароль (минимум 6 символов)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white w-full py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                    >
                        {loading ? 'Создаем аккаунт...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                    </button>
                </form>

                <p className="mt-6 text-gray-600">
                    Уже есть аккаунт? <Link to="/login" className="text-primary font-bold hover:underline">Войти</Link>
                </p>
            </div>
        </div>
    );
};
