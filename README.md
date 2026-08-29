# InPhaze SSR Website

A server-side rendered website powered by Express and integrated with Payload CMS 3 backend.

## Features

- Server-side rendering of static HTML files
- Automatic Payload CMS backend URL injection
- Health check endpoint for Railway deployments
- Simple Express server with zero build complexity

## Setup

### Local Development
```bash
npm install
PAYLOAD_URL=http://localhost:3000 npm start
```

### Railway Deployment
The service automatically connects to Payload CMS via the `PAYLOAD_URL` environment variable.

1. Set `PAYLOAD_URL` to your Payload CMS instance (e.g., `https://payload-cms-production-a298.up.railway.app`)
2. Deploy to Railway
3. HTML files will be served from the `/public` folder

## HTML Files

Place your `.dc.html` files in the `public/` folder. The server routes:
- `/` → `In Phaze Homepage.dc.html`
- `/about` → `In Phaze About.dc.html`
- Any undefined route → Homepage

## Payload CMS Integration

Your frontend automatically has access to the Payload CMS backend URL via:
```javascript
const payloadUrl = window.PAYLOAD_URL;
// Fetch content from Payload CMS API
fetch(`${payloadUrl}/api/...`)
```

Modify your HTML/JS files to consume Payload API endpoints for dynamic content.

