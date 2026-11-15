'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

// Same behaviour as the live site: the form posts name, email and message to /api/newsletter with type "contact".
export default function ContactPage() {
    const es = useLocale() === 'es';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle');

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setEstado('enviando');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, message, type: 'contact' }),
            });
            if (res.ok) {
                setName('');
                setEmail('');
                setMessage('');
                setEstado('ok');
            } else {
                setEstado('error');
            }
        } catch {
            setEstado('error');
        }
    };

    return (
        <div className="aTexto">
            <h1>{es ? 'Escríbanos' : 'Get in touch'}</h1>
            <p className="aIntro">
                {es
                    ? 'Una pregunta sobre un libro, un regalo que no se descarga o cualquier otra cosa: escríbanos aquí.'
                    : 'A question about a book, a gift that will not download, or anything else: write to us here.'}
            </p>
            <form className="aForm" onSubmit={enviar}>
                <div>
                    <label htmlFor="c-nombre">{es ? 'Su nombre' : 'Your name'}</label>
                    <input id="c-nombre" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="c-correo">{es ? 'Su correo' : 'Your email'}</label>
                    <input id="c-correo" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="c-mensaje">{es ? 'Su mensaje' : 'Your message'}</label>
                    <textarea id="c-mensaje" required value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div>
                    <button className="aBtn" type="submit" disabled={estado === 'enviando'}>
                        {estado === 'enviando' ? '...' : es ? 'Enviar mensaje' : 'Send message'}
                    </button>
                    <p className="aNota" role="status" aria-live="polite">
                        {estado === 'ok' && (es ? 'Mensaje enviado. Le contestaremos pronto.' : 'Message sent. We will get back to you soon.')}
                        {estado === 'error' && (es ? 'Algo ha fallado. Inténtelo de nuevo.' : 'Something went wrong. Please try again.')}
                    </p>
                </div>
            </form>
        </div>
    );
}
