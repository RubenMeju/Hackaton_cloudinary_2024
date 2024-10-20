/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        flash: "flash 0.2s",
      },
      keyframes: {
        flash: {
          "0%, 100%": { opacity: 0.05 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
