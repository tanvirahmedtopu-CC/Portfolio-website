# TAT Media portfolio

React portfolio for [tatmedia.xyz](https://www.tatmedia.xyz/). GitHub Pages publishes the **repository root on `main`**. Both editable source and the production output are committed.

## Build and publish

```sh
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..
node scripts/publish-build.mjs
```

Review the result, then commit and push. The publishing script preserves `CNAME`, copies the built assets and media, and refreshes the 404 fallback. Do not edit root `index.html` or hashed assets directly.

## Portfolio media

The 12 supplied samples are delivered as local H.264/AAC MP4s. Each has a small silent 7-second preview, a JPEG poster, and a full-length 720-pixel-wide web copy. Originals stay outside the repository. Full films load when a viewer opens the player. Previews load in view and pause when offscreen, when the tab is hidden, when a film opens, or when the visitor pauses them. Reduced-motion and data-saving preferences keep static posters.

To rebuild media (requires Python 3 and FFmpeg):

```sh
python3 scripts/prepare-portfolio-media.py '/path/to/sample videos'
```

Edit the media mapping in that script; it generates `frontend/src/data/selectedWork.json`. The original Drive and Dropbox archive links live in `frontend/src/data/portfolioVideos.js`.

## Interactions

- Portfolio category filters, scroll-linked parallax and accessible Radix video dialog.
- Brand phones follow page scroll on wide, tall desktop screens. Mobile, short screens and reduced-motion visitors get a native horizontal gallery. Arrow keys, Home and End work on the focused desktop gallery.
- AI workflow content and vendor source URLs live in `frontend/src/data/aiWorkflow.js` (verified September 28, 2026).
- Contact form creates an email draft; it does **not** claim a message was sent. No server or email delivery service is configured.

## Design

Existing black / cyan / violet identity and the interactive hero are retained. Sora headlines and Inter text frame the real work. `frontend/src/studio.css` owns the upgraded sections. The portfolio now follows the hero immediately.
