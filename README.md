# Juan Paulo OS

A personal portfolio website for Juan Paulo Rubilar Fontt built as a nostalgic Windows-style desktop. The interface opens portfolio sections as draggable and resizable windows, with a responsive mobile app launcher.

## Stack

- Astro
- React and TypeScript
- Tailwind CSS
- Three.js
- GSAP

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, usually `http://127.0.0.1:4321`.

## Build

```bash
npm run build
```

## Structure

```text
src/
  components/
    BootScreen.tsx
    Desktop.tsx
    DesktopIcon.tsx
    StartMenu.tsx
    Taskbar.tsx
    ThreeBackground.tsx
    Window.tsx
    WindowManager.tsx
  data/
    portfolio.ts
  pages/
    index.astro
  styles/
    global.css
```

Portfolio copy is placeholder-first and lives mostly in `src/data/portfolio.ts`, so real CV content can replace it later without rewriting the UI.
