/* Geo-quiz #2: France — coordinate data for genkey.js
   Map: France_relief_location_map.jpg (Wikipedia "France relief location map")
   Bounds from Module:Location map/data/France, equirectangular:
     top 51.5N  bottom 41.0N  left 5.8W  right 10.0E
   Numbering follows the order the terms were given in.

   kind: "line" river | "city" single point, auto-tightened | "area" region/country
   A 4th element on a row is an explicit tolerance override (% of map width).   */

const DATA = [
  ["Paris",      "city", [[48.857, 2.352]]],

  // Source on the Langres plateau, through Troyes and Paris, meanders to Rouen, estuary at Le Havre.
  ["River Seine", "line", [
    [47.52,4.72],[48.30,4.08],[48.55,3.30],[48.86,2.35],[49.05,1.85],[49.30,1.20],
    [49.44,1.10],[49.48,0.60],[49.49,0.15]]],

  ["Calais",     "city", [[50.951, 1.858]]],
  ["Le Havre",   "city", [[49.494, 0.108]]],
  ["Cherbourg",  "city", [[49.639,-1.616]]],
  ["Brest",      "city", [[48.390,-4.486]]],
  ["Bordeaux",   "city", [[44.838,-0.579]]],
  ["Nantes",     "city", [[47.218,-1.554]]],
  ["Marseilles", "city", [[43.296, 5.370]]],
  ["Monaco",     "city", [[43.738, 7.425]]],
  ["Toulon",     "city", [[43.125, 5.930]]],
  ["Lyons",      "city", [[45.764, 4.836]]],
  ["Metz",       "city", [[49.120, 6.177]]],

  // Pyrenees to Toulouse, northwest past Agen to Bordeaux, then the Gironde estuary.
  ["River Garonne", "line", [
    [42.85,0.75],[43.10,0.75],[43.40,1.10],[43.60,1.44],[43.95,1.10],[44.20,0.62],
    [44.55,0.05],[44.84,-0.58],[45.10,-0.70],[45.50,-1.00]]],

  // Everything visible on this map: Lake Constance, the Alsace border, up to Cologne.
  ["River Rhine", "line", [
    [47.66,8.86],[47.55,7.59],[48.00,7.56],[48.58,7.79],[49.01,8.31],[49.48,8.44],
    [49.99,8.27],[50.36,7.60],[50.74,7.10],[50.94,6.96],[51.23,6.72]]],

  // Source in the Massif Central, north to Orleans, west through Tours and Angers to the Atlantic.
  ["River Loire", "line", [
    [44.84,4.22],[45.05,3.95],[45.50,4.05],[46.03,4.07],[46.60,3.50],[46.99,3.16],
    [47.50,2.80],[47.90,1.90],[47.75,1.20],[47.39,0.69],[47.40,0.10],[47.47,-0.55],
    [47.22,-1.55],[47.27,-2.20]]],

  // Lake Geneva to Lyon, south through Valence and Avignon to the Camargue delta.
  ["River Rhone", "line", [
    [46.20,6.15],[46.00,5.70],[45.85,5.30],[45.76,4.84],[45.40,4.80],[44.93,4.89],
    [44.55,4.75],[44.10,4.80],[43.95,4.81],[43.68,4.63],[43.40,4.70]]],

  ["Brittany", "area", [
    [48.39,-4.49],[48.11,-1.68],[47.66,-2.76],[48.65,-2.02],[48.30,-3.50],[47.90,-3.90]]],

  ["Normandy", "area", [
    [49.18,-0.37],[49.44,1.10],[49.00,0.40],[49.20,-1.10],[48.75,0.30],[49.70,0.30],[49.50,-1.45]]],

  // Historic Gascony: Landes and Gers, between the Garonne and the Pyrenees.
  ["Gascony", "area", [
    [43.65,0.59],[43.90,-0.50],[44.20,-0.90],[43.40,0.10],[43.71,-1.05]]],

  ["Provence", "area", [
    [43.53,5.45],[43.95,4.81],[44.09,6.24],[43.54,6.46],[43.80,5.90],[44.30,5.50],[43.30,6.10]]],

  ["Burgundy", "area", [
    [47.32,5.04],[47.02,4.84],[47.80,3.57],[46.31,4.83],[46.99,3.16],[47.50,4.30]]],

  ["Champagne", "area", [
    [49.26,4.03],[48.30,4.07],[48.96,4.36],[49.04,3.96],[48.11,5.14],[48.70,4.50]]],

  ["Massif Central", "area", [
    [45.78,3.08],[45.04,3.88],[44.93,2.44],[44.52,3.50],[44.35,2.57],[45.30,3.00],[44.80,3.10]]],

  ["Bay of Biscay", "area", [
    [46.50,-3.00],[45.50,-2.50],[44.50,-2.00],[47.00,-4.00],[45.00,-3.50],[46.00,-1.80]]],

  // The crest, Atlantic to Mediterranean.
  ["Pyrenees Mountains", "area", [
    [43.10,-1.30],[42.85,-0.50],[42.75,0.30],[42.65,1.00],[42.55,1.70],[42.45,2.40]]],

  // Only the southern strip (Zeeland, Brabant, Limburg) is on this map.
  ["The Netherlands", "area", [
    [51.30,3.80],[51.45,5.50],[51.20,5.90],[51.40,4.50]]],

  ["Belgium", "area", [
    [50.85,4.35],[51.05,3.72],[50.63,5.57],[50.45,4.45],[50.05,5.30]]],

  ["Luxembourg", "area", [
    [49.61,6.13],[49.80,6.10],[49.70,5.95]]],

  ["Spain", "area", [
    [41.65,-0.89],[41.39,2.17],[42.00,-2.50],[41.65,-4.72],[42.85,-1.65],[41.30,0.50]]],

  // Geneva left out: it sits on the Rhone's source and would double-count.
  ["Switzerland", "area", [
    [46.95,7.45],[47.38,8.54],[46.52,6.63],[47.05,8.31],[46.23,7.36],[46.80,9.50]]],

  // Kept east of the Rhine so the river and the country stay separable.
  ["Germany", "area", [
    [48.78,9.18],[50.11,8.68],[49.00,9.60],[50.50,8.40],[48.30,9.30],[49.80,9.90]]],

  // The Franco-Swiss range, running NE from near Geneva toward Basel.
  ["Jura Mountains", "area", [
    [46.40,5.90],[46.70,6.15],[47.00,6.50],[47.25,6.90],[46.15,5.70]]],

  ["Vosges Mountains", "area", [
    [48.30,7.02],[48.05,6.95],[48.45,7.10],[47.90,7.00]]],

  // The 1871-1918 imperial territory: Alsace plus the Metz area of Lorraine.
  ["Alsace-Lorraine", "area", [
    [48.58,7.75],[47.75,7.34],[49.12,6.18],[48.30,7.45],[48.90,6.90],[49.00,7.20]]],

  ["Andorra", "area", [
    [42.51,1.52],[42.55,1.60],[42.47,1.45]], 4],

  // French and western Swiss Alps as visible here.
  ["The Alps", "area", [
    [45.92,6.87],[45.20,6.70],[44.60,6.50],[46.30,7.80],[46.50,8.60],[45.50,7.10],[44.30,6.70]]],
];

module.exports = {
  id: 'france',
  title: 'Geo-quiz #2: France',
  map: 'France_relief_location_map.jpg',
  bounds: { top: 51.5, bottom: 41.0, left: -5.8, right: 10.0 },
  aspect: 1922 / 2000,
  tol: 5,          // ~61 km — matches Germany's 8% on the ground; this map covers more longitude
  minCityTol: 2.5,
  version: 1,
  terms: DATA,
};
