// Bonus for "Logic Grid Puzzles for Adults: Easy Brain Games, Zero Guessing" (Fun Books Publisher, 100 puzzles).
// The URL /bonus/logic-grid-sixth-chapter is printed (address and QR) on the gift page of the interior, so THE SLUG IS
// PERMANENT. Do not rename it.
// For buyers only: nothing on the site links here, the page and the PDF are noindex (next.config.ts headers + robots
// metadata), they are not in the sitemap, and the PDF name carries a random suffix.
// Direct download, no email capture (KDP bonus content rules, G202018960).
// The missing clues are opened INSIDE the PDF (key tables indexed by the answer codes of the book), not on this page.
// v3: simple key, no decoy clues. The real protection is noindex + random PDF name + QR printed only in the book.

export type LogicGridBonus = {
    slug: string;
    book: string;
    name: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    lede: string;
    keys: { round: number; chapter: string; puzzle: number }[];
    inside: string[];
    review: { text: string; asin?: string }; // neutral review request, shown after the download; link only with an ASIN
};

export const LOGIC_GRID_BONUSES: Record<string, LogicGridBonus> = {
    'logic-grid-sixth-chapter': {
        slug: 'logic-grid-sixth-chapter',
        book: 'Logic Grid Puzzles for Adults',
        name: 'The Sixth Chapter',
        subtitle: 'Five bonus rounds and a final grid',
        pdf: '/downloads/logic-grid-the-sixth-chapter-7babc419be1c0553.pdf',
        cover: '/covers/logic-grid/the-sixth-chapter.jpg',
        pages: 25,
        size: '0.6 MB',
        lede: 'Your book has five chapters. This is the sixth, and your own answers are its keys: each round opens with the answer code your book marks "Correct!" at the end of a chapter.',
        keys: [
            { round: 1, chapter: 'Warm-Up', puzzle: 20 },
            { round: 2, chapter: 'Easy', puzzle: 40 },
            { round: 3, chapter: 'Easy-Medium', puzzle: 65 },
            { round: 4, chapter: 'Medium', puzzle: 85 },
            { round: 5, chapter: 'Medium Plus', puzzle: 100 },
        ],
        inside: [
            'Five new rounds, one for each chapter of the book, with the same large-print clues, grids, and techniques',
            'One missing clue in every round: you find it in the Key Table with the "Correct!" code of the last puzzle of that chapter in your book',
            'A Final Grid with four categories, the size your book does not have: your five round answers are its travelers',
            'Hint A, Hint B, Checkpoint C, an Answer Check, and step-by-step solutions, exactly as in the book',
        ],
        review: {
            text: 'Finished the sixth chapter? If you have a minute, an honest review of the book on Amazon, whatever you thought of it, helps other puzzle fans decide.',
            asin: 'B0HT261DTH',
        },
    },
};

export const LOGIC_GRID_SLUGS = Object.keys(LOGIC_GRID_BONUSES);
