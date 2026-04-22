import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://murgialiquori.it';

  const routes = [
    '',
    '/la-storia',
    '/la-collezione',
    '/dove-ci-trovi',
    '/contatti',
    '/shop/la-sbagliata',
    '/shop/murgia-bianco',
    '/shop/murgia-giallo',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/shop/') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
