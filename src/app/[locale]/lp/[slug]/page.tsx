import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import {
    getAllLandingSlugs,
    getLandingPage,
} from "@/data/landing-pages";
import { BuyOnAmazonButton } from "./BuyOnAmazonButton";
import "./landing.css";

export const dynamic = "force-static";
export const revalidate = false;

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
    const slugs = getAllLandingSlugs();
    return slugs.flatMap((slug) =>
        ["en", "es"].map((locale) => ({ locale, slug }))
    );
}

export async function generateMetadata(props: {
    params: Params;
}): Promise<Metadata> {
    const { slug } = await props.params;
    const lp = getLandingPage(slug);
    if (!lp) return {};
    return {
        title: `${lp.title} — ${lp.subtitle}`,
        description: lp.subhook,
        robots: { index: false, follow: false },
        openGraph: {
            title: lp.title,
            description: lp.subhook,
            images: [lp.coverImage],
            type: "website",
        },
    };
}

export default async function LandingPage(props: { params: Params }) {
    const { slug } = await props.params;
    const lp = getLandingPage(slug);
    if (!lp) notFound();

    return (
        <main className="lp-root min-h-screen">
            <Script id="fbq-viewcontent" strategy="afterInteractive">
                {`
                    if (typeof window !== 'undefined' && window.fbq) {
                        window.fbq('track', 'ViewContent', {
                            content_name: ${JSON.stringify(lp.title)},
                            content_ids: [${JSON.stringify(lp.asin)}],
                            content_type: 'product',
                            value: 9.99,
                            currency: 'USD'
                        });
                    }
                `}
            </Script>

            {/* ========== TOP MARK BAR ========== */}
            <div className="border-b border-[var(--rule)] px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] uppercase tracking-[0.22em]">
                    <span className="font-semibold text-[var(--ink)]">
                        Fun Books Publisher
                    </span>
                    <span className="hidden text-[var(--ink-mute)] sm:block">
                        Ink Bliss Series · Volume Three
                    </span>
                    <span className="text-[var(--ink-mute)]">Est. 2024</span>
                </div>
            </div>

            {/* ========== HERO ========== */}
            <section className="px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
                <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-12">
                    {/* Left column — Headline */}
                    <div className="lg:col-span-7 lg:pr-8">
                        <p className="lp-eyebrow lp-anim lp-anim-1">
                            Issue 03 · Cozy Escapes
                        </p>

                        <h1 className="lp-display lp-anim lp-anim-2 mt-6 text-[clamp(2.75rem,7vw,5.5rem)]">
                            One pen.
                            <br />
                            One color.
                            <br />
                            <span className="italic text-[var(--amber-deep)]">
                                Pure cozy magic.
                            </span>
                        </h1>

                        <div className="lp-anim lp-anim-3 mt-10 max-w-xl">
                            <hr className="lp-rule mb-7 w-16" />
                            <p className="text-[1.125rem] leading-[1.75] text-[var(--ink-soft)] sm:text-[1.2rem]">
                                Fifty hand-drawn cottage scenes that turn your
                                afternoon into a meditation ritual. No color
                                decisions. No overwhelm. Just one black pen and
                                the most satisfying coloring session of your
                                life.
                            </p>
                        </div>

                        <div className="lp-anim lp-anim-4 mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            <BuyOnAmazonButton
                                amazonUrl={lp.amazonAttributionUrl}
                                asin={lp.asin}
                                bookTitle={lp.title}
                            >
                                Get it on Amazon
                            </BuyOnAmazonButton>

                            <div className="flex flex-col gap-1">
                                <span
                                    className="lp-stars"
                                    aria-label={`${lp.social.rating} stars`}
                                >
                                    ★★★★★
                                </span>
                                <span className="text-xs uppercase tracking-widest text-[var(--ink-mute)]">
                                    {lp.social.rating} · {lp.social.reviews}+
                                    colorists
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right column — Cover */}
                    <div className="lg:col-span-5">
                        <div className="lp-anim lp-anim-3 relative">
                            <div
                                aria-hidden="true"
                                className="absolute -inset-x-8 -inset-y-12 -z-10 bg-[var(--paper-warm)]"
                                style={{
                                    clipPath:
                                        "polygon(15% 0, 100% 5%, 95% 100%, 0 95%)",
                                }}
                            />
                            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
                                <Image
                                    src={lp.coverImage}
                                    alt={`${lp.title} — ${lp.subtitle}`}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 80vw, 400px"
                                    className="object-contain drop-shadow-[0_30px_60px_rgba(26,18,10,0.35)]"
                                />
                            </div>
                            <div className="mt-8 text-center">
                                <p className="lp-eyebrow">The Volume</p>
                                <p className="lp-serif mt-2 text-xl italic text-[var(--ink)]">
                                    50 pages · 8.5 × 11"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== EDITORIAL PULL QUOTE ========== */}
            <section className="lp-section-warm border-y border-[var(--rule)] px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="lp-eyebrow">A Manifesto</p>
                    <p className="lp-pullquote mt-8">
                        You don't need a rainbow to create something beautiful.
                        You need silence, focus, and one black pen.
                    </p>
                    <div className="lp-ornament mt-10">
                        <span>✦</span>
                    </div>
                </div>
            </section>

            {/* ========== FOUR PILLARS ========== */}
            <section className="px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-20 text-center">
                        <p className="lp-eyebrow">What Sets It Apart</p>
                        <h2 className="lp-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)]">
                            Four reasons colorists
                            <br />
                            <span className="italic">are obsessed.</span>
                        </h2>
                    </div>

                    <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                        {lp.benefits.map((b, i) => (
                            <article key={b.title} className="relative">
                                <div className="lp-numeral">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <hr className="lp-rule my-5 w-12" />
                                <h3 className="lp-serif text-[1.4rem] font-bold leading-tight tracking-tight text-[var(--ink)]">
                                    {b.title}
                                </h3>
                                <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-soft)]">
                                    {b.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== WHAT'S INSIDE — DARK SECTION ========== */}
            <section className="lp-section-dark px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-5">
                            <p className="lp-eyebrow">Inside The Volume</p>
                            <h2 className="lp-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] text-[#f5efe1]">
                                Built for the
                                <br />
                                <span className="italic text-[#d4a559]">
                                    quiet hours.
                                </span>
                            </h2>
                            <p className="mt-8 text-[1.05rem] leading-[1.8] text-[#d6c9ad]">
                                Every detail considered. Every page printed on
                                premium paper. Every illustration drawn by hand
                                with the X-mark guide system that makes
                                gallery-worthy results inevitable.
                            </p>
                        </div>

                        <ul className="space-y-1 lg:col-span-7">
                            {lp.features.map((f, i) => (
                                <li
                                    key={f}
                                    className="flex items-baseline gap-6 border-b border-[#3d2c1e] py-5 last:border-b-0"
                                >
                                    <span className="lp-serif italic text-[#b8742a] text-sm">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="lp-serif text-[1.15rem] text-[#f5efe1]">
                                        {f}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ========== SOCIAL PROOF ========== */}
            <section className="px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-12 sm:grid-cols-3">
                        <div>
                            <p className="lp-numeral">{lp.social.rating}</p>
                            <hr className="lp-rule my-5 w-12" />
                            <p className="lp-stars text-lg">★★★★★</p>
                            <p className="mt-3 text-sm uppercase tracking-widest text-[var(--ink-mute)]">
                                Average Rating
                            </p>
                        </div>
                        <div>
                            <p className="lp-numeral">{lp.social.reviews}+</p>
                            <hr className="lp-rule my-5 w-12" />
                            <p className="lp-serif text-lg italic text-[var(--ink-soft)]">
                                Verified colorists
                            </p>
                            <p className="mt-3 text-sm uppercase tracking-widest text-[var(--ink-mute)]">
                                On Amazon
                            </p>
                        </div>
                        <div>
                            <p className="lp-numeral">50</p>
                            <hr className="lp-rule my-5 w-12" />
                            <p className="lp-serif text-lg italic text-[var(--ink-soft)]">
                                Hand-drawn pages
                            </p>
                            <p className="mt-3 text-sm uppercase tracking-widest text-[var(--ink-mute)]">
                                Original Illustrations
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FAQ ========== */}
            <section className="lp-section-warm border-y border-[var(--rule)] px-6 py-24 sm:py-28">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-14 text-center">
                        <p className="lp-eyebrow">Quick Answers</p>
                        <h2 className="lp-display mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                            Before you order.
                        </h2>
                    </div>
                    <div className="space-y-0">
                        {lp.faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group border-b border-[var(--rule)] py-6 last:border-b-0"
                            >
                                <summary className="lp-serif flex cursor-pointer list-none items-start justify-between gap-6 text-[1.2rem] font-bold text-[var(--ink)]">
                                    <span>{faq.question}</span>
                                    <span
                                        aria-hidden="true"
                                        className="mt-1 shrink-0 text-2xl font-light text-[var(--amber)] transition-transform duration-300 group-open:rotate-45"
                                    >
                                        +
                                    </span>
                                </summary>
                                <p className="mt-4 text-[15px] leading-[1.75] text-[var(--ink-soft)]">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FINAL CTA ========== */}
            <section className="lp-section-dark px-6 py-28 sm:py-36">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="lp-eyebrow">The Invitation</p>
                    <h2 className="lp-display mt-6 text-[clamp(2.25rem,5vw,4rem)] text-[#f5efe1]">
                        Add it to your cart.
                        <br />
                        <span className="italic text-[#d4a559]">
                            Find your calm.
                        </span>
                    </h2>
                    <p className="mx-auto mt-8 max-w-lg text-[1.05rem] leading-[1.8] text-[#d6c9ad]">
                        Shipped fast via Amazon Prime. 30-day returns.
                        High-resolution digital PDF included with every order.
                    </p>
                    <div className="mt-12">
                        <BuyOnAmazonButton
                            amazonUrl={lp.amazonAttributionUrl}
                            asin={lp.asin}
                            bookTitle={lp.title}
                            variant="light"
                        >
                            Get it on Amazon
                        </BuyOnAmazonButton>
                    </div>
                    <div className="lp-ornament mt-12 text-[#8c5417]">
                        <span>✦</span>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="border-t border-[var(--rule)] bg-[var(--paper)] px-6 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--ink-mute)] sm:flex-row">
                    <p>© {new Date().getFullYear()} Fun Books Publisher LLC</p>
                    <p>Crafted in Wyoming · Shipped Worldwide</p>
                </div>
            </footer>
        </main>
    );
}
