'use client';

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const t = useTranslations("hero");
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating orbs
            [orb1Ref, orb2Ref, orb3Ref].forEach((ref, i) => {
                if (!ref.current) return;
                gsap.to(ref.current, {
                    x: `random(-50, 50)`,
                    y: `random(-50, 50)`,
                    scale: `random(0.9, 1.1)`,
                    duration: `random(7, 12)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 2,
                });
            });

            // Entrance timeline
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(labelRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.8,
            });

            tl.from(line1Ref.current, {
                y: 100,
                opacity: 0,
                skewY: 4,
                duration: 1.2,
            }, "-=0.4");

            tl.from(line2Ref.current, {
                y: 100,
                opacity: 0,
                skewY: -3,
                duration: 1.2,
            }, "-=0.8");

            tl.from(subtitleRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
            }, "-=0.6");

            if (ctaRef.current) {
                tl.from(ctaRef.current.children, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.6,
                }, "-=0.4");
            }

            tl.from(scrollRef.current, {
                opacity: 0,
                duration: 0.5,
            }, "-=0.2");

            // Parallax on scroll
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress;
                    if (line1Ref.current) gsap.set(line1Ref.current, { y: p * 100 });
                    if (line2Ref.current) gsap.set(line2Ref.current, { y: p * 70 });
                    if (subtitleRef.current) gsap.set(subtitleRef.current, { y: p * 50, opacity: 1 - p * 2 });
                    if (scrollRef.current) gsap.set(scrollRef.current, { opacity: 1 - p * 4, y: p * 40 });
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background — gradient + video placeholder */}
            <div className="absolute inset-0">
                {/* Navy gradient base */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

                {/* Animated gradient orbs */}
                <div ref={orb1Ref} className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-text-from/8 blur-[120px]" />
                <div ref={orb2Ref} className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-accent/6 blur-[150px]" />
                <div ref={orb3Ref} className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-blue-text-to/5 blur-[100px]" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
                {/* Label */}
                <p ref={labelRef} className="text-accent font-medium tracking-[0.25em] uppercase text-xs sm:text-sm mb-6">
                    {t("label")}
                </p>

                {/* Headline */}
                <div className="overflow-hidden mb-8">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
                        <span ref={line1Ref} className="block text-white mb-2">
                            {t("titleLine1")}
                        </span>
                        <span ref={line2Ref} className="block gradient-text">
                            {t("titleLine2")}
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-white/55 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                    {t("subtitle")}
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/books"
                        className="btn-primary text-base sm:text-lg"
                    >
                        {t("ctaPrimary")}
                    </Link>
                    <a
                        href="https://www.amazon.com/stores/Fun-Books-Publisher/author/B0D6C6WQBV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-base sm:text-lg"
                    >
                        {t("ctaSecondary")}
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className="flex flex-col items-center gap-2 text-white/30">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </div>
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-800 to-transparent" />
        </section>
    );
}
