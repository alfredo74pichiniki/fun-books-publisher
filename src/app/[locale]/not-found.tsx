import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { claseFuentes } from '@/sitio/fuentes';
import { Cabecera } from '@/sitio/Marco';
import '@/sitio/sitio.css';

export const metadata: Metadata = { title: 'Page not found | Fun Books Publisher', robots: { index: false } };

export default function NotFound() {
    return (
        <div className={`dA ${claseFuentes}`}>
            <a className="aSalto" href="#main">Skip to content</a>
            <Cabecera l="en" />
            <main id="main" tabIndex={-1} className="a404">
                <p className="aEyebrow">Page not found</p>
                <h1>This page is not on the shelf.</h1>
                <p>The address may have changed. All our books are one click away.</p>
                <p lang="es">Esta página no existe. Todos los libros están a un clic.</p>
                <div className="aAcc">
                    <Link className="aBtn" href="/books">See all books</Link>
                </div>
            </main>
        </div>
    );
}
