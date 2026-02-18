import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    category: string;
    tags: string[];
    content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getBlogPosts(locale = 'en'): BlogPost[] {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

    const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { data, content } = matter(raw);
        return {
            slug: data.slug || file.replace(/\.md$/, ''),
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            category: data.category || '',
            tags: data.tags || [],
            content,
        } as BlogPost;
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string, locale = 'en'): BlogPost | null {
    const posts = getBlogPosts(locale);
    return posts.find((p) => p.slug === slug) || null;
}

export function getAllBlogSlugs(locale = 'en'): string[] {
    return getBlogPosts(locale).map((p) => p.slug);
}
