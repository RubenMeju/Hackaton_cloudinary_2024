/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fly-bat": {
          "0%": { transform: "translateX(0vw) translateY(20)" },
          "25%": { transform: "translateX(70vw) translateY(40vh)" },
          "40%": { transform: "translateX(110vw) translateY(40vh)" },
          "42% ": {
            transform: "translateX(110vw) translateY(40vh) scale(-1, 1)",
          },
          "50%": { transform: "translateX(50) translateY(50vh) scale(-1, 1)" },

          "60%": { transform: "translateX(0) translateY(70vh) scale(-1, 1)" },
          "70%": {
            transform: "translateX(-20vw) translateY(50vh) scale(-1, 1)",
          },
          "100%": {
            transform: "translateX(-100vw) translateY(0) scale(-1, 1)",
          },
        },
      },
      animation: {
        "fly-bat": "fly-bat 10s ease-in-out infinite",
      },
    },
  },
  variants: {},
  plugins: [],
};
