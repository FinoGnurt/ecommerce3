/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    // styled: true, // Tắt các style mặc định
    themes: ["light"], // Tắt các chủ đề (themes)
    // base: false, // Tắt các base styles (các style mặc định của DaisyUI)
    // utils: true, // Tắt các tiện ích (utilities) không cần thiết
  },
};
