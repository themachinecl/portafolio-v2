/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        system: ['Tahoma', 'Verdana', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        win: 'inset 1px 1px 0 rgba(255,255,255,.95), inset -1px -1px 0 rgba(0,0,0,.38), 0 18px 40px rgba(0,0,0,.25)',
        panel: 'inset 1px 1px 0 rgba(255,255,255,.9), inset -1px -1px 0 rgba(44,52,80,.4)',
      },
    },
  },
  plugins: [],
};
