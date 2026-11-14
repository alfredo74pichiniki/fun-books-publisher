// Bonus Mission Pack for book 08, "Secret Science Agency: Logic Puzzles for Teens and Middle Schoolers"
// (Fun Books Publisher, brain teasers for ages 11-14, 80 missions). The URL /bonus/secret-science-agency is printed as a
// QR on page 205 of the interior, so THE SLUG IS PERMANENT. Do not rename it.
// Published 11 Nov 2026 with Alfredo's OK. Updated 13 Nov 2026 after the educator review (cryptogram replaces truth or lie).
// Audience is 11-14 and their parents (COPPA): direct download, no form, no email, no sign-up, and the Meta Pixel is
// switched off on this path (see components/MetaPixel.tsx). KDP bonus content rules, G202018960.
// PDF: missions 81-90, 26 pages, md5 8e61277b6a58f7ebf9ed1990d56ad6a9 (14 nov 2026, full step-by-step chains in every solution, check codes paired by mission). If the PDF changes, update `pages` and `size`.

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
        pages: 26,
        size: '0.6 MB',
        missions: [
            { n: 81, type: 'Logic Grid', name: 'Sector Atlas Sort-Out', level: 'Advanced' },
            { n: 82, type: 'Keyword Cipher', name: 'Code Name: Broken Beacon', level: 'Elite' },
            { n: 83, type: 'Lock Code', name: 'The Rusty Tumbler', level: 'Advanced' },
            { n: 84, type: 'Word Ladder', name: 'Signal Path: Beam to Scan', level: 'Advanced' },
            { n: 85, type: 'Cryptogram', name: 'Radio Log: Cobalt Tide', level: 'Advanced' },
            { n: 86, type: 'Nonogram', name: 'The Scrambled Screen', level: 'Advanced' },
            { n: 87, type: 'Symbol Balance', name: 'The Spark Check', level: 'Advanced' },
            { n: 88, type: 'Shape Count', name: 'Crossed Pattern', level: 'Advanced' },
            { n: 89, type: 'Word Math', name: 'Locked Sum: TOKEN', level: 'Advanced' },
            { n: 90, type: 'Calc Cages', name: 'The Cobalt Panel', level: 'Elite' },
        ],
        steps: [
            { name: 'Print', how: 'Print the pages you need. One mission fits on one page.' },
            { name: 'Solve', how: 'Read the brief and the rules, then crack the mission on the page.' },
            { name: 'Check', how: 'Turn your answer into a check code. If it is one of the two codes next to your mission number, you are almost certainly right. No peeking at the solution.' },
            { name: 'Stuck?', how: 'Hint A gives a nudge. Hint B does the first step, never the whole mission.' },
            { name: 'Learn', how: 'Each step-by-step solution names the technique, so the next mission gets easier.' },
        ],
        inside: [
            'Ten new missions, numbered 81 to 90, that are not in the book',
            'Ten different puzzle types, from a logic grid and a keyword cipher to a cryptogram and Calc Cages',
            'Eight Advanced missions and two Elite ones, for agents who want a real challenge',
            'Check codes, so you can confirm an answer without seeing the solution',
            'Two levels of hints for every mission',
            'Full step-by-step solutions that name each technique',
        ],
    },
};

export const SECRET_SCIENCE_SLUGS = Object.keys(SECRET_SCIENCE_BONUSES);
