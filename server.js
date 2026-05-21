const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = __dirname;
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const safePath = path.normalize(decodeURIComponent(requestUrl.pathname)).replace(/^([.]{2}[\/\\])+/, '');
  const relativePath = safePath === '/' ? '/index.html' : safePath;
  const filePath = path.join(rootDir, relativePath);

  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isDirectory()) {
      return serveFile(path.join(filePath, 'index.html'), res);
    }

    if (!statError && stats.isFile()) {
      return serveFile(filePath, res);
    }

    const fallbackPath = path.join(rootDir, 'index.html');
    if (path.extname(relativePath) === '') {
      return serveFile(fallbackPath, res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (readError, data) => {
    if (readError) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(port, () => {
  console.log(`Static site running at http://localhost:${port}`);
});
