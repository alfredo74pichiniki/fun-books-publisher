import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './barra.css';

// Design directions for the FBP redesign. Preview only: never linked from the live site, never indexed.
export const metadata: Metadata = {
    title: 'Design directions | Fun Books Publisher',
    robots: { index: false, follow: false },
};

const DIRS = [
    { k: 'a', n: 'A. Midnight Shelf' },
    { k: 'b', n: 'B. The Activity Page' },
    { k: 'c', n: 'C. Color Rooms' },
];

export default function DireccionesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <nav className="dBarra" aria-label="Design preview switcher">
                <span className="dBarraT">Design preview</span>
                {DIRS.map((d) => (
                    <span key={d.k} className="dBarraG">
                        <Link href={`/d/${d.k}`}>{d.n}</Link>
                        <Link href={`/d/${d.k}/gift`}>gift page</Link>
                    </span>
                ))}
            </nav>
        </>
    );
}
