'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Sparkles, Globe, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const t = useTranslations('about');
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-header', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });

            gsap.from('.about-section', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 85%',
                    once: true,
                },
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
            });

            gsap.from('.values-card', {
                scrollTrigger: {
                    trigger: '.values-grid',
                    start: 'top 80%',
                    once: true,
                },
                opacity: 0,
                y: 30,
                scale: 0.97,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out',
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="about-header text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5">
                        {t('title')}
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Mission */}
                <div className="about-section glass-card p-8 sm:p-10 mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t('mission')}</h2>
                    <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                        {t('missionText')}
                    </p>
                </div>

                {/* Story */}
                <div className="about-section glass-card p-8 sm:p-10 mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t('story')}</h2>
                    <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                        {t('storyText')}
                    </p>
                </div>

                {/* Values */}
                <h2 className="about-section text-2xl sm:text-3xl font-bold text-white text-center mb-10">
                    {t('values')}
                </h2>
                <div className="values-grid grid sm:grid-cols-3 gap-6 mb-16">
                    <ValueCard
                        icon={<Sparkles className="w-6 h-6" />}
                        title={t('quality')}
                        description={t('qualityText')}
                    />
                    <ValueCard
                        icon={<Globe className="w-6 h-6" />}
                        title={t('accessibility')}
                        description={t('accessibilityText')}
                    />
                    <ValueCard
                        icon={<Target className="w-6 h-6" />}
                        title={t('purpose')}
                        description={t('purposeText')}
                    />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/books" className="btn-primary text-base">
                        Explore Our Books
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="values-card glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
