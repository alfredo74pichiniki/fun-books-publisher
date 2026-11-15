import type { ReactNode } from 'react';
import { claseViejas, estiloViejo } from '@/sitio/fuentesViejas';

// Keeps Inter and Playfair Display for these pages only (they were on the whole site before).
export default function Layout({ children }: { children: ReactNode }) {
    return <div className={claseViejas} style={estiloViejo}>{children}</div>;
}
