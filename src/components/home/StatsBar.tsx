'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [display, setDisplay] = useState('0');
    const ref = useRef<HTMLDivElement>(null);
    const animated = useRef(false);

    const animate = useCallback(() => {
        if (animated.current) return;
        animated.current = true;

        const duration = 2200;
        const isFloat = !Number.isInteger(target);
        const startTime = performance.now();

        function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toString());

            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }, [target]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    return (
        <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white mb-2 tabular-nums">
            <span className="text-accent">{display}</span>
            <span className="text-accent">{suffix}</span>
        </div>
    );
}

const STATS = [
    { value: 100, suffix: 'K+', key: 'readers' },
    { value: 5, suffix: '', key: 'bestsellers' },
    { value: 4.7, suffix: '★', key: 'rating' },
    { value: 18, suffix: '', key: 'books' },
];

export function StatsBar() {
    const t = useTranslations('stats');
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = ref.current;
        if (!section) return;

        const items = section.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-16 sm:py-20 bg-navy-800 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.key}
                            className={`reveal reveal-stagger-${i + 1} text-center`}
                        >
                            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent-light mx-auto mb-3 opacity-50" />
                            <p className="text-xs sm:text-sm text-white/40 uppercase tracking-[0.15em] font-medium">
                                {t(stat.key)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
