// One bonus case per book of "Cross Out the Killer" (decided 15 Oct 2026: a reader who buys the whole
// series must never find the same gift twice). Each URL is printed as a QR in its book, so THE SLUGS
// ARE PERMANENT. Direct download, no email capture (KDP bonus content rules, G202018960).

export type CrossOutBonus = {
    slug: string;
    book: number;
    level: string;
    name: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    lede: string;
    inside: string[];
};

export const CROSS_OUT_BONUSES: Record<string, CrossOutBonus> = {
    'cross-out-the-killer': {
        slug: 'cross-out-the-killer',
        book: 1,
        level: 'Easy',
        name: 'Death on the Magnolia Queen',
        pdf: '/downloads/cross-out-the-killer-bonus-case.pdf',
        cover: '/covers/cross-out/bonus-case.jpg',
        pages: 49,
        size: '0.8 MB',
        lede: 'The captain of the last great paddle steamer on the Mississippi has been found dead in his cabin, and the old riverboat log in his safe is gone. Eight hundred passengers are on board. One of them did it.',
        inside: [
            'A register of 800 passengers in the same large, clear print as your book',
            'Ten clues with a checkpoint after every one, then the purser\'s files, a map of the boat and three tests',
            'Hints in three steps and a Verdict Code to check your answer, with no spoilers',
        ],
    },
    'cross-out-the-killer-2': {
        slug: 'cross-out-the-killer-2',
        book: 2,
        level: 'Medium',
        name: 'Murder at the Classic Car Show',
        pdf: '/downloads/cross-out-the-killer-bonus-case-2.pdf',
        cover: '/covers/cross-out/bonus-case-2.jpg',
        pages: 68,
        size: '0.8 MB',
        lede: 'The most famous car restorer in the country has been found dead in the Restoration Barn, and the crystal Glass Swan on the hood of his 1934 roadster is gone. Fifteen hundred visitors came to the show. One of them did it.',
        inside: [
            'A register of 1,500 visitors in the same large, clear print as your book',
            '13 clues with a checkpoint after every one, then the show\'s files, a map of the park and three tests',
            'Hints in three steps and a Verdict Code to check your answer, with no spoilers',
        ],
    },
    'cross-out-the-killer-3': {
        slug: 'cross-out-the-killer-3',
        book: 3,
        level: 'Hard',
        name: 'Death at the Opera House',
        pdf: '/downloads/cross-out-the-killer-bonus-case-3.pdf',
        cover: '/covers/cross-out/bonus-case-3.jpg',
        pages: 90,
        size: '0.9 MB',
        lede: 'On the opening night of the season, the old impresario of the Belvedere Opera House has been found dead in his private box, and the sealed envelope with his new will is gone. Two thousand five hundred guests were in the house. One of them did it.',
        inside: [
            'A register of 2,500 guests in the same large, clear print as your book',
            '13 clues with a checkpoint after every one, then the opera house files, a map of the building and three tests',
            'Hints in three steps and a Verdict Code to check your answer, with no spoilers',
        ],
    },
};

export const CROSS_OUT_SLUGS = Object.keys(CROSS_OUT_BONUSES);
