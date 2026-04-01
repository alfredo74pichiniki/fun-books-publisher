'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { BookOpen, Users, Star, Award } from 'lucide-react';

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
        <div ref={ref} className="text-4xl sm:text-5xl font-bold tabular-nums">
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">{display}</span>
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">{suffix}</span>
        </div>
    );
}

const STATS = [
    { value: 100, suffix: 'K+', key: 'readers', icon: Users, gradient: 'from-blue-text-from/20 to-blue-text-via/10' },
    { value: 5, suffix: '', key: 'bestsellers', icon: Award, gradient: 'from-accent/20 to-accent-light/10' },
    { value: 4.7, suffix: '★', key: 'rating', icon: Star, gradient: 'from-amber-400/20 to-amber-500/10' },
    { value: 18, suffix: '', key: 'books', icon: BookOpen, gradient: 'from-blue-text-to/20 to-blue-text-from/10' },
];

export function StatsBar() {
    const t = useTranslations('stats');
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = ref.current;
        if (!section) return;

        const items = section.querySelectorAll('.stat-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('in-view');
                        }, i * 120);
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
        <section ref={ref} className="py-16 sm:py-24 bg-navy-800 relative overflow-hidden">
            {/* Decorative subtle mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(56,189,248,0.04),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(249,115,22,0.04),transparent_60%)]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.key}
                                className="stat-card glass-card p-6 sm:p-8 text-center opacity-0 translate-y-6 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white/80" />
                                </div>

                                {/* Number */}
                                <AnimatedNumber target={stat.value} suffix={stat.suffix} />

                                {/* Divider */}
                                <div className="w-8 h-[2px] bg-gradient-to-r from-accent/40 to-blue-text-from/40 mx-auto my-3" />

                                {/* Label */}
                                <p className="text-xs sm:text-sm text-white/45 uppercase tracking-[0.15em] font-medium">
                                    {t(stat.key)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
