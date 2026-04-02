// ============================================
// FUN BOOKS PUBLISHER - Book Catalog
// Single source of truth for ALL 18 books
// ============================================

export type BookCategory =
  | "ink-bliss"
  | "coloring"
  | "puzzles-activity"
  | "spanish"
  | "kids-educational"
  | "health";

export type BookAuthor = "Fun Books Publisher" | "Isabelle Whitmore";

export interface Book {
  id: string;
  title: string;
  titleEs: string;
  subtitle: string;
  description: string;
  descriptionEs: string;
  asin: string;
  amazonUrl: string;
  price: number;
  category: BookCategory;
  categoryLabel: string;
  author: BookAuthor;
  language: "en" | "es";
  coverImage: string;
  pages: number;
  isBestseller: boolean;
  isActive: boolean;
  isSeasonal: boolean;
  rating: number | null;
  reviewCount: number;
  keywords: string[];
  sortOrder: number;
  bonusPdf?: string; // Path to bonus PDF in /public/downloads/
  coverRatio?: string; // CSS aspect-ratio override (default '3/4'). Use '1/1' for square books.
}

// Alias map: old IDs (possibly printed in books) → canonical book IDs
export const BOOK_ALIASES: Record<string, string> = {
  "monochrome-vol-4": "black-white-art-therapy",
  "power-black-white": "black-white-art-therapy",
  "monochrome-ink-bliss": "ink-bliss-imagination",
  "monochrome-tattoo": "tattoo-flash",
  "monochrome-vol-3": "negative-space-animals",
};

