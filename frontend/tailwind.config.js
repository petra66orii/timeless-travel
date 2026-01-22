/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // "Playwrite AU SA" for headings
        heading: ['"Playwrite AU SA"', 'cursive'],
        // "Work Sans" for body text
        body: ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        // Legacy "Pastel & Sky Blue" Theme
        pastel: {
          blue: '#D6EAF8', // Light blue for Navbar
          dark: '#2C3E50', // Text color
        },
        // Strong CRUD colors
        action: {
          create: '#27AE60', // Green
          edit: '#F39C12',   // Orange
          delete: '#C0392B', // Red
          info: '#2980B9',   // Blue
        }
      }
    },
  },
  plugins: [],
}