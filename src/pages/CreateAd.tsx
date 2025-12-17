import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Upload, Sparkles } from 'lucide-react'; // Sparkles для иконки ИИ

export const CreateAd: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Заявка отправлена! (Логика сохранения будет добавлена позже)");
    };

    const handleGenerateAI = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Здесь сработает ИИ и заполнит описание авто!");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center md:text-left">
                    Заявление на создание объявления
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                    {/* Левая колонка */}
                    <div className="space-y-6">
                        <Input placeholder="Выберите марку и модель" />

                        <Select
                            placeholder="Год выпуска"
                            options={Array.from({length: 20}, (_, i) => ({ value: `${2024-i}`, label: `${2024-i}` }))}
                        />

                        <Select
                            placeholder="Состояние автомобиля"
                            options={[
                                { value: 'new', label: 'Новое' },
                                { value: 'used', label: 'Б/У (Идеальное)' },
                                { value: 'good', label: 'Хорошее' }
                            ]}
                        />

                        <Input placeholder="Пробег автомобиля, в км" type="number" />

                        <Select
                            placeholder="Тип аренды"
                            options={[
                                { value: 'day', label: 'Посуточная' },
                                { value: 'long', label: 'Длительная' }
                            ]}
                        />

                        <div className="flex items-center bg-[#D9D9D9] rounded-lg px-4 overflow-hidden">
                            <span className="text-gray-500 mr-2">₽</span>
                            <input
                                className="w-full bg-transparent border-none py-3 focus:outline-none"
                                placeholder="Желаемая стоимость посуточной аренды"
                                type="number"
                            />
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div className="space-y-6">
                        <Select
                            placeholder="Есть полис ОСАГО 'МУЛЬТИДРАЙВ'"
                            options={[
                                { value: 'yes', label: 'Да' },
                                { value: 'no', label: 'Нет' }
                            ]}
                        />

                        {/* Загрузка документов */}
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-black/5 transition-colors h-[120px]">
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-sm text-center">Загрузка сканов СТС, ПТС и водительского удостоверения</span>
                        </div>

                        {/* Загрузка фото авто */}
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-black/5 transition-colors h-[120px]">
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-sm text-center">Загрузка фотографий автомобиля для объявления</span>
                        </div>

                        {/* Блок контактов */}
                        <div className="pt-4">
                            <h3 className="text-2xl font-bold mb-4">Контакты</h3>
                            <div className="space-y-4">
                                <Input placeholder="Telegram (@example)" />
                                <Input placeholder="Ваше ФИО" />
                            </div>
                        </div>
                    </div>

                    {/* Кнопка ИИ */}
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleGenerateAI}
                            className="flex items-center gap-2 text-primary font-bold hover:underline"
                        >
                            <Sparkles className="w-5 h-5" />
                            {loading ? "ИИ думает..." : "Сгенерировать описание с помощью ИИ"}
                        </button>
                    </div>

                    {/* Кнопка отправки */}
                    <div className="md:col-span-2 flex justify-end mt-8">
                        <button
                            type="submit"
                            className="bg-primary text-white text-lg font-medium py-3 px-12 rounded-lg hover:bg-red-700 transition-shadow shadow-lg shadow-red-900/20 w-full md:w-auto"
                        >
                            Отправить заявление
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};
