import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { TeamSection } from '../components/home/TeamSection';

export const Home: React.FC = () => {
    return (
        <div className="space-y-4">
            <HeroSection />
            <CategorySection />
            <TeamSection />
        </div>
    );
};
