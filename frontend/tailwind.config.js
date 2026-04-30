/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A', // blue-900
        },
        success: '#10B981', // emerald-500
        warning: '#F59E0B', // amber-500
        danger: '#EF4444', // red-500
      }
    },
  },
  plugins: [],
}
