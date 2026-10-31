# Sai Prasath D P — Portfolio

A personal portfolio for **Sai Prasath D P**, a B.Com graduate in Bengaluru working with Excel, Power BI and financial statements.

The site is a static, single-page build with an editorial / data-instrument look: a person-first hero, a draggable TCS revenue scenario chart, an Excel model card, a Power BI report schematic, a toolkit, a journey timeline, credentials, and a direct contact section. It is designed to be read without JavaScript, and it does not use cookies, analytics or third-party tracking.

## Stack

- [Vite 7](https://vite.dev/) — static build
- Vanilla JavaScript — no framework
- [GSAP 3](https://gsap.com/) — hero entrance and pointer parallax
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- Self-hosted fonts: **Tanker**, **Switzer** (Fontshare) and **DM Mono** (Google Fonts)

## Run locally

Requires **Node 20.19+** (tested on Node 24).

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy

This folder is self-contained inside the Leo repository. Deploy its **`dist/` output**, not the repository root.

### Netlify

`netlify.toml` is included with the build command (`npm run build --prefix portfolio`), publish directory (`portfolio/dist`) and cache headers. Set Netlify’s base directory to the repository root when linking this repository.

- Drag `dist/` into the Netlify dashboard, or
- run `npx netlify deploy --prod --dir=dist` after `npm run build`.

### Vercel

```bash
npx vercel --prod
```

Use the Vite preset and `dist` as the output directory.

### GitHub Pages

The standalone project paths use root-absolute URLs. A GitHub Pages project URL under `/Leo/portfolio/` requires a custom Vite base and adjusted asset paths; Netlify or Vercel is the simpler option.

### Any static host

Upload the contents of `dist/`. No server-side code is required.

## Content and data notes

- The **TCS Excel model** is an independent academic project built from public TCS annual reports. FY2018–FY2025 are actuals; the Base, Bull and Bear paths to FY2028 are the model's scenario logic. They are **not** TCS guidance, broker consensus or investment advice.
- The **Power BI card** is an interface schematic of the four-page PBIP report. Download the PBIP source for the live model. Set the local `WorkbookPath` before the first refresh.
- The interactive chart is indexed to **FY2018 = 100**. Hover/tap the chart or use the scenario slider; the full table is available under “View the chart data”.
- Downloads live in `public/downloads/`:
  - `Sai_Prasath_DP_Resume_Professional.pdf`
  - `Sai_Prasath_Resume_Pack.zip`
  - `TCS_Financial_Forecasting_Model.xlsx`
  - `TCS_Financial_Outlook_Dashboard_PBIP.zip`

## Project map

| Path | What it is |
| --- | --- |
| `index.html` | Page content, metadata and JSON-LD |
| `src/main.js` | Menu, hero entrance, reveal, chart, tabs, accordion, clock, copy email |
| `src/styles/style.css` | Imports, motion rules, responsive shell |
| `src/styles/base.css` | Tokens, header, type scale, ticker, shared components |
| `src/styles/hero.css` | Person-first hero |
| `src/styles/about.css` | About story, facts panel, “How I work” |
| `src/styles/work-excel.css` | Excel project and interactive chart |
| `src/styles/work-bi.css` | Power BI report schematic |
| `src/styles/toolkit.css` | Toolkit and learning strip |
| `src/styles/journey.css` | Timeline, credentials, resume CTA |
| `src/styles/contact.css` | Contact section |
| `src/styles/footer.css` | Footer |
| `public/404.html` | Standalone 404 page |
| `public/og.png` | 1200×630 social card |
| `design/og-card.html` | Source layout for the social card (not built) |

## Editing notes

- **Metadata:** update the `<head>` of `index.html`, including `og:image` and `twitter:image`. Once the site has a domain, change those to absolute URLs for reliable social previews.
- **Contact details:** email, phone and LinkedIn are in `index.html` (hero, contact, footer and JSON-LD).
- **Downloads:** replace files in `public/downloads/` and keep the filenames, or update the links.
- **Social image:** edit `design/og-card.html`, serve it with `npm run dev`, and screenshot it at 1200×630 to `public/og.png`.
- **404 page:** `public/404.html` is a standalone page with its own inline CSS, so it works on static hosts that serve it for unknown routes.

## Accessibility and motion

- Content is visible without JavaScript. The chart falls back to the Base case and a data table.
- `prefers-reduced-motion: reduce` disables the entrance/scroll animations, ticker and decorative motion.
- The page includes a skip link, visible focus styles, a keyboard-operable tablist, native `<details>` accordions, and an `aria-live` copy-email button.
- No cookies, no analytics, no third-party scripts.

## Credits

- **Tanker** and **Switzer** by [Fontshare](https://www.fontshare.com/) — free for personal and commercial use under the Fontshare license.
- **DM Mono** by Google Fonts — SIL Open Font License.
- The TCS name and annual-report data belong to Tata Consultancy Services. The projects shown here are independent academic work.

Built by Sai Prasath D P, Bengaluru.
