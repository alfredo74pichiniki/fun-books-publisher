import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const es = locale === 'es';
    return {
        title: es ? 'Contacto | Fun Books Publisher' : 'Contact us | Fun Books Publisher',
        description: es ? 'Escriba a Fun Books Publisher: preguntas sobre un libro o un regalo.' : 'Write to Fun Books Publisher about a book or a free gift.',
        alternates: { canonical: es ? '/es/contact' : '/contact', languages: { en: '/contact', es: '/es/contact', 'x-default': '/contact' } },
    };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
    return children;
}
