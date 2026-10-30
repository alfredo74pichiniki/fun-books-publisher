'use client';

// The bonus flashcards printed (as a QR) at the end of the 50 States road trip workbook for kids. Road trip look:
// asphalt, a yellow center line and a highway shield. Data and the permanent slug live in states-bonus.ts.
// Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Anton, Atkinson_Hyperlegible } from 'next/font/google';
import type { StatesBonus } from './states-bonus';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });
const heavy = Anton({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

/** A generic highway shield with the stop number. Pure SVG. */
function Shield() {
    return (
        <svg className="st-shield" viewBox="0 0 120 130" aria-hidden="true">
            <path
                d="M6 20 C30 8 90 8 114 20 C120 70 96 104 60 124 C24 104 0 70 6 20 Z"
                fill="#FFFFFF"
                stroke="#1D1F24"
                strokeWidth="6"
            />
            <text x="60" y="52" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="20" fill="#1D1F24">
                STOP
            </text>
            <text x="60" y="98" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="44" fill="#1D1F24">
                50
            </text>
        </svg>
    );
}

export function StatesLanding({ bonus: BONUS }: { bonus: StatesBonus }) {
    return (
        <main className={`st ${body.className}`}>
            <style>{CSS}</style>
            <div className="st-col">
                <p className={`st-brand ${display.className}`}>Fun Books Publisher</p>

                <header className="st-hero">
                    <Shield />
                    <p className={`st-found ${display.className}`}>You made it to the bonus stop!</p>
                    <h1 className={`st-title ${heavy.className}`}>{BONUS.title}</h1>
                    <p className="st-lede">{BONUS.subtitle}.</p>
                </header>

                <div className="st-road" aria-hidden="true" />

                <div className="st-object">
                    <Image
                        className="st-cover"
                        src={BONUS.cover}
                        alt="Two flashcards: the outline of Maine and New Hampshire on the front, their facts on the back"
                        width={1122}
                        height={1004}
                        priority
                        sizes="(max-width: 640px) 88vw, 520px"
                    />
                </div>

                <div className="st-get">
                    <a
                        className={`st-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Download the 50 flashcards
                    </a>
                    <p className="st-meta">
                        PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print, cut along the dotted lines and play.
                    </p>
                </div>

                <section className="st-games">
                    <h2 className={`st-h2 ${display.className}`}>Three games to play</h2>
                    {BONUS.games.map((g, i) => (
                        <div key={g.name} className="st-game">
                            <span className={`st-tag ${heavy.className}`}>{i + 1}</span>
                            <span className="st-game-text">
                                <span className="st-game-name">{g.name}</span>
                                <span className="st-game-note">{g.how}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="st-inside">
                    <h2 className={`st-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </section>

                <footer className="st-foot">
                    <p className={display.className}>Have a great trip, explorer!</p>
                    <p className="st-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of our 50 States road
                        trip workbook. Print for use at home or in your own classroom.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.st{--asphalt:#24262B;--asphalt2:#2E3036;--line:#FFD23F;--white:#FFFFFF;--muted:#C4C8D0;--sky:#3BA7E0;--rule:rgba(255,255,255,.14);
position:relative;min-height:100vh;background:var(--asphalt);color:var(--white);padding:28px 20px 60px;overflow:hidden;
-webkit-font-smoothing:antialiased}
.st *{box-sizing:border-box}
.st-col{position:relative;max-width:620px;margin:0 auto;text-align:center}
.st-brand{margin:0 0 22px;font-size:18px;letter-spacing:.16em;color:var(--muted)}

.st-shield{width:92px;height:auto;display:block;margin:0 auto 10px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.45))}
.st-found{margin:0 0 6px;font-size:clamp(22px,6vw,28px);letter-spacing:.06em;color:var(--line)}
.st-title{margin:0;font-size:clamp(46px,13vw,76px);line-height:.95;letter-spacing:.01em;color:var(--white);
text-transform:uppercase}
.st .st-lede{margin:16px auto 0;max-width:30em;font-size:19px;line-height:1.6;color:var(--white)}

.st-road{margin:30px auto 0;height:10px;max-width:100%;
background:repeating-linear-gradient(90deg,var(--line) 0 38px,transparent 38px 64px)}

.st-object{margin:30px auto 0;width:min(520px,88vw)}
.st-cover{display:block;width:100%;height:auto;border-radius:10px;background:#fff;
box-shadow:0 0 0 6px var(--white),0 22px 44px rgba(0,0,0,.5)}

.st-get{margin:36px 0 0}
.st-cta{display:inline-block;background:var(--line);color:var(--asphalt);text-decoration:none;
font-size:clamp(22px,5.8vw,28px);letter-spacing:.04em;padding:18px 36px;border-radius:999px;
box-shadow:0 6px 0 #B38E12;transition:transform .12s ease,box-shadow .12s ease}
.st-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 #B38E12}
.st-cta:active{transform:translateY(6px);box-shadow:0 0 0 #B38E12}
.st-cta:focus-visible{outline:3px solid var(--sky);outline-offset:4px}
.st-meta{margin:14px auto 0;max-width:30em;font-size:16px;line-height:1.5;color:var(--muted)}

.st-h2{margin:0 0 14px;font-size:32px;line-height:1.05;letter-spacing:.02em;color:var(--white)}

.st-games{margin:48px 0 0;text-align:left}
.st-game{display:flex;gap:16px;align-items:center;padding:12px 14px;margin:0 0 12px;border-radius:10px;
background:var(--white);color:var(--asphalt);border-left:8px solid var(--line)}
.st-tag{flex:0 0 46px;height:46px;border-radius:50%;background:var(--asphalt);color:var(--line);
display:flex;align-items:center;justify-content:center;font-size:24px;line-height:1}
.st-game-text{display:flex;flex-direction:column}
.st-game-name{font-size:19px;font-weight:700;line-height:1.3}
.st-game-note{font-size:16px;color:#4A4E57;line-height:1.45}

.st-inside{margin:44px 0 0;text-align:left}
.st-inside ul{margin:0;padding:0;list-style:none}
.st-inside li{padding:14px 0 14px 30px;border-top:1px solid var(--rule);font-size:18px;line-height:1.5;position:relative}
.st-inside li::before{content:'';position:absolute;left:4px;top:23px;width:12px;height:12px;border-radius:50%;background:var(--line)}
.st-inside li:last-child{border-bottom:1px solid var(--rule)}

.st-foot{margin:52px 0 0;padding-top:22px;border-top:2px solid var(--rule)}
.st-foot p{margin:0;font-size:26px;letter-spacing:.04em;color:var(--line)}
.st-legal{margin-top:10px !important;font-size:13px !important;letter-spacing:0 !important;color:var(--muted) !important;line-height:1.5}

@media (min-width:641px){.st{padding:46px 24px 76px}}
@media (prefers-reduced-motion:reduce){.st-cta{transition:none}}
`;
