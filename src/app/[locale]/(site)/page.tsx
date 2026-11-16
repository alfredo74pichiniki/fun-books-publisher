import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { alDia, cargarCatalogo, ORDEN, porFamilia, recientes } from '@/catalogo/cargar';
import type { Catalogo, Libro } from '@/catalogo/tipos';
import { Carrusel } from '@/sitio/Carrusel';
import { Libro3d, Portada } from '@/sitio/Libro';
import { AMAZON_AUTOR } from '@/sitio/Marco';
import { FAMILIA, fechaCorta, grupos, loc, textos } from '@/sitio/textos';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const es = locale === 'es';
    return {
        title: es ? 'Fun Books Publisher | Libros de actividades para adultos, mayores y niños' : 'Fun Books Publisher | Activity books for adults, seniors and kids',
        description: es
            ? 'Libros para colorear, misterios, juegos de memoria en letra grande y libros sin pantallas para niños. En Amazon, muchos con un regalo gratis para imprimir.'
            : 'Coloring books, mystery puzzles, large print memory games and screen-free books for kids. On Amazon, many with a free printable gift.',
        alternates: { canonical: es ? '/es' : '/', languages: { en: '/', es: '/es', 'x-default': '/' } },
    };
}

// Hand-picked for the shelf in the window and the lamp (Alfredo, 16 nov 2026: the best sellers and a mix of lines,
// Botanicals in the middle). If a book leaves the catalog it simply drops out.
const ESCAPARATE = [
    'B0DH3Q9XN6', // Ejercicios de Memoria, volume 1
    'B0DTQ2K31D', // How to Use a Compass for Kids
    'B0FSZ9V9MS', // Black & White Cozy Escapes
    'B0HK7Y38KM', // Color by Number Mysteries: Botanicals (centre, largest)
    'B0HK7WHK1G', // Color by Number Mysteries: Cozy Escapes
    'B0HPFW7XQV', // Nostalgia Word Search for Seniors
    'B0HR1WQ4Q4', // Birthday Trivia for Seniors
];
const FOCO = ['B0FSZ9V9MS', 'B0HP7XF291', 'B0HR1WQ4Q4', 'B0HRQDD5Q4', 'B0DH3Q9XN6', 'B0DTQ2K31D'];

const elegir = (c: Catalogo, asins: string[]) =>
    asins.map((a) => c.libros.find((l) => l.asin === a)).filter((l): l is Libro => Boolean(l));

