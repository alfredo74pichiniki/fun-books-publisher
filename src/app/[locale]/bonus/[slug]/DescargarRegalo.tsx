'use client';

import { track } from '@vercel/analytics';

// The download button of the generic gift page. Same as before: a direct link to the PDF, no email,
// and a 'bonus_download' event so we know how many readers take the gift, not only how many arrive.
export function DescargarRegalo({ href, libro, texto }: { href: string; libro: string; texto: string }) {
    return (
        <a className="aBtn aBtnXL" href={href} download onClick={() => track('bonus_download', { book: libro })}>
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {texto}
        </a>
    );
}
