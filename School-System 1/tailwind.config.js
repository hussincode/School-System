/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#dc2626", // Red 600
          light: "#f87171",   // Red 400
          dark: "#b91c1c",    // Red 700
        },
        danger: "#ef4444", // Red 500
        success: "#22c55e", // Green 500
        warning: "#f59e0b", // Amber 500
        info: "#3b82f6",    // Blue 500
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
}
