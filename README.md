# Sai Prasath D P — Portfolio

Personal portfolio for a B.Com graduate moving into Data Analytics / Finance & Business Analytics.
Built with TanStack Start (React 19), TypeScript and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000.

## Push into the existing GitHub repo (saiprasath00/Leo)

From this folder:

```sh
git init
git remote add origin https://github.com/saiprasath00/Leo.git
git add .
git commit -m "New portfolio"
git push -f origin main
```

## Deploy (recommended)

This is a server-rendered app, so GitHub Pages alone shows a blank page.
Use a one-click host instead:

- **Vercel**: vercel.com → Add New Project → import `saiprasath00/Leo` → Deploy (auto-detects the framework).
- **Netlify**: app.netlify.com → Add new site → Import an existing project → pick `saiprasath00/Leo` → Deploy.

Both give a free URL and redeploy on every push to `main`.

## Content

All factual content (education, certifications, skills, links) lives in
`src/lib/portfolio.ts` — edit it there and every section updates.
