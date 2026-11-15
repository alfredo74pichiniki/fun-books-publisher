import type { Catalogo, Familia, Libro } from '@/catalogo/tipos';
import { ORDEN, porFamilia } from '@/catalogo/cargar';

// Site copy in English and Spanish. Nothing here is a claim we cannot back: no ratings, no reader numbers.

export type Loc = 'en' | 'es';
export const loc = (l: string): Loc => (l === 'es' ? 'es' : 'en');

export const FAMILIA: Record<Familia, Record<Loc, { nombre: string; frase: string }>> = {
    'color-by-number': {
        en: { nombre: 'Monochrome Color by Number Mysteries', frase: 'A grid of numbered squares on every page. Fill the right ones with a single black pen and a hidden picture appears.' },
        es: { nombre: 'Monochrome Color by Number Mysteries', frase: 'Una cuadrícula de casillas numeradas en cada página. Rellene las que tocan con un solo bolígrafo negro y aparece un dibujo escondido. Libros en inglés.' },
    },
    monochrome: {
        en: { nombre: 'Monochrome coloring', frase: 'The Ink Bliss series: bold black and white art you fill with one pen. No color decisions, no mess.' },
        es: { nombre: 'Colorear en monocromo', frase: 'La serie Ink Bliss: dibujos en blanco y negro que se rellenan con un solo bolígrafo. Libros en inglés.' },
    },
    coloring: {
        en: { nombre: 'More coloring books', frase: 'Mandalas, holiday scenes and more, for adults and families.' },
        es: { nombre: 'Más libros para colorear', frase: 'Mandalas, escenas de Navidad y más. Libros en inglés.' },
    },
    mystery: {
        en: { nombre: 'Mystery puzzles', frase: 'Large print cases you solve with a pencil: cross out the suspects, follow the clues, name the killer.' },
        es: { nombre: 'Misterios para resolver', frase: 'Casos en letra grande que se resuelven con un lápiz. Libros en inglés.' },
    },
    puzzles: {
        en: { nombre: 'Word search and brain games', frase: 'Large print word searches, trivia and puzzle collections for adults and seniors.' },
        es: { nombre: 'Sopas de letras y juegos mentales', frase: 'Sopas de letras, trivia y pasatiempos en letra grande. Libros en inglés.' },
    },
    espanol: {
        en: { nombre: 'In Spanish', frase: 'Memory exercises, word searches and puzzle books in Spanish, in large print for seniors.' },
        es: { nombre: 'En español', frase: 'Ejercicios de memoria, sopas de letras y pasatiempos en español, en letra grande para personas mayores.' },
    },
    kids: {
        en: { nombre: 'Kids, screen-free', frase: 'Activity books and workbooks for ages 8 to 14 that teach something real while they play.' },
        es: { nombre: 'Para niños, sin pantallas', frase: 'Libros de actividades y cuadernos para 8 a 14 años. Libros en inglés.' },
    },
    logbooks: {
        en: { nombre: 'Large print logbooks', frase: 'Simple, clear trackers to fill in by hand and take to the doctor.' },
        es: { nombre: 'Cuadernos de registro', frase: 'Registros claros en letra grande para rellenar a mano. Libros en inglés.' },
    },
    otros: {
        en: { nombre: 'More books', frase: 'More from Fun Books Publisher.' },
        es: { nombre: 'Más libros', frase: 'Más libros de Fun Books Publisher.' },
    },
};

