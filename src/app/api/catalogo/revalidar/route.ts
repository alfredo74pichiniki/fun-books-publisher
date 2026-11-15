import { revalidatePath, revalidateTag } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { ETIQUETA, leerEnLinea } from '@/catalogo/cargar';

// The EMPIRE agent catalogo_fbp calls this right after it writes a new catalog, so a new book shows
// up at once instead of within the hour. Off unless FBP_REVALIDAR_SECRET is set on Vercel.
export async function POST(request: Request) {
    const secreto = process.env.FBP_REVALIDAR_SECRET ?? '';
    const dado = request.headers.get('x-revalidar') ?? '';
    const a = Buffer.from(secreto);
    const b = Buffer.from(dado);
    const url = process.env.FBP_CATALOGO_URL;
    if (!secreto || !url || a.length !== b.length || !timingSafeEqual(a, b)) {
        return new Response('Not found', { status: 404 });
    }
    // Drop the cache only if the new file can be read and is valid right now. Otherwise the pages keep
    // the catalog they have: a refresh must never trade good books for an empty or broken shelf.
    try {
        const nuevo = await leerEnLinea(url, { cache: 'no-store' });
        revalidateTag(ETIQUETA, { expire: 0 });
        revalidatePath('/[locale]', 'layout');
        return Response.json({ ok: true, libros: nuevo.libros.length });
    } catch (e) {
        return Response.json({ ok: false, motivo: (e as Error).message }, { status: 409 });
    }
}
