'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";

const books = [
    {
        title: "Monochrome Mandala",
        subtitle: "Ink Bliss Series",
        description: "Intricate mandala designs in pure monochrome. Deep relaxation through meditative patterns.",
        asin: "B0FQ1JBGY6",
        image: "/covers/PORTADA CA+ MONOCHROME MANDALA COLORING BOOK.png",
        badge: "Bestseller",
        bonusId: "monochrome-mandala",
    },
    {
        title: "Ink Bliss Ultimate",
        subtitle: "Creative Minds Edition",
        description: "The ultimate monochrome collection. Fluid ink-style designs for total creative immersion.",
        asin: "B0FM4B5Z7H",
        image: "/covers/CA+ PORTADA INK BLIS MONOCHROME COLORING BOOK.png",
        badge: null,
        bonusId: "monochrome-ink-bliss",
    },
    {
        title: "Tattoo Flash",
        subtitle: "Black & White Edition",
        description: "Bold tattoo-inspired blackwork. Neo-traditional flash art meets coloring therapy.",
        asin: "B0G3889XTJ",
        image: "/covers/CA+ PORTADA TATTO MONOCHR. CB 5.png",
        badge: "Bestseller",
        bonusId: "monochrome-tattoo",
    },
    {
        title: "Animal Collection",
        subtitle: "Negative-Space Designs",
        description: "Stunning animal portraits in negative-space style. One pen is all you need.",
        asin: "B0FR91RBSZ",
        image: "/covers/PORTADA CA+ MONOCHROME COLORING BOOK 3-2.png",
        badge: null,
        bonusId: "monochrome-vol-3",
    },
    {
        title: "Power of Black & White",
        subtitle: "Art Therapy Edition",
        description: "High-contrast grayscale art therapy. Advanced shading for experienced colorists.",
        asin: "B0FSZ9V9MS",
        image: "/covers/CA+ MONOCHROME CB 4 PORTADA.png",
        badge: null,
        bonusId: "monochrome-vol-4",
    },
];

export function FeaturedBooks() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = ref.current;
        if (!section) return;

        const items = section.querySelectorAll('.reveal, .reveal-scale');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} id="featured" className="py-28 bg-white scroll-mt-20">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
                    <p className="reveal text-xs uppercase tracking-[0.3em] text-purple-500 font-medium mb-4">
                        Curated Collection
                    </p>
                    <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
                        The Monochrome
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                            Collection
                        </span>
                    </h2>
                    <div className="reveal w-16 h-[2px] bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mb-5" />
                    <p className="reveal text-gray-500 text-lg max-w-xl mx-auto">
                        Five premium coloring books. One color palette. Infinite creativity.
                    </p>
                </div>

                {/* Books grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
                    {books.map((book, i) => (
                        <div
                            key={book.asin}
                            className={`reveal reveal-stagger-${i + 1} group cursor-pointer`}
                        >
                            {/* Card with hover lift */}
                            <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4] mb-4 shadow-sm transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] group-hover:-translate-y-2">
                                {/* Image */}
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />

                                {/* Badge */}
                                {book.badge && (
                                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg z-10">
                                        {book.badge}
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full space-y-3">
                                        <p className="text-white/90 text-sm leading-snug line-clamp-3 font-light">{book.description}</p>

                                        <div className="flex flex-col gap-2">
                                            <a
                                                href={`https://www.amazon.com/dp/${book.asin}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full text-center px-3 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-lg text-xs font-black uppercase tracking-wider hover:from-amber-300 hover:to-orange-400 transition-all shadow-lg"
                                            >
                                                Buy on Amazon
                                            </a>
                                            <a
                                                href={`/bonus/${book.bonusId}`}
                                                className="w-full text-center px-3 py-2 bg-white/15 backdrop-blur-sm text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/25 transition-colors border border-white/10"
                                            >
                                                Free PDF Bonus
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info below card */}
                            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-sm lg:text-base">
                                {book.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">{book.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* View all CTA */}
                <div className="reveal text-center mt-16">
                    <a
                        href="https://www.amazon.com/author/funbookspublisher"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-purple-700 hover:scale-105 hover:shadow-xl transition-all"
                    >
                        View all 16 books on Amazon
                        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
