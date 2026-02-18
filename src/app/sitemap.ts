import type { MetadataRoute } from 'next';
import { BOOKS } from '@/data/books';
import { getAllBlogSlugs } from '@/lib/blog';

const BASE_URL = 'https://funbookspublisher.com';

export default function sitemap(): MetadataRoute.Sitemap {
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

    // Book pages
    const bookEntries = BOOKS.filter((b) => b.isActive).flatMap((book) => [
        {
            url: `${BASE_URL}/en/books/${book.id}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/es/books/${book.id}`,
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
