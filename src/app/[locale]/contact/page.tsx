'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';

export default function ContactPage() {
    const t = useTranslations('contact');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pageRef.current) {
            gsap.from(pageRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power3.out',
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, message, type: 'contact' }),
            });
            if (res.ok) {
                setName('');
                setEmail('');
                setMessage('');
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div ref={pageRef} className="max-w-2xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg max-w-lg mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-white/60 text-sm font-medium mb-2">
                            {t('name')}
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white/60 text-sm font-medium mb-2">
                            {t('email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-white/60 text-sm font-medium mb-2">
                            {t('message')}
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            className="input-email resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center text-base disabled:opacity-50"
                    >
                        {loading ? '...' : t('send')}
                        <Send className="w-4 h-4" />
                    </button>

                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            {t('success')}
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {t('error')}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
