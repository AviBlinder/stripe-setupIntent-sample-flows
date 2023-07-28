/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
// 
// Define spacing and sizing system + colors system
// 

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    spacing: {
      1: '4px',
      1.5: '6px',
      2: '8px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      4.5: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '96px',
      10: '128px',
      11: '192px',
      12: '256px',
      13: '384px',
      14: '512px',
      15: '640px',
      16: '768px',
    },
    // fonts - set:
    // 1. font-size (text-sm, text-base, text-lg,text-xl...) +
    // 2. font-weight - see above setup  +
    // 3. text-color (lightness lower for de-emphasazing)

    // customized font-weights
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    extend: {
      // Palette 16:
      colors: {
        primary: colors.purple,
        // blue grey palleta
        secondary: {
          DEFAULT: '#486581',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
        },
        //   secondary: sky,
        //   transparent: 'transparent',
        //   current: 'currentColor',
        //   black: colors.black,
        //   white: colors.white,
        //   gray: colors.gray,
        //   emerald: colors.emerald,
        //   indigo: colors.indigo,
        //   yellow: colors.yellow,
        tahiti: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          DEFAULT: '#06b6d4',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // },
      },

      // customized additional font-sizes
      fontSize: {
        '2xl': [
          '24px',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '3xl': [
          '32px',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/typography'),
    ],
  },
};

