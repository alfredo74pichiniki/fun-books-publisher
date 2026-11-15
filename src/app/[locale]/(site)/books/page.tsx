import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { cargarCatalogo } from '@/catalogo/cargar';
import { Portada } from '@/sitio/Libro';
import { grupos, loc, textos } from '@/sitio/textos';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const es = locale === 'es';
    const c = await cargarCatalogo();
    return {
        title: es ? `Todos los libros (${c.libros.length}) | Fun Books Publisher` : `All books (${c.libros.length}) | Fun Books Publisher`,
        description: es
            ? 'Todos los libros de Fun Books Publisher en Amazon: Monochrome Color by Number, colorear en monocromo, misterios, sopas de letras, libros en español y para niños.'
            : 'Every Fun Books Publisher book on Amazon: Monochrome Color by Number Mysteries, monochrome coloring, mystery puzzles, word searches, Spanish books and kids.',
        alternates: { canonical: es ? '/es/books' : '/books', languages: { en: '/books', es: '/es/books', 'x-default': '/books' } },
    };
}

export default async function Catalogo({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const l = loc(locale);
    const t = textos(l);
    const c = await cargarCatalogo();
    const estantes = grupos(c, l);

    return (
        <>
            <div className="aCatCab">
                <h1>{t.catTitulo}</h1>
                <p>{t.catTexto(c.libros.length)}</p>
                <nav aria-label={t.catSaltar}>
                    <ul className="aSaltos">
                        {estantes.map((g) => (
                            <li key={g.clave}>
                                <a href={`#${g.clave}`}>{g.nombre} <span>{g.libros.length}</span></a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {estantes.map((g, gi) => {
                const { libros } = g;
                const f = g.clave;
                return (
                    <section key={f} id={f} className="aSerie" aria-labelledby={`s-${f}`}>
                        {g.familias.filter((x) => x !== f).map((x) => <span key={x} id={x} />)}
                        <header>
                            <h2 id={`s-${f}`}>{g.nombre}</h2>
                            <p>{g.frase}</p>
                            <span className="aDato">{t.librosN(libros.length)}</span>
                        </header>
                        <ul className="aRejilla">
                            {libros.map((x, i) => (
                                <li key={x.asin} className="aTarjeta">
                                    <Link href={`/books/${x.slug}`} tabIndex={-1} aria-hidden="true">
                                        {x.nuevo && <span className="aSello">{t.nuevo}</span>}
                                        <Portada libro={x} sizes="(max-width: 900px) 44vw, 220px" prioridad={gi === 0 && i < 4} />
                                    </Link>
                                    <h3 lang={x.idioma}><Link href={`/books/${x.slug}`}>{x.nombre}</Link></h3>
                                    <p lang={x.idioma}>{x.linea}</p>
                                    {f !== 'espanol' && x.idioma === 'es' && <span className="aIdi">{t.idiomaEs}</span>}
                                    {f === 'espanol' && x.idioma === 'en' && <span className="aIdi">{t.idiomaEn}</span>}
                                    <a className="aBtn aBtnS" href={x.amazon} rel="noopener">
                                        {t.comprar}<span className="aOculto">: {x.nombre}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}
        </>
    );
}
