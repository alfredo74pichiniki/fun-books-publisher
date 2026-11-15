'use client';

import { useState } from 'react';

// Newsletter sign-up. Same behaviour as the live site: POST /api/newsletter with the email.
export function Boletin({ t }: { t: { titulo: string; texto: string; correo: string; boton: string; ok: string; error: string; priv: string } }) {
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle');

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setEstado('enviando');
        try {
            const r = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (r.ok) {
                setEmail('');
                setEstado('ok');
            } else {
                setEstado('error');
            }
        } catch {
            setEstado('error');
        }
    };

    return (
        <section className="aBoletin" aria-labelledby="a-boletin">
            <div>
                <h2 id="a-boletin">{t.titulo}</h2>
                <p>{t.texto}</p>
            </div>
            <form onSubmit={enviar} noValidate={false}>
                <label htmlFor="a-boletin-correo">{t.correo}</label>
                <div className="aBoletinFila">
                    <input
                        id="a-boletin-correo"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="aBtn" type="submit" disabled={estado === 'enviando'}>
                        {estado === 'enviando' ? '...' : t.boton}
                    </button>
                </div>
                <p className="aNota" role="status" aria-live="polite">
                    {estado === 'ok' ? t.ok : estado === 'error' ? t.error : t.priv}
                </p>
            </form>
        </section>
    );
}
