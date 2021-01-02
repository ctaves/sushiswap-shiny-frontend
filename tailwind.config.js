const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  //prefix: "sushi-",
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
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
