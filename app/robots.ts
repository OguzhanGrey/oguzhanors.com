import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'], // Protect API routes from indexing
        },
        sitemap: 'https://oguzhanors.com/sitemap.xml',
    };
}