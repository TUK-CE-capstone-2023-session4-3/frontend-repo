/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "#FFFFFF2B",
        "light-red": "#E9575A",
      },
    },
  },
  plugins: [],
};
