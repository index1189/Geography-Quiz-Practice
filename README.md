# Map Quiz — Geo-quiz #1: Germany

Static page, no build step, no framework.

    index.html                  the app
    key.js                      the answer key — shared with everyone
    genkey.js                   regenerates key.js from latitude/longitude
    Relief_Map_of_Germany.png   the map
    serve.js                    optional local preview

## The map image

`key.js` names its own map file, so opening the page loads
`Relief_Map_of_Germany.png` automatically — no renaming, and classmates get the
right image too.

Positions are stored as *fractions* of the image, which means:

- **Resizing is safe.** The current file is 7.6 MB, which is slow to load over
  GitHub Pages. Scaling it down to ~1200 px wide would cut that by roughly 95%
  and the key still lines up exactly.
- **Cropping or changing projection is not.** A differently-framed map needs a
  new key.

The shipped key is built for the Wikipedia relief map bounds: 47.2°–55.1°N,
5.5°–15.5°E, equirectangular.

## The key

Pre-authored for all 35 terms, in the numbering from `Geoquiz--Germany.docx`.
Nothing was placed by eye — each location comes from its real latitude and
longitude through the mapping Wikipedia itself uses for this image:

    x = (lon - 5.5) / 10        y = (55.1 - lat) / 7.9

`genkey.js` holds the coordinate table and regenerates the key:

    node genkey.js > key.js

It refuses to emit a key if any point falls outside the image or if two cities
are close enough to be confused, so a bad edit fails loudly instead of silently
shipping a wrong answer.

### Judgment calls worth checking with your professor

- **#30 "The Rhineland" and #34 "Rhineland"** are the same region listed twice.
  Both are keyed identically. Ask which was intended.
- **#9 Prussia** was far larger than anything this map shows. Keyed on the
  Brandenburg core, spread away from Berlin and Potsdam.
- **#10 Alsace-Lorraine** is keyed as the 1871–1918 imperial territory: Alsace
  plus the Metz area, not all of Lorraine.
- **#32 The Alps** covers the whole visible arc, not just the Bavarian stretch.
- **#16 Liechtenstein** sits essentially on the bottom crop of this map; only
  its northern tip is visible.

## Tolerance

The accepted radius, as a percent of map width. Cities carry their own tighter
radius where a neighbour is close — Berlin and Potsdam are only 26 km apart, so
both are pinned to 2.5% and a click on one will not score as the other.

Global setting vs. how many term-pairs become interchangeable:

| Global | Radius | Fully ambiguous pairs |
|---|---|---|
| 3%  | 21 km | 8 |
| 5%  | 35 km | 13 |
| 8%  | 56 km | 33 (default) |
| 12% | 84 km | 50 |

8% is the shipped default. Push it higher if you want, but past ~8% the drill
starts marking you right for the wrong reason — at 12% a click on Berlin also
scores as Prussia and the Oder River. Tick **Show tolerance** to see the
accepted radius drawn on the map.

Some overlap is baked into the term list and no setting removes it: Munich is
inside Bavaria, Cologne is inside the Rhineland, the Vosges are inside
Alsace-Lorraine. Change one term's radius in Author key mode ("This term's
tolerance"), or change `GLOBAL_TOL` in `genkey.js` and regenerate.

## Modes

- **Full quiz** — place all 35, then Check. Mirrors the real exam.
- **Drill** — one term at a time, weighted toward terms you've never seen and
  terms you keep missing. Use the **Only _n_ to _n_** range to work in
  segments; it sticks until you change it or press All.
- **Author key** — build or correct the key. **Show key** labels every location
  with its number and name.

**Map size** rescales the image; the page scrolls when you go past the window.

## Publishing to classmates

Browser storage is per-person — others see only what's in `key.js`.
Author key mode → **Download key.js** → replace the file → push.

`version` increments on each download. On load the app takes whichever is newer,
the published key or the visitor's own saved copy, so a classmate who marked up
their own key keeps it until you publish a higher version. **Revert to published
key** (under Data) forces the published one.

## GitHub Pages

    git add -A
    git commit -m "map quiz"
    git push -u origin main

Then **Settings → Pages → Source: Deploy from a branch → main → / (root)**.
Live at `https://index1189.github.io/Geography-Quiz-Practice/`.

## Running locally

Double-clicking `index.html` works in most browsers. If autosave reports a
failure (some browsers restrict storage on `file://` URLs), run `node serve.js`
and open http://localhost:8123.

A map loaded through the file picker is only kept in browser storage if it's
small; a multi-megabyte one displays but won't survive a reload. Keeping it as a
file next to `index.html` is the reliable path.
