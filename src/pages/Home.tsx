import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';

export const Home: React.FC = () => {
    return (
        <div className="space-y-4 pb-20">
            <HeroSection />
            <CategorySection />
        </div>
    );
};
