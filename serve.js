/* Local preview:  node serve.js   then open http://localhost:8123
   Only needed if your browser blocks storage on file:// URLs. */
const http = require('http'), fs = require('fs'), path = require('path');
const TYPES = {'.html':'text/html','.js':'text/javascript','.png':'image/png',
               '.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif',
               '.svg':'image/svg+xml','.webp':'image/webp','.md':'text/plain'};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(__dirname, p);
  if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end('403'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(8123, () => console.log('open http://localhost:8123'));
