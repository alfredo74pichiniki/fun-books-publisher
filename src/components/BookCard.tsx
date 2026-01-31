import Image from "next/image";
import Link from "next/link";

interface Book {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    amazonUrl: string;
    hasLandingPage?: boolean;
}

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    const categoryStyles: Record<string, string> = {
        "Monochrome": "category-pill monochrome",
        "Coloring": "category-pill coloring",
        "Activity": "category-pill activity",
        "Kids": "category-pill kids",
        "Puzzles": "category-pill puzzles",
    };

    return (
        <article className="book-card group">
            {/* Book Cover */}
            <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                        <a
                            href={book.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-center text-sm py-2"
                        >
                            Buy on Amazon
                        </a>
                        {book.hasLandingPage && (
                            <Link
                                href={`/bonus/${book.id}`}
                                className="text-center text-white text-sm underline hover:no-underline"
                            >
                                🎁 Get Free Digital Version
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Book Info */}
            <div className="p-5">
                <span className={categoryStyles[book.category] || "category-pill"}>
                    {book.category}
                </span>
                <h3 className="font-bold text-lg mt-3 mb-1 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-1">
                    {book.subtitle}
                </p>
            </div>
        </article>
    );
}
