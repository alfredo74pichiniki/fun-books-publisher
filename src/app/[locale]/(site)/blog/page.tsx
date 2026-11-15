import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = 'force-static';
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

export const metadata: Metadata = {
    title: 'Blog: coloring, puzzles and a sharp mind | Fun Books Publisher',
    description: 'Short reads about adult coloring, brain puzzles and getting the most out of an activity book.',
    alternates: { canonical: '/blog' },
};

const fecha = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const posts = getBlogPosts('en');
    return (
        <div className="aTexto aBlog" lang="en">
            <h1>The blog</h1>
            <p className="aIntro">Short reads about coloring, puzzles and keeping a sharp mind.</p>
            {locale === 'es' && <p className="aNota" lang="es">Los artículos están en inglés.</p>}
            <ul className="aArticulos">
                {posts.map((p) => (
                    <li key={p.slug}>
                        <article>
                            <p className="aFam">{p.category}</p>
                            <h2><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
                            <p>{p.excerpt}</p>
                            <p className="aFecha"><time dateTime={p.date}>{fecha(p.date)}</time></p>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
