import { BOOKS, BOOK_ALIASES, type Book, type BookCategory } from "./books";

export function getActiveBooks(): Book[] {
  return BOOKS.filter((b) => b.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getBooksByCategory(category: BookCategory): Book[] {
  return getActiveBooks().filter((b) => b.category === category);
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find((b) => b.id === slug);
}

// Resolves a slug OR old alias to a book. Used by bonus landing pages.
export function getBookBySlugOrAlias(slug: string): Book | undefined {
  const direct = BOOKS.find((b) => b.id === slug);
  if (direct) return direct;
  const canonicalId = BOOK_ALIASES[slug];
  if (canonicalId) return BOOKS.find((b) => b.id === canonicalId);
  // Also try matching by ASIN
  return BOOKS.find((b) => b.asin === slug);
}

export function getBooksWithBonus(): Book[] {
  return BOOKS.filter((b) => b.isActive && b.bonusPdf);
}

export function getFeaturedBooks(count = 6): Book[] {
  const active = getActiveBooks();
  // Prioritize bestsellers, then mix from different categories
  const bestsellers = active.filter((b) => b.isBestseller);
  const others = active.filter((b) => !b.isBestseller);

  // Get unique categories from non-bestsellers
  const seen = new Set(bestsellers.map((b) => b.category));
  const diverse: Book[] = [];
  for (const book of others) {
    if (!seen.has(book.category)) {
      diverse.push(book);
      seen.add(book.category);
    }
  }

  return [...bestsellers, ...diverse].slice(0, count);
}

export function getFBPBooks(): Book[] {
  return getActiveBooks().filter((b) => b.author === "Fun Books Publisher");
}

export function getIsabelleBooks(): Book[] {
  return getActiveBooks().filter((b) => b.author === "Isabelle Whitmore");
}

export function getAllCategories(): BookCategory[] {
  return [
    "ink-bliss",
    "coloring",
    "puzzles-activity",
    "spanish",
    "kids-educational",
  ];
}

export function getCategoryBookCount(category: BookCategory): number {
  return getBooksByCategory(category).length;
}

export function getRelatedBooks(bookId: string, count = 4): Book[] {
  const book = getBookBySlug(bookId);
  if (!book) return [];

  // Same category first, excluding the current book
  const sameCategory = getActiveBooks().filter(
    (b) => b.category === book.category && b.id !== bookId
  );

  // If not enough, fill with other books
  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  const others = getActiveBooks().filter(
    (b) => b.category !== book.category && b.id !== bookId
  );
  return [...sameCategory, ...others].slice(0, count);
}
