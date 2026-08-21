import fs from 'fs';
import path from 'path';

const htmlFiles = [
  { src: 'In Phaze Homepage', slug: 'index' },
  { src: 'In Phaze About', slug: 'about' },
  { src: 'In Phaze Brand Kit', slug: 'brand-kit' },
  { src: 'In Phaze CRM', slug: 'crm' },
  { src: 'In Phaze Careers', slug: 'careers' },
  { src: 'In Phaze City Page', slug: 'city-page' },
  { src: 'In Phaze Contact', slug: 'contact' },
  { src: 'In Phaze Cost', slug: 'cost' },
  { src: 'In Phaze Crew', slug: 'crew' },
  { src: 'In Phaze Electricista', slug: 'electricista' },
  { src: 'In Phaze Image Prompt Kit', slug: 'image-prompt-kit' },
  { src: 'In Phaze Matrix Page', slug: 'matrix-page' },
  { src: 'In Phaze Reviews', slug: 'reviews' },
  { src: 'In Phaze SEO Architecture', slug: 'seo-architecture' },
  { src: 'In Phaze Service Page', slug: 'service-page' },
  { src: 'In Phaze Site Index', slug: 'site-index' },
];

htmlFiles.forEach(({ src, slug }) => {
  const htmlPath = `./${src}.dc.html`;
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract content from <body> tag
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Escape backticks and use set:html
  const escapedContent = bodyContent.replace(/`/g, '\\`');
  
  const filename = slug === 'index' ? 'src/pages/index.astro' : `src/pages/${slug}.astro`;
  
  const astroContent = `---
import Layout from '../layouts/BaseLayout.astro';
---

<Layout>
  <div set:html={\`${escapedContent}\`} />
</Layout>
`;
  
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, astroContent);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✓ All pages created successfully!');

