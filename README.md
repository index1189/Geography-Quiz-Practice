# Map Quiz

Static page, no build step, no framework.

    index.html   the app
    key.js       the answer key — this is what gets shared with other people
    map.png      the map image — you supply this
    serve.js     optional local preview (see below)

## Setup

1. Save the blank Germany map your professor hands out as `map.png` here.
   Use the exact image you'll be quizzed on if you can — coordinates are
   stored relative to it, so swapping the image later invalidates the key.
2. Open the page.
3. **Edit term list** → paste your real 35 terms, one per line, in quiz-number
   order → **Apply list**.
4. **Author key** mode. Select a term, click its location(s):
   - **City / peak** — one click.
   - **River, border, coast** — tick **Line feature**, then click 5–10 points
     along its course. Anywhere on the path *between* your clicks counts as
     correct, so you don't have to click densely.
   - **Region or sea** — leave Line feature off, click a few spots across it.
5. It saves to your browser as you click. Nothing to press.

## Publishing the key to classmates

Browser storage is per-person: anyone else loading the page sees only what's
in `key.js`. When the key is done:

1. Author key mode → **Download key.js**
2. Replace this folder's `key.js` with the downloaded file
3. Push

`version` increments on every download. On load, the app takes whichever is
newer — the published `key.js` or the visitor's own saved copy — so a
classmate who marked up their own key keeps it until you publish a higher
version. **Revert to published key** (under Data) forces the published one.

## GitHub Pages

    git init
    git add .
    git commit -m "map quiz"
    git branch -M main
    git remote add origin https://github.com/<you>/<repo>.git
    git push -u origin main

Then **Settings → Pages → Source: Deploy from a branch → main → / (root) →
Save**. Live at `https://<you>.github.io/<repo>/` within a minute or two.
Re-push to update.

## Running it locally

Double-clicking `index.html` works in most browsers. If autosave reports a
failure (some browsers restrict storage on `file://` URLs), run:

    node serve.js

and open http://localhost:8123 instead. Authoring on the deployed URL works
too, and is the simplest option once it's up.

## Modes

- **Full quiz** — place all 35, then Check. Mirrors the real exam.
- **Drill** — one term at a time, weighted toward terms you've never seen and
  terms you keep missing. This is the mode that actually teaches the map.
- **Author key** — build the key.

**Tolerance** is the accepted radius as a percent of map width; it's saved into
`key.js`, so everyone grades the same way. 5% is a sane default — drop it to 3%
the week of the quiz to hold yourself to a tighter standard.
