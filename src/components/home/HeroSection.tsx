import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        image: "/images/slider/slide-1.jpg",
        title: "Ferrari"
    },
    {
        id: 2,
        image: "/images/slider/slide-2.jpg",
        title: "Lamborghini"
    },
    {
        id: 3,
        image: "/images/slider/slide-3.jpg",
        title: "Bugatti"
    }
];

export const HeroSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false); // Чтобы паузить слайдер при наведении

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    // Авто-прокрутка (пауза, если мышка на слайдере)
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide, isHovered]);

    // Функция для вычисления стилей каждого слайда
    const getSlideStyles = (index: number) => {
        // Нормализуем индексы для циклического сравнения
        const active = currentIndex;
        const prev = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
        const next = (currentIndex + 1) % SLIDES.length;

        // Базовые стили для всех слайдов
        let baseClass = "absolute top-0 w-[85%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] rounded-3xl overflow-hidden shadow-2xl";

        if (index === active) {
            // Центральный слайд: По центру, полный размер, сверху всех (z-30)
            return `${baseClass} left-1/2 -translate-x-1/2 z-30 scale-100 opacity-100 ring-1 ring-white/20`;
        } else if (index === prev) {
            // Левый слайд: Сдвинут влево, уменьшен, полупрозрачный (z-20)
            return `${baseClass} left-0 -translate-x-[60%] z-20 scale-90 opacity-40 blur-[1px] grayscale-[30%] cursor-pointer hover:opacity-60`;
        } else if (index === next) {
            // Правый слайд: Сдвинут вправо, уменьшен, полупрозрачный (z-20)
            return `${baseClass} right-0 translate-x-[60%] z-20 scale-90 opacity-40 blur-[1px] grayscale-[30%] cursor-pointer hover:opacity-60`;
        } else {
            // Остальные (если слайдов будет больше 3): скрыты за центром
            return `${baseClass} left-1/2 -translate-x-1/2 z-10 scale-50 opacity-0`;
        }
    };

    return (
        <section
            className="relative w-full py-10 overflow-hidden bg-background"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Контейнер слайдера увеличен по высоте */}
            <div className="max-w-[1600px] mx-auto relative h-[400px] md:h-[600px] flex items-center justify-center">

                {/* Кнопки навигации (крупные, по краям экрана) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-8 z-40 p-3 bg-white/10 hover:bg-white/90 hover:text-black text-white rounded-full backdrop-blur-md transition-all shadow-lg group"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:-translate-x-1" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-8 z-40 p-3 bg-white/10 hover:bg-white/90 hover:text-black text-white rounded-full backdrop-blur-md transition-all shadow-lg group"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Область слайдов */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {SLIDES.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={getSlideStyles(index)}
                            onClick={() => {
                                // Клик по боковому слайду делает его активным
                                if (index !== currentIndex) setCurrentIndex(index);
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x800?text=Car'}
                            />

                            {/* Градиент снизу для текста */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                            {/* Текст на слайде (показываем только на активном) */}
                            <div className={`absolute bottom-8 left-8 md:bottom-12 md:left-12 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <h2 className="text-white text-4xl md:text-7xl font-bold uppercase tracking-tighter drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-white/80 text-sm md:text-lg mt-2 font-light tracking-widest uppercase">
                                    Premium Collection
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Индикаторы (точки) */}
            <div className="flex justify-center gap-3 mt-8">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${
                            idx === currentIndex
                                ? 'w-8 h-2 bg-primary'
                                : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
