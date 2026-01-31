import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BookCard } from "@/components/BookCard";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";

// Book data - will be moved to a separate file later
const featuredBooks = [
  {
    id: "monochrome-1",
    title: "Monochrome Coloring Book",
    subtitle: "Power of Black & White Art Therapy",
    category: "Monochrome",
    image: "/covers/CA+ MONOCHROME CB 4 PORTADA.png",
    amazonUrl: "https://www.amazon.com/dp/B0FM4B5Z7H",
    hasLandingPage: true,
  },
  {
    id: "monochrome-2",
    title: "Ink Bliss Monochrome",
    subtitle: "Relaxing Coloring Experience",
    category: "Monochrome",
    image: "/covers/CA+ PORTADA INK BLIS MONOCHROME COLORING BOOK.png",
    amazonUrl: "https://www.amazon.com/dp/B0G3889XTJ",
    hasLandingPage: true,
  },
  {
    id: "monochrome-3",
    title: "Tattoo Monochrome",
    subtitle: "Bold Black & White Designs",
    category: "Monochrome",
    image: "/covers/CA+ PORTADA TATTO MONOCHR. CB 5.png",
    amazonUrl: "https://www.amazon.com/dp/B0FR91RBSZ",
    hasLandingPage: true,
  },
  {
    id: "monochrome-4",
    title: "Monochrome Adventures",
    subtitle: "Artistic Coloring Journey",
    category: "Monochrome",
    image: "/covers/PORTADA CA+ MONOCHROME COLORING BOOK 3-2.png",
    amazonUrl: "https://www.amazon.com/dp/B0FQ1JBGY6",
    hasLandingPage: true,
  },
  {
    id: "monochrome-5",
    title: "Mandala Monochrome",
    subtitle: "Meditative Patterns",
    category: "Monochrome",
    image: "/covers/PORTADA CA+ MONOCHROME MANDALA COLORING BOOK.png",
    amazonUrl: "https://www.amazon.com/dp/B0FSZ9V9MS",
    hasLandingPage: true,
  },
];

const categories = [
  {
    id: "monochrome",
    name: "Monochrome Coloring",
    count: 10,
    gradient: "from-gray-900 to-gray-700",
    description: "Bold black & white art therapy"
  },
  {
    id: "coloring",
    name: "Coloring Books",
    count: 2,
    gradient: "from-purple-500 to-pink-500",
    description: "Vibrant coloring experiences"
  },
  {
    id: "activity",
    name: "Activity Books",
    count: 2,
    gradient: "from-orange-500 to-yellow-500",
    description: "For adults and seniors"
  },
  {
    id: "kids",
    name: "Kids Books",
    count: 2,
    gradient: "from-blue-500 to-cyan-500",
    description: "Educational & fun"
  },
  {
    id: "puzzles",
    name: "Word Search & Puzzles",
    count: 4,
    gradient: "from-green-500 to-emerald-500",
    description: "Brain training activities"
  },
];

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Categories Section */}
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Our Collections</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our wide range of coloring books, activity books, and puzzles
            designed for all ages and skill levels.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Featured Books</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our bestselling Monochrome Collection - Experience the power of
            black and white art therapy.
          </p>

          <div className="books-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section animated-gradient text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-90">
            Join our newsletter to receive exclusive discounts, new book announcements,
            and free coloring pages!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-email text-gray-800 flex-1"
            />
            <button type="submit" className="btn-primary bg-white !text-purple-600 hover:!bg-gray-100">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Social Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Connect With Us</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Follow us on social media for daily inspiration, coloring tips,
            and community highlights!
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Pinterest">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 00-4.373 23.178c-.07-.937-.134-2.376.028-3.399.146-.926.944-5.896.944-5.896s-.24-.482-.24-1.192c0-1.115.647-1.949 1.452-1.949.685 0 1.016.515 1.016 1.131 0 .69-.439 1.72-.665 2.673-.189.8.401 1.452 1.189 1.452 1.428 0 2.527-1.505 2.527-3.677 0-1.922-1.381-3.266-3.355-3.266-2.286 0-3.626 1.714-3.626 3.486 0 .69.266 1.429.598 1.831.065.079.075.148.055.229-.061.253-.196.8-.223.912-.035.148-.116.18-.268.108-1.001-.466-1.627-1.928-1.627-3.102 0-2.524 1.834-4.843 5.288-4.843 2.776 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.499 1.902c-.181.695-.669 1.566-.995 2.097A12 12 0 1012 0z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
