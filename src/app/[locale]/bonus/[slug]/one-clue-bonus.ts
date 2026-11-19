// Bonus cases for the "One Clue Is a Lie" saga (6 x 9 murder mystery puzzle books, Fun Books Publisher).
// One different gift per book (a reader who buys the whole saga must never find the same gift twice).
// Each URL is printed as a QR on the gift page of its book, so THE SLUGS ARE PERMANENT.
// For buyers only: nothing on the site links here, the page and the PDF are noindex (next.config.ts headers +
// robots metadata), they are not in the sitemap, and the PDF name carries a random suffix.
// Direct download, no email capture (KDP bonus content rules, G202018960).

export type OneClueBonus = {
    slug: string;
    caseNumber: number;
    bookTitle: string;
    name: string;
    caseTitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    lede: string;
    inside: string[];
};

export const ONE_CLUE_BONUSES: Record<string, OneClueBonus> = {
    'one-clue-is-a-lie-1': {
        slug: 'one-clue-is-a-lie-1',
        caseNumber: 1,
        bookTitle: 'Murder on the Last Night at Sea',
        name: 'The Second Note',
        caseTitle: 'Dawn in Southampton',
        pdf: '/downloads/one-clue-is-a-lie-1-the-second-note-c41f7a9e2d6b0835.pdf',
        cover: '/covers/one-clue/the-second-note.jpg',
        pages: 66,
        size: '0.7 MB',
        lede: 'Someone slipped the note under the door. Before the ship was empty, they were dead too. A new case, hidden in the pages you have already played: your suspects are waiting in the Key Card Register of your book.',
        inside: [
            'No register to print: you play it on the Key Card Register of your own copy of Case 1, with a pencil of a new color',
            'A Witness Room with twelve statements, the morning\'s records and a Witness Check Table, then twelve clues with checkpoints by card range',
            'The case files, three tests, hints in three steps and a three-step Verdict Code to check your answer, with no spoilers',
        ],
    },
};

export const ONE_CLUE_SLUGS = Object.keys(ONE_CLUE_BONUSES);
