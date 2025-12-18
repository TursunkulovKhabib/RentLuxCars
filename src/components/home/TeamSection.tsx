import React from 'react';

const TEAM = [
    {
        id: 1,
        name: 'Дмитрий',
        role: 'Senior Sales Manager',
        image: '/images/team/dmitry.jpg',
    },
    {
        id: 2,
        name: 'Магомед-Башир',
        role: 'Head of Luxury Rentals',
        image: '/images/team/magomed.jpg',
    },
    {
        id: 3,
        name: 'Матвей',
        role: 'Customer Success Lead',
        image: '/images/team/matvey.jpg',
    },
];

export const TeamSection: React.FC = () => {
    return (
        <section className="w-full px-4 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TEAM.map((member) => (
                    <div key={member.id} className="group relative rounded-xl overflow-hidden shadow-lg bg-white">

                        {/* Контейнер картинки с фиксированной высотой */}
                        <div className="h-[350px] w-full overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Manager'}
                            />
                        </div>

                        {/* Блок с именем (внизу, поверх картинки или под ней) */}
                        <div className="p-4 text-center bg-white border-t border-gray-100">
                            <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wide">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
