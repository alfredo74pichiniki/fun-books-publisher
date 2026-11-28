'use client';

// Gift page printed (address and QR) on the gift page of "Logic Grid Puzzles for Adults". Data and permanent slug in
// logic-grid-bonus.ts. For buyers only: nothing on the site links here. Direct download, no email capture
// (KDP bonus content rules, G202018960). The locked clues are opened inside the PDF, with the codes of the book.

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Anton, Atkinson_Hyperlegible } from 'next/font/google';
import type { LogicGridBonus } from './logic-grid-bonus';

const display = Anton({ weight: '400', subsets: ['latin'], display: 'swap', preload: false });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', preload: false });

/** A 5 x 5 block of a logic grid being solved: X marks and one O per row. Pure SVG, black and white like the book. */
function Grid() {
    const o = [2, 0, 4, 1, 3];
    const cells = [];
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const x = 6 + c * 34;
            const y = 6 + r * 34;
            const isO = o[r] === c;
            const delay = `${0.15 + (r * 5 + c) * 0.035}s`;
            cells.push(
                <g key={`${r}-${c}`} className="lg-mark" style={{ animationDelay: delay }}>
                    {isO ? (
                        <circle cx={x + 17} cy={y + 17} r="10" fill="none" stroke="var(--key)" strokeWidth="3.5" />
                    ) : (
                        <>
                            <line x1={x + 10} y1={y + 10} x2={x + 24} y2={y + 24} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                            <line x1={x + 24} y1={y + 10} x2={x + 10} y2={y + 24} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                        </>
                    )}
                </g>,
            );
        }
    }
    return (
        <svg className="lg-grid" viewBox="0 0 182 182" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
                <g key={i}>
                    <line x1={6 + i * 34} y1="6" x2={6 + i * 34} y2="176" stroke="currentColor" strokeWidth={i % 5 === 0 ? 4 : 1.5} />
                    <line x1="6" y1={6 + i * 34} x2="176" y2={6 + i * 34} stroke="currentColor" strokeWidth={i % 5 === 0 ? 4 : 1.5} />
                </g>
            ))}
            {cells}
        </svg>
    );
}

