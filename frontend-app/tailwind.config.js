/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                cardano: '#0033AD',
                cyan: {
                    DEFAULT: '#46F0FF', // Bright cyan used in landing page
                    400: '#22d3ee',
                },
                navy: {
                    900: '#0a0f24',
                    light: '#1a2236'
                }
            },
            fontFamily: {
                heading: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            }
        },
    },
    plugins: [],
}
