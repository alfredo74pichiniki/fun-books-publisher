import copia from './catalogo-fbp.json';
import { EDITORIAL, SLUGS_ANTIGUOS } from './editorial';
import { PORTADAS_NITIDAS } from './portadas';
import type { Catalogo, CatalogoFuente, Familia, Libro, LibroFuente } from './tipos';

// Where the catalog comes from, in this order:
// 1. FBP_CATALOGO_URL: the public catalogo/fbp.json that the EMPIRE agent catalogo_fbp rewrites every day
//    from Amazon. Cached for an hour (tag 'catalogo-fbp'); the agent can ask for an instant refresh.
// 2. The copy in this repo (src/catalogo/catalogo-fbp.json), used when (1) is not set, and at build time
//    if (1) cannot be read.
// If (1) cannot be read or is not valid, the site keeps the last good catalog it read, or the repo copy.
// The site never goes empty, never shows another pen name and never fails because a source is down.

export const ETIQUETA = 'catalogo-fbp';
const FAMILIAS: Familia[] = ['color-by-number', 'monochrome', 'coloring', 'mystery', 'puzzles', 'espanol', 'kids', 'logbooks', 'otros'];
// Books of other pen names that live in the same Amazon account. Never on this site, whatever the file says.
const NUNCA = new Set(['B0FCS2XH6H', 'B0FB3XC3DF', 'B0F4K94XXJ', 'B0F1NB5CZV', 'B0FDG2RFVC', 'B0CVHNNYDT', 'B0D6FMD98N', 'B0CZHYM7S7']);
const ASIN = /^[A-Z0-9]{10}$/;
const PORTADA = /^https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+%-]+\.(jpg|png)$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MIN_LIBROS = 10;
const DIAS_NUEVO = 60;

export class CatalogoInvalido extends Error {}

function texto(v: unknown, max: number): v is string {
    return typeof v === 'string' && v.trim().length > 0 && v.length <= max;
}

/** Throws CatalogoInvalido unless every book is well formed and every book is FBP's. */
export function validar(datos: unknown): CatalogoFuente {
    const d = datos as CatalogoFuente;
    if (!d || d.version !== 1 || d.marca !== 'Fun Books Publisher' || !Array.isArray(d.libros)) {
        throw new CatalogoInvalido('not an FBP catalog, version 1');
    }
    if (d.libros.length < MIN_LIBROS) throw new CatalogoInvalido(`only ${d.libros.length} books`);
    const vistos = new Set<string>();
    const libros: LibroFuente[] = [];
    for (const l of d.libros) {
        if (!l || !ASIN.test(l.asin) || NUNCA.has(l.asin)) throw new CatalogoInvalido(`bad or foreign ASIN ${l?.asin}`);
        if (l.marca !== 'Fun Books Publisher') throw new CatalogoInvalido(`${l.asin} is not FBP`);
        if (!texto(l.titulo, 400) || !texto(l.corto, 200)) throw new CatalogoInvalido(`${l.asin} has no title`);
        if (!SLUG.test(l.slug) || vistos.has(l.slug)) throw new CatalogoInvalido(`${l.asin} bad slug`);
        if (!PORTADA.test(l.portada)) throw new CatalogoInvalido(`${l.asin} bad cover`);
        if (l.idioma !== 'en' && l.idioma !== 'es') throw new CatalogoInvalido(`${l.asin} bad language`);
        if (!FAMILIAS.includes(l.familia)) throw new CatalogoInvalido(`${l.asin} bad family`);
        for (const a of Object.values(l.formatos ?? {})) if (!ASIN.test(a ?? '')) throw new CatalogoInvalido(`${l.asin} bad format ASIN`);
        vistos.add(l.slug);
        libros.push(l);
    }
    return { ...d, libros };
}

function dias(desde: string | null, hasta: Date): number {
    if (!desde) return Infinity;
    return (hasta.getTime() - new Date(`${desde}T00:00:00Z`).getTime()) / 86_400_000;
}

