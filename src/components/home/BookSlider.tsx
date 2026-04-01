'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { getFeaturedBooks } from '@/data/helpers';
import { getCategoryById } from '@/data/categories';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BookSlider() {
    const t = useTranslations('featured');
    const locale = useLocale();
    const books = getFeaturedBooks(8);
    const sectionRef = useRef<HTMLElement>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
    });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.book-section-header', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 sm:py-32 bg-navy-950 relative overflow-hidden">
            {/* Spotlight glow behind active book */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_60%)]" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="book-section-header text-center mb-16">
                    <p className="section-label mb-4">Collection</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <div className="section-divider mb-6" />
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div ref={emblaRef} className="overflow-hidden">
                        <div className="flex">
                            {books.map((book) => {
                                const cat = getCategoryById(book.category);
                                return (
                                    <div key={book.id} className="flex-[0_0_100%] min-w-0 px-4 md:px-8">
                                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
                                            {/* 3D Book Cover */}
                                            <div className="relative flex justify-center">
                                                <div className="book-3d relative w-[220px] sm:w-[260px] md:w-[300px]">
                                                    {/* Shadow on surface */}
                                                    <div className="book-3d-shadow" />

                                                    {/* Glow behind book */}
                                                    <div className={`absolute -inset-12 bg-gradient-to-br ${cat?.gradient || 'from-accent/20 to-blue-text-from/20'} blur-[80px] rounded-full opacity-30 animate-[glow-pulse_4s_ease-in-out_infinite]`} />

                                                    {/* Book with 3D transform */}
                                                    <div className="book-3d-inner relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
                                                        <Image
                                                            src={book.coverImage}
                                                            alt={book.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 220px, 300px"
                                                        />
                                                        {/* Light reflection overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                                                        {/* Bottom shadow */}
                                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                                                    </div>

                                                    {/* Bestseller badge */}
                                                    {book.isBestseller && (
                                                        <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-accent to-accent-dark text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-accent/30 z-10">
                                                            ★ Bestseller
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Book Info */}
                                            <div className="text-center md:text-left space-y-5">
                                                {/* Category badge */}
                                                <span className="category-pill">
                                                    {locale === 'es' && cat?.nameEs ? cat.nameEs : cat?.name || book.categoryLabel}
                                                </span>

                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                                                    {book.title}
                                                </h3>

                                                {book.subtitle && book.subtitle !== (cat?.name || '') && (
                                                    <p className="text-white/40 text-sm italic">
                                                        {book.subtitle}
                                                    </p>
                                                )}

                                                <p className="text-white/55 text-sm sm:text-base leading-relaxed">
                                                    {locale === 'es' && book.descriptionEs ? book.descriptionEs : book.description}
                                                </p>

                                                {/* Rating */}
                                                {book.rating !== null && (
                                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < Math.floor(book.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-white/40 text-sm">
                                                            {book.rating}{book.reviewCount > 0 && ` (${book.reviewCount})`}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* CTAs */}
                                                <div className="flex gap-3 justify-center md:justify-start pt-2">
                                                    <a
                                                        href={book.amazonUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary !text-sm"
                                                    >
                                                        {t('buyOnAmazon')}
                                                    </a>
                                                    <Link
                                                        href={`/books/${book.id}`}
                                                        className="btn-secondary !text-sm"
                                                    >
                                                        {t('learnMore')}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows — premium style */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-accent/20 hover:border-accent/40 transition-all z-10 hidden md:flex"
                        aria-label="Previous book"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-accent/20 hover:border-accent/40 transition-all z-10 hidden md:flex"
                        aria-label="Next book"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Dot Indicators — premium */}
                <div className="flex justify-center gap-2 mt-10">
                    {scrollSnaps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${i === selectedIndex
                                ? 'bg-accent w-10'
                                : 'bg-white/15 w-2.5 hover:bg-white/30'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* View All link */}
                <div className="text-center mt-10">
                    <Link href="/books" className="text-accent hover:text-accent-light text-sm font-medium transition-colors inline-flex items-center gap-2">
                        {t('viewAll')} <span className="text-lg">&rarr;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
