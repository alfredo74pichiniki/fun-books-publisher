'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import gsap from 'gsap';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    category: string;
    tags: string[];
    content: string;
}

function renderMarkdown(md: string): string {
    // Simple markdown to HTML conversion for blog posts
    let html = md
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Ordered lists
        .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-6 mb-2 list-decimal">$1</li>')
        // Unordered lists
        .replace(/^[-*]\s+(.+)$/gm, '<li class="ml-6 mb-2 list-disc">$1</li>')
        // Paragraphs (lines that aren't headers, lists, or empty)
        .replace(/^(?!<[hlu]|<li)(.+)$/gm, '<p class="mb-4">$1</p>')
        // Clean up empty paragraphs
        .replace(/<p class="mb-4"><\/p>/g, '');

    return html;
}

export function BlogPostContent({ post }: { post: BlogPost }) {
    const t = useTranslations('blog');
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pageRef.current) {
            gsap.from('.post-header', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });
            gsap.from('.post-body', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.3,
            });
        }
    }, []);

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div ref={pageRef} className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-orange-400 transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('backToBlog')}
                </Link>

                {/* Header */}
                <div className="post-header mb-10">
                    {/* Category + Date */}
                    <div className="flex items-center gap-3 mb-5 text-sm">
                        <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 font-medium">
                            {post.category}
                        </span>
                        <span className="text-white/40 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formattedDate}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-white/50 text-lg leading-relaxed">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/35 flex items-center gap-1"
                            >
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-10" />

                {/* Body */}
                <div
                    className="post-body prose-custom text-white/60 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                />

                {/* Bottom CTA */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/40 text-sm mb-4">{t('enjoyedPost')}</p>
                    <Link
                        href="/books"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                    >
                        {t('exploreBooks')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
