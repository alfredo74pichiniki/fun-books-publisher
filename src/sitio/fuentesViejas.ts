import { Inter, Playfair_Display } from 'next/font/google';

// The fonts of the previous site. Only the gift pages made by hand and the Meta ad landings use them, so they
// are loaded there and nowhere else (they used to weigh on every page). No preload: a page that does not
// show text in these fonts never downloads them.
export const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', preload: false });
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false });
export const claseViejas = `${playfair.variable} ${inter.variable}`;
export const estiloViejo = { fontFamily: 'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif' };
