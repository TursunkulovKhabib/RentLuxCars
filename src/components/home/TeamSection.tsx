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
    },
];

export const TeamSection: React.FC = () => {
    return (
        <section className="w-full px-4 max-w-[1200px] mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">

                        {/* Карточка (серый фон, закругленные углы) */}
                        <div className="bg-[#C4C4C4] rounded-2xl p-6 w-full flex flex-col items-center shadow-lg transition-transform hover:scale-[1.02]">
                            {/* Картинка */}
                            <div className="w-full aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Photo'}
                                />
                            </div>

                            {/* Имя и Должность */}
                            <h3 className="text-3xl font-medium text-black mb-1">{member.name}</h3>
                            <p className="text-sm text-gray-700 font-light">{member.role}</p>
                        </div>

                        {/* Кнопка с телефоном (Вынесена из карточки, как на макете) */}
                        <a
                            href={`tel:${member.phone.replace(/\s/g, '')}`}
                            className="mt-4 bg-[#C84A4A] text-white py-2 px-8 rounded-full font-medium text-lg hover:bg-[#B03E3E] transition-colors shadow-md"
                        >
                            {member.phone}
                        </a>

                    </div>
                ))}
            </div>
        </section>
    );
};
