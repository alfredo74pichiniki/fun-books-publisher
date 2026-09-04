// The three QR gifts printed in the back of "How to Use a Compass for Kids"
// (paperback ASIN B0DTQ2K31D). The QR codes are already printed in copies that
// are on sale, so THESE SLUGS ARE PERMANENT and must never change.
//
// These pages are handled before the normal /bonus/[slug] book lookup, so they
// do not touch books.ts, the shop, or the shared BonusLanding component.

export type CompassGift = {
    slug: string;
    step: number;            // 1, 2, 3, in the same order as the book's last page
    name: string;
    lede: string;            // one plain sentence, what it is
    cover: string;
    pdf: string;
    pages: number;
    size: string;            // download size, useful on mobile data
    action: string;          // button label, says exactly what happens
    tint: string;            // accent for this gift's markers
    inside: string[];        // three concrete things, no selling
};

export const COMPASS_GIFTS: Record<string, CompassGift> = {
    'compass-quest': {
        slug: 'compass-quest',
        step: 1,
        name: 'The Compass Quest',
        lede: 'Jamie and Max find an old map in the attic and follow it into the Whispering Woods, using the same compass skills you just learned.',
        cover: '/covers/compass/story.jpg',
        pdf: '/downloads/compass-quest-story.pdf',
        pages: 58,
        size: '15 MB',
        action: 'Download the story',
        tint: '#2E7C93',
        inside: [
            'Four chapters, illustrated from start to finish',
            'Every direction in the story is a real bearing you can follow',
            'Reads on a phone, a tablet or a computer',
        ],
    },
    'compass-for-kids': {
        slug: 'compass-for-kids',
        step: 2,
        name: 'The Full Digital Book',
        lede: 'The whole of How to Use a Compass for Kids, page for page, to keep on a tablet and take anywhere.',
        cover: '/covers/compass/book.jpg',
        pdf: '/downloads/compass-for-kids-digital-book.pdf',
        pages: 115,
        size: '23 MB',
        action: 'Download the book',
        tint: '#2F6B4F',
        inside: [
            'All three parts: the compass, the map, and staying safe outdoors',
            'The same diagrams and activities as the printed book',
            'Works offline once it is saved',
        ],
    },
    'compass-activity-pack': {
        slug: 'compass-activity-pack',
        step: 3,
        name: 'The Explorer Activity and Rewards Pack',
        lede: 'Everything to print and do after the book: activities, games, puzzles and coloring pages.',
        cover: '/covers/compass/pack.jpg',
        pdf: '/downloads/compass-activity-pack.pdf',
        pages: 40,
        size: '11 MB',
        action: 'Download the activity pack',
        tint: '#B8431A',
        inside: [
            'Compass activities, direction games and a compass rose to draw',
            'Three word searches, with a solutions page',
            'Ten coloring pages, an explorer certificate and an ID card',
        ],
    },
};

export const COMPASS_SLUGS = Object.keys(COMPASS_GIFTS);

export function otherGifts(slug: string): CompassGift[] {
    return COMPASS_SLUGS.filter((s) => s !== slug).map((s) => COMPASS_GIFTS[s]);
}
