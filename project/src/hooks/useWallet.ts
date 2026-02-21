import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface WalletData {
    balance: number;
    coins: number;
}

export interface WalletTransaction {
    id: number;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    created_at: string;
}

export function useWallet() {
    const { user } = useAuth();
    const [wallet, setWallet] = useState<WalletData>({ balance: 0, coins: 0 });
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWallet = async () => {
        if (!user) { setLoading(false); return; }

        const { data: w } = await supabase
            .from('wallets')
            .select('balance, coins')
            .eq('user_id', user.id)
            .single();

        if (w) setWallet({ balance: Number(w.balance), coins: w.coins });

        const { data: txns } = await supabase
            .from('wallet_transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);

        if (txns) setTransactions(txns);
        setLoading(false);
    };

    useEffect(() => { fetchWallet(); }, [user]);

    const addMoney = async (amount: number) => {
        if (!user) return false;
        const { error } = await supabase.rpc('add_wallet_balance', {
            p_user_id: user.id,
            p_amount: amount,
            p_description: 'Added money to wallet',
        });
        if (!error) await fetchWallet();
        return !error;
    };

    const deductCoins = async (coins: number, description = 'Coins redeemed on order') => {
        if (!user || coins <= 0) return false;
        const { error } = await supabase.rpc('deduct_wallet_coins', {
            p_user_id: user.id,
            p_coins: coins,
            p_description: description,
        });
        if (!error) await fetchWallet();
        return !error;
    };

    return { wallet, transactions, loading, addMoney, deductCoins, refetch: fetchWallet };
}
