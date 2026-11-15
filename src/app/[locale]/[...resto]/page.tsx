import { notFound } from 'next/navigation';

// Any address that matches no page shows the site's own "not found" page (src/app/[locale]/not-found.tsx).
export default function Resto() {
    notFound();
}
