/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xxs: "100px",
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "2.5xl": "1680px",
      "3xl": "1922px",
      "4xl": "2200px",
    },
    container: {
      center: true,
      screens: {
        xl: "1280px",
      },
    },
    extend: {
      fontSize: { "2xs": "10px" },
      boxShadow: {
        'custom': '0px 7px 29px rgba(100, 100, 111, 0.2)'
      }
    },
  },
  plugins: [],
};
