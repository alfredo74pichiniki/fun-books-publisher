'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Pages for children (COPPA): the Meta Pixel sets advertising cookies, so it is NOT loaded on these paths.
// Matched with or without the /es prefix.
const SIN_PIXEL = ['/bonus/secret-science-agency', '/bonus/cursive-workbook', '/bonus/50-states-road-trip'];

export function MetaPixel() {
    const path = usePathname() ?? '';
    if (SIN_PIXEL.some((p) => path === p || path === `/es${p}` || path.startsWith(`${p}/`) || path.startsWith(`/es${p}/`))) {
        return null;
    }
    return (
        <>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1243671167851218');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=1243671167851218&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
        </>
    );
}
