import type { MetadataRoute } from 'next';
import { cargarCatalogo } from '@/catalogo/cargar';
import { getAllBlogSlugs } from '@/lib/blog';

// SIN "s" tras "book". funbookspublisher.com (con "s") esta aparcado y no es
// nuestro: hasta el 19 ago 2026 el sitemap listaba todas las URLs bajo ese
// dominio ajeno, de modo que no se enviaba a Google ni una pagina real.
const BASE_URL = 'https://funbookpublisher.com';

// English lives at the root (/en/... answers with a redirect to /...), Spanish under /es. Only the pages
// that really have a Spanish text get a Spanish entry; the legal pages and the blog are in English only.
const TRADUCIDAS = ['', '/about', '/books', '/faq', '/contact', '/privacy'];
const SOLO_INGLES = ['/blog', '/terms', '/refunds'];

export const revalidate = 3600;

type Entrada = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString();
    const dos = (path: string, prioridad: number): Entrada[] => {
        const languages = { en: `${BASE_URL}${path || '/'}`, es: `${BASE_URL}/es${path}` };
        const base = { lastModified: now, changeFrequency: (path === '' ? 'weekly' : 'monthly') as Entrada['changeFrequency'], alternates: { languages } };
        return [
            { ...base, url: languages.en, priority: prioridad },
            { ...base, url: languages.es, priority: Math.max(0.1, prioridad - 0.1) },
        ];
    };

    const paginas: Entrada[] = [
        ...TRADUCIDAS.flatMap((p) => dos(p, p === '' ? 1 : 0.7)),
        ...SOLO_INGLES.map((p) => ({ url: `${BASE_URL}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 })),
    ];

    // Book pages: every FBP book in the live catalog (updated by the catalogo_fbp agent)
    const { libros } = await cargarCatalogo();
    const fichas = libros.flatMap((b) => dos(`/books/${b.slug}`, 0.8));

    const blog: Entrada[] = getAllBlogSlugs('en').map((slug) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...paginas, ...fichas, ...blog];
}
