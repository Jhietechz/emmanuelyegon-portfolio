/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B0082",
        accent: "#8A2BE2",
        orchid: "#C8A2C8",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};