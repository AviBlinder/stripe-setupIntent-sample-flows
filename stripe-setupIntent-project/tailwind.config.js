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
    // Typhography setup:
    // 1. font-size (text-sm, text-base, text-lg,text-xl...)
    // 2. font-weight (font-extralight ...)
    // 3. text-color (lightness lower for de-emphasazing)
    // 4. letter spacing (tracking-tighter...)
    // 5. Line Hight (leading-3 ...)
    // 6. text-align (text-center, text-left, text-start, text-justify ...)
    // 7. Vertical align (align-baseline, align-middle, align-top...)

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
      fontFamily: {
        Roboto: ['Roboto, sans-serif'],
      },
      // Palette 16:
      // [TailwindCSS Colors Generatos](https://uicolors.app/create)
      colors: {
        // primary: colors.purple,
        // palette #19
        // primary: {
        //   900: '#19216C',
        //   800: '#647ACB',
        //   700: '#2D3A8C',
        //   600: '#7B93DB',
        //   500: '#35469C',
        //   400: '#98AEEB',
        //   300: '#4055A8',
        //   200: '#BED0F7',
        //   100: '#4C63B6',
        //   50: '#E0E8F9',
        // },
        // cornflower:
        primary: {
          50: '#f2f7fc',
          100: '#e1ecf8',
          200: '#cadff3',
          300: '#9fc7ea',
          400: '#7aaee0',
          500: '#5a92d7',
          600: '#4677ca',
          700: '#3c65b9',
          800: '#365397',
          900: '#304778',
          950: '#212e4a',
        },

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
        // xs: ['14px',{lineHeight: '24px', letterSpacing: '-0.03em'}]
        // sm: ['16px',{lineHeight: '28px', letterSpacing: '-0.03em'}]
        // lg: ['18px',{lineHeight: '28px', letterSpacing: '-0.03em'}]
        // xl: ['24px',{lineHeight: '36px', letterSpacing: '-0.03em'}]
        // 2xl: ['36px',{lineHeight: '48px', letterSpacing: '-0.032em'}]
        // 3xl: ['48px',{lineHeight: '56px', letterSpacing: '-0.032em'}]
        // 4xl: ['56px',{lineHeight: '64px', letterSpacing: '-0.032em'}]
        // 5xl: ['80px',{lineHeight: '80px', letterSpacing: '-0.032em'}]
        '2xl': [
          '24px',
          { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: '500' },
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
