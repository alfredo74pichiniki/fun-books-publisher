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
    // Optional, added for Case 2 (an "extra file", not a "bonus case"). When absent, the Case 1 page renders as before.
    kicker?: string; // small line above the title, e.g. 'One More File:'
    kind?: string; // metadata wording, default 'A bonus case'
    stamp?: string; // default `Bonus case · Case N`
    cta?: string; // default 'Download the bonus case'
    books?: { caseNumber: number; title: string; note: string }[]; // default: only this case's book
    review?: { text: string; asin?: string }; // neutral review request, shown after the download; link only with an ASIN
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
    // Printed as a QR on the gift page of Case 2 (after the epilogue). Approved gift: "The Courier's Satchel" (19 nov 2026).
    // No spoilers of Case 2 here: no killer, no forged paper, no solution of the file.
    'one-clue-is-a-lie-2': {
        slug: 'one-clue-is-a-lie-2',
        caseNumber: 2,
        bookTitle: 'Murder on the Last Night in Edinburgh',
        name: 'The Courier\'s Satchel',
        caseTitle: 'Waverley Station, one month later',
        pdf: '/downloads/one-clue-is-a-lie-2-the-couriers-satchel-e8baa7d388f4a209.pdf',
        cover: '/covers/one-clue/the-couriers-satchel.jpg',
        pages: 27,
        size: '0.6 MB',
        lede: 'A month after closing night, the luggage storage office at the railroad station below the castle opens a bag that nobody came back for. The tag on its strap says L. DREY. Lucian Drey had one delivery left. You open it with the pages of your own copy of Case 2.',
        inside: [
            'Nothing to print: you play it with your copy of Case 2, on its Ticket Register and its Plan of the Castle Esplanade, with a pencil and a notepad',
            'Three locks, each one opening the next: the Number Card, the Directions (one step is not what it seems) and the Delivery Code, checked in a Delivery Table',
            'A card for Case 1 detectives only, read with the Key Card Register of your copy of Case 1, hints in three levels, from a nudge to the full answer, and a sealed envelope at the end',
        ],
        kicker: 'One More File:',
        kind: 'An extra file',
        stamp: 'Extra file · Case 2',
        cta: 'Download the extra file',
        books: [
            {
                caseNumber: 2,
                title: 'Murder on the Last Night in Edinburgh',
                note: 'You need your copy: this file is played on its Ticket Register and its Plan of the Castle Esplanade',
            },
            {
                caseNumber: 1,
                title: 'Murder on the Last Night at Sea',
                note: 'Keep it nearby if you played it: the card for Case 1 detectives only is read on its Key Card Register',
            },
        ],
        review: {
            text: 'Closed the file? If you have a minute, an honest review of the book on Amazon, whatever you thought of it, helps other detectives decide.',
        },
    },
    // Printed as a QR on the gift page of Case 3 (after the epilogue and the ledger). Approved gift: "The Paymaster's
    // Ledger: The Back Pages" (23 nov 2026), an audit of payments played on the Ferry Manifest and the plan of Case 3.
    // No spoilers here: no killer, no liar, no solution of the file.
    'one-clue-is-a-lie-3': {
        slug: 'one-clue-is-a-lie-3',
        caseNumber: 3,
        bookTitle: 'Murder on the Last Night in New York',
        name: "The Paymaster's Ledger: The Back Pages",
        caseTitle: "New York, one week after New Year's Eve",
        pdf: '/downloads/one-clue-is-a-lie-3-the-back-pages-8323915c538bf37f.pdf',
        cover: '/covers/one-clue/the-back-pages.jpg',
        pages: 33,
        size: '0.6 MB',
        lede: "A week after New Year's Eve, a padded envelope reaches Chief Penhallow. Ambrose Tull mailed it on the morning of December 31, in case he did not make it to a quarter past midnight. Inside are the back pages of his ledger, and a secret he kept from the Paymaster for eleven years. You audit them with the pages of your own copy of Case 3.",
        inside: [
            'Nothing to print: you play it with your copy of Case 3, on its Ferry Manifest and its Plan of Governors Island, with a pencil and a notepad',
            'Three locks, each one opening the next: the Ghosts (six of the thirty people paid do not exist), Tull\'s Walk (one envelope was never collected) and the Combination, each with its own check list',
            'A page for Case 1 detectives and a page for Case 2 detectives, hints in three levels, from a nudge to the full answer, and what Tull left where his walk ended',
        ],
        kicker: 'One More File:',
        kind: 'An extra file',
        stamp: 'Extra file · Case 3',
        cta: 'Download the extra file',
        books: [
            {
                caseNumber: 3,
                title: 'Murder on the Last Night in New York',
                note: 'You need your copy: this file is played on its Ferry Manifest and its Plan of Governors Island',
            },
            {
                caseNumber: 2,
                title: 'Murder on the Last Night in Edinburgh',
                note: 'Keep it nearby if you played it: the page for Case 2 detectives is read on its Ticket Register',
            },
            {
                caseNumber: 1,
                title: 'Murder on the Last Night at Sea',
                note: 'Keep it nearby if you played it: the page for Case 1 detectives is read on its Key Card Register',
            },
        ],
        review: {
            text: 'Closed the file? If you have a minute, an honest review of the book on Amazon, whatever you thought of it, helps other detectives decide.',
        },
    },
};

export const ONE_CLUE_SLUGS = Object.keys(ONE_CLUE_BONUSES);
