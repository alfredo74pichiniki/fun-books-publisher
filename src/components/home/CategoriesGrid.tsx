'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CATEGORIES } from '@/data/categories';
import { getCategoryBookCount } from '@/data/helpers';
import { Palette, Brush, Puzzle, Globe, GraduationCap, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    Palette, Brush, Puzzle, Globe, GraduationCap, Heart,
};

export function CategoriesGrid() {
    const t = useTranslations('categories');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cat-header', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                        once: true,
                    },
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: "power3.out",
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 sm:py-32 bg-navy-900 relative overflow-hidden">
            {/* Subtle background accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-text-from/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[200px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="cat-header text-center mb-16">
                    <p className="section-label mb-4">Categories</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <div className="section-divider mb-6" />
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {CATEGORIES.map((cat) => {
                        const Icon = ICONS[cat.icon] || Palette;
                        const count = getCategoryBookCount(cat.id);
                        return (
                            <Link
                                key={cat.id}
                                href={`/books?category=${cat.id}`}
                                className="glass-card group p-7 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
                                style={{ perspective: '1000px' }}
                            >
                                {/* Subtle gradient overlay unique per category */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cat.gradient} rounded-[1.25rem]`}
                                    style={{ opacity: 0.05 }} />

                                {/* Icon — larger with gradient bg */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                                    {locale === 'es' ? cat.nameEs : cat.name}
                                </h3>

                                {/* Description */}
                                <p className="text-white/45 text-sm leading-relaxed">
                                    {locale === 'es' ? cat.descriptionEs : cat.description}
                                </p>

                                {/* Book count + arrow */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="text-white/30 text-xs uppercase tracking-wider font-medium">
                                        {t('booksCount', { count })}
                                    </span>
                                    <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                        {t('viewCategory')} &rarr;
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
