"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Fun Books Publisher"
                            width={50}
                            height={50}
                            className="w-12 h-12"
                        />
                        <span className="font-bold text-xl gradient-text hidden sm:inline">
                            Fun Books Publisher
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#collections" className="text-gray-600 hover:text-purple-600 transition-colors">
                            Collections
                        </Link>
                        <Link href="/#books" className="text-gray-600 hover:text-purple-600 transition-colors">
                            Books
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.amazon.com/author/funbookspublisher"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary hidden sm:inline-block"
                        >
                            Shop on Amazon
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/#collections"
                                className="text-gray-600 hover:text-purple-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Collections
                            </Link>
                            <Link
                                href="/#books"
                                className="text-gray-600 hover:text-purple-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Books
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-600 hover:text-purple-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-600 hover:text-purple-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <a
                                href="https://www.amazon.com/author/funbookspublisher"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-center"
                            >
                                Shop on Amazon
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
