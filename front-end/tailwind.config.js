/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'blues': {
          50: '#C7B6F3',
          100: '#A187EA',
          200: '#9072E4',
          300: '#7557C9',
          400: '#5F42B5',
          500: '#4c25b9',
          600: '#3F18B1',
          700: '#300C98',
          800: '#270A7D',
          900: '#2A1860',
          DEFAULT: '#5F42B5'        
        },
        transparent: 'transparent',
        base: '#070311',
        'darkblues': '#271366',
      }
    },

  },
  plugins: [],
};
