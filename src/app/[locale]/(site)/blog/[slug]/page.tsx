import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BlogPostJsonLd } from '@/components/JsonLd';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog';
import { aHtml } from '@/sitio/markdown';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
    return getAllBlogSlugs('en').map((slug) => ({ locale: 'en', slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug, 'en');
    if (!post) return { title: 'Post not found | Fun Books Publisher' };
    return {
        title: `${post.title} | Fun Books Publisher`,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
    };
}

export default async function BlogPost({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = getBlogPost(slug, 'en');
    if (!post) notFound();
    const fecha = new Date(`${post.date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    return (
        <>
            <BlogPostJsonLd title={post.title} excerpt={post.excerpt} date={post.date} slug={post.slug} />
            <article className="aTexto aPost" lang="en">
                <nav className="aMigasT" aria-label="Breadcrumb"><Link href="/blog">The blog</Link></nav>
                <p className="aFam">{post.category}</p>
                <h1>{post.title}</h1>
                <p className="aFecha"><time dateTime={post.date}>{fecha}</time></p>
                <div className="aCuerpo" dangerouslySetInnerHTML={{ __html: aHtml(post.content) }} />
                <div className="aAcc">
                    <Link className="aBtn" href="/books">See our books</Link>
                    <Link className="aLink" href="/blog">More from the blog</Link>
                </div>
            </article>
        </>
    );
}
