/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,
        // or add them one by one and name whatever you want
        // transparent: 'transparent',
        // current: 'currentColor',
        // amber: colors.amber,
        // black: colors.black,
        // emerald: colors.emerald,
        // gray: colors.trueGray,
        // indigo: colors.indigo,
        // lime:colors.lime,
        // purple:colors.purple,
        // red: colors.rose,
        // sky:colors.sky,
        // teal:colors.teal,
        // white: colors.white,

        // sky: colors.lightBlue,
        // stone: colors.warmGray,
        // neutral: colors.trueGray,
        // gray: colors.coolGray,
        // slate: colors.blueGray,
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(transparent|current|amber|neutral|black|emerald|gray|indigo|lime|purple|red|sky|teal|white)/
    }
  ]
})
