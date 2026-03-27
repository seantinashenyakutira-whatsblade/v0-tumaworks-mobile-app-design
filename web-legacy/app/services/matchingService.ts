import { UserProfile, WorkerProfile } from '../types';

export class MatchingService {
  /**
   * Rank workers based on the specified weighted algorithm.
   * Score = (Premium Boost * 0.40) + (Rating * 0.25) + (Distance * 0.15) + (Experience * 0.10) + (Price competitiveness * 0.10)
   */
  static rankWorkers(workers: WorkerProfile[], targetLocation: { lat: number; lng: number }, userBudget: number): WorkerProfile[] {
    return (workers as any).map((worker: WorkerProfile) => {
      // 1. Premium Boost (40%)
      const premiumScore = worker.isPremium ? 1.0 : 0.0;

      // 2. Rating (25%)
      const ratingScore = worker.rating / 5.0; // Normalize 0-5 into 0-1

      // 3. Distance (15%)
      const distance = this.calculateDistance(
        targetLocation.lat, targetLocation.lng,
        worker.location.lat, worker.location.lng
      );
      // Normalize distance (assuming within 20km, closer is better)
      const distanceScore = Math.max(0, 1 - (distance / 20));

      // 4. Experience (10%)
      const experienceYears = parseInt(worker.experience || '0', 10);
      const experienceScore = Math.min(1.0, experienceYears / 10); // Assume 10+ years is max score

      // 5. Price Competitiveness (10%)
      const workerHourlyRate = 250; // Mock rate in ZMW
      const priceScore = Math.min(1.0, userBudget / workerHourlyRate);

      // Total Weighted Score
      const totalScore = (premiumScore * 0.40) + (ratingScore * 0.25) + (distanceScore * 0.15) + (experienceScore * 0.10) + (priceScore * 0.10);

      return {
        ...worker,
        matchingScore: totalScore
      };
    }).sort((a: any, b: any) => b.matchingScore - a.matchingScore);
  }

  // Uses Haversine formula to calculate km distance between coordinates
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
