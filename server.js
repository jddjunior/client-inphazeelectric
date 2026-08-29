import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Environment variables for Payload CMS backend
const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://payload-cms-production-a298.up.railway.app';

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to inject Payload API URL into HTML
const injectPayloadConfig = (req, res, next) => {
  res.locals.payloadUrl = PAYLOAD_URL;
  next();
};

app.use(injectPayloadConfig);

// Route handler for all HTML files
app.get('*', (req, res) => {
  let filePath = path.join(__dirname, 'public', req.path);
  
  // If path ends without .html, try to find .dc.html version
  if (!filePath.endsWith('.html')) {
    if (filePath.endsWith('/')) {
      filePath = path.join(filePath, 'In Phaze Homepage.dc.html');
    } else {
      filePath += '.dc.html';
    }
  }
  
  // Fallback to homepage
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', 'In Phaze Homepage.dc.html');
  }
  
  // Read and serve HTML with Payload config injected
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Inject Payload URL before closing body tag for client-side consumption
    const payloadScript = `<script>window.PAYLOAD_URL = '${PAYLOAD_URL}';</script>`;
    html = html.replace('</body>', `${payloadScript}</body>`);
    
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } else {
    res.status(404).send('Not Found');
  }
});

// Health check for Railway
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`✓ InPhaze SSR server running on port ${PORT}`);
  console.log(`✓ Payload CMS backend: ${PAYLOAD_URL}`);
});

