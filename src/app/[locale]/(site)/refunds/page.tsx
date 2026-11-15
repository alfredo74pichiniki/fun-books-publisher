import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Returns and refunds | Fun Books Publisher',
    description: 'How returns and refunds work for our books, which are sold by Amazon.',
    alternates: { canonical: '/refunds' },
};

export default function RefundsPage() {
    return (
        <div className="aTexto">
            <div>
                <h1>Refund Policy</h1>
                <div>
                    <p className="aFecha"><strong>Last updated:</strong> February 2026</p>

                    <h2>Amazon Purchases</h2>
                    <p>All our books are sold exclusively through Amazon. Returns and refunds are handled directly by Amazon according to their standard return policy.</p>

                    <h2>Amazon Return Policy</h2>
                    <p>Amazon generally allows returns within 30 days of receipt for most items, including books. To initiate a return, visit your Amazon orders page and follow the return instructions.</p>

                    <h2>Damaged or Defective Books</h2>
                    <p>If you receive a damaged or defective copy of one of our books, please contact Amazon customer service for an immediate replacement or refund. You can also reach out to us through our Contact page and we&apos;ll help facilitate a resolution.</p>

                    <h2>Digital Bonuses</h2>
                    <p>Free digital bonus content included with book purchases is non-refundable, as it is provided at no additional cost.</p>

                    <h2>Questions?</h2>
                    <p>If you have any questions about returns or need help with an order, please don&apos;t hesitate to contact us through our Contact page.</p>
                </div>
            </div>
        </div>
    );
}
