'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
    return (
        <div className="glass-card p-6 flex flex-col gap-4 min-w-[320px] sm:min-w-[380px] shrink-0">
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
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-blue-text-from/30 flex items-center justify-center text-white/70 text-xs font-bold">
                        {review.author[0]}
                    </div>
                    <div>
                        <span className="text-white/60 text-sm font-medium block">{review.author}</span>
                        <span className="text-white/25 text-xs block">{review.book}</span>
                    </div>
                </div>
                {/* Verified badge */}
                <span className="text-[10px] text-green-400/70 font-medium uppercase tracking-wider flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                    Verified
                </span>
            </div>
        </div>
    );
}

export function TestimonialsSection() {
    const t = useTranslations('testimonials');
    const sectionRef = useRef<HTMLElement>(null);

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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Duplicate reviews for infinite scroll effect
    const allReviews = [...REVIEWS, ...REVIEWS];

    return (
        <section ref={sectionRef} className="py-20 sm:py-32 bg-navy-950 relative overflow-hidden">
            {/* Large decorative quote mark */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-[300px] sm:text-[400px] font-serif text-white/[0.02] leading-none pointer-events-none select-none">
                &ldquo;
            </div>

            {/* Warm radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.04),transparent_60%)]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="testimonial-header text-center mb-16">
                    <p className="section-label mb-4">Reviews</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <div className="section-divider mb-6" />
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Marquee — infinite horizontal scroll */}
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div className="flex gap-5 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
                    {allReviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
}
