# Sai Prasath D P — Portfolio

Personal portfolio for Sai Prasath D P, B.Com graduate and aspiring data analyst in Bengaluru.

## Development

Install dependencies with `npm install`. Start the local site with `npm run dev`. Production build: `npm run build`. Type check: `npx tsc --noEmit`. Existing routing test: `npm test`.

Portfolio facts and document links are in `src/lib/portfolio.ts`. Page composition is in `src/routes/index.tsx`; styling and motion are in `src/styles.css`.

The redesign puts the owner's full name, career direction and evidence of practical work first. Interactive controls remain stationary. Decorative motion supports reduced-motion preferences and a manual pause control.

Existing resumes remain under `public/downloads`; their redesign is a separate phase.

Canonical site: https://saiprasathportfolio.netlify.app/

Local changes do not update the live Netlify deployment automatically. The static production output is `.output/public` for the default local build; the Netlify configuration uses its own runtime preset.
