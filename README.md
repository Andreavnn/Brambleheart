# Brambleheart App — Alpha Build 0.01

Brambleheart companion app rebuilt on the same application pattern used by Old.dex: Vue 3, TypeScript, Vite, Vue Router, shared components, routed views, shared styling/settings, and a `dist/` production build.

## Main views

- Character List
- Rules
- Simulator
- Settings

## Development

```bash
npm install
npm run dev
```

## Validation / production build

```bash
npm run typecheck
npm run build
```

Vite writes the deployable application to `dist/`.

## Vercel

Import the GitHub repository as a Vite project. The included `vercel.json` declares the Vite framework and a SPA fallback to `index.html`.

Recommended Vercel settings:

- Framework Preset: Vite
- Root Directory: `./`
- Build Command: `npm run build` (Vite preset default is also fine)
- Output Directory: `dist` (Vite preset default is also fine)
- Node.js: 22.x
- Environment Variables: none required for v0.01

There is no root Node server, Express server, or Vercel Function entry point.

## Local data

Characters and display settings are saved to browser `localStorage`.
