'use client';

import Link from "next/link";
import { Palette, Sparkles, BookOpen, Baby, Grid3x3 } from "lucide-react";
import { useState } from "react";

interface Category {
    id: string;
    name: string;
    count: number;
    gradient: string;
    description: string;
}

interface CategorySectionProps {
    category: Category;
}

const categoryIcons: Record<string, React.ReactNode> = {
    monochrome: <Palette className="w-8 h-8" />,
    coloring: <Sparkles className="w-8 h-8" />,
    activity: <BookOpen className="w-8 h-8" />,
    kids: <Baby className="w-8 h-8" />,
    puzzles: <Grid3x3 className="w-8 h-8" />
};

export function CategorySection({ category }: CategorySectionProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`/category/${category.id}`}
            className="group relative overflow-hidden rounded-2xl p-6 h-full text-white transition-all duration-300 hover:scale-102 cursor-pointer will-animate"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glass Background */}
            <div className="absolute inset-0 glass-card" />

            {/* Gradient Background with Animation */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-all duration-300 opacity-80 group-hover:opacity-100`}
                style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
            />

            {/* Dot Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px] opacity-50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="opacity-90 group-hover:opacity-100">
                        {categoryIcons[category.id.toLowerCase()] || <Palette className="w-8 h-8" />}
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
                    {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm opacity-90 mb-4 flex-grow">
                    {category.description}
                </p>

                {/* Count Badge with Animation */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        {category.count} {category.count === 1 ? "book" : "books"}
                    </span>
                    <div
                        className="transform transition-all duration-300 group-hover:translate-x-2"
                        style={{
                            opacity: isHovered ? 1 : 0.6
                        }}
                    >
                        →
                    </div>
                </div>
            </div>

            {/* Border Glow on Hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white/40 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute -inset-3 bg-gradient-to-br from-current/30 to-transparent blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
        </Link>
    );
}
