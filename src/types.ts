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
  userId?: string;
  user_id?: string;
  points?: string;
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
  youtubeUrl?: string;
  youtube_url?: string;
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

export interface CuratedMatch {
  id: string;
  title: string;
  tournament: string;
  year: number;
  duration: string;
  youtubeUrl: string;
  opponent: string;
  outcome: string;
  keyLearning: string;
  thumbnailUrl: string;
}

export interface ProPlayerAnalysis {
  player_name: string;
  signature_moves: string[];
  movement_style: string;
  attack_patterns: string;
  defensive_style: string;
  mental_game: string;
  lessons_for_amateurs: string[];
  training_drills: string[];
  analyzed_at?: string;
  youtube_url?: string;
  video_title?: string;
}

export interface ProPlayer {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  playingStyle: 'Aggressive Attacker' | 'All-Court Player' | 'Defensive Specialist' | 'Net Dominator' | string;
  styleSubtitle: string;
  worldRanking: string;
  avatar: string;
  bannerImage: string;
  dominantHand: 'Right' | 'Left';
  height: string;
  careerTitles: number;
  racket: string;
  bio: string;
  stats: {
    smashSpeedKmH: number;
    defenseRating: number; // 0-100
    deceptiveShotRating: number; // 0-100
    staminaRating: number; // 0-100
    netAccuracy: number; // 0-100
    winRate: number; // percentage
    unforcedErrorsPerGame: number;
  };
  recommendedMatches: CuratedMatch[];
  defaultAnalysis: ProPlayerAnalysis;
}

export interface ProComparisonGap {
  gap: string;
  impact: 'Critical' | 'High' | 'Moderate';
  technical_detail: string;
  amateur_metric: string;
  pro_benchmark: string;
}

export interface RoadmapWeek {
  week: string;
  title: string;
  focus_drill: string;
  target_outcome: string;
}

export interface ProComparisonResult {
  player_name: string;
  pro_player_id: string;
  pro_player_name: string;
  pro_player_country: string;
  pro_player_flag: string;
  pro_player_style: string;
  pro_player_avatar: string;
  similarities: string[];
  gaps: ProComparisonGap[];
  improvement_roadmap: RoadmapWeek[];
  encouragement: string;
  player_stats: {
    smash_speed: number;
    win_rate: number;
    net_control: number;
    unforced_errors: number;
    stamina_score: number;
    defense_rating: number;
  };
  pro_stats: {
    smash_speed: number;
    win_rate: number;
    net_control: number;
    unforced_errors: number;
    stamina_score: number;
    defense_rating: number;
  };
}

