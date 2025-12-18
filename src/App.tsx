import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './api/supabaseClient';
import { useAppDispatch } from './store';
import { setUser, setSession } from './features/auth/authSlice';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CarDetails } from './pages/CarDetails';
import { CreateAd } from './pages/CreateAd';
import { Login } from './pages/Login';
import { Contacts } from './pages/Contacts';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
    const dispatch = useAppDispatch();
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch(setSession(session));
                dispatch(setUser(session.user));
            }
            setIsAuthChecking(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                dispatch(setSession(session));
                dispatch(setUser(session.user));
            } else {
                dispatch(setSession(null));
                dispatch(setUser(null));
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    if (isAuthChecking) {
        return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
    }

    return (
        <>
            <ScrollToTop /> {/* Скролл вверх при смене страницы */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="catalog/:id" element={<CarDetails />} />
                    <Route path="contacts" element={<Contacts />} />
                    {/* ЗАЩИЩЕННЫЕ МАРШРУТЫ */}
                    <Route
                        path="create-ad"
                        element={
                            <ProtectedRoute>
                                <CreateAd />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
