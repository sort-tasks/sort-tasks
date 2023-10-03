/// <reference path="./src/tailwind-material-colors.d.ts" />
const { withMaterialColors } = require('tailwind-material-colors');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};

// https://m3.material.io/theme-builder#/custom
// https://github.com/JavierM42/tailwind-material-colors
// https://tailwind-material-colors-docs.vercel.app
export default withMaterialColors(
  config,
  {
    primary: '#5B1C98',
    secondary: '#981C97',
    tertiary: '#1D1C98',
  },
  { extend: true },
);
