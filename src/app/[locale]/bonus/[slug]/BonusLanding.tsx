import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cargarCatalogo, porFamilia } from '@/catalogo/cargar';
import { getBookBySlug } from '@/data/helpers';
import { claseFuentes } from '@/sitio/fuentes';
import { Libro3d, Portada } from '@/sitio/Libro';
import { Cabecera } from '@/sitio/Marco';
import { FAMILIA } from '@/sitio/textos';
import { DescargarRegalo } from './DescargarRegalo';
import '@/sitio/sitio.css';

// The generic gift page (direction A), used by every book whose gift is a single PDF in books.ts.
// The address, the PDF and the analytics event are the same as before: only the look changed.
// Gift pages are always in English: the printed books are in English.
// No file system access here: reading /public from a function would pack every PDF into it.

const CONSEJOS = [
    'Print at 100% scale. Letter and A4 paper both work.',
    'Print on one side of the paper so ink never shows through.',
    'Thicker paper (cardstock) works best with markers.',
];

export async function BonusLanding({ bookId }: { bookId: string }) {
    const book = getBookBySlug(bookId)!;
    const c = await cargarCatalogo();
    const libro = c.libros.find((l) => l.regalo === bookId || l.slug === bookId || l.asin === book.asin);
    // The book named on a gift page is the one the live site names today (books.ts): the QR codes are
    // printed, so a page never changes which book it says it belongs to. Only the long dash becomes a colon.
    const nombre = book.title.replace(/\s+[–—]\s+/g, ': ');
    const mas = libro ? porFamilia(c, libro.familia).filter((x) => x.asin !== libro.asin).slice(0, 4) : [];

    return (
        <div className={`dA ${claseFuentes}`} lang="en">
            <a className="aSalto" href="#main">Skip to content</a>
            <Cabecera l="en" />
            <main id="main" tabIndex={-1}>
                <section className="aGiftTop" aria-labelledby="a-regalo">
                    <div className="aDetLibro">
                        <div className="aCono" aria-hidden="true" />
                        {libro ? (
                            <Libro3d libro={libro} alt={`Cover of ${nombre}`} clase="aGrande" prioridad sizes="(max-width: 900px) 56vw, 340px" />
                        ) : (
                            <span className="aLibroW aGrande">
                                <span className="aLibro" style={{ aspectRatio: book.coverRatio ?? '3 / 4' }}>
                                    <Image src={book.coverImage} alt={`Cover of ${nombre}`} width={760} height={984} sizes="(max-width: 900px) 56vw, 340px" priority />
                                </span>
                            </span>
                        )}
                        <div className="aBalda" aria-hidden="true" />
                    </div>
                    <div className="aGiftT">
                        <p className="aFam">A free gift for readers of {nombre}</p>
                        <h1 id="a-regalo">Your bonus pages are ready.</h1>
                        <p>
                            Extra pages to print and enjoy, as a thank you for buying the book. No sign-up and no email:
                            press the button and the file is yours.
                        </p>
                        <DescargarRegalo href={book.bonusPdf!} libro={book.id} texto="Download the PDF" />
                        <p className="aNota">A PDF to print at home. Big files download best on Wi-Fi.</p>
                    </div>
                </section>

                <section className="aConsejos" aria-labelledby="a-consejos">
                    <h2 id="a-consejos">Before you print</h2>
                    <ul>
                        {CONSEJOS.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                </section>

                {libro && mas.length > 0 && (
                    <section className="aMas" aria-labelledby="a-mas">
                        <h2 id="a-mas">More {FAMILIA[libro.familia].en.nombre.toLowerCase()}</h2>
                        <ul>
                            {mas.map((x) => (
                                <li key={x.asin}>
                                    <Link href={`/books/${x.slug}`}>
                                        <Portada libro={x} sizes="(max-width: 900px) 42vw, 230px" />
                                        <span lang={x.idioma}>{x.nombre}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/^[A-Z0-9]{10}$/.test(book.asin) && (
                    <section className="aResena" aria-label="Reviews">
                        <p>Enjoying the book? An honest review on Amazon helps other readers find it.</p>
                        <a className="aLink" href={`https://www.amazon.com/review/create-review?asin=${book.asin}`} rel="noopener">
                            Write a review on Amazon
                        </a>
                    </section>
                )}
            </main>
            <footer className="aGiftPie">
                <p>Fun Books Publisher LLC, Wyoming, USA. Our books are printed and sold by Amazon.</p>
                <Link href="/books">All our books</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy</Link>
            </footer>
        </div>
    );
}
