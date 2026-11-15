import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { AMAZON_TIENDA, img, libro } from '@/rediseno/libros';

export function Libro3d({ id, clase = '', prioridad = false }: { id: string; clase?: string; prioridad?: boolean }) {
    const l = libro(id);
    return (
        <span className={`aLibroW ${clase}`}>
            <span className="aLibro" style={{ aspectRatio: `${l.w} / ${l.h}` }}>
                <Image src={img(id)} alt={`Cover of ${l.titulo}`} width={l.w} height={l.h} sizes="(max-width: 700px) 45vw, 300px" priority={prioridad} />
            </span>
        </span>
    );
}

export function CabeceraA() {
    return (
        <header className="aCab">
            <Link className="aMarca" href="/d/a" aria-label="Fun Books Publisher, home">
                <span className="aPlaca"><Image src="/rediseno/logo.webp" alt="" width={56} height={56} priority /></span>
                <span>Fun Books Publisher</span>
            </Link>
            <nav aria-label="Main">
                <Link href="/d/a#books">Books</Link>
                <Link href="/d/a#gifts">Free gifts</Link>
                <Link href="/d/a#about">About</Link>
            </nav>
            <a className="aBtn aBtnS" href={AMAZON_TIENDA} rel="noopener">Shop on Amazon</a>
        </header>
    );
}

export function PieA() {
    return (
        <footer className="aPie">
            <span className="aPlaca"><Image src="/rediseno/logo.webp" alt="Fun Books Publisher" width={72} height={72} /></span>
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
