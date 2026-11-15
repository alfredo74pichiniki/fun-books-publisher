import Image from 'next/image';
import { CabeceraA, Libro3d, PieA } from '@/rediseno/a';
import { REGALO_DEMO, amazon, img, libro, porFamilia } from '@/rediseno/libros';

export default function GiftA() {
    const l = libro(REGALO_DEMO.libro);
    const mas = porFamilia(l.familia).filter((x) => x.id !== l.id).slice(0, 4);
    return (
        <>
            <a className="aSalto" href="#main">Skip to content</a>
            <CabeceraA />
            <main id="main" className="aGift">
                <section className="aGiftTop">
                    <div className="aGiftLibro">
                        <div className="aCono" aria-hidden="true" />
                        <Libro3d id={l.id} clase="aGrande" prioridad />
                        <div className="aBalda" aria-hidden="true" />
                    </div>
                    <div className="aGiftT">
                        <p className="aFam">A gift for readers of {l.corto}</p>
                        <h1>Your bonus pages are ready.</h1>
                        <p>
                            {REGALO_DEMO.paginas} extra pages to print and fill in, as a thank you for buying the book.
                            No sign-up and no email: press the button and the file is yours.
                        </p>
                        <a className="aBtn aBtnXL" href={REGALO_DEMO.pdf} download>
                            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Download the PDF
                        </a>
                        <p className="aNota">PDF, {REGALO_DEMO.paginas} pages, {REGALO_DEMO.peso}. It is a big file: Wi-Fi is best.</p>
                    </div>
                </section>

                <section className="aConsejos" aria-labelledby="a-consejos">
                    <h2 id="a-consejos">Before you print</h2>
                    <ul>
                        {REGALO_DEMO.consejos.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                </section>

                <aside className="aHueco" aria-label="Reserved space in this mockup">
                    <strong>Reserved space (mockup note)</strong>
                    <span>A future offer for readers will sit here, under the free download. It is not built and readers do not see this box.</span>
                </aside>

                <section className="aMas" aria-labelledby="a-mas">
                    <h2 id="a-mas">More from the Monochrome series</h2>
                    <ul>
                        {mas.map((x) => (
                            <li key={x.id}>
                                <a href={amazon(x)} rel="noopener">
                                    <Image src={img(x.id)} alt="" width={x.w} height={x.h} sizes="(max-width: 700px) 40vw, 180px" />
                                    <span>{x.corto}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="aResena">
                    <p>Enjoying the book? An honest review on Amazon helps other readers find it.</p>
                    <a className="aLink" href={amazon(l)} rel="noopener">Open the book on Amazon</a>
                </section>
            </main>
            <PieA />
        </>
    );
}
