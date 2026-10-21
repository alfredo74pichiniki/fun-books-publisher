// Bonus cases for the book "Who Was Where?" (murder mystery word search, approved by Alfredo on
// 21 Oct 2026). The URL is printed as a QR on page 109 of the book, so THE SLUG IS PERMANENT.
// Direct download, no email capture (KDP bonus content rules, G202018960).

export type WhoWasWhereCase = {
    floor: string;
    name: string;
    note: string;
};

export type WhoWasWhereBonus = {
    slug: string;
    title: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    cases: WhoWasWhereCase[];
    inside: string[];
};

export const WHO_WAS_WHERE_BONUSES: Record<string, WhoWasWhereBonus> = {
    'who-was-where': {
        slug: 'who-was-where',
        title: 'Who Was Where? Bonus Cases',
        subtitle: '3 extra cases that are not in the book, one on each floor',
        pdf: '/downloads/who-was-where-bonus.pdf',
        cover: '/covers/who-was-where/bonus-cases.jpg',
        pages: 13,
        size: '0.6 MB',
        cases: [
            { floor: 'Ground Floor', name: 'Harbor Master Keeps Watch', note: 'The Harbor Master\'s House, 1938' },
            { floor: 'Upper Floor', name: 'Brookside Breakfast Guests', note: 'Brookside Bed and Breakfast, 1984' },
            { floor: 'The Attic', name: 'Elmwood Hall Reunion', note: 'Elmwood Hall, 1930. Two plans, two times' },
        ],
        inside: [
            'Three new house plans to search, each one a word search where the room you find a name in is where that person was',
            'The rules on two pages, so you can play even without the book at hand',
            'A Verdict Code for each case to check your answer, and the full solutions at the end',
        ],
    },
};

export const WHO_WAS_WHERE_SLUGS = Object.keys(WHO_WAS_WHERE_BONUSES);
