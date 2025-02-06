/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "ui-base-dark": "var(--ui-base-dark)",
        "ui-base-dark-darker": "var(--ui-base-dark-darker)",
        "ui-base-red": "var(--ui-base-red)",
      },
    },
    plugins: [],
  },
};
