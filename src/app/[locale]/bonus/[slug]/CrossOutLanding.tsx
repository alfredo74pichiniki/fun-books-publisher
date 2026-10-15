'use client';

// The bonus case printed (as a QR) on the last page of the three "Cross Out the Killer" books.
// The URL /bonus/cross-out-the-killer is printed in the books, so THE SLUG IS PERMANENT.
// Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Special_Elite, Atkinson_Hyperlegible } from 'next/font/google';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });
const typewriter = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

const CROSS_OUT_SLUG = 'cross-out-the-killer';

const BONUS = {
    name: 'Death on the Magnolia Queen',
    pdf: '/downloads/cross-out-the-killer-bonus-case.pdf',
    cover: '/covers/cross-out/bonus-case.jpg',
    pages: 50,
    size: '0.3 MB',
    lede: 'The captain of the last great paddle steamer on the Mississippi has been found dead in his cabin, and the old riverboat log in his safe is gone. Eight hundred passengers are on board. One of them did it.',
};

const INSIDE = [
    'A register of 800 passengers in the same large, clear print as your book',
    'Ten clues with a checkpoint after every one, then the purser\'s files, a map of the boat and three tests',
    'Hints in three steps and a Verdict Code to check your answer, with no spoilers',
];

const SERIES = [
    { level: 1, name: 'Murder at the Antiques Fair', note: 'Easy · 3,000 suspects' },
    { level: 2, name: 'Death at the Model Railroad Show', note: 'Medium · 5,000 suspects' },
    { level: 3, name: 'Murder at the Ballpark', note: 'Hard · 8,000 suspects' },
];

/** Magnifying glass over a crossed-out list. Pure SVG, black and white like the books. */
function Evidence() {
    const rows = [0, 1, 2, 3, 4, 5, 6];
    return (
        <svg className="xo-evidence" viewBox="0 0 260 150" aria-hidden="true">
            {rows.map((r) => (
                <g key={r}>
                    <rect x="20" y={18 + r * 17} width="44" height="6" rx="2" fill="currentColor" opacity="0.55" />
                    <rect x="76" y={18 + r * 17} width={90 + ((r * 37) % 60)} height="6" rx="2" fill="currentColor" opacity="0.35" />
                    {r !== 4 && (
                        <line className="xo-strike" style={{ animationDelay: `${0.15 + r * 0.12}s` }}
                            x1="14" y1={21 + r * 17} x2={190 + ((r * 23) % 50)} y2={21 + r * 17}
                            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    )}
                </g>
            ))}
            <ellipse cx="118" cy="89" rx="112" ry="13" fill="none" stroke="currentColor" strokeWidth="2.6" />
            <g className="xo-glass">
                <circle cx="206" cy="70" r="30" fill="none" stroke="currentColor" strokeWidth="6" />
                <line x1="228" y1="92" x2="250" y2="114" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
            </g>
        </svg>
    );
}

