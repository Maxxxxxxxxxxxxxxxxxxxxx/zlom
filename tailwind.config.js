/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "ui-base-dark": "var(--ui-base-dark)",
        "ui-base-dark-darker": "var(--ui-base-dark-darker)",
        "ui-base-red": "var(--ui-base-red)",
        "ui-base-light": "var(--ui-base-light)",
        "modal-bg": "var(--modal-bg)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        grow: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        shrink: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-out",
        grow: "grow 0.4s ease-out",
        shrink: "shrink 0.4s ease-out",
      },
    },
    plugins: [],
  },
};
