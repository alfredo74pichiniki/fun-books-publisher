// Gift page for book 07, the large print trivia book for seniors with the 1950s, 60s, 70s and 80s (Fun Books Publisher).
// The URL will be printed as a QR in the book, so once the book is on sale THE SLUG IS PERMANENT.
// PREPARED 7 Nov 2026, NOT PUBLISHED: waiting for Alfredo's OK. Book title chosen by Alfredo on 7 Nov 2026.
// Nothing to download behind a form and no email capture (KDP bonus content rules, G202018960).
// The questions and birth-year cards live in birthday-trivia-data.ts, generated from the book's verified bank.

export type BirthdayTriviaBonus = {
    slug: string;
    /** Book name as the reader knows it (title chosen by Alfredo on 7 Nov 2026). */
    book: string;
    /** Short brand line printed on the shareable card. */
    cardCredit: string;
    title: string;
    subtitle: string;
};

export const BIRTHDAY_TRIVIA_BONUSES: Record<string, BirthdayTriviaBonus> = {
    'birthday-trivia': {
        slug: 'birthday-trivia',
        book: 'Birthday Trivia for Seniors',
        cardCredit: 'From Birthday Trivia for Seniors, Fun Books Publisher',
        title: 'Your Birthday Trivia Party',
        subtitle:
            'Make a keepsake card for the year you were born, then put the trivia rounds from the book up on the TV and play together',
    },
};

export const BIRTHDAY_TRIVIA_SLUGS = Object.keys(BIRTHDAY_TRIVIA_BONUSES);
