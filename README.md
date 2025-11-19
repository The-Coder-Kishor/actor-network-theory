# Actor Network Theory — single page build

This repository contains a single React page (UPI / NPCI Actor Network) bundled for static hosting (e.g., GitHub Pages).

Quick steps to build and publish:

1. Install dependencies

```powershell
npm install
```

2. Build bundle (produces `dist/bundle.js`)

```powershell
npm run build
```

3. Preview locally

You can use a static server to preview `dist/`. One simple way is to run the included esbuild dev command:

```powershell
npm run dev
# then open http://localhost:8000
```

4. Publish to GitHub Pages

- Option A (simple): Copy the contents of `dist/` into a `docs/` folder at repo root and push to the `main` branch. In GitHub repo settings > Pages, choose the `docs/` folder as the source.
- Option B: Push `dist/` to a `gh-pages` branch and enable Pages from that branch.

Notes & assumptions
- This setup uses the Tailwind CDN for styles so no Tailwind build step is required. For production, consider compiling Tailwind for a smaller CSS footprint.
- The component uses `lucide-react` for icons; the dependency is bundled by esbuild.

If you want, I can run the install + build now and verify `dist/bundle.js` was created. Would you like me to proceed? 
