import Image from 'next/image';
import { CabeceraB, PieB } from '@/rediseno/b';
import { REGALO_DEMO, amazon, img, libro, porFamilia } from '@/rediseno/libros';

export default function GiftB() {
    const l = libro(REGALO_DEMO.libro);
    const mas = porFamilia(l.familia).filter((x) => x.id !== l.id).slice(0, 4);
    return (
        <>
            <a className="bSalto" href="#main">Skip to content</a>
            <CabeceraB />
            <main id="main" className="bGift">
                <section className="bHoja">
                    <div className="bFamBar">
                        <span>Bonus pages</span>
                        <span>For readers of {l.corto}</span>
                    </div>
                    <div className="bHojaIn">
                        <div className="bHojaT">
                            <h1>Your bonus pages are ready.</h1>
                            <p>
                                {REGALO_DEMO.paginas} extra pages to print and fill in, as a thank you for buying the
                                book. No sign-up and no email.
                            </p>
                            <a className="bBtn bBtnXL" href={REGALO_DEMO.pdf} download>
                                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Download the PDF
                            </a>
                            <p className="bNota">PDF, {REGALO_DEMO.paginas} pages, {REGALO_DEMO.peso}. It is a big file: Wi-Fi is best.</p>
                        </div>
                        <Image className="bHojaImg" src={img(l.id)} alt={`Cover of ${l.titulo}`} width={l.w} height={l.h} sizes="(max-width: 700px) 60vw, 340px" priority />
                    </div>
                    <div className="bPasos">
                        <h2>Before you print</h2>
                        <ul>
                            {REGALO_DEMO.consejos.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                    </div>
                </section>

                <aside className="bHueco" aria-label="Reserved space in this mockup">
                    <strong>Reserved space (mockup note)</strong>
                    <span>A future offer for readers will sit here, under the free download. It is not built and readers do not see this box.</span>
                </aside>

                <section className="bFam bF-coloring bMas" aria-labelledby="b-mas">
                    <div className="bFamBar"><h2 id="b-mas">More from the Monochrome series</h2></div>
                    <ul>
                        {mas.map((x) => (
                            <li key={x.id}>
                                <a href={amazon(x)} rel="noopener">
                                    <Image src={img(x.id)} alt="" width={x.w} height={x.h} sizes="(max-width: 700px) 44vw, 250px" />
                                    <strong>{x.corto}</strong>
                                    <em>Buy on Amazon</em>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bResena">
                    <p>Enjoying the book? An honest review on Amazon helps other readers find it.</p>
                    <a href={amazon(l)} rel="noopener">Open the book on Amazon</a>
                </section>
            </main>
            <PieB />
        </>
    );
}
