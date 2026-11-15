import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Atkinson_Hyperlegible } from 'next/font/google';
import './b.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--b-display', display: 'swap' });
// Atkinson Hyperlegible was drawn for low-vision readers: a fit for the seniors who scan our QR codes.
const texto = Atkinson_Hyperlegible({ subsets: ['latin'], weight: ['400', '700'], variable: '--b-texto', display: 'swap' });

export default function LayoutB({ children }: { children: ReactNode }) {
    return <div className={`dB ${display.variable} ${texto.variable}`}>{children}</div>;
}
