import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const dynamic = 'force-static';
export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'es' }];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const es = locale === 'es';
    return {
        title: es ? 'Preguntas frecuentes | Fun Books Publisher' : 'Frequently asked questions | Fun Books Publisher',
        description: es ? 'Dónde se compran los libros, formatos, regalos con código QR, devoluciones y libros en español.' : 'Where to buy our books, formats, the free QR code gifts, returns and books in Spanish.',
        alternates: { canonical: es ? '/es/faq' : '/faq', languages: { en: '/faq', es: '/es/faq', 'x-default': '/faq' } },
    };
}

// Answers we can stand behind. Nothing about paper or return windows that Amazon, not us, decides.
const PREGUNTAS = {
    en: [
        ['Where can I buy your books?', 'On Amazon. Every book is printed, sold and shipped by Amazon. Each book page on this site has a button that opens it on Amazon.'],
        ['Are they paperbacks, Kindle or hardcover?', 'Almost all are paperbacks, made to be used with a pen or pencil. A few also have a Kindle or a hardcover edition: the book page lists the formats Amazon has.'],
        ['How do I get the free gift of my book?', 'Scan the QR code near the end of your book, or type the address printed under it. The gift is a PDF you print at home, for readers of that book. No sign-up and no email.'],
        ['Can I return a book?', 'Returns and refunds go through Amazon, under Amazon\'s return policy. Start the return from your Amazon orders page.'],
        ['Do you have books in Spanish?', 'Yes: memory exercises, word searches and puzzle books in Spanish, in large print for seniors.'],
        ['Are the books for seniors in large print?', 'Yes. The word searches, trivia, memory and mystery books made for seniors say "Large Print" on the cover and are set in large, clear type.'],
        ['How can I contact you?', 'Use the contact page.'],
    ],
    es: [
        ['¿Dónde se compran sus libros?', 'En Amazon. Amazon imprime, vende y envía todos los libros. Cada ficha de esta web tiene un botón que abre el libro en Amazon.'],
        ['¿Son de tapa blanda, Kindle o tapa dura?', 'Casi todos son de tapa blanda, pensados para usar con bolígrafo o lápiz. Algunos tienen además versión Kindle o tapa dura: la ficha de cada libro dice los formatos que tiene Amazon.'],
        ['¿Cómo consigo el regalo de mi libro?', 'Escanee el código QR de las últimas páginas del libro, o escriba la dirección impresa debajo. El regalo es un PDF para imprimir en casa, para los lectores de ese libro. Sin registro y sin correo.'],
        ['¿Puedo devolver un libro?', 'Las devoluciones las gestiona Amazon, con su política de devoluciones. Empiece la devolución desde sus pedidos de Amazon.'],
        ['¿Tienen libros en español?', 'Sí: ejercicios de memoria, sopas de letras y pasatiempos en español, en letra grande para personas mayores.'],
        ['¿Los libros para mayores son de letra grande?', 'Sí. Las sopas de letras, la trivia, los ejercicios de memoria y los misterios para mayores lo dicen en la portada ("Large Print" o "Letra grande").'],
        ['¿Cómo puedo escribirles?', 'Desde la página de contacto.'],
    ],
} as const;

export default async function Faq({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const es = locale === 'es';
    const lista = PREGUNTAS[es ? 'es' : 'en'];
    return (
        <div className="aTexto">
            <h1>{es ? 'Preguntas frecuentes' : 'Frequently asked questions'}</h1>
            <p className="aIntro">{es ? 'Lo que más nos preguntan sobre los libros, los regalos y Amazon.' : 'What readers ask most about our books, the gifts and Amazon.'}</p>
            <ul className="aPreguntas">
                {lista.map(([q, a]) => (
                    <li key={q}>
                        <details>
                            <summary>{q}</summary>
                            <p>{a}</p>
                        </details>
                    </li>
                ))}
            </ul>
            <div className="aAcc">
                <Link className="aBtn" href="/contact">{es ? 'Escribirnos' : 'Contact us'}</Link>
            </div>
        </div>
    );
}
