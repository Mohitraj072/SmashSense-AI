import { MatchAnalysis, User } from './types';

export const INITIAL_USER: User = {
  id: 'usr_101',
  name: 'Alex Chen',
  email: 'alex.chen@badmintonai.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: 'Advanced',
  dominantHand: 'Right',
  playingStyle: 'Aggressive Attacker',
  racketModel: 'Yonex Astrox 88D Pro',
  stringTension: '28 lbs (BG80)',
  matchesAnalyzed: 14,
  winRate: 68,
  overallRating: 84,
  weaknessScore: 32,
};

export const INITIAL_MATCHES: MatchAnalysis[] = [
  {
    id: 'match_01',
    title: 'Semi-Final vs Marcus Vance (State Championship)',
    date: '2026-08-02',
    opponentName: 'Marcus Vance',
    opponentStyle: 'Fast Counter-Attacker & Flat Drive Specialist',
    tournament: 'California State Open 2026',
    category: "Men's Singles",
    durationMinutes: 48,
    result: 'Loss',
    score: '18-21, 21-19, 16-21',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    aiSummary: 'High-intensity 3-set thriller. You dominated the front court in Set 2, but Marcus exploited your deep backhand corner in Set 3 when your stamina dipped, forcing 7 late unforced errors on rear-court lifts.',
    player_weaknesses: [
      'Late footwork turn when moving backward to the deep backhand corner',
      'Over-reliance on high-risk flat drives when fatigue sets in during Set 3',
      'Insufficient margin above the net tape on sliced drop shots under pressure',
      'Slow split-step re-centering after hitting defensive rear clears'
    ],
    improvement_areas: [
      'Shadow footwork + scissor kick drill for fast rear corner recovery',
      'Interval multi-shuttle feeding to boost late-game anaerobic stamina',
      'Precision drop shot drills focusing on high racquet point contact'
    ],
    physical_recommendations: 'Focus on lateral hip mobility, core rotational stability, and high-intensity interval training (HIIT) to maintain footwork explosiveness in 3-set matches.',
    recommended_exercises: [
      { exercise: 'Single-Leg Lateral Bounds', sets: '4', reps: '12 per side' },
      { exercise: 'Medicine Ball Rotational Throws', sets: '3', reps: '15 per side' },
      { exercise: 'Shadow Court Split-Step Shuttles', sets: '5', reps: '45 seconds work / 15s rest' },
      { exercise: 'Agility Ladder I-Out Crosses', sets: '4', reps: '30 seconds' }
    ],
    opponent_weaknesses: [
      'Weak defensive return when forced onto deep forehand corner',
      'Predictable lift trajectories when rushed at the front net',
      'Struggles against steep downward jump smashes down the line'
    ],
    opponent_strategy: 'Pin Marcus to his deep forehand corner with high offensive clears, then immediately follow up with tight spinning net drops to force weak lifts.',
    overall_rating: {
      score: 7,
      reasoning: 'Strong offensive firepower and net dominance in Set 2, but footwork degradation on the backhand side in Set 3 cost vital late points.'
    },
    weaknesses: [
      {
        title: 'Late Footwork to Deep Backhand Corner',
        description: 'When under pressure, you take 3 heavy steps instead of a smooth scissor-kick rotation, causing off-balance weak lifts.',
        impact: 'High',
        category: 'Footwork',
      },
      {
        title: 'Over-relying on Flat Drives in Set 3',
        description: 'Attempting flat drives against Marcus when fatigue set in played directly into his fast counter-attack style.',
        impact: 'Medium',
        category: 'Shot Selection',
      },
      {
        title: 'Drop Shot Net Height Margin',
        description: '3 sliced drop shots hit the tape in key points due to dropping your racquet head too low before contact.',
        impact: 'Medium',
        category: 'Defensive Technique',
      },
    ],
    improvementAreas: [
      {
        area: 'Backhand Corner Recovery',
        drillName: 'Shadow Footwork + Scissor Kick Drill',
        drillDescription: 'Perform 4 sets of 15 rapid diagonal corner shadow movements emphasizing hip rotation and immediate recovery to center T.',
        priority: 'Urgent',
      },
      {
        area: 'Pacing & Fatigue Control',
        drillName: 'Interval Multi-Shuttle Feeding',
        drillDescription: '20-shuttle continuous rally drills with 30s rest intervals to build high-end anaerobic endurance for Set 3.',
        priority: 'Recommended',
      },
    ],
    opponentPatterns: [
      {
        pattern: 'High Serve to Backhand Corner on Crucial Points',
        triggerCondition: 'When score is past 18 points or at game point.',
        suggestedCounter: 'Hold position slightly deeper on backhand side or use dynamic reverse slice drop instead of high clear.',
        frequency: 'High',
      },
      {
        pattern: 'Immediate Cross-Court Net Drop after Smashes',
        triggerCondition: 'After you return a straight smash with a soft drive.',
        suggestedCounter: 'Anticipate net push with early racquet preparation and flick clear to his open forehand.',
        frequency: 'High',
      },
      {
        pattern: 'Fake Clear into Tight Sliced Drop',
        triggerCondition: 'When standing near mid-court right.',
        suggestedCounter: 'Watch shoulder rotation and don’t commit forward until shuttle impact.',
        frequency: 'Moderate',
      },
    ],
    shotDistribution: {
      smash: 28,
      drop: 22,
      clear: 18,
      drive: 14,
      net: 12,
      lift: 6,
    },
    opponentShotDistribution: {
      smash: 22,
      drop: 30,
      clear: 15,
      drive: 18,
      net: 10,
      lift: 5,
    },
    stats: {
      smashAccuracy: 74,
      avgSmashSpeedKmH: 282,
      unforcedErrors: 16,
      winners: 24,
      netControlPercentage: 58,
      avgRallyShots: 8.4,
      backhandSuccessRate: 42,
    },
    courtHeatmap: {
      userPrimaryZone: 'Mid-Court Right',
      weakZone: 'Rear-Court Deep Left (Backhand)',
      opponentExploitedZone: 'Rear-Court Deep Left',
    },
    keyRallies: [
      {
        timestamp: '11:42',
        seconds: 702,
        description: '24-shot rally ending in a 295 km/h jump smash down the line winner.',
        outcome: 'Won Point',
        highlightType: 'Smash Winner',
      },
      {
        timestamp: '28:15',
        seconds: 1695,
        description: 'Tense net duel leading to a tight spinning net tumble forced error by opponent.',
        outcome: 'Won Point',
        highlightType: 'Net Kill',
      },
      {
        timestamp: '42:08',
        seconds: 2528,
        description: 'Backhand clear hit wide out of bounds after late footwork recovery.',
        outcome: 'Unforced Error',
        highlightType: 'Defensive Error',
      },
    ],
  },
  {
    id: 'match_02',
    title: 'Quarter-Final vs Vikram Patel',
    date: '2026-07-28',
    opponentName: 'Vikram Patel',
    opponentStyle: 'High-Lift Defensive Playmaker',
    tournament: 'California State Open 2026',
    category: "Men's Singles",
    durationMinutes: 36,
    result: 'Win',
    score: '21-14, 21-16',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521537634581-0ddea2efa248?w=600&auto=format&fit=crop&q=80',
    aiSummary: 'Convincing straight-sets victory! Your steep steep jump smashes completely broke Vikram’s defensive high clears. Net dominance was outstanding at 72%.',
    player_weaknesses: [
      'Premature net rush on loose lifts leading to overhead flick vulnerability',
      'Occasional early commitment on defense before observing opponent strike point'
    ],
    improvement_areas: [
      'Hold-and-flick net drill to increase deception at front court',
      'Defensive reaction drills against sharp downward stick smashes'
    ],
    physical_recommendations: 'Maintain leg power and ankle stability for steep jump smashes and rapid net landings.',
    recommended_exercises: [
      { exercise: 'Box Jumps with Soft Landing', sets: '4', reps: '10 reps' },
      { exercise: 'Calf Raises & Ankle Hops', sets: '3', reps: '20 reps' },
      { exercise: 'Core Planks with Hip Dip', sets: '3', reps: '45 seconds' }
    ],
    opponent_weaknesses: [
      'Lifts exclusively to forehand side when placed under net pressure',
      'Slow court coverage against fast diagonal cross-smashes'
    ],
    opponent_strategy: 'Force Vikram into net battles with tight spinning drops, then jump smash down his forehand line when he gives high lifts.',
    overall_rating: {
      score: 9,
      reasoning: 'Exceptional tactical execution and smash power control throughout both sets with minimal unforced errors.'
    },
    weaknesses: [
      {
        title: 'Premature Net Rush on Loose Lifts',
        description: 'Rushing in twice resulted in getting flicked overhead.',
        impact: 'Low',
        category: 'Shot Selection',
      },
    ],
    improvementAreas: [
      {
        area: 'Net Deception',
        drillName: 'Hold-and-Flick Net Drill',
        drillDescription: 'Practice holding racquet at net tape before last-second push to disorient defenders.',
        priority: 'Secondary',
      },
    ],
    opponentPatterns: [
      {
        pattern: 'Lifts exclusively to forehand side when trailing',
        triggerCondition: 'When Vikram is forced off-balance on net shots.',
        suggestedCounter: 'Set up early jump smash on forehand side.',
        frequency: 'High',
      },
    ],
    shotDistribution: {
      smash: 35,
      drop: 18,
      clear: 12,
      drive: 10,
      net: 20,
      lift: 5,
    },
    opponentShotDistribution: {
      smash: 12,
      drop: 20,
      clear: 35,
      drive: 8,
      net: 15,
      lift: 10,
    },
    stats: {
      smashAccuracy: 86,
      avgSmashSpeedKmH: 298,
      unforcedErrors: 8,
      winners: 31,
      netControlPercentage: 72,
      avgRallyShots: 6.2,
      backhandSuccessRate: 68,
    },
    courtHeatmap: {
      userPrimaryZone: 'Front Net & Mid-Court Smash Zone',
      weakZone: 'Far Forehand Corner',
      opponentExploitedZone: 'Rear-Court Center',
    },
    keyRallies: [
      {
        timestamp: '08:10',
        seconds: 490,
        description: 'Steep cross smash following a tight spinning net drop.',
        outcome: 'Won Point',
        highlightType: 'Smash Winner',
      },
    ],
  },
];
