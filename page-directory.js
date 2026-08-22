document.addEventListener('DOMContentLoaded', () => {
  const pages = [
    ['Homepage', 'index.html'],
    ['Services index', 'In%20Phaze%20Site%20Index.dc.html'],
    ['Service pages', null],
    ['Panel upgrades', 'In%20Phaze%20Service%20Page.dc.html?p=electrical-panel-upgrade'],
    ['EV chargers', 'In%20Phaze%20Service%20Page.dc.html?p=ev-charger-installation'],
    ['Surge protection', 'In%20Phaze%20Service%20Page.dc.html?p=surge-lightning-protection'],
    ['Generators', 'In%20Phaze%20Service%20Page.dc.html?p=generator-installation'],
    ['Lighting', 'In%20Phaze%20Service%20Page.dc.html?p=lighting-installation'],
    ['Rewiring & remodels', 'In%20Phaze%20Service%20Page.dc.html?p=rewiring-remodels'],
    ['Electrical repair', 'In%20Phaze%20Service%20Page.dc.html?p=electrical-repair'],
    ['Commercial', 'In%20Phaze%20Service%20Page.dc.html?p=commercial-electrician'],
    ['Emergency service', 'In%20Phaze%20Service%20Page.dc.html?p=emergency-electrician'],
    ['City pages', null],
    ['Orlando', 'In%20Phaze%20City%20Page.dc.html?p=orlando-electrician'],
    ['Winter Park', 'In%20Phaze%20City%20Page.dc.html?p=winter-park-electrician'],
    ['Maitland', 'In%20Phaze%20City%20Page.dc.html?p=maitland-electrician'],
    ['Longwood', 'In%20Phaze%20City%20Page.dc.html?p=longwood-electrician'],
    ['Lake Mary', 'In%20Phaze%20City%20Page.dc.html?p=lake-mary-electrician'],
    ['Winter Garden', 'In%20Phaze%20City%20Page.dc.html?p=winter-garden-electrician'],
    ['Kissimmee', 'In%20Phaze%20City%20Page.dc.html?p=kissimmee-electrician'],
    ['Oviedo', 'In%20Phaze%20City%20Page.dc.html?p=oviedo-electrician'],
    ['St. Cloud', 'In%20Phaze%20City%20Page.dc.html?p=st-cloud-electrician'],
    ['Apopka', 'In%20Phaze%20City%20Page.dc.html?p=apopka-electrician'],
    ['Sanford', 'In%20Phaze%20City%20Page.dc.html?p=sanford-electrician'],
    ['Windermere', 'In%20Phaze%20City%20Page.dc.html?p=windermere-electrician'],
    ['Reviews', 'In%20Phaze%20Reviews.dc.html'],
    ['Crew', 'In%20Phaze%20Crew.dc.html'],
    ['Pricing', 'In%20Phaze%20Cost.dc.html'],
    ['About', 'In%20Phaze%20About.dc.html'],
    ['Contact', 'In%20Phaze%20Contact.dc.html'],
    ['Careers', 'In%20Phaze%20Careers.dc.html'],
    ['En español', 'In%20Phaze%20Electricista.dc.html']
  ];

  const style = document.createElement('style');
  style.textContent = `
    .pageDirectoryToggle { position:fixed;z-index:120;left:0;top:50%;transform:translateY(-50%);border:1px solid #6B5A80;border-left:0;background:#150B24;color:#FFD400;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;padding:14px 10px;writing-mode:vertical-rl;cursor:pointer; }
    .pageDirectory { position:fixed;z-index:119;left:0;top:0;bottom:0;width:270px;box-sizing:border-box;overflow-y:auto;padding:26px 18px;background:#0B0710;border-right:1px solid #2A1B3D;box-shadow:12px 0 40px rgba(7,4,12,.45);transform:translateX(-100%);transition:transform .2s ease; }
    .pageDirectory.is-open { transform:translateX(0); }
    .pageDirectoryHeader { display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:18px;border-bottom:1px solid #2A1B3D; }
    .pageDirectoryTitle { margin:0;color:#F7F4F2;font-family:Archivo,sans-serif;font-weight:900;font-size:22px;letter-spacing:-.03em; }
    .pageDirectoryClose { border:0;background:none;color:#FFD400;font-size:22px;line-height:1;cursor:pointer; }
    .pageDirectoryList { display:grid;gap:3px;margin-top:16px; }
    .pageDirectorySection { margin:14px 0 5px;color:#A855F7;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em; }
    .pageDirectoryLink { display:block;padding:7px 8px;color:#CFC6DA;text-decoration:none;font-family:Barlow,sans-serif;font-size:15px;border-left:2px solid transparent; }
    .pageDirectoryLink:hover,.pageDirectoryLink.is-current { color:#FFD400;border-left-color:#FFD400;background:#150B24; }
    @media (max-width:620px) { .pageDirectory { width:min(300px,88vw); } }
    @media (prefers-reduced-motion:reduce) { .pageDirectory { transition:none; } }
  `;
  document.head.appendChild(style);

  const directory = document.createElement('aside');
  directory.className = 'pageDirectory';
  directory.setAttribute('aria-label', 'Page directory');
  directory.innerHTML = '<div class="pageDirectoryHeader"><h2 class="pageDirectoryTitle">Pages</h2><button class="pageDirectoryClose" type="button" aria-label="Close page directory">×</button></div><nav class="pageDirectoryList"></nav>';
  const list = directory.querySelector('.pageDirectoryList');
  pages.forEach(([label, href]) => {
    if (!href) {
      const section = document.createElement('div');
      section.className = 'pageDirectorySection';
      section.textContent = label;
      list.appendChild(section);
      return;
    }
    const link = document.createElement('a');
    link.className = 'pageDirectoryLink';
    link.href = href;
    link.textContent = label;
    if (decodeURIComponent(window.location.pathname).endsWith(decodeURIComponent(href.split('?')[0]))) link.classList.add('is-current');
    list.appendChild(link);
  });

  const toggle = document.createElement('button');
  toggle.className = 'pageDirectoryToggle';
  toggle.type = 'button';
  toggle.textContent = 'PAGES';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'page-directory');
  directory.id = 'page-directory';
  const setOpen = (open) => {
    directory.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!directory.classList.contains('is-open')));
  directory.querySelector('.pageDirectoryClose').addEventListener('click', () => setOpen(false));
  document.body.append(toggle, directory);
});
