import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const es = locale === 'es';
    return {
        title: es ? 'Política de privacidad | Fun Books Publisher' : 'Privacy policy | Fun Books Publisher',
        description: es
            ? 'Qué datos recoge esta web, qué cookies usa y cómo evitarlas.'
            : 'What data this website collects, which cookies it uses and how to avoid them.',
        alternates: { canonical: es ? '/es/privacy' : '/privacy', languages: { en: '/privacy', es: '/es/privacy', 'x-default': '/privacy' } },
    };
}

const CORREO = 'customerservice@funbookpublisher.com';

// What this policy says is what the code does (15 nov 2026): Meta Pixel only on the ad pages under /lp,
// and only after "Accept"; Vercel Web Analytics without cookies; the contact form goes by email.
export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    if (locale === 'es') {
        return (
            <div className="aTexto">
                <h1>Política de privacidad</h1>
                <p className="aFecha"><strong>Última actualización:</strong> noviembre de 2026</p>
                <h2>Quiénes somos</h2>
                <p>Esta web es de Fun Books Publisher LLC (Wyoming, Estados Unidos). Para cualquier cosa sobre sus datos, escriba a <a href={`mailto:${CORREO}`}>{CORREO}</a>.</p>
                <h2>Cookies de publicidad: solo en las páginas de anuncios</h2>
                <p>Las páginas a las que llevan nuestros anuncios de Facebook e Instagram (las que empiezan por /lp/) pueden usar el píxel de Meta (Meta Platforms). Sirve para saber si un anuncio trae lectores y si pulsan el botón para ir a Amazon. Pone una cookie llamada _fbp y envía a Meta datos de la visita.</p>
                <p>El píxel no se carga hasta que usted pulsa «Accept» en el aviso de esa página. Si pulsa «No thanks» o no elige nada, no se carga y no se pone ninguna cookie. Puede cambiar su elección con el botón del pie de esa página, o bloquear las cookies de terceros en su navegador.</p>
                <p>El resto de la web (portada, libros, regalos, blog y estas páginas) no usa cookies de publicidad.</p>
                <h2>Estadísticas de visitas</h2>
                <p>Contamos las visitas con Vercel Web Analytics, que no usa cookies y no guarda datos que le identifiquen. También contamos, sin saber quién, cuántas veces se descarga cada regalo.</p>
                <h2>Formulario de contacto</h2>
                <p>Si nos escribe, su nombre, su correo y su mensaje nos llegan por correo electrónico (lo envía el servicio Resend) para poder contestarle. No le apuntamos a ninguna lista.</p>
                <h2>Correos que recogimos antes</h2>
                <p>Hasta noviembre de 2026 esta web tenía un boletín y pedía el correo para algunos regalos. Esos correos están guardados en nuestra base de datos (Supabase). Si quiere que borremos el suyo, escríbanos.</p>
                <h2>Amazon</h2>
                <p>Nuestros libros se compran en Amazon. Al pulsar un enlace a Amazon se aplican las normas de privacidad de Amazon.</p>
                <h2>Sus derechos</h2>
                <p>Puede pedirnos qué datos suyos tenemos, que los corrijamos o que los borremos, escribiendo a <a href={`mailto:${CORREO}`}>{CORREO}</a>.</p>
            </div>
        );
    }
    return (
        <div className="aTexto">
            <h1>Privacy policy</h1>
            <p className="aFecha"><strong>Last updated:</strong> November 2026</p>
            <h2>Who we are</h2>
            <p>This website belongs to Fun Books Publisher LLC (Wyoming, USA). For anything about your data, write to <a href={`mailto:${CORREO}`}>{CORREO}</a>.</p>
            <h2>Advertising cookies: only on our ad pages</h2>
            <p>The pages our Facebook and Instagram ads lead to (the ones whose address starts with /lp/) can use the Meta Pixel (Meta Platforms). It tells us whether an ad brings readers and whether they press the button that takes them to Amazon. It sets a cookie called _fbp and sends data about the visit to Meta.</p>
            <p>The pixel does not load until you press &quot;Accept&quot; in the notice on that page. If you press &quot;No thanks&quot;, or choose nothing, it does not load and no cookie is set. You can change your choice with the button at the bottom of that page, or block third party cookies in your browser.</p>
            <p>The rest of the website (home, books, gifts, blog and these pages) uses no advertising cookies.</p>
            <h2>Visit statistics</h2>
            <p>We count visits with Vercel Web Analytics, which uses no cookies and keeps no data that identifies you. We also count, without knowing who, how many times each gift is downloaded.</p>
            <h2>Contact form</h2>
            <p>If you write to us, your name, email and message reach us by email (sent through the Resend service) so we can reply. We do not add you to any list.</p>
            <h2>Emails we collected before</h2>
            <p>Until November 2026 this website had a newsletter and asked for an email for some gifts. Those emails are stored in our database (Supabase). If you want yours deleted, write to us.</p>
            <h2>Amazon</h2>
            <p>Our books are bought on Amazon. When you follow a link to Amazon, Amazon&apos;s privacy rules apply.</p>
            <h2>Your rights</h2>
            <p>You can ask us what data we hold about you, to correct it or to delete it, by writing to <a href={`mailto:${CORREO}`}>{CORREO}</a>.</p>
        </div>
    );
}
