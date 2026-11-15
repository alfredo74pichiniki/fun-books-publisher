import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { AMAZON_TIENDA } from '@/rediseno/libros';

export function CabeceraB() {
    return (
        <header className="bCab">
            <Link className="bMarca0" href="/d/b" aria-label="Fun Books Publisher, home">
                <Image src="/rediseno/logo-t.webp" alt="" width={76} height={76} priority />
            </Link>
            <nav aria-label="Main">
                <Link href="/d/b#coloring">Books</Link>
                <Link href="/d/b#gifts">Free gifts</Link>
                <Link href="/d/b#about">About</Link>
            </nav>
            <a className="bBtn bBtnS" href={AMAZON_TIENDA} rel="noopener">Shop on Amazon</a>
        </header>
    );
}

export function PieB() {
    return (
        <footer className="bPie">
            <p>Fun Books Publisher LLC, Wyoming, USA. Our books are sold by Amazon.</p>
            <nav aria-label="Footer">
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/" locale="es">Español</Link>
            </nav>
        </footer>
    );
}
