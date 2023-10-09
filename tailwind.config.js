/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        danger: "hsl(var(--danger))",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}