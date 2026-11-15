'use client';

import { useState } from 'react';
import { FAMILIAS, ORDEN, porFamilia, type Familia } from '@/rediseno/libros';

// A real 11 x 8 word search. The four words are the four kinds of book we publish.
// The grid is decoration for sighted readers; the list of links under it is the actual navigation.
const COLS = 11;
const ROWS = 8;
type Pos = { f: Familia; r0: number; c0: number; r1: number; c1: number };
const PALABRAS: Pos[] = [
    { f: 'coloring', r0: 1, c0: 1, r1: 1, c1: 8 },
    { f: 'mystery', r0: 0, c0: 10, r1: 6, c1: 10 },
    { f: 'memory', r0: 2, c0: 0, r1: 7, c1: 5 },
    { f: 'kids', r0: 6, c0: 6, r1: 6, c1: 9 },
];
const RELLENO = 'TBRAHWEUNPLDOGFAVSJTCEHNURLWABDOPTGFSEVJHANRULTWBDGOPAFESVHJNTRULAWDBGPOFSEVAHJRNTULWBDAGOPFSEVHJ';

function rejilla(): string[] {
    const g: string[] = Array.from({ length: COLS * ROWS }, (_, i) => RELLENO[i % RELLENO.length]);
    for (const p of PALABRAS) {
        const w = FAMILIAS[p.f].palabra;
        const dr = Math.sign(p.r1 - p.r0);
        const dc = Math.sign(p.c1 - p.c0);
        for (let i = 0; i < w.length; i++) g[(p.r0 + dr * i) * COLS + (p.c0 + dc * i)] = w[i];
    }
    return g;
}
const G = rejilla();

export function SopaB() {
    const [activa, setActiva] = useState<Familia | null>(null);
    return (
        <div className="bSopa">
            <div className="bSopaBar">
                <span>Word search</span>
                <span>Find the 4 kinds of book</span>
            </div>
            <div className="bSopaG" aria-hidden="true">
                <div className="bLetras" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                    {G.map((ch, i) => <span key={i}>{ch}</span>)}
                </div>
                <svg viewBox={`0 0 ${COLS} ${ROWS}`} preserveAspectRatio="none">
                    {PALABRAS.map((p, i) => (
                        <line
                            key={p.f}
                            className={`bMarca bM-${p.f} ${activa === p.f ? 'on' : ''}`}
                            style={{ animationDelay: `${0.5 + i * 0.45}s` }}
                            pathLength={1}
                            x1={p.c0 + 0.5} y1={p.r0 + 0.5} x2={p.c1 + 0.5} y2={p.r1 + 0.5}
                        />
                    ))}
                </svg>
            </div>
            <ul className="bLista">
                {ORDEN.map((f) => (
                    <li key={f}>
                        <a
                            href={`#${f}`}
                            className={`bL-${f}`}
                            onMouseEnter={() => setActiva(f)}
                            onMouseLeave={() => setActiva(null)}
                            onFocus={() => setActiva(f)}
                            onBlur={() => setActiva(null)}
                        >
                            <span className="bCaja" aria-hidden="true" />
                            <span>{FAMILIAS[f].nombre}</span>
                            <small>{porFamilia(f).length} books</small>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
