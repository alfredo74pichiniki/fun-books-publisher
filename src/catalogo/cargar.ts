import copia from './catalogo-fbp.json';
import { CatalogoInvalido, componer, validar } from './puro';
import type { Catalogo, CatalogoFuente } from './tipos';

export { alDia, buscar, ORDEN, porFamilia, recientes } from './puro';

// Where the catalog comes from, in this order:
// 1. FBP_CATALOGO_URL: the public catalogo/fbp.json that the EMPIRE agent catalogo_fbp rewrites every day
//    from Amazon. Cached for an hour (tag 'catalogo-fbp'). When the hour is up, Next.js keeps serving the
//    cached copy while it fetches a new one, so a source that is down at that moment changes nothing.
//    The agent can ask for an instant refresh (/api/catalogo/revalidar), which first checks that the new
//    file is readable and valid, and only then drops the cache.
// 2. The copy in this repo (src/catalogo/catalogo-fbp.json), used when (1) is not set, and as the floor
//    if (1) cannot be read and this server has not read a good catalog yet.
// A broken book is left out on its own (puro.ts); the site never goes empty and never shows another pen name.

export const ETIQUETA = 'catalogo-fbp';

const COPIA = validar(copia, console.warn);
// The last catalog this server instance read and validated. Used if the source fails later.
let ultimoBueno: CatalogoFuente | null = null;
let dichoEnBuild = false;

const masNuevo = (c: CatalogoFuente) => (c.generado >= COPIA.generado ? c : COPIA);

/** Reads the online catalog and checks it. Throws if it cannot be read or is not valid. */
export async function leerEnLinea(url: string, init: RequestInit): Promise<CatalogoFuente> {
    const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new CatalogoInvalido(`HTTP ${r.status}`);
    return validar(await r.json(), console.warn);
}

export async function cargarCatalogo(): Promise<Catalogo> {
    const url = process.env.FBP_CATALOGO_URL;
    if (!url) return componer(COPIA, 'copia');
    try {
        const enLinea = masNuevo(await leerEnLinea(url, { next: { revalidate: 3600, tags: [ETIQUETA] } }));
        if (enLinea !== COPIA) ultimoBueno = enLinea;
        if (process.env.NEXT_PHASE === 'phase-production-build' && !dichoEnBuild) {
            dichoEnBuild = true; // one line in the build log says where the catalog came from
            console.log(`[catalogo] build reads the ${enLinea === COPIA ? 'repo copy (newer)' : 'online catalog'}: ${enLinea.libros.length} books, generated ${enLinea.generado}`);
        }
        return componer(enLinea, enLinea === COPIA ? 'copia' : 'en-linea');
    } catch (e) {
        console.warn(`[catalogo] online catalog unreadable (${(e as Error).message}): using the last good one`);
        return ultimoBueno ? componer(ultimoBueno, 'en-linea') : componer(COPIA, 'copia');
    }
}
