export interface CarSpecs {
    power: string;   // Мощность
    "0-100": string; // Разгон
    engine: string;  // Двигатель
    transmission?: string;
    drive?: string; // Привод
    fuel?: string; // Расход
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    category: 'sport' | 'executive' | 'family' | 'suv';
    price_per_day: number;
    image_url: string;
    specs: CarSpecs;
    description?: string;
    is_available: boolean;
}
