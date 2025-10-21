// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- important: use 'class' so toggle works
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // add custom colors or spacing here if you want later
    },
  },
  plugins: [],
}
