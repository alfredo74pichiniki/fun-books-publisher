import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BOOK_ALIASES } from '@/data/books';
import { getBookBySlugOrAlias, getBooksWithBonus } from '@/data/helpers';
import { BonusLanding } from './BonusLanding';

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

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
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

    // Resolve slug directly — works with canonical IDs AND old aliases
    // NO redirects. The exact URL printed in the book stays as-is.
    const book = getBookBySlugOrAlias(slug);

    if (!book || !book.bonusPdf) {
        notFound();
    }

    return <BonusLanding bookId={book.id} />;
}
