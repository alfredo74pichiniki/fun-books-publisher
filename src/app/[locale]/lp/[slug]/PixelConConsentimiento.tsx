'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// The Meta Pixel lives ONLY on these ad landing pages for adult books (decision of the owner, 15 nov 2026),
// and it does not load until the visitor accepts. No choice, or "No thanks": no pixel and no _fbp cookie.
// The banner sits in the page flow at the top (it never covers content or the keyboard focus).
// autoConfig is off: the pixel only sends the two events below, never the buttons people press.

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

// Meta's first-party cookies on our domain. Its own cookie "fr" lives on facebook.com: only the browser can delete it.
function borrarCookiesMeta() {
    const dominio = window.location.hostname.replace(/^www\./, '');
    for (const nombre of ['_fbp', '_fbc']) {
        for (const d of ['', `; domain=${dominio}`, `; domain=.${dominio}`]) {
            document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
        }
    }
}

function useEleccion(): [Eleccion | undefined, (v: Eleccion) => void] {
    const [eleccion, setEleccion] = useState<Eleccion | undefined>(undefined);
    useEffect(() => {
        const actualizar = () => setEleccion(leer());
        actualizar();
        window.addEventListener(EVENTO, actualizar);
        return () => window.removeEventListener(EVENTO, actualizar);
    }, []);
    return [eleccion, (v) => {
        const antes = leer();
        guardar(v);
        if (antes === 'si' && v !== 'si') {
            // The pixel is already running in this page: the only way to stop it is a full reload, after
            // deleting its cookies. On the reloaded page it does not load again.
            // Tell the pixel first: with consent revoked it sends nothing more, not even its page-leave beacon.
            const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
            try {
                fbq?.('consent', 'revoke');
            } catch {
                /* the reload below stops it anyway */
            }
            borrarCookiesMeta();
            window.location.reload();
            return;
        }
        setEleccion(v);
    }];
}

export function PixelConConsentimiento({ asin, titulo }: { asin: string; titulo: string }) {
    const [eleccion, elegir] = useEleccion();

    return (
        <>
            {eleccion === null && (
                <section className="lp-consent" aria-labelledby="lp-consent-t">
                    <h2 id="lp-consent-t">Cookies on this page</h2>
                    <p>
                        We use the Meta Pixel on this page to measure our ads on Facebook and Instagram. It sets Meta
                        cookies (such as _fbp and fr) only if you accept. The rest of our website has no advertising cookies.{' '}
                        {/* A plain link on purpose: a full page load, so a pixel never travels to other pages. */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href="/privacy">Privacy policy</a>
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
                        fbq('set', 'autoConfig', false, '1243671167851218');
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
