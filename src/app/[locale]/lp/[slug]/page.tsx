import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import {
    getAllLandingSlugs,
    getLandingPage,
} from "@/data/landing-pages";
import { BuyOnAmazonButton } from "./BuyOnAmazonButton";

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
        title: `${lp.title} — ${lp.subtitle} | Fun Books Publisher`,
        description: lp.subhook,
        robots: { index: false, follow: false }, // bridge pages are not for SEO
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
        <main className="min-h-screen bg-[#faf6ef] text-neutral-900 antialiased">
            {/* Fire ViewContent pixel event on page load (client-only) */}
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

            {/* HERO */}
            <section className="relative overflow-hidden px-6 pt-12 pb-20 sm:pt-20 sm:pb-28">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_top,_#e8dcc4_0%,_transparent_60%)]"
                />
                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-900">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                            Monochrome Coloring — Ink Bliss Series
                        </div>
                        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                            {lp.hook}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
                            {lp.subhook}
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-500" aria-label={`${lp.social.rating} stars`}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-neutral-600">
                                {lp.social.rating} · {lp.social.reviews}+ colorists love it
                            </span>
                        </div>

                        <div className="mt-10">
                            <BuyOnAmazonButton
                                amazonUrl={lp.amazonAttributionUrl}
                                asin={lp.asin}
                                bookTitle={lp.title}
                            >
                                Get Yours on Amazon
                            </BuyOnAmazonButton>
                            <p className="mt-4 text-sm text-neutral-500">
                                Ships fast via Amazon Prime · 30-day returns
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-8 bottom-2 h-8 rounded-full bg-black/20 blur-2xl"
                            />
                            <Image
                                src={lp.coverImage}
                                alt={`${lp.title} — ${lp.subtitle}`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 80vw, 450px"
                                className="relative object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="border-y border-neutral-200 bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
                        Why colorists are obsessed with monochrome
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-center text-neutral-600">
                        No rainbow. No 50-pen set. Just one black pen and the most satisfying coloring session of your life.
                    </p>
                    <div className="mt-14 grid gap-8 sm:grid-cols-2">
                        {lp.benefits.map((b) => (
                            <div
                                key={b.title}
                                className="rounded-2xl border border-neutral-200 bg-[#faf6ef] p-7 transition-all hover:border-neutral-300 hover:shadow-md"
                            >
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold leading-snug">{b.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                                    {b.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES STRIP */}
            <section className="bg-neutral-900 px-6 py-14 text-white">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                        What&apos;s inside
                    </h2>
                    <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                        {lp.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-[15px] text-neutral-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                        Quick answers
                    </h2>
                    <div className="mt-10 space-y-4">
                        {lp.faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group rounded-xl border border-neutral-200 bg-[#faf6ef] px-6 py-5 transition-colors open:border-neutral-300"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                                    {faq.question}
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-transform duration-200 group-open:rotate-180"
                                        aria-hidden="true"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </summary>
                                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-3xl rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white shadow-2xl sm:px-14">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to experience the calm?
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-neutral-300">
                        Add it to your cart today and discover why one color can transform both your art and your state of mind.
                    </p>
                    <div className="mt-10">
                        <BuyOnAmazonButton
                            amazonUrl={lp.amazonAttributionUrl}
                            asin={lp.asin}
                            bookTitle={lp.title}
                        >
                            Get it on Amazon
                        </BuyOnAmazonButton>
                    </div>
                    <p className="mt-6 text-xs uppercase tracking-widest text-neutral-500">
                        Ships fast · Prime eligible
                    </p>
                </div>
            </section>

            {/* MINIMAL FOOTER */}
            <footer className="border-t border-neutral-200 bg-[#faf6ef] px-6 py-8 text-center text-xs text-neutral-500">
                <p>
                    © {new Date().getFullYear()} Fun Books Publisher — funbookpublisher.com
                </p>
            </footer>
        </main>
    );
}
