/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "hsl(220, 98%, 61%)",
          "base-content": "hsl(234, 39%, 85%)",
          "base-300": "hsl(233, 11%, 84%)",
          "base-200": "hsl(235, 24%, 19%)",
          "base-100": "hsl(235, 21%, 11%)",
        },
        light: {
          primary: "hsl(220, 98%, 61%)",
          "base-content":"hsl(235, 19%, 35%)",
          "base-300": "hsl(234, 11%, 52%)",
          "base-200": "hsl(233, 14%, 35%)",
          "base-100": "hsl(235, 19%, 35%)",
        },
      },
    ],
  },
};
