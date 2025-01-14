/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0A2B14',
        secondary: '#2D5240',
        tertiary: '#055240',
        quaternary: '#8A8D8C',
        tertiaryhover: '#067a57',
      },
    },
  },
  plugins: [],
};
