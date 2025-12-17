import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Outlet */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Футер */}
        </div>
    );
};
