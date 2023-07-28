/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    // related to margin, padding, height, width:
    spacing: {
      1: '4px',
      2: '8px',
      3: '12px',
      3.5: '14px',
      4: '16px',
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
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        //   secondary: sky,
        //   transparent: 'transparent',
        //   current: 'currentColor',
        //   black: colors.black,
        //   white: colors.white,
        //   gray: colors.gray,
        //   emerald: colors.emerald,
        //   indigo: colors.indigo,
        //   yellow: colors.yellow,
        //   tahiti: {
        //     100: '#cffafe',
        //     200: '#a5f3fc',
        //     300: '#67e8f9',
        //     400: '#22d3ee',
        //     500: '#06b6d4',
        //     600: '#0891b2',
        //     700: '#0e7490',
        //     800: '#155e75',
        //     900: '#164e63',
        //   },
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

