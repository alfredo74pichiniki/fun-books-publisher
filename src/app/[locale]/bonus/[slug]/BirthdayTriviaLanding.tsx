'use client';

// Gift page for book 07 (large print trivia for seniors, 1950s to 1980s). Two tools, no download behind a form:
// 1. Birthday Time Machine: pick a birth year (1936-1966) and get a keepsake card, saved as a PNG drawn on a canvas
//    in the browser (no external service) or shared with the Web Share API (WhatsApp on a phone).
// 2. TV Game Show Mode: the rounds of the book, full screen and in huge type for the living-room TV.
// Every fact and question comes from birthday-trivia-data.ts, generated from the book's verified bank by
// fabrica/trivia/exporta_web.py. Nothing is typed by hand here. Same look family as the book: Bebas, Special Elite,
// Atkinson Hyperlegible, night blue, cherry red and mustard.

import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { track } from '@vercel/analytics';
import { Bebas_Neue, Special_Elite, Atkinson_Hyperlegible } from 'next/font/google';
import type { BirthdayTriviaBonus } from './birthday-trivia-bonus';
import { BIRTH_YEAR_CARDS, TRIVIA_DECADES, type BirthYearCard, type TriviaQuestion } from './birthday-trivia-data';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });
const typewriter = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap' });
const body = Atkinson_Hyperlegible({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

const LETTERS = ['A', 'B', 'C', 'D'];
const TIMERS = [0, 15, 30, 60];
const MAX_PLAYERS = 6;

/* ------------------------------------------------------------------ card facts */

type Fact = { label: string; value: string; note?: string; half: boolean };

function factsOf(card: BirthYearCard): Fact[] {
    const out: Fact[] = [];
    if (card.president) out.push({ label: 'President', value: card.president, half: true });
    if (card.population) out.push({ label: 'U.S. population', value: card.population, half: true });
    if (card.stamp) out.push({ label: 'First-class stamp', value: card.stamp, half: true });
    if (card.minimumWage) out.push({ label: 'Federal minimum wage', value: card.minimumWage, half: true });
    if (card.song) {
        out.push({ label: 'Billboard No. 1 song of the year', value: `"${card.song.title}" by ${card.song.artist}`, half: false });
    }
    if (card.bestPicture) {
        out.push({ label: 'Best Picture', value: card.bestPicture.title, note: card.bestPicture.note, half: false });
    }
    if (card.worldSeries) out.push({ label: 'World Series champions', value: card.worldSeries, half: false });
    return out;
}

/* ------------------------------------------------------------------ canvas card */

const CW = 1080;
const CH = 1350;
const COL = {
    ink: '#14213D',
    cream: '#FFF4DE',
    paper: '#FBE6BE',
    cherry: '#B3122B',
    mustard: '#F2B33D',
    brown: '#7A4A00',
    grey: '#4A4F5E',
};

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = '';
    for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (line && ctx.measureText(test).width > max) {
            lines.push(line);
            line = w;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

type Fonts = { display: string; type: string; body: string };

/** Draws (or only measures, when draw is false) the facts and the event box at scale s. Returns the bottom y. */
function layoutCard(ctx: CanvasRenderingContext2D, card: BirthYearCard, f: Fonts, s: number, draw: boolean): number {
    const pad = 96;
    const inner = CW - pad * 2;
    const gap = 40;
    const colW = (inner - gap) / 2;
    const labelSize = Math.round(30 * s);
    const valueSize = Math.round(38 * s);
    const lineH = Math.round(valueSize * 1.22);
    const noteSize = Math.round(24 * s);
    let y = 500;

    const block = (fact: Fact, x: number, width: number, top: number): number => {
        let yy = top;
        ctx.font = `${labelSize}px ${f.display}`;
        if (draw) {
            ctx.fillStyle = COL.cherry;
            ctx.fillText(fact.label.toUpperCase(), x, yy + labelSize);
        }
        yy += labelSize + 8;
        ctx.font = `bold ${valueSize}px ${f.body}`;
        for (const l of wrap(ctx, fact.value, width)) {
            if (draw) {
                ctx.fillStyle = COL.ink;
                ctx.fillText(l, x, yy + valueSize);
            }
            yy += lineH;
        }
        if (fact.note) {
            ctx.font = `${noteSize}px ${f.body}`;
            for (const l of wrap(ctx, fact.note, width)) {
                if (draw) {
                    ctx.fillStyle = COL.grey;
                    ctx.fillText(l, x, yy + noteSize);
                }
                yy += Math.round(noteSize * 1.3);
            }
        }
        return yy;
    };

    const facts = factsOf(card);
    let i = 0;
    while (i < facts.length) {
        const a = facts[i];
        if (a.half) {
            const b = facts[i + 1] && facts[i + 1].half ? facts[i + 1] : null;
            const endA = block(a, pad, colW, y);
            const endB = b ? block(b, pad + colW + gap, colW, y) : endA;
            y = Math.max(endA, endB) + Math.round(26 * s);
            i += b ? 2 : 1;
        } else {
            y = block(a, pad, inner, y) + Math.round(26 * s);
            i += 1;
        }
    }

    if (card.event) {
        const evSize = Math.round(32 * s);
        const evLine = Math.round(evSize * 1.32);
        const boxPad = 28;
        ctx.font = `${evSize}px ${f.type}`;
        const lines = wrap(ctx, card.event, inner - boxPad * 2);
        const head = Math.round(30 * s);
        const boxH = boxPad + head + 12 + lines.length * evLine + boxPad + 4;
        if (draw) {
            ctx.fillStyle = COL.paper;
            ctx.strokeStyle = COL.ink;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(pad, y, inner, boxH, 18);
            ctx.fill();
            ctx.stroke();
            ctx.font = `${head}px ${f.display}`;
            ctx.fillStyle = COL.brown;
            ctx.fillText('THAT SAME YEAR', pad + boxPad, y + boxPad + head - 4);
            ctx.font = `${evSize}px ${f.type}`;
            ctx.fillStyle = COL.ink;
            lines.forEach((l, k) => ctx.fillText(l, pad + boxPad, y + boxPad + head + 12 + (k + 1) * evLine - 10));
        }
        y += boxH;
    }
    return y;
}

function drawCard(ctx: CanvasRenderingContext2D, card: BirthYearCard, f: Fonts, credit: string) {
    // paper and double frame
    ctx.fillStyle = COL.cream;
    ctx.fillRect(0, 0, CW, CH);
    ctx.strokeStyle = COL.ink;
    ctx.lineWidth = 16;
    ctx.strokeRect(28, 28, CW - 56, CH - 56);
    ctx.strokeStyle = COL.cherry;
    ctx.lineWidth = 3;
    ctx.strokeRect(54, 54, CW - 108, CH - 108);

    // sunburst behind the year
    const cx = CW / 2;
    const cy = 300;
    ctx.save();
    ctx.beginPath();
    ctx.rect(56, 56, CW - 112, 400);
    ctx.clip();
    for (let k = 0; k < 36; k += 1) {
        const a0 = (k / 36) * Math.PI * 2;
        const a1 = ((k + 0.5) / 36) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a0) * 700, cy + Math.sin(a0) * 700);
        ctx.lineTo(cx + Math.cos(a1) * 700, cy + Math.sin(a1) * 700);
        ctx.closePath();
        ctx.fillStyle = 'rgba(242,179,61,0.30)';
        ctx.fill();
    }
    ctx.restore();

    // ribbon
    ctx.textAlign = 'center';
    ctx.fillStyle = COL.ink;
    ctx.beginPath();
    ctx.roundRect(cx - 330, 90, 660, 78, 12);
    ctx.fill();
    ctx.fillStyle = COL.cream;
    ctx.font = `60px ${f.display}`;
    ctx.fillText('THE YEAR YOU WERE BORN', cx, 152);

    // the year
    ctx.font = `250px ${f.display}`;
    ctx.fillStyle = COL.ink;
    ctx.fillText(String(card.year), cx + 9, 418 + 9);
    ctx.fillStyle = COL.cherry;
    ctx.fillText(String(card.year), cx, 418);

    ctx.strokeStyle = COL.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(96, 468);
    ctx.lineTo(CW - 96, 468);
    ctx.stroke();

    // facts, shrinking the type until everything fits above the footer
    ctx.textAlign = 'left';
    let s = 1;
    while (s > 0.62 && layoutCard(ctx, card, f, s, false) > CH - 150) s -= 0.03;
    layoutCard(ctx, card, f, s, true);

    // footer
    ctx.textAlign = 'center';
    ctx.fillStyle = COL.ink;
    ctx.font = `30px ${f.type}`;
    ctx.fillText(credit, cx, CH - 100);
    ctx.fillStyle = COL.grey;
    ctx.font = `24px ${f.body}`;
    ctx.fillText('funbookpublisher.com', cx, CH - 68);
}

async function cardBlob(card: BirthYearCard, credit: string): Promise<Blob> {
    const f: Fonts = { display: display.style.fontFamily, type: typewriter.style.fontFamily, body: body.style.fontFamily };
    if (document.fonts) {
        await Promise.all([
            document.fonts.load(`60px ${f.display}`),
            document.fonts.load(`30px ${f.type}`),
            document.fonts.load(`bold 38px ${f.body}`),
            document.fonts.load(`24px ${f.body}`),
        ]);
    }
    const canvas = document.createElement('canvas');
    canvas.width = CW;
    canvas.height = CH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not available');
    drawCard(ctx, card, f, credit);
    return new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not create the image'))), 'image/png');
    });
}

function saveBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ------------------------------------------------------------------ Birthday Time Machine */

const FIRST_YEAR = BIRTH_YEAR_CARDS[0].year;
const LAST_YEAR = BIRTH_YEAR_CARDS[BIRTH_YEAR_CARDS.length - 1].year;

function TimeMachine({ credit }: { credit: string }) {
    const [year, setYear] = useState<number | null>(null);
    const [busy, setBusy] = useState<'save' | 'share' | null>(null);
    const [msg, setMsg] = useState('');
    const card = year === null ? null : BIRTH_YEAR_CARDS.find((c) => c.year === year) ?? null;
    const fileName = card ? `born-in-${card.year}-memory-lane-trivia.png` : '';

    const pick = (y: number) => {
        setYear(y);
        setMsg('');
    };

    const onSave = async () => {
        if (!card) return;
        setBusy('save');
        try {
            saveBlob(await cardBlob(card, credit), fileName);
            setMsg('Your card has been saved to your device.');
            track('birthday_card_download', { year: card.year });
        } catch {
            setMsg('Sorry, the card could not be saved on this device.');
        } finally {
            setBusy(null);
        }
    };

    const onShare = async () => {
        if (!card) return;
        setBusy('share');
        const text = `I was born in ${card.year}! Here is what the world looked like that year.`;
        try {
            const blob = await cardBlob(card, credit);
            const file = new File([blob], fileName, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: `Born in ${card.year}`, text });
                track('birthday_card_share', { year: card.year });
            } else {
                saveBlob(blob, fileName);
                setMsg('Sharing is not available in this browser, so the card was saved instead. You can send it from your photos.');
            }
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'AbortError')) {
                setMsg('Sorry, the card could not be shared. Try "Save the card" instead.');
            }
        } finally {
            setBusy(null);
        }
    };

    return (
        <section className="bt-section" aria-labelledby="bt-tm-title">
            <p className={`bt-kicker ${typewriter.className}`}>Part one</p>
            <h2 id="bt-tm-title" className={`bt-h2 ${display.className}`}>Birthday Time Machine</h2>
            <p className="bt-p">Choose the year you were born and get a keepsake card to save or send to the family.</p>

            <div className="bt-picker">
                <button
                    type="button"
                    className="bt-step"
                    onClick={() => pick(Math.max(FIRST_YEAR, (year ?? FIRST_YEAR + 1) - 1))}
                    disabled={year === FIRST_YEAR}
                    aria-label="Previous year"
                >
                    &#8249;
                </button>
                <label className="bt-select-wrap">
                    <span className="bt-sr">Year you were born</span>
                    <select
                        className={`bt-select ${display.className}`}
                        value={year ?? ''}
                        onChange={(e) => pick(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            Pick your year
                        </option>
                        {BIRTH_YEAR_CARDS.map((c) => (
                            <option key={c.year} value={c.year}>
                                {c.year}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    type="button"
                    className="bt-step"
                    onClick={() => pick(Math.min(LAST_YEAR, (year ?? LAST_YEAR - 1) + 1))}
                    disabled={year === LAST_YEAR}
                    aria-label="Next year"
                >
                    &#8250;
                </button>
            </div>
            <p className="bt-small">Cards for every year from {FIRST_YEAR} to {LAST_YEAR}.</p>

            <div aria-live="polite">
                {card && (
                    <article className="bt-card" aria-label={`The year you were born: ${card.year}`}>
                        <p className={`bt-card-ribbon ${display.className}`}>The year you were born</p>
                        <p className={`bt-card-year ${display.className}`}>{card.year}</p>
                        <dl className="bt-facts">
                            {factsOf(card).map((fact) => (
                                <div key={fact.label} className={fact.half ? 'bt-fact' : 'bt-fact bt-fact-full'}>
                                    <dt className={display.className}>{fact.label}</dt>
                                    <dd>
                                        {fact.value}
                                        {fact.note && <span className="bt-note">{fact.note}</span>}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        {card.event && (
                            <div className="bt-event">
                                <p className={`bt-event-head ${display.className}`}>That same year</p>
                                <p className={typewriter.className}>{card.event}</p>
                            </div>
                        )}
                        <p className={`bt-card-credit ${typewriter.className}`}>{credit}</p>
                    </article>
                )}
            </div>

            {card && (
                <div className="bt-actions">
                    <button type="button" className={`bt-btn bt-btn-red ${display.className}`} onClick={onShare} disabled={busy !== null}>
                        {busy === 'share' ? 'Preparing...' : 'Share the card'}
                    </button>
                    <button type="button" className={`bt-btn ${display.className}`} onClick={onSave} disabled={busy !== null}>
                        {busy === 'save' ? 'Preparing...' : 'Save the card'}
                    </button>
                </div>
            )}
            <p className="bt-msg" role="status">
                {msg}
            </p>
        </section>
    );
}

/* ------------------------------------------------------------------ TV Game Show */

type ShowConfig = { decade: number; round: number; timer: number; players: string[] };

function GameShow({
    config,
    scores,
    onScore,
    onRound,
    onClose,
}: {
    config: ShowConfig;
    scores: number[];
    onScore: (player: number, delta: number) => void;
    onRound: (round: number) => void;
    onClose: () => void;
}) {
    const dec = TRIVIA_DECADES[config.decade];
    const questions: TriviaQuestion[] = dec.rounds[config.round];
    const [qi, setQi] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [finished, setFinished] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const mainBtn = useRef<HTMLButtonElement>(null);
    const touchX = useRef<number | null>(null);

    const q = questions[qi];
    const timeLeft = config.timer ? Math.max(0, config.timer - elapsed) : 0;
    const timeUp = config.timer > 0 && timeLeft === 0;
    const ticking = config.timer > 0 && !revealed && !finished && !timeUp;

    useEffect(() => {
        if (!ticking) return;
        const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
        return () => window.clearInterval(id);
    }, [ticking, qi]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        mainBtn.current?.focus();
    }, [qi, finished]);

    const goTo = useCallback(
        (n: number) => {
            if (n < 0) return;
            if (n >= questions.length) {
                setFinished(true);
                return;
            }
            setQi(n);
            setRevealed(false);
            setElapsed(0);
        },
        [questions.length],
    );

    const advance = useCallback(() => {
        if (finished) return;
        if (!revealed) setRevealed(true);
        else goTo(qi + 1);
    }, [finished, revealed, goTo, qi]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            const onControl = t && (t.tagName === 'BUTTON' || t.tagName === 'INPUT' || t.tagName === 'SELECT');
            if (e.key === 'Escape') {
                onClose();
            } else if ((e.key === ' ' || e.key === 'Enter') && !onControl) {
                e.preventDefault();
                advance();
            } else if (e.key === 'ArrowRight' && !finished) {
                if (revealed) goTo(qi + 1);
                else setRevealed(true);
            } else if (e.key === 'ArrowLeft' && !finished) {
                goTo(qi - 1);
            } else if (/^[1-6]$/.test(e.key)) {
                const p = Number(e.key) - 1;
                if (p < config.players.length) onScore(p, 1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [advance, goTo, qi, revealed, finished, onClose, onScore, config.players.length]);

    const onTouchStart = (e: TouchEvent) => {
        touchX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 70 || finished) return;
        if (dx < 0) {
            if (revealed) goTo(qi + 1);
            else setRevealed(true);
        } else {
            goTo(qi - 1);
        }
    };

    const best = scores.length ? Math.max(...scores) : 0;

    return (
        <div className={`bt-show ${body.className}`} role="dialog" aria-modal="true" aria-label={`Game show, ${dec.name}, round ${config.round + 1}`}>
            <div className="bt-show-top">
                <p className={`bt-show-where ${display.className}`}>
                    {dec.name} <span aria-hidden="true">&#9733;</span> Round {config.round + 1} of {dec.rounds.length}
                    {!finished && (
                        <>
                            {' '}
                            <span aria-hidden="true">&#9733;</span> Question {qi + 1} of {questions.length}
                        </>
                    )}
                </p>
                <button type="button" className={`bt-show-exit ${display.className}`} onClick={onClose}>
                    Exit (Esc)
                </button>
            </div>

            {!finished ? (
                <div className="bt-show-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <div className="bt-show-meta">
                        <span className={`bt-show-cat ${display.className}`}>{q.category}</span>
                        {config.timer > 0 && !revealed && (
                            <span className={`bt-show-timer ${display.className} ${timeUp ? 'is-up' : ''}`} aria-live="polite">
                                {timeUp ? "Time's up!" : `${timeLeft} sec`}
                            </span>
                        )}
                    </div>
                    <h2 className="bt-show-q">{q.question}</h2>
                    <ol className="bt-show-opts">
                        {q.options.map((o, k) => {
                            const right = revealed && k === q.correct;
                            const dim = revealed && k !== q.correct;
                            return (
                                <li key={o} className={`bt-opt ${right ? 'is-right' : ''} ${dim ? 'is-dim' : ''}`}>
                                    <span className={`bt-opt-letter ${display.className}`} aria-hidden="true">
                                        {right ? '✓' : LETTERS[k]}
                                    </span>
                                    <span>
                                        <span className="bt-sr">{right ? `Correct answer, ${LETTERS[k]}: ` : `${LETTERS[k]}: `}</span>
                                        {o}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                    <div aria-live="polite">
                        {revealed && (
                            <div className="bt-show-dyk">
                                <p className={`bt-show-dyk-head ${display.className}`}>
                                    Answer: {LETTERS[q.correct]}. {q.options[q.correct]}
                                </p>
                                <p>
                                    <strong>Did You Know? </strong>
                                    {q.didYouKnow}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bt-show-stage bt-show-end">
                    <p className={`bt-show-end-title ${display.className}`}>End of round {config.round + 1}</p>
                    {config.players.length > 0 && (
                        <ol className="bt-show-final">
                            {config.players.map((name, p) => (
                                <li key={p} className={scores[p] === best && best > 0 ? 'is-lead' : ''}>
                                    <span>{name}</span>
                                    <span className={display.className}>{scores[p]}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            )}

            <div className="bt-show-bottom">
                {config.players.length > 0 && (
                    <ul className="bt-score" aria-label="Scoreboard">
                        {config.players.map((name, p) => (
                            <li key={p}>
                                <span className="bt-score-name">
                                    <span className="bt-score-key" aria-hidden="true">{p + 1}</span>
                                    {name}
                                </span>
                                <span className={`bt-score-num ${display.className}`} aria-live="polite">
                                    {scores[p]}
                                </span>
                                <span className="bt-score-btns">
                                    <button type="button" onClick={() => onScore(p, -1)} aria-label={`Take a point from ${name}`}>
                                        &minus;
                                    </button>
                                    <button type="button" onClick={() => onScore(p, 1)} aria-label={`Give a point to ${name}`}>
                                        +
                                    </button>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="bt-show-nav">
                    {!finished ? (
                        <>
                            <button type="button" className={`bt-nav ${display.className}`} onClick={() => goTo(qi - 1)} disabled={qi === 0}>
                                &#8592; Back
                            </button>
                            <button ref={mainBtn} type="button" className={`bt-nav bt-nav-main ${display.className}`} onClick={advance}>
                                {revealed ? (qi + 1 < questions.length ? 'Next question →' : 'See the scores →') : 'Reveal'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" className={`bt-nav ${display.className}`} onClick={onClose}>
                                Choose another round
                            </button>
                            {config.round + 1 < dec.rounds.length && (
                                <button
                                    ref={mainBtn}
                                    type="button"
                                    className={`bt-nav bt-nav-main ${display.className}`}
                                    onClick={() => onRound(config.round + 1)}
                                >
                                    Play round {config.round + 2} &#8594;
                                </button>
                            )}
                        </>
                    )}
                </div>
                <p className="bt-show-keys">
                    Keys: Space or Enter to reveal and go on, arrows to move, 1 to {Math.max(1, config.players.length)} to give a point, Esc to exit. On a
                    phone or tablet, swipe left or right.
                </p>
            </div>
        </div>
    );
}

function GameShowSetup() {
    const [decade, setDecade] = useState(0);
    const [round, setRound] = useState(0);
    const [timer, setTimer] = useState(0);
    const [count, setCount] = useState(2);
    const [names, setNames] = useState<string[]>(Array.from({ length: MAX_PLAYERS }, (_, i) => `Player ${i + 1}`));
    const [scores, setScores] = useState<number[]>(Array(MAX_PLAYERS).fill(0));
    const [show, setShow] = useState<ShowConfig | null>(null);
    const startBtn = useRef<HTMLButtonElement>(null);

    const players = names.slice(0, count).map((n, i) => n.trim() || `Player ${i + 1}`);

    const start = () => {
        setShow({ decade, round, timer, players });
        track('game_show_start', { decade: TRIVIA_DECADES[decade].decade, round: round + 1 });
        const el = document.documentElement;
        if (el.requestFullscreen && !document.fullscreenElement) {
            el.requestFullscreen().catch(() => undefined);
        }
    };

    const close = useCallback(() => {
        setShow(null);
        if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => undefined);
        setTimeout(() => startBtn.current?.focus(), 0);
    }, []);

    const onScore = useCallback((p: number, d: number) => {
        setScores((s) => s.map((v, i) => (i === p ? Math.max(0, v + d) : v)));
    }, []);

    const onRound = useCallback((r: number) => {
        setRound(r);
        setShow((s) => (s ? { ...s, round: r } : s));
    }, []);

    const dec = TRIVIA_DECADES[decade];

    return (
        <section className="bt-section bt-section-dark" aria-labelledby="bt-gs-title">
            <p className={`bt-kicker ${typewriter.className}`}>Part two</p>
            <h2 id="bt-gs-title" className={`bt-h2 ${display.className}`}>TV Game Show Mode</h2>
            <p className="bt-p">
                Open this page on a laptop or tablet connected to the TV and play the rounds from the book with the whole
                family. Round 3 here is round 3 in the book.
            </p>

            <fieldset className="bt-field">
                <legend className={display.className}>1. Pick a decade</legend>
                <div className="bt-chips bt-chips-4">
                    {TRIVIA_DECADES.map((d, i) => (
                        <button
                            key={d.decade}
                            type="button"
                            className={`bt-chip ${display.className}`}
                            aria-pressed={decade === i}
                            onClick={() => setDecade(i)}
                        >
                            {d.name}
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="bt-field">
                <legend className={display.className}>2. Pick a round</legend>
                <div className="bt-chips bt-chips-10">
                    {dec.rounds.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`bt-chip ${display.className}`}
                            aria-pressed={round === i}
                            aria-label={`Round ${i + 1}`}
                            onClick={() => setRound(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <p className="bt-small">Six questions per round, one from each category. The first rounds are the gentlest.</p>
            </fieldset>

            <fieldset className="bt-field">
                <legend className={display.className}>3. Countdown (optional)</legend>
                <div className="bt-chips bt-chips-4">
                    {TIMERS.map((t) => (
                        <button
                            key={t}
                            type="button"
                            className={`bt-chip ${display.className}`}
                            aria-pressed={timer === t}
                            onClick={() => setTimer(t)}
                        >
                            {t === 0 ? 'No clock' : `${t} seconds`}
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="bt-field">
                <legend className={display.className}>4. Players for the scoreboard</legend>
                <div className="bt-chips bt-chips-7">
                    {Array.from({ length: MAX_PLAYERS + 1 }, (_, n) => (
                        <button
                            key={n}
                            type="button"
                            className={`bt-chip ${display.className}`}
                            aria-pressed={count === n}
                            aria-label={n === 0 ? 'No scoreboard' : `${n} players`}
                            onClick={() => setCount(n)}
                        >
                            {n === 0 ? 'None' : n}
                        </button>
                    ))}
                </div>
                {count > 0 && (
                    <div className="bt-names">
                        {names.slice(0, count).map((n, i) => (
                            <label key={i}>
                                <span className="bt-sr">Name of player {i + 1}</span>
                                <input
                                    type="text"
                                    value={n}
                                    maxLength={16}
                                    onChange={(e) => setNames((all) => all.map((v, k) => (k === i ? e.target.value : v)))}
                                />
                            </label>
                        ))}
                    </div>
                )}
                {scores.some((s) => s > 0) && (
                    <button type="button" className="bt-link" onClick={() => setScores(Array(MAX_PLAYERS).fill(0))}>
                        Reset the scores to zero
                    </button>
                )}
            </fieldset>

            <button ref={startBtn} type="button" className={`bt-btn bt-btn-big ${display.className}`} onClick={start}>
                Start the show: {dec.name}, round {round + 1}
            </button>

            {show && (
                <GameShow
                    key={`${show.decade}-${show.round}`}
                    config={show}
                    scores={scores}
                    onScore={onScore}
                    onRound={onRound}
                    onClose={close}
                />
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ page */

export function BirthdayTriviaLanding({ bonus: BONUS }: { bonus: BirthdayTriviaBonus }) {
    return (
        <main className={`bt ${body.className}`}>
            <style>{CSS}</style>
            <div className="bt-col">
                <p className={`bt-brand ${display.className}`}>Fun Books Publisher</p>
                <header className="bt-hero">
                    <p className={`bt-welcome ${typewriter.className}`}>A gift for the readers of {BONUS.book}</p>
                    <h1 className={`bt-title ${display.className}`}>{BONUS.title}</h1>
                    <p className="bt-lede">{BONUS.subtitle}.</p>
                    <p className="bt-small">Free, no sign-up, nothing to install.</p>
                </header>

                <TimeMachine credit={BONUS.cardCredit} />
                <GameShowSetup />

                <footer className="bt-foot">
                    <p className={typewriter.className}>Happy birthday, and enjoy the trip down memory lane.</p>
                    <p className="bt-legal">
                        &copy; {new Date().getFullYear()} Fun Books Publisher LLC. For the readers of {BONUS.book}. For your own personal use.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const CSS = `
.bt{--ink:#14213D;--night:#0E1730;--cream:#FFF4DE;--paper:#FBE6BE;--cherry:#B3122B;--mustard:#F2B33D;--brown:#7A4A00;
--grey:#4A4F5E;--green:#17803A;--focus:#FFD23F;
min-height:100vh;background:var(--cream);color:var(--ink);padding:28px 16px 64px;-webkit-font-smoothing:antialiased}
.bt *{box-sizing:border-box}
.bt-col{max-width:720px;margin:0 auto}
.bt-brand{margin:0 0 18px;text-align:center;font-size:18px;letter-spacing:.16em;color:var(--grey)}
.bt-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
:where(.bt button){font:inherit}
.bt button{cursor:pointer}
.bt button:disabled{cursor:default;opacity:.45}
.bt :focus-visible{outline:4px solid var(--focus);outline-offset:3px}

.bt-hero{text-align:center;padding:34px 18px 30px;border-radius:18px;color:var(--cream);
background:repeating-conic-gradient(from 0deg at 50% 120%,rgba(242,179,61,.18) 0 5deg,transparent 5deg 10deg),var(--ink);
border:6px solid var(--ink);box-shadow:inset 0 0 0 3px var(--mustard)}
.bt-welcome{margin:0 0 10px;font-size:18px;color:var(--mustard)}
.bt-title{margin:0;font-size:clamp(46px,12vw,78px);line-height:.95;color:#fff;text-shadow:4px 4px 0 var(--cherry)}
.bt .bt-lede{margin:16px auto 0;max-width:30em;font-size:20px;line-height:1.55}
.bt-hero .bt-small{color:#D8DDEA}

.bt-section{margin:34px 0 0;padding:26px 20px 28px;border-radius:18px;background:#fff;border:3px solid var(--ink)}
.bt-section-dark{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.bt-kicker{margin:0;font-size:17px;color:var(--cherry)}
.bt-section-dark .bt-kicker{color:var(--mustard)}
.bt-h2{margin:2px 0 8px;font-size:clamp(38px,9vw,54px);line-height:1}
.bt-p{margin:0 0 18px;font-size:19px;line-height:1.55}
.bt-small{margin:10px 0 0;font-size:16px;line-height:1.5;color:var(--grey)}
.bt-section-dark .bt-small{color:#D8DDEA}

.bt-picker{display:flex;gap:10px;align-items:stretch}
.bt-select-wrap{flex:1}
.bt-select{width:100%;height:74px;font-size:40px;letter-spacing:.04em;text-align:center;color:var(--ink);background:var(--paper);
border:3px solid var(--ink);border-radius:12px;padding:0 12px}
.bt-step{flex:0 0 74px;height:74px;font-size:44px !important;line-height:1;border-radius:12px;border:3px solid var(--ink);
background:var(--mustard);color:var(--ink)}

.bt-card{margin:22px 0 0;padding:22px 22px 18px;background:var(--cream);border:8px solid var(--ink);border-radius:6px;
box-shadow:inset 0 0 0 4px var(--cream),inset 0 0 0 6px var(--cherry);text-align:center}
.bt-card-ribbon{display:inline-block;margin:6px 0 0;padding:4px 18px;font-size:26px;letter-spacing:.06em;background:var(--ink);color:var(--cream);border-radius:8px}
.bt-card-year{margin:0;font-size:clamp(96px,30vw,150px);line-height:1;color:var(--cherry);text-shadow:5px 5px 0 var(--ink)}
.bt-facts{display:grid;grid-template-columns:1fr 1fr;gap:16px 22px;margin:14px 0 0;padding:16px 0 0;border-top:3px solid var(--ink);text-align:left}
.bt-fact{margin:0}
.bt-fact-full{grid-column:1 / -1}
.bt-fact dt{font-size:20px;letter-spacing:.04em;color:var(--cherry)}
.bt-fact dd{margin:2px 0 0;font-size:20px;font-weight:700;line-height:1.35}
.bt-note{display:block;font-size:15px;font-weight:400;color:var(--grey)}
.bt-event{margin:18px 0 0;padding:14px 16px;background:var(--paper);border:3px solid var(--ink);border-radius:12px;text-align:left}
.bt-event-head{margin:0;font-size:20px;color:var(--brown)}
.bt-event p:last-child{margin:4px 0 0;font-size:19px;line-height:1.45}
.bt-card-credit{margin:16px 0 0;font-size:16px}

.bt-actions{display:flex;flex-wrap:wrap;gap:12px;margin:18px 0 0}
.bt-btn{flex:1 1 220px;min-height:64px;padding:12px 22px;font-size:28px !important;letter-spacing:.04em;border-radius:999px;
border:3px solid var(--ink);background:var(--mustard);color:var(--ink);box-shadow:0 5px 0 var(--ink)}
.bt-btn:active{transform:translateY(4px);box-shadow:0 1px 0 var(--ink)}
.bt-btn-red{background:var(--cherry);color:#fff}
.bt-btn-big{display:block;width:100%;margin:24px 0 0;font-size:30px !important;border-color:var(--mustard);box-shadow:0 5px 0 #A8741A}
.bt-msg{min-height:1.5em;margin:12px 0 0;font-size:17px;font-weight:700}

.bt-field{margin:0 0 18px;padding:0;border:0}
.bt-field legend{padding:0;margin:0 0 10px;font-size:26px;letter-spacing:.03em;color:var(--mustard)}
.bt-chips{display:grid;gap:8px}
.bt-chips-4{grid-template-columns:repeat(4,1fr)}
.bt-chips-10{grid-template-columns:repeat(10,1fr)}
.bt-chips-7{grid-template-columns:repeat(7,1fr)}
.bt-chip{min-height:56px;padding:6px 4px;font-size:24px !important;letter-spacing:.03em;border-radius:10px;
border:3px solid var(--cream);background:transparent;color:var(--cream)}
.bt-chip[aria-pressed="true"]{background:var(--mustard);border-color:var(--mustard);color:var(--ink)}
.bt-names{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0 0}
.bt-names input{width:100%;min-height:52px;padding:8px 12px;font:inherit;font-size:19px;border-radius:10px;border:3px solid var(--cream);
background:#fff;color:var(--ink)}
.bt-link{margin:12px 0 0;padding:0;background:none;border:0;color:var(--mustard);font-size:17px !important;text-decoration:underline}

.bt-foot{margin:46px 0 0;text-align:center}
.bt-foot p{margin:0;font-size:20px}
.bt-legal{margin-top:10px !important;font-size:14px !important;color:var(--grey);line-height:1.5}

/* ---------- the show, full screen ---------- */
.bt-show{position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;background:var(--night);color:#fff;
padding:clamp(10px,2vh,24px) clamp(12px,3vw,48px);overflow:hidden;
background-image:radial-gradient(circle at 50% -20%,rgba(242,179,61,.22),transparent 55%);
box-shadow:inset 0 0 0 6px var(--mustard)}
.bt-show-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex:0 0 auto}
.bt-show-where{margin:0;font-size:clamp(20px,2.4vw,36px);letter-spacing:.04em;color:var(--mustard)}
.bt-show-exit{flex:0 0 auto;min-height:48px;padding:6px 16px;font-size:clamp(18px,1.8vw,26px) !important;border-radius:10px;
border:2px solid #fff;background:transparent;color:#fff}
.bt-show-stage{flex:1 1 auto;overflow-y:auto;display:flex;flex-direction:column;justify-content:center;padding:1vh 0}
.bt-show-meta{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.bt-show-cat{display:inline-block;padding:4px 16px;font-size:clamp(20px,2.2vw,34px);letter-spacing:.05em;background:var(--cherry);border-radius:8px}
.bt-show-timer{font-size:clamp(26px,3vw,48px);color:#fff;padding:2px 14px;border:3px solid #fff;border-radius:999px}
.bt-show-timer.is-up{background:var(--mustard);color:var(--ink);border-color:var(--mustard)}
.bt-show-q{margin:1.6vh 0 2.4vh;font-family:inherit;font-size:clamp(26px,4.3vw,72px);line-height:1.18;font-weight:700}
.bt-show-opts{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1.4vw,22px)}
.bt-opt{display:flex;gap:clamp(10px,1.2vw,20px);align-items:center;padding:clamp(10px,1.4vw,22px);border-radius:14px;
background:#fff;color:var(--ink);font-size:clamp(21px,3vw,52px);line-height:1.15;font-weight:700;transition:opacity .3s ease,background .3s ease}
.bt-opt-letter{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:1.5em;height:1.5em;border-radius:50%;
background:var(--ink);color:var(--mustard);font-weight:400}
.bt-opt.is-right{background:var(--green);color:#fff;box-shadow:0 0 0 5px var(--mustard)}
.bt-opt.is-right .bt-opt-letter{background:#fff;color:var(--green)}
.bt-opt.is-dim{opacity:.38}
.bt-show-dyk{margin:2vh 0 0;padding:clamp(10px,1.4vw,22px);border-left:8px solid var(--mustard);background:rgba(255,255,255,.08);border-radius:10px;
font-size:clamp(18px,2.1vw,34px);line-height:1.35}
.bt-show-dyk p{margin:0}
.bt-show-dyk-head{margin:0 0 .3em !important;font-size:clamp(22px,2.6vw,42px);letter-spacing:.03em;color:var(--mustard)}
.bt-show-end{align-items:center;text-align:center}
.bt-show-end-title{margin:0 0 2vh;font-size:clamp(48px,8vw,120px);color:var(--mustard);text-shadow:5px 5px 0 var(--cherry)}
.bt-show-final{list-style:none;margin:0;padding:0;width:min(720px,100%)}
.bt-show-final li{display:flex;justify-content:space-between;gap:20px;padding:1vh 2vw;font-size:clamp(24px,3.4vw,54px);font-weight:700;
border-bottom:2px solid rgba(255,255,255,.25)}
.bt-show-final li.is-lead{color:var(--mustard)}
.bt-show-bottom{flex:0 0 auto;display:flex;flex-direction:column;gap:1vh}
.bt-score{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.bt-score li{flex:1 1 150px;display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:10px;background:rgba(255,255,255,.10);
border:2px solid rgba(255,255,255,.3);font-size:clamp(16px,1.5vw,24px)}
.bt-score-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700}
.bt-score-key{display:inline-block;margin-right:6px;padding:0 6px;border-radius:4px;background:var(--mustard);color:var(--ink);font-size:.8em}
.bt-score-num{font-size:clamp(28px,2.6vw,42px);color:var(--mustard);min-width:1.4em;text-align:center}
.bt-score-btns{display:flex;gap:4px}
.bt-score-btns button{width:44px;height:44px;border-radius:8px;border:2px solid #fff;background:transparent;color:#fff;font-size:26px !important;line-height:1}
.bt-show-nav{display:flex;gap:12px}
.bt-nav{flex:1;min-height:clamp(56px,7vh,84px);font-size:clamp(24px,2.6vw,42px) !important;letter-spacing:.04em;border-radius:14px;
border:3px solid #fff;background:transparent;color:#fff}
.bt-nav-main{flex:2;background:var(--mustard);border-color:var(--mustard);color:var(--ink)}
.bt-show-keys{margin:0;font-size:clamp(13px,1vw,16px);color:#C7CDDD;text-align:center}

@media (max-width:640px){
.bt-chips-10{grid-template-columns:repeat(5,1fr)}
.bt-chips-7{grid-template-columns:repeat(4,1fr)}
.bt-chips-4{grid-template-columns:repeat(2,1fr)}
.bt-facts{grid-template-columns:1fr}
.bt-show-opts{grid-template-columns:1fr}
.bt-show-keys{display:none}
}
@media (prefers-reduced-motion:reduce){.bt-opt{transition:none}.bt-btn:active{transform:none}}
`;
