// Data for the three design directions (branch rediseno-fbp). Mockup only.
// Titles and covers are the real ones. No ratings, reviews or counters: nothing here is invented.
// ASINs come from the verified map (skill fbp-catalogo-asins). Where the ASIN is not verified yet, `asin` is
// empty and the button searches the title on Amazon; the final site must use the verified product link.

export type Familia = 'coloring' | 'mystery' | 'memory' | 'kids';

export type Libro = {
    id: string;
    titulo: string;
    corto: string;
    linea: string; // one honest line about what is inside
    familia: Familia;
    w: number;
    h: number;
    asin: string;
    regalo?: string; // live gift page
    lang?: 'es';
};

export const FAMILIAS: Record<Familia, { nombre: string; palabra: string; frase: string }> = {
    coloring: {
        nombre: 'Coloring for adults',
        palabra: 'COLORING',
        frase: 'The Monochrome series: bold black and white art you fill with a single pen. No color decisions, no mess.',
    },
    mystery: {
        nombre: 'Mystery puzzles',
        palabra: 'MYSTERY',
        frase: 'Large print cases you solve with a pencil: cross out the suspects, follow the clues, name the killer.',
    },
    memory: {
        nombre: 'Memory and nostalgia',
        palabra: 'MEMORY',
        frase: 'Large print word searches, trivia and memory exercises for seniors, in English and in Spanish.',
    },
    kids: {
        nombre: 'Kids, screen-free',
        palabra: 'KIDS',
        frase: 'Activity books and workbooks for ages 8 to 14 that teach something real while they play.',
    },
};

export const ORDEN: Familia[] = ['coloring', 'mystery', 'memory', 'kids'];

export const LIBROS: Libro[] = [
    { id: 'cozy-escapes', corto: 'Cozy Escapes', titulo: 'Monochrome Coloring Book: Black & White Cozy Escapes', linea: 'Cabins, window seats and quiet corners to fill with one pen.', familia: 'coloring', w: 760, h: 983, asin: 'B0FSZ9V9MS', regalo: 'cozy-escapes' },
    { id: 'monochrome-mandala', corto: 'Monochrome Mandala', titulo: 'Ink Bliss: Monochrome Mandala Coloring Book', linea: 'Hand-drawn mandalas in pure black and white.', familia: 'coloring', w: 760, h: 760, asin: 'B0FQ1JBGY6', regalo: 'monochrome-mandala' },
    { id: 'animal-collection', corto: 'Animal Collection', titulo: 'Monochrome Coloring Book: Animal Collection', linea: 'Lions, tigers and wild scenes in negative space.', familia: 'coloring', w: 760, h: 984, asin: 'B0FR91RBSZ', regalo: 'negative-space-animals' },
    { id: 'cottagecore', corto: 'Cottagecore Homestead', titulo: 'Monochrome Coloring Book: Cottagecore Homestead', linea: 'Hearths, gardens and country kitchens.', familia: 'coloring', w: 760, h: 983, asin: 'B0GWY67XKF', regalo: 'cottagecore-homestead' },
    { id: 'tattoo-flash', corto: 'Tattoo Flash', titulo: 'Tattoo Flash Monochrome Coloring Book for Adults', linea: 'Classic flash sheets in black and white.', familia: 'coloring', w: 760, h: 984, asin: 'B0G3889XTJ', regalo: 'tattoo-flash' },
    { id: 'ink-bliss', corto: 'Ink Bliss', titulo: 'Ink Bliss: The Ultimate Monochrome Coloring Book', linea: 'The first book of the series, with hints on every page.', familia: 'coloring', w: 760, h: 984, asin: 'B0FM4B5Z7H', regalo: 'ink-bliss-imagination' },
    { id: 'witchy-celestial', corto: 'Witchy Celestial', titulo: 'Monochrome Coloring Book: Witchy Celestial', linea: 'Moons, cats and star charts.', familia: 'coloring', w: 760, h: 983, asin: 'B0GXMQ5KV2', regalo: 'witchy-celestial' },
    { id: 'spooky-kawaii', corto: 'Spooky Kawaii', titulo: 'Monochrome Coloring Book: Spooky Kawaii', linea: 'Cute Halloween characters in black and white.', familia: 'coloring', w: 760, h: 983, asin: 'B0GVZGLCZS', regalo: 'spooky-kawaii' },

    { id: 'cross-out-1', corto: 'Cross Out the Killer 1', titulo: 'Cross Out the Killer: Murder at the Antiques Fair', linea: 'Level 1. 3,000 suspects, 14 clues, 1 killer.', familia: 'mystery', w: 760, h: 984, asin: '', regalo: 'cross-out-the-killer' },
    { id: 'cross-out-2', corto: 'Cross Out the Killer 2', titulo: 'Cross Out the Killer: Death at the Model Railroad Show', linea: 'Level 2. 5,000 suspects, 14 clues, 1 killer.', familia: 'mystery', w: 760, h: 984, asin: '' },
    { id: 'cross-out-3', corto: 'Cross Out the Killer 3', titulo: 'Cross Out the Killer: Murder at the Ballpark', linea: 'Level 3. 8,000 suspects, 15 clues, 1 killer.', familia: 'mystery', w: 760, h: 984, asin: '' },
    { id: 'murder-room', corto: 'Murder in Every Room', titulo: 'Murder Mystery Word Search: Murder in Every Room', linea: '38 cases across 3 floors, in large print.', familia: 'mystery', w: 760, h: 984, asin: '', regalo: 'who-was-where' },

    { id: 'nostalgia', corto: 'Nostalgia Word Search', titulo: 'Nostalgia Word Search for Seniors', linea: '100 large print puzzles from the 50s to the 80s.', familia: 'memory', w: 760, h: 1018, asin: '', regalo: 'nostalgia-word-search' },
    { id: 'birthday-trivia', corto: 'Birthday Trivia', titulo: 'Birthday Trivia for Seniors', linea: '240 questions about the 50s, 60s, 70s and 80s.', familia: 'memory', w: 760, h: 991, asin: '', regalo: 'birthday-trivia' },
    { id: 'memoria', corto: 'Ejercicios de Memoria', titulo: 'Ejercicios de Memoria para Personas Mayores', linea: '200 actividades en letra grande. En español.', familia: 'memory', w: 760, h: 984, asin: 'B0DH3Q9XN6', regalo: 'ejercicios-memoria', lang: 'es' },

    { id: 'ocean', corto: 'Ocean Animals', titulo: 'Ocean Animals: The No-Screen Activity Book for Kids 8-12', linea: 'Mazes, puzzles, word searches and real sea facts.', familia: 'kids', w: 760, h: 998, asin: '', regalo: 'ocean' },
    { id: 'compass', corto: 'How to Use a Compass', titulo: 'How to Use a Compass for Kids', linea: 'Compass, maps and staying safe outdoors. Ages 8 to 12.', familia: 'kids', w: 722, h: 1100, asin: 'B0DTQ2K31D', regalo: 'compass-for-kids' },
    { id: '50-states', corto: '50 States Road Trip', titulo: 'The Great USA Road Trip: 50 States Workbook', linea: 'A secret letter waits in every state. Ages 8 to 12.', familia: 'kids', w: 760, h: 984, asin: '', regalo: '50-states-road-trip' },
    { id: 'secret-science', corto: 'Secret Science Agency', titulo: 'Secret Science Agency: Logic Puzzles for Teens', linea: '80 missions for ages 11 to 14.', familia: 'kids', w: 760, h: 998, asin: '', regalo: 'secret-science-agency' },
    { id: 'cursive', corto: 'Cursive Workbook', titulo: 'Cursive Workbook for Kids Ages 8-12', linea: 'Letters, words and sentences, with coloring pages.', familia: 'kids', w: 760, h: 984, asin: 'B0D6N92QZ1', regalo: 'cursive-workbook' },
];