export function LogicGridLanding({ bonus: BONUS }: { bonus: LogicGridBonus }) {
    return (
        <main className={`lg ${body.className}`}>
            <style>{CSS}</style>
            <div className="lg-col">
                <p className="lg-brand">Fun Books Publisher</p>

                <header className="lg-hero">
                    <p className={`lg-stamp ${display.className}`}>Free bonus for readers</p>
                    <h1 className={`lg-title ${display.className}`}>{BONUS.name}</h1>
                    <p className="lg-sub">{BONUS.subtitle}</p>
                    <p className="lg-lede">{BONUS.lede}</p>
                </header>

                <div className="lg-object">
                    <Image
                        className="lg-cover"
                        src={BONUS.cover}
                        alt={`First round of ${BONUS.name}, the bonus for ${BONUS.book}`}
                        width={1000}
                        height={1294}
                        priority
                        sizes="(max-width: 640px) 70vw, 320px"
                    />
                </div>

                <div className="lg-get">
                    <a
                        className={`lg-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Download the Sixth Chapter
                    </a>
                    <p className="lg-meta">
                        Free PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print it at home on letter paper, in black and white.
                    </p>
                </div>

                <section className="lg-keys" aria-label="Your keys">
                    <div className="lg-keys-head">
                        <Grid />
                        <div>
                            <h2 className={`lg-h2 ${display.className}`}>Your keys are in your book</h2>
                            <p className="lg-keys-text">
                                Keep your copy next to you. Each round opens with the answer code that the Answer Check of the book
                                marks &quot;Correct!&quot; for one puzzle:
                            </p>
                        </div>
                    </div>
                    <ol className="lg-keylist">
                        {BONUS.keys.map((k) => (
                            <li key={k.round}>
                                <span className={`lg-round ${display.className}`}>Round {k.round}</span>
                                <span className="lg-keytext">
                                    <strong>Puzzle {k.puzzle}</strong>, the last one of the {k.chapter} chapter
                                </span>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="lg-inside">
                    <h2 className={`lg-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line, i) => (
                            <li key={line}>
                                <span className={`lg-num ${display.className}`}>{i + 1}</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="lg-review" aria-label="Reviews">
                    <p>{BONUS.review.text}</p>
                    {BONUS.review.asin && (
                        <a
                            className="lg-review-link"
                            href={`https://www.amazon.com/review/create-review?asin=${BONUS.review.asin}`}
                            rel="noopener"
                        >
                            Write a review on Amazon
                        </a>
                    )}
                </section>

                <footer className="lg-foot">
                    <p>Happy puzzling.</p>
                    <p className="lg-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of {BONUS.book}.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.lg{--ink:#111418;--paper:#FAF8F2;--key:#C2410C;--soft:#EFEBE0;--muted:#4B5563;--rule:rgba(17,20,24,.16);
position:relative;min-height:100vh;background:var(--paper);color:var(--ink);padding:28px 20px 60px;
-webkit-font-smoothing:antialiased}
.lg *{box-sizing:border-box}
.lg::before{content:'';position:fixed;inset:0;background:var(--paper);z-index:-1}
.lg-col{max-width:620px;margin:0 auto;text-align:center}
.lg-brand{margin:0 0 26px;font-size:14px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.lg-stamp{display:inline-block;margin:0 0 16px;padding:6px 16px;background:var(--ink);color:var(--paper);
font-size:18px;letter-spacing:.08em;text-transform:uppercase}
.lg-title{margin:0;font-size:clamp(54px,15vw,92px);line-height:.95;letter-spacing:.01em;text-transform:uppercase}
.lg .lg-sub{margin:10px 0 0;font-size:22px;font-weight:700;color:var(--key)}
.lg .lg-lede{margin:16px auto 0;max-width:33em;font-size:19px;line-height:1.6}
.lg-object{margin:30px 0 0}
.lg-cover{display:block;margin:0 auto;width:min(300px,70vw);height:auto;border:1px solid var(--rule);
transform:rotate(-1.5deg);box-shadow:0 22px 44px rgba(17,20,24,.22),0 3px 0 rgba(17,20,24,.10)}
.lg-get{margin:34px 0 0}
.lg-cta{display:inline-block;background:var(--key);color:#fff;text-decoration:none;
font-size:clamp(21px,5.6vw,27px);letter-spacing:.03em;text-transform:uppercase;padding:18px 34px;border-radius:12px;
box-shadow:0 6px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease}
.lg-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--ink)}
.lg-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--ink)}
.lg-cta:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.lg-meta{margin:14px auto 0;max-width:30em;font-size:16px;line-height:1.5;color:var(--muted)}
.lg-h2{margin:0 0 12px;font-size:30px;line-height:1.08;letter-spacing:.01em;text-transform:uppercase}
.lg-keys{margin:46px 0 0;padding:22px 20px;background:var(--soft);border:2px solid var(--ink);border-radius:14px;text-align:left}
.lg-keys-head{display:flex;gap:18px;align-items:center}
.lg-grid{flex:0 0 112px;width:112px;height:112px;color:var(--ink)}
.lg-mark{opacity:0;animation:lg-in .3s ease-out forwards}
@keyframes lg-in{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
.lg-mark{transform-box:fill-box;transform-origin:center}
.lg .lg-keys-text{margin:0;font-size:17px;line-height:1.55}
.lg-keylist{margin:16px 0 0;padding:0;list-style:none}
.lg-keylist li{display:flex;gap:14px;align-items:center;padding:11px 0;border-top:1px solid var(--rule);font-size:17px;line-height:1.4}
.lg-round{flex:0 0 auto;min-width:92px;text-align:center;background:var(--ink);color:var(--paper);border-radius:8px;
padding:7px 10px;font-size:18px;letter-spacing:.04em;text-transform:uppercase}
.lg-inside{margin:46px 0 0;text-align:left}
.lg-inside ul{margin:0;padding:0;list-style:none}
.lg-inside li{display:flex;gap:16px;align-items:flex-start;padding:15px 0;border-top:1px solid var(--rule);font-size:17px;line-height:1.5}
.lg-inside li:last-child{border-bottom:1px solid var(--rule)}
.lg-num{flex:0 0 34px;height:34px;border-radius:50%;background:var(--ink);color:var(--paper);
display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}
.lg-review{margin:40px 0 0;padding:18px 20px;border:1.5px dashed var(--rule);border-radius:12px;text-align:center}
.lg .lg-review p{margin:0;font-size:16px;line-height:1.55;color:var(--muted)}
.lg-review-link{display:inline-block;margin-top:10px;color:var(--key);font-weight:700;text-underline-offset:3px}
.lg-foot{margin:54px 0 0;padding-top:22px;border-top:2px solid var(--ink)}
.lg-foot p{margin:0;font-size:18px}
.lg-legal{margin-top:8px !important;font-size:13px !important;color:var(--muted);line-height:1.5}
@media (min-width:641px){.lg{padding:46px 24px 76px}.lg-cover{width:320px}}
@media (max-width:420px){.lg-keys-head{flex-direction:column;align-items:flex-start}}
@media (prefers-reduced-motion:reduce){.lg-mark{animation:none;opacity:1}.lg-cta{transition:none}}
`;
