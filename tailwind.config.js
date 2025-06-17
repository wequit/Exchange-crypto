    // tailwind.config.js
    export default {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        theme: {
            extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // или 'Roboto'
            },
            colors: {
                primary: {
                DEFAULT: '#3B82F6',
                light: '#DBEAFE',
                },
            },
            },
        },
        plugins: [],
    }