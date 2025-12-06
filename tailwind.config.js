module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Modo claro
        cineLight: "#F5F4F0",
        accentLight: "#A259FF",
        accentWarm: "#FFB347",

        // Modo oscuro
        cineDark: "#0A0A0A",
        accentDark: "#FF5757",
        accentNeon: "#9D00FF",
      },
    },
  },
  plugins: [],
};
