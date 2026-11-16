import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { textos, type Loc } from './textos';

export const AMAZON_AUTOR = 'https://www.amazon.com/author/funbookspublisher';

export function Cabecera({ l }: { l: Loc }) {
    const t = textos(l);
    return (
        <header className="aCab">
            <Link className="aMarca" href="/" aria-label={t.inicio}>
                <span className="aPlaca"><Image src="/logo.png" alt="" width={56} height={56} priority /></span>
                <span className="aMarcaT">Fun Books Publisher</span>
            </Link>
            <nav aria-label={t.menu} className="aNav">
                <Link href="/books">{t.libros}</Link>
                <Link href="/about">{t.sobre}</Link>
                <Link href="/" locale={l === 'es' ? 'en' : 'es'} lang={l === 'es' ? 'en' : 'es'} className="aIdioma">
                    {t.otroIdioma}
                </Link>
            </nav>
            <a className="aBtn aBtnS aCabBtn" href={AMAZON_AUTOR} rel="noopener">{t.tienda}</a>
        </header>
    );
}

export function Pie({ l }: { l: Loc }) {
    const t = textos(l);
    return (
        <footer className="aPieW">
            <div className="aPie">
            <div className="aPieMarca">
                <span className="aPlaca"><Image src="/logo.png" alt="Fun Books Publisher" width={72} height={72} /></span>
                <p>{t.pie}</p>
            </div>
            <nav aria-label={t.pieNav}>
                <Link href="/books">{t.libros}</Link>
                <Link href="/about">{t.sobre}</Link>
                <Link href="/faq">{t.faq}</Link>
                <Link href="/blog">{t.blog}</Link>
                <Link href="/contact">{t.contacto}</Link>
                <Link href="/privacy">{t.privacidad}</Link>
                <Link href="/terms">{t.terminos}</Link>
                <Link href="/refunds">{t.devoluciones}</Link>
            </nav>
            <nav aria-label="Social" className="aPieSocial">
                <a href="https://www.facebook.com/funbookspublisher1/" rel="noopener">Facebook</a>
                <a href="https://instagram.com/funbooks_publisher" rel="noopener">Instagram</a>
                <a href="https://www.pinterest.com/funbooks_publisher/" rel="noopener">Pinterest</a>
                <a href={AMAZON_AUTOR} rel="noopener">Amazon</a>
            </nav>
            </div>
        </footer>
    );
}
