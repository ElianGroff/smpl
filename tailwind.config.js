/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      maven: ["Maven Pro"],
      main: ["Roboto"],
      code: ["Courier New"],
    },
    extend: {
      screens: {
        sm: { max: "450px", min: "240px" },
        micro: { max: "240px", min: "126px" },
        supermicro: { max: "126px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
