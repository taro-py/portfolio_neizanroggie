/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User requested palette names
        'bg-os': '#09090E',
        'bg-window': '#151521',
        'accent-cyan': '#00E5FF',
        'accent-purple': '#9D4EDD',
        'text-main': '#A9B1D6',
        
        // Semantic aliases ensuring bg-os, bg-window and text-main work intuitively
        os: '#09090E',
        window: '#151521',
        main: '#A9B1D6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
