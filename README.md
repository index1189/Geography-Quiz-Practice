# Map Quiz

Static page, no build step, no framework.

    index.html   the app
    key.js       the answer key — this is what gets shared with other people
    genkey.js    regenerates key.js from latitude/longitude (see below)
    map.png      the map image — you supply this
    serve.js     optional local preview

## The map image matters

`key.js` stores positions as fractions of the image, so **it is only correct for
one specific map**. The shipped key was built for the Wikipedia relief map of
Germany (`Relief Map of Germany`, the one covering 47.2°–55.1°N and 5.5°–15.5°E).
Save that image here as `map.png`.

If you use a different map — a different crop, a different projection, your
professor's own handout — the shipped key will be wrong and you'll need to
re-mark the points in Author key mode.

## The shipped key

`key.js` is pre-authored: all 35 terms, rivers as multi-point paths. It wasn't
placed by eye. Each location comes from its real latitude/longitude, converted
with the same linear mapping Wikipedia uses to place pins on this image:

    x = (lon - 5.5) / 10        y = (55.1 - lat) / 7.9

`genkey.js` holds the coordinate table and regenerates `key.js`:

    node genkey.js > key.js

Edit the lat/lon table there if you want to move something, or just drag it in
Author key mode — both work, but only `genkey.js` keeps a readable record.

**Check it before you trust it.** Tick **Show key** and confirm the dots and
river paths sit where they should. Two terms worth a second look:

- **Rhineland** is genuinely ambiguous — the key treats it as the western
  Rhine corridor. Match it to whatever your professor means.
- **Bavarian Alps / Black Forest / Ruhr Area** are spread across several points.
  Widen or narrow them to taste.

## Your actual term list

The 35 terms shipped here are a *plausible guess*, not your real quiz list. If
yours differs, open **Edit term list**, paste your real 35 in quiz-number order,
and Apply. Points are preserved for any term whose spelling is unchanged, so
fixing the list won't cost you the key — but any genuinely new term will need
marking by hand.

## Tolerance

The accepted radius, as a percent of map width. Roughly:

| Setting | On the ground | Feel |
|---|---|---|
| 5%  | ~35 km  | strict |
| 12% | ~84 km  | default — "right general area" |
| 25% | ~175 km | very forgiving |
| 40% | ~280 km | nearly a quarter of Germany |

Tick **Show tolerance** to draw the accepted radius as a dashed circle, so you
can see exactly how lenient a setting is instead of guessing. Tolerance is saved
into `key.js`, so everyone grades the same way.

## Modes

- **Full quiz** — place all 35, then Check. Mirrors the real exam.
- **Drill** — one term at a time, weighted toward terms you've never seen and
  terms you keep missing. This is the mode that actually teaches the map.
- **Author key** — build or correct the key.

**Map size** rescales the image; the page scrolls when you go past the window.
Turn it up when placing points precisely, down to see the whole country.

## Publishing to classmates

Browser storage is per-person — anyone else sees only what's in `key.js`.
Author key mode → **Download key.js** → replace this folder's `key.js` → push.

`version` increments on every download. On load the app takes whichever is
newer, the published `key.js` or the visitor's own saved copy, so a classmate
who marked up their own key keeps it until you publish a higher version.
**Revert to published key** (under Data) forces the published one.

## GitHub Pages

The remote is already set. To publish:

    git add -A
    git commit -m "map quiz"
    git push -u origin main

Then **Settings → Pages → Source: Deploy from a branch → main → / (root) →
Save**. Live at `https://index1189.github.io/Geography-Quiz-Practice/`.

## Running locally

Double-clicking `index.html` works in most browsers. If autosave reports a
failure (some browsers restrict storage on `file://` URLs), run `node serve.js`
and open http://localhost:8123. Authoring on the deployed URL works too.

Note: a map loaded through the file picker is kept in browser storage only if
it's small. A multi-megabyte image will display but won't survive a reload —
save it as `map.png` instead, which is the reliable path anyway.
