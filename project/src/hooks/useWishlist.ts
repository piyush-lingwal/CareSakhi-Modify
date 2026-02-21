import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useWishlist() {
    const { user } = useAuth();
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        if (!user) { setWishlistIds([]); setLoading(false); return; }
        const { data } = await supabase
            .from('wishlist_items')
            .select('product_id')
            .eq('user_id', user.id);

        if (data) setWishlistIds(data.map(w => w.product_id));
        setLoading(false);
    };

    useEffect(() => { fetchWishlist(); }, [user]);

    const toggleWishlist = async (productId: number) => {
        if (!user) return false;

        const isWished = wishlistIds.includes(productId);

        if (isWished) {
            const { error } = await supabase
                .from('wishlist_items')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);
            if (!error) setWishlistIds(prev => prev.filter(id => id !== productId));
            return !error;
        } else {
            const { error } = await supabase
                .from('wishlist_items')
                .insert({ user_id: user.id, product_id: productId });
            if (!error) setWishlistIds(prev => [...prev, productId]);
            return !error;
        }
    };

    const isWishlisted = (productId: number) => wishlistIds.includes(productId);

    return { wishlistIds, loading, toggleWishlist, isWishlisted, refetch: fetchWishlist };
}
