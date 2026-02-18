'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { getActiveBooks } from '@/data/helpers';
import { CATEGORIES, getCategoryById } from '@/data/categories';
import type { BookCategory } from '@/data/books';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CatalogPage() {
    const t = useTranslations('catalog');
    const locale = useLocale();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') as BookCategory | null;

    const [activeCategory, setActiveCategory] = useState<BookCategory | 'all'>(initialCategory || 'all');
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const allBooks = getActiveBooks();
    const filteredBooks = activeCategory === 'all'
        ? allBooks
        : allBooks.filter((b) => b.category === activeCategory);

    // Animate header on mount
    useEffect(() => {
        if (headerRef.current) {
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });
        }
    }, []);

    // Animate cards on filter change
    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
                { opacity: 0, y: 30, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.04,
                    duration: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, [activeCategory]);

    return (
        <section className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle', { count: allBooks.length })}
                    </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-2 justify-center mb-12">
                    <FilterTab
                        active={activeCategory === 'all'}
                        onClick={() => setActiveCategory('all')}
                        label={t('filterAll')}
                    />
                    {CATEGORIES.map((cat) => (
                        <FilterTab
                            key={cat.id}
                            active={activeCategory === cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            label={locale === 'es' ? cat.nameEs : cat.name}
                        />
                    ))}
                </div>

                {/* Books Grid */}
                {filteredBooks.length === 0 ? (
                    <p className="text-center text-white/40 py-20 text-lg">{t('noResults')}</p>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((book) => {
                            const cat = getCategoryById(book.category);
                            return (
                                <div
                                    key={book.id}
                                    className="glass-card overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-navy-900">
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        {/* Gradient overlay at bottom */}
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/90 to-transparent" />

                                        {/* Category badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="category-pill text-xs">
                                                {locale === 'es' && cat?.nameEs ? cat.nameEs : cat?.name || book.categoryLabel}
                                            </span>
                                        </div>

                                        {/* Bestseller badge */}
                                        {book.isBestseller && (
                                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-accent/30">
                                                Bestseller
                                            </div>
                                        )}

                                        {/* Price tag */}
                                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-navy-950/80 backdrop-blur-sm rounded-lg text-white font-bold text-sm border border-white/10">
                                            ${book.price}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 space-y-3">
                                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                                            {book.title}
                                        </h3>

                                        {/* Rating */}
                                        {book.rating !== null && (
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3.5 h-3.5 ${i < Math.floor(book.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-white/35 text-xs">
                                                    {book.rating}{book.reviewCount !== null && ` (${book.reviewCount})`}
                                                </span>
                                            </div>
                                        )}

                                        {/* CTAs */}
                                        <div className="flex gap-2 pt-2">
                                            <a
                                                href={book.amazonUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-all"
                                            >
                                                Buy on Amazon
                                            </a>
                                            <Link
                                                href={`/books/${book.id}`}
                                                className="px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

function FilterTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
        >
            {label}
        </button>
    );
}
