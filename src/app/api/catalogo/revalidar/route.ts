import { revalidatePath, revalidateTag } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { ETIQUETA } from '@/catalogo/cargar';

// The EMPIRE agent catalogo_fbp calls this right after it writes a new catalog, so a new book shows
// up at once instead of within the hour. Off unless FBP_REVALIDAR_SECRET is set on Vercel.
export async function POST(request: Request) {
    const secreto = process.env.FBP_REVALIDAR_SECRET ?? '';
    const dado = request.headers.get('x-revalidar') ?? '';
    const a = Buffer.from(secreto);
    const b = Buffer.from(dado);
    if (!secreto || a.length !== b.length || !timingSafeEqual(a, b)) {
        return new Response('Not found', { status: 404 });
    }
    // Expire the catalog now: the next visit rebuilds the pages with the file the agent just wrote. If the
    // file cannot be read at that moment, cargarCatalogo keeps the last good catalog (never an empty shelf).
    revalidateTag(ETIQUETA, { expire: 0 });
    revalidatePath('/[locale]', 'layout');
    return Response.json({ ok: true });
}
