import type { ReactNode } from 'react';
import { Archivo } from 'next/font/google';
import './c.css';

// One family, two widths: expanded for the big words, normal for reading.
const archivo = Archivo({ subsets: ['latin'], variable: '--c-font', display: 'swap', axes: ['wdth'] });

export default function LayoutC({ children }: { children: ReactNode }) {
    return <div className={`dC ${archivo.variable}`}>{children}</div>;
}
