'use client';

// The Bonus Mission Pack printed (as a QR on page 170) in "Secret Science Agency: Logic Puzzles for Teens and Middle
// Schoolers". Classified-file look that matches the book: black bars, condensed capitals, typewriter notes.
// Data and the permanent slug live in secret-science-agency-bonus.ts.
// Audience 11-14 (COPPA): direct download only. No form, no email, no sign-up. The only measurement is the
// cookieless Vercel Analytics event that every other bonus page already sends.

import Image from 'next/image';
import { track } from '@vercel/analytics';
import { Anton, Atkinson_Hyperlegible, Courier_Prime } from 'next/font/google';
import type { SecretScienceBonus } from './secret-science-agency-bonus';

const display = Anton({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });
const type = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

/** Book cover slot. While `src` is null it shows a dashed placeholder (the cover does not exist yet). */
function BookCover({ src, book }: { src: string | null; book: string }) {
    if (src) {
        return (
            <Image
                className="ssa-book"
                src={src}
                alt={`Cover of ${book}`}
                width={600}
                height={776}
                sizes="(max-width: 640px) 60vw, 260px"
            />
        );
    }
    return (
        <div className={`ssa-book ssa-book-placeholder ${type.className}`} role="img" aria-label="Book cover">
            BOOK COVER
            <br />
            GOES HERE
        </div>
    );
}

