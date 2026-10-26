// Bonus puzzles for the book "Nostalgia Word Search for Seniors" (Fun Books Publisher). The URL is printed as a
// QR on page 128 of the book, so THE SLUG IS PERMANENT. Published with Alfredo's OK on 26 Oct 2026.
// Direct download, no email capture (KDP bonus content rules, G202018960).

export type NostalgiaDecade = {
    decade: string;
    level: string;
    sample: string;
};

export type NostalgiaBonus = {
    slug: string;
    title: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    decades: NostalgiaDecade[];
    inside: string[];
};

export const NOSTALGIA_BONUSES: Record<string, NostalgiaBonus> = {
    'nostalgia-word-search': {
        slug: 'nostalgia-word-search',
        title: '100 More Nostalgia Word Searches',
        subtitle: '100 new large print puzzles that are not in the book, each with its own hidden trivia answer',
        pdf: '/downloads/nostalgia-word-search-bonus.pdf',
        cover: '/covers/nostalgia-word-search/bonus-puzzle.jpg',
        pages: 114,
        size: '1.8 MB',
        decades: [
            { decade: 'The Fifties', level: 'Easy', sample: "The Milkman's Morning Rounds" },
            { decade: 'The Sixties', level: 'Medium', sample: 'The Typing Pool' },
            { decade: 'The Seventies', level: 'Tricky', sample: 'Ten-Four, Good Buddy' },
            { decade: 'The Eighties', level: 'Expert', sample: 'Leave a Message at the Beep' },
        ],
        inside: [
            '100 brand-new themes, 25 for each decade, with no word repeated from the book',
            'Big, bold letters, one puzzle per page, ready to print at home on letter paper',
            'A trivia question on every page: the letters left over spell the answer',
            'How to Play on the first pages and every answer at the end',
        ],
    },
};

export const NOSTALGIA_SLUGS = Object.keys(NOSTALGIA_BONUSES);
