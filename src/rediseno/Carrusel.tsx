'use client';

import { useRef, type ReactNode } from 'react';

// A scroll-snap strip with previous and next buttons. It never moves on its own:
// it scrolls with touch, mouse, the keyboard (it is focusable) or the two buttons.
export function Carrusel({ children, label, className }: { children: ReactNode; label: string; className: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const mover = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: suave ? 'smooth' : 'auto' });
    };

    return (
        <div className={className}>
            <div className="carBotones">
                <button type="button" onClick={() => mover(-1)} aria-label={`Previous: ${label}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => mover(1)} aria-label={`Next: ${label}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>
            <div ref={ref} className="carPista" tabIndex={0} role="group" aria-label={label}>
                {children}
            </div>
        </div>
    );
}
