'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Generate stars
        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.05,
            opacity: Math.random() * 0.5 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
        }));

        let time = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            stars.forEach(star => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
                const alpha = star.opacity * twinkle;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();

                // Subtle glow for bigger stars
                if (star.r > 1) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 3);
                    grad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.3})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    ctx.fill();
                }

                // Slow drift
                star.y -= star.speed;
                if (star.y < -5) {
                    star.y = canvas.height + 5;
                    star.x = Math.random() * canvas.width;
                }
            });

            animFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}

export function HeroSection() {
    const t = useTranslations("hero");
    const sectionRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating orbs — slow, dreamy
            [orb1Ref, orb2Ref, orb3Ref].forEach((ref, i) => {
                if (!ref.current) return;
                gsap.to(ref.current, {
                    x: `random(-60, 60)`,
                    y: `random(-60, 60)`,
                    scale: `random(0.85, 1.15)`,
                    duration: `random(8, 14)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 2.5,
                });
            });

            // Entrance timeline — cinematic
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(logoRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
            });

            tl.from(labelRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.6,
            }, "-=0.5");

            tl.from(line1Ref.current, {
                y: 80,
                opacity: 0,
                skewY: 5,
                duration: 1,
            }, "-=0.3");

            tl.from(line2Ref.current, {
                y: 80,
                opacity: 0,
                skewY: -4,
                duration: 1,
            }, "-=0.7");

            tl.from(dividerRef.current, {
                scaleX: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
            }, "-=0.5");

            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.7,
            }, "-=0.4");

            if (ctaRef.current) {
                tl.from(ctaRef.current.children, {
                    y: 30,
                    opacity: 0,
                    scale: 0.9,
                    stagger: 0.15,
                    duration: 0.6,
                }, "-=0.3");
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
            {/* Background layers */}
            <div className="absolute inset-0">
                {/* Deep navy gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

                {/* Animated gradient orbs */}
                <div ref={orb1Ref} className="absolute top-[8%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-text-from/8 blur-[140px]" />
                <div ref={orb2Ref} className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] rounded-full bg-accent/6 blur-[160px]" />
                <div ref={orb3Ref} className="absolute top-[35%] right-[25%] w-[500px] h-[500px] rounded-full bg-blue-text-to/5 blur-[120px]" />

                {/* Star particles canvas */}
                <StarField />

                {/* Subtle dot grid */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

                {/* Radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,15,29,0.6)_100%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-32">
                {/* Logo — fully visible, not cut */}
                <div ref={logoRef} className="mb-8 flex justify-center">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 animate-[float_6s_ease-in-out_infinite]">
                        {/* Glow behind logo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-blue-text-from/30 rounded-3xl blur-2xl" />
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-accent/20 bg-white">
                            <Image
                                src="/logo.png"
                                alt="Fun Books Publisher"
                                fill
                                className="object-contain p-2"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Label */}
                <p ref={labelRef} className="section-label mb-6">
                    {t("label")}
                </p>

                {/* Headline */}
                <div className="mb-4">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
                        <span ref={line1Ref} className="block text-white mb-2">
                            {t("titleLine1")}
                        </span>
                        <span ref={line2Ref} className="block gradient-text">
                            {t("titleLine2")}
                        </span>
                    </h1>
                </div>

                {/* Animated divider under headline */}
                <div ref={dividerRef} className="section-divider mb-8 origin-center" />

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
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
                        href="https://www.amazon.com/author/funbookspublisher"
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
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-800 to-transparent z-[2]" />
        </section>
    );
}
