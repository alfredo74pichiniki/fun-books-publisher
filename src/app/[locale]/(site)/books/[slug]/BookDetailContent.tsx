'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Star, ArrowLeft, ExternalLink, BookOpen, Globe, Ruler, Tag, Gift } from 'lucide-react';
import { getBookBySlug, getRelatedBooks } from '@/data/helpers';
import { getCategoryById } from '@/data/categories';
import gsap from 'gsap';

export function BookDetailContent({ bookId }: { bookId: string }) {
    const t = useTranslations('bookDetail');
    const locale = useLocale();
    const book = getBookBySlug(bookId)!;
    const cat = getCategoryById(book.category);
    const relatedBooks = getRelatedBooks(bookId, 4);

    const pageRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const glowGradient = cat?.gradient || 'from-accent/20 to-blue-text-from/20';

    const description = locale === 'es' && book.descriptionEs ? book.descriptionEs : book.description;
    const bookTitle = locale === 'es' && book.titleEs ? book.titleEs : book.title;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Cover entrance
            if (coverRef.current) {
                gsap.from(coverRef.current, {
                    opacity: 0,
                    x: -60,
                    duration: 0.9,
                    ease: 'power3.out',
                });
            }
            // Info entrance
            if (infoRef.current) {
                gsap.from(infoRef.current.children, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.08,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.2,
                });
            }
        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="pt-28 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                {/* Back link */}
                <Link
                    href="/books"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('backToCatalog')}
                </Link>

                {/* Main content: Cover + Info */}
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Cover */}
                    <div ref={coverRef} className="relative flex justify-center md:sticky md:top-32">
                        <div className="relative w-[280px] sm:w-[320px] md:w-[380px]">
                            {/* Glow */}
                            <div className={`absolute -inset-10 bg-gradient-to-br ${glowGradient} blur-3xl rounded-full opacity-40`} />

                            {/* Cover image */}
                            <div
                                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
                                style={{ transform: 'perspective(900px) rotateY(-3deg)' }}
                            >
                                <Image
                                    src={book.coverImage}
                                    alt={bookTitle}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 320px, 380px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Bestseller badge */}
                            {book.isBestseller && (
                                <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-accent/25">
                                    Bestseller
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div ref={infoRef} className="space-y-6">
                        {/* Category badge */}
                        <span className="category-pill">
                            {locale === 'es' && cat?.nameEs ? cat.nameEs : cat?.name || book.categoryLabel}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {bookTitle}
                        </h1>

                        {/* Rating */}
                        {book.rating !== null && (
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(book.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-white/50 text-sm">
                                    {book.rating} {t('rating')}
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-white">${book.price}</span>
                            <span className="text-white/30 text-sm">Paperback</span>
                        </div>

                        {/* Description */}
                        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                            {description}
                        </p>

                        {/* Bonus Banner */}
                        {book.bonusPdf && (
                            <Link
                                href={`/bonus/${book.id}`}
                                className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 hover:border-accent/30 transition-all group"
                            >
                                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                    <Gift className="w-5 h-5 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">{t('getBonusPages')}</p>
                                    <p className="text-white/40 text-xs">{t('bonusSubtitle')}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors" />
                            </Link>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a
                                href={book.amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-3.5 px-6 bg-accent hover:bg-accent-dark text-white text-base font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/25 inline-flex items-center justify-center gap-2"
                            >
                                {t('buyOnAmazon')}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <Link
                                href="/books"
                                className="text-center py-3.5 px-6 border-2 border-white/15 hover:border-white/30 text-white/70 hover:text-white text-base font-medium rounded-xl transition-all inline-flex items-center justify-center gap-2"
                            >
                                {t('backToCatalog')}
                            </Link>
                        </div>

                        {/* Specifications */}
                        <div className="glass-card p-6 mt-4">
                            <h3 className="text-lg font-bold text-white mb-4">{t('specifications')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <SpecRow icon={<BookOpen className="w-4 h-4" />} label={t('pages')} value={`${book.pages}`} />
                                <SpecRow icon={<Globe className="w-4 h-4" />} label={t('language')} value={book.language === 'en' ? t('english') : t('spanish')} />
                                <SpecRow icon={<Ruler className="w-4 h-4" />} label={t('format')} value={t('paperback')} />
                                <SpecRow icon={<Tag className="w-4 h-4" />} label={t('category')} value={locale === 'es' && cat?.nameEs ? cat.nameEs : cat?.name || book.categoryLabel} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                            {t('relatedBooks')}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {relatedBooks.map((related) => {
                                const relCat = getCategoryById(related.category);
                                return (
                                    <Link
                                        key={related.id}
                                        href={`/books/${related.id}`}
                                        className="glass-card overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden bg-navy-900">
                                            <Image
                                                src={related.coverImage}
                                                alt={related.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/90 to-transparent" />
                                            <div className="absolute top-2 left-2">
                                                <span className="category-pill text-[10px]">
                                                    {locale === 'es' && relCat?.nameEs ? relCat.nameEs : relCat?.name || related.categoryLabel}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-navy-950/80 backdrop-blur-sm rounded-lg text-white font-bold text-xs border border-white/10">
                                                ${related.price}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                                                {locale === 'es' && related.titleEs ? related.titleEs : related.title}
                                            </h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="text-white/30">{icon}</div>
            <div>
                <p className="text-white/40 text-xs">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}
