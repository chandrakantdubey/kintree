/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      container: {
        center: "true",
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1.25rem",
          lg: "1.5rem",
          xl: "2rem",
        },
        screens: {
          // sm: "640px",
          // md: "768px",
          // lg: "1024px",
          xl: "1280px",
        },
      },
      colors: {
        brand: "#fdf7ed",
        purple: "#692e99",
        text: "#000000",
        placeholder: "#646464",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
