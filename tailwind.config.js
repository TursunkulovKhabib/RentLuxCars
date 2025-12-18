/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D32F2F",    // Твой красный акцент
                secondary: "#1A1A1A",  // Темный (почти черный)
                background: "#E5E5E5", // Серый фон сайта
                surface: "#FFFFFF",    // Белые карточки
                text: {
                    main: "#000000",
                    muted: "#666666",
                    inverted: "#FFFFFF"
                }
            },
            fontFamily: {
                // Основной шрифт
                sans: ['Montserrat', 'sans-serif'],

                // Для категории Executive
                garamond: ['"EB Garamond"', 'serif'],

                // Для категории Sports
                island: ['"Island Moments"', 'cursive'],
            }
        },
    },
    plugins: [],
}
