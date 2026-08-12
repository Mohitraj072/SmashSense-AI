export type SportType = 'Badminton' | 'Tennis' | 'Squash' | 'Table Tennis' | 'Pickleball';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  sport: SportType;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  dominantHand: 'Right' | 'Left';
  playingStyle: 'Aggressive Attacker' | 'Defensive Counter-Attacker' | 'Control / Net Specialist' | 'All-Rounder';
  racketModel: string;
  stringTension: string;
  matchesAnalyzed: number;
  winRate: number;
  overallRating: number;
  weaknessScore: number; // 0-100 (lower is better)
}

export interface ShotDistribution {
  smash: number;
  drop: number;
  clear: number;
  drive: number;
  net: number;
  lift: number;
}

export interface KeyRally {
  timestamp: string;
  seconds: number;
  description: string;
  outcome: 'Won Point' | 'Lost Point' | 'Unforced Error';
  highlightType: 'Smash Winner' | 'Defensive Error' | 'Net Kill' | 'Tactical Mistake';
}

export interface Exercise {
  exercise: string;
  sets: string;
  reps: string;
}

export interface MatchAnalysis {
  id: string;
  sport?: SportType;
  title: string;
  date: string;
  opponentName: string;
  opponentStyle: string;
  tournament: string;
  category: 'Men\'s Singles' | 'Women\'s Singles' | 'Men\'s Doubles' | 'Women\'s Doubles' | 'Mixed Doubles' | string;
  durationMinutes: number;
  result: 'Win' | 'Loss';
  score: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  aiSummary: string;
  is_public?: boolean;
  sportDetails?: Record<string, string>;

  // Fitness Wearable Data Fields
  avg_heart_rate?: number;
  peak_heart_rate?: number;
  calories?: number;
  steps?: number;
  active_minutes?: number;
  fitness_score?: number;
  fitness_analysis?: string;

  // Exact keys requested by coach prompt
  player_weaknesses: string[];
  improvement_areas: string[];
  physical_recommendations: string;
  recommended_exercises: Exercise[];
  opponent_weaknesses: string[];
  opponent_strategy: string;
  overall_rating: {
    score: number;
    reasoning: string;
  };

  weaknesses: {
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    category: 'Footwork' | 'Shot Selection' | 'Stamina' | 'Defensive Technique' | 'Mental Focus';
  }[];
  improvementAreas: {
    area: string;
    drillName: string;
    drillDescription: string;
    priority: 'Urgent' | 'Recommended' | 'Secondary';
  }[];
  opponentPatterns: {
    pattern: string;
    triggerCondition: string;
    suggestedCounter: string;
    frequency: 'High' | 'Moderate' | 'Occasional';
  }[];
  shotDistribution: ShotDistribution;
  opponentShotDistribution: ShotDistribution;
  stats: {
    smashAccuracy: number; // percentage
    avgSmashSpeedKmH: number;
    unforcedErrors: number;
    winners: number;
    netControlPercentage: number;
    avgRallyShots: number;
    backhandSuccessRate: number;
  };
  courtHeatmap: {
    userPrimaryZone: string; // e.g. "Rear-Court Right"
    weakZone: string; // e.g. "Backhand Deep Corner"
    opponentExploitedZone: string;
  };
  keyRallies: KeyRally[];
}
