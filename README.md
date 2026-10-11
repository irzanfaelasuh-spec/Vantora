# VANTORA
Static site: HTML, CSS, vanilla JS. No build step, no dependencies, no modules (works from file:// too).

## Run
Open `index.html`, or run `python3 -m http.server` and visit http://localhost:8000.

## Deploy (GitHub Pages)
Push the folder to a repo → Settings → Pages → deploy from branch root. All paths are relative.

## Edit
- Social links: `config/social-links.js` (empty = "Link coming soon", not clickable).
- Images: replace entries in `ITEMS` (`js/app.js`) and put files in `assets/images/`.
- Video: set `src` in `VIDEOS` to e.g. `assets/videos/clip.mp4`.

## Settings
45 settings in 8 groups, stored in localStorage, with search, per-group reset, JSON import (validated per key, never executed) and export.

## Limitations (honest list)
- 45 settings, not 100+. Pages Explore/Gallery/Discover share one dataset.
- Images are generated SVG artwork; no photos or videos are bundled. No external assets are used.
- Newsletter is a validation demo; nothing is sent. Updates are sample data.
- Not browser-tested here; only a JavaScript syntax check was run.
- Custom 404 is the in-app "Page not found" view (hash routing).
