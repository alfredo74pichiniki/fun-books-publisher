import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { CabeceraC, PieC } from '@/rediseno/c';
import { AMAZON_TIENDA, FAMILIAS, HECHOS, ORDEN, amazon, conRegalo, img, libro, porFamilia } from '@/rediseno/libros';

const ABANICO = ['birthday-trivia', 'cross-out-1', 'cozy-escapes', 'ocean', 'nostalgia'];

export default function HomeC() {
    return (
        <>
            <a className="cSalto" href="#main">Skip to content</a>
            <main id="main">
                <section className="cHero">
                    <CabeceraC />
                    <div className="cHeroT">
                        <h1>Four ways to put the phone down.</h1>
                        <p>
                            Color with one pen. Solve a murder. Train your memory. Keep the kids busy without a screen.
                            Our activity books are sold by Amazon, and many come with a free printable gift.
                        </p>
                        <div className="cAcc">
                            <a className="cBtn" href="#coloring">See the books</a>
                            <a className="cBtn cBtnL" href="#gifts">I scanned a QR code</a>
                        </div>
                    </div>
                    <div className="cAbanico" aria-label="Five of our books">
                        {ABANICO.map((id, i) => {
                            const l = libro(id);
                            return <Image key={id} className={`cAb${i}`} src={img(id)} alt={`Cover of ${l.titulo}`} width={l.w} height={l.h} sizes="(max-width: 700px) 40vw, 300px" priority />;
                        })}
                    </div>
                </section>

                <section className="cHechos" aria-label="Why readers trust us">
                    {HECHOS.map((h) => (
                        <div key={h.t}>
                            <h2>{h.t}</h2>
                            <p>{h.d}</p>
                        </div>
                    ))}
                </section>

                {ORDEN.map((f) => (
                    <section key={f} id={f} className={`cSala cS-${f}`} aria-labelledby={`c-${f}`}>
                        <span className="cPalabra" aria-hidden="true">{FAMILIAS[f].palabra}</span>
                        <div className="cSalaT">
                            <h2 id={`c-${f}`}>{FAMILIAS[f].nombre}</h2>
                            <p>{FAMILIAS[f].frase}</p>
                        </div>
                        <ul>
                            {porFamilia(f).map((l) => (
                                <li key={l.id}>
                                    <a href={amazon(l)} rel="noopener">
                                        <Image src={img(l.id)} alt="" width={l.w} height={l.h} sizes="(max-width: 700px) 44vw, 260px" />
                                        <strong lang={l.lang}>{l.corto}</strong>
                                        <span lang={l.lang}>{l.linea}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <section id="gifts" className="cRegalos" aria-labelledby="c-regalos">
                    <div>
                        <h2 id="c-regalos">Scanned the QR code in your book?</h2>
                        <p>Pick your book and download its gift. No sign-up, no email, nothing to pay.</p>
                    </div>
                    <ul>
                        {conRegalo.map((l) => (
                            <li key={l.id}><Link href={`/bonus/${l.regalo}`} className={`cR-${l.familia}`} lang={l.lang}>{l.corto}</Link></li>
                        ))}
                    </ul>
                </section>

                <section id="about" className="cSobre" aria-labelledby="c-sobre">
                    <h2 id="c-sobre">A small publisher of things to do.</h2>
                    <p>
                        Pages to color with one pen, cases to solve with a pencil, puzzles in large print and workbooks
                        that teach something real. That is all we make.
                    </p>
                    <a className="cBtn cBtnT" href={AMAZON_TIENDA} rel="noopener">Shop all books on Amazon</a>
                </section>
            </main>
            <PieC />
        </>
    );
}