export const T = {
    en: {
        saltar: 'Skip to content',
        inicio: 'Fun Books Publisher, home',
        menu: 'Main',
        libros: 'Books',
        regalos: 'Free gifts',
        sobre: 'About',
        tienda: 'Shop on Amazon',
        otroIdioma: 'Español',
        heroTitulo: 'Books you do, not just read.',
        heroTexto: 'Coloring for adults, mystery puzzles, memory games for seniors and screen-free adventures for kids. Printed and delivered by Amazon, and many come with a free printable gift.',
        verLibros: 'See all books',
        escaneeQR: 'I scanned a QR code',
        escaparate: 'Five of our books on a shelf',
        hechos: [
            { t: 'Sold and shipped by Amazon', d: 'You buy on Amazon, with Amazon delivery and returns.' },
            { t: 'A free printable gift', d: 'Scan the QR code inside your book. No sign-up, no email.' },
            { t: 'Large print where it matters', d: 'Our books for seniors are set in large, clear type.' },
            { t: 'English and Spanish', d: 'Puzzle books in both languages, and memory exercises in Spanish.' },
        ],
        hechosLabel: 'What to expect',
        novedades: 'Just published',
        novedadesTexto: 'This shelf updates itself from Amazon when a new book comes out.',
        novedadesFijo: 'Our latest books, the newest first.',
        masNombre: 'More books',
        mas: (n: number) => `+${n} more: see the whole series`,
        nuevo: 'New',
        publicado: 'Published',
        cbnEtiqueta: 'The new series',
        cbnTitulo: 'One pen. A grid of numbers. A picture nobody has seen yet.',
        cbnTexto: 'Each page of the Monochrome Color by Number Mysteries is a grid of numbered squares. Fill the right ones in black and a hidden picture appears, square by square. 100 pictures per book.',
        cbnVer: 'See the five books',
        foco: 'Under the lamp',
        focoLabel: 'featured books',
        comprar: 'Buy on Amazon',
        detalles: 'Details',
        verRegalo: 'Get its free gift',
        estanteria: 'The whole shelf',
        estanteriaTexto: (n: number) => `All ${n} books, by series. Tap a cover to see the book.`,
        verTodo: 'See every book',
        librosN: (n: number) => (n === 1 ? '1 book' : `${n} books`),
        regalosTitulo: 'Scanned the QR code in your book?',
        regalosTexto: 'Pick your book and download its gift. No sign-up, no email, nothing to pay.',
        espanolTitulo: '¿Prefiere leer en español?',
        espanolTexto: 'Ejercicios de memoria, sopas de letras y pasatiempos en letra grande.',
        espanolBoton: 'Ver los libros en español',
        sobreTitulo: 'A small publisher of things to do',
        sobreTexto: 'We make activity books for adults, seniors and kids: pages to color with one pen, cases to solve with a pencil, puzzles in large print and workbooks that teach something real.',
        tiendaTodo: 'Shop all books on Amazon',
        pie: 'Fun Books Publisher LLC, Wyoming, USA. Our books are printed and sold by Amazon.',
        pieNav: 'Footer',
        contacto: 'Contact',
        faq: 'FAQ',
        blog: 'Blog',
        privacidad: 'Privacy',
        terminos: 'Terms',
        devoluciones: 'Refunds',
        catTitulo: 'All our books',
        catTexto: (n: number) => `${n} books, all on Amazon. The newest are first in each series.`,
        catSaltar: 'Jump to a series',
        detalleSerie: 'Series',
        detalleIdioma: 'Language',
        detalleFormatos: 'Formats on Amazon',
        detallePublicado: 'Published',
        detalleTituloAmazon: 'Full title on Amazon',
        detalleMas: 'More from this series',
        detalleVolver: 'All books',
        idiomaEn: 'English',
        idiomaEs: 'Spanish',
        formato: { paperback: 'Paperback', hardcover: 'Hardcover', kindle: 'Kindle' },
        regaloCaja: 'This book has a free printable gift. The QR code is inside the book.',
        portadaDe: (t: string) => `Cover of ${t}`,
    },
    es: {
        saltar: 'Saltar al contenido',
        inicio: 'Fun Books Publisher, inicio',
        menu: 'Principal',
        libros: 'Libros',
        regalos: 'Regalos',
        sobre: 'Quiénes somos',
        tienda: 'Comprar en Amazon',
        otroIdioma: 'English',
        heroTitulo: 'Libros para hacer, no solo para leer.',
        heroTexto: 'Libros para colorear, misterios, juegos de memoria para mayores y aventuras sin pantallas para niños. Los imprime y entrega Amazon, y muchos traen un regalo gratis para imprimir.',
        verLibros: 'Ver todos los libros',
        escaneeQR: 'He escaneado un código QR',
        escaparate: 'Cinco de nuestros libros en una estantería',
        hechos: [
            { t: 'Los vende y envía Amazon', d: 'Compra en Amazon, con su envío y sus devoluciones.' },
            { t: 'Un regalo para imprimir', d: 'Escanee el código QR de su libro. Sin registro y sin correo.' },
            { t: 'Letra grande donde hace falta', d: 'Los libros para mayores llevan letra grande y clara.' },
            { t: 'En inglés y en español', d: 'Pasatiempos en los dos idiomas y ejercicios de memoria en español.' },
        ],
        hechosLabel: 'Lo que encontrará',
        novedades: 'Recién publicados',
        novedadesTexto: 'Esta balda se actualiza sola desde Amazon cuando sale un libro nuevo.',
        novedadesFijo: 'Nuestros últimos libros, del más nuevo al más antiguo.',
        masNombre: 'Más libros',
        mas: (n: number) => `${n} más: ver la serie entera`,
        nuevo: 'Nuevo',
        publicado: 'Publicado',
        cbnEtiqueta: 'La serie nueva',
        cbnTitulo: 'Un bolígrafo. Una cuadrícula de números. Un dibujo que nadie ha visto.',
        cbnTexto: 'Cada página de Monochrome Color by Number Mysteries es una cuadrícula de casillas numeradas. Rellene las que tocan en negro y aparece un dibujo escondido. 100 dibujos por libro. Libros en inglés.',
        cbnVer: 'Ver los cinco libros',
        foco: 'Bajo la lámpara',
        focoLabel: 'libros destacados',
        comprar: 'Comprar en Amazon',
        detalles: 'Detalles',
        verRegalo: 'Descargar su regalo',
        estanteria: 'La estantería entera',
        estanteriaTexto: (n: number) => `Los ${n} libros, por series. Toque una portada para ver el libro.`,
        verTodo: 'Ver todos los libros',
        librosN: (n: number) => (n === 1 ? '1 libro' : `${n} libros`),
        regalosTitulo: '¿Ha escaneado el código QR de su libro?',
        regalosTexto: 'Elija su libro y descargue su regalo. Sin registro, sin correo y sin pagar nada.',
        espanolTitulo: 'Prefer to read in English?',
        espanolTexto: 'Most of our books are in English: coloring, mysteries, puzzles and books for kids.',
        espanolBoton: 'See the books in English',
        sobreTitulo: 'Una pequeña editorial de cosas para hacer',
        sobreTexto: 'Hacemos libros de actividades para adultos, mayores y niños: páginas para colorear con un bolígrafo, casos para resolver con un lápiz, pasatiempos en letra grande y cuadernos que enseñan algo de verdad.',
        tiendaTodo: 'Todos los libros en Amazon',
        pie: 'Fun Books Publisher LLC, Wyoming, EE. UU. Nuestros libros los imprime y vende Amazon.',
        pieNav: 'Pie de página',
        contacto: 'Contacto',
        faq: 'Preguntas',
        blog: 'Blog',
        privacidad: 'Privacidad',
        terminos: 'Condiciones',
        devoluciones: 'Devoluciones',
        catTitulo: 'Todos nuestros libros',
        catTexto: (n: number) => `${n} libros, todos en Amazon. Los más nuevos van primero en cada serie.`,
        catSaltar: 'Ir a una serie',
        detalleSerie: 'Serie',
        detalleIdioma: 'Idioma',
        detalleFormatos: 'Formatos en Amazon',
        detallePublicado: 'Publicado',
        detalleTituloAmazon: 'Título completo en Amazon',
        detalleMas: 'Más de esta serie',
        detalleVolver: 'Todos los libros',
        idiomaEn: 'Inglés',
        idiomaEs: 'Español',
        formato: { paperback: 'Tapa blanda', hardcover: 'Tapa dura', kindle: 'Kindle' },
        regaloCaja: 'Este libro trae un regalo gratis para imprimir. El código QR está dentro del libro.',
        portadaDe: (t: string) => `Portada de ${t}`,
    },
} as const;

