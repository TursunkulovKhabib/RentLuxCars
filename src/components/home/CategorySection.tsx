import React from 'react';

const CATEGORIES = [
    {
        id: 'executive',
        title: 'Executive',
        image: '/images/categories/executive.jpg',
        className: 'bg-black text-white'
    },
    {
        id: 'sports',
        title: 'Sports',
        image: '/images/categories/sports.jpg',
        className: 'text-white italic font-serif'
    },
    {
        id: 'family',
        title: 'Family',
        image: '/images/categories/family.jpg',
        className: 'text-white'
    }
];

export const CategorySection: React.FC = () => {
    return (
        <section className="py-10 px-4 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                    <div
                        key={cat.id}
                        className="group relative h-[250px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Category'}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className={`text-4xl md:text-5xl font-light tracking-wider ${cat.className}`}>
                                {cat.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