export default async function Home({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const l = loc(locale);
    const t = textos(l);
    const c = await cargarCatalogo();
    const escaparate = elegir(c, ESCAPARATE);
    const foco = elegir(c, FOCO);
    const nuevos = recientes(c, 6);
    const cbn = porFamilia(c, 'color-by-number');
    const conRegalo = ORDEN.flatMap((f) => porFamilia(c, f)).filter((x) => x.regalo);
    const estantes = grupos(c, l);
    // "Updates itself" is only said while it is true: the catalog came from the live store less than 48 hours ago.
    const actualizado = alDia(c);

    return (
        <>
            <section className="aHero" aria-labelledby="a-hero">
                <div className="aHeroT">
                    <h1 id="a-hero">{t.heroTitulo}</h1>
                    <p>{t.heroTexto}</p>
                    <div className="aAcc">
                        <Link className="aBtn" href="/books">{t.verLibros}</Link>
                        <a className="aBtn aBtnL" href="#gifts">{t.escaneeQR}</a>
                    </div>
                </div>
                <div className="aEscaparate">
                    <ul className="aFila" aria-label={t.escaparate}>
                        {escaparate.map((x, i) => (
                            <li key={x.asin} className={`aE${i}`}>
                                <Link href={`/books/${x.slug}`} aria-label={x.nombre} lang={x.idioma}>
                                    <Libro3d libro={x} alt="" prioridad={i >= 2 && i <= 4} sizes="(max-width: 900px) 26vw, 200px" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="aBalda" aria-hidden="true" />
                </div>
            </section>

            <ul className="aHechos" aria-label={t.hechosLabel}>
                {t.hechos.map((h) => (
                    <li key={h.t}>
                        <h2>{h.t}</h2>
                        <p>{h.d}</p>
                    </li>
                ))}
            </ul>

            <section className="aCaja aSec aNovedades" aria-labelledby="a-nuevos">
                <div className="aSecT">
                    <div>
                        <h2 id="a-nuevos">{t.novedades}</h2>
                        <p>{actualizado ? t.novedadesTexto : t.novedadesFijo}</p>
                    </div>
                    <Link className="aLink" href="/books">{t.verTodo}</Link>
                </div>
                <ul>
                    {nuevos.map((x) => (
                        <li key={x.asin} className="aFicha">
                            <Link href={`/books/${x.slug}`}>
                                <span className="aPortadaW">
                                    {x.nuevo && <span className="aSello">{t.nuevo}</span>}
                                    <Portada libro={x} sizes="(max-width: 480px) 44vw, (max-width: 1100px) 30vw, 180px" />
                                </span>
                                <span className="aNombre" lang={x.idioma}>{x.nombre}</span>
                                <span className="aDato">{t.publicado} {fechaCorta(x.publicado, l)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {cbn.length > 0 && (
                <section className="aCbn" aria-labelledby="a-cbn">
                    <div className="aCbnIn">
                        <div>
                            <p className="aEyebrow">{t.cbnEtiqueta}</p>
                            <h2 id="a-cbn">{t.cbnTitulo}</h2>
                            <p>{t.cbnTexto}</p>
                            <div className="aAcc">
                                <Link className="aBtn" href="/books#color-by-number">{t.cbnVer}</Link>
                            </div>
                        </div>
                        <ul className="aAbanico" aria-label={FAMILIA['color-by-number'][l].nombre}>
                            {cbn.slice(0, 5).map((x, i) => (
                                <li key={x.asin} style={{ ['--i' as string]: i, ['--d' as string]: [10, -4, -16, -4, 10][i] ?? 0 }}>
                                    <Link href={`/books/${x.slug}`} aria-label={x.nombre}>
                                        <Portada libro={x} sizes="(max-width: 900px) 34vw, 230px" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <section className="aCaja aSec" aria-labelledby="a-foco">
                <div className="aSecT"><h2 id="a-foco">{t.foco}</h2></div>
                <Carrusel label={t.focoLabel} className="aCar" anterior={l === 'es' ? 'Anterior' : 'Previous'} siguiente={l === 'es' ? 'Siguiente' : 'Next'}>
                    {foco.map((x) => (
                        <article key={x.asin} className="aSlide" aria-label={x.nombre}>
                            <div className="aSlideL"><Libro3d libro={x} alt={t.portadaDe(x.nombre)} clase="aGrande" sizes="(max-width: 900px) 52vw, 300px" /></div>
                            <div className="aSlideT">
                                <p className="aFam">{FAMILIA[x.familia][l].nombre}</p>
                                <h3 lang={x.idioma}>{x.nombre}</h3>
                                <p lang={x.idioma}>{x.linea}</p>
                                <div className="aAcc">
                                    <a className="aBtn" href={x.amazon} rel="noopener">{t.comprar}<span className="aOculto">: {x.nombre}</span></a>
                                    <Link className="aLink" href={`/books/${x.slug}`}>{t.detalles}<span className="aOculto">: {x.nombre}</span></Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </Carrusel>
            </section>

            <section id="books" className="aCaja aSec" aria-labelledby="a-libros">
                <div className="aSecT">
                    <div>
                        <h2 id="a-libros">{t.estanteria}</h2>
                        <p>{t.estanteriaTexto(c.libros.length)}</p>
                    </div>
                    <Link className="aLink" href="/books">{t.verTodo}</Link>
                </div>
                {estantes.map((g) => {
                    // Rows of up to 5, balanced (6 books make 3 + 3, never 5 + 1).
                    const porFila = Math.ceil(g.libros.length / Math.ceil(g.libros.length / 5));
                    const filas: Libro[][] = [];
                    for (let i = 0; i < g.libros.length; i += porFila) filas.push(g.libros.slice(i, i + porFila));
                    return (
                        <div key={g.clave} className="aEstante">
                            <div className="aEstanteT">
                                <h3>{g.clave === 'more' ? g.nombre : <Link href={`/books#${g.clave}`}>{g.nombre}</Link>}</h3>
                                <p>{g.frase}</p>
                                <p className="aDato">{t.librosN(g.libros.length)}</p>
                            </div>
                            <div className="aBaldas">
                                {filas.map((fila, i) => (
                                    <ul key={i} aria-label={i === 0 ? g.nombre : undefined}>
                                        {fila.map((x) => (
                                            <li key={x.asin}>
                                                <Link href={`/books/${x.slug}`}>
                                                    <Portada libro={x} sizes="(max-width: 900px) 28vw, 150px" />
                                                    <span className="aOculto" lang={x.idioma}>{x.nombre}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>

            <section id="gifts" className="aRegalos" aria-labelledby="a-regalos">
                <div className="aRegalosIn">
                <div className="aRegalosT">
                    <h2 id="a-regalos">{t.regalosTitulo}</h2>
                    <p>{t.regalosTexto}</p>
                </div>
                <ul>
                    {conRegalo.map((x) => (
                        <li key={x.asin}>
                            <Link href={`/bonus/${x.regalo}`}>
                                <Portada libro={x} sizes="56px" />
                                <span lang={x.idioma}>{x.nombre}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
            </section>

            <section className="aOtro" aria-labelledby="a-otro" lang={l === 'es' ? 'en' : 'es'}>
                <div className="aOtroIn">
                    <div>
                        <h2 id="a-otro">{t.espanolTitulo}</h2>
                        <p>{t.espanolTexto}</p>
                    </div>
                    {l === 'es'
                        ? <Link className="aBtn aBtnL" href="/books" locale="en">{t.espanolBoton}</Link>
                        : <Link className="aBtn aBtnL" href="/books#espanol" locale="es">{t.espanolBoton}</Link>}
                </div>
            </section>

            <section className="aSobre" aria-labelledby="a-sobre">
                <h2 id="a-sobre">{t.sobreTitulo}</h2>
                <p>{t.sobreTexto}</p>
                <a className="aBtn" href={AMAZON_AUTOR} rel="noopener">{t.tiendaTodo}</a>
            </section>
        </>
    );
}
