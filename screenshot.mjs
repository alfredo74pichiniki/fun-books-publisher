import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'https://funbookpublisher.com';
const DIR = './screenshots';

mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

// Desktop full page
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await desktop.waitForTimeout(2000); // let animations settle
await desktop.screenshot({ path: `${DIR}/01-desktop-full.png`, fullPage: true });

// Desktop hero only
await desktop.screenshot({ path: `${DIR}/02-desktop-hero.png`, fullPage: false });

// Scroll to featured books and screenshot
await desktop.evaluate(() => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'instant' });
});
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: `${DIR}/03-desktop-featured.png`, fullPage: false });

// Hover over first book card to check hover state
const firstBook = await desktop.$('.book-showcase');
if (firstBook) {
    await firstBook.hover();
    await desktop.waitForTimeout(600);
    await desktop.screenshot({ path: `${DIR}/04-desktop-book-hover.png`, fullPage: false });
}

// Scroll to collections
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: `${DIR}/05-desktop-collections.png`, fullPage: false });

// Scroll to footer
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: `${DIR}/06-desktop-footer.png`, fullPage: false });

// Header with scroll (should be sticky/glass effect)
await desktop.evaluate(() => window.scrollTo(0, 300));
await desktop.waitForTimeout(300);
await desktop.screenshot({ path: `${DIR}/07-desktop-header-scrolled.png`, fullPage: false });

await desktop.close();

// Mobile full page
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await mobile.waitForTimeout(2000);
await mobile.screenshot({ path: `${DIR}/08-mobile-full.png`, fullPage: true });
await mobile.screenshot({ path: `${DIR}/09-mobile-hero.png`, fullPage: false });

// Mobile - scroll to books
await mobile.evaluate(() => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'instant' });
});
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: `${DIR}/10-mobile-featured.png`, fullPage: false });

await mobile.close();
await browser.close();

console.log('Screenshots saved to ./screenshots/');
