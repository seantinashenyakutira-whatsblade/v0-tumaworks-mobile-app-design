import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DatabaseService } from '../services/databaseService';
import { WalletService } from '../services/walletService';
import { Job } from '../utils/types';
import { CATEGORY_TAGS } from '../constants/categories';

export const useJobs = () => {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Complex Job Posting Logic (Phase 5)
   */
  const postJob = async (jobData: Partial<Job>) => {
    if (!profile) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Validation Logic
      if (!jobData.category) throw new Error("Category is required");
      if (!jobData.tags || jobData.tags.length === 0) throw new Error("At least one tag is required");
      if (jobData.tags.length > 5) throw new Error("Maximum 5 tags allowed");
      if (!jobData.budget || jobData.budget <= 0) throw new Error("Valid budget required");

      // 2. Budget Verification (Phase 4)
      if (profile.walletBalance < jobData.budget) {
        throw new Error("Insufficient Wallet Balance. Please Add Funds first.");
      }

      // 3. Create the Job in Firestore
      const fullJob: Partial<Job> = {
          ...jobData,
          clientId: profile.id,
          escrowAmount: jobData.budget,
          status: 'open',
          clientConfirmed: false,
          workerConfirmed: false
      };
      
      const jobId = await DatabaseService.createJob(fullJob);

      // 4. Lock Funds in Escrow (Atomic)
      await WalletService.holdInEscrow(profile.id, jobId, jobData.budget);

      // 5. Refresh profile state
      await refreshProfile();
      
      return jobId;

    } catch (err: any) {
      setError(err.message || "Failed to post job");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    postJob,
    loading,
    error,
    getTagsForCategory: (cat: string) => CATEGORY_TAGS[cat] || []
  };
};
