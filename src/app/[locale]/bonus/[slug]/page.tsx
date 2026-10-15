import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BOOK_ALIASES } from '@/data/books';
import { getBookBySlugOrAlias, getBooksWithBonus } from '@/data/helpers';
import { BonusLanding } from './BonusLanding';
import { COMPASS_GIFTS, COMPASS_SLUGS } from './compass-gifts';
import { CompassLanding } from './CompassLanding';
import { CrossOutLanding } from './CrossOutLanding';

// CRITICAL: printed as a QR in the last page of the three Cross Out the Killer books
const CROSS_OUT_SLUG = 'cross-out-the-killer';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = 'force-static';
export const dynamicParams = true;

// Pre-render ALL bonus URLs: canonical IDs + old aliases printed in books
export function generateStaticParams() {
    const params: { slug: string }[] = [];

    for (const book of getBooksWithBonus()) {
        params.push({ slug: book.id });
    }

    // CRITICAL: These aliases are printed in physical books — MUST work forever
    for (const alias of Object.keys(BOOK_ALIASES)) {
        params.push({ slug: alias });
    }

    // CRITICAL: printed in the back of "How to Use a Compass for Kids", already on sale
    for (const slug of COMPASS_SLUGS) {
        params.push({ slug });
    }

    params.push({ slug: CROSS_OUT_SLUG });

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const gift = COMPASS_GIFTS[slug];
    if (gift) {
        return {
            title: `${gift.name} | Fun Books Publisher`,
            description: gift.lede,
            openGraph: {
                title: gift.name,
                description: gift.lede,
                images: [gift.cover],
                type: 'website',
            },
            robots: { index: false, follow: false },
        };
    }

    if (slug === CROSS_OUT_SLUG) {
        const lede = 'A free printable bonus mystery for readers of Cross Out the Killer: one killer among 800 passengers.';
        return {
            title: 'Bonus Case: Death on the Magnolia Queen | Fun Books Publisher',
            description: lede,
            openGraph: {
                title: 'Bonus Case: Death on the Magnolia Queen',
                description: lede,
                images: ['/covers/cross-out/bonus-case.jpg'],
                type: 'website',
            },
            robots: { index: false, follow: false },
        };
    }

    const book = getBookBySlugOrAlias(slug);

    if (!book || !book.bonusPdf) {
        return { title: 'Bonus Not Found | Fun Books Publisher' };
    }

    return {
        title: `Free Bonus Pages — ${book.title} | Fun Books Publisher`,
        description: `Download your free bonus interior pages for ${book.title}. Thank you for your purchase!`,
        openGraph: {
            title: `Free Bonus Pages — ${book.title}`,
            description: `Download your free bonus interior pages for ${book.title}.`,
            images: [book.coverImage],
            type: 'website',
        },
        robots: { index: false, follow: false },
    };
}

export default async function BonusPage({ params }: Props) {
    const { slug } = await params;

    // The three compass gifts have their own landing and do not depend on books.ts
    const gift = COMPASS_GIFTS[slug];
    if (gift) {
        return <CompassLanding gift={gift} />;
    }

    if (slug === CROSS_OUT_SLUG) {
        return <CrossOutLanding />;
    }

    // Resolve slug directly — works with canonical IDs AND old aliases
    // NO redirects. The exact URL printed in the book stays as-is.
    const book = getBookBySlugOrAlias(slug);

    if (!book || !book.bonusPdf) {
        notFound();
    }

    return <BonusLanding bookId={book.id} />;
}
