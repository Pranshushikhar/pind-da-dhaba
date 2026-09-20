/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '430px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        charcoal: {
          950: '#0A0A09', // deepest page background
          900: '#121211', // main background
          850: '#181716', // card background
          800: '#22201E', // card hover / raised
          700: '#322E2B', // subtle borders
          600: '#46413D', // muted borders
        },
        cream: {
          50: '#FFFEFA',
          100: '#FDFBF7', // main warm cream text
          200: '#F5EFE6', // muted cream
          300: '#E8DCCF', // dimmer cream
          400: '#C7B9A7', // muted text
        },
        terracotta: {
          400: '#E0724C',
          500: '#C85A32', // brand terracotta
          600: '#B04722',
          700: '#8F3516',
        },
        earth: {
          700: '#523B32',
          800: '#3D2A23',
          900: '#291C17',
          950: '#1D130F',
        },
        saffron: {
          300: '#FCD385',
          400: '#F3C068',
          500: '#E5A93C', // subtle gold/saffron highlight
          600: '#C48820',
          700: '#9B6611',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
