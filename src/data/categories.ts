import type { BookCategory } from "./books";

export interface Category {
  id: BookCategory;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  icon: string; // Lucide icon name
  gradient: string; // Tailwind gradient classes
  accentColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "ink-bliss",
    name: "Ink Bliss Series",
    nameEs: "Serie Ink Bliss",
    description: "Monochrome coloring books — one pen, infinite calm",
    descriptionEs: "Libros de colorear monocromos — un bolígrafo, calma infinita",
    icon: "Palette",
    gradient: "from-slate-700 to-slate-900",
    accentColor: "#94a3b8",
  },
  {
    id: "coloring",
    name: "Classic Coloring",
    nameEs: "Colorear Clásico",
    description: "Beautiful designs for relaxation and creative expression",
    descriptionEs: "Hermosos diseños para relajación y expresión creativa",
    icon: "Brush",
    gradient: "from-purple-600 to-pink-600",
    accentColor: "#a855f7",
  },
  {
    id: "puzzles-activity",
    name: "Puzzles & Activity",
    nameEs: "Puzzles y Actividades",
    description: "Sudoku, crosswords, word search and brain games",
    descriptionEs: "Sudoku, crucigramas, sopa de letras y juegos mentales",
    icon: "Puzzle",
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "#10b981",
  },
  {
    id: "spanish",
    name: "En Español",
    nameEs: "En Español",
    description: "Books in Spanish for adults and seniors",
    descriptionEs: "Libros en español para adultos y personas mayores",
    icon: "Globe",
    gradient: "from-amber-500 to-orange-600",
    accentColor: "#f59e0b",
  },
  {
    id: "kids-educational",
    name: "Kids & Education",
    nameEs: "Niños y Educación",
    description: "Fun learning tools for young explorers",
    descriptionEs: "Herramientas de aprendizaje divertidas para jóvenes exploradores",
    icon: "GraduationCap",
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "#3b82f6",
  },
  // Health & Wellness (Isabelle Whitmore) — NOT shown on FBP site, separate brand
  // {
  //   id: "health",
  //   name: "Health & Wellness",
  //   nameEs: "Salud y Bienestar",
  //   description: "Expert guides for brain health and anti-aging — by Isabelle Whitmore",
  //   descriptionEs: "Guías expertas para salud cerebral y anti-envejecimiento — por Isabelle Whitmore",
  //   icon: "Heart",
  //   gradient: "from-teal-500 to-cyan-600",
  //   accentColor: "#14b8a6",
  // },
];

export function getCategoryById(id: BookCategory): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
