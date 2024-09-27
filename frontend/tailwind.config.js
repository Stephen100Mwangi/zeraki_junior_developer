/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        back: "#EEEEEE",
        text: "#000000",
        card: "#afafaf",
        hover: "#01427a"
      }
    },
  },
  plugins: [],
}