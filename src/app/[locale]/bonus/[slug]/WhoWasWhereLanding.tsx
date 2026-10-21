'use client';

// The bonus cases printed (as a QR) on page 109 of "Murder in Every Room". Same look as the Cross Out the
// Killer bonus pages. Data and the permanent slug live in who-was-where-bonus.ts.
// Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Special_Elite, Atkinson_Hyperlegible } from 'next/font/google';
import type { WhoWasWhereBonus } from './who-was-where-bonus';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });
const typewriter = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

/** A small house plan with three floors and a magnifying glass. Pure SVG, black and white like the book. */
function Plan() {
    return (
        <svg className="ww-plan" viewBox="0 0 260 160" aria-hidden="true">
            <path d="M40 52 L120 14 L200 52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <rect x="48" y="52" width="144" height="96" fill="none" stroke="currentColor" strokeWidth="4" />
            <line x1="48" y1="84" x2="192" y2="84" stroke="currentColor" strokeWidth="3" />
            <line x1="48" y1="116" x2="192" y2="116" stroke="currentColor" strokeWidth="3" />
            <line x1="112" y1="84" x2="112" y2="116" stroke="currentColor" strokeWidth="2.4" />
            <line x1="96" y1="116" x2="96" y2="148" stroke="currentColor" strokeWidth="2.4" />
            <line x1="148" y1="116" x2="148" y2="148" stroke="currentColor" strokeWidth="2.4" />
            {[0, 1, 2].map((r) => (
                <rect key={r} className="ww-floor" style={{ animationDelay: `${0.2 + r * 0.25}s` }}
                    x="58" y={124 - r * 32} width={60 + r * 18} height="8" rx="2" fill="currentColor" opacity="0.4" />
            ))}
            <g className="ww-glass">
                <circle cx="214" cy="74" r="26" fill="none" stroke="currentColor" strokeWidth="6" />
                <line x1="233" y1="93" x2="252" y2="112" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            </g>
        </svg>
    );
}

export function WhoWasWhereLanding({ bonus: BONUS }: { bonus: WhoWasWhereBonus }) {
    return (
        <main className={`ww ${body.className}`}>
            <style>{CSS}</style>
            <div className="ww-col">
                <p className={`ww-brand ${typewriter.className}`}>Fun Books Publisher</p>

                <header className="ww-hero">
                    <p className={`ww-stamp ${display.className}`}>Bonus case files</p>
                    <p className={`ww-found ${typewriter.className}`}>You found it, detective.</p>
                    <h1 className={`ww-title ${display.className}`}>{BONUS.title}</h1>
                    <p className="ww-lede">{BONUS.subtitle}</p>
                </header>

                <div className="ww-object">
                    <Image
                        className="ww-cover"
                        src={BONUS.cover}
                        alt="A floor plan page from Murder in Every Room: Bonus Cases"
                        width={1105}
                        height={1430}
                        priority
                        sizes="(max-width: 640px) 64vw, 300px"
                    />
                </div>

                <div className="ww-get">
                    <a
                        className={`ww-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Download the bonus cases
                    </a>
                    <p className="ww-meta">
                        PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print it at home and solve it with a pencil.
                    </p>
                </div>

                <div className="ww-plan-wrap">
                    <Plan />
                </div>

                <section className="ww-cases">
                    <h2 className={`ww-h2 ${display.className}`}>The three cases</h2>
                    {BONUS.cases.map((c) => (
                        <div key={c.name} className="ww-case">
                            <span className={`ww-floor-tag ${display.className}`}>{c.floor}</span>
                            <span className="ww-case-text">
                                <span className="ww-case-name">{c.name}</span>
                                <span className="ww-case-note">{c.note}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="ww-inside">
                    <h2 className={`ww-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line, i) => (
                            <li key={line}>
                                <span className={`ww-num ${display.className}`}>{i + 1}</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer className="ww-foot">
                    <p className={typewriter.className}>Happy sleuthing.</p>
                    <p className="ww-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of Murder Mystery Word Search: Murder in Every Room.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.ww{--ink:#141418;--paper:#F6F1E7;--red:#B3202D;--muted:#55565E;--rule:rgba(20,20,24,.14);
position:relative;min-height:100vh;background:var(--paper);color:var(--ink);
padding:28px 20px 60px;overflow:hidden;-webkit-font-smoothing:antialiased}
.ww *{box-sizing:border-box}
.ww::before{content:'';position:fixed;inset:0;background:var(--paper);z-index:-1}
.ww-col{position:relative;max-width:600px;margin:0 auto;text-align:center}
.ww-brand{margin:0 0 28px;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

.ww-stamp{display:inline-block;margin:0 0 18px;padding:6px 16px;border:3px solid var(--red);color:var(--red);
font-size:22px;letter-spacing:.08em;text-transform:uppercase;transform:rotate(-4deg);
box-shadow:inset 0 0 0 2px var(--paper),inset 0 0 0 4px var(--red);animation:ww-stamp .5s cubic-bezier(.2,1.4,.4,1) both}
@keyframes ww-stamp{0%{transform:rotate(-4deg) scale(1.9);opacity:0}100%{transform:rotate(-4deg) scale(1);opacity:1}}
.ww-found{margin:0 0 6px;font-size:18px;color:var(--muted)}
.ww-title{margin:0;font-size:clamp(40px,11vw,64px);line-height:.95;letter-spacing:.01em;text-transform:uppercase}
.ww .ww-lede{margin:16px auto 0;max-width:33em;font-size:19px;line-height:1.6;color:#2A2B31}

.ww-object{margin:30px 0 0}
.ww-cover{display:block;margin:0 auto;width:min(270px,64vw);height:auto;border:1px solid var(--rule);
transform:rotate(-2deg);box-shadow:0 22px 44px rgba(20,20,24,.24),0 3px 0 rgba(20,20,24,.10)}

.ww-get{margin:34px 0 0}
.ww-cta{display:inline-block;background:var(--ink);color:var(--paper);text-decoration:none;
font-size:clamp(21px,5.6vw,26px);letter-spacing:.04em;text-transform:uppercase;
padding:18px 38px;border-radius:12px;box-shadow:0 6px 0 var(--red);
transition:transform .12s ease,box-shadow .12s ease}
.ww-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--red)}
.ww-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--red)}
.ww-cta:focus-visible{outline:3px solid var(--red);outline-offset:4px}
.ww-meta{margin:14px auto 0;max-width:30em;font-size:15px;line-height:1.5;color:var(--muted)}

