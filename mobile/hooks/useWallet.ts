import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { WalletService } from '../services/walletService';

export const useWallet = () => {
    const { profile, refreshProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deposit = async (amount: number, gateway: string) => {
        if (!profile) return;
        setLoading(true);
        setError(null);
        try {
            await WalletService.depositFunds(profile.id, amount, gateway);
            await refreshProfile();
        } catch (err: any) {
            setError(err.message || 'Deposit Failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const withdraw = async (amount: number) => {
        if (!profile) return;
        setLoading(true);
        setError(null);
        try {
            // Apply 5% fee on withdrawal logic as per rules
            await WalletService.withdraw(profile.id, amount);
            await refreshProfile();
        } catch (err: any) {
            setError(err.message || 'Withdrawal Failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const payoutWorker = async (workerId: string, jobId: string, amount: number) => {
        if (!profile) return;
        setLoading(true);
        setError(null);
        try {
            await WalletService.releaseEscrow(profile.id, workerId, jobId, amount);
            await refreshProfile();
        } catch (err: any) {
            setError(err.message || 'Payout Failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        deposit,
        withdraw,
        payoutWorker,
        loading,
        error,
        balances: {
            wallet: profile?.walletBalance || 0,
            escrow: profile?.escrowBalance || 0,
            pending: profile?.pendingEarnings || 0
        }
    };
};
