'use client';

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Menu, Globe } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Header() {
    const t = useTranslations("nav");
    const tCat = useTranslations("categories");
    const locale = useLocale();
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [booksOpen, setBooksOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setBooksOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setBooksOpen(false);
    }, [pathname]);

    const navItems = [
        { href: "/" as const, label: t("home") },
        { href: "/about" as const, label: t("about") },
        { href: "/blog" as const, label: t("blog") },
        { href: "/contact" as const, label: t("contact") },
        { href: "/faq" as const, label: t("faq") },
    ];

    const otherLocale = locale === "en" ? "es" : "en";
    const localeLabel = locale === "en" ? "ES" : "EN";

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-navy-950/90 backdrop-blur-xl shadow-lg shadow-black/20 py-3'
                : 'bg-transparent py-5'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                            <Image
                                src="/logo.png"
                                alt="Fun Books Publisher"
                                width={48}
                                height={48}
                                className="w-full h-full object-contain rounded-xl"
                            />
                        </div>
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="font-bold text-white tracking-tight text-base group-hover:text-accent transition-colors">
                                Fun Books
                            </span>
                            <span className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium">
                                Publisher
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <NavLink href="/" label={t("home")} />

                        {/* Books Dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <button
                                onClick={() => setBooksOpen(!booksOpen)}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                {t("books")}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${booksOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {booksOpen && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-navy-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
                                    <div className="p-2">
                                        <Link
                                            href="/books"
                                            className="block px-4 py-3 text-sm font-semibold text-accent hover:bg-white/5 rounded-lg transition-colors"
                                            onClick={() => setBooksOpen(false)}
                                        >
                                            {t("books")} — {tCat("viewCategory")}
                                        </Link>
                                        <div className="h-px bg-white/10 my-1" />
                                        {CATEGORIES.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/books?category=${cat.id}`}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                onClick={() => setBooksOpen(false)}
                                            >
                                                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.gradient}`} />
                                                {locale === "es" ? cat.nameEs : cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavLink href="/about" label={t("about")} />
                        <NavLink href="/blog" label={t("blog")} />
                        <NavLink href="/contact" label={t("contact")} />
                        <NavLink href="/faq" label={t("faq")} />
                    </nav>

                    {/* Right Side: Locale Switcher + Amazon CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Locale Switcher */}
                        <Link
                            href={pathname}
                            locale={otherLocale}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-lg transition-all"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            {localeLabel}
                        </Link>

                        {/* Amazon CTA — hidden on mobile */}
                        <a
                            href="https://www.amazon.com/author/funbookspublisher"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white py-2 px-5 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
                        >
                            {t("shopAmazon")}
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-navy-950 border-l border-white/10 shadow-2xl overflow-y-auto">
                        <div className="p-6 pt-24">
                            {/* Main Links */}
                            <nav className="space-y-1">
                                {navItems.map(item => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {/* Books Sub-menu (mobile) */}
                                <div className="px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                                        {t("books")} — {tCat("viewCategory")}
                                    </p>
                                    <div className="space-y-1 pl-2 border-l border-white/10">
                                        <Link
                                            href="/books"
                                            className="block px-3 py-2 text-sm text-accent font-medium hover:bg-white/5 rounded-lg transition-colors"
                                        >
                                            {tCat("viewCategory")}
                                        </Link>
                                        {CATEGORIES.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/books?category=${cat.id}`}
                                                className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {locale === "es" ? cat.nameEs : cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </nav>

                            {/* Mobile Amazon CTA */}
                            <div className="mt-6 px-4">
                                <a
                                    href="https://www.amazon.com/author/funbookspublisher"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full justify-center !text-base"
                                >
                                    {t("shopAmazon")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* Reusable nav link with hover underline */
function NavLink({ href, label }: { href: "/" | "/about" | "/blog" | "/contact" | "/faq" | "/books"; label: string }) {
    return (
        <Link
            href={href}
            className="group relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
            {label}
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </Link>
    );
}
