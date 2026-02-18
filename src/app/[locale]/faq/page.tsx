'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function FAQPage() {
    const t = useTranslations('faq');
    const pageRef = useRef<HTMLDivElement>(null);

    // Build question list from i18n keys (q1-q7)
    const questions = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
        q: t(`questions.q${id}`),
        a: t(`questions.a${id}`),
        id,
    }));

    useEffect(() => {
        if (pageRef.current) {
            gsap.from('.faq-header', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });
            gsap.from('.faq-item', {
                opacity: 0,
                y: 20,
                stagger: 0.06,
                duration: 0.5,
                ease: 'power3.out',
                delay: 0.3,
            });
        }
    }, []);

    return (
        <div ref={pageRef} className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="faq-header text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {questions.map((item) => (
                        <AccordionItem key={item.id} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (open) {
                gsap.to(contentRef.current, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.35,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                });
            }
        }
    }, [open]);

    return (
        <div className="faq-item glass-card overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
                <span className="text-white font-medium text-base pr-4">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div className="px-6 pb-5">
                    <p className="text-white/55 text-sm leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
}
