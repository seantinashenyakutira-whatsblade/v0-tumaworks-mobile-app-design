import { UserOfMatch, UserProfile } from '../utils/types';

export class MatchingService {

  /**
   * Calculates a match score for a worker based on job requirements.
   * Phase 6: Ranked by 
   *    Tag match relevance (30%)
   *    Premium boost (25%)
   *    Rating (20%)
   *    Distance (15%)
   *    Experience (10%)
   */
  static calculateScore(worker: any, jobTags: string[], jobLocation: { lat: number, lng: number }): number {
    let score = 0;

    // 1. Tag Match (30%)
    const workerTags = (worker.tags || []) as string[];
    const tagOverlap = workerTags.filter(tag => jobTags.includes(tag)).length;
    const tagMatchScore = jobTags.length > 0 ? (tagOverlap / jobTags.length) * 30 : 0;
    score += tagMatchScore;

    // 2. Premium Boost (25%)
    if (worker.isPremium) {
      score += 25;
    }

    // 3. Rating (20%)
    const ratingScore = ((worker.rating || 0) / 5) * 20;
    score += ratingScore;

    // 4. Distance (15%) - Simplified as euclidean for mobile MVP
    if (worker.location && jobLocation) {
        const d = Math.sqrt(
            Math.pow(worker.location.lat - jobLocation.lat, 2) + 
            Math.pow(worker.location.lng - jobLocation.lng, 2)
        );
        // Normalize distance score (assuming 0.1 deg is ~11km max)
        const distScore = Math.max(0, (1 - (d / 0.1))) * 15;
        score += distScore;
    }

    // 5. Experience (10%)
    // Normalized assuming 10+ years is max
    const years = (worker.experienceYears || 1);
    const expScore = Math.min(10, years) * 1.0;
    score += expScore;

    return Math.round(score * 100) / 100;
  }

  static rankWorkers(workers: UserProfile[], jobTags: string[], jobLocation: { lat: number, lng: number }): UserProfile[] {
    return workers
      .map(w => ({ ...w, matchScore: this.calculateScore(w, jobTags, jobLocation) }))
      .sort((a: any, b: any) => b.matchScore - a.matchScore);
  }
}
