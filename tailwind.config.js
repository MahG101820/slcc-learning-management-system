/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    extend: {
      width: {
        activeLinkWidth: "var(--activeLinkWidth)"
      },
      translate: {
        activeLinkLocation: "var(--activeLinkLocation)"
      }
    }
  },
  plugins: []
};
