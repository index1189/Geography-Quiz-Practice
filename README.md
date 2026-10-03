# Map Quiz

Static page, no build step, no framework. Holds any number of quizzes; pick one
from the dropdown, or link straight to it with `#germany` / `#france`.

    index.html                    the app
    germany.key.js                published key, Geo-quiz #1
    france.key.js                 published key, Geo-quiz #2
    uk.key.js                     published key, Geo-quiz #3
    quizdata/germany.js           coordinate data the keys are generated from
    quizdata/france.js
    quizdata/uk.js
    genkey.js                     node genkey.js uk > uk.key.js
    Relief_Map_of_Germany.png     maps — each key names the one it expects
    France_relief_location_map.jpg
    uk-relief-map.jpg
    serve.js                      optional local preview

## Adding a quiz

1. Put the map image in this folder, then get its geographic bounds.

   **If it's a Wikipedia location map**, they're published: look up
   `Module:Location map/data/<Country>` on en.wikipedia.org for `top`,
   `bottom`, `left`, `right`. Check it has no `x =` / `y =` lines — those mean
   a non-linear projection, and the generator only handles linear ones.

   **If it isn't** (the UK map came from freeworldmaps.net), derive them from
   the image. Scan the pixels to locate sharp coastal landmarks — on these
   relief maps land has G > B and sea has B > G — then fit `x` against
   longitude and `y` against latitude. Use long baselines and headlands, not
   small islands, which get generalised away. See the header of
   `quizdata/uk.js` for a worked example.

   Then check the fit: the implied standard parallel, `acos(pxPerLon /
   pxPerLat)`, should reproduce the image's own aspect ratio. That's an
   independent test, since the aspect never enters the fit.

2. Copy a `quizdata/*.js` to `quizdata/<name>.js`. Fill in `id`, `title`,
   `map`, `bounds`, `aspect` (image height ÷ width) and the term list as real
   latitude/longitude, in quiz-number order.
3. `node genkey.js <name> > <name>.key.js`
   (plain `>` — `2>&1 >` would merge the summary into the key file)
4. Add `<script src="<name>.key.js"></script>` to `index.html` next to the
   other key files.

The generator refuses to emit a key if any point is off the map, a label is
duplicated, or two "city" terms are close enough to be confused.

**Worth doing once per quiz:** check every point lands on the right kind of
terrain — sea features in water, land features on land — by converting each
key point back to a pixel and classifying it. That caught 14 misplaced points
in the UK key, including a Celtic Sea point sitting on the Cork coast and a
Scotland point in the middle of the Firth of Forth.

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
| UK and Ireland | 5% | ~44 km | 24 |

Push the slider up if you want, but past these the drill starts marking you
right for the wrong reason (at 12% on France, 64 term-pairs are
interchangeable; at 6% on the UK, a click on Edinburgh scores as the River
Clyde and Liverpool scores as Wales). Some overlap is built into the term
lists and no setting removes it: Toulon is inside Provence, Munich inside
Bavaria, London inside England and on the Thames.

**The UK quiz has one genuinely tight cluster.** The Solent, the Isle of Wight
and Portsmouth sit within about 14 km of each other, so those four terms are
pinned to 1.2% — roughly a 10 km radius. They are separable, but turn **Map
size** up before drilling them or the targets are only a few pixels wide.

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

**UK and Ireland** — two terms in the source list look like slips, and are
keyed to what they must mean. Labels are left exactly as given, since the
numbers are what gets written on the quiz:

- **#8 "New Hebrides"** is Vanuatu, in the South Pacific. Keyed to the
  Hebrides, the islands off western Scotland.
- **#39 "Mercy River"** is keyed as the Mersey, running from Stockport through
  Warrington to Liverpool.

Both are worth confirming with your professor. Also: the Pennines and Cambrians
are keyed as ridge lines, so anywhere along the spine counts. The Isle of Wight
and the Solent follow where this map *draws* them, about 7 km south of their
true coordinates — at 0.59 km per pixel that is ordinary generalisation, and
what you click is what you see.

## Publishing to classmates

Browser storage is per-person — others see only what's in the key files.
Author key mode → **Download key file** → replace `<name>.key.js` → push.

`version` increments on every download. On load the app takes whichever is
newer, the published key or the visitor's own saved copy. **Revert to
published key** (under Data) forces the published one.

## GitHub Pages

    git add -A
    git commit -m "UK and Ireland quiz"
    git push

Live at `https://index1189.github.io/Geography-Quiz-Practice/` — and
`.../#france` and `.../#uk` open straight to those quizzes.

## Running locally

Double-clicking `index.html` works in most browsers. If autosave reports a
failure, run `node serve.js` and open http://localhost:8123.
