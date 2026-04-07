"use client";

type Props = {
    amazonUrl: string;
    asin: string;
    bookTitle: string;
    variant?: "primary" | "secondary";
    children: React.ReactNode;
};

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export function BuyOnAmazonButton({
    amazonUrl,
    asin,
    bookTitle,
    variant = "primary",
    children,
}: Props) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Fire Meta Pixel standard event BEFORE navigation.
        // AddToCart is a standard event Meta optimizes for well in Sales campaigns.
        if (typeof window !== "undefined" && window.fbq) {
            try {
                window.fbq("track", "AddToCart", {
                    content_name: bookTitle,
                    content_ids: [asin],
                    content_type: "product",
                    value: 9.99,
                    currency: "USD",
                });
                // Also fire a custom event so we can target it distinctly if needed
                window.fbq("trackCustom", "ClickToAmazon", {
                    asin,
                    book: bookTitle,
                });
            } catch {
                // never block navigation because of tracking
            }
        }
        // Let the default anchor navigation happen (opens Amazon)
        // We do NOT preventDefault — the href handles the redirect
    };

    const baseClasses =
        "inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-4";

    const variantClasses =
        variant === "primary"
            ? "bg-black text-white hover:bg-neutral-800 px-8 py-4 text-lg shadow-xl shadow-black/20 hover:shadow-2xl focus-visible:ring-amber-300"
            : "bg-white text-black border-2 border-black hover:bg-neutral-100 px-6 py-3 text-base focus-visible:ring-neutral-300";

    return (
        <a
            href={amazonUrl}
            onClick={handleClick}
            target="_blank"
            rel="noopener nofollow"
            className={`${baseClasses} ${variantClasses}`}
        >
            {children}
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </a>
    );
}
