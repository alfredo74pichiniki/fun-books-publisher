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
    heroAccent: string; // third line of the headline, in italics
    amazonAttributionUrl: string;
    benefits: { title: string; description: string }[];
    features: string[];
    faqs: { question: string; answer: string }[];
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
            "Sofas, window seats and quiet corners in black and white, to fill with one pen. No color decisions. No overwhelm. Just quiet focus.",
        heroAccent: "Pure cozy magic.",
        amazonAttributionUrl:
            "https://www.amazon.com/dp/B0FSZ9V9MS?maas=maas_adg_7302287DFDE242FCC3BBB4709B25958E_afap_abs&ref_=aa_maas&tag=maas",
        benefits: [
            {
                title: "Art therapy through simplicity",
                description:
                    "No color decisions. No overwhelm. Just you, one black pen, and the meditative rhythm of filling negative space.",
            },
            {
                title: "Cozy scenes, page after page",
                description:
                    "Sofas, window seats, reading nooks and quiet corners. Every page is a new cozy world.",
            },
            {
                title: "Guided X-mark system",
                description:
                    "Small X marks show exactly where the black ink goes, so you always know where to fill.",
            },
            {
                title: "Perfect for all skill levels",
                description:
                    "The X marks guide first-timers step by step. If you have colored for years, the detailed scenes give you plenty to work on.",
            },
        ],
        features: [
            "Original monochrome illustrations",
            "Large 8.5\" x 11\" format",
            "Guided X-mark system",
            "A free printable bonus PDF (QR code inside)",
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
                    "No. The X marks show exactly where to fill with black ink, so you can start on the first page without any experience.",
            },
            {
                question: "What's included besides the printed book?",
                answer:
                    "The book has a QR code that opens a free printable bonus PDF on our website. No sign-up and no email.",
            },
        ],
        pageColorTheme: "warm-cream",
    },
    "cottagecore-homestead": {
        slug: "cottagecore-homestead",
        asin: "B0GWY67XKF",
        title: "Monochrome Coloring Book",
        subtitle: "Cottagecore Homestead",
        coverImage: "/covers/cottagecore-homestead.png",
        hook: "Your quiet life in the countryside starts here.",
        subhook:
            "Rustic homestead scenes in black and white. One pen, zero stress. Fill each page with black ink and watch a cozy country world come alive.",
        heroAccent: "Pure country calm.",
        amazonAttributionUrl:
            "https://www.amazon.com/dp/B0GWY67XKF",
        benefits: [
            {
                title: "Art therapy through simplicity",
                description:
                    "No color decisions. No overwhelm. Just you, one black pen, and the meditative rhythm of filling negative space.",
            },
            {
                title: "Country life, page after page",
                description:
                    "Hearths, kitchens, gardens and farmhouse corners. Every page is a retreat to simpler times.",
            },
            {
                title: "Guided X-mark system",
                description:
                    "Small X marks show exactly where the black ink goes, so you always know where to fill.",
            },
            {
                title: "Perfect for all skill levels",
                description:
                    "The X marks guide first-timers step by step. If you have colored for years, the detailed scenes give you plenty to work on.",
            },
        ],
        features: [
            "Original monochrome illustrations",
            "Large 8.5\" x 11\" format",
            "Guided X-mark system",
            "A free printable bonus PDF (QR code inside)",
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
                    "No. The X marks show exactly where to fill with black ink, so you can start on the first page without any experience.",
            },
            {
                question: "What's included besides the printed book?",
                answer:
                    "The book has a QR code that opens a free printable bonus PDF on our website. No sign-up and no email.",
            },
        ],
        pageColorTheme: "warm-cream",
    },
};

export function getLandingPage(slug: string): LandingPage | null {
    return LANDING_PAGES[slug] ?? null;
}

export function getAllLandingSlugs(): string[] {
    return Object.keys(LANDING_PAGES);
}
