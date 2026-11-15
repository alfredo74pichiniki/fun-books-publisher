import { Fraunces, Manrope } from 'next/font/google';

// Direction A, "Midnight Shelf": Fraunces for display, Manrope for reading.
export const display = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--a-display', display: 'swap', axes: ['opsz', 'SOFT'] });
export const lectura = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--a-texto', display: 'swap' });
export const claseFuentes = `${display.variable} ${lectura.variable}`;