export function SecretScienceLanding({ bonus: B }: { bonus: SecretScienceBonus }) {
    return (
        <main className={`ssa ${body.className}`}>
            <style>{CSS}</style>
            <div className="ssa-col">
                <div className={`ssa-bar ${display.className}`}>
                    <span>Secret Science Agency</span>
                    <span>Bonus Files</span>
                </div>

                <header className="ssa-hero">
                    <p className={`ssa-found ${type.className}`}>Welcome back, agent. Department 9 is open.</p>
                    <h1 className={`ssa-title ${display.className}`}>{B.title}</h1>
                    <p className="ssa-lede">{B.subtitle}.</p>
                    <span className={`ssa-stamp ${display.className}`}>For agents only</span>
                </header>

                <div className="ssa-object">
                    <Image
                        className="ssa-preview"
                        src={B.preview}
                        alt="Three pages of the Bonus Mission Pack: the cover, mission 82 (a shift cipher) and mission 86 (a nonogram)"
                        width={1200}
                        height={1000}
                        priority
                        sizes="(max-width: 640px) 92vw, 600px"
                    />
                </div>

                <div className="ssa-get">
                    <a
                        className={`ssa-cta ${display.className}`}
                        href={B.pdf}
                        download
                        onClick={() => track('bonus_download', { book: B.slug })}
                    >
                        Download the mission pack
                    </a>
                    <p className="ssa-meta">
                        PDF, {B.pages} pages, {B.size}. No sign-up and no email. Print as many copies as you need.
                    </p>
                </div>

                <section className="ssa-sec">
                    <h2 className={`ssa-h2 ${display.className}`}>Mission briefing</h2>
                    {B.steps.map((s, i) => (
                        <div key={s.name} className="ssa-step">
                            <span className={`ssa-num ${display.className}`}>{i + 1}</span>
                            <span className="ssa-step-text">
                                <span className="ssa-step-name">{s.name}</span>
                                <span className="ssa-step-note">{s.how}</span>
                            </span>
                        </div>
                    ))}
                </section>

                <section className="ssa-sec">
                    <h2 className={`ssa-h2 ${display.className}`}>The ten files</h2>
                    <ol className="ssa-files">
                        {B.missions.map((m) => (
                            <li key={m.n}>
                                <span className={`ssa-fileno ${display.className}`}>M{m.n}</span>
                                <span className="ssa-file-text">
                                    <span className="ssa-file-name">{m.name}</span>
                                    <span className={`ssa-file-type ${type.className}`}>{m.type}</span>
                                </span>
                                <span className={`ssa-level ssa-level-${m.level.toLowerCase()} ${display.className}`}>
                                    {m.level}
                                </span>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="ssa-sec">
                    <h2 className={`ssa-h2 ${display.className}`}>What is inside</h2>
                    <ul className="ssa-inside">
                        {B.inside.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </section>

                <section className="ssa-from">
                    <BookCover src={B.bookCover} book={B.book} />
                    <p>
                        For the readers of <strong>{B.book}</strong>. The 80 missions of the book come first; these ten
                        pick up where Department 8 ends.
                    </p>
                </section>

                <footer className="ssa-foot">
                    <p className={display.className}>Case closed? Good work, agent.</p>
                    <p className="ssa-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. Print for use at home or in your own
                        classroom.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.ssa{--paper:#F7F5EF;--ink:#111418;--muted:#4D545C;--line:#D5D2C8;--red:#C8322B;--teal:#1F6F78;
position:relative;min-height:100vh;color:var(--ink);padding:24px 16px 60px;overflow:hidden;-webkit-font-smoothing:antialiased;
background-color:var(--paper);
background-image:radial-gradient(rgba(17,20,24,.10) 1px,transparent 1.2px);background-size:22px 22px}
.ssa *{box-sizing:border-box}
.ssa-col{position:relative;max-width:640px;margin:0 auto;text-align:center}

.ssa-bar{display:flex;justify-content:space-between;gap:12px;background:var(--ink);color:#fff;padding:10px 14px;
font-size:clamp(13px,3.6vw,16px);letter-spacing:.06em;text-transform:uppercase}

.ssa-hero{position:relative;margin:30px 0 0}
.ssa-found{margin:0 0 10px;font-size:clamp(16px,4.4vw,19px);font-weight:700;color:var(--teal)}
.ssa-title{margin:0;font-size:clamp(52px,15vw,96px);line-height:.95;font-weight:400;text-transform:uppercase;color:var(--ink)}
.ssa .ssa-lede{margin:16px auto 0;max-width:30em;font-size:19px;line-height:1.55;color:var(--ink)}
.ssa-stamp{display:inline-block;margin:18px 0 0;padding:6px 14px;border:3px solid var(--red);color:var(--red);
font-size:18px;letter-spacing:.08em;text-transform:uppercase;transform:rotate(-4deg)}

.ssa-object{margin:26px auto 0;width:min(600px,100%)}
.ssa-preview{display:block;width:100%;height:auto;border-radius:6px}

.ssa-get{margin:30px 0 0}
.ssa-cta{display:inline-block;background:var(--red);color:#fff;text-decoration:none;text-transform:uppercase;
font-size:clamp(22px,6vw,28px);letter-spacing:.04em;padding:16px 32px;border-radius:4px;box-shadow:0 6px 0 var(--ink);
transition:transform .12s ease,box-shadow .12s ease}
.ssa-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--ink)}
.ssa-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--ink)}
.ssa-cta:focus-visible{outline:3px solid var(--teal);outline-offset:4px}
.ssa-meta{margin:14px auto 0;max-width:30em;font-size:16px;line-height:1.5;color:var(--muted)}

.ssa-sec{margin:46px 0 0;text-align:left}
.ssa-h2{margin:0 0 14px;font-size:32px;line-height:1.05;font-weight:400;text-transform:uppercase;letter-spacing:.02em}

.ssa-step{display:flex;gap:14px;align-items:center;padding:12px 14px;margin:0 0 10px;background:#fff;
border:1px solid var(--line);border-left:8px solid var(--ink)}
.ssa-num{flex:0 0 42px;height:42px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;
font-size:22px;line-height:1}
.ssa-step-text{display:flex;flex-direction:column}
.ssa-step-name{font-size:19px;font-weight:700;line-height:1.3}
.ssa-step-note{font-size:16px;color:var(--muted);line-height:1.45}

.ssa-files{margin:0;padding:0;list-style:none;background:#fff;border:1px solid var(--line)}
.ssa-files li{display:flex;align-items:center;gap:12px;padding:12px 14px;border-top:1px solid var(--line)}
.ssa-files li:first-child{border-top:0}
.ssa-fileno{flex:0 0 52px;font-size:22px;color:var(--teal)}
.ssa-file-text{flex:1 1 auto;display:flex;flex-direction:column;min-width:0}
.ssa-file-name{font-size:18px;font-weight:700;line-height:1.3}
.ssa-file-type{font-size:15px;color:var(--muted)}
.ssa-level{flex:0 0 auto;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:4px 8px;border:2px solid var(--ink)}
.ssa-level-elite{background:var(--ink);color:#fff}

.ssa-inside{margin:0;padding:0;list-style:none;background:#fff;border:1px solid var(--line)}
.ssa-inside li{padding:14px 16px 14px 40px;border-top:1px solid var(--line);font-size:18px;line-height:1.5;position:relative}
.ssa-inside li:first-child{border-top:0}
.ssa-inside li::before{content:'';position:absolute;left:16px;top:23px;width:12px;height:12px;background:var(--red)}

.ssa-from{margin:48px 0 0;display:flex;gap:20px;align-items:center;text-align:left}
.ssa-from p{margin:0;font-size:17px;line-height:1.55;color:var(--ink)}
.ssa-book{flex:0 0 160px;width:160px;height:auto;box-shadow:0 10px 26px rgba(17,20,24,.25)}
.ssa-book-placeholder{height:207px;display:flex;align-items:center;justify-content:center;text-align:center;
border:3px dashed var(--muted);color:var(--muted);font-size:14px;font-weight:700;box-shadow:none;background:#fff}

.ssa-foot{margin:50px 0 0;padding-top:22px;border-top:3px solid var(--ink)}
.ssa-foot p{margin:0;font-size:26px;text-transform:uppercase;color:var(--ink)}
.ssa-legal{margin-top:10px !important;font-size:13px !important;text-transform:none !important;color:var(--muted) !important;
line-height:1.5;font-family:inherit}

@media (max-width:480px){.ssa-from{flex-direction:column;text-align:center}}
@media (min-width:641px){.ssa{padding:40px 24px 76px}}
@media (prefers-reduced-motion:reduce){.ssa-cta{transition:none}}
`;
