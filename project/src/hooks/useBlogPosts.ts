import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    featured: boolean;
}

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .order('published_at', { ascending: false });

                if (error) {
                    console.error('useBlogPosts error:', error.message);
                } else if (data) {
                    setPosts(data.map(p => ({
                        id: p.id,
                        slug: p.slug,
                        title: p.title,
                        excerpt: p.excerpt || '',
                        content: p.content || '',
                        author: p.author || '',
                        date: p.published_at || p.created_at,
                        category: p.category || '',
                        image: p.image_url || '',
                        readTime: p.read_time || '',
                        featured: p.is_featured || false,
                    })));
                }
            } catch (e) {
                console.error('useBlogPosts exception:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return { posts, loading };
}
