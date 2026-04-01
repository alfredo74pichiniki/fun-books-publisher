'use client';

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");
    const tNewsletter = useTranslations("newsletter");
    const locale = useLocale();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                setEmail('');
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-navy-950">
            {/* Top divider — subtle gradient line */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

                    {/* Col 1: Brand + Social */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/logo.png" alt="FBP" width={40} height={40} className="rounded-full" />
                            <span className="font-bold text-xl text-white">{t("brand")}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            {t("tagline")}
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon
                                href="https://www.facebook.com/funbookspublisher1/"
                                label="Facebook"
                                hoverColor="hover:bg-blue-600 hover:border-blue-600"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </SocialIcon>
                            <SocialIcon
                                href="https://instagram.com/funbooks_publisher"
                                label="Instagram"
                                hoverColor="hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-transparent"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </SocialIcon>
                            <SocialIcon
                                href="https://www.pinterest.com/funbooks_publisher/"
                                label="Pinterest"
                                hoverColor="hover:bg-red-600 hover:border-red-600"
                            >
                                <path d="M12 0a12 12 0 00-4.373 23.178c-.07-.937-.134-2.376.028-3.399.146-.926.944-5.896.944-5.896s-.24-.482-.24-1.192c0-1.115.647-1.949 1.452-1.949.685 0 1.016.515 1.016 1.131 0 .69-.439 1.72-.665 2.673-.189.8.401 1.452 1.189 1.452 1.428 0 2.527-1.505 2.527-3.677 0-1.922-1.381-3.266-3.355-3.266-2.286 0-3.626 1.714-3.626 3.486 0 .69.266 1.429.598 1.831.065.079.075.148.055.229-.061.253-.196.8-.223.912-.035.148-.116.18-.268.108-1.001-.466-1.627-1.928-1.627-3.102 0-2.524 1.834-4.843 5.288-4.843 2.776 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.499 1.902c-.181.695-.669 1.566-.995 2.097A12 12 0 1012 0z"/>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            {t("quickLinks")}
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="/" label={tNav("home")} />
                            <FooterLink href="/books" label={tNav("books")} />
                            <FooterLink href="/about" label={tNav("about")} />
                            <FooterLink href="/blog" label={tNav("blog")} />
                            <FooterLink href="/contact" label={tNav("contact")} />
                            <FooterLink href="/faq" label={tNav("faq")} />
                            <li>
                                <a
                                    href="https://www.amazon.com/author/funbookspublisher"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/50 hover:text-accent text-sm transition-colors"
                                >
                                    {t("amazonAuthor")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Collections (categories) */}
                    <div>
                        <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            {t("collections")}
                        </h4>
                        <ul className="space-y-3">
                            {CATEGORIES.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/books?category=${cat.id}`}
                                        className="text-white/50 hover:text-white text-sm transition-colors"
                                    >
                                        {locale === "es" ? cat.nameEs : cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div>
                        <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                            {t("stayConnected")}
                        </h4>
                        <p className="text-white/50 text-sm mb-4">
                            {tNewsletter("subtitle")}
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="email"
                                placeholder={tNewsletter("placeholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-email !py-2.5 !text-sm"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full justify-center !py-2.5 !text-sm disabled:opacity-50"
                            >
                                {loading ? '...' : tNewsletter("button")}
                            </button>
                        </form>
                        {status === 'success' && (
                            <p className="text-green-400 text-xs mt-2">{tNewsletter("success")}</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-400 text-xs mt-2">{tNewsletter("error")}</p>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>{t("copyright")}</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t("terms")}</Link>
                        <Link href="/refunds" className="hover:text-white transition-colors">{t("refunds")}</Link>
                    </div>
                </div>
            </div>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-white shadow-lg shadow-accent/25 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl hover:shadow-accent/30 z-50"
                aria-label="Back to top"
            >
                <ChevronUp className="w-5 h-5" />
            </button>
        </footer>
    );
}

/* Social Icon Button */
function SocialIcon({ href, label, hoverColor, children }: {
    href: string;
    label: string;
    hoverColor: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all ${hoverColor}`}
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {children}
            </svg>
        </a>
    );
}

/* Footer link helper */
function FooterLink({ href, label }: { href: "/" | "/books" | "/about" | "/blog" | "/contact" | "/faq"; label: string }) {
    return (
        <li>
            <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                {label}
            </Link>
        </li>
    );
}
