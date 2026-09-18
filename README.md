# Map Quiz

Static page, no build step, no framework. Holds any number of quizzes; pick one
from the dropdown, or link straight to it with `#germany` / `#france`.

    index.html                    the app
    germany.key.js                published key, Geo-quiz #1
    france.key.js                 published key, Geo-quiz #2
    quizdata/germany.js           coordinate data the key is generated from
    quizdata/france.js
    genkey.js                     node genkey.js france > france.key.js
    Relief_Map_of_Germany.png     maps — each key names the one it expects
    France_relief_location_map.jpg
    serve.js                      optional local preview

## Adding a quiz

1. Put the map image in this folder. Wikipedia's relief location maps are ideal
   because their geographic bounds are published: look up
   `Module:Location map/data/<Country>` on en.wikipedia.org for `top`,
   `bottom`, `left`, `right`. Check it has no `x =` / `y =` lines — those mean
   a non-linear projection, and the generator only handles linear ones.
2. Copy `quizdata/france.js` to `quizdata/<name>.js`. Fill in `id`, `title`,
   `map`, `bounds`, `aspect` (image height ÷ width) and the term list as real
   latitude/longitude, in quiz-number order.
3. `node genkey.js <name> > <name>.key.js`
4. Add `<script src="<name>.key.js"></script>` to `index.html` next to the
   other key files.

The generator refuses to emit a key if any point is off the map, a label is
duplicated, or two cities are close enough to be confused.

## How positions are computed

Nothing is placed by eye. Each location comes from its real coordinates
through the same linear mapping Wikipedia uses to place pins on that image:

    x = (lon - left) / (right - left)      y = (top - lat) / (top - bottom)

Positions are stored as fractions of the image, so **resizing a map is safe**
(the Germany one is 7.6 MB and would load faster at ~1200 px wide) but
**cropping or re-projecting is not**.

## Tolerance

The accepted radius, as a percent of map width. Cities near other cities carry
their own tighter radius (Berlin/Potsdam and Marseilles/Toulon are pinned to
2.5% so one can't score as the other). Tick **Show tolerance** to see it drawn.

Because it's a percentage, the same number means different distances on
different maps — the France map spans 15.8° of longitude, Germany's 10°. The
shipped defaults give roughly the same ~60 km radius on both:

| Quiz | Default | On the ground | Ambiguous pairs at this setting |
|---|---|---|---|
| Germany | 8% | ~56 km | 33 |
| France | 5% | ~61 km | 19 |

Push the slider up if you want, but past these the drill starts marking you
right for the wrong reason (at 12% on France, 64 term-pairs are
interchangeable). Some overlap is built into the term lists and no setting
removes it: Toulon is inside Provence, Metz inside Alsace-Lorraine, Munich
inside Bavaria.

To change a default: edit `tol` in the quizdata file and regenerate, or slide
it in the app and download the key.

## Modes

- **Full quiz** — place everything, then Check. Mirrors the real exam.
- **Drill** — one term at a time, weighted toward terms you've never seen and
  ones you keep missing. **Only _n_ to _n_** restricts it to a number range
  so you can memorise in segments.
- **Author key** — build or correct a key by clicking. **Show key** labels
  every location with its number and name.

## Judgment calls in the shipped keys

**Germany** — #30 "The Rhineland" and #34 "Rhineland" are the same region
listed twice (keyed identically; ask which was meant). Prussia keyed on the
Brandenburg core. Alsace-Lorraine as the 1871–1918 territory. Liechtenstein sits
on the bottom crop of the map.

**France** — "La Havre" corrected to Le Havre and a stray semicolon dropped from
Massif Central; Lyons and Marseilles kept as given (both valid English forms).
Gascony keyed as historic Gascony (Landes and Gers). The Netherlands is a thin
strip at the very top of this map. The Rhine includes everything visible, from
Lake Constance up to Cologne, not only the Alsace stretch.

## Publishing to classmates

Browser storage is per-person — others see only what's in the key files.
Author key mode → **Download key file** → replace `<name>.key.js` → push.

`version` increments on every download. On load the app takes whichever is
newer, the published key or the visitor's own saved copy. **Revert to
published key** (under Data) forces the published one.

## GitHub Pages

    git add -A
    git commit -m "France quiz"
    git push

Live at `https://index1189.github.io/Geography-Quiz-Practice/` — and
`.../#france` opens straight to the France quiz.

## Running locally

Double-clicking `index.html` works in most browsers. If autosave reports a
failure, run `node serve.js` and open http://localhost:8123.
