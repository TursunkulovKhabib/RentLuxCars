import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ options, placeholder, className = '', ...props }) => {
    return (
        <div className="relative w-full">
            <select
                className={`w-full bg-[#D9D9D9] border-none rounded-lg px-4 py-3 text-gray-800 appearance-none focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer ${className}`}
                {...props}
                defaultValue=""
            >
                <option value="" disabled hidden>{placeholder || 'Выберите...'}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
    );
};
