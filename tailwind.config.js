const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  //prefix: "sushi-",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
      colors: {
        "blue-brand": "#27B0E6",
        "blue-brand-dark": "#2397c4",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  purge: false, //If you have manually configured PurgeCSS outside of Tailwind
};
