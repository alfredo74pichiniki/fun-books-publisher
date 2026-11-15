import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { cargarCatalogo } from '@/catalogo/cargar';
import { AMAZON_AUTOR } from '@/sitio/Marco';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return { title: locale === 'es' ? 'Quiénes somos | Fun Books Publisher' : 'About | Fun Books Publisher' };
}

// Only facts: who we are, what we publish, where it is sold. The book count comes from the live catalog.
export default async function About({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const n = (await cargarCatalogo()).libros.length;
    if (locale === 'es') {
        return (
            <div className="aTexto">
                <h1>Una pequeña editorial de cosas para hacer</h1>
                <p className="aIntro">Fun Books Publisher hace libros de actividades: para colorear, para resolver, para recordar y para aprender sin pantallas. Hoy tenemos {n} libros en Amazon.</p>
                <h2>Qué publicamos</h2>
                <ul>
                    <li>Libros para colorear en monocromo para adultos, que se rellenan con un solo bolígrafo, y la serie Monochrome Color by Number Mysteries.</li>
                    <li>Misterios en letra grande que se resuelven con un lápiz.</li>
                    <li>Sopas de letras, trivia y ejercicios de memoria para personas mayores, en inglés y en español.</li>
                    <li>Libros de actividades y cuadernos para niños de 8 a 14 años.</li>
                </ul>
                <h2>Dónde se compran</h2>
                <p>Todos nuestros libros los imprime, vende y envía Amazon. El pago, el envío y las devoluciones los lleva Amazon con sus condiciones.</p>
                <h2>Los regalos</h2>
                <p>Muchos libros traen un código QR en las últimas páginas. Lleva a una página de esta web con un regalo para imprimir, sin registro y sin correo.</p>
                <h2>Quién está detrás</h2>
                <p>Fun Books Publisher LLC, una empresa registrada en Wyoming, Estados Unidos.</p>
                <div className="aAcc">
                    <Link className="aBtn" href="/books">Ver los {n} libros</Link>
                    <a className="aBtn aBtnL" href={AMAZON_AUTOR} rel="noopener">Nuestra página en Amazon</a>
                </div>
            </div>
        );
    }
    return (
        <div className="aTexto">
            <h1>A small publisher of things to do</h1>
            <p className="aIntro">Fun Books Publisher makes activity books: to color, to solve, to remember and to learn without screens. Today there are {n} of our books on Amazon.</p>
            <h2>What we publish</h2>
            <ul>
                <li>Monochrome coloring books for adults, filled with a single pen, and the Monochrome Color by Number Mysteries series.</li>
                <li>Large print mystery puzzles you solve with a pencil.</li>
                <li>Word searches, trivia and memory exercises for seniors, in English and in Spanish.</li>
                <li>Activity books and workbooks for kids aged 8 to 14.</li>
            </ul>
            <h2>Where to buy</h2>
            <p>Every book is printed, sold and shipped by Amazon. Payment, delivery and returns are handled by Amazon under its own policies.</p>
            <h2>The free gifts</h2>
            <p>Many books carry a QR code in the last pages. It opens a page on this site with a printable gift, with no sign-up and no email.</p>
            <h2>Who we are</h2>
            <p>Fun Books Publisher LLC, a company registered in Wyoming, USA.</p>
            <div className="aAcc">
                <Link className="aBtn" href="/books">See all {n} books</Link>
                <a className="aBtn aBtnL" href={AMAZON_AUTOR} rel="noopener">Our page on Amazon</a>
            </div>
        </div>
    );
}
