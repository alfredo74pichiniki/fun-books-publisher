import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'https://funbookpublisher.com';
const DIR = './audit';

mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

// ============ DESKTOP 1440px ============
const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(2500);

// Full page
await d.screenshot({ path: `${DIR}/d-full.png`, fullPage: true });

// Hero viewport
await d.screenshot({ path: `${DIR}/d-hero.png` });

// Header close-up (top 80px)
await d.screenshot({ path: `${DIR}/d-header-top.png`, clip: { x: 0, y: 0, width: 1440, height: 80 } });

// Scroll header
await d.evaluate(() => window.scrollTo(0, 200));
await d.waitForTimeout(400);
await d.screenshot({ path: `${DIR}/d-header-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 80 } });

// Stats section
await d.evaluate(() => window.scrollTo(0, 850));
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-stats.png` });

// Featured books section
await d.evaluate(() => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'instant' });
});
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-featured.png` });

// Hover each book individually
for (let i = 0; i < 5; i++) {
    const books = await d.$$('.book-showcase');
    if (books[i]) {
        await books[i].hover();
        await d.waitForTimeout(700);
        const box = await books[i].boundingBox();
        if (box) {
            await d.screenshot({
                path: `${DIR}/d-book${i+1}-hover.png`,
                clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: box.width + 20, height: box.height + 20 }
            });
        }
    }
}

// Collections section
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-collections.png` });

// Newsletter section
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.72));
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-newsletter.png` });

// Social section
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.82));
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-social.png` });

// Footer
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await d.waitForTimeout(500);
await d.screenshot({ path: `${DIR}/d-footer.png` });

await d.close();

// ============ MOBILE 390px ============
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(2500);

await m.screenshot({ path: `${DIR}/m-full.png`, fullPage: true });
await m.screenshot({ path: `${DIR}/m-hero.png` });

// Mobile header close-up
await m.screenshot({ path: `${DIR}/m-header.png`, clip: { x: 0, y: 0, width: 390, height: 70 } });

// Mobile CTAs area
await m.screenshot({ path: `${DIR}/m-ctas.png`, clip: { x: 0, y: 200, width: 390, height: 200 } });

// Mobile stats
await m.evaluate(() => window.scrollTo(0, 900));
await m.waitForTimeout(500);
await m.screenshot({ path: `${DIR}/m-stats.png` });

// Mobile books
await m.evaluate(() => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'instant' });
});
await m.waitForTimeout(500);
await m.screenshot({ path: `${DIR}/m-featured.png` });

// Mobile first book (no tap, just screenshot)
await m.screenshot({ path: `${DIR}/m-book-view.png` });

// Mobile collections
await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
await m.waitForTimeout(500);
await m.screenshot({ path: `${DIR}/m-collections.png` });

// Mobile newsletter
await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
await m.waitForTimeout(500);
await m.screenshot({ path: `${DIR}/m-newsletter.png` });

// Mobile footer
await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await m.waitForTimeout(500);
await m.screenshot({ path: `${DIR}/m-footer.png` });

await m.close();

// ============ TABLET 768px ============
const t = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await t.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await t.waitForTimeout(2000);
await t.screenshot({ path: `${DIR}/t-full.png`, fullPage: true });
await t.screenshot({ path: `${DIR}/t-hero.png` });
await t.close();

await browser.close();
console.log('Audit screenshots saved to ./audit/');
