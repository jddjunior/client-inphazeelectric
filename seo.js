(() => {
  const path = decodeURIComponent(window.location.pathname);
  const file = path.split('/').pop() || 'index.html';
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('p');
  const content = () => window.InPhazeContent;
  const originPath = `${window.location.pathname}${slug ? `?p=${encodeURIComponent(slug)}` : ''}`;
  const image = new URL('https://cdn.builder.io/api/v1/image/assets%2F57fd5e85f28146269960c5b0fe53c10e%2F6d4e4296044147079b722ca134da3c83?format=webp&width=800&height=1200', window.location.href).href;

  const setMeta = (selector, attribute, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.head.appendChild(document.createElement('meta'));
      element.setAttribute(attribute, selector.match(/\[name="([^"]+)"\]/)?.[1] || selector.match(/\[property="([^"]+)"\]/)?.[1] || '');
    }
    element.setAttribute('content', value);
  };

  const apply = () => {
    const data = content();
    const service = data?.serviceMap?.[slug] || data?.SERVICES?.[0];
    const city = data?.cityMap?.[slug] || data?.CITIES?.[0];
    const matrix = data?.matrixMap?.[slug];
    const isService = file.includes('Service Page');
    const isCity = file.includes('City Page');
    const isMatrix = file.includes('Matrix Page');
    const isInternal = /Brand Kit|Image Prompt Kit|SEO Architecture|CRM|Customer Avatar/.test(file);
    let title = 'In Phaze Electric | Orlando Electrician';
    let description = 'In Phaze Electric is a veteran-owned Orlando electrician providing clear pricing, licensed work, and dependable service across Central Florida.';

    if (isService && service) {
      title = `${service.name || service.h1 || 'Electrical Service'} in Orlando | In Phaze Electric`;
      description = service.lede || `Licensed ${service.name || 'electrical'} services in Orlando and Central Florida from In Phaze Electric.`;
    } else if (isCity && city) {
      title = `Electrician in ${city.name}, FL | In Phaze Electric`;
      description = city.lede || `Trusted electrical service for ${city.name}, Florida homeowners from In Phaze Electric.`;
    } else if (isMatrix && matrix && service && city) {
      title = `${service.name || 'Electrical Service'} in ${city.name}, FL | In Phaze Electric`;
      description = matrix.lede || `Professional ${service.name || 'electrical'} service in ${city.name}, Florida from In Phaze Electric.`;
    } else if (file.includes('Reviews')) {
      title = 'Customer Reviews | In Phaze Electric';
      description = 'Read verified customer reviews for In Phaze Electric, a trusted Orlando electrician serving Central Florida.';
    } else if (file.includes('Contact')) {
      title = 'Contact an Electrician in Orlando | In Phaze Electric';
      description = 'Contact In Phaze Electric for a straight answer, a free estimate, or dependable electrical service in Central Florida.';
    } else if (file.includes('Careers')) {
      title = 'Electrician Jobs in Orlando | In Phaze Electric';
      description = 'Explore electrician and electrical service careers with In Phaze Electric in Orlando, Florida.';
    } else if (file.includes('Cost')) {
      title = 'Electrical Service Pricing | In Phaze Electric';
      description = 'See straightforward electrical service pricing, estimate guidance, and common project ranges from In Phaze Electric.';
    } else if (file.includes('About')) {
      title = 'About In Phaze Electric | Orlando Electrician';
      description = 'Meet In Phaze Electric, a veteran-owned Orlando electrical contractor focused on honest answers and careful work.';
    } else if (file.includes('Crew')) {
      title = 'Meet the Crew | In Phaze Electric';
      description = 'Meet the licensed electricians and service team behind In Phaze Electric in Central Florida.';
    } else if (file.includes('Electricista')) {
      title = 'Electricista en Orlando | In Phaze Electric';
      description = 'Servicio eléctrico confiable en Orlando y Florida Central de In Phaze Electric.';
    } else if (file.includes('Site Index')) {
      title = 'Site Index | In Phaze Electric';
      description = 'Browse electrical services, local service areas, resources, and contact pages from In Phaze Electric.';
    }

    document.title = title;
    setMeta('meta[name="description"]', 'name', description);
    setMeta('meta[property="og:title"]', 'property', title);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta('meta[property="og:url"]', 'property', new URL(originPath, window.location.origin).href);
    setMeta('meta[property="og:type"]', 'property', 'website');
    setMeta('meta[property="og:image"]', 'property', image);
    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', title);
    setMeta('meta[name="twitter:description"]', 'name', description);
    setMeta('meta[name="twitter:image"]', 'name', image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) canonical = document.head.appendChild(document.createElement('link'));
    canonical.rel = 'canonical';
    canonical.href = new URL(originPath, window.location.origin).href;

    if (isInternal) {
      setMeta('meta[name="robots"]', 'name', 'noindex, nofollow');
      return;
    }

    const graph = [{
      '@context': 'https://schema.org',
      '@type': 'Electrician',
      name: 'In Phaze Electric Inc.',
      telephone: '+14075997777',
      image,
      url: new URL(originPath, window.location.origin).href,
      address: { '@type': 'PostalAddress', streetAddress: '500 N Hudson Street', addressLocality: 'Orlando', addressRegion: 'FL', postalCode: '32835', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Florida' }
    }];
    if (isService && service) graph.push({ '@context': 'https://schema.org', '@type': 'Service', name: service.name || service.h1, provider: { '@type': 'Electrician', name: 'In Phaze Electric Inc.' }, areaServed: { '@type': 'City', name: 'Orlando' }, url: new URL(originPath, window.location.origin).href });
    if (isCity && city) graph[0].areaServed = { '@type': 'City', name: city.name, addressCountry: 'US' };
    if (isMatrix && matrix && service && city) graph.push({ '@context': 'https://schema.org', '@type': 'Service', name: service.name || service.h1, provider: { '@type': 'Electrician', name: 'In Phaze Electric Inc.' }, areaServed: { '@type': 'City', name: city.name, addressCountry: 'US' }, url: new URL(originPath, window.location.origin).href });

    let schema = document.head.querySelector('script[data-inphaze-schema]');
    if (!schema) {
      schema = document.head.appendChild(document.createElement('script'));
      schema.type = 'application/ld+json';
      schema.dataset.inphazeSchema = 'true';
    }
    schema.textContent = JSON.stringify(graph);
  };

  let attempts = 0;
  const waitForContent = () => {
    if (content() || attempts++ > 30) return apply();
    window.setTimeout(waitForContent, 100);
  };
  waitForContent();
})();