export type Textos = (typeof T)['en'];
export const textos = (l: string) => T[loc(l)] as unknown as Textos;

export const AMAZON_TIENDA = 'https://www.amazon.com/s?k=%22Fun+Books+Publisher%22&i=stripbooks';

export function fechaCorta(iso: string | null, l: Loc): string {
    if (!iso) return '';
    const d = new Date(`${iso}T12:00:00Z`);
    return d.toLocaleDateString(l === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export type Grupo = { clave: string; nombre: string; frase: string; libros: Libro[]; familias: Familia[] };

// The series as shelves. Series with fewer than 4 books share one last shelf, so no shelf looks empty.
export function grupos(c: Catalogo, l: Loc): Grupo[] {
    const grandes: Grupo[] = [];
    const pequenas: Familia[] = [];
    for (const f of ORDEN) {
        const libros = porFamilia(c, f);
        if (!libros.length) continue;
        if (libros.length >= 4) grandes.push({ clave: f, nombre: FAMILIA[f][l].nombre, frase: FAMILIA[f][l].frase, libros, familias: [f] });
        else pequenas.push(f);
    }
    if (pequenas.length === 1) {
        const f = pequenas[0];
        grandes.push({ clave: f, nombre: FAMILIA[f][l].nombre, frase: FAMILIA[f][l].frase, libros: porFamilia(c, f), familias: [f] });
    } else if (pequenas.length > 1) {
        const nombres = pequenas.map((f) => FAMILIA[f][l].nombre.toLowerCase());
        const lista = `${nombres.slice(0, -1).join(', ')} ${l === 'es' ? 'y' : 'and'} ${nombres[nombres.length - 1]}`;
        grandes.push({
            clave: 'more',
            nombre: T[l].masNombre,
            frase: `${l === 'es' ? 'Incluye' : 'Includes'} ${lista}.`,
            libros: pequenas.flatMap((f) => porFamilia(c, f)),
            familias: pequenas,
        });
    }
    return grandes;
}