export const img = (id: string) => `/rediseno/${id}.webp`;

export const amazon = (l: Libro) =>
    l.asin
        ? `https://www.amazon.com/dp/${l.asin}`
        : `https://www.amazon.com/s?k=${encodeURIComponent(`${l.titulo} Fun Books Publisher`)}`;

export const AMAZON_TIENDA = 'https://www.amazon.com/s?k=%22Fun+Books+Publisher%22';

export const porFamilia = (f: Familia) => LIBROS.filter((l) => l.familia === f);
export const libro = (id: string) => LIBROS.find((l) => l.id === id)!;
export const conRegalo = LIBROS.filter((l) => l.regalo);

// The gift used in the three mockups: the real Cozy Escapes bonus (public/downloads/cozy-escapes.pdf).
export const REGALO_DEMO = {
    libro: 'cozy-escapes',
    pdf: '/downloads/cozy-escapes.pdf',
    paginas: 109,
    peso: '67 MB',
    consejos: [
        'Print on one side of the paper so ink never shows through.',
        'Heavier paper (cardstock, 160 gsm or more) works best with markers.',
        'Print at 100% scale. Letter and A4 both work.',
    ],
};

// Facts we can stand behind today. No numbers of readers, no ratings.
export const HECHOS = [
    { t: 'Sold and shipped by Amazon', d: 'You buy on Amazon, with Amazon delivery and returns.' },
    { t: 'A free printable gift', d: 'Scan the QR code inside your book. No sign-up, no email.' },
    { t: 'Large print where it matters', d: 'Our books for seniors are set in large, clear type.' },
    { t: 'English and Spanish', d: 'Puzzle and memory books in both languages.' },
];
