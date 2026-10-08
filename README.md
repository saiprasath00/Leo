# Sai Prasath D P — Portfolio

A personal portfolio site for Sai Prasath D P (B.Com graduate, aspiring Data Analyst), built with TanStack Start, React 19, TypeScript and Tailwind CSS v4.

## Push this into your GitHub repo (Leo)

1. Unzip this folder on your computer.
2. Open a terminal inside the unzipped folder and run:

```sh
git init
git remote add origin https://github.com/saiprasath00/Leo.git
git add .
git commit -m "New portfolio"
git branch -M main
git push -f origin main
```

(When asked for a password, use a GitHub Personal Access Token, not your account password.)

## Deploy on Netlify (free)

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub**, and pick the **Leo** repository.
2. Netlify reads `netlify.toml` and sets everything up automatically. Just click **Deploy**.
3. Every future push to the repo updates your live site automatically.

Note: GitHub Pages alone cannot host this site (it needs a small server) — Netlify, Vercel or Cloudflare Pages all work out of the box with this setup.

## Run locally

```sh
npm install
npm run dev
```

## Where content lives

All portfolio facts (skills, education, certifications, languages, resume link, contact details) are in `src/lib/portfolio.ts`. Page structure is `src/routes/index.tsx`; styles and the animation system are in `src/styles.css`.
