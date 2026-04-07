"use client";

type Props = {
    amazonUrl: string;
    asin: string;
    bookTitle: string;
    variant?: "primary" | "secondary" | "light";
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
    const handleClick = () => {
        // Fire Meta Pixel events BEFORE navigation.
        // AddToCart is a standard event Meta optimizes well in Sales campaigns.
        if (typeof window !== "undefined" && window.fbq) {
            try {
                window.fbq("track", "AddToCart", {
                    content_name: bookTitle,
                    content_ids: [asin],
                    content_type: "product",
                    value: 9.99,
                    currency: "USD",
                });
                window.fbq("trackCustom", "ClickToAmazon", {
                    asin,
                    book: bookTitle,
                });
            } catch {
                // never block navigation because of tracking
            }
        }
    };

    const variantClass =
        variant === "light"
            ? "lp-cta lp-cta-light"
            : variant === "secondary"
                ? "lp-cta lp-cta-secondary"
                : "lp-cta";

    return (
        <a
            href={amazonUrl}
            onClick={handleClick}
            target="_blank"
            rel="noopener nofollow"
            className={variantClass}
        >
            {children}
            <svg
                width="16"
                height="16"
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
