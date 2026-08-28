/* Generate key.js from real lat/lon, using the Wikipedia location-map bounds
   for "Relief Map of Germany":  top 55.1  bottom 47.2  left 5.5  right 15.5
   Linear (equirectangular) mapping, same as Wikipedia's own pin placement. */
const TOP = 55.1, BOT = 47.2, LEFT = 5.5, RIGHT = 15.5;
const x = lon => (lon - LEFT) / (RIGHT - LEFT);
const y = lat => (TOP - lat) / (TOP - BOT);

// [label, isLine, [[lat,lon], ...]]   points ordered along course for rivers
const DATA = [
  // ---- rivers (line features) ----
  ["Rhine", true, [
    [47.66,8.86],[47.55,7.59],[48.00,7.56],[48.58,7.79],[49.01,8.31],[49.48,8.44],
    [49.99,8.27],[50.36,7.60],[50.74,7.10],[50.94,6.96],[51.23,6.72],[51.45,6.73],
    [51.66,6.42],[51.83,6.25]]],
  ["Danube", true, [
    [47.95,8.50],[47.99,8.82],[48.09,9.22],[48.31,9.62],[48.40,9.99],[48.55,10.60],
    [48.73,11.19],[48.92,11.87],[49.02,12.10],[48.88,12.58],[48.84,12.96],[48.57,13.46]]],
  ["Elbe", true, [
    [50.92,14.15],[51.05,13.74],[51.35,13.30],[51.56,13.00],[51.87,12.65],[52.13,11.63],
    [52.55,11.85],[52.99,11.75],[53.14,11.25],[53.37,10.56],[53.55,9.99],[53.83,9.25],
    [53.89,8.85]]],
  ["Oder", true, [
    [52.06,14.70],[52.35,14.55],[52.60,14.64],[52.85,14.35],[53.06,14.28],[53.25,14.35],
    [53.42,14.32]]],
  ["Main", true, [
    [50.10,11.45],[49.89,10.90],[49.85,10.35],[49.79,9.93],[49.76,9.51],[49.98,9.15],
    [50.09,8.90],[50.11,8.68],[50.02,8.42],[50.00,8.29]]],
  ["Weser", true, [
    [51.42,9.65],[51.80,9.45],[52.10,9.36],[52.29,8.92],[52.64,9.21],[52.92,9.23],
    [53.08,8.80],[53.33,8.48],[53.55,8.55]]],
  ["Moselle", true, [
    [49.47,6.37],[49.75,6.64],[49.92,7.07],[50.15,7.17],[50.28,7.35],[50.36,7.60]]],
  ["Neckar", true, [
    [48.06,8.53],[48.17,8.63],[48.52,9.06],[48.80,9.18],[49.14,9.22],[49.30,9.00],
    [49.41,8.69],[49.48,8.47]]],
  ["Spree", true, [
    [51.05,14.45],[51.45,14.35],[51.76,14.33],[51.95,13.95],[52.25,13.60],[52.51,13.42],
    [52.53,13.20]]],

  // ---- cities (single point) ----
  ["Berlin",      false, [[52.520,13.405]]],
  ["Hamburg",     false, [[53.551, 9.994]]],
  ["Munich",      false, [[48.137,11.576]]],
  ["Cologne",     false, [[50.938, 6.960]]],
  ["Frankfurt",   false, [[50.110, 8.682]]],
  ["Stuttgart",   false, [[48.776, 9.182]]],
  ["Dusseldorf",  false, [[51.228, 6.773]]],
  ["Dresden",     false, [[51.051,13.738]]],
  ["Leipzig",     false, [[51.340,12.375]]],
  ["Bremen",      false, [[53.079, 8.802]]],
  ["Hannover",    false, [[52.376, 9.736]]],
  ["Nuremberg",   false, [[49.452,11.077]]],
  ["Kiel",        false, [[54.323,10.135]]],
  ["Zugspitze",   false, [[47.421,10.985]]],

  // ---- regions / areas (several points across the extent) ----
  ["Bavaria", false, [
    [49.75,11.10],[49.30,11.60],[48.90,11.90],[48.50,11.40],[48.90,12.60],
    [49.40,10.90],[48.35,10.90]]],
  ["Saxony", false, [
    [51.35,12.60],[51.10,13.40],[50.95,14.00],[51.40,13.10],[51.20,12.90]]],
  ["Black Forest", false, [
    [48.65,8.15],[48.40,8.20],[48.10,8.15],[47.85,8.05],[48.25,8.10]]],
  ["Bavarian Alps", false, [
    [47.55,10.30],[47.52,11.10],[47.60,11.90],[47.70,12.70],[47.58,10.75]]],
  ["Ruhr Area", false, [
    [51.50,6.95],[51.48,7.20],[51.50,7.45],[51.45,7.00],[51.55,7.30]]],
  ["Rhineland", false, [
    [51.20,6.90],[50.80,7.10],[50.30,7.50],[49.90,7.30],[50.55,7.20]]],
  ["North Sea", false, [
    [54.20,7.60],[54.50,7.00],[53.90,6.60],[54.05,8.00],[54.60,6.30]]],
  ["Baltic Sea", false, [
    [54.60,11.60],[54.55,12.40],[54.60,13.30],[54.75,12.00],[54.45,13.90]]],
  ["Lake Constance", false, [
    [47.60,9.35],[47.55,9.60],[47.68,9.20]]],
  ["Harz Mtns", false, [
    [51.80,10.45],[51.75,10.70],[51.65,10.90],[51.88,10.60]]],
  ["Rugen", false, [
    [54.40,13.40],[54.55,13.35],[54.30,13.60],[54.48,13.55]]],
  ["Saarland", false, [
    [49.40,6.90],[49.25,7.00],[49.55,7.05],[49.32,6.75]]],
];

let bad = [];
const rows = DATA.map(([label, line, pts]) => {
  const p = pts.map(([lat, lon]) => {
    const nx = +x(lon).toFixed(4), ny = +y(lat).toFixed(4);
    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) bad.push(`${label}: ${lat},${lon} -> ${nx},${ny}`);
    return [nx, ny];
  });
  return `  {"label":${JSON.stringify(label)},"line":${line},"pts":${JSON.stringify(p)}}`;
});

if (bad.length) { console.error('OUT OF BOUNDS:\n' + bad.join('\n')); process.exit(1); }
if (DATA.length !== 35) { console.error('expected 35 terms, got ' + DATA.length); process.exit(1); }

const header = `/* Answer key generated from geographic coordinates, mapped onto the Wikipedia
   "Relief Map of Germany" location-map bounds:
     top 55.1N  bottom 47.2N  left 5.5E  right 15.5E, equirectangular.
   x = (lon - 5.5) / 10        y = (55.1 - lat) / 7.9
   This is the same linear mapping Wikipedia uses to place pins on this image,
   so it is only correct for THAT map file. A different map needs a new key.

   line:true  = river. Anywhere along the path between points counts.
   line:false = city, peak, region, or sea. Only near a point counts. */
`;
console.log(header + 'window.MAPQUIZ_KEY = {\n "version": 5,\n "tol": 12,\n "terms": [\n' +
  rows.join(',\n') + '\n ]\n};');
