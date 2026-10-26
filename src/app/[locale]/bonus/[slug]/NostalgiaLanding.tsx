'use client';

// The bonus puzzles printed (as a QR) on page 128 of "Nostalgia Word Search for Seniors". Same night-blue,
// chrome and neon look as the book cover (the jukebox). Data and the permanent slug live in nostalgia-bonus.ts.
// Direct download, no email capture (KDP bonus content rules, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Pacifico, Atkinson_Hyperlegible } from 'next/font/google';
import type { NostalgiaBonus } from './nostalgia-bonus';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });
const script = Pacifico({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

/** A 45 rpm record with a sunshine label. Pure SVG. */
function Record() {
    return (
        <svg className="nw-record" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="96" fill="#141416" />
            {[88, 80, 72, 64, 56].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#2C2C31" strokeWidth="1.5" />
            ))}
            <circle cx="100" cy="100" r="44" fill="#FFC93C" />
            <circle cx="100" cy="100" r="38" fill="none" stroke="#13213F" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="5" fill="#13213F" />
            <path d="M40 46 A82 82 0 0 1 86 20" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );
}

export function NostalgiaLanding({ bonus: BONUS }: { bonus: NostalgiaBonus }) {
    return (
        <main className={`nw ${body.className}`}>
            <style>{CSS}</style>
            <div className="nw-col">
                <p className={`nw-brand ${display.className}`}>Fun Books Publisher</p>

                <header className="nw-hero">
                    <p className={`nw-found ${script.className}`}>Welcome back!</p>
                    <h1 className={`nw-title ${display.className}`}>{BONUS.title}</h1>
                    <p className="nw-lede">{BONUS.subtitle}</p>
                </header>

                <div className="nw-object">
                    <div className="nw-record-wrap"><Record /></div>
                    <Image
                        className="nw-cover"
                        src={BONUS.cover}
                        alt="A puzzle page from 100 More Nostalgia Word Searches"
                        width={1105}
                        height={1430}
                        priority
                        sizes="(max-width: 640px) 64vw, 300px"
                    />
                </div>

                <div className="nw-get">
                    <a
                        className={`nw-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Download the 100 puzzles
                    </a>
                    <p className="nw-meta">
                        PDF, {BONUS.pages} pages, {BONUS.size}. No sign-up. Print the pages you like and grab a pencil.
                    </p>
                </div>

                <section className="nw-decades">
                    <h2 className={`nw-h2 ${display.className}`}>Four decades, 25 puzzles each</h2>
                    {BONUS.decades.map((d) => (
                        <div key={d.decade} className="nw-decade">
                            <span className={`nw-tag ${display.className}`}>{d.level}</span>
                            <span className="nw-decade-text">
                                <span className="nw-decade-name">{d.decade}</span>
                                <span className="nw-decade-note">For example: {d.sample}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="nw-inside">
                    <h2 className={`nw-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {BONUS.inside.map((line, i) => (
                            <li key={line}>
                                <span className={`nw-num ${display.className}`}>{i + 1}</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer className="nw-foot">
                    <p className={script.className}>Enjoy the trip down memory lane.</p>
                    <p className="nw-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of Nostalgia Word Search for Seniors. Print for your own personal use.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.nw{--night:#13213F;--cream:#FFF3DC;--pink:#FF3D8B;--sun:#FFC93C;--teal:#22D3D6;--muted:#B9C3DA;--rule:rgba(255,243,220,.16);
position:relative;min-height:100vh;background:var(--night);color:var(--cream);
padding:28px 20px 60px;overflow:hidden;-webkit-font-smoothing:antialiased}
.nw *{box-sizing:border-box}
.nw::before{content:'';position:fixed;inset:0;z-index:-1;
background:radial-gradient(ellipse at 50% 38%,rgba(255,180,90,.20),transparent 60%),var(--night)}
.nw-col{position:relative;max-width:600px;margin:0 auto;text-align:center}
.nw-brand{margin:0 0 26px;font-size:18px;letter-spacing:.16em;color:var(--muted)}

.nw-found{margin:0 0 4px;font-size:clamp(30px,8vw,40px);color:var(--pink);
text-shadow:0 0 14px rgba(255,61,139,.55);animation:nw-glow 2.6s ease-in-out infinite alternate}
@keyframes nw-glow{from{text-shadow:0 0 8px rgba(255,61,139,.35)}to{text-shadow:0 0 20px rgba(255,61,139,.75)}}
.nw-title{margin:0;font-size:clamp(44px,12vw,70px);line-height:.95;letter-spacing:.01em;
background:linear-gradient(180deg,#FFFFFF 0%,#D9DEE8 45%,#9AA3B5 55%,#F4F6FA 100%);
-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 0 #000)}
.nw .nw-lede{margin:16px auto 0;max-width:32em;font-size:19px;line-height:1.6;color:var(--cream)}

.nw-object{position:relative;margin:34px auto 0;width:min(270px,64vw)}
.nw-cover{position:relative;display:block;width:100%;height:auto;border-radius:4px;transform:rotate(-2deg);
box-shadow:0 0 0 6px var(--cream),0 0 26px 8px rgba(34,211,214,.35),0 24px 44px rgba(0,0,0,.5)}
.nw-record-wrap{position:absolute;width:46%;right:-22%;top:-10%;z-index:0;animation:nw-spin 9s linear infinite}
.nw-record{width:100%;height:auto;display:block;filter:drop-shadow(0 8px 14px rgba(0,0,0,.5))}
@keyframes nw-spin{to{transform:rotate(360deg)}}

.nw-get{margin:38px 0 0}
.nw-cta{display:inline-block;background:var(--sun);color:var(--night);text-decoration:none;
font-size:clamp(22px,5.8vw,28px);letter-spacing:.04em;padding:18px 38px;border-radius:999px;
box-shadow:0 6px 0 #B8861A,0 0 24px rgba(255,201,60,.45);transition:transform .12s ease,box-shadow .12s ease}
.nw-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 #B8861A,0 0 30px rgba(255,201,60,.6)}
.nw-cta:active{transform:translateY(6px);box-shadow:0 0 0 #B8861A}
.nw-cta:focus-visible{outline:3px solid var(--teal);outline-offset:4px}
.nw-meta{margin:14px auto 0;max-width:30em;font-size:16px;line-height:1.5;color:var(--muted)}

.nw-h2{margin:0 0 14px;font-size:32px;line-height:1.05;letter-spacing:.02em;color:var(--cream)}

.nw-decades{margin:50px 0 0;text-align:left}
.nw-decade{display:flex;gap:16px;align-items:center;padding:12px 14px;margin:0 0 12px;border-radius:10px;
background:#FFFFFF;color:var(--night);border-top:5px solid var(--pink);border-bottom:5px solid var(--teal)}
.nw-tag{flex:0 0 96px;text-align:center;background:#D7263D;color:#fff;border-radius:6px;padding:8px;font-size:22px;letter-spacing:.04em}
.nw-decade-text{display:flex;flex-direction:column}
.nw-decade-name{font-size:19px;font-weight:700;line-height:1.3}
.nw-decade-note{font-size:15px;color:#4A5370}

.nw-inside{margin:46px 0 0;text-align:left}
.nw-inside ul{margin:0;padding:0;list-style:none}
.nw-inside li{display:flex;gap:16px;align-items:flex-start;padding:15px 0;border-top:1px solid var(--rule);font-size:18px;line-height:1.5}
.nw-inside li:last-child{border-bottom:1px solid var(--rule)}
.nw-num{flex:0 0 34px;height:34px;border-radius:50%;background:var(--sun);color:var(--night);
display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1}

.nw-foot{margin:54px 0 0;padding-top:22px;border-top:2px solid var(--rule)}
.nw-foot p{margin:0;font-size:24px;color:var(--sun)}
.nw-legal{margin-top:10px !important;font-size:13px !important;color:var(--muted) !important;line-height:1.5}

@media (min-width:641px){.nw{padding:46px 24px 76px}.nw-object{width:300px}}
@media (max-width:380px){.nw-tag{flex-basis:80px;font-size:19px}}
@media (prefers-reduced-motion:reduce){.nw-found,.nw-record-wrap{animation:none}.nw-cta{transition:none}}
`;
