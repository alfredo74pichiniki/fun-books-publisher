'use client';

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Kill any CSS animations on blobs - GSAP takes over
            const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current];
            blobs.forEach(blob => {
                if (blob) blob.style.animation = 'none';
            });

            // Animate floating blobs with GSAP (more organic than CSS)
            blobs.forEach((blob, i) => {
                if (!blob) return;
                gsap.to(blob, {
                    x: `random(-60, 60)`,
                    y: `random(-60, 60)`,
                    scale: `random(0.85, 1.15)`,
                    duration: `random(6, 10)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 1.5,
                });
            });

            // Master timeline for entrance animations
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Badge drops in
            tl.from(badgeRef.current, {
                y: -40,
                opacity: 0,
                duration: 0.8,
                scale: 0.8,
            });

            // Headline - split words and animate each
            if (headlineRef.current) {
                const line1 = headlineRef.current.querySelector('.hero-line-1');
                const line2 = headlineRef.current.querySelector('.hero-line-2');

                if (line1) {
                    tl.from(line1, {
                        y: 80,
                        opacity: 0,
                        duration: 1,
                        skewY: 4,
                    }, "-=0.4");
                }
                if (line2) {
                    tl.from(line2, {
                        y: 80,
                        opacity: 0,
                        duration: 1,
                        skewY: -3,
                    }, "-=0.7");
                }
            }

            // Subtitle fades up
            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, "-=0.5");

            // CTA buttons stagger in
            if (ctaRef.current) {
                tl.from(ctaRef.current.children, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15,
                }, "-=0.3");
            }

            // Trust indicators
            tl.from(trustRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
            }, "-=0.2");

            // Scroll indicator bouncing
            tl.from(scrollIndicatorRef.current, {
                opacity: 0,
                duration: 0.4,
            }, "-=0.1");

            // ScrollTrigger parallax - elements move at different speeds
            if (sectionRef.current) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (headlineRef.current) {
                            gsap.set(headlineRef.current, { y: progress * 120 });
                        }
                        if (subtitleRef.current) {
                            gsap.set(subtitleRef.current, { y: progress * 80 });
                        }
                        if (ctaRef.current) {
                            gsap.set(ctaRef.current, { y: progress * 50 });
                        }
                        if (scrollIndicatorRef.current) {
                            gsap.set(scrollIndicatorRef.current, {
                                opacity: 1 - progress * 3,
                                y: progress * 60,
                            });
                        }
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-center">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'var(--gradient-hero-mesh)' }} />

                {/* Animated Blobs - GSAP controlled */}
                <div ref={blob1Ref} className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-100/20 blur-3xl filter mix-blend-multiply opacity-60" />
                <div ref={blob2Ref} className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-100/20 blur-3xl filter mix-blend-multiply opacity-60" />
                <div ref={blob3Ref} className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-pink-100/20 blur-3xl filter mix-blend-multiply opacity-50" />

                {/* Noise + Radial */}
                <div className="absolute inset-0 bg-noise opacity-5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
            </div>

            <div className="container relative z-10 px-4 space-y-8">
                {/* Badge */}
                <div ref={badgeRef}>
                    <span className="inline-block py-3 px-6 rounded-full glass-editorial bg-white/50 text-gray-900 text-xs tracking-widest uppercase font-bold backdrop-blur-md">
                        Est. 2024 &bull; Wyoming USA
                    </span>
                </div>

                {/* Main Headline */}
                <div className="overflow-hidden">
                    <h1 ref={headlineRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.1] mb-6">
                        <span className="hero-line-1 block text-gray-900">Art. Focus.</span>
                        <span className="hero-line-2 block text-editorial-gradient italic font-light text-6xl md:text-8xl">
                            Serenity.
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                    Fun Books Publisher crafts <span className="font-semibold text-gray-900">premium analog experiences</span> for a digital world.
                    <br /> Disconnect to reconnect with your inner artist.
                </p>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                    <Link
                        href="#bestsellers"
                        className="group relative inline-flex items-center px-10 py-4 bg-gradient-to-r from-editorial-purple-600 to-editorial-pink-600 text-white rounded-full font-semibold shadow-editorial hover:shadow-editorial-hover transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Collection
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    </Link>

                    <Link
                        href="/books"
                        className="group relative px-10 py-4 rounded-full font-semibold text-gray-900 border-2 border-gray-300 hover:border-editorial-purple-600 hover:text-editorial-purple-600 transition-all duration-300"
                    >
                        View All Books
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-editorial-purple-600 to-editorial-pink-600 group-hover:w-full transition-all duration-500" />
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div ref={trustRef} className="pt-8 opacity-80">
                    <p className="text-sm text-gray-600 font-medium">
                        10,000+ readers &bull; Bestseller collection &bull; Crafted with love
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
