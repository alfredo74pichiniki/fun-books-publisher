import { BOOKS } from '@/data/books';

export function OrganizationJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Fun Books Publisher',
        url: 'https://funbookspublisher.com',
        logo: 'https://funbookspublisher.com/images/logo.png',
        sameAs: [
            'https://www.facebook.com/funbookspublisher1/',
            'https://instagram.com/funbooks_publisher',
            'https://www.pinterest.com/funbooks_publisher/',
            'https://www.amazon.com/stores/Fun-Books-Publisher/author/B0D6C6WQBV',
        ],
        description:
            'Publisher of premium coloring books, puzzle books, and educational guides. Available worldwide on Amazon.',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function BookJsonLd({ bookId }: { bookId: string }) {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return null;

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.title,
        description: book.description,
        author: {
            '@type': 'Organization',
            name: book.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Fun Books Publisher',
        },
        bookFormat: 'https://schema.org/Paperback',
        url: `https://funbookspublisher.com/en/books/${book.id}`,
        image: book.coverImage,
        offers: {
            '@type': 'Offer',
            price: book.price.toString(),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: book.amazonUrl,
        },
        aggregateRating: book.rating
            ? {
                  '@type': 'AggregateRating',
                  ratingValue: book.rating.toString(),
                  reviewCount: (book.reviewCount || 0).toString(),
              }
            : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function BlogPostJsonLd({
    title,
    excerpt,
    date,
    slug,
}: {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
}) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: excerpt,
        datePublished: date,
        author: {
            '@type': 'Organization',
            name: 'Fun Books Publisher',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Fun Books Publisher',
        },
        url: `https://funbookspublisher.com/en/blog/${slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
