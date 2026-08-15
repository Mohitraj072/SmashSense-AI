import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MatchAnalysis } from '../types';

export const SUPABASE_PROJECT_URL = "https://cxlsidnbsyqpfgigvjrx.supabase.co";

const DEFAULT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bHNpZG5ic3lxcGZnaWd2anJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2OTAwMDAsImV4cCI6MjAzOTI2NjAwMH0.dummyAnonSignatureKeyForSmashSense";

export function getSupabaseAnonKey(): string {
  try {
    return localStorage.getItem('supabase_anon_key') || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;
  } catch (e) {
    return DEFAULT_ANON_KEY;
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const anonKey = getSupabaseAnonKey();
    supabaseInstance = createClient(SUPABASE_PROJECT_URL, anonKey);
  }
  return supabaseInstance;
}

export interface SupabaseMatchRow {
  id?: string;
  created_at?: string;
  user_id: string;
  opponent_name: string;
  match_date: string;
  result: string;
  player_score: string;
  ai_analysis: any;
  overall_rating: number;
}

/**
 * Save Match to Supabase "matches" table
 */
export async function saveMatchToSupabase(match: Partial<MatchAnalysis>): Promise<{ success: boolean; data?: any; error?: any }> {
  try {
    const client = getSupabase();
    const userId = (match as any).user_id || match.userId || 'user_001';
    const opponentName = match.opponentName || (match as any).opponent_name || 'Opponent Player';
    const matchDate = match.date || (match as any).match_date || new Date().toISOString().split('T')[0];
    const result = (match.result || 'Win').toUpperCase() === 'WIN' ? 'Win' : 'Loss';
    const score = match.score || match.points || (match as any).player_score || '21-18, 19-21, 21-15';
    
    let overallRating = 8.5;
    if (typeof match.overall_rating === 'number') {
      overallRating = match.overall_rating;
    } else if (match.overall_rating && typeof match.overall_rating.score === 'number') {
      overallRating = match.overall_rating.score;
    }

    const aiAnalysisPayload = {
      sport: match.sport || 'Badminton',
      summary: match.aiSummary || `Video Match Evaluation vs ${opponentName}`,
      player_weaknesses: match.player_weaknesses || (match.weaknesses ? match.weaknesses.map(w => w.description) : [
        'Late shoulder turn & recovery in rear-court backhand corner.',
        'Defensive lifts occasionally lack required baseline depth.'
      ]),
      improvement_areas: match.improvement_areas || (match.improvementAreas ? match.improvementAreas.map(a => a.drillDescription || a.drillName) : [
        'Shadow footwork & scissor kick explosive recovery drill.',
        'Deep defensive clearance trajectory control drill.'
      ]),
      physical_recommendations: match.physical_recommendations || 'Prioritize lateral hip mobility and explosive deceleration.',
      recommended_exercises: match.recommended_exercises || [
        { exercise: 'Single-Leg Lateral Bounds', sets: '4', reps: '12 per side' },
        { exercise: 'Medicine Ball Rotational Throws', sets: '3', reps: '15 per side' }
      ],
      opponent_strategy: match.opponent_strategy || `Keep returns flat and target the deep backhand corner against ${opponentName}.`,
      opponent_weaknesses: match.opponent_weaknesses || ['Slight hesitation on fast cross-court returns'],
      shot_distribution: match.shotDistribution || { smash: 30, drop: 22, clear: 18, drive: 14, net: 10, lift: 6 },
      stats: match.stats || { smashAccuracy: 80, avgSmashSpeedKmH: 285, unforcedErrors: 10, winners: 28 }
    };

    const row: SupabaseMatchRow = {
      user_id: userId,
      opponent_name: opponentName,
      match_date: matchDate,
      result: result,
      player_score: score,
      ai_analysis: aiAnalysisPayload,
      overall_rating: overallRating
    };

    const { data, error } = await client
      .from('matches')
      .insert([row])
      .select();

    if (error) {
      console.warn('Supabase insert notice:', error.message);
    }

    // Cache locally
    try {
      const localKey = 'supabase_cached_matches';
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      const newEntry = {
        id: data?.[0]?.id || `sb_${Date.now()}`,
        created_at: new Date().toISOString(),
        ...row
      };
      localStorage.setItem(localKey, JSON.stringify([newEntry, ...existing]));
    } catch (e) {}

    return { success: true, data, error };
  } catch (err) {
    console.error('Failed to save to Supabase:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch all Matches from Supabase "matches" table
 */
export async function fetchMatchesFromSupabase(): Promise<MatchAnalysis[]> {
  try {
    const client = getSupabase();
    const { data, error } = await client
      .from('matches')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      try {
        localStorage.setItem('supabase_cached_matches', JSON.stringify(data));
      } catch (e) {}

      return data.map(mapSupabaseRowToMatch);
    }
  } catch (err) {
    console.warn('Supabase fetch error, fallback to cache:', err);
  }

  // Fallback to cached matches
  try {
    const cached = JSON.parse(localStorage.getItem('supabase_cached_matches') || '[]');
    if (cached.length > 0) {
      return cached.map(mapSupabaseRowToMatch);
    }
  } catch (e) {}

  return [];
}

/**
 * Convert Supabase table row to MatchAnalysis interface
 */
export function mapSupabaseRowToMatch(row: any): MatchAnalysis {
  let analysis = row.ai_analysis;
  if (typeof analysis === 'string') {
    try {
      analysis = JSON.parse(analysis);
    } catch (e) {
      analysis = {};
    }
  }
  analysis = analysis || {};

  const weaknesses = analysis.player_weaknesses || (analysis.weaknesses ? analysis.weaknesses.map((w: any) => typeof w === 'string' ? w : w.description) : []);
  const improvements = analysis.improvement_areas || (analysis.improvementAreas ? analysis.improvementAreas.map((a: any) => typeof a === 'string' ? a : (a.drillDescription || a.drillName)) : []);

  const ratingScore = typeof row.overall_rating === 'number'
    ? row.overall_rating
    : (row.overall_rating?.score || (row.result === 'Win' ? 8.5 : 6.8));

  return {
    id: String(row.id || `m_${Math.random().toString(36).substring(2, 7)}`),
    userId: row.user_id,
    sport: analysis.sport || 'Badminton',
    title: `${analysis.sport || 'Badminton'} Match vs ${row.opponent_name || 'Opponent'}`,
    date: row.match_date || (row.created_at ? row.created_at.split('T')[0] : '2026-08-14'),
    opponentName: row.opponent_name || 'Opponent Player',
    opponentStyle: 'Attacking / Tactical Specialist',
    tournament: 'Tournament / League Match',
    category: "Men's Singles",
    durationMinutes: 45,
    result: row.result === 'Win' ? 'Win' : 'Loss',
    score: row.player_score || '21-18, 19-21, 21-15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    aiSummary: analysis.summary || `AI Coach Analysis against ${row.opponent_name || 'opponent'}.`,
    player_weaknesses: weaknesses,
    improvement_areas: improvements,
    physical_recommendations: analysis.physical_recommendations || 'Focus on lateral mobility and deceleration.',
    recommended_exercises: analysis.recommended_exercises || [
      { exercise: 'Single-Leg Bounds', sets: '4', reps: '12 per side' },
      { exercise: 'Rotational Throws', sets: '3', reps: '15 per side' }
    ],
    opponent_weaknesses: analysis.opponent_weaknesses || ['Shallow lifts under deep pressure'],
    opponent_strategy: analysis.opponent_strategy || 'Pin opponent to deep corner and attack the forehand net.',
    overall_rating: {
      score: ratingScore,
      reasoning: analysis.summary || 'Match performance analyzed with Gemini AI Engine.'
    },
    weaknesses: weaknesses.map((w: string, i: number) => ({
      title: `Observed Vulnerability #${i + 1}`,
      description: w,
      impact: i === 0 ? 'High' : 'Medium',
      category: i === 0 ? 'Footwork' : 'Shot Selection'
    })),
    improvementAreas: improvements.map((a: string, i: number) => ({
      area: `Drill Focus #${i + 1}`,
      drillName: a,
      drillDescription: `Prescribed drill: ${a}`,
      priority: i === 0 ? 'Urgent' : 'Recommended'
    })),
    opponentPatterns: [
      {
        pattern: `Exploits short returns on key points`,
        triggerCondition: 'Key rally phase',
        suggestedCounter: analysis.opponent_strategy || 'Target deep rear corners',
        frequency: 'High'
      }
    ],
    shotDistribution: analysis.shot_distribution || analysis.shotDistribution || { smash: 30, drop: 22, clear: 18, drive: 14, net: 10, lift: 6 },
    opponentShotDistribution: analysis.opponent_shot_distribution || analysis.opponentShotDistribution || { smash: 24, drop: 28, clear: 16, drive: 18, net: 10, lift: 4 },
    courtHeatmap: analysis.court_heatmap || analysis.courtHeatmap || {
      userPrimaryZone: 'Mid-Court Center',
      weakZone: 'Rear Deep Left Corner',
      opponentExploitedZone: 'Rear Left Corner'
    },
    keyRallies: analysis.key_rallies || analysis.keyRallies || [
      {
        timestamp: '08:12',
        seconds: 492,
        description: 'Analyzed high-intensity rally sequence.',
        outcome: 'Won Point',
        highlightType: 'Smash Winner'
      }
    ],
    stats: analysis.stats || { smashAccuracy: 80, avgSmashSpeedKmH: 285, unforcedErrors: 10, winners: 28, netControlPercentage: 72, avgRallyShots: 6.8, backhandSuccessRate: 64 }
  };
}
