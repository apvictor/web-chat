/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        background: "#312E38",
        backgroundSecondary: "#28262E",
        backgroundService: "#3E3B47",
        input: "#232129"
      }
    },

  },
  plugins: [],
}