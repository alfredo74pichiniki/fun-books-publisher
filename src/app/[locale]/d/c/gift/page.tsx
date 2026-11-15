import Image from 'next/image';
import { CabeceraC, PieC } from '@/rediseno/c';
import { REGALO_DEMO, amazon, img, libro, porFamilia } from '@/rediseno/libros';

export default function GiftC() {
    const l = libro(REGALO_DEMO.libro);
    const mas = porFamilia(l.familia).filter((x) => x.id !== l.id).slice(0, 4);
    return (
        <>
            <a className="cSalto" href="#main">Skip to content</a>
            <main id="main" className="cGift">
                <section className={`cGiftTop cS-${l.familia}`}>
                    <CabeceraC salas={false} />
                    <span className="cPalabra" aria-hidden="true">BONUS</span>
                    <div className="cGiftIn">
                        <div className="cGiftT">
                            <p className="cPara">A gift for readers of {l.corto}</p>
                            <h1>Your bonus pages are ready.</h1>
                            <p>
                                {REGALO_DEMO.paginas} extra pages to print and fill in, as a thank you for buying the
                                book. No sign-up and no email.
                            </p>
                            <a className="cBtn cBtnXL" href={REGALO_DEMO.pdf} download>
                                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Download the PDF
                            </a>
                            <p className="cNota">PDF, {REGALO_DEMO.paginas} pages, {REGALO_DEMO.peso}. It is a big file: Wi-Fi is best.</p>
                        </div>
                        <Image className="cGiftImg" src={img(l.id)} alt={`Cover of ${l.titulo}`} width={l.w} height={l.h} sizes="(max-width: 700px) 60vw, 380px" priority />
                    </div>
                </section>

                <section className="cConsejos" aria-labelledby="c-consejos">
                    <h2 id="c-consejos">Before you print</h2>
                    <ul>
                        {REGALO_DEMO.consejos.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                </section>

                <aside className="cHueco" aria-label="Reserved space in this mockup">
                    <strong>Reserved space (mockup note)</strong>
                    <span>A future offer for readers will sit here, under the free download. It is not built and readers do not see this box.</span>
                </aside>

                <section className="cMas" aria-labelledby="c-mas">
                    <h2 id="c-mas">More from the Monochrome series</h2>
                    <ul>
                        {mas.map((x) => (
                            <li key={x.id}>
                                <a href={amazon(x)} rel="noopener">
                                    <Image src={img(x.id)} alt="" width={x.w} height={x.h} sizes="(max-width: 700px) 44vw, 250px" />
                                    <strong>{x.corto}</strong>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="cResena">
                    <p>Enjoying the book? An honest review on Amazon helps other readers find it.</p>
                    <a href={amazon(l)} rel="noopener">Open the book on Amazon</a>
                </section>
            </main>
            <PieC />
        </>
    );
}
