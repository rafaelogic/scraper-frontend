/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false, 
  theme: {
    extend: {
      display: ["group-hover"]
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
  safelist: [
    {
      pattern: /bg-+|border-+/, // 👈  This includes bg of all colors and shades
    },
  ],
}
