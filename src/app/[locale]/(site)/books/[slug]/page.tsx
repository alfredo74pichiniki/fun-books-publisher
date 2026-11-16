import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { buscar, cargarCatalogo, porFamilia } from '@/catalogo/cargar';
import { Libro3d, Portada } from '@/sitio/Libro';
import { FAMILIA, fechaCorta, loc, textos } from '@/sitio/textos';

export const dynamic = 'force-static';
export const dynamicParams = true; // a book published after the last build gets its page on first visit
export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const c = await cargarCatalogo();
    return ['en', 'es'].flatMap((locale) => c.libros.map((l) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const { libro } = buscar(await cargarCatalogo(), slug);
    if (!libro) return { title: 'Book not found | Fun Books Publisher' };
    return {
        title: `${libro.nombre} | Fun Books Publisher`,
        description: `${libro.linea} ${locale === 'es' ? 'En Amazon.' : 'On Amazon.'}`.trim(),
        alternates: { canonical: locale === 'es' ? `/es/books/${libro.slug}` : `/books/${libro.slug}`, languages: { en: `/books/${libro.slug}`, es: `/es/books/${libro.slug}`, 'x-default': `/books/${libro.slug}` } },
        openGraph: { title: libro.nombre, description: libro.linea, images: [libro.img.src], type: 'book' },
    };
}

export default async function LibroPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const l = loc(locale);
    const t = textos(l);
    const c = await cargarCatalogo();
    const { libro, canonico } = buscar(c, slug);
    if (!libro) notFound();
    if (!canonico) permanentRedirect(locale === 'es' ? `/es/books/${libro.slug}` : `/books/${libro.slug}`);
    const mas = porFamilia(c, libro.familia).filter((x) => x.asin !== libro.asin).slice(0, 4);
    const formatos = (['paperback', 'hardcover', 'kindle'] as const).filter((f) => libro.formatos[f]);
    const ld = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: libro.titulo,
        inLanguage: libro.idioma,
        publisher: { '@type': 'Organization', name: 'Fun Books Publisher' },
        image: libro.img.nitida ? `https://funbookpublisher.com${libro.img.src}` : libro.img.src,
        url: `https://funbookpublisher.com${locale === 'es' ? '/es' : ''}/books/${libro.slug}`,
        datePublished: libro.publicado ?? undefined,
        workExample: formatos.map((f) => ({
            '@type': 'Book',
            bookFormat: f === 'kindle' ? 'https://schema.org/EBook' : f === 'hardcover' ? 'https://schema.org/Hardcover' : 'https://schema.org/Paperback',
            url: `https://www.amazon.com/dp/${libro.formatos[f]}`,
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
            <nav className="aMigas" aria-label={l === 'es' ? 'Ruta' : 'Breadcrumb'}>
                <ol>
                    <li><Link href="/books">{t.detalleVolver}</Link></li>
                    <li><Link href={`/books#${libro.familia}`}>{FAMILIA[libro.familia][l].nombre}</Link></li>
                </ol>
            </nav>
            <article className="aDet" aria-labelledby="a-libro">
                <div className="aDetLibro">
                    <div className="aCono" aria-hidden="true" />
                    <Libro3d libro={libro} alt={t.portadaDe(libro.nombre)} clase="aGrande" prioridad sizes="(max-width: 900px) 56vw, 360px" />
                    <div className="aBalda" aria-hidden="true" />
                </div>
                <div className="aDetT">
                    <p className="aFam">{FAMILIA[libro.familia][l].nombre}{libro.nuevo ? `, ${t.nuevo.toLowerCase()}` : ''}</p>
                    <h1 id="a-libro" lang={libro.idioma}>{libro.nombre}</h1>
                    <p className="aLinea" lang={libro.idioma}>{libro.linea}</p>
                    <div className="aAcc">
                        <a className="aBtn" href={libro.amazon} rel="noopener">{t.comprar}</a>
                    </div>
                    <dl className="aDatos">
                        <dt>{t.detalleIdioma}</dt>
                        <dd>{libro.idioma === 'es' ? t.idiomaEs : t.idiomaEn}</dd>
                        <dt>{t.detalleFormatos}</dt>
                        <dd>
                            {formatos.map((f, i) => (
                                <span key={f}>
                                    {i > 0 && ', '}
                                    <a href={`https://www.amazon.com/dp/${libro.formatos[f]}`} rel="noopener">{t.formato[f]}</a>
                                </span>
                            ))}
                        </dd>
                        {libro.publicado && (<><dt>{t.detallePublicado}</dt><dd>{fechaCorta(libro.publicado, l)}</dd></>)}
                        <dt>ASIN</dt>
                        <dd>{libro.asin}</dd>
                    </dl>
                    {libro.regalo && (
                        <div className="aRegaloCaja">
                            <p>{t.regaloCaja}</p>
                        </div>
                    )}
                </div>
            </article>

            <div className="aTituloAmazon">
                <details>
                    <summary>{t.detalleTituloAmazon}</summary>
                    <p lang={libro.idioma}>{libro.titulo}</p>
                </details>
            </div>

            {mas.length > 0 && (
                <section className="aMas" aria-labelledby="a-mas">
                    <h2 id="a-mas">{t.detalleMas}</h2>
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
        </>
    );
}
