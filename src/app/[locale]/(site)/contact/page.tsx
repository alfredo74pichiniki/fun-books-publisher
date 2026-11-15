'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

// The form sends the message by email to customer service (/api/contacto). It says "sent" only when the
// email really left; nothing is stored and nobody is added to any list.
export default function ContactPage() {
    const locale = useLocale();
    const es = locale === 'es';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [web, setWeb] = useState(''); // trap field, hidden from people
    const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error' | 'muchos'>('idle');

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setEstado('enviando');
        try {
            const res = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, web, locale }),
            });
            const d = (await res.json().catch(() => ({}))) as { ok?: boolean };
            if (res.ok && d.ok) {
                setName('');
                setEmail('');
                setMessage('');
                setEstado('ok');
            } else {
                setEstado(res.status === 429 ? 'muchos' : 'error');
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
                    ? 'Una pregunta sobre un libro, un regalo que no se descarga o cualquier otra cosa: escríbanos aquí y le contestaremos a su correo.'
                    : 'A question about a book, a gift that will not download, or anything else: write to us here and we will reply to your email.'}
            </p>
            <form className="aForm" onSubmit={enviar}>
                <div>
                    <label htmlFor="c-nombre">{es ? 'Su nombre' : 'Your name'}</label>
                    <input id="c-nombre" type="text" autoComplete="name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="c-correo">{es ? 'Su correo' : 'Your email'}</label>
                    <input id="c-correo" type="email" autoComplete="email" required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="c-mensaje">{es ? 'Su mensaje' : 'Your message'}</label>
                    <textarea id="c-mensaje" required maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="aTrampa" aria-hidden="true">
                    <label htmlFor="c-web">Leave this field empty</label>
                    <input id="c-web" type="text" tabIndex={-1} autoComplete="off" value={web} onChange={(e) => setWeb(e.target.value)} />
                </div>
                <div>
                    <button className="aBtn" type="submit" disabled={estado === 'enviando'}>
                        {estado === 'enviando' ? (es ? 'Enviando...' : 'Sending...') : es ? 'Enviar mensaje' : 'Send message'}
                    </button>
                    <p className="aNota" role="status" aria-live="polite">
                        {estado === 'ok' && (es ? 'Mensaje enviado. Le contestaremos a su correo.' : 'Message sent. We will reply to your email.')}
                        {estado === 'error' && (
                            <>
                                {es ? 'No se ha podido enviar. Inténtelo de nuevo en unos minutos o escríbanos a ' : 'The message could not be sent. Please try again in a few minutes, or email us at '}
                                <a href="mailto:customerservice@funbookpublisher.com">customerservice@funbookpublisher.com</a>.
                            </>
                        )}
                        {estado === 'muchos' && (es ? 'Ha enviado varios mensajes seguidos. Inténtelo de nuevo dentro de una hora.' : 'You have sent several messages in a row. Please try again in an hour.')}
                    </p>
                </div>
            </form>
        </div>
    );
}
