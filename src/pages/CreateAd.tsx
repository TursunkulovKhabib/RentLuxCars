import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Wand2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAppSelector } from '../store'; // <-- Важно для owner_id

export const CreateAd: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        category: 'sport',
        year: '',
        price: '',
        acceleration: '',
        power: '',
        drive: 'Полный',
        contact_telegram: '',
        contact_name: ''
    });

    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [docs, setDocs] = useState<File[]>([]);

    const [isGenerating, setIsGenerating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photos' | 'docs') => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            if (type === 'photos') setPhotos(prev => [...prev, ...filesArray]);
            else setDocs(prev => [...prev, ...filesArray]);
        }
    };

    const generateDescription = async () => {
        if (!formData.brand || !formData.model) {
            alert('Укажите марку и модель!');
            return;
        }
        setIsGenerating(true);
        try {
            const prompt = `Напиши короткое описание для аренды авто ${formData.brand} ${formData.model} (${formData.year}). Категория: ${formData.category}. Разгон ${formData.acceleration}с, ${formData.power}л.с. Акцент на драйв и комфорт. На русском.`;

            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`);
            if (!response.ok) throw new Error('Ошибка AI');

            const text = await response.text();
            setDescription(text);
        } catch (e) {
            console.error(e);
            setDescription(`Премиальный автомобиль ${formData.brand} ${formData.model}. Мощный двигатель (${formData.power} л.с.), отличная динамика и максимальный комфорт.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.brand || !formData.price || !formData.acceleration) {
            alert('Заполните обязательные поля: Марка, Цена, Разгон!');
            return;
        }

        setUploading(true);
        try {
            const photoUrls: string[] = [];
            for (const file of photos) {
                const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                const { error } = await supabase.storage.from('car-photos').upload(cleanName, file);

                if (error) throw error;

                const { data } = supabase.storage.from('car-photos').getPublicUrl(cleanName);
                photoUrls.push(data.publicUrl);
            }

            const docUrls: string[] = [];
            for (const file of docs) {
                const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                const { error } = await supabase.storage.from('car-docs').upload(cleanName, file);

                if (error) throw error;

                const { data } = supabase.storage.from('car-docs').getPublicUrl(cleanName);
                docUrls.push(data.publicUrl);
            }

            const specsJson = {
                "0-100": `${formData.acceleration} с`,
                "power": `${formData.power} л.с.`,
                "drive": formData.drive
            };

            await supabase.from('requests').insert([{
                brand: formData.brand,
                model: formData.model,
                year: formData.year ? parseInt(formData.year) : null,
                rental_type: formData.category,
                price_per_day: parseInt(formData.price),
                contact_telegram: formData.contact_telegram,
                contact_name: formData.contact_name,
                description: description,
                photos: photoUrls,
                docs: docUrls,
                specs: specsJson,
                status: 'approved',
                owner_id: user?.id || null // Привязка к юзеру
            }]);

            if (photoUrls.length > 0) {
                const { data: carData } = await supabase.from('cars').insert([{
                    brand: formData.brand,
                    model: formData.model,
                    category: formData.category,
                    price_per_day: parseInt(formData.price),
                    image_url: photoUrls[0],
                    specs: specsJson,
                    description: description,
                    is_available: true,
                    owner_id: user?.id || null // <--- Привязка к юзеру
                }]).select();

                if (carData) {
                    const myAds = JSON.parse(localStorage.getItem('my_ads') || '[]');
                    myAds.push(carData[0].id);
                    localStorage.setItem('my_ads', JSON.stringify(myAds));
                }
            }

            setSuccess(true);
        } catch (error: any) {
            console.error('Ошибка:', error);
            alert(`Ошибка при сохранении: ${error.message || 'Неизвестная ошибка'}`);
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800">Объявление опубликовано!</h2>
                <p className="text-gray-500 mb-6">Автомобиль добавлен в ваш каталог.</p>
                <div className="flex gap-4">
                    <button onClick={() => window.location.href = '/admin'} className="bg-black text-white px-6 py-2 rounded-full font-medium">Мои объявления</button>
                    <button onClick={() => { setSuccess(false); setPhotos([]); setDocs([]); setDescription(''); }} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-medium">Добавить еще</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 font-sans">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Новое объявление</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="font-bold text-xl text-gray-800">Данные об авто</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <input name="brand" placeholder="Марка (BMW)" value={formData.brand} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#C84A4A]" />
                                <input name="model" placeholder="Модель (X5)" value={formData.model} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#C84A4A]" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input name="year" type="number" placeholder="Год" value={formData.year} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none cursor-pointer appearance-none">
                                    <option value="sport">Sport (Спорткар)</option>
                                    <option value="executive">Executive (Бизнес)</option>
                                    <option value="family">Family (Семейный)</option>
                                </select>
                            </div>

                            <input name="price" type="number" placeholder="Цена (₽/сутки)" value={formData.price} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl font-bold text-lg outline-none" />
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="font-bold text-xl text-gray-800">Характеристики (Specs)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="acceleration" placeholder="Разгон 0-100 (сек)" value={formData.acceleration} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
                                <input name="power" placeholder="Мощность (л.с.)" value={formData.power} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
                            </div>
                            <select name="drive" value={formData.drive} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none cursor-pointer">
                                <option value="Полный">Полный привод</option>
                                <option value="Задний">Задний привод</option>
                                <option value="Передний">Передний привод</option>
                            </select>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="font-bold text-xl text-gray-800">Фотографии</h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, 'photos')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <Upload className="mx-auto text-gray-400 w-10 h-10 mb-2" />
                                <p className="text-gray-500 text-sm">Нажмите для загрузки фото</p>
                                {photos.length > 0 && <div className="mt-2 text-green-600 font-bold bg-green-100 py-1 px-3 rounded-full inline-block text-xs">Выбрано: {photos.length}</div>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="font-bold text-xl text-gray-800">Контакты</h3>
                            <input name="contact_telegram" placeholder="Telegram (@username)" value={formData.contact_telegram} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
                            <input name="contact_name" placeholder="Ваше Имя" value={formData.contact_name} onChange={handleChange} className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
                        </div>
                    </div>
                </div>

                {/* ИИ ГЕНЕРАЦИЯ */}
                <div className="mt-8 bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                            <Wand2 className="w-6 h-6 text-purple-600" />
                            Описание (AI)
                        </h3>
                        <button
                            onClick={generateDescription}
                            disabled={isGenerating}
                            className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-200 transition-colors"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                            {isGenerating ? 'Пишу...' : 'Сгенерировать'}
                        </button>
                    </div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Текст описания..."
                        className="w-full h-32 p-4 bg-gray-100 rounded-xl resize-none outline-none focus:ring-2 focus:ring-purple-200"
                    />
                </div>

                {/* КНОПКА ОТПРАВИТЬ */}
                <div className="mt-10 text-center pb-20">
                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        className="bg-[#C84A4A] hover:bg-[#B03E3E] text-white text-xl font-bold py-4 px-16 rounded-full shadow-xl transform transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {uploading ? 'Публикация...' : 'Разместить объявление'}
                    </button>
                </div>

            </div>
        </div>
    );
};
