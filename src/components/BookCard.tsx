'use client';

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Download, Star } from "lucide-react";
import { useState } from "react";
// Amazon tracking removed — use clean /dp/ASIN links

interface Book {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    amazonUrl: string;
    hasLandingPage?: boolean;
}

interface BookCardProps {
    book: Book;
    isBestseller?: boolean;
}

export function BookCard({ book, isBestseller = false }: BookCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    };

    const tiltX = (mousePosition.y - 0.5) * 10;
    const tiltY = (mousePosition.x - 0.5) * 10;

    const categoryColors: Record<string, string> = {
        monochrome: 'from-editorial-noir-700 to-editorial-noir-900',
        coloring: 'from-editorial-purple-500 to-editorial-pink-600',
        activity: 'from-editorial-orange-500 to-editorial-gold-600',
        kids: 'from-blue-500 to-editorial-purple-500',
        puzzles: 'from-green-500 to-emerald-600'
    };

    const categoryGradient = categoryColors[book.category.toLowerCase()] || 'from-editorial-purple-500 to-editorial-pink-600';

    return (
        <article
            className="group relative h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{ perspective: '1000px' }}
        >
            {/* 3D Tilt Wrapper */}
            <div
                className="relative h-full transition-transform duration-300"
                style={{
                    transform: isHovered
                        ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
                        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                }}
            >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] shadow-editorial group-hover:shadow-editorial-hover transition-all duration-300 will-animate">
                    {/* Border Gradient Animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-editorial-purple-500 via-editorial-pink-500 to-editorial-orange-500 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                    {/* Book Image */}
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        priority={isBestseller}
                    />

                    {/* Bestseller Badge */}
                    {isBestseller && (
                        <div className="absolute top-4 right-4 z-20 animate-pulse-glow">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-editorial-gold-400 to-editorial-orange-500 text-white shadow-lg transform -rotate-3">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm">Bestseller</span>
                            </div>
                        </div>
                    )}

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm rounded-2xl" />

                    {/* Action Buttons */}
                    <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl">
                        <div className="space-y-3 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                            <a
                                href={book.amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-gradient-to-r from-editorial-purple-600 to-editorial-pink-600 text-white font-semibold shadow-lg hover:shadow-glow-purple transition-all duration-300 will-animate"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Buy on Amazon</span>
                                <span className="ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity">→</span>
                            </a>

                            {book.hasLandingPage && (
                                <Link
                                    href={`/bonus/${book.id}`}
                                    className="group/link flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/25 transition-all duration-300 duration-editorial"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Get Free Digital</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Info Section */}
            <div className="relative pt-6 space-y-2">
                {/* Category Pill */}
                <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wide bg-gradient-to-r ${categoryGradient} shadow-editorial group-hover:shadow-editorial-hover transition-all duration-300`}>
                    {book.category}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-editorial-purple-600 group-hover:to-editorial-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {book.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {book.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 pt-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-editorial-gold-500 text-editorial-gold-500 opacity-70"
                        />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">(248 reviews)</span>
                </div>
            </div>

            {/* Ambient Glow on Hover */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-editorial-purple-500/20 to-editorial-orange-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20 will-animate" />
        </article>
    );
}
