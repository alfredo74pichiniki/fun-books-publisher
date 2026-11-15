// The FBP catalog. Facts come from Amazon (Amazon Ads product metadata, read by the catalogo_fbp agent
// on the EMPIRE server once a day). The site only adds what Amazon does not say: a short honest line,
// a sharper cover file and the free gift page of each book (src/catalogo/editorial.ts).

export type Familia =
    | 'color-by-number'
    | 'monochrome'
    | 'coloring'
    | 'mystery'
    | 'puzzles'
    | 'espanol'
    | 'kids'
    | 'logbooks'
    | 'otros';

export type Idioma = 'en' | 'es';

/** One book as the agent writes it (catalogo/fbp.json in Vercel Blob, or the copy in this repo). */
export type LibroFuente = {
    asin: string;
    slug: string;
    titulo: string; // full Amazon title
    corto: string;
    subtitulo: string;
    serieAmazon: string;
    idioma: Idioma;
    familia: Familia;
    formatos: Partial<Record<'paperback' | 'hardcover' | 'kindle', string>>;
    portada: string; // https://m.media-amazon.com/images/I/<id>.jpg (387 x 500)
    publicado: string | null; // YYYY-MM-DD
    disponible: boolean;
    marca: 'Fun Books Publisher';
};

export type CatalogoFuente = {
    version: 1;
    fuente: string;
    marca: 'Fun Books Publisher';
    generado: string;
    libros: LibroFuente[];
};

/** A book ready to render: source facts plus the editorial layer. */
export type Libro = LibroFuente & {
    slugFuente: string; // the agent's automatic slug: still answers, with a redirect
    nombre: string; // display name
    linea: string; // one honest line about what is inside
    img: { src: string; w: number; h: number; nitida: boolean };
    regalo?: string; // /bonus/<slug>
    amazon: string; // product page of the main format
    nuevo: boolean; // published in the last 60 days
};

export type Catalogo = {
    libros: Libro[];
    generado: string;
    origen: 'en-linea' | 'copia';
};
