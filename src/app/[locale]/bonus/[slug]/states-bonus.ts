// Bonus flashcards for the 50 States road trip workbook for kids (Fun Books Publisher). The URL is printed as a
// QR near the end of the book, so ONCE THE BOOK IS ON SALE THE SLUG IS PERMANENT.
// Prepared 30 Oct 2026, NOT published until Alfredo says OK.
// Direct download, no email capture (KDP bonus content rules, G202018960).

export type StatesGame = {
    name: string;
    how: string;
};

export type StatesBonus = {
    slug: string;
    title: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    games: StatesGame[];
    inside: string[];
};

export const STATES_BONUSES: Record<string, StatesBonus> = {
    '50-states-road-trip': {
        slug: '50-states-road-trip',
        title: '50 State Flashcards',
        subtitle: 'Printable cards that are not in the book: the shape of each state on the front, its facts on the back',
        pdf: '/downloads/50-states-flashcards-bonus.pdf',
        cover: '/covers/50-states-road-trip/bonus-cards.jpg',
        pages: 20,
        size: '0.7 MB',
        games: [
            { name: 'Which State Am I?', how: 'Show the shape. The first player to name the state keeps the card.' },
            { name: 'Capital Challenge', how: 'Read out a state. Your partner names its capital to win the card.' },
            { name: 'Road Trip Order', how: 'Put the cards in the order the states joined the United States.' },
        ],
        inside: [
            '50 cards, one for every state, 6 to a page on letter paper',
            'Front: the outline of the state and the question "Which state am I?"',
            'Back: capital, nickname, year it joined, state bird, state flower, biggest city and region',
            'The backs are lined up for double-sided printing, with simple steps if your printer is single-sided',
        ],
    },
};

export const STATES_SLUGS = Object.keys(STATES_BONUSES);
