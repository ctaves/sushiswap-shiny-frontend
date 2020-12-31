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
        "blue-brand": "#0090a6", //"#27B0E6",
        "blue-brand-dark": "#067587", //"#s2397c4",
        "green-finance": "#04c806",
        "red-finance": "#ff5001",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  purge: false, //If you have manually configured PurgeCSS outside of Tailwind
};
