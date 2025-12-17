import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    return (
        <div className="w-full">
            <input
                className={`w-full bg-[#D9D9D9] border-none rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all ${className}`}
                {...props}
            />
        </div>
    );
};
