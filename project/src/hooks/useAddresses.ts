import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface Address {
    id: number;
    label: string;
    full_name: string;
    phone: string;
    address_line: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
}

export function useAddresses() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        if (!user) { setLoading(false); return; }
        const { data } = await supabase
            .from('addresses')
            .select('*')
            .eq('user_id', user.id)
            .order('is_default', { ascending: false });

        if (data) setAddresses(data);
        setLoading(false);
    };

    useEffect(() => { fetchAddresses(); }, [user]);

    const addAddress = async (addr: Omit<Address, 'id'>) => {
        if (!user) return false;

        // If marking as default, unset others first
        if (addr.is_default) {
            await supabase
                .from('addresses')
                .update({ is_default: false })
                .eq('user_id', user.id);
        }

        const { error } = await supabase
            .from('addresses')
            .insert({ ...addr, user_id: user.id });

        if (!error) await fetchAddresses();
        return !error;
    };

    const updateAddress = async (id: number, addr: Partial<Address>) => {
        if (!user) return false;

        if (addr.is_default) {
            await supabase
                .from('addresses')
                .update({ is_default: false })
                .eq('user_id', user.id);
        }

        const { error } = await supabase
            .from('addresses')
            .update(addr)
            .eq('id', id)
            .eq('user_id', user.id);

        if (!error) await fetchAddresses();
        return !error;
    };

    const deleteAddress = async (id: number) => {
        if (!user) return false;
        const { error } = await supabase
            .from('addresses')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (!error) await fetchAddresses();
        return !error;
    };

    return { addresses, loading, addAddress, updateAddress, deleteAddress, refetch: fetchAddresses };
}
