# Brambleheart App — Alpha Build 0.02

Brambleheart companion app built with Vue 3, TypeScript, Vite, Vue Router, shared components, routed views, shared styling/settings, and a `dist/` production build.

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

Import the GitHub repository as a Vite project. The included `vercel.json` provides the SPA fallback to `index.html`.

Recommended Vercel settings:

- Framework Preset: Vite
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x
- Environment Variables: none required for v0.02

There is no root Node server, Express server, or Vercel Function entry point.

## Local data

Characters and display settings are saved to browser `localStorage`. Alpha 0.02 keeps the existing v0.01 storage keys so current local character data and compatible settings carry forward.
