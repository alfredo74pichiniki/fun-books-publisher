'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';

// The Meta Pixel lives ONLY on these ad landing pages for adult books (decision of the owner, 15 nov 2026),
// and it does not load until the visitor accepts. No choice, or "No thanks": no pixel and no _fbp cookie.
// The banner sits in the page flow at the top (it never covers content or the keyboard focus).

const CLAVE = 'fbp-consentimiento-anuncios';
const EVENTO = 'fbp-consentimiento';
type Eleccion = 'si' | 'no' | null;

function leer(): Eleccion {
    try {
        const v = window.localStorage.getItem(CLAVE);
        return v === 'si' || v === 'no' ? v : null;
    } catch {
        return null;
    }
}

function guardar(v: Eleccion) {
    try {
        if (v) window.localStorage.setItem(CLAVE, v);
        else window.localStorage.removeItem(CLAVE);
    } catch {
        /* private mode: the choice lasts for this page only */
    }
    window.dispatchEvent(new Event(EVENTO));
}

function useEleccion(): [Eleccion | undefined, (v: Eleccion) => void] {
    const [eleccion, setEleccion] = useState<Eleccion | undefined>(undefined);
    useEffect(() => {
        const actualizar = () => setEleccion(leer());
        actualizar();
        window.addEventListener(EVENTO, actualizar);
        return () => window.removeEventListener(EVENTO, actualizar);
    }, []);
    return [eleccion, (v) => { guardar(v); setEleccion(v); }];
}

export function PixelConConsentimiento({ asin, titulo }: { asin: string; titulo: string }) {
    const [eleccion, elegir] = useEleccion();

    return (
        <>
            {eleccion === null && (
                <section className="lp-consent" aria-labelledby="lp-consent-t">
                    <h2 id="lp-consent-t">Cookies on this page</h2>
                    <p>
                        We use the Meta Pixel on this page to measure our ads on Facebook and Instagram. It sets a
                        cookie (_fbp) only if you accept. The rest of our website has no advertising cookies.{' '}
                        <Link href="/privacy">Privacy policy</Link>
                    </p>
                    <div className="lp-consent-botones">
                        <button type="button" onClick={() => elegir('si')}>Accept</button>
                        <button type="button" onClick={() => elegir('no')}>No thanks</button>
                    </div>
                </section>
            )}
            {eleccion === 'si' && (
                <Script id="meta-pixel-lp" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1243671167851218');
                        fbq('track', 'PageView');
                        fbq('track', 'ViewContent', {
                            content_ids: [${JSON.stringify(asin)}],
                            content_name: ${JSON.stringify(titulo)},
                            content_type: 'product'
                        });
                    `}
                </Script>
            )}
        </>
    );
}

/** A small button in the landing footer to change the cookie choice. */
export function CambiarCookies() {
    const [eleccion, elegir] = useEleccion();
    if (!eleccion) return null;
    return (
        <button type="button" className="lp-consent-cambiar" onClick={() => elegir(null)}>
            Cookie choice: {eleccion === 'si' ? 'accepted' : 'declined'}. Change
        </button>
    );
}
