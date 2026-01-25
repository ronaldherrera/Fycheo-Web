/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-dark": "#192233",
        "surface-light": "#ffffff",
        "border-dark": "#324467",
        "text-secondary": "#92a4c9",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(19, 91, 236, 0.3)",
      },
      keyframes: {
        draw: {
          "0%": { strokeDasharray: "0, 1000" },
          "100%": { strokeDasharray: "1000, 0" },
        },
        drawStroke: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        pop: {
          "0%": { transform: "scale(0.95)" },
          "40%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        draw: "drawStroke 1.5s ease-out forwards",
        pop: "pop 0.3s ease-out",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        slideInRight: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideOutRight: "slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
}
