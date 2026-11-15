import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { claseFuentes } from '@/sitio/fuentes';
import { Cabecera, Pie } from '@/sitio/Marco';
import { loc, textos } from '@/sitio/textos';
import '@/sitio/sitio.css';

// Direction A, "Midnight Shelf" (chosen by Alfredo, 15 nov 2026). Every page of the site shares this frame.
export default async function SiteLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const l = loc(locale);
    return (
        <div className={`dA ${claseFuentes}`}>
            <a className="aSalto" href="#main">{textos(l).saltar}</a>
            <Cabecera l={l} />
            <main id="main" tabIndex={-1}>{children}</main>
            <Pie l={l} />
        </div>
    );
}
