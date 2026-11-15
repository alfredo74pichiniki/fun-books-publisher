import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SopaB } from '@/rediseno/SopaB';
import { CabeceraB, PieB } from '@/rediseno/b';
import { AMAZON_TIENDA, FAMILIAS, HECHOS, ORDEN, amazon, conRegalo, img, porFamilia } from '@/rediseno/libros';

export default function HomeB() {
    return (
        <>
            <a className="bSalto" href="#main">Skip to content</a>
            <CabeceraB />
            <main id="main">
                <section className="bHero">
                    <div className="bHeroT">
                        <h1>Find your next book. It is hiding in the puzzle.</h1>
                        <p>
                            We publish books you do with a pen: coloring for adults, murder mysteries to solve, large
                            print puzzles for seniors and screen-free workbooks for kids. Sold by Amazon, and many come
                            with a free printable gift.
                        </p>
                        <div className="bAcc">
                            <a className="bBtn" href={AMAZON_TIENDA} rel="noopener">Shop on Amazon</a>
                            <a className="bBtn bBtnL" href="#gifts">I scanned a QR code</a>
                        </div>
                    </div>
                    <SopaB />
                </section>

                <section className="bHechos" aria-label="Why readers trust us">
                    <ul>
                        {HECHOS.map((h) => (
                            <li key={h.t}>
                                <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="2" y="2" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="3" /><path d="m8 15.5 5 5L23 9" fill="none" stroke="#D81B7A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div><strong>{h.t}</strong><span>{h.d}</span></div>
                            </li>
                        ))}
                    </ul>
                </section>

                {ORDEN.map((f) => (
                    <section key={f} id={f} className={`bFam bF-${f}`} aria-labelledby={`b-${f}`}>
                        <div className="bFamBar">
                            <h2 id={`b-${f}`}>{FAMILIAS[f].nombre}</h2>
                            <span>{porFamilia(f).length} books</span>
                        </div>
                        <p className="bFamP">{FAMILIAS[f].frase}</p>
                        <ul>
                            {porFamilia(f).map((l) => (
                                <li key={l.id}>
                                    <a href={amazon(l)} rel="noopener">
                                        <Image src={img(l.id)} alt="" width={l.w} height={l.h} sizes="(max-width: 700px) 44vw, 250px" />
                                        <strong lang={l.lang}>{l.corto}</strong>
                                        <span lang={l.lang}>{l.linea}</span>
                                        <em>Buy on Amazon</em>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <section id="gifts" className="bRegalos" aria-labelledby="b-regalos">
                    <div className="bFamBar">
                        <h2 id="b-regalos">Scanned the QR code in your book?</h2>
                        <span>Free gifts</span>
                    </div>
                    <p className="bFamP">Pick your book and download its gift. No sign-up, no email, nothing to pay.</p>
                    <ul>
                        {conRegalo.map((l) => (
                            <li key={l.id}><Link href={`/bonus/${l.regalo}`} lang={l.lang}>{l.corto}</Link></li>
                        ))}
                    </ul>
                </section>

                <section id="about" className="bSobre" aria-labelledby="b-sobre">
                    <h2 id="b-sobre">A small publisher of things to do.</h2>
                    <p>
                        Pages to color with one pen, cases to solve with a pencil, puzzles in large print and workbooks
                        that teach something real. That is all we make.
                    </p>
                    <a className="bBtn" href={AMAZON_TIENDA} rel="noopener">Shop all books on Amazon</a>
                </section>
            </main>
            <PieB />
        </>
    );
}
