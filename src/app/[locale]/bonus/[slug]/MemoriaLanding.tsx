'use client';

// Gift pages printed (as a QR) in the "Ejercicios de Memoria para Personas Mayores" books (volume 1 and 2). In Spanish.
// Look of the book interior: black ribbon with stars, ink on warm paper, big readable type for older readers.
// Data and the permanent slug live in memoria-bonus.ts. Direct download, no email capture (KDP, G202018960).

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Playfair_Display, Lexend } from 'next/font/google';
import type { MemoriaBonus } from './memoria-bonus';

const display = Playfair_Display({ weight: ['700', '900'], subsets: ['latin'], display: 'swap' });
// Lexend, not Atkinson: Atkinson draws a slashed zero, and the book itself avoids it for older readers.
const body = Lexend({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

function Filete() {
    return (
        <svg className="mm-filete" viewBox="0 0 400 16" aria-hidden="true">
            <line x1="0" y1="8" x2="182" y2="8" stroke="#1B1B1B" strokeWidth="1.5" />
            <path d="M200 1 L207 8 L200 15 L193 8 Z" fill="#B8862B" />
            <line x1="218" y1="8" x2="400" y2="8" stroke="#1B1B1B" strokeWidth="1.5" />
        </svg>
    );
}

export function MemoriaLanding({ bonus: BONUS }: { bonus: MemoriaBonus }) {
    return (
        <main className={`mm ${body.className}`} lang="es">
            <style>{CSS}</style>
            <div className="mm-col">
                <div className="mm-ribbon">
                    <span>Fun Books Publisher</span>
                    <span className="mm-stars" aria-hidden="true">
                        ★ ★ ★
                    </span>
                </div>

                <header className="mm-hero">
                    <p className="mm-kicker">Un regalo para los lectores de {BONUS.book}</p>
                    <h1 className={`mm-title ${display.className}`}>{BONUS.title}</h1>
                    <Filete />
                    <p className="mm-lede">{BONUS.subtitle}.</p>
                </header>

                <div className="mm-object">
                    <Image
                        className="mm-cover"
                        src={BONUS.cover}
                        alt={BONUS.coverAlt}
                        width={1200}
                        height={780}
                        priority
                        sizes="(max-width: 640px) 92vw, 640px"
                    />
                </div>

                <div className="mm-get">
                    <a
                        className={`mm-cta ${display.className}`}
                        href={BONUS.pdf}
                        download
                        onClick={() => track('bonus_download', { book: BONUS.slug })}
                    >
                        Descargar el regalo
                    </a>
                    <p className="mm-meta">
                        PDF de {BONUS.pages} páginas, {BONUS.size}. Sin registrarse. Puede imprimirlo las veces que quiera.
                    </p>
                </div>

                <section className="mm-steps">
                    <h2 className={`mm-h2 ${display.className}`}>Cómo usarlo</h2>
                    {BONUS.steps.map((s, i) => (
                        <div key={s.name} className="mm-step">
                            <span className={`mm-tag ${display.className}`}>{i + 1}</span>
                            <span className="mm-step-text">
                                <span className="mm-step-name">{s.name}</span>
                                <span className="mm-step-note">{s.how}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="mm-inside">
                    <h2 className={`mm-h2 ${display.className}`}>Qué incluye</h2>
                    <ul>
                        {BONUS.inside.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </section>

                <p className="mm-en">{BONUS.english}</p>

                <footer className="mm-foot">
                    <p className={display.className}>Que disfruten este rato juntos.</p>
                    <p className="mm-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. Para los lectores de {BONUS.book}.
                        Para uso en casa.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.mm{--paper:#FBF7EF;--ink:#1B1B1B;--muted:#55504A;--gold:#B8862B;--line:#E4DACA;
min-height:100vh;color:var(--ink);padding:24px 16px 64px;background:var(--paper);-webkit-font-smoothing:antialiased}
.mm *{box-sizing:border-box}
.mm-col{max-width:680px;margin:0 auto;text-align:center}
.mm-ribbon{display:flex;justify-content:space-between;align-items:center;background:var(--ink);color:#fff;
border-radius:14px;padding:12px 20px;font-size:18px;font-weight:700;letter-spacing:.02em}
.mm-stars{color:#F3D58A;letter-spacing:.1em}

.mm-hero{margin:34px 0 0}
.mm-kicker{margin:0 0 12px;font-size:19px;line-height:1.45;color:var(--muted)}
.mm-title{margin:0;font-size:clamp(38px,9.5vw,60px);line-height:1.08;font-weight:900;color:var(--ink)}
.mm-filete{display:block;width:min(360px,80%);height:16px;margin:20px auto 0}
.mm .mm-lede{margin:18px auto 0;max-width:32em;font-size:21px;line-height:1.6}

.mm-object{margin:30px auto 0;width:min(640px,92vw)}
.mm-cover{display:block;width:100%;height:auto;border-radius:12px;
box-shadow:0 0 0 1px rgba(27,27,27,.1),0 18px 40px rgba(60,40,20,.16)}

.mm-get{margin:36px 0 0}
.mm-cta{display:inline-block;background:var(--ink);color:#fff;text-decoration:none;font-weight:900;
font-size:clamp(24px,6vw,30px);padding:20px 40px;border-radius:999px;box-shadow:0 6px 0 var(--gold);
transition:transform .12s ease,box-shadow .12s ease}
.mm-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--gold)}
.mm-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--gold)}
.mm-cta:focus-visible{outline:3px solid var(--gold);outline-offset:4px}
.mm-meta{margin:16px auto 0;max-width:30em;font-size:18px;line-height:1.5;color:var(--muted)}

.mm-h2{margin:0 0 16px;font-size:34px;line-height:1.15;font-weight:900}
.mm-steps{margin:52px 0 0;text-align:left}
.mm-step{display:flex;gap:16px;align-items:center;padding:14px 16px;margin:0 0 12px;border-radius:12px;
background:#fff;border:1px solid var(--line);border-left:8px solid var(--ink)}
.mm-tag{flex:0 0 50px;height:50px;border-radius:50%;background:var(--ink);color:#F3D58A;font-weight:900;
display:flex;align-items:center;justify-content:center;font-size:24px;line-height:1}
.mm-step-text{display:flex;flex-direction:column}
.mm-step-name{font-size:21px;font-weight:700;line-height:1.3}
.mm-step-note{font-size:18px;color:var(--muted);line-height:1.5}

.mm-inside{margin:46px 0 0;text-align:left}
.mm-inside ul{margin:0;padding:0;list-style:none;background:#fff;border-radius:12px;border:1px solid var(--line)}
.mm-inside li{padding:16px 18px 16px 46px;border-top:1px solid var(--line);font-size:19px;line-height:1.55;position:relative}
.mm-inside li:first-child{border-top:0}
.mm-inside li::before{content:'★';position:absolute;left:18px;top:16px;color:var(--gold);font-size:18px}

.mm-en{margin:40px auto 0;max-width:34em;font-size:16px;line-height:1.55;color:var(--muted)}
.mm-foot{margin:48px 0 0;padding-top:24px;border-top:2px solid var(--line)}
.mm-foot p{margin:0;font-size:26px;font-weight:900}
.mm-legal{margin-top:12px !important;font-size:14px !important;font-weight:400 !important;color:var(--muted);line-height:1.5}

@media (min-width:641px){.mm{padding:44px 24px 80px}}
@media (prefers-reduced-motion:reduce){.mm-cta{transition:none}}
`;
