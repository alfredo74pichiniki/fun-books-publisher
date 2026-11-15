import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { AMAZON_TIENDA, FAMILIAS, ORDEN } from '@/rediseno/libros';

export function CabeceraC({ salas = true }: { salas?: boolean }) {
    return (
        <header className="cCab">
            <Link className="cMarca" href="/d/c" aria-label="Fun Books Publisher, home">
                <Image src="/rediseno/logo.webp" alt="" width={64} height={64} priority />
            </Link>
            {salas && (
                <nav aria-label="Kinds of book">
                    {ORDEN.map((f) => (
                        <Link key={f} href={`/d/c#${f}`} className={`cP-${f}`}>{FAMILIAS[f].nombre}</Link>
                    ))}
                </nav>
            )}
            <a className="cBtn cBtnS" href={AMAZON_TIENDA} rel="noopener">Shop on Amazon</a>
        </header>
    );
}

export function PieC() {
    return (
        <footer className="cPie">
            <Image src="/rediseno/logo.webp" alt="Fun Books Publisher" width={84} height={84} />
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
