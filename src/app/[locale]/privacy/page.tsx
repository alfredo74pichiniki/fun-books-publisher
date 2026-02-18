export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20 sm:pb-28 bg-navy-950 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
                <div className="space-y-6 text-white/60 text-sm leading-relaxed">
                    <p><strong className="text-white">Last updated:</strong> February 2026</p>

                    <h2 className="text-xl font-bold text-white pt-4">Information We Collect</h2>
                    <p>When you subscribe to our newsletter or contact us, we collect your email address and any information you voluntarily provide. We do not collect payment information — all purchases are processed through Amazon.</p>

                    <h2 className="text-xl font-bold text-white pt-4">How We Use Your Information</h2>
                    <p>We use your email address solely to send you updates about new book releases, promotions, and content. We will never sell, rent, or share your personal information with third parties.</p>

                    <h2 className="text-xl font-bold text-white pt-4">Cookies</h2>
                    <p>This website may use essential cookies for functionality. We do not use tracking cookies for advertising purposes.</p>

                    <h2 className="text-xl font-bold text-white pt-4">Third-Party Services</h2>
                    <p>We use Supabase for data storage and Resend for email delivery. These services have their own privacy policies. Links to Amazon.com are subject to Amazon&apos;s privacy policy.</p>

                    <h2 className="text-xl font-bold text-white pt-4">Your Rights</h2>
                    <p>You can unsubscribe from our mailing list at any time using the unsubscribe link in any email. To request deletion of your data, please contact us through our Contact page.</p>

                    <h2 className="text-xl font-bold text-white pt-4">Contact</h2>
                    <p>For any privacy-related questions, please reach out through our Contact page.</p>
                </div>
            </div>
        </div>
    );
}
