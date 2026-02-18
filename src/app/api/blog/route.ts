import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
    const posts = getBlogPosts('en');
    // Return only metadata, not full content
    const meta = posts.map(({ content, ...rest }) => rest);
    return NextResponse.json(meta);
}
