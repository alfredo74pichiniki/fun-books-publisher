'use client';

import Image from 'next/image';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { Anton, Bitter } from 'next/font/google';
import { COMPASS_GIFTS, otherGifts, type CompassGift } from './compass-gifts';

const display = Anton({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Bitter({ weight: ['400', '600', '700'], subsets: ['latin'], display: 'swap' });

/** Compass rose. The needle swings once on load and settles pointing at the download. */
function CompassRose({ tint }: { tint: string }) {
    const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
    return (
        <svg className="cg-rose" viewBox="0 0 200 200" aria-hidden="true">
            <g opacity="0.16">
            <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="0.6" />
            {ticks.map((deg) => (
                <line
                    key={deg}
                    x1="100"
                    y1="8"
                    x2="100"
                    y2={deg % 45 === 0 ? 20 : 14}
                    stroke="currentColor"
                    strokeWidth={deg % 45 === 0 ? 1.6 : 0.7}
                    transform={`rotate(${deg} 100 100)`}
                />
            ))}
            {/* minor points */}
            <g opacity="0.55">
                {[45, 135, 225, 315].map((deg) => (
                    <path
                        key={deg}
                        d="M100 24 L110 100 L100 176 L90 100 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        transform={`rotate(${deg} 100 100)`}
                    />
                ))}
            </g>
            {/* major points */}
            {[0, 90].map((deg) => (
                <path
                    key={deg}
                    d="M100 16 L113 100 L100 184 L87 100 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    transform={`rotate(${deg} 100 100)`}
                />
            ))}
            <g className={body.className} fontSize="15" fontWeight="700" fill="currentColor" textAnchor="middle">
                <text x="100" y="46">N</text>
                <text x="155" y="106">E</text>
                <text x="100" y="164">S</text>
                <text x="45" y="106">W</text>
            </g>
            </g>
            {/* the needle: rest position points down, at the download */}
            <g className="cg-needle">
                <path d="M100 100 L92 62 L100 26 L108 62 Z" fill="currentColor" opacity="0.28" />
                <path d="M100 100 L92 138 L100 174 L108 138 Z" fill={tint} />
                <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.7" />
                <circle cx="100" cy="100" r="2.4" fill="#FBF6EC" />
            </g>
        </svg>
    );
}

const GLYPHS = [
    // pages / book
    'M4 5.5c3.4-1.6 6.6-1.6 8 0 1.4-1.6 4.6-1.6 8 0v12c-3.4-1.6-6.6-1.6-8 0-1.4-1.6-4.6-1.6-8 0v-12Z',
    // folded map
    'M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5ZM9 4v13.5M15 6.5V20',
    // star
    'M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.5Z',
];

export function CompassLanding({ gift }: { gift: CompassGift }) {
    const others = otherGifts(gift.slug);

    return (
        <main className={`cg ${body.className}`}>
            <style>{CSS}</style>

            <svg className="cg-contours" viewBox="0 0 800 1200" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <path
                        key={i}
                        d={`M-60 ${180 + i * 130} C 160 ${100 + i * 130}, 300 ${300 + i * 130}, 500 ${210 + i * 130} S 760 ${120 + i * 130}, 900 ${230 + i * 130}`}
                        fill="none"
                        stroke="#16233F"
                        strokeWidth="1.5"
                    />
                ))}
            </svg>

            <div className="cg-col">
                <p className="cg-brand">Fun Books Publisher</p>

                <header className="cg-hero">
                    <p className="cg-found">You found it.</p>
                    <h1 className={`cg-title ${display.className}`}>{gift.name}</h1>
                    <p className="cg-lede">{gift.lede}</p>
                </header>

                <div className="cg-object">
                    <Image
                        className="cg-cover"
                        src={gift.cover}
                        alt={`Cover of ${gift.name}`}
                        width={1000}
                        height={1500}
                        priority
                        sizes="(max-width: 640px) 62vw, 300px"
                    />
                </div>

                <div className="cg-rose-wrap" style={{ color: '#16233F' }}>
                    <CompassRose tint={gift.tint} />
                </div>

                <div className="cg-get">
                    <a
                        className={`cg-cta ${display.className}`}
                        href={gift.pdf}
                        download
                        onClick={() => track('bonus_download', { book: gift.slug })}
                    >
                        {gift.action}
                    </a>
                    <p className="cg-meta">
                        PDF, {gift.pages} pages, {gift.size}. Gift {gift.step} of 3.
                    </p>
                </div>

                <section className="cg-inside">
                    <h2 className={`cg-h2 ${display.className}`}>What is inside</h2>
                    <ul>
                        {gift.inside.map((line, i) => (
                            <li key={line}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: gift.tint }}>
                                    <path
                                        d={GLYPHS[i % GLYPHS.length]}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="cg-more">
                    <h2 className={`cg-h2 ${display.className}`}>Two more are waiting</h2>
                    {others.map((o) => (
                        <Link key={o.slug} className="cg-other" href={`/bonus/${o.slug}`}>
                            <Image src={o.cover} alt="" width={1000} height={1500} sizes="72px" />
                            <span className="cg-other-name">{o.name}</span>
                            <span className="cg-other-go" aria-hidden="true">
                                Open
                            </span>
                        </Link>
                    ))}
                </section>

                <footer className="cg-foot">
                    <p>Keep exploring.</p>
                    <p className="cg-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the reader of How to Use a
                        Compass for Kids.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.cg{--ink:#16233F;--paper:#FBF6EC;--flame:#E8531F;--kraft:#D8C9A8;--muted:#5C6478;
position:relative;min-height:100vh;background:var(--paper);color:var(--ink);
padding:28px 20px 56px;overflow:hidden;-webkit-font-smoothing:antialiased}
.cg *{box-sizing:border-box}
.cg::before{content:'';position:fixed;inset:0;background:var(--paper);z-index:-1}
.cg-contours{position:absolute;inset:0;width:100%;height:100%;opacity:.05;pointer-events:none}
.cg-col{position:relative;max-width:600px;margin:0 auto;text-align:center}

.cg-brand{margin:0 0 30px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;
color:var(--muted);font-weight:600}

.cg-hero{position:relative;padding-top:8px}
.cg-rose-wrap{width:132px;margin:16px auto 14px;pointer-events:none}
.cg-rose{width:100%;height:auto;display:block}
.cg-needle{transform-origin:100px 100px;animation:cg-swing 1.9s cubic-bezier(.22,1.1,.36,1) both}
@keyframes cg-swing{0%{transform:rotate(-155deg)}55%{transform:rotate(24deg)}
78%{transform:rotate(-9deg)}100%{transform:rotate(0deg)}}

.cg-found{position:relative;margin:0 0 6px;font-size:17px;font-style:italic;color:var(--flame)}
.cg-title{position:relative;margin:0;font-size:clamp(34px,9.6vw,54px);line-height:.96;
letter-spacing:.005em;text-transform:uppercase}
.cg .cg-lede{position:relative;margin:16px auto 0;max-width:34em;font-size:17px;line-height:1.62;
color:#2C3A54}

.cg-object{margin:30px 0 0}
.cg-cover{display:block;margin:0 auto;width:min(260px,62vw);height:auto;border-radius:3px;transform:rotate(-2.2deg);
box-shadow:0 22px 44px rgba(22,35,63,.26),0 3px 0 rgba(22,35,63,.12)}

.cg-get{margin:0}
.cg-cta{display:inline-block;background:var(--flame);color:var(--paper);text-decoration:none;
font-size:clamp(19px,5vw,23px);letter-spacing:.02em;text-transform:uppercase;
padding:19px 40px;border-radius:14px;box-shadow:0 6px 0 var(--ink);
transition:transform .12s ease,box-shadow .12s ease}
.cg-cta:hover{transform:translateY(2px);box-shadow:0 4px 0 var(--ink)}
.cg-cta:active{transform:translateY(6px);box-shadow:0 0 0 var(--ink)}
.cg-cta:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.cg-meta{margin:14px 0 0;font-size:14px;color:var(--muted)}

.cg-h2{margin:0 0 14px;font-size:26px;line-height:1.1;color:var(--ink)}
.cg-inside{margin:54px 0 0;text-align:left}
.cg-inside ul{margin:0;padding:0;list-style:none}
.cg-inside li{display:flex;gap:14px;align-items:flex-start;padding:14px 0;
border-top:1px solid rgba(22,35,63,.13);font-size:16px;line-height:1.5}
.cg-inside li:last-child{border-bottom:1px solid rgba(22,35,63,.13)}
.cg-inside svg{flex:0 0 24px;width:24px;height:24px;margin-top:1px}

.cg-more{margin:52px 0 0;text-align:left}
.cg-other{display:flex;gap:14px;align-items:center;padding:12px 0;text-decoration:none;
color:inherit;border-top:1px solid rgba(22,35,63,.13)}
.cg-more .cg-other:last-of-type{border-bottom:1px solid rgba(22,35,63,.13)}
.cg-other img{width:48px;height:auto;border-radius:2px;box-shadow:0 3px 10px rgba(22,35,63,.22)}
.cg-other-name{flex:1;font-size:16px;font-weight:600;line-height:1.35}
.cg-other-go{font-size:14px;font-weight:700;color:var(--flame)}
.cg-other:hover .cg-other-go{text-decoration:underline}
.cg-other:focus-visible{outline:3px solid var(--ink);outline-offset:3px;border-radius:4px}

.cg-foot{margin:58px 0 0;padding-top:22px;border-top:2px solid var(--kraft)}
.cg-foot p{margin:0;font-size:15px;font-weight:600}
.cg-legal{margin-top:8px !important;font-size:12px !important;font-weight:400 !important;
color:var(--muted);line-height:1.5}

@media (min-width:641px){
.cg{padding:44px 24px 72px}
.cg-rose-wrap{width:148px}
.cg-cover{width:290px}
}
@media (prefers-reduced-motion:reduce){
.cg-needle{animation:none}
.cg-cta{transition:none}
}
`;
