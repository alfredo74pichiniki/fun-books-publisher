// Landing pages for Meta Ads campaigns.
// Each entry = one bridge page between Meta ad and Amazon.
// The BuyButton fires a Meta Pixel event before redirecting to the Attribution URL.

export type LandingPage = {
    slug: string;
    asin: string;
    title: string;
    subtitle: string;
    coverImage: string; // public path
    hook: string; // one-line attention grabber
    subhook: string; // supporting sentence
    amazonAttributionUrl: string;
    benefits: { title: string; description: string }[];
    features: string[];
    faqs: { question: string; answer: string }[];
    social: { rating: number; reviews: number };
    pageColorTheme: "warm-cream" | "dark-mono";
};

export const LANDING_PAGES: Record<string, LandingPage> = {
    "cozy-escapes": {
        slug: "cozy-escapes",
        asin: "B0FSZ9V9MS",
        title: "Monochrome Coloring Book",
        subtitle: "Black & White Cozy Escapes",
        coverImage: "/covers/cozy-escapes.png",
        hook: "One pen. One color. Pure cozy magic.",
        subhook:
            "50 hand-drawn cottage scenes turn your afternoon into a meditation ritual. No color decisions. No overwhelm. Just quiet focus.",
        amazonAttributionUrl:
            "https://www.amazon.com/dp/B0FSZ9V9MS?maas=maas_adg_7302287DFDE242FCC3BBB4709B25958E_afap_abs&ref_=aa_maas&tag=maas",
        benefits: [
            {
                title: "Art therapy through simplicity",
                description:
                    "No color decisions. No overwhelm. Just you, one black pen, and the meditative rhythm of filling negative space.",
            },
            {
                title: "50 hand-drawn cottage scenes",
                description:
                    "Rustic kitchens, stone fireplaces, rainy windows, garden sheds, reading nooks. Every page is a new cozy world.",
            },
            {
                title: "Guided X-mark system",
                description:
                    "Subtle markers show exactly where to fill with black ink. The result: gallery-worthy negative-space art, every time.",
            },
            {
                title: "Perfect for all skill levels",
                description:
                    "Beginners love the clear guidance. Advanced colorists appreciate the elegant compositions and the challenge of precision.",
            },
        ],
        features: [
            "50 original monochrome illustrations",
            "Premium 8.5\" x 11\" format",
            "Guided X-mark system",
            "High-resolution digital PDF included",
            "Works with fine-liners, gel pens, markers",
        ],
        faqs: [
            {
                question: "Do I need any special pens?",
                answer:
                    "Any black fine-liner, gel pen, or water-based marker works perfectly. If you use alcohol markers, place a sheet of cardstock behind the page.",
            },
            {
                question: "Is this book too hard for beginners?",
                answer:
                    "No. The X-mark system guides you exactly where to fill with black ink, so beginners get gallery-worthy results on their first page.",
            },
            {
                question: "What's included besides the printed book?",
                answer:
                    "Every purchase includes a free high-resolution digital PDF so you can print your favorite pages again and re-color them unlimited times.",
            },
        ],
        social: { rating: 4.8, reviews: 46 },
        pageColorTheme: "warm-cream",
    },
    "cottagecore-homestead": {
        slug: "cottagecore-homestead",
        asin: "PENDIENTE",
        title: "Monochrome Coloring Book",
        subtitle: "Cottagecore Homestead",
        coverImage: "/covers/cottagecore-homestead.png",
        hook: "Your quiet life in the countryside starts here.",
        subhook:
            "50 hand-drawn rustic homestead scenes. One pen, zero stress. Fill each page with black ink and watch a cozy country world come alive.",
        amazonAttributionUrl:
            "https://www.amazon.com/dp/PENDIENTE",
        benefits: [
            {
                title: "Art therapy through simplicity",
                description:
                    "No color decisions. No overwhelm. Just you, one black pen, and the meditative rhythm of filling negative space.",
            },
            {
                title: "50 hand-drawn homestead scenes",
                description:
                    "Rustic kitchens, herb gardens, country villages, farmhouse porches, rolling meadows, and cozy hearths. Every page is a retreat to simpler times.",
            },
            {
                title: "Guided X-mark system",
                description:
                    "Subtle markers show exactly where to fill with black ink. The result: gallery-worthy negative-space art, every time.",
            },
            {
                title: "Perfect for all skill levels",
                description:
                    "Beginners love the clear guidance. Advanced colorists appreciate the elegant compositions and the challenge of precision.",
            },
        ],
        features: [
            "50 original monochrome illustrations",
            "Premium 8.5\" x 11\" format",
            "Guided X-mark system",
            "High-resolution digital PDF included",
            "Works with fine-liners, gel pens, markers",
        ],
        faqs: [
            {
                question: "Do I need any special pens?",
                answer:
                    "Any black fine-liner, gel pen, or water-based marker works perfectly. If you use alcohol markers, place a sheet of cardstock behind the page.",
            },
            {
                question: "Is this book too hard for beginners?",
                answer:
                    "No. The X-mark system guides you exactly where to fill with black ink, so beginners get gallery-worthy results on their first page.",
            },
            {
                question: "What's included besides the printed book?",
                answer:
                    "Every purchase includes a free high-resolution digital PDF so you can print your favorite pages again and re-color them unlimited times.",
            },
        ],
        social: { rating: 0, reviews: 0 },
        pageColorTheme: "warm-cream",
    },
};

export function getLandingPage(slug: string): LandingPage | null {
    return LANDING_PAGES[slug] ?? null;
}

export function getAllLandingSlugs(): string[] {
    return Object.keys(LANDING_PAGES);
}
