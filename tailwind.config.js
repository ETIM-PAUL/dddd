/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        tableGridBody: "1.4fr 0.9fr 0.92fr 0.2fr",
        tableGridHead: "1.4fr 0.9fr 0.92fr 0.2fr",
        searchTracksHead: "1.4fr 0.9fr 0.15fr",
        searchTracksBody: "1.4fr 0.9fr 0.15fr",

        itemsColumn: "minmax(auto,1fr)",
      },
      gridTemplateRows: {
        // Simple 16 column grid
        full: "100%",
        tableGridBody: "1.4fr 0.9fr 0.92fr 0.2fr",
        tableGridHead: "1.4fr 0.9fr 0.92fr 0.2fr",
      },
      animation: {
        bounce: "bounce 1s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
