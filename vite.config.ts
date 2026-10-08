// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Relative assets work at both GitHub Pages' /Leo/ subpath and Netlify's root.
    base: "./",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // GitHub Pages needs static HTML, while Netlify uses its Nitro function.
    // The current Nitro Netlify preset stores the function outside the preview
    // location used by the prerender shim, so do not prerender in that build.
    prerender: {
      enabled: process.env.NETLIFY !== "true",
      crawlLinks: true,
    },
  },
});
