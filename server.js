import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url);
  
  // If it's a directory or root, serve index.html or the homepage
  if (req.url === '/') {
    filePath = path.join(__dirname, 'In Phaze Homepage.dc.html');
  } else if (req.url.endsWith('/')) {
    filePath = path.join(__dirname, req.url, 'index.html');
  }
  
  // Try the requested file, then try with .html, then .dc.html
  const tryFiles = [
    filePath,
    filePath + '.html',
    filePath + '.dc.html'
  ];
  
  let found = false;
  
  for (const file of tryFiles) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      const ext = path.extname(file);
      const contentType = {
        '.html': 'text/html',
        '.dc': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      }[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(file));
      found = true;
      break;
    }
  }
  
  if (!found) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