.ww-plan-wrap{width:230px;margin:40px auto 0;color:var(--ink)}
.ww-plan{width:100%;height:auto;display:block}
.ww-floor{transform-origin:left center;transform:scaleX(0);animation:ww-grow .5s ease-out forwards}
@keyframes ww-grow{to{transform:scaleX(1)}}
.ww-glass{transform-origin:214px 74px;animation:ww-glass 2.4s ease-in-out .9s both}
@keyframes ww-glass{0%{transform:translate(0,0)}50%{transform:translate(-16px,10px)}100%{transform:translate(-70px,22px)}}

.ww-h2{margin:0 0 14px;font-size:30px;line-height:1.05;letter-spacing:.02em}

.ww-cases{margin:46px 0 0;text-align:left}
.ww-case{display:flex;gap:16px;align-items:center;padding:14px;margin:0 0 12px;border:1.5px solid var(--ink);border-radius:12px;background:#FBF8F1}
.ww-floor-tag{flex:0 0 112px;text-align:center;background:var(--ink);color:var(--paper);border-radius:8px;padding:8px 10px;font-size:20px;letter-spacing:.04em}
.ww-case-text{display:flex;flex-direction:column}
.ww-case-name{font-size:17px;font-weight:700;line-height:1.3}
.ww-case-note{font-size:15px;color:var(--muted)}

.ww-inside{margin:46px 0 0;text-align:left}
.ww-inside ul{margin:0;padding:0;list-style:none}
.ww-inside li{display:flex;gap:16px;align-items:flex-start;padding:15px 0;border-top:1px solid var(--rule);
font-size:17px;line-height:1.5}
.ww-inside li:last-child{border-bottom:1px solid var(--rule)}
.ww-num{flex:0 0 34px;height:34px;border-radius:50%;background:var(--ink);color:var(--paper);
display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1}

.ww-foot{margin:54px 0 0;padding-top:22px;border-top:2px solid var(--ink)}
.ww-foot p{margin:0;font-size:18px}
.ww-legal{margin-top:8px !important;font-size:13px !important;color:var(--muted);line-height:1.5}

@media (min-width:641px){.ww{padding:46px 24px 76px}.ww-cover{width:300px}}
@media (max-width:380px){.ww-floor-tag{flex-basis:92px;font-size:18px}}
@media (prefers-reduced-motion:reduce){.ww-stamp,.ww-floor,.ww-glass{animation:none}.ww-floor{transform:none}.ww-cta{transition:none}}
`;
