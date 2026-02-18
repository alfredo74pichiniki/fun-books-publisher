'use client';

import { useEffect, useRef } from 'react';

const collections = [
    {
        name: "Monochrome Coloring",
        count: 5,
        description: "Bold black & white art therapy with the Ink Bliss series",
        gradient: "from-gray-900 via-gray-800 to-gray-700",
        icon: "\uD83C\uDFA8",
        href: "https://www.amazon.com/author/funbookspublisher",
    },
    {
        name: "Classic Coloring",
        count: 3,
        description: "Mandalas, seasonal themes, and stress-relief designs",
        gradient: "from-purple-600 via-purple-500 to-pink-500",
        icon: "\u2728",
        href: "https://www.amazon.com/author/funbookspublisher",
    },
    {
        name: "Brain & Puzzles",
        count: 4,
        description: "Variety puzzles, sudoku, crosswords \u2014 keep your mind sharp",
        gradient: "from-emerald-600 via-emerald-500 to-teal-400",
        icon: "\uD83E\uDDE9",
        href: "https://www.amazon.com/author/funbookspublisher",
    },
    {
        name: "Word Search",
        count: 2,
        description: "Themed word search puzzles with positive and motivational topics",
        gradient: "from-blue-600 via-blue-500 to-cyan-400",
        icon: "\uD83D\uDD24",
        href: "https://www.amazon.com/author/funbookspublisher",
    },
    {
        name: "Kids Educational",
        count: 2,
        description: "Compass skills, cursive handwriting, and more for ages 8-12",
        gradient: "from-orange-500 via-amber-500 to-yellow-400",
        icon: "\uD83D\uDCDA",
        href: "https://www.amazon.com/author/funbookspublisher",
    },
];

export function CollectionsGrid() {
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
        <section ref={ref} id="collections" className="py-28 bg-[#0a0a0f] text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="reveal text-xs uppercase tracking-[0.3em] text-purple-400/80 font-medium mb-4">
                        Our Library
                    </p>
                    <h2 className="reveal text-4xl sm:text-5xl font-black mb-4">
                        Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Collection</span>
                    </h2>
                    <div className="reveal w-16 h-[2px] bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mb-4" />
                    <p className="reveal text-gray-500 text-lg">16 books across 5 categories</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {collections.map((col, i) => (
                        <a
                            key={col.name}
                            href={col.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`reveal reveal-stagger-${i + 1} group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${col.gradient} transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl`}
                        >
                            {/* Pattern overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:16px_16px]" />

                            <div className="relative z-10 h-full flex flex-col min-h-[180px]">
                                <span className="text-3xl mb-3">{col.icon}</span>
                                <h3 className="text-lg font-bold mb-2 group-hover:translate-x-1 transition-transform">{col.name}</h3>
                                <p className="text-white/70 text-sm mb-4 flex-1 leading-relaxed">{col.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">{col.count} books</span>
                                    <span className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all">&rarr;</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