/** Source facts plus the editorial layer. */
export function componer(fuente: CatalogoFuente, origen: Catalogo['origen'], hoy = new Date()): Catalogo {
    const usados = new Set<string>();
    const libros: Libro[] = fuente.libros.map((f) => {
        const e = EDITORIAL[f.asin] ?? {};
        const slug = e.slug && !usados.has(e.slug) ? e.slug : f.slug;
        usados.add(slug);
        const nitida = PORTADAS_NITIDAS[f.asin];
        return {
            ...f,
            slug,
            slugFuente: f.slug,
            familia: e.familia ?? f.familia,
            idioma: e.idioma ?? f.idioma,
            nombre: e.nombre ?? f.corto,
            linea: e.linea ?? f.subtitulo,
            img: nitida
                ? { src: `/portadas/${f.asin}.webp`, w: nitida[0], h: nitida[1], nitida: true }
                : { src: f.portada, w: 387, h: 500, nitida: false },
            regalo: e.regalo,
            amazon: `https://www.amazon.com/dp/${f.formatos.paperback ?? f.asin}`,
            nuevo: dias(f.publicado, hoy) <= DIAS_NUEVO,
        };
    });
    // A slug taken by the editorial layer must not collide with an automatic one.
    const vistos = new Set<string>();
    for (const l of libros) {
        let s = l.slug;
        for (let n = 2; vistos.has(s); n++) s = `${l.slug}-${n}`;
        l.slug = s;
        vistos.add(s);
    }
    return { libros, generado: fuente.generado, origen };
}

const COPIA = validar(copia);
// The last catalog this server instance read and validated. Used if the source fails later.
let ultimoBueno: CatalogoFuente | null = null;

export async function cargarCatalogo(): Promise<Catalogo> {
    const url = process.env.FBP_CATALOGO_URL;
    if (!url) return componer(COPIA, 'copia');
    try {
        const r = await fetch(url, { next: { revalidate: 3600, tags: [ETIQUETA] }, signal: AbortSignal.timeout(8000) });
        if (!r.ok) throw new CatalogoInvalido(`HTTP ${r.status}`);
        const enLinea = validar(await r.json());
        if (enLinea.generado >= COPIA.generado) ultimoBueno = enLinea;
        // Never go back in time: if the repo copy is newer than the online file, the copy wins.
        return enLinea.generado >= COPIA.generado ? componer(enLinea, 'en-linea') : componer(COPIA, 'copia');
    } catch (e) {
        // Source down or file broken: keep the last good catalog this server has read; if it has none
        // (a fresh instance), use the copy in the repo. The shelf is never empty and the page never fails.
        console.warn(`[catalogo] online catalog unreadable (${(e as Error).message}): using the last good one`);
        return ultimoBueno ? componer(ultimoBueno, 'en-linea') : componer(COPIA, 'copia');
    }
}

export const ORDEN: Familia[] = ['color-by-number', 'monochrome', 'mystery', 'puzzles', 'espanol', 'kids', 'coloring', 'logbooks', 'otros'];

export function porFamilia(c: Catalogo, f: Familia): Libro[] {
    return c.libros.filter((l) => l.familia === f);
}

export function buscar(c: Catalogo, slug: string): { libro?: Libro; canonico: boolean } {
    const directo = c.libros.find((l) => l.slug === slug);
    if (directo) return { libro: directo, canonico: true };
    const asin = SLUGS_ANTIGUOS[slug] ?? slug.toUpperCase();
    const otro = c.libros.find((l) => l.slugFuente === slug || l.asin === asin || Object.values(l.formatos).includes(asin));
    return { libro: otro, canonico: false };
}

export function recientes(c: Catalogo, n: number): Libro[] {
    return [...c.libros].filter((l) => l.publicado).sort((a, b) => (b.publicado! > a.publicado! ? 1 : -1)).slice(0, n);
}
