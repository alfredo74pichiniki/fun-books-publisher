"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Book data - will be fetched from API later
const booksData: Record<string, {
    title: string;
    subtitle: string;
    image: string;
    benefits: string[];
}> = {
    "monochrome-1": {
        title: "Monochrome Coloring Book",
        subtitle: "Power of Black & White Art Therapy",
        image: "/covers/CA+ MONOCHROME CB 4 PORTADA.png",
        benefits: [
            "High-resolution PDF of ALL pages",
            "Print unlimited copies on YOUR paper choice",
            "Practice without worrying about mistakes",
            "Perfect for coloring parties with friends",
        ],
    },
    // Add more books as needed
};

export default function BonusPage() {
    const params = useParams();
    const bookId = params.bookId as string;
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const book = booksData[bookId] || {
        title: "Your Monochrome Book",
        subtitle: "Exclusive Digital Bonus",
        image: "/covers/CA+ MONOCHROME CB 4 PORTADA.png",
        benefits: [
            "High-resolution PDF of ALL pages",
            "Print unlimited copies on YOUR paper choice",
            "Practice without worrying about mistakes",
            "Perfect for coloring parties with friends",
        ],
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // TODO: Call API to send email with PDF link
            const response = await fetch("/api/send-bonus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, bookId }),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Check your email! Your digital bonus is on its way 🎉");
            } else {
                throw new Error("Failed to send");
            }
        } catch {
            setStatus("error");
            setMessage("Oops! Something went wrong. Please try again.");
        }
    };

    return (
        <main className="landing-hero min-h-screen">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full filter blur-[120px] opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-20"></div>
            </div>

            {/* Logo */}
            <Link href="/" className="absolute top-6 left-6 z-20">
                <Image src="/logo.png" alt="Fun Books Publisher" width={50} height={50} />
            </Link>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                        <div className="float-animation">
                            <Image
                                src={book.image}
                                alt={book.title}
                                width={280}
                                height={350}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-purple-300 text-sm font-medium mb-4">
                            🎁 Exclusive Bonus for Book Owners
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="gradient-text">Free Digital Download</span>
                        </h1>

                        <p className="text-gray-300 text-lg mb-6">
                            Thank you for purchasing <strong className="text-white">{book.title}</strong>!
                            As a token of our appreciation, enjoy the complete digital version.
                        </p>

                        {/* Benefits */}
                        <ul className="text-left space-y-3 mb-8">
                            {book.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span className="text-gray-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Form or Success Message */}
                        {status === "success" ? (
                            <div className="landing-card bg-green-500/10 border-green-500/30">
                                <div className="text-center">
                                    <span className="text-5xl mb-4 block">📧</span>
                                    <h3 className="text-xl font-bold text-green-400 mb-2">Success!</h3>
                                    <p className="text-gray-300">{message}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="landing-card">
                                <h3 className="text-xl font-bold mb-4 text-center">
                                    Enter your email to receive your bonus
                                </h3>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="input-email mb-4 text-gray-800"
                                />

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="btn-primary w-full text-center disabled:opacity-50"
                                >
                                    {status === "loading" ? "Sending..." : "Get My Free Download 🎨"}
                                </button>

                                {status === "error" && (
                                    <p className="text-red-400 text-sm mt-3 text-center">{message}</p>
                                )}

                                <p className="text-gray-500 text-xs mt-4 text-center">
                                    We respect your privacy. No spam, ever.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Fun Books Publisher LLC
            </div>
        </main>
    );
}
