'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!barRef.current) return;

        gsap.to(barRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-navy-900/50 z-[9999]">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-accent via-accent-light to-blue-text-from origin-left shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                style={{ transform: 'scaleX(0)' }}
            />
        </div>
    );
}
