import type { ReactNode } from 'react';
import { claseViejas, estiloViejo } from '@/sitio/fuentesViejas';

// lang="en": the hand-made gift pages are in English even under /es (the Spanish ones set lang="es" inside).
// Keeps Inter and Playfair Display for these pages only (they were on the whole site before).
export default function Layout({ children }: { children: ReactNode }) {
    return <div className={claseViejas} style={estiloViejo} lang="en">{children}</div>;
}
