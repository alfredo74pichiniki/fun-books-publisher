// Bonus Mission Pack for book 08, "Secret Science Agency: Logic Puzzles for Teens and Middle Schoolers"
// (Fun Books Publisher, brain teasers for ages 11-14, 80 missions). The URL /bonus/secret-science-agency is printed as a
// QR on page 170 of the interior, so THE SLUG IS PERMANENT. Do not rename it.
// PREPARED 11 Nov 2026, NOT PUBLISHED: waiting for Alfredo's OK.
// Audience is 11-14 and their parents (COPPA): direct download, no form, no email, no sign-up, and the Meta Pixel is
// switched off on this path (see components/MetaPixel.tsx). KDP bonus content rules, G202018960.
// PDF: missions 81-90, 19 pages, md5 dfe9685107ea590bd7f579378e45f409 (11 nov 2026, 'an atom'). If the PDF changes, update `pages` and `size`.

export type SecretScienceBonus = {
    slug: string;
    /** Book name as the reader knows it (title chosen by Alfredo on 10 Nov 2026). */
    book: string;
    title: string;
    subtitle: string;
    pdf: string;
    /** Real pages of the bonus PDF (cover, mission 82, mission 86), rendered from the PDF itself. */
    preview: string;
    /**
     * BOOK COVER: does not exist yet. While this is null the page shows a dashed placeholder box.
     * When the cover is ready, save it as /public/covers/secret-science-agency/book-cover.jpg and set this to
     * '/covers/secret-science-agency/book-cover.jpg' (also used as the Open Graph image).
     */
    bookCover: string | null;
    pages: number;
    size: string;
    missions: { n: number; type: string; name: string; level: 'Advanced' | 'Elite' }[];
    steps: { name: string; how: string }[];
    inside: string[];
};

export const SECRET_SCIENCE_BONUSES: Record<string, SecretScienceBonus> = {
    'secret-science-agency': {
        slug: 'secret-science-agency',
        book: 'Secret Science Agency: Logic Puzzles for Teens and Middle Schoolers',
        title: 'Bonus Mission Pack',
        subtitle: 'Ten extra missions for agents who finished the book, or who just want more. Missions 81 to 90',
        pdf: '/downloads/secret-science-agency-bonus-missions.pdf',
        preview: '/covers/secret-science-agency/bonus-pack.jpg',
        bookCover: '/covers/secret-science-agency/book-cover.jpg',
        pages: 19,
        size: '0.6 MB',
        missions: [
            { n: 81, type: 'Logic Grid', name: 'The Harbor Sign-Out', level: 'Advanced' },
            { n: 82, type: 'Shift Cipher', name: 'Code Name: Quiet Comet', level: 'Elite' },
            { n: 83, type: 'Lock Code', name: 'The Rusty Lab Safe', level: 'Advanced' },
            { n: 84, type: 'Word Ladder', name: 'Signal Path: Beam to Scan', level: 'Advanced' },
            { n: 85, type: 'Truth or Lie', name: 'The Marble Vault', level: 'Advanced' },
            { n: 86, type: 'Nonogram', name: 'The Shadow Printout', level: 'Advanced' },
            { n: 87, type: 'Symbol Balance', name: 'The Spark Check', level: 'Advanced' },
            { n: 88, type: 'Shape Count', name: 'Crossed Lattice', level: 'Advanced' },
            { n: 89, type: 'Word Math', name: 'Digits in Proof', level: 'Advanced' },
            { n: 90, type: 'Calc Cages', name: 'The Silver Gate', level: 'Elite' },
        ],
        steps: [
            { name: 'Print', how: 'Print the pages you need. One mission fits on one page.' },
            { name: 'Solve', how: 'Read the brief and the rules, then crack the mission on the page.' },
            { name: 'Check', how: 'Turn your answer into a check code and find it in the list. No peeking at the solution.' },
            { name: 'Stuck?', how: 'Hint A gives a nudge. Hint B does the first step, never the whole mission.' },
            { name: 'Learn', how: 'Each step-by-step solution names the technique, so the next mission gets easier.' },
        ],
        inside: [
            'Ten new missions, numbered 81 to 90, that are not in the book',
            'Ten different puzzle types, from a logic grid and a shift cipher to a nonogram and Calc Cages',
            'Eight Advanced missions and two Elite ones, for agents who want a real challenge',
            'Check codes, so you can confirm an answer without seeing the solution',
            'Two levels of hints for every mission',
            'Full step-by-step solutions that name each technique',
        ],
    },
};

export const SECRET_SCIENCE_SLUGS = Object.keys(SECRET_SCIENCE_BONUSES);
