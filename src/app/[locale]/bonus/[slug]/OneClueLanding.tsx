'use client';

// The bonus case printed (as a QR) on the gift page of each "One Clue Is a Lie" book: one different case per
// book (data and permanent slugs in one-clue-bonus.ts). For buyers only: nothing on the site links here.
// Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Special_Elite, Atkinson_Hyperlegible } from 'next/font/google';
import type { OneClueBonus } from './one-clue-bonus';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap', preload: false });
const typewriter = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap', preload: false });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', preload: false });

/** Twelve witness statements, one of them stamped as the lie. Pure SVG, black and white like the books. */
function Statements() {
    const cards = Array.from({ length: 12 }, (_, i) => i);
    return (
        <svg className="oc-statements" viewBox="0 0 300 150" aria-hidden="true">
            {cards.map((i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                const x = 10 + col * 48;
                const y = 12 + row * 66;
                const liar = i === 7;
                return (
                    <g key={i} className={liar ? 'oc-liar' : undefined}>
                        <rect x={x} y={y} width="40" height="54" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x={x + 7} y={y + 12} width="26" height="3.5" rx="1.5" fill="currentColor" opacity="0.45" />
                        <rect x={x + 7} y={y + 21} width="20" height="3.5" rx="1.5" fill="currentColor" opacity="0.45" />
                        <rect x={x + 7} y={y + 30} width="24" height="3.5" rx="1.5" fill="currentColor" opacity="0.45" />
                        {liar && (
                            <g className="oc-x">
                                <line x1={x - 4} y1={y - 4} x2={x + 44} y2={y + 58} stroke="var(--brass)" strokeWidth="4.5" strokeLinecap="round" />
                                <line x1={x + 44} y1={y - 4} x2={x - 4} y2={y + 58} stroke="var(--brass)" strokeWidth="4.5" strokeLinecap="round" />
                            </g>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

export function OneClueLanding({ bonus: BONUS }: { bonus: OneClueBonus }) {
    return (
        <main className={`oc ${body.className}`}>
            <style>{CSS}</style>
            <div className="oc-col">
                <p className={`oc-brand ${typewriter.className}`}>Fun Books Publisher</p>

                <header className="oc-hero">
                    <p className={`oc-stamp ${display.className}`}>{BONUS.stamp ?? <>Bonus case · Case {BONUS.caseNumber}</>}</p>
                    <p className={`oc-found ${typewriter.className}`}>You found it, detective.</p>
                    <h1 className={`oc-title ${display.className}`}>
                        {BONUS.kicker && <span className="oc-kicker">{BONUS.kicker} </span>}
                        {BONUS.name}
                    </h1>
                    <p className="oc-case">{BONUS.caseTitle}</p>
                    <p className="oc-lede">{BONUS.lede}</p>
                </header>

                <div className="oc-object">
                    <Image
                        className="oc-cover"
                        src={BONUS.cover}
                        alt={`First page of ${BONUS.name}: ${BONUS.caseTitle}`}
                        width={1000}
                        height={1500}
                        priority
                        sizes="(max-width: 640px) 64vw, 300px"
                    />
                </div>

                <div className="oc-get">
                    <a
                        className={`oc-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        {BONUS.cta ?? 'Download the bonus case'}
                    </a>
                    <p className="oc-meta">
                        Free PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Read it on a phone, a tablet or a computer: nothing to print. Open it only after CASE CLOSED.
                    </p>
                </div>

                <div className="oc-rule-wrap">
                    <Statements />
                    <p className={`oc-rule ${typewriter.className}`}>Every case has exactly one lie. Find it. Then find the killer.</p>
                </div>

                <section className="oc-inside">
                    <h2 className={`oc-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line, i) => (
                            <li key={line}>
                                <span className={`oc-num ${display.className}`}>{i + 1}</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="oc-series">
                    <h2 className={`oc-h2 ${display.className}`}>The One Clue Is a Lie saga</h2>
                    {(BONUS.books ?? [{
                        caseNumber: BONUS.caseNumber,
                        title: BONUS.bookTitle,
                        note: 'You need your copy: this case is played on its Key Card Register',
                    }]).map((b) => (
                        <div className="oc-book" key={b.caseNumber}>
                            <span className={`oc-level ${display.className}`}>Case {b.caseNumber}</span>
                            <span className="oc-book-text">
                                <span className="oc-book-name">{b.title}</span>
                                <span className="oc-book-note">{b.note}</span>
                            </span>
                        </div>
                    ))}
                </section>

                {BONUS.review && (
                    <section className="oc-review" aria-label="Reviews">
                        <p>{BONUS.review.text}</p>
                        {BONUS.review.asin && (
                            <a
                                className="oc-review-link"
                                href={`https://www.amazon.com/review/create-review?asin=${BONUS.review.asin}`}
                                rel="noopener"
                            >
                                Write a review on Amazon
                            </a>
                        )}
                    </section>
                )}

                <footer className="oc-foot">
                    <p className={typewriter.className}>Happy sleuthing.</p>
                    <p className="oc-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of One Clue Is a Lie.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.oc{--ink:#121821;--paper:#F3F0E8;--brass:#9A6B12;--sea:#1E3A52;--muted:#545B66;--rule:rgba(18,24,33,.14);
position:relative;min-height:100vh;background:var(--paper);color:var(--ink);
padding:28px 20px 60px;overflow:hidden;-webkit-font-smoothing:antialiased}
.oc *{box-sizing:border-box}
.oc::before{content:'';position:fixed;inset:0;background:var(--paper);z-index:-1}
.oc-col{position:relative;max-width:600px;margin:0 auto;text-align:center}
.oc-brand{margin:0 0 28px;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

.oc-stamp{display:inline-block;margin:0 0 18px;padding:6px 16px;border:3px solid var(--sea);color:var(--sea);
font-size:22px;letter-spacing:.08em;text-transform:uppercase;transform:rotate(-3deg);
box-shadow:inset 0 0 0 2px var(--paper),inset 0 0 0 4px var(--sea);animation:oc-stamp .5s cubic-bezier(.2,1.4,.4,1) both}
@keyframes oc-stamp{0%{transform:rotate(-3deg) scale(1.9);opacity:0}100%{transform:rotate(-3deg) scale(1);opacity:1}}
.oc-found{margin:0 0 6px;font-size:18px;color:var(--muted)}
.oc-title{margin:0;font-size:clamp(52px,15vw,88px);line-height:.92;letter-spacing:.01em;text-transform:uppercase}
.oc-kicker{display:block;margin:0 0 4px;font-size:clamp(28px,7.5vw,42px);color:var(--sea);letter-spacing:.04em}
.oc .oc-case{margin:8px 0 0;font-size:21px;font-weight:700;color:var(--sea)}
.oc .oc-lede{margin:16px auto 0;max-width:33em;font-size:18px;line-height:1.6;color:#262C35}

.oc-object{margin:30px 0 0}
.oc-cover{display:block;margin:0 auto;width:min(270px,64vw);height:auto;border:1px solid var(--rule);
transform:rotate(-2deg);box-shadow:0 22px 44px rgba(18,24,33,.24),0 3px 0 rgba(18,24,33,.10)}

.oc-get{margin:34px 0 0}
.oc-cta{display:inline-block;background:var(--ink);color:var(--paper);text-decoration:none;
font-size:clamp(21px,5.6vw,26px);letter-spacing:.04em;text-transform:uppercase;
padding:18px 38px;border-radius:12px;box-shadow:0 6px 0 var(--brass);
transition:transform .12s ease,box-shadow .12s ease}
.oc-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--brass)}
.oc-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--brass)}
.oc-cta:focus-visible{outline:3px solid var(--brass);outline-offset:4px}
.oc-meta{margin:14px auto 0;max-width:30em;font-size:15px;line-height:1.5;color:var(--muted)}

.oc-rule-wrap{margin:42px auto 0;max-width:300px;color:var(--ink)}
.oc-statements{width:100%;height:auto;display:block}
.oc-x line{stroke-dasharray:80;stroke-dashoffset:80;animation:oc-draw .45s ease-out .6s forwards}
.oc-x line+line{animation-delay:.85s}
@keyframes oc-draw{to{stroke-dashoffset:0}}
.oc .oc-rule{margin:14px 0 0;font-size:16px;line-height:1.5;color:var(--sea)}

.oc-h2{margin:0 0 14px;font-size:30px;line-height:1.05;letter-spacing:.02em}
.oc-inside{margin:46px 0 0;text-align:left}
.oc-inside ul{margin:0;padding:0;list-style:none}
.oc-inside li{display:flex;gap:16px;align-items:flex-start;padding:15px 0;border-top:1px solid var(--rule);
font-size:17px;line-height:1.5}
.oc-inside li:last-child{border-bottom:1px solid var(--rule)}
.oc-num{flex:0 0 34px;height:34px;border-radius:50%;background:var(--ink);color:var(--paper);
display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1}

.oc-series{margin:50px 0 0;text-align:left}
.oc-book{display:flex;gap:16px;align-items:center;padding:14px;margin:0 0 12px;border:1.5px solid var(--ink);border-radius:12px;background:#F9F7F1}
.oc-level{flex:0 0 auto;background:var(--sea);color:var(--paper);border-radius:8px;padding:8px 12px;font-size:20px;letter-spacing:.04em}
.oc-book-text{display:flex;flex-direction:column}
.oc-book-name{font-size:17px;font-weight:700;line-height:1.3}
.oc-book-note{font-size:15px;color:var(--muted)}

.oc-review{margin:40px 0 0;padding:18px 20px;border:1.5px dashed var(--rule);border-radius:12px;text-align:center}
.oc .oc-review p{margin:0;font-size:16px;line-height:1.55;color:var(--muted)}
.oc-review-link{display:inline-block;margin-top:10px;color:var(--sea);font-weight:700;text-underline-offset:3px}
.oc-review-link:focus-visible{outline:3px solid var(--brass);outline-offset:3px}

.oc-foot{margin:54px 0 0;padding-top:22px;border-top:2px solid var(--ink)}
.oc-foot p{margin:0;font-size:18px}
.oc-legal{margin-top:8px !important;font-size:13px !important;color:var(--muted);line-height:1.5}

@media (min-width:641px){.oc{padding:46px 24px 76px}.oc-cover{width:300px}}
@media (prefers-reduced-motion:reduce){.oc-stamp,.oc-x line{animation:none}.oc-x line{stroke-dashoffset:0}.oc-cta{transition:none}}
`;
