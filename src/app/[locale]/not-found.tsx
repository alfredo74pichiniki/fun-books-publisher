import { Link } from '@/i18n/routing';
import { claseFuentes } from '@/sitio/fuentes';
import { Cabecera } from '@/sitio/Marco';
import '@/sitio/sitio.css';

export default function NotFound() {
    return (
        <div className={`dA ${claseFuentes}`}>
            <a className="aSalto" href="#main">Skip to content</a>
            <Cabecera l="en" />
            <main id="main" tabIndex={-1} className="a404">
                <p className="aEyebrow">Page not found</p>
                <h1>This page is not on the shelf.</h1>
                <p>The address may have changed. All our books and their free gifts are one click away.</p>
                <p lang="es">Esta página no existe. Todos los libros y sus regalos están a un clic.</p>
                <div className="aAcc">
                    <Link className="aBtn" href="/books">See all books</Link>
                    <Link className="aBtn aBtnL" href="/#gifts">Find your free gift</Link>
                </div>
            </main>
        </div>
    );
}
