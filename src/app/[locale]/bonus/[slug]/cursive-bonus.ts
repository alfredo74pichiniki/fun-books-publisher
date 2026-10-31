// Bonus pack for "Cursive Workbook for Kids Ages 8-12" (Fun Books Publisher, ASIN B0D6N92QZ1). The URL is printed
// as a QR on the last page of the corrected interior, so ONCE THAT INTERIOR IS ON SALE THE SLUG IS PERMANENT.
// The book id "cursive-workbook" has no bonusPdf in books.ts, so this landing does not collide with BonusLanding.
// Prepared 31 Oct 2026, NOT published until Alfredo says OK.
// Final content (31 Oct 2026, Alfredo): 9 cursive pages + a separator + the 12 coloring pictures he kept from the
// old gift, in black and white. 22 pages. If the PDF changes, update `pages` and `size`.
// Direct download, no email capture (KDP bonus content rules, G202018960).

export type CursiveBonus = {
    slug: string;
    title: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    steps: { name: string; how: string }[];
    inside: string[];
};

export const CURSIVE_BONUSES: Record<string, CursiveBonus> = {
    'cursive-workbook': {
        slug: 'cursive-workbook',
        title: 'Your Cursive Bonus Pack',
        subtitle: 'Printable practice pages that are not in the book, from Pencie and Fun Books Publisher',
        pdf: '/downloads/cursive-workbook-bonus.pdf',
        cover: '/covers/cursive-workbook/bonus-pack.jpg',
        pages: 22,
        size: '2.9 MB',
        steps: [
            { name: 'Trace', how: 'Follow the dotted letters on the guide lines, slowly, top to bottom.' },
            { name: 'Practice', how: 'Write the letters and the sentence on your own on the blank lines.' },
            { name: 'Sign', how: 'Trace the example signatures, then create your very own.' },
            { name: 'Celebrate', how: 'Finish the book and ask a grown-up to sign your Cursive Champion certificate.' },
            { name: 'Color', how: 'Take a break with 12 bonus pictures to color.' },
        ],
        inside: [
            'A cursive alphabet poster: all 26 uppercase and lowercase letters with stroke arrows',
            'Trace the alphabet: one page of uppercase and one of lowercase letters',
            'A practice sentence that uses all 26 letters of the alphabet',
            'Learn to sign your name: example signatures to trace and lines to practice your own',
            'Blank cursive practice sheets with the same guide lines as the book',
            'A Cursive Champion certificate to print, fill in and sign',
            '12 bonus coloring pages: a hot air balloon, an octopus, a castle, a train, a robot, lions, a pirate ship, a clown, a dragon, a bird, a robot in space and a summer beach day',
        ],
    },
};

export const CURSIVE_SLUGS = Object.keys(CURSIVE_BONUSES);
