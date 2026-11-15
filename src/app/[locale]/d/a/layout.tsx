import type { ReactNode } from 'react';
import { Fraunces, Manrope } from 'next/font/google';
import './a.css';

const display = Fraunces({ subsets: ['latin'], variable: '--a-display', display: 'swap', axes: ['opsz', 'SOFT'] });
const texto = Manrope({ subsets: ['latin'], variable: '--a-texto', display: 'swap' });

export default function LayoutA({ children }: { children: ReactNode }) {
    return <div className={`dA ${display.variable} ${texto.variable}`}>{children}</div>;
}
