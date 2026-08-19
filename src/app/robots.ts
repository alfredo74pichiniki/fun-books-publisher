import type { MetadataRoute } from 'next';

// El dominio de la editorial es funbookpublisher.com, SIN "s" tras "book".
// funbookspublisher.com (con "s") NO es nuestro: esta aparcado y devuelve 403.
// Hasta el 19 ago 2026 tanto este fichero como sitemap.ts apuntaban al dominio
// equivocado, asi que Google recibia un sitemap alojado en un dominio ajeno y
// ninguna URL real de la editorial llegaba a indexarse.
const BASE_URL = 'https://funbookpublisher.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // /_next/ NO se bloquea: contiene el CSS y el JavaScript. Bloquearlo
                // impide a Google renderizar la pagina y evaluarla bien.
                disallow: ['/api/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
