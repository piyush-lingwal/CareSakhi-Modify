import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface Order {
    id: string;
    status: string;
    payment_method: string;
    subtotal: number;
    discount: number;
    total: number;
    shipping_address: Record<string, string>;
    created_at: string;
    delivered_at?: string;
    items: OrderItem[];
}

export interface OrderItem {
    id: number;
    product_name: string;
    product_image: string;
    size: string;
    color: string;
    quantity: number;
    unit_price: number;
}

export function useOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user) { setLoading(false); return; }
        const { data } = await supabase
            .from('orders')
            .select('*, order_items(*)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) {
            setOrders(data.map(o => ({
                ...o,
                items: o.order_items || [],
            })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchOrders(); }, [user]);

    const createOrder = async (orderData: {
        payment_method: string;
        subtotal: number;
        discount: number;
        total: number;
        shipping_address: Record<string, string>;
        items: { product_id: number; product_name: string; product_image: string; size: string; color: string; quantity: number; unit_price: number }[];
    }) => {
        if (!user) return null;

        // Generate order ID
        const year = new Date().getFullYear();
        const rand = Math.floor(1000 + Math.random() * 9000);
        const orderId = `CS-${year}-${rand}`;

        const { error: orderError } = await supabase
            .from('orders')
            .insert({
                id: orderId,
                user_id: user.id,
                status: 'processing',
                payment_method: orderData.payment_method,
                subtotal: orderData.subtotal,
                discount: orderData.discount,
                total: orderData.total,
                shipping_address: orderData.shipping_address,
            });

        if (orderError) return null;

        // Insert order items
        const items = orderData.items.map(item => ({
            order_id: orderId,
            ...item,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(items);

        if (itemsError) return null;

        await fetchOrders();
        return orderId;
    };

    return { orders, loading, createOrder, refetch: fetchOrders };
}
