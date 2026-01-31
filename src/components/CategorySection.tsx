import Link from "next/link";

interface Category {
    id: string;
    name: string;
    count: number;
    gradient: string;
    description: string;
}

interface CategorySectionProps {
    category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
    return (
        <Link
            href={`/category/${category.id}`}
            className="group relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-all duration-300 group-hover:scale-110`}></div>

            {/* Content */}
            <div className="relative z-10">
                <span className="text-4xl font-bold opacity-20 absolute top-2 right-2">
                    {category.count}
                </span>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
                <p className="mt-3 text-sm font-medium">
                    {category.count} {category.count === 1 ? "book" : "books"} →
                </p>
            </div>
        </Link>
    );
}
