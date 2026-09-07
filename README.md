# Vivek Video Editor Portfolio — Next.js + TypeScript

This is the Next.js conversion of the original HTML/CSS/JavaScript portfolio.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add your media

Copy your existing files into `public/assets/`:

- `hero-portfolio.mp4`
- `hero-poster.jpg`
- `my-photo.png`
- `showreel.mp4`
- `reel-01.mp4` through `reel-08.mp4`
- matching `reel-01.jpg` through `reel-08.jpg`

## Where to edit content

Most portfolio content is at the top of `app/Portfolio.jsx` inside `DATA`.

The original visual system is retained in `app/globals.css`, including:
- dark/acid-lime visual style
- noise overlay
- cursor glow
- sticky glass navigation
- full-screen hero video
- outlined hero typography
- responsive layouts
- portrait/orbit/chips
- showreel section
- animated skill bars
- portfolio filters and video modal
- hover effects
- reveal-on-scroll animations
- mobile navigation
- reduced-motion support


## TypeScript

The application is fully converted to TypeScript:
- React components use `.tsx`
- Next.js page/layout use `.tsx`
- Typed portfolio data, skills, projects and contact objects
- `tsconfig.json` with strict type checking
- `next.config.ts`
- ESLint TypeScript configuration

There are no `.js` or `.jsx` application source files.
