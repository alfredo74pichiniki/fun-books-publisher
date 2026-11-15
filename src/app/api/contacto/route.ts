// The contact form. Sends the message by email to customer service with Resend, from the verified domain
// nestdigitalstudio.com, with reply-to set to the sender so a reply goes straight to them.
// It only answers "ok" when Resend has accepted the email. Nothing is stored and nobody is subscribed to anything.
// Spam: a hidden trap field and a cap per IP address.

const PARA = 'customerservice@funbookpublisher.com';
const DE = 'Fun Books Publisher website <web@nestdigitalstudio.com>';
const POR_HORA = 5;
const enviados = new Map<string, number[]>(); // ip -> send times, per server instance

const CORREO = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function limpio(v: unknown, max: number): string | null {
    if (typeof v !== 'string') return null;
    const t = v.replace(/\r/g, '').trim();
    return t && t.length <= max ? t : null;
}

export async function POST(request: Request) {
    let d: Record<string, unknown>;
    try {
        d = await request.json();
    } catch {
        return Response.json({ ok: false, motivo: 'bad request' }, { status: 400 });
    }
    // The trap: people never see this field; simple bots fill everything in.
    if (typeof d.web === 'string' && d.web.trim() !== '') {
        return Response.json({ ok: false, motivo: 'rejected' }, { status: 400 });
    }
    const nombre = limpio(d.name, 120);
    const correo = limpio(d.email, 200);
    const mensaje = limpio(d.message, 5000);
    if (!nombre || !correo || !CORREO.test(correo) || !mensaje) {
        return Response.json({ ok: false, motivo: 'invalid' }, { status: 400 });
    }

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'desconocida';
    const ahora = Date.now();
    const recientes = (enviados.get(ip) ?? []).filter((t) => ahora - t < 3_600_000);
    if (recientes.length >= POR_HORA) {
        return Response.json({ ok: false, motivo: 'too many' }, { status: 429 });
    }

    const clave = process.env.CONTACTO_RESEND_API_KEY;
    if (!clave) return Response.json({ ok: false, motivo: 'not configured' }, { status: 503 });

    const asunto = `Website message from ${nombre.replace(/[\n\t]/g, ' ').slice(0, 80)}`;
    try {
        const r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: DE,
                to: [PARA],
                reply_to: correo,
                subject: asunto,
                text: `Name: ${nombre}\nEmail: ${correo}\nPage language: ${limpio(d.locale, 5) ?? 'en'}\n\n${mensaje}\n`,
            }),
            signal: AbortSignal.timeout(10_000),
        });
        const cuerpo = (await r.json().catch(() => ({}))) as { id?: string };
        if (!r.ok || !cuerpo.id) {
            console.error(`[contacto] Resend answered ${r.status}`);
            return Response.json({ ok: false, motivo: 'send failed' }, { status: 502 });
        }
        enviados.set(ip, [...recientes, ahora]);
        return Response.json({ ok: true });
    } catch (e) {
        console.error(`[contacto] ${(e as Error).message}`);
        return Response.json({ ok: false, motivo: 'send failed' }, { status: 502 });
    }
}
