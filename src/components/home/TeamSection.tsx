import React from 'react';

const TEAM = [
    {
        id: 1,
        name: 'Дмитрий',
        role: 'Менеджер-консультант',
        phone: '+7 990 506 20 07',
        image: '/images/team/dmitry.jpg',
    },
    {
        id: 2,
        name: 'Магомед-Башир',
        role: 'Директор фирмы',
        phone: '+7 993 105 20 07',
        image: '/images/team/magomed.jpg',
    },
    {
        id: 3,
        name: 'Матвей',
        role: 'Механик-консультант',
        phone: '+7 992 408 20 07',
        image: '/images/team/matvey.jpg',
    }
];

export const TeamSection: React.FC = () => {
    return (
        <section className="py-16 px-4 max-w-[1400px] mx-auto bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md bg-gray-300 mb-4 relative group">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Photo'}
                            />
                        </div>

                        <h3 className="text-3xl font-medium text-black mb-1 text-center">{member.name}</h3>
                        <p className="text-sm text-gray-600 mb-6 text-center">{member.role}</p>

                        <a
                            href={`tel:${member.phone.replace(/\s/g, '')}`}
                            className="bg-primary text-white py-2 px-8 rounded-full text-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                        >
                            {member.phone}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
