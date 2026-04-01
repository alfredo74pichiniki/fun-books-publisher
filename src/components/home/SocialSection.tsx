'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/funbookspublisher1/',
        icon: (
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        ),
        hoverBg: 'hover:bg-blue-600',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/funbooks_publisher',
        icon: (
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        ),
        hoverBg: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
    },
    {
        name: 'Pinterest',
        url: 'https://www.pinterest.com/funbooks_publisher/',
        icon: (
            <path d="M12 0a12 12 0 00-4.373 23.178c-.07-.937-.134-2.376.028-3.399.146-.926.944-5.896.944-5.896s-.24-.482-.24-1.192c0-1.115.647-1.949 1.452-1.949.685 0 1.016.515 1.016 1.131 0 .69-.439 1.72-.665 2.673-.189.8.401 1.452 1.189 1.452 1.428 0 2.527-1.505 2.527-3.677 0-1.922-1.381-3.266-3.355-3.266-2.286 0-3.626 1.714-3.626 3.486 0 .69.266 1.429.598 1.831.065.079.075.148.055.229-.061.253-.196.8-.223.912-.035.148-.116.18-.268.108-1.001-.466-1.627-1.928-1.627-3.102 0-2.524 1.834-4.843 5.288-4.843 2.776 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.499 1.902c-.181.695-.669 1.566-.995 2.097A12 12 0 1012 0z" />
        ),
        hoverBg: 'hover:bg-red-600',
    },
];

export function SocialSection() {
    const t = useTranslations('social');
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.social-content', {
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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 sm:py-28 bg-navy-900 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.06),transparent_60%)]" />

            <div className="social-content max-w-5xl mx-auto px-6 relative z-10">
                {/* Layout: split on desktop */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left side — text + social icons */}
                    <div className="flex-1 text-center lg:text-left">
                        <p className="section-label mb-4">Connect</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('title')}
                        </h2>
                        <div className="section-divider mb-6 lg:mx-0" />
                        <p className="text-white/50 text-base sm:text-lg mb-8 max-w-xl">
                            {t('subtitle')}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 justify-center lg:justify-start">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.hoverBg}`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right side — Amazon CTA card */}
                    <div className="shrink-0">
                        <a
                            href="https://www.amazon.com/author/funbookspublisher"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-8 sm:p-10 flex flex-col items-center gap-5 group max-w-xs"
                        >
                            {/* Amazon icon */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300 animate-[glow-pulse_3s_ease-in-out_infinite]">
                                <ShoppingBag className="w-8 h-8 text-white" />
                            </div>

                            <div className="text-center">
                                <p className="text-white font-bold text-lg mb-1">
                                    {t('ctaAmazon')}
                                </p>
                                <p className="text-white/40 text-sm">
                                    Available worldwide
                                </p>
                            </div>

                            {/* Arrow */}
                            <span className="text-accent text-2xl group-hover:translate-x-2 transition-transform duration-300">
                                &rarr;
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