export function CrossOutLanding() {
    return (
        <main className={`xo ${body.className}`}>
            <style>{CSS}</style>
            <div className="xo-col">
                <p className={`xo-brand ${typewriter.className}`}>Fun Books Publisher</p>

                <header className="xo-hero">
                    <p className={`xo-stamp ${display.className}`}>Bonus case file</p>
                    <p className={`xo-found ${typewriter.className}`}>You found it, detective.</p>
                    <h1 className={`xo-title ${display.className}`}>{BONUS.name}</h1>
                    <p className="xo-lede">{BONUS.lede}</p>
                </header>

                <div className="xo-object">
                    <Image
                        className="xo-cover"
                        src={BONUS.cover}
                        alt={`First page of ${BONUS.name}`}
                        width={1105}
                        height={1430}
                        priority
                        sizes="(max-width: 640px) 64vw, 300px"
                    />
                </div>

                <div className="xo-get">
                    <a
                        className={`xo-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: CROSS_OUT_SLUG })}
                    >
                        Download the bonus case
                    </a>
                    <p className="xo-meta">
                        Free PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print it at home, or solve it on a tablet.
                    </p>
                </div>

                <div className="xo-evidence-wrap">
                    <Evidence />
                </div>

                <section className="xo-inside">
                    <h2 className={`xo-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {INSIDE.map((line, i) => (
                            <li key={line}>
                                <span className={`xo-num ${display.className}`}>{i + 1}</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="xo-series">
                    <h2 className={`xo-h2 ${display.className}`}>The Cross Out the Killer series</h2>
                    {SERIES.map((b) => (
                        <div key={b.level} className="xo-book">
                            <span className={`xo-level ${display.className}`}>Level {b.level}</span>
                            <span className="xo-book-text">
                                <span className="xo-book-name">{b.name}</span>
                                <span className="xo-book-note">{b.note}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <footer className="xo-foot">
                    <p className={typewriter.className}>Happy sleuthing.</p>
                    <p className="xo-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of Cross Out the Killer.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.xo{--ink:#141418;--paper:#F6F1E7;--red:#B3202D;--muted:#55565E;--rule:rgba(20,20,24,.14);
position:relative;min-height:100vh;background:var(--paper);color:var(--ink);
padding:28px 20px 60px;overflow:hidden;-webkit-font-smoothing:antialiased}
.xo *{box-sizing:border-box}
.xo::before{content:'';position:fixed;inset:0;background:var(--paper);z-index:-1}
.xo-col{position:relative;max-width:600px;margin:0 auto;text-align:center}
.xo-brand{margin:0 0 28px;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

.xo-stamp{display:inline-block;margin:0 0 18px;padding:6px 16px;border:3px solid var(--red);color:var(--red);
font-size:22px;letter-spacing:.08em;text-transform:uppercase;transform:rotate(-4deg);
box-shadow:inset 0 0 0 2px var(--paper),inset 0 0 0 4px var(--red);animation:xo-stamp .5s cubic-bezier(.2,1.4,.4,1) both}
@keyframes xo-stamp{0%{transform:rotate(-4deg) scale(1.9);opacity:0}100%{transform:rotate(-4deg) scale(1);opacity:1}}
.xo-found{margin:0 0 6px;font-size:18px;color:var(--muted)}
.xo-title{margin:0;font-size:clamp(40px,11vw,64px);line-height:.95;letter-spacing:.01em;text-transform:uppercase}
.xo .xo-lede{margin:16px auto 0;max-width:33em;font-size:18px;line-height:1.6;color:#2A2B31}

.xo-object{margin:30px 0 0}
.xo-cover{display:block;margin:0 auto;width:min(270px,64vw);height:auto;border:1px solid var(--rule);
transform:rotate(-2deg);box-shadow:0 22px 44px rgba(20,20,24,.24),0 3px 0 rgba(20,20,24,.10)}

.xo-get{margin:34px 0 0}
.xo-cta{display:inline-block;background:var(--ink);color:var(--paper);text-decoration:none;
font-size:clamp(21px,5.6vw,26px);letter-spacing:.04em;text-transform:uppercase;
padding:18px 38px;border-radius:12px;box-shadow:0 6px 0 var(--red);
transition:transform .12s ease,box-shadow .12s ease}
.xo-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--red)}
.xo-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--red)}
.xo-cta:focus-visible{outline:3px solid var(--red);outline-offset:4px}
.xo-meta{margin:14px auto 0;max-width:30em;font-size:15px;line-height:1.5;color:var(--muted)}

.xo-evidence-wrap{width:230px;margin:40px auto 0;color:var(--ink)}
.xo-evidence{width:100%;height:auto;display:block}
.xo-strike{stroke-dasharray:260;stroke-dashoffset:260;animation:xo-draw .5s ease-out forwards}
@keyframes xo-draw{to{stroke-dashoffset:0}}
.xo-glass{transform-origin:206px 70px;animation:xo-glass 2.4s ease-in-out .9s both}
@keyframes xo-glass{0%{transform:translate(0,0)}50%{transform:translate(-18px,8px)}100%{transform:translate(-82px,14px)}}

.xo-h2{margin:0 0 14px;font-size:30px;line-height:1.05;letter-spacing:.02em}
.xo-inside{margin:46px 0 0;text-align:left}
.xo-inside ul{margin:0;padding:0;list-style:none}
.xo-inside li{display:flex;gap:16px;align-items:flex-start;padding:15px 0;border-top:1px solid var(--rule);
font-size:17px;line-height:1.5}
.xo-inside li:last-child{border-bottom:1px solid var(--rule)}
.xo-num{flex:0 0 34px;height:34px;border-radius:50%;background:var(--ink);color:var(--paper);
display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1}

.xo-series{margin:50px 0 0;text-align:left}
.xo-book{display:flex;gap:16px;align-items:center;padding:14px;margin:0 0 12px;border:1.5px solid var(--ink);border-radius:12px;background:#FBF8F1}
.xo-level{flex:0 0 auto;background:var(--ink);color:var(--paper);border-radius:8px;padding:8px 12px;font-size:20px;letter-spacing:.04em}
.xo-book-text{display:flex;flex-direction:column}
.xo-book-name{font-size:17px;font-weight:700;line-height:1.3}
.xo-book-note{font-size:15px;color:var(--muted)}

.xo-foot{margin:54px 0 0;padding-top:22px;border-top:2px solid var(--ink)}
.xo-foot p{margin:0;font-size:18px}
.xo-legal{margin-top:8px !important;font-size:13px !important;color:var(--muted);line-height:1.5}

@media (min-width:641px){.xo{padding:46px 24px 76px}.xo-cover{width:300px}}
@media (prefers-reduced-motion:reduce){.xo-stamp,.xo-strike,.xo-glass{animation:none}.xo-strike{stroke-dashoffset:0}.xo-cta{transition:none}}
`;
