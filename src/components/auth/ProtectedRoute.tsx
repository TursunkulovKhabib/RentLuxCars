import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
