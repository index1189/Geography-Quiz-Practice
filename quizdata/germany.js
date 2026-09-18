/* Geo-quiz #1: Germany — coordinate data for genkey.js
   Map: Relief_Map_of_Germany.png (Wikipedia "Relief Map of Germany")
   Bounds from Module:Location map/data/Germany, equirectangular.
   Terms and numbering follow Geoquiz--Germany.docx exactly.

   kind: "line" river | "city" single point, auto-tightened | "area" region/country
   A 4th element on a row is an explicit tolerance override (% of map width).   */

const DATA = [
  ["Black Forest", "area", [
    [48.65,8.15],[48.40,8.20],[48.10,8.15],[47.85,8.05],[48.25,8.10]]],

  ["Rhine River", "line", [
    [47.66,8.86],[47.55,7.59],[48.00,7.56],[48.58,7.79],[49.01,8.31],[49.48,8.44],
    [49.99,8.27],[50.36,7.60],[50.74,7.10],[50.94,6.96],[51.23,6.72],[51.45,6.73],
    [51.66,6.42],[51.83,6.25]]],

  ["Oder River", "line", [
    [52.06,14.70],[52.35,14.55],[52.60,14.64],[52.85,14.35],[53.06,14.28],
    [53.25,14.35],[53.42,14.32]]],

  ["Elbe River", "line", [
    [50.92,14.15],[51.05,13.74],[51.35,13.30],[51.56,13.00],[51.87,12.65],[52.13,11.63],
    [52.55,11.85],[52.99,11.75],[53.14,11.25],[53.37,10.56],[53.55,9.99],[53.83,9.25],
    [53.89,8.85]]],

  ["Danube River", "line", [
    [47.95,8.50],[47.99,8.82],[48.09,9.22],[48.31,9.62],[48.40,9.99],[48.55,10.60],
    [48.73,11.19],[48.92,11.87],[49.02,12.10],[48.88,12.58],[48.84,12.96],[48.57,13.46]]],

  ["North Sea", "area", [
    [54.20,7.60],[54.50,7.00],[53.90,6.60],[54.05,8.00],[54.60,6.30]]],

  ["Bavaria", "area", [
    [49.75,11.10],[49.30,11.60],[48.90,11.90],[48.50,11.40],[48.90,12.60],
    [49.40,10.90],[48.35,10.90]]],

  ["Saxony", "area", [
    [51.35,12.60],[51.10,13.40],[50.95,14.00],[51.40,13.10],[51.20,12.90]]],

  // Historic Prussia is far larger than anything on this map; placed on the
  // Brandenburg core, spread away from Berlin and Potsdam so it reads as a region.
  ["Prussia", "area", [
    [52.80,12.60],[53.20,13.40],[52.30,12.20],[53.00,14.00],[52.60,13.80],[53.40,13.00]]],

  // The 1871-1918 imperial territory: Alsace plus the Metz area of Lorraine.
  ["Alsace-Lorraine", "area", [
    [48.58,7.75],[47.75,7.34],[49.12,6.18],[48.30,7.45],[48.90,6.90],[49.00,7.20]]],

  ["Pomerania", "area", [
    [54.09,13.38],[54.31,13.09],[53.90,14.20],[54.20,15.00],[53.60,14.60]]],

  // Only the strip north of the German border is on this map.
  ["Denmark", "area", [
    [54.95,9.30],[55.00,9.80],[55.05,8.90],[54.95,10.40]]],

  ["Belgium", "area", [
    [50.64,5.57],[50.90,5.80],[50.40,6.00],[50.20,5.90]]],

  // Kept west and south of Alsace-Lorraine so the two are separable.
  ["France", "area", [
    [48.70,5.60],[48.20,5.90],[47.70,6.20],[47.45,6.30],[49.10,5.70]]],

  ["Luxembourg", "area", [
    [49.82,6.13],[49.60,6.13],[50.05,6.05],[49.75,5.85]]],

  // Sits essentially on the bottom crop of this map; only its north tip shows.
  ["Liechtenstein", "area", [
    [47.25,9.53],[47.22,9.51]], 4],

  ["Austria", "area", [
    [48.30,14.29],[47.80,13.05],[48.10,13.60],[47.60,12.40],[48.25,15.00],[47.45,11.40]]],

  ["Poland", "area", [
    [52.40,14.90],[53.43,14.55],[51.10,15.00],[52.00,15.20],[50.90,15.30]]],

  ["Czech Republic", "area", [
    [50.08,14.44],[49.75,13.38],[50.35,15.00],[49.30,14.30],[49.60,13.00]]],

  ["Switzerland", "area", [
    [47.38,8.54],[47.55,7.59],[47.50,9.38],[47.30,7.90],[47.45,8.90]]],

  ["Hamburg",           "city", [[53.551, 9.994]]],
  ["Berlin",            "city", [[52.520,13.405]]],
  ["Wittenberg",        "city", [[51.867,12.650]]],
  ["Potsdam",           "city", [[52.396,13.059]]],
  ["Kiel",              "city", [[54.323,10.135]]],
  ["Cologne",           "city", [[50.938, 6.960]]],
  ["Frankfurt-am-Mein", "city", [[50.110, 8.682]]],
  ["Munich",            "city", [[48.137,11.576]]],
  ["Hannover",          "city", [[52.376, 9.736]]],

  ["The Rhineland", "area", [
    [51.20,6.90],[50.80,7.10],[50.30,7.50],[49.90,7.30],[50.55,7.20]]],

  ["Lake Constance", "area", [
    [47.60,9.35],[47.55,9.60],[47.68,9.20]]],

  // The whole visible Alpine arc, not just the Bavarian section.
  ["The Alps", "area", [
    [47.30,8.20],[47.40,9.60],[47.35,10.80],[47.50,11.90],[47.55,13.00],
    [47.45,12.40],[47.60,13.60]]],

  ["Vosges Mountains", "area", [
    [48.30,7.02],[48.05,6.95],[48.45,7.10],[47.90,7.00]]],

  // Duplicate of #30 in the source list; keyed identically on purpose.
  ["Rhineland", "area", [
    [51.20,6.90],[50.80,7.10],[50.30,7.50],[49.90,7.30],[50.55,7.20]]],

  ["The Ruhr", "area", [
    [51.50,6.95],[51.48,7.20],[51.50,7.45],[51.45,7.00],[51.55,7.30]]],
];

module.exports = {
  id: 'germany',
  title: 'Geo-quiz #1: Germany',
  map: 'Relief_Map_of_Germany.png',
  bounds: { top: 55.1, bottom: 47.2, left: 5.5, right: 15.5 },
  aspect: 2544 / 2147,
  tol: 8,
  minCityTol: 2.5,
  version: 7,
  terms: DATA,
};
