import fs from 'fs';
import path from 'path';

const htmlFiles = [
  'In Phaze Homepage',
  'In Phaze About',
  'In Phaze Brand Kit',
  'In Phaze CRM',
  'In Phaze Careers',
  'In Phaze City Page',
  'In Phaze Contact',
  'In Phaze Cost',
  'In Phaze Crew',
  'In Phaze Electricista',
  'In Phaze Image Prompt Kit',
  'In Phaze Matrix Page',
  'In Phaze Reviews',
  'In Phaze SEO Architecture',
  'In Phaze Service Page',
  'In Phaze Site Index',
];

htmlFiles.forEach((fileName) => {
  const htmlPath = `./${fileName}.dc.html`;
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract content from <body> tag
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Create slug from filename
  const slug = fileName
    .toLowerCase()
    .replace(/in phaze /g, '')
    .replace(/\s+/g, '-');
  
  const astroFile = slug === 'homepage' 
    ? 'src/pages/index.astro' 
    : `src/pages/${slug}.astro`;
  
  const astroContent = `---
import Layout from '../layouts/BaseLayout.astro';
---

<Layout>
  ${bodyContent}
</Layout>
`;
  
  fs.mkdirSync(path.dirname(astroFile), { recursive: true });
  fs.writeFileSync(astroFile, astroContent);
  console.log(`Created ${astroFile}`);
});

