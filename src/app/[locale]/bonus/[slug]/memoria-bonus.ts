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
};

export const MEMORIA_BONUSES: Record<string, MemoriaBonus> = {
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
    },
};

export const MEMORIA_SLUGS = Object.keys(MEMORIA_BONUSES);