export const BOOKS: Book[] = [
  // ============ INK BLISS SERIES (5) ============
  {
    id: "monochrome-mandala",
    title: "Monochrome Mandala Coloring Book — Ink Bliss Series",
    titleEs: "Libro de Colorear Mandala Monocromo — Serie Ink Bliss",
    subtitle: "Ink Bliss Series",
    description:
      "50 hand-drawn mandala designs for stress relief and mindful relaxation. One color, infinite calm. The perfect creative escape for adults and teens.",
    descriptionEs:
      "50 diseños de mandalas dibujados a mano para aliviar el estrés y la relajación consciente. Un color, calma infinita.",
    asin: "B0FQ1JBGY6",
    amazonUrl: "https://www.amazon.com/dp/B0FQ1JBGY6",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/monochrome-mandala.png",
    pages: 108,
    isBestseller: true,
    isActive: true,
    isSeasonal: false,
    rating: 4.7,
    reviewCount: 0,
    keywords: ["mandala", "monochrome", "coloring book", "stress relief", "adult coloring"],
    sortOrder: 1,
    bonusPdf: "/downloads/monochrome-mandala.pdf",
    coverRatio: "1/1",
  },
  {
    id: "ink-bliss-imagination",
    title: "Ink Bliss: Monochrome Imagination",
    titleEs: "Ink Bliss: Imaginación Monocroma",
    subtitle: "Ink Bliss Series",
    description:
      "An immersive monochrome coloring experience for art enthusiasts. Detailed designs that bring creativity to life with a single pen.",
    descriptionEs:
      "Una experiencia de colorear monocroma inmersiva para entusiastas del arte. Diseños detallados que dan vida a la creatividad con un solo bolígrafo.",
    asin: "B0FM4B5Z7H",
    amazonUrl: "https://www.amazon.com/dp/B0FM4B5Z7H",
    price: 9.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/ink-bliss-imagination.png",
    pages: 108,
    isBestseller: true,
    isActive: true,
    isSeasonal: false,
    rating: 4.5,
    reviewCount: 0,
    keywords: ["monochrome", "coloring book", "art therapy", "creative"],
    sortOrder: 2,
    bonusPdf: "/downloads/ink-bliss.pdf",
  },
  {
    id: "negative-space-animals",
    title: "One-Color Negative-Space Designs — Animal Collection",
    titleEs: "Diseños de Espacio Negativo a Un Color — Colección Animal",
    subtitle: "Ink Bliss Series",
    description:
      "Unique negative-space art style featuring stunning animal designs. A fresh take on adult coloring that challenges your creativity.",
    descriptionEs:
      "Estilo artístico único de espacio negativo con impresionantes diseños de animales. Un enfoque fresco del coloreo para adultos.",
    asin: "B0FR91RBSZ",
    amazonUrl: "https://www.amazon.com/dp/B0FR91RBSZ",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/negative-space-animals.png",
    pages: 108,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["negative space", "animals", "coloring book", "one color"],
    sortOrder: 3,
    bonusPdf: "/downloads/animal-collection.pdf",
  },
  {
    id: "cozy-escapes",
    title: "Monochrome Coloring Book — Black & White Cozy Escapes",
    titleEs: "Libro de Colorear Monocromo — Escapadas Acogedoras en Blanco y Negro",
    subtitle: "Ink Bliss Series",
    description:
      "50 cozy cottage scenes, fireplaces, rainy windows, and warm interiors designed for stress relief. One color, pure comfort. The ultimate relaxation coloring book for adults.",
    descriptionEs:
      "50 escenas acogedoras de cabañas, chimeneas, ventanas lluviosas e interiores cálidos diseñados para aliviar el estrés. Un color, pura comodidad.",
    asin: "B0FSZ9V9MS",
    amazonUrl: "https://www.amazon.com/dp/B0FSZ9V9MS",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/cozy-escapes.png",
    pages: 108,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 40,
    keywords: ["cozy escapes", "cottage", "hygge", "monochrome", "coloring book", "black and white", "stress relief", "one color"],
    sortOrder: 4,
    bonusPdf: "/downloads/cozy-escapes.pdf",
  },
  {
    id: "tattoo-flash",
    title: "Monochrome Coloring Book — Tattoo Flash Black and White Edition",
    titleEs: "Libro de Colorear Monocromo — Tattoo Flash Edición Blanco y Negro",
    subtitle: "Ink Bliss Series",
    description:
      "50 bold blackwork designs featuring old school and neo-traditional tattoo art. Perfect for tattoo lovers and ink enthusiasts.",
    descriptionEs:
      "50 diseños audaces de blackwork con arte de tatuaje old school y neo-tradicional. Perfecto para amantes de los tatuajes.",
    asin: "B0G3889XTJ",
    amazonUrl: "https://www.amazon.com/dp/B0G3889XTJ",
    price: 9.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/tattoo-flash.png",
    pages: 108,
    isBestseller: true,
    isActive: true,
    isSeasonal: false,
    rating: 4.6,
    reviewCount: 0,
    keywords: ["tattoo", "flash", "blackwork", "old school", "neo traditional"],
    sortOrder: 5,
    bonusPdf: "/downloads/tattoo-flash.pdf",
  },
  {
    id: "black-white-art-therapy",
    title: "Monochrome Coloring Book for Adults: Black & White Art Therapy",
    titleEs: "Libro de Colorear Monocromo para Adultos: Arte Terapia en Blanco y Negro",
    subtitle: "Ink Bliss Series",
    description:
      "50 mixed monochrome illustrations — abstract art, figurative scenes, nature studies, and surreal compositions. A curated variety of artistic styles designed for stress relief and mindful focus.",
    descriptionEs:
      "50 ilustraciones monocromas variadas — arte abstracto, escenas figurativas, estudios de naturaleza y composiciones surrealistas. Una variedad curada de estilos artísticos diseñada para aliviar el estrés.",
    asin: "",
    amazonUrl: "",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/power-of-black-and-white.png",
    pages: 108,
    isBestseller: false,
    isActive: false,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["monochrome", "art therapy", "mixed illustrations", "abstract", "figurative", "stress relief", "one color", "black and white"],
    sortOrder: 19,
    bonusPdf: "/downloads/power-of-black-and-white.pdf",
  },

  {
    id: "botanicals",
    title: "One-Color Botanicals & Nature Escapes — Ink Bliss Series",
    titleEs: "Botánicos y Escenas Naturales a Un Color — Serie Ink Bliss",
    subtitle: "Ink Bliss Series",
    description:
      "50 stunning botanical and nature designs for mindful coloring. Flowers, leaves, and serene landscapes brought to life with a single color.",
    descriptionEs:
      "50 impresionantes diseños botánicos y de naturaleza para colorear con atención plena. Flores, hojas y paisajes serenos que cobran vida con un solo color.",
    asin: "B0D8FG7NDJ",
    amazonUrl: "https://www.amazon.com/dp/B0D8FG7NDJ",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/botanicals.png",
    pages: 108,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["botanicals", "nature", "flowers", "coloring book", "one color", "monochrome"],
    sortOrder: 6,
    bonusPdf: "/downloads/botanicals.pdf",
  },

  // ============ OTHER COLORING (3) ============
  {
    id: "stress-relief-inspiration",
    title: "Adult Coloring Book: Stress Relief & Inspiration",
    titleEs: "Libro de Colorear para Adultos: Alivio del Estrés e Inspiración",
    subtitle: "Classic Collection",
    description:
      "Discover relaxation with mindful coloring. Beautiful patterns and designs crafted to help you unwind after a long day.",
    descriptionEs:
      "Descubre la relajación con el coloreo consciente. Hermosos patrones y diseños creados para ayudarte a desconectar después de un largo día.",
    asin: "B0D8FG7NDJ",
    amazonUrl: "https://www.amazon.com/dp/B0D8FG7NDJ",
    price: 8.99,
    category: "coloring",
    categoryLabel: "Classic Coloring",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/stress-relief-inspiration.png",
    pages: 100,
    isBestseller: false,
    isActive: false,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["stress relief", "adult coloring", "relaxation", "mindful"],
    sortOrder: 6,
  },
  {
    id: "zen-mandalas",
    title: "Art of Serenity: 101 Zen Mandalas",
    titleEs: "El Arte de la Serenidad: 101 Mandalas Zen",
    subtitle: "Zen Collection",
    description:
      "101 zen-inspired mandala patterns that calm the mind. A journey through meditative art for adults seeking inner peace.",
    descriptionEs:
      "101 patrones de mandala inspirados en el zen que calman la mente. Un viaje a través del arte meditativo para adultos que buscan paz interior.",
    asin: "B0DBJ3YJJS",
    amazonUrl: "https://www.amazon.com/dp/B0DBJ3YJJS",
    price: 9.99,
    category: "coloring",
    categoryLabel: "Classic Coloring",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/zen-mandalas.png",
    pages: 210,
    isBestseller: false,
    isActive: false, // En nevera
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["zen", "mandala", "serenity", "meditation", "coloring"],
    sortOrder: 7,
  },
  {
    id: "christmas-santa",
    title: "Christmas Santa Claus Coloring Book",
    titleEs: "Libro de Colorear de Papá Noel",
    subtitle: "Holiday Special",
    description:
      "Intricate Santa Claus designs for adult relaxation during the holiday season. Get into the festive spirit with creative coloring.",
    descriptionEs:
      "Intrincados diseños de Papá Noel para la relajación de adultos durante las fiestas. Entra en el espíritu navideño con coloreo creativo.",
    asin: "B0DKSC5QTL",
    amazonUrl: "https://www.amazon.com/dp/B0DKSC5QTL",
    price: 7.99,
    category: "coloring",
    categoryLabel: "Classic Coloring",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/christmas-santa.png",
    pages: 60,
    isBestseller: false,
    isActive: true,
    isSeasonal: true,
    rating: null,
    reviewCount: 0,
    keywords: ["christmas", "santa claus", "holiday", "coloring book"],
    sortOrder: 8,
  },

  // ============ PUZZLES & ACTIVITY (2) ============
  {
    id: "variety-puzzle-ultimate",
    title: "Variety Puzzle Book for Adults: Ultimate Collection",
    titleEs: "Libro de Pasatiempos Variados para Adultos: Colección Definitiva",
    subtitle: "Brain Games",
    description:
      "Sudoku, crosswords, word search, mazes and more in large print. The ultimate brain workout for puzzle lovers of all skill levels.",
    descriptionEs:
      "Sudoku, crucigramas, sopa de letras, laberintos y más en letra grande. El entrenamiento cerebral definitivo para amantes de los puzzles.",
    asin: "B0D6TZKZW2",
    amazonUrl: "https://www.amazon.com/dp/B0D6TZKZW2",
    price: 9.99,
    category: "puzzles-activity",
    categoryLabel: "Puzzles & Activity",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/variety-puzzle-ultimate.png",
    pages: 200,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["puzzles", "sudoku", "crossword", "word search", "brain games"],
    sortOrder: 9,
  },
  {
    id: "variety-puzzle-plus",
    title: "Variety Puzzle Book for Adults: Plus Edition",
    titleEs: "Libro de Pasatiempos Variados para Adultos: Edición Plus",
    subtitle: "Brain Games",
    description:
      "150 brain games packed into one book. The plus edition of our bestselling puzzle collection with new challenge types.",
    descriptionEs:
      "150 juegos mentales en un solo libro. La edición plus de nuestra colección de puzzles más vendida con nuevos tipos de desafíos.",
    asin: "B0D9YJY28N",
    amazonUrl: "https://www.amazon.com/dp/B0D9YJY28N",
    price: 9.99,
    category: "puzzles-activity",
    categoryLabel: "Puzzles & Activity",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/variety-puzzle-plus.png",
    pages: 200,
    isBestseller: false,
    isActive: false, // En nevera
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["puzzles", "brain games", "150 puzzles"],
    sortOrder: 10,
  },

  // ============ SPANISH LANGUAGE (3) ============
  {
    id: "ejercicios-memoria",
    title: "Ejercicios de Memoria para Personas Mayores",
    titleEs: "Ejercicios de Memoria para Personas Mayores",
    subtitle: "Cognitive Health",
    description:
      "Cognitive exercises designed to keep the mind sharp for seniors. A comprehensive memory training workbook in Spanish.",
    descriptionEs:
      "Ejercicios cognitivos diseñados para mantener la mente activa en personas mayores. Un completo cuaderno de entrenamiento de memoria en español.",
    asin: "B0CW1BQWLH",
    amazonUrl: "https://www.amazon.com/dp/B0CW1BQWLH",
    price: 9.99,
    category: "spanish",
    categoryLabel: "En Español",
    author: "Fun Books Publisher",
    language: "es",
    coverImage: "/covers/ejercicios-memoria.png",
    pages: 120,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["memoria", "personas mayores", "ejercicios cognitivos", "español"],
    sortOrder: 11,
  },
  {
    id: "150-pasatiempos",
    title: "150 Pasatiempos para Adultos y Personas Mayores",
    titleEs: "150 Pasatiempos para Adultos y Personas Mayores",
    subtitle: "Entretenimiento",
    description:
      "Hours of entertainment and brain training with 150 varied puzzles. Perfect for Spanish-speaking adults and seniors.",
    descriptionEs:
      "Horas de entretenimiento y entrenamiento cerebral con 150 pasatiempos variados. Perfecto para adultos y personas mayores de habla hispana.",
    asin: "B0D95Q7D9Y",
    amazonUrl: "https://www.amazon.com/dp/B0D95Q7D9Y",
    price: 9.99,
    category: "spanish",
    categoryLabel: "En Español",
    author: "Fun Books Publisher",
    language: "es",
    coverImage: "/covers/150-pasatiempos.png",
    pages: 200,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["pasatiempos", "adultos", "personas mayores", "español"],
    sortOrder: 12,
  },
  {
    id: "sopa-de-letras",
    title: "SOPA DE LETRAS EN ESPAÑOL PARA ADULTOS",
    titleEs: "Sopa de Letras en Español para Adultos",
    subtitle: "Word Search",
    description:
      "Classic word search puzzles in Spanish. Hundreds of words to find across dozens of themed categories.",
    descriptionEs:
      "Sopa de letras clásica en español. Cientos de palabras para encontrar en docenas de categorías temáticas.",
    asin: "B0D5L9MKGC",
    amazonUrl: "https://www.amazon.com/dp/B0D5L9MKGC",
    price: 8.99,
    category: "spanish",
    categoryLabel: "En Español",
    author: "Fun Books Publisher",
    language: "es",
    coverImage: "/covers/sopa-de-letras.png",
    pages: 120,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["sopa de letras", "word search", "español", "adultos"],
    sortOrder: 13,
  },

  // ============ KIDS EDUCATIONAL (2) ============
  {
    id: "compass-for-kids",
    title: "How to Use a Compass for Kids",
    titleEs: "Cómo Usar una Brújula para Niños",
    subtitle: "Explorer Series",
    description:
      "Learn navigation skills in a fun and engaging way. A hands-on guide that turns kids into confident explorers.",
    descriptionEs:
      "Aprende habilidades de navegación de forma divertida y atractiva. Una guía práctica que convierte a los niños en exploradores seguros.",
    asin: "B0DSQTGTWV",
    amazonUrl: "https://www.amazon.com/dp/B0DSQTGTWV",
    price: 8.99,
    category: "kids-educational",
    categoryLabel: "Kids & Education",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/compass-for-kids.png",
    pages: 80,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["compass", "kids", "navigation", "educational", "outdoor"],
    sortOrder: 14,
  },
  {
    id: "cursive-workbook",
    title: "Cursive Workbook for Kids Ages 8-12",
    titleEs: "Cuaderno de Caligrafía para Niños de 8 a 12 Años",
    subtitle: "Learn to Write",
    description:
      "Master cursive writing with ease. Step-by-step practice pages designed for kids ages 8-12 and homeschoolers.",
    descriptionEs:
      "Domina la escritura cursiva con facilidad. Páginas de práctica paso a paso diseñadas para niños de 8 a 12 años.",
    asin: "B0D6N92QZ1",
    amazonUrl: "https://www.amazon.com/dp/B0D6N92QZ1",
    price: 7.99,
    category: "kids-educational",
    categoryLabel: "Kids & Education",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/cursive-workbook.png",
    pages: 100,
    isBestseller: false,
    isActive: true,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["cursive", "handwriting", "kids", "workbook", "education"],
    sortOrder: 15,
  },

  // ============ HEALTH - ISABELLE WHITMORE (2) ============
  // NOT shown on FBP website — separate brand/pen name
  {
    id: "mind-diet-cookbook",
    title: "The Mind Diet Cookbook for Seniors Over 60",
    titleEs: "El Libro de Cocina de la Dieta MIND para Mayores de 60",
    subtitle: "3-in-1 Guide",
    description:
      "A comprehensive 3-in-1 guide to boost brain health and help prevent Alzheimer's. Recipes, meal plans, and nutritional science for seniors.",
    descriptionEs:
      "Una guía completa 3 en 1 para mejorar la salud cerebral y ayudar a prevenir el Alzheimer. Recetas, planes de comidas y ciencia nutricional para mayores.",
    asin: "B0F1NB5CZV",
    amazonUrl: "https://www.amazon.com/dp/B0F1NB5CZV",
    price: 14.99,
    category: "health",
    categoryLabel: "Health & Wellness",
    author: "Isabelle Whitmore",
    language: "en",
    coverImage: "/covers/mind-diet-cookbook.png",
    pages: 250,
    isBestseller: false,
    isActive: false,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["mind diet", "cookbook", "seniors", "brain health", "alzheimers"],
    sortOrder: 16,
  },
  {
    id: "peptides-blueprint",
    title: "The Peptides Blueprint",
    titleEs: "El Manual de los Péptidos",
    subtitle: "5-in-1 Optimization Manual",
    description:
      "Your complete guide to unlocking anti-aging secrets with peptides. A 5-in-1 optimization manual for biohackers and health enthusiasts.",
    descriptionEs:
      "Tu guía completa para descubrir los secretos anti-envejecimiento con péptidos. Un manual de optimización 5 en 1 para biohackers y entusiastas de la salud.",
    asin: "B0FB3XC3DF",
    amazonUrl: "https://www.amazon.com/dp/B0FB3XC3DF",
    price: 12.99,
    category: "health",
    categoryLabel: "Health & Wellness",
    author: "Isabelle Whitmore",
    language: "en",
    coverImage: "/covers/peptides-blueprint.png",
    pages: 200,
    isBestseller: false,
    isActive: false,
    isSeasonal: false,
    rating: null,
    reviewCount: 0,
    keywords: ["peptides", "anti-aging", "biohacking", "health", "optimization"],
    sortOrder: 17,
  },

  // ============ NEW — SPOOKY KAWAII ============
  {
    id: "spooky-kawaii",
    title: "Monochrome Coloring Book: Spooky Kawaii – Black & White Cute Halloween",
    titleEs: "Libro de Colorear Monocromo: Spooky Kawaii – Edición Halloween en Blanco y Negro",
    subtitle: "Ink Bliss Series",
    description:
      "50 adorable yet creepy kawaii designs — cute ghosts, witches, pumpkins, and spooky creatures in one-color monochrome style. The perfect Halloween coloring book for adults and teens who love kawaii art.",
    descriptionEs:
      "50 diseños kawaii adorables y espeluznantes — fantasmas, brujas, calabazas y criaturas misteriosas en estilo monocromo de un solo color. El libro de colorear Halloween perfecto para adultos y jóvenes que aman el arte kawaii.",
    asin: "",
    amazonUrl: "",
    price: 8.99,
    category: "ink-bliss",
    categoryLabel: "Ink Bliss Series",
    author: "Fun Books Publisher",
    language: "en",
    coverImage: "/covers/spooky-kawaii.png",
    pages: 108,
    isBestseller: false,
    isActive: false,
    isSeasonal: true,
    rating: null,
    reviewCount: 0,
    keywords: ["spooky kawaii", "halloween coloring book", "kawaii coloring", "cute halloween", "monochrome", "black and white", "one color", "adults teens"],
    sortOrder: 18,
    bonusPdf: "/downloads/spooky-kawaii-bonus.pdf",
  },
];
