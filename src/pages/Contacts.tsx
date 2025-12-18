import React from 'react';
import { TeamSection } from '../components/home/TeamSection';

export const Contacts: React.FC = () => {
    return (
        <div className="h-[calc(100vh-80px)] w-full bg-background flex flex-col justify-between items-center py-4 overflow-hidden">

            {/* Верхний блок: Заголовок */}
            <div className="text-center flex-shrink-0 mt-2">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2">Наши Менеджеры</h1>
                <p className="text-gray-600 max-w-xl mx-auto px-4 text-sm">
                    Мы всегда на связи, чтобы помочь вам с выбором идеального автомобиля.
                </p>
            </div>

            <div className="flex-1 w-full flex items-center justify-center scale-90 xl:scale-100 origin-center">
                <TeamSection />
            </div>

            {/* Нижний блок: Информация об офисе */}
            <div className="flex-shrink-0 w-full max-w-2xl mx-auto px-4 py-4 text-center border-t border-gray-300 mt-2">
                <h2 className="text-lg font-bold mb-1">Главный офис</h2>
                <p className="text-sm text-gray-800">г. Долгопрудный, Физтех-Сити, 3 этаж</p>

                <div className="flex justify-center items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>Ежедневно: 10:00 - 22:00</span>
                    <span className="text-gray-300">|</span>
                    <a href="mailto:info@rentluxcars.ru" className="text-primary font-bold hover:underline">
                        info@rentluxcars.ru
                    </a>
                </div>
            </div>
        </div>
    );
};
