import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BOOKS } from '@/data/books';
import { getBookBySlug } from '@/data/helpers';
import { BookDetailContent } from './BookDetailContent';
import { BookJsonLd } from '@/components/JsonLd';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
    return BOOKS.filter((b) => b.isActive).map((book) => ({
        slug: book.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const book = getBookBySlug(slug);

    if (!book) {
        return { title: 'Book Not Found' };
    }

    return {
        title: `${book.title} | Fun Books Publisher`,
        description: book.description,
        openGraph: {
            title: book.title,
            description: book.description,
            images: [book.coverImage],
            type: 'book',
        },
    };
}

export default async function BookDetailPage({ params }: Props) {
    const { slug } = await params;
    const book = getBookBySlug(slug);

    if (!book || !book.isActive) {
        notFound();
    }

    return (
        <>
            <BookJsonLd bookId={book.id} />
            <BookDetailContent bookId={book.id} />
        </>
    );
}
