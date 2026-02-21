import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
    id: number;
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    images: string[];
    description: string;
    features: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    isNew?: boolean;
    isBestseller?: boolean;
}

interface DbProduct {
    id: number;
    slug: string;
    name: string;
    category_id: string;
    price: number;
    original_price: number | null;
    rating: number;
    review_count: number;
    image_url: string;
    description: string;
    features: string[];
    sizes: string[];
    colors: string[];
    in_stock: boolean;
    is_new: boolean;
    is_bestseller: boolean;
    product_images: { image_url: string; display_order: number }[];
}

function mapProduct(p: DbProduct): Product {
    return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category_id,
        price: p.price,
        originalPrice: p.original_price || undefined,
        rating: p.rating,
        reviews: p.review_count,
        image: p.image_url || '',
        images: p.product_images
            ? p.product_images.sort((a, b) => a.display_order - b.display_order).map(i => i.image_url)
            : [p.image_url || ''],
        description: p.description || '',
        features: p.features || [],
        sizes: p.sizes || [],
        colors: p.colors || [],
        inStock: p.in_stock,
        isNew: p.is_new,
        isBestseller: p.is_bestseller,
    };
}

export function useProducts(category?: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('products')
                    .select('*, product_images(image_url, display_order)')
                    .order('id');

                if (category && category !== 'all') {
                    query = query.eq('category_id', category);
                }

                const { data, error: err } = await query;
                if (err) {
                    console.error('useProducts error:', err.message);
                    setError(err.message);
                } else {
                    setProducts((data as DbProduct[]).map(mapProduct));
                }
            } catch (e) {
                console.error('useProducts exception:', e);
                setError(String(e));
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return { products, loading, error };
}

export function useProduct(idOrSlug: string | number) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const isId = typeof idOrSlug === 'number' || /^\d+$/.test(String(idOrSlug));

                let query = supabase
                    .from('products')
                    .select('*, product_images(image_url, display_order)');

                if (isId) {
                    query = query.eq('id', Number(idOrSlug));
                } else {
                    query = query.eq('slug', idOrSlug);
                }

                const { data, error: err } = await query.single();
                if (err) {
                    console.error('useProduct error:', err.message);
                    setError(err.message);
                } else {
                    setProduct(mapProduct(data as DbProduct));
                }
            } catch (e) {
                console.error('useProduct exception:', e);
                setError(String(e));
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [idOrSlug]);

    return { product, loading, error };
}

export function useCategories() {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        supabase
            .from('categories')
            .select('id, name')
            .order('display_order')
            .then(({ data }) => {
                if (data) setCategories(data);
            });
    }, []);

    return categories;
}
