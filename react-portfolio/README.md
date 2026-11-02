# shan irshad — portfolio

Personal portfolio built with React and Vite.

The redesign uses a warm paper background, olive accents, and an editorial single-column layout. All five existing experience entries and both existing products are retained; TR8DE and education were added from the supplied brief. Assets remain in `public/images/` for future use.

Edit `src/data/portfolio.js` to update projects, experience, and social links. Set `resumeUrl` and TR8DE's `link` after their public destinations are confirmed. Add `{ title, date, href }` entries to `writing` to reveal the notes section. The original inventory is in `../CONTENT_INVENTORY.md`.

The source page is `src/App.jsx`. Existing `sections/` and `ui/` files are retained as legacy components and are no longer rendered by the app.

## scripts

- `npm run dev` — start the local development server
- `npm run build` — build the static site into the repository root
- `npm run lint` — run ESLint

## structure

```
src/
  data/portfolio.js    — portfolio content (experiences, products, links)
  sections/            — page sections (About, Experience, Products)
  ui/                  — reusable UI components
  styles/main.css      — all site styles
public/images/         — static image assets
```
