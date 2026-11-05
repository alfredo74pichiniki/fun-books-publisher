// Gift for "Ejercicios de Memoria para Personas Mayores Volumen 2" (Fun Books Publisher, Spanish). The URL is printed
// as a QR on page 111 of the book, so THE SLUG IS PERMANENT. Published with Alfredo's OK on 4 Nov 2026.
// The page is in Spanish whatever the locale: the reader of the book reads Spanish.
// Direct download, no email capture (KDP bonus content rules, G202018960). If the PDF changes, update pages and size.

export type MemoriaBonus = {
    slug: string;
    title: string;
    subtitle: string;
    pdf: string;
    cover: string;
    pages: number;
    size: string;
    steps: { name: string; how: string }[];
    inside: string[];
    /** Book name as the reader knows it, e.g. "Ejercicios de Memoria, Volumen 2". */
    book: string;
    /** Alt text of the cover image. */
    coverAlt: string;
    /** One English sentence for the caregiver who reads English. */
    english: string;
};

export const MEMORIA_BONUSES: Record<string, MemoriaBonus> = {
    // Volume 1 (ASIN B0DH3Q9XN6), QR on page 136 of the 138-page interior (Nov 2026). Published with Alfredo's OK on 5 Nov 2026.
    'ejercicios-memoria': {
        slug: 'ejercicios-memoria',
        title: '100 pasatiempos para imprimir',
        subtitle:
            'Sopas de letras, crucigramas, laberintos, anagramas y sudokus que no están en el libro, con todas las soluciones al final',
        pdf: '/downloads/ejercicios-memoria-regalo.pdf',
        cover: '/covers/ejercicios-memoria/regalo.jpg',
        pages: 158,
        size: '2,2 MB',
        steps: [
            {
                name: 'Imprima',
                how: 'En hojas tamaño carta, en blanco y negro. Puede imprimir solo las páginas que quiera, las veces que quiera.',
            },
            { name: 'Elija un juego', how: 'Hay 20 de cada tipo. En la página 2 están el índice y cómo se juega cada uno.' },
            { name: 'Sin prisa', how: 'Uno o dos al día, solo o en compañía. No hace falta terminarlos todos.' },
            { name: 'Compruebe', how: 'Todas las soluciones están al final, desde la página 123.' },
        ],
        inside: [
            '20 sopas de letras de temas cotidianos',
            '20 crucigramas con definiciones sencillas',
            '20 laberintos',
            '20 juegos de anagramas: palabras con las letras revueltas, con casillas grandes para escribir',
            '20 sudokus de nivel fácil y medio',
            'Todas las soluciones al final',
        ],
        book: 'Ejercicios de Memoria para Personas Mayores',
        coverAlt: 'Tres hojas del regalo: una sopa de letras, un crucigrama de utensilios de cocina y un sudoku',
        english:
            'In English: a printable gift for readers of our Spanish memory workbook for seniors. 100 puzzles in Spanish (word searches, crosswords, mazes, anagrams and sudokus), with all the answers at the back.',
    },
    'ejercicios-memoria-2': {
        slug: 'ejercicios-memoria-2',
        title: 'Mi libro de vida y 20 ejercicios fáciles',
        subtitle:
            'Hojas para imprimir en casa que no están en el libro: recuerdos, recetas y consejos para rellenar juntos, y 20 ejercicios de una estrella',
        pdf: '/downloads/ejercicios-memoria-2-regalo.pdf',
        cover: '/covers/ejercicios-memoria-2/regalo.jpg',
        pages: 40,
        size: '100 KB',
        steps: [
            { name: 'Imprima', how: 'En hojas tamaño carta, en blanco y negro. Puede imprimirlas tantas veces como quiera.' },
            {
                name: 'Rellénenlas juntos',
                how: 'Una o dos hojas por día, sin prisa. Puede escribir la persona mayor o un familiar mientras escucha.',
            },
            { name: 'Pegue fotos', how: 'Cada recuadro es para una foto. Si no hay foto, vale un dibujo.' },
            { name: 'Siga con los ejercicios', how: '20 ejercicios fáciles, de una estrella, con sus soluciones al final.' },
        ],
        inside: [
            'Mi libro de vida: 14 hojas con preguntas sobre la familia, la casa de la infancia, el trabajo, la comida, la música, las fiestas y los consejos para los nietos',
            'Recuadros para pegar fotos o hacer dibujos',
            'Todas las preguntas son opcionales: se salta la que no quiera contestar',
            '20 ejercicios extra de una estrella, distintos de los del libro: memoria, atención, lenguaje, cálculo y razonamiento',
            'Letra grande, como en el libro, y todas las soluciones al final',
        ],
        book: 'Ejercicios de Memoria para Personas Mayores, Volumen 2',
        coverAlt: 'Tres hojas del regalo: Así soy yo, un ejercicio de una estrella y La casa de mi infancia',
        english:
            'In English: a printable gift for readers of our Spanish memory workbook for seniors. “My life story” pages to fill in together, plus 20 easy exercises with answers.',
    },
};

export const MEMORIA_SLUGS = Object.keys(MEMORIA_BONUSES);
