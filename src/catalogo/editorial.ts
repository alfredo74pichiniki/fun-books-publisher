import type { Familia, Idioma } from './tipos';

// What the site adds to Amazon's facts, keyed by ASIN. Every line below is taken from the book's own
// Amazon title or its cover: page counts, levels and ages are printed there. No ratings, no reader counts.
//
// - slug: the address of the book page. Books that were on the old site keep their old address.
// - nombre: the name readers see on the cover, when Amazon's listing title is different or too long.
// - regalo: the free gift page printed as a QR code inside the book.
//
// A new book that is not here still appears on its own, with Amazon's title and cover.

export type Editorial = {
    slug?: string;
    nombre?: string;
    linea?: string;
    familia?: Familia;
    regalo?: string;
    idioma?: Idioma;
};


export const EDITORIAL: Record<string, Editorial> = {
    // Monochrome Color by Number Mysteries
    B0HK571DVB: { slug: 'color-by-number-animal-mysteries', nombre: 'Color by Number Mysteries: Animals', linea: '100 hidden pictures of wildlife. Fill the numbered squares with one black pen and each animal appears.' },
    B0HK7Y38KM: { slug: 'color-by-number-botanicals-mysteries', nombre: 'Color by Number Mysteries: Botanicals', linea: '100 hidden flowers and plants, revealed square by square with one black pen.' },
    B0HL35C1RV: { slug: 'color-by-number-cottagecore-mysteries', nombre: 'Color by Number Mysteries: Cottagecore', linea: '100 hidden farm and country scenes, revealed square by square with one black pen.' },
    B0HK7WHK1G: { slug: 'color-by-number-cozy-escapes-mysteries', nombre: 'Color by Number Mysteries: Cozy Escapes', linea: '100 hidden getaways, revealed square by square with one black pen.' },
    B0HK4LQ18M: { slug: 'color-by-number-mystery-collection', nombre: 'Color by Number Mysteries: The Collection', linea: '100 hidden pictures of every kind, revealed square by square with one black pen.' },

    // Monochrome coloring (Ink Bliss series)
    B0FM4B5Z7H: { slug: 'ink-bliss-imagination', nombre: 'Ink Bliss: The Ultimate Monochrome Coloring Book', linea: 'The book that started the series: scenes in pure black and white, with hints on the page.', regalo: 'ink-bliss-imagination' },
    B0FQ1JBGY6: { slug: 'monochrome-mandala', nombre: 'Monochrome Mandala', linea: 'Mandalas in pure black and white, made for one marker. Square format.', regalo: 'monochrome-mandala' },
    B0FR91RBSZ: { slug: 'negative-space-animals', nombre: 'Monochrome: Animal Collection', linea: 'Animals drawn in negative space: bold linework for a single black marker.', regalo: 'negative-space-animals' },
    B0FSZ9V9MS: { slug: 'cozy-escapes', nombre: 'Monochrome: Black & White Cozy Escapes', linea: 'Sofas, window seats and quiet corners to fill with one pen.', regalo: 'cozy-escapes' },
    B0G3889XTJ: { slug: 'tattoo-flash', nombre: 'Monochrome: Tattoo Flash', linea: '50 bold blackwork designs, old school and neo-traditional.', regalo: 'tattoo-flash' },
    B0D8FG7NDJ: { slug: 'botanicals', nombre: 'Monochrome: Botanicals & Nature Escapes', linea: 'Mushrooms, leaves and wild plants in black and white.', familia: 'monochrome', regalo: 'botanicals' },
    B0GVZGLCZS: { slug: 'spooky-kawaii', nombre: 'Monochrome: Spooky Kawaii', linea: 'Cute Halloween characters in black and white.', regalo: 'spooky-kawaii' },
    // Its gift page /bonus/black-white-art-therapy (PDF power-of-black-and-white.pdf) shows the cover of this book in
    // books.ts (covers/power-black-white.png matches this ASIN's live Amazon cover: wine bottle and grapes).
    B0GW33476D: { slug: 'power-of-black-and-white-mixed', nombre: 'Monochrome: Power of Black & White, Mixed', linea: '50 mixed one-color illustrations in black and white.', regalo: 'black-white-art-therapy' },
    B0GWY67XKF: { slug: 'cottagecore-homestead', nombre: 'Monochrome: Cottagecore Homestead', linea: 'Cozy country living: hearths, kitchens and gardens in black and white.', regalo: 'cottagecore-homestead' },
    B0GXMQ5KV2: { slug: 'witchy-celestial', nombre: 'Monochrome: Witchy Celestial', linea: 'Moon phases, tarot and crystals in black and white.', regalo: 'witchy-celestial' },

    // More coloring
    B0DBJ3YJJS: { slug: 'zen-mandalas', nombre: 'Art of Serenity: 101 Zen Mandalas', linea: '101 mandalas to color, with short inspirational stories.', regalo: 'zen-mandalas' },
    B0DZVMRMT6: { slug: 'motivational-mandala', nombre: 'Fun & Motivational Mandala Coloring Book', linea: 'Intricate mandalas with uplifting quotes and positive affirmations.' },
    B0DKSC5QTL: { slug: 'christmas-santa', nombre: 'Christmas Santa Claus Coloring Book', linea: 'Festive holiday scenes with Santa, reindeer and elves.' },

    // Mystery puzzles
    B0HN5J3F5J: { slug: 'cross-out-the-killer-1', nombre: 'Cross Out the Killer: Murder at the Antiques Fair', linea: 'Level 1, easy. 3,000 suspects, 14 clues, 1 killer. Large print.', regalo: 'cross-out-the-killer' },
    B0HN5QCKYD: { slug: 'cross-out-the-killer-2', nombre: 'Cross Out the Killer: Death at the Model Railroad Show', linea: 'Level 2, medium. 5,000 suspects, 14 clues, 1 killer. Large print.', regalo: 'cross-out-the-killer-2' },
    B0HNVPDNJ9: { slug: 'cross-out-the-killer-3', nombre: 'Cross Out the Killer: Murder at the Ballpark', linea: 'Level 3, hard. 8,000 suspects, 15 clues, 1 killer. Large print.', regalo: 'cross-out-the-killer-3' },
    B0HP7XF291: { slug: 'murder-in-every-room', nombre: 'Murder Mystery Word Search: Murder in Every Room', linea: '38 cases on 3 floors: word searches that solve a whodunit. Large print.', regalo: 'who-was-where' },

    // Word search and brain games
    B0HPFW7XQV: { slug: 'nostalgia-word-search', nombre: 'Nostalgia Word Search for Seniors', linea: '100 large print puzzles from the 1950s to the 80s, with a hidden trivia answer in each one.', regalo: 'nostalgia-word-search' },
    B0HR1WQ4Q4: { slug: 'birthday-trivia', nombre: 'Birthday Trivia for Seniors', linea: '240 large print questions about the 1950s, 60s, 70s and 80s.', regalo: 'birthday-trivia' },
    B0FKHCJSDY: { slug: 'challenging-word-search', nombre: 'Challenging Word Search for Curious Minds', linea: '200 large print word searches for adults and seniors.' },
    B0D6TZKZW2: { slug: 'variety-puzzle-ultimate', nombre: 'Variety Puzzle Book for Adults', linea: 'Sudoku, crosswords, word searches, mazes and more in one book.' },

    // En español
    B0DH3Q9XN6: { slug: 'ejercicios-memoria', nombre: 'Ejercicios de Memoria para Personas Mayores', linea: '200 actividades de estimulación cognitiva, en letra grande.', regalo: 'ejercicios-memoria' },
    B0HQDJ7TNV: { slug: 'ejercicios-memoria-2', nombre: 'Ejercicios de Memoria para Personas Mayores, Volumen 2', linea: 'Juegos de memoria y gimnasia cerebral en letra extra grande, con 3 niveles.', regalo: 'ejercicios-memoria-2' },
    B0D95Q7D9Y: { slug: '150-pasatiempos', nombre: '150 Pasatiempos para Adultos y Personas Mayores', linea: 'Crucigramas, sopas de letras, sudokus y laberintos, en letra grande.' },
    B0D5L9MKGC: { slug: 'sopa-de-letras', nombre: 'Sopa de Letras en Español: Desafío y Diversión', linea: '100 sopas de letras con 1.500 palabras, en letra grande.' },
    B0D5QCS2ZJ: { slug: 'sopa-de-letras-palabras-positivas', nombre: 'Sopa de Letras en Español: Palabras Positivas', linea: '100 sopas de letras con 2.000 palabras positivas y motivadoras, en letra grande.' },

    // Kids
    B0HRQDD5Q4: { slug: 'secret-science-agency', nombre: 'Secret Science Agency: Logic Puzzles for Teens', linea: '80 logic puzzle missions for ages 11 to 14, with hints and step-by-step solutions.', regalo: 'secret-science-agency' },
    B0HPT79HMN: { slug: '50-states-road-trip', nombre: 'The Great USA Road Trip: 50 States Workbook', linea: 'US geography, states and capitals, one state at a time. Ages 8 to 12.', regalo: '50-states-road-trip' },
    B0HCCVH3B2: { slug: 'ocean', nombre: 'Ocean Animals: The No-Screen Activity Book', linea: 'Mazes, puzzles, word searches and coloring about the sea. Ages 8 to 12.', regalo: 'ocean' },
    B0DTQ2K31D: { slug: 'compass-for-kids', nombre: 'How to Use a Compass for Kids', linea: 'Compass, maps and outdoor skills, with activities. Ages 8 to 12.', regalo: 'compass-for-kids' },
    B0D6N92QZ1: { slug: 'cursive-workbook', nombre: 'Cursive Workbook for Kids', linea: 'Letters, words and sentences in cursive, with coloring pages. Ages 8 to 12.', regalo: 'cursive-workbook' },
    B0H71NMM51: { slug: '4th-of-july-activity-book', nombre: '4th of July Activity Book for Kids', linea: 'Coloring, puzzles, trivia and mazes for Independence Day. Ages 8 to 12.' },

    // Large print logbooks
    B0HBCG2HKR: { slug: 'blood-pressure-log-book', nombre: 'Blood Pressure Log Book', linea: 'Large print daily AM and PM tracker for blood pressure, pulse and medication.', regalo: 'blood-pressure-log-book' },
};

// Old /books/<id> addresses of the previous site that pointed to a book now listed under another ASIN.
export const SLUGS_ANTIGUOS: Record<string, string> = {
    'stress-relief-inspiration': 'B0D8FG7NDJ',
    'black-white-art-therapy': 'B0GW33476D',
};
