import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Carrusel } from '@/rediseno/Carrusel';
import { CabeceraA, Libro3d, PieA } from '@/rediseno/a';
import { AMAZON_TIENDA, FAMILIAS, HECHOS, ORDEN, amazon, conRegalo, img, libro, porFamilia } from '@/rediseno/libros';

const ESCAPARATE = ['nostalgia', 'cross-out-1', 'cozy-escapes', 'ocean', 'birthday-trivia'];
const FOCO = ['cozy-escapes', 'cross-out-1', 'nostalgia', 'ocean', 'memoria', 'secret-science'];

export default function HomeA() {
    return (
        <>
            <a className="aSalto" href="#main">Skip to content</a>
            <CabeceraA />
            <main id="main">
                <section className="aHero">
                    <div className="aHeroT">
                        <h1>Books you do, not just read.</h1>
                        <p>
                            Coloring for adults, mystery puzzles, memory games for seniors and screen-free adventures for
                            kids. Printed and delivered by Amazon, and many come with a free printable gift.
                        </p>
                        <div className="aAcc">
                            <a className="aBtn" href="#books">See the books</a>
                            <a className="aBtn aBtnL" href="#gifts">I scanned a QR code</a>
                        </div>
                    </div>
                    <div className="aEscaparate" aria-label="Five of our books">
                        <div className="aFila">
                            {ESCAPARATE.map((id, i) => (
                                <Libro3d key={id} id={id} clase={`aE${i}`} prioridad />
                            ))}
                        </div>
                        <div className="aBalda" aria-hidden="true" />
                    </div>
                </section>

                <section className="aHechos" aria-label="Why readers trust us">
                    {HECHOS.map((h) => (
                        <div key={h.t}>
                            <h2>{h.t}</h2>
                            <p>{h.d}</p>
                        </div>
                    ))}
                </section>

                <section className="aFoco" aria-labelledby="a-foco">
                    <h2 id="a-foco">Under the lamp</h2>
                    <Carrusel label="featured books" className="aCar">
                        {FOCO.map((id) => {
                            const l = libro(id);
                            return (
                                <article key={id} className="aSlide">
                                    <div className="aSlideL"><Libro3d id={id} clase="aGrande" /></div>
                                    <div className="aSlideT">
                                        <p className="aFam">{FAMILIAS[l.familia].nombre}</p>
                                        <h3 lang={l.lang}>{l.titulo}</h3>
                                        <p lang={l.lang}>{l.linea}</p>
                                        <div className="aAcc">
                                            <a className="aBtn" href={amazon(l)} rel="noopener">Buy on Amazon<span className="aOculto">: {l.corto}</span></a>
                                            {l.regalo && <Link className="aLink" href={`/bonus/${l.regalo}`}>Get its free gift</Link>}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </Carrusel>
                </section>

                <section id="books" className="aBaldas" aria-labelledby="a-libros">
                    <h2 id="a-libros">The whole shelf</h2>
                    {ORDEN.map((f) => (
                        <div key={f} className="aEstante">
                            <div className="aEstanteT">
                                <h3>{FAMILIAS[f].nombre}</h3>
                                <p>{FAMILIAS[f].frase}</p>
                            </div>
                            <ul>
                                {porFamilia(f).map((l) => (
                                    <li key={l.id}>
                                        <a href={amazon(l)} rel="noopener">
                                            <Image src={img(l.id)} alt="" width={l.w} height={l.h} sizes="(max-width: 700px) 40vw, 180px" />
                                            <span lang={l.lang}>{l.corto}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section id="gifts" className="aRegalos" aria-labelledby="a-regalos">
                    <div>
                        <h2 id="a-regalos">Scanned the QR code in your book?</h2>
                        <p>Pick your book and download its gift. No sign-up, no email, nothing to pay.</p>
                    </div>
                    <ul>
                        {conRegalo.map((l) => (
                            <li key={l.id}><Link href={`/bonus/${l.regalo}`} lang={l.lang}>{l.corto}</Link></li>
                        ))}
                    </ul>
                </section>

                <section id="about" className="aSobre" aria-labelledby="a-sobre">
                    <h2 id="a-sobre">A small publisher of things to do</h2>
                    <p>
                        We make activity books for adults, seniors and kids: pages to color with one pen, cases to solve
                        with a pencil, puzzles in large print and workbooks that teach something real.
                    </p>
                    <a className="aBtn" href={AMAZON_TIENDA} rel="noopener">Shop all books on Amazon</a>
                </section>
            </main>
            <PieA />
        </>
    );
}
