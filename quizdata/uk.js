/* Geo-quiz #3: UK and Ireland — coordinate data for genkey.js
   Map: uk-relief-map.jpg (freeworldmaps.net)

   This map is NOT a Wikipedia location map, so there were no published bounds.
   They were derived from the image itself: four sharp coastal landmarks were
   located by scanning the pixels (land has G > B, sea has B > G), then fitted:

     Lowestoft Ness   1.76E  -> x 1359      Dunnet Head  58.67N -> y  430
     Dunnet Head      3.37W  -> x  808      Lizard Point 49.96N -> y 2072
     Lizard Point     5.20W  -> x  605
     Dunmore Head    10.48W  -> x   32

   Longitude residuals are under 4 px across a 1327 px span. The fit implies a
   standard parallel of 54.87N, which reproduces the image's own 1.4153 aspect
   ratio to four decimals — an independent check, since the aspect never entered
   the fit. 21 land and 5 sea test points all classify correctly.

   kind: "line" river/range | "city" small point-like feature, auto-tightened
         | "area" region, sea, or large zone
   A 4th element on a row is an explicit tolerance override (% of map width).  */

const DATA = [
  // 1-7: seas, straits and bays
  ["Dover Strait", "city", [[51.00,1.45],[50.94,1.55]]],

  ["Celtic Sea", "area", [
    [50.80,-7.50],[51.20,-8.40],[50.30,-6.90],[51.40,-7.20],[50.10,-7.90],[50.60,-8.80],
    [50.90,-6.30],[51.25,-9.30],[49.90,-6.60]]],

  ["Irish Sea", "area", [
    [53.50,-5.00],[53.20,-5.30],[53.90,-4.95],[52.90,-5.40],[54.30,-5.30],
    [52.55,-5.70],[54.50,-5.00],[53.60,-4.40]]],

  ["North Sea", "area", [
    [56.00,1.50],[55.00,2.00],[57.00,1.00],[54.00,2.00],[58.00,0.50],[56.50,2.50],
    [53.00,2.00],[59.00,0.20],[52.60,2.30],[60.00,0.00],[55.50,0.20],[58.80,-1.50]]],

  ["The Wash", "city", [[52.92,0.25],[52.84,0.37]]],

  // Sits between the Isle of Wight and Portsmouth; all three are tiny at this scale.
  ["The Solent", "city", [[50.739,-1.364]]],

  ["Bristol Channel", "area", [
    [51.35,-3.80],[51.25,-4.30],[51.33,-3.45],[51.18,-4.80],[51.30,-5.20]]],

  // LABEL AS GIVEN. The New Hebrides is Vanuatu, in the South Pacific; on a map of
  // Britain and Ireland this can only mean the Hebrides, so it is keyed to the Outer
  // and Inner Hebrides off western Scotland.
  ["New Hebrides", "area", [
    [58.20,-6.40],[57.90,-6.90],[57.60,-7.35],[57.20,-7.30],[57.00,-7.45],
    [57.30,-6.20],[56.45,-6.00]]],

  // 9-20: islands, coasts and firths
  ["Shetland Islands", "area", [
    [60.30,-1.30],[60.50,-1.25],[60.18,-1.22],[60.72,-0.88]]],

  ["Orkney Islands", "area", [
    [58.98,-2.96],[58.92,-2.90],[58.85,-3.10],[59.05,-3.25]]],

  ["Isle of Man", "city", [[54.24,-4.55]]],
  ["Isle of Wight", "city", [[50.617,-1.327]]],

  ["Ireland", "area", [
    [53.30,-8.00],[54.10,-7.70],[52.60,-8.30],[53.70,-9.00],[52.30,-7.80],
    [54.70,-7.90],[53.00,-7.10],[52.00,-9.20],[51.90,-8.50],[52.50,-6.70],
    [53.40,-6.60],[53.90,-6.60],[54.30,-7.20],[55.00,-7.60],[52.70,-9.40],
    [54.20,-9.10]]],

  ["Anglesey Island", "city", [[53.28,-4.40]]],

  ["Cornwall", "area", [
    [50.40,-4.80],[50.55,-4.55],[50.25,-5.15],[50.15,-5.50],[50.50,-5.00]]],

  ["The Lizard", "city", [[49.97,-5.20]]],

  ["Solway Firth", "city", [[54.87,-3.50],[54.90,-3.45]]],
  ["Firth of Forth", "city", [[56.10,-3.00],[56.08,-2.85]]],
  ["Moray Firth", "city", [[57.70,-3.70],[57.72,-3.10]]],

  // The channel between the Outer Hebrides and the Scottish mainland.
  ["The Minch", "area", [
    [58.10,-5.90],[57.90,-6.10],[58.30,-6.00],[57.60,-6.60]]],

  // 21-26: countries and ranges
  ["Wales", "area", [
    [52.30,-3.70],[52.70,-3.60],[51.90,-3.60],[52.50,-4.00],[51.70,-4.20],[53.10,-3.45],
    [51.60,-3.95],[52.10,-4.50],[52.90,-3.95],[51.75,-4.75],[52.45,-3.20]]],

  ["Scotland", "area", [
    [56.80,-4.20],[57.50,-4.00],[56.20,-4.00],[57.80,-4.30],[55.90,-3.90],
    [58.20,-4.50],[56.50,-3.25],[55.20,-4.20],[55.55,-3.40],[56.12,-3.60],
    [57.10,-2.50],[57.60,-4.60],[58.40,-4.20],[56.60,-5.00],[55.35,-4.45]]],

  ["England", "area", [
    [52.50,-1.50],[53.50,-1.50],[51.50,-1.00],[54.30,-2.00],[52.00,-0.50],
    [51.20,-1.60],[53.00,-0.80],[50.65,-3.70],[50.90,-3.00],[51.05,-0.40],
    [51.15,0.65],[52.40,0.70],[52.20,-2.70],[53.30,-2.60],[53.95,-0.80],
    [54.00,-2.70],[54.80,-1.70],[55.30,-2.10],[54.60,-3.10],[51.55,0.45]]],

  ["Grampian Mountains", "area", [
    [56.90,-4.00],[57.05,-3.60],[56.75,-4.40],[57.10,-3.25],[56.60,-4.70]]],

  // The spine of northern England, so anywhere along the ridge counts.
  ["Pennine Mountains", "line", [
    [55.15,-2.35],[54.80,-2.30],[54.40,-2.25],[54.00,-2.10],[53.60,-1.95],[53.35,-1.85]]],

  // Mid-Wales uplands, likewise a ridge.
  ["Cambrian Mountains", "line", [
    [52.90,-3.70],[52.60,-3.75],[52.40,-3.78],[52.15,-3.72],[51.95,-3.60]]],

  // 27-36, 40: cities
  ["London",     "city", [[51.507,-0.128]]],
  ["Plymouth",   "city", [[50.376,-4.143]]],
  ["Portsmouth", "city", [[50.805,-1.087]]],
  ["Edinburgh",  "city", [[55.953,-3.188]]],
  ["Belfast",    "city", [[54.597,-5.930]]],
  ["Dublin",     "city", [[53.350,-6.260]]],
  ["York",       "city", [[53.960,-1.081]]],
  ["Liverpool",  "city", [[53.408,-2.983]]],
  ["Manchester", "city", [[53.480,-2.242]]],
  ["Cardiff",    "city", [[51.481,-3.179]]],

  // 37-39, 41: rivers
  // Cotswolds source, through Oxford and Reading to London and the estuary.
  ["Thames River", "line", [
    [51.70,-2.00],[51.75,-1.55],[51.75,-1.26],[51.60,-1.10],[51.46,-0.97],
    [51.49,-0.55],[51.51,-0.13],[51.44,0.37],[51.50,0.72]]],

  // Ireland's long north-south river: Lough Allen, Athlone, Lough Derg, Limerick.
  ["Shannon River", "line", [
    [54.23,-7.95],[54.10,-8.05],[53.95,-8.09],[53.70,-8.00],[53.42,-7.94],
    [53.10,-8.15],[52.95,-8.35],[52.66,-8.63],[52.60,-9.05],[52.55,-9.45]]],

  // LABEL AS GIVEN. Almost certainly the Mersey: Stockport to Liverpool Bay.
  ["Mercy River", "line", [
    [53.41,-2.16],[53.39,-2.45],[53.38,-2.62],[53.34,-2.75],[53.41,-2.98],[53.45,-3.05]]],

  ["Glasgow", "city", [[55.864,-4.252]]],

  ["River Clyde", "line", [
    [55.62,-3.70],[55.72,-3.92],[55.79,-4.05],[55.86,-4.25],[55.94,-4.57],
    [55.95,-4.78],[55.85,-4.92]]],
];

module.exports = {
  id: 'uk',
  title: 'Geo-quiz #3: UK and Ireland',
  map: 'uk-relief-map.jpg',
  bounds: { top: 60.951, bottom: 49.689, left: -10.785, right: 3.043 },
  aspect: 2123 / 1500,
  tol: 5,            // ~44 km. Tighter than it looks: 41 terms on a small island group,
                     // and 6% starts accepting Edinburgh as the Clyde, Liverpool as Wales.
  minCityTol: 1.2,   // the Solent and Isle of Wight are only ~14 km apart here
  version: 1,
  terms: DATA,
};
