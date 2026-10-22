# Sai Prasath D P — Portfolio

Personal portfolio for Sai Prasath D P, B.Com graduate and aspiring data analyst in Bengaluru.

## Development

Install dependencies with `npm install`. Start the local site with `npm run dev`. Production build: `npm run build`. Type check: `npx tsc --noEmit`. Existing routing test: `npm test`.

Portfolio facts and document links are in `src/lib/portfolio.ts`. Page composition is in `src/routes/index.tsx`; styling and motion are in `src/styles.css`.

The redesign puts the owner's full name, career direction and evidence of practical work first. Interactive controls remain stationary. Decorative motion supports reduced-motion preferences and a manual pause control.

Existing resumes remain under `public/downloads`; their redesign is a separate phase.

Canonical site: https://saiprasathportfolio.netlify.app/

## Publishing

The live GitHub Pages site is https://saiprasath00.github.io/Leo/ . Pushing `main` runs `.github/workflows/deploy-pages.yml` and publishes `.output/public`.

Netlify also publishes `.output/public`, including the prerendered `index.html`. Its build command is `npm run build`. The build uses the fetch-compatible Nitro adapter required by the current prerender plugin; only the static output is published, so no Cloudflare service or Netlify server function is required.

To update https://saiprasathportfolio.netlify.app/ , connect that existing Netlify project to this repository's `main` branch, or deploy `.output/public` to that project with Netlify CLI. A GitHub Pages deployment does not update the Netlify address.
