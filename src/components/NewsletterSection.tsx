'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
    const t = useTranslations('newsletter');
    const sectionRef = useRef<HTMLElement>(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = sectionRef.current?.querySelectorAll('.reveal');
            if (!items) return;

            items.forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        once: true,
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: "power3.out",
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setEmail('');
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section ref={sectionRef} className="py-20 sm:py-32 bg-navy-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06),transparent_60%)]" />

            {/* Floating decorative icons */}
            <div className="absolute top-20 left-[10%] text-accent/10 animate-[float_8s_ease-in-out_infinite]">
                <Mail className="w-16 h-16" />
            </div>
            <div className="absolute bottom-20 right-[12%] text-blue-text-from/10 animate-[float-slow_10s_ease-in-out_infinite]">
                <Sparkles className="w-12 h-12" />
            </div>

            <div className="max-w-2xl mx-auto px-6 relative z-10">
                {/* Glowing border container */}
                <div className="glow-border">
                    <div className="glow-border-inner text-center">
                        <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('title')}
                        </h2>
                        <p className="reveal text-white/55 text-base sm:text-lg mb-4 max-w-xl mx-auto">
                            {t('subtitle')}
                        </p>
                        <p className="reveal text-accent/80 text-sm font-medium mb-10 flex items-center justify-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            {t('socialProof')}
                        </p>

                        {status === 'success' ? (
                            <div className="reveal glass-card p-8 text-center">
                                <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                                <p className="text-2xl font-bold text-white mb-2">{t('success')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="reveal flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('placeholder')}
                                    required
                                    className="input-email flex-1"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary justify-center whitespace-nowrap disabled:opacity-50"
                                >
                                    {status === 'loading' ? '...' : t('button')}
                                </button>
                            </form>
                        )}

                        {status === 'error' && (
                            <p className="text-red-400 text-sm mt-4">{t('error')}</p>
                        )}

                        <p className="reveal text-white/25 text-xs mt-6">
                            {t('privacy')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
