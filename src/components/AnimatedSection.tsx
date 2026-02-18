'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    /** Animation direction: 'up' | 'left' | 'right' | 'scale' */
    direction?: 'up' | 'left' | 'right' | 'scale';
    /** Delay before animation starts */
    delay?: number;
    /** Stagger children elements */
    stagger?: boolean;
    /** Custom stagger selector (defaults to direct children) */
    staggerSelector?: string;
}

export function AnimatedSection({
    children,
    className = '',
    id,
    direction = 'up',
    delay = 0,
    stagger = false,
    staggerSelector,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const fromVars: gsap.TweenVars = {
            opacity: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
        };

        switch (direction) {
            case 'up':
                fromVars.y = 60;
                break;
            case 'left':
                fromVars.x = -60;
                break;
            case 'right':
                fromVars.x = 60;
                break;
            case 'scale':
                fromVars.scale = 0.9;
                break;
        }

        if (stagger) {
            const targets = staggerSelector
                ? el.querySelectorAll(staggerSelector)
                : el.children;

            gsap.from(targets, {
                ...fromVars,
                stagger: 0.12,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        } else {
            gsap.from(el, {
                ...fromVars,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [direction, delay, stagger, staggerSelector]);

    return (
        <section ref={ref} className={className} id={id}>
            {children}
        </section>
    );
}
