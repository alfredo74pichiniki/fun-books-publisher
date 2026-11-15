import { Link } from '@/i18n/routing';
import Image from 'next/image';

const DIRS = [
    { k: 'a', n: 'A. Midnight Shelf', d: 'Deep navy and orange. The books stand on a lit shelf, like a bookshop window at night.' },
    { k: 'b', n: 'B. The Activity Page', d: 'Paper white and ink black. The site itself is a page from one of the books, with a word search you can play.' },
    { k: 'c', n: 'C. Color Rooms', d: 'Four full-color rooms, one per kind of book, in the colors of the logo.' },
];

export default function Indice() {
    return (
        <main style={{ minHeight: '100vh', background: '#fff', color: '#14121a', padding: '48px 24px 120px', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
                <Image src="/rediseno/logo.webp" alt="Fun Books Publisher" width={120} height={120} priority />
                <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: 34, margin: '24px 0 8px', color: '#14121a' }}>Three design directions</h1>
                <p style={{ fontSize: 18, lineHeight: 1.5, margin: '0 0 28px', color: '#3d3a45' }}>
                    Preview only. Each one has a home page and a gift page built with the real covers. Nothing here is live.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                    {DIRS.map((x) => (
                        <li key={x.k} style={{ border: '2px solid #14121a', borderRadius: 12, padding: 20 }}>
                            <h2 style={{ fontFamily: 'system-ui, sans-serif', fontSize: 22, margin: '0 0 6px', color: '#14121a' }}>{x.n}</h2>
                            <p style={{ margin: '0 0 12px', fontSize: 17, lineHeight: 1.5, color: '#3d3a45' }}>{x.d}</p>
                            <Link href={`/d/${x.k}`} style={{ color: '#4a1fb8', fontWeight: 700, marginRight: 20 }}>Home page</Link>
                            <Link href={`/d/${x.k}/gift`} style={{ color: '#4a1fb8', fontWeight: 700 }}>Gift page</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
