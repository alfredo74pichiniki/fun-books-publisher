'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Download, CheckCircle, Gift, ExternalLink, Sparkles } from 'lucide-react';
import { getBookBySlug } from '@/data/helpers';
import gsap from 'gsap';

export function BonusLanding({ bookId }: { bookId: string }) {
    const t = useTranslations('bonus');
    const book = getBookBySlug(bookId)!;

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [downloadUrl, setDownloadUrl] = useState('');

    const pageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Bonus pages always in English — physical books are in English
    const bookTitle = book.title;
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cardRef.current) {
                gsap.from(cardRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            }
        }, pageRef);
        return () => ctx.revert();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/send-bonus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, bookId }),
            });

            const data = await res.json();

            if (data.success && data.downloadUrl) {
                setDownloadUrl(data.downloadUrl);
                setStatus('success');
            } else {
                setDownloadUrl(`${siteUrl}${book.bonusPdf}`);
                setStatus('success');
            }
        } catch {
            setDownloadUrl(`${siteUrl}${book.bonusPdf}`);
            setStatus('success');
        }
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-navy-950" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div style={{ maxWidth: '1100px', width: '100%' }}>
                {/* Main Card */}
                <div
                    ref={cardRef}
                    style={{
                        background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(15,23,42,1) 30%, rgba(15,23,42,1) 70%, rgba(56,189,248,0.05))',
                        border: '1px solid rgba(249,115,22,0.25)',
                        borderRadius: '24px',
                        padding: '60px 48px',
                    }}
                >
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 20px',
                                background: 'rgba(249,115,22,0.1)',
                                border: '1px solid rgba(249,115,22,0.25)',
                                borderRadius: '9999px',
                                marginBottom: '24px',
                            }}
                        >
                            <Gift className="w-5 h-5 text-accent" />
                            <span style={{ color: 'rgb(249,115,22)', fontSize: '14px', fontWeight: 600 }}>
                                {t('freeBonus')}
                            </span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
                            {t('title')}
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '600px', margin: '0 auto' }}>
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Book Info */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '32px',
                            marginBottom: '48px',
                            padding: '32px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '16px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ width: '180px', flexShrink: 0 }}>
                            <div className="relative" style={{ aspectRatio: book.coverRatio || '3/4', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                                <Image
                                    src={book.coverImage}
                                    alt={bookTitle}
                                    fill
                                    className="object-cover"
                                    sizes="180px"
                                />
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: '250px', textAlign: 'left' }}>
                            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                                {bookTitle}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', marginBottom: '12px' }}>
                                {book.subtitle} — {book.author}
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6 }}>
                                {t('thankYou')}
                            </p>
                        </div>
                    </div>

                    {/* Download Section */}
                    {status === 'success' ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', marginBottom: '20px' }}>
                                <CheckCircle style={{ width: '36px', height: '36px', color: 'rgb(74,222,128)' }} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                                {t('ready')}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '24px' }}>
                                {t('readySubtitle')}
                            </p>

                            <a
                                href={downloadUrl || `${siteUrl}${book.bonusPdf}`}
                                download
                                className="btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '18px', padding: '16px 48px' }}
                            >
                                <Download style={{ width: '20px', height: '20px' }} />
                                {t('downloadNow')}
                            </a>

                            {/* Pro Tips */}
                            <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', textAlign: 'left', maxWidth: '600px', margin: '40px auto 0' }}>
                                <h4 style={{ color: 'white', fontWeight: 600, fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Sparkles style={{ width: '16px', height: '16px', color: 'rgb(249,115,22)' }} />
                                    {t('proTips')}
                                </h4>
                                <ul style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '8px' }}>{t('tip1')}</li>
                                    <li style={{ marginBottom: '8px' }}>{t('tip2')}</li>
                                    <li>{t('tip3')}</li>
                                </ul>
                            </div>

                            {/* Leave Review — only show if ASIN exists */}
                            {book.asin && (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                                    <a
                                        href={`https://www.amazon.com/review/create-review?ie=UTF8&channel=glance-detail&asin=${book.asin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        {t('leaveReview')}
                                        <ExternalLink style={{ width: '16px', height: '16px' }} />
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                            <form onSubmit={handleSubmit}>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontWeight: 500, display: 'block', textAlign: 'center', marginBottom: '16px' }}>
                                    {t('emailLabel')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('emailPlaceholder')}
                                    className="input-email"
                                    style={{ width: '100%', fontSize: '16px', padding: '16px 20px', marginBottom: '16px' }}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '18px', padding: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    {status === 'loading' ? (
                                        <span className="animate-pulse">{t('sending')}</span>
                                    ) : (
                                        <>
                                            <Download style={{ width: '20px', height: '20px' }} />
                                            {t('getBonus')}
                                        </>
                                    )}
                                </button>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
                                    {t('emailNote')}
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
