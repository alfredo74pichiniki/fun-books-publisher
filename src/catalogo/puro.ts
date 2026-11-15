import { EDITORIAL, SLUGS_ANTIGUOS } from './editorial';
import { PORTADAS_NITIDAS } from './portadas';
import type { Catalogo, CatalogoFuente, Familia, Libro, LibroFuente } from './tipos';

// The pure part of the catalog: checking the file and adding the editorial layer. No network, no Next.js,
// so it is tested on its own (scripts/catalogo.test.ts, `npm run test:catalogo`).

const FAMILIAS: Familia[] = ['color-by-number', 'monochrome', 'coloring', 'mystery', 'puzzles', 'espanol', 'kids', 'logbooks', 'otros'];
// Books of other pen names that live in the same Amazon account. Never on this site, whatever the file says.
// Same list as FUERA in empire/fbp_catalogo.py (EMPIRE): keep both equal.
export const NUNCA = new Set(['B0FCS2XH6H', 'B0FB3XC3DF', 'B0F4K94XXJ', 'B0F1NB5CZV', 'B0FDG2RFVC', 'B0CVHNNYDT', 'B0D6FMD98N', 'B0CZHYM7S7']);
const ASIN = /^[A-Z0-9]{10}$/;
const PORTADA = /^https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+%-]+\.(jpg|png)$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const MIN_LIBROS = 10;
const DIAS_NUEVO = 60;

export class CatalogoInvalido extends Error {}

function texto(v: unknown, max: number): v is string {
    return typeof v === 'string' && v.trim().length > 0 && v.length <= max;
}

/** Why one book cannot be shown, or null if it is fine. */
export function defecto(l: LibroFuente | null | undefined, vistos: Set<string>): string | null {
    if (!l || typeof l !== 'object') return 'not a book';
    if (typeof l.asin !== 'string' || !ASIN.test(l.asin)) return `bad ASIN ${String(l.asin)}`;
    if (NUNCA.has(l.asin)) return `${l.asin} belongs to another pen name`;
    if (l.marca !== 'Fun Books Publisher') return `${l.asin} is not FBP`;
    if (!texto(l.titulo, 400) || !texto(l.corto, 200)) return `${l.asin} has no title`;
    if (typeof l.slug !== 'string' || !SLUG.test(l.slug) || vistos.has(l.slug)) return `${l.asin} bad or repeated slug`;
    if (typeof l.portada !== 'string' || !PORTADA.test(l.portada)) return `${l.asin} bad cover`;
    if (l.idioma !== 'en' && l.idioma !== 'es') return `${l.asin} bad language`;
    if (!FAMILIAS.includes(l.familia)) return `${l.asin} bad family`;
    if (!l.formatos || typeof l.formatos !== 'object') return `${l.asin} no formats`;
    for (const a of Object.values(l.formatos)) if (typeof a !== 'string' || !ASIN.test(a)) return `${l.asin} bad format ASIN`;
    return null;
}

/**
 * Keeps every well formed FBP book and drops only the broken ones (a single bad entry never takes the
 * whole shelf down). Throws CatalogoInvalido if the file is not an FBP catalog or too few books survive.
 */
export function validar(datos: unknown, avisar: (m: string) => void = () => {}): CatalogoFuente {
    const d = datos as CatalogoFuente;
    if (!d || d.version !== 1 || d.marca !== 'Fun Books Publisher' || !Array.isArray(d.libros) || typeof d.generado !== 'string') {
        throw new CatalogoInvalido('not an FBP catalog, version 1');
    }
    const vistos = new Set<string>();
    const libros: LibroFuente[] = [];
    for (const l of d.libros) {
        const malo = defecto(l, vistos);
        if (malo) {
            avisar(`[catalogo] book left out: ${malo}`);
            continue;
        }
        vistos.add(l.slug);
        libros.push(l);
    }
    if (libros.length < MIN_LIBROS) throw new CatalogoInvalido(`only ${libros.length} good books`);
    return { ...d, libros };
}

function dias(desde: string | null, hasta: Date): number {
    if (!desde) return Infinity;
    return (hasta.getTime() - new Date(`${desde}T00:00:00Z`).getTime()) / 86_400_000;
}

/** Source facts plus the editorial layer. Books Amazon no longer sells are left out. */
export function componer(fuente: CatalogoFuente, origen: Catalogo['origen'], hoy = new Date()): Catalogo {
    const usados = new Set<string>();
    const libros: Libro[] = fuente.libros
        .filter((f) => f.disponible !== false)
        .map((f) => {
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
