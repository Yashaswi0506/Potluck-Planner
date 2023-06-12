/**@type {import('tailwindcss').Config} */
import daisyui from "daisyui";
//import { daisyui } from "daisyui/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["lemonade"]
  }
};
