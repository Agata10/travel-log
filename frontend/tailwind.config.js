/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'trips-bg': "url('../src/assets/images/trips-background.jpg')",
      },
      fontFamily: {
        logo: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
