import type { MetadataRoute } from 'next';
import { cargarCatalogo } from '@/catalogo/cargar';
import { getAllBlogSlugs } from '@/lib/blog';

// SIN "s" tras "book". funbookspublisher.com (con "s") esta aparcado y no es
// nuestro: hasta el 19 ago 2026 el sitemap listaba todas las URLs bajo ese
// dominio ajeno, de modo que no se enviaba a Google ni una pagina real.
const BASE_URL = 'https://funbookpublisher.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString();

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/books',
        '/blog',
        '/contact',
        '/faq',
        '/privacy',
        '/terms',
        '/refunds',
    ];

    const staticEntries = staticPages.flatMap((path) => [
        {
            url: `${BASE_URL}/en${path}`,
            lastModified: now,
            changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
            priority: path === '' ? 1.0 : 0.7,
        },
        {
            url: `${BASE_URL}/es${path}`,
            lastModified: now,
            changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
            priority: path === '' ? 0.9 : 0.6,
        },
    ]);

    // Book pages: every FBP book in the live catalog (updated by the catalogo_fbp agent)
    const { libros } = await cargarCatalogo();
    const bookEntries = libros.flatMap((book) => [
        {
            url: `${BASE_URL}/en/books/${book.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/es/books/${book.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]);

    // Blog posts
    const blogSlugs = getAllBlogSlugs('en');
    const blogEntries = blogSlugs.map((slug) => ({
        url: `${BASE_URL}/en/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticEntries, ...bookEntries, ...blogEntries];
}
