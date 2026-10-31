'use client';

// The bonus pack printed (as a QR) on the last page of "Cursive Workbook for Kids Ages 8-12". School notebook look:
// ruled paper with the book's three guide lines (solid, dashed, solid) and a red margin. Data and the permanent slug
// live in cursive-bonus.ts. Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Fraunces, Atkinson_Hyperlegible } from 'next/font/google';
import type { CursiveBonus } from './cursive-bonus';

const display = Fraunces({ weight: ['600', '900'], style: ['italic'], subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

/** The three guide lines of the book: solid, dashed, solid. Pure SVG. */
function GuideLines() {
    return (
        <svg className="cw-guide" viewBox="0 0 600 44" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="3" x2="600" y2="3" stroke="#1D2A3A" strokeWidth="3" />
            <line x1="0" y1="22" x2="600" y2="22" stroke="#1D2A3A" strokeWidth="2" strokeDasharray="8 7" />
            <line x1="0" y1="41" x2="600" y2="41" stroke="#1D2A3A" strokeWidth="3" />
        </svg>
    );
}

export function CursiveLanding({ bonus: BONUS }: { bonus: CursiveBonus }) {
    return (
        <main className={`cw ${body.className}`}>
            <style>{CSS}</style>
            <div className="cw-margin" aria-hidden="true" />
            <div className="cw-col">
                <p className={`cw-brand ${display.className}`}>Fun Books Publisher</p>

                <header className="cw-hero">
                    <p className={`cw-found ${display.className}`}>You found Pencie&apos;s secret gift!</p>
                    <h1 className={`cw-title ${display.className}`}>{BONUS.title}</h1>
                    <GuideLines />
                    <p className="cw-lede">{BONUS.subtitle}.</p>
                </header>

                <div className="cw-object">
                    <Image
                        className="cw-cover"
                        src={BONUS.cover}
                        alt="Three pages of the bonus pack: the cover, the cursive alphabet poster and a robot in space to color"
                        width={1200}
                        height={1000}
                        priority
                        sizes="(max-width: 640px) 92vw, 600px"
                    />
                </div>

                <div className="cw-get">
                    <a
                        className={`cw-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Download the bonus pack
                    </a>
                    <p className="cw-meta">
                        PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print as many copies as you like.
                    </p>
                </div>

                <section className="cw-steps">
                    <h2 className={`cw-h2 ${display.className}`}>How to use it</h2>
                    {BONUS.steps.map((s, i) => (
                        <div key={s.name} className="cw-step">
                            <span className={`cw-tag ${display.className}`}>{i + 1}</span>
                            <span className="cw-step-text">
                                <span className="cw-step-name">{s.name}</span>
                                <span className="cw-step-note">{s.how}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="cw-inside">
                    <h2 className={`cw-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </section>

                <footer className="cw-foot">
                    <p className={display.className}>Keep practicing, Cursive Champion!</p>
                    <p className="cw-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of Cursive Workbook for
                        Kids Ages 8-12. Print for use at home or in your own classroom.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.cw{--paper:#FFFDF7;--ink:#1D2A3A;--muted:#55606E;--rule:#B9D3E6;--margin:#E46B6B;--teal:#5B8FA3;--gold:#F2B33D;
position:relative;min-height:100vh;color:var(--ink);padding:28px 20px 60px;overflow:hidden;-webkit-font-smoothing:antialiased;
background-color:var(--paper);
background-image:repeating-linear-gradient(180deg,transparent 0 35px,var(--rule) 35px 36px)}
.cw *{box-sizing:border-box}
.cw-margin{position:absolute;top:0;bottom:0;left:22px;width:2px;background:var(--margin);opacity:.55}
.cw-col{position:relative;max-width:640px;margin:0 auto;text-align:center}
.cw-brand{margin:0 0 22px;font-size:18px;font-weight:600;letter-spacing:.06em;color:var(--teal)}

.cw-found{margin:0 0 8px;font-size:clamp(20px,5.4vw,26px);font-weight:600;color:var(--teal)}
.cw-title{margin:0;font-size:clamp(40px,11vw,66px);line-height:1.02;font-weight:900;color:var(--ink)}
.cw-guide{display:block;width:min(420px,80%);height:30px;margin:18px auto 0}
.cw .cw-lede{margin:16px auto 0;max-width:30em;font-size:19px;line-height:1.6;color:var(--ink)}

.cw-object{margin:28px auto 0;width:min(600px,92vw)}
.cw-cover{display:block;width:100%;height:auto;border-radius:12px;background:#fff;
box-shadow:0 0 0 1px rgba(29,42,58,.12),0 18px 40px rgba(29,42,58,.18)}

.cw-get{margin:34px 0 0}
.cw-cta{display:inline-block;background:var(--ink);color:#fff;text-decoration:none;font-weight:900;
font-size:clamp(22px,5.8vw,28px);padding:18px 36px;border-radius:999px;box-shadow:0 6px 0 var(--gold);
transition:transform .12s ease,box-shadow .12s ease}
.cw-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--gold)}
.cw-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--gold)}
.cw-cta:focus-visible{outline:3px solid var(--teal);outline-offset:4px}
.cw-meta{margin:14px auto 0;max-width:30em;font-size:16px;line-height:1.5;color:var(--muted)}

.cw-h2{margin:0 0 14px;font-size:32px;line-height:1.1;font-weight:900;color:var(--ink)}

.cw-steps{margin:48px 0 0;text-align:left}
.cw-step{display:flex;gap:16px;align-items:center;padding:12px 14px;margin:0 0 12px;border-radius:10px;
background:#fff;border:1px solid rgba(29,42,58,.12);border-left:8px solid var(--teal)}
.cw-tag{flex:0 0 46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;font-weight:900;
display:flex;align-items:center;justify-content:center;font-size:22px;line-height:1}
.cw-step-text{display:flex;flex-direction:column}
.cw-step-name{font-size:19px;font-weight:700;line-height:1.3}
.cw-step-note{font-size:16px;color:var(--muted);line-height:1.45}

.cw-inside{margin:44px 0 0;text-align:left}
.cw-inside ul{margin:0;padding:0;list-style:none;background:#fff;border-radius:10px;border:1px solid rgba(29,42,58,.12)}
.cw-inside li{padding:14px 16px 14px 42px;border-top:1px solid var(--rule);font-size:18px;line-height:1.5;position:relative}
.cw-inside li:first-child{border-top:0}
.cw-inside li::before{content:'';position:absolute;left:16px;top:23px;width:12px;height:12px;border-radius:50%;background:var(--gold)}

.cw-foot{margin:52px 0 0;padding-top:22px;border-top:2px solid var(--rule)}
.cw-foot p{margin:0;font-size:24px;font-weight:900;color:var(--ink)}
.cw-legal{margin-top:10px !important;font-size:13px !important;font-weight:400 !important;color:var(--muted) !important;line-height:1.5}

@media (min-width:641px){.cw{padding:46px 24px 76px}.cw-margin{left:48px}}
@media (prefers-reduced-motion:reduce){.cw-cta{transition:none}}
`;
