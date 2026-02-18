'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder reviews — Alfredo will replace with real Amazon reviews
const REVIEWS = [
    {
        text: "The paper quality is amazing — no bleed-through even with markers. Best coloring book I've bought this year.",
        author: "Sarah M.",
        rating: 5,
        book: "Monochrome Mandala",
    },
    {
        text: "Perfect gift for my mom! She loves the puzzles and does one every morning with her coffee. Large print is a game changer.",
        author: "James R.",
        rating: 5,
        book: "Variety Puzzle Book",
    },
    {
        text: "Beautiful designs that aren't too complex. I actually finish pages instead of giving up halfway. So satisfying!",
        author: "Lisa K.",
        rating: 5,
        book: "Ink Bliss Imagination",
    },
    {
        text: "My 9-year-old got this for her birthday and hasn't put it down. She's learning navigation while having an absolute blast!",
        author: "David T.",
        rating: 5,
        book: "How to Use a Compass",
    },
    {
        text: "The tattoo flash coloring book is unlike anything else on Amazon. Real tattoo-style art — my favorite creative escape.",
        author: "Marcus W.",
        rating: 5,
        book: "Tattoo Flash",
    },
    {
        text: "Gorgeous patterns that melt stress away. I color one page every evening before bed — it's become my ritual.",
        author: "Ana P.",
        rating: 5,
        book: "Stress Relief & Inspiration",
    },
];

export function TestimonialsSection() {
    const t = useTranslations('testimonials');
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonial-header', {
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
                    y: 40,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power3.out",
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 sm:py-28 bg-navy-950">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="testimonial-header text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Reviews Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="glass-card p-6 flex flex-col gap-4">
                            {/* Stars */}
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`w-4 h-4 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`}
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-white/70 text-sm leading-relaxed flex-1">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-blue-text-from/30 flex items-center justify-center text-white/60 text-xs font-bold">
                                        {review.author[0]}
                                    </div>
                                    <span className="text-white/50 text-sm font-medium">{review.author}</span>
                                </div>
                                <span className="text-white/25 text-xs">{review.book}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
