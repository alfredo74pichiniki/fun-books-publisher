import Image from "next/image";

export function Hero() {
    return (
        <section className="hero-section pt-20">
            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 py-16">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-purple-700 text-sm font-medium mb-6">
                            ✨ New Monochrome Collection Available
                        </span>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Where{" "}
                            <span className="gradient-text">Creativity</span>
                            <br />
                            Meets{" "}
                            <span className="gradient-text">Relaxation</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                            Discover our premium collection of coloring books, activity books,
                            and puzzles designed to inspire creativity and provide peaceful moments
                            for all ages.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="https://www.amazon.com/author/funbookspublisher"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-lg px-8 py-4"
                            >
                                Browse Our Books
                            </a>
                            <a
                                href="#collections"
                                className="px-8 py-4 rounded-full border-2 border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
                            >
                                View Collections
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                            <div>
                                <p className="text-3xl font-bold gradient-text">20+</p>
                                <p className="text-gray-500 text-sm">Books Published</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold gradient-text">5⭐</p>
                                <p className="text-gray-500 text-sm">Rated Books</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold gradient-text">1000+</p>
                                <p className="text-gray-500 text-sm">Happy Readers</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image - Floating Books */}
                    <div className="flex-1 relative">
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Main Book */}
                            <div className="float-animation relative z-20">
                                <Image
                                    src="/covers/CA+ MONOCHROME CB 4 PORTADA.png"
                                    alt="Featured Monochrome Coloring Book"
                                    width={400}
                                    height={500}
                                    className="rounded-2xl shadow-2xl mx-auto"
                                    priority
                                />
                            </div>

                            {/* Background decorative elements */}
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30"></div>
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl opacity-30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
