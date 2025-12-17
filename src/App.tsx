import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CarDetails } from './pages/CarDetails';
import { CreateAd } from './pages/CreateAd';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:id" element={<CarDetails />} />
                <Route path="create-ad" element={<CreateAd />} />
            </Route>
        </Routes>
    );
}

export default App;
