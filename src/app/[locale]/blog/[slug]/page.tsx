import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { BlogPostContent } from './BlogPostContent';
import { BlogPostJsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
    const slugs = getAllBlogSlugs('en');
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug, 'en');
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.title} | Fun Books Publisher Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug, 'en');
    if (!post) notFound();
    return (
        <>
            <BlogPostJsonLd title={post.title} excerpt={post.excerpt} date={post.date} slug={post.slug} />
            <BlogPostContent post={post} />
        </>
    );
}
