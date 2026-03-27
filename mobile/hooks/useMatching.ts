import { useState, useCallback } from 'react';
import { DatabaseService } from '../services/databaseService';
import { MatchingService } from '../services/matchingService';
import { UserProfile } from '../utils/types';

export const useMatching = () => {
    const [matches, setMatches] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const findMatches = useCallback(async (category: string, tags: string[], location: { lat: number, lng: number }) => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch potentially qualified workers
            const candidates = await DatabaseService.getNearbyWorkers(category);
            
            // 2. Rank using logic (Tag match, Premium, Rating, etc.)
            const ranked = MatchingService.rankWorkers(candidates, tags, location);
            
            // 3. Keep Top 10 as per rules
            setMatches(ranked.slice(0, 10));
            return ranked.slice(0, 10);
        } catch (err: any) {
            setError(err.message || 'Worker Matching Failed');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        matches,
        findMatches,
        loading,
        error
    };
};
