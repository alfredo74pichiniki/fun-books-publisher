'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import gsap from 'gsap';

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    tags: string[];
}

export default function BlogPage() {
    const t = useTranslations('blog');
    const pageRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog')
            .then((r) => r.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading && pageRef.current) {
            gsap.from('.blog-header', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });
            gsap.from('.blog-card', {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.3,
            });
        }
    }, [loading]);

    return (
        <div ref={pageRef} className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="blog-header text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="text-center text-white/40 py-20">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-white/40 py-20">{t('noPosts')}</div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="blog-card group glass-card overflow-hidden hover:border-orange-500/30 transition-all duration-300"
                            >
                                {/* Color bar top */}
                                <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />

                                <div className="p-6">
                                    {/* Category + Date */}
                                    <div className="flex items-center gap-3 mb-4 text-xs">
                                        <span className="px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-400 font-medium">
                                            {post.category}
                                        </span>
                                        <span className="text-white/35 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-lg font-bold text-white mb-3 group-hover:text-orange-300 transition-colors leading-snug">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More */}
                                    <div className="flex items-center gap-1.5 text-sm text-orange-400 font-medium group-hover:gap-3 transition-all">
                                        {t('readMore')}
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
