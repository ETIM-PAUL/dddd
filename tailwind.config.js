/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        tableGridBody: "1.4fr 0.9fr 0.92fr 0.2fr",
        tableGridHead: "1.4fr 0.9fr 0.92fr 0.2fr",
      },
    },
  },
  plugins: [],
};
