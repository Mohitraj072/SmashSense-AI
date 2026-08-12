import { MatchAnalysis, User } from './types';

export const INITIAL_USER: User = {
  id: 'usr_101',
  name: 'Alex Chen',
  email: 'alex.chen@smashsense.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  sport: 'Badminton',
  level: 'Advanced',
  dominantHand: 'Right',
  playingStyle: 'Aggressive Attacker',
  racketModel: 'Yonex Astrox 88D Pro',
  stringTension: '28 lbs (BG80)',
  matchesAnalyzed: 18,
  winRate: 72,
  overallRating: 86,
  weaknessScore: 28,
};

export const INITIAL_MATCHES: MatchAnalysis[] = [
  {
    id: 'match_01',
    sport: 'Badminton',
    title: 'Semi-Final vs Marcus Vance (State Championship)',
    date: '2026-08-02',
    opponentName: 'Marcus Vance',
    opponentStyle: 'Fast Counter-Attacker & Flat Drive Specialist',
    tournament: 'California State Open 2026',
    category: "Men's Singles",
    durationMinutes: 48,
    result: 'Loss',
    score: '18-21, 21-19, 16-21',
    avg_heart_rate: 162,
    peak_heart_rate: 188,
    calories: 540,
    steps: 4120,
    active_minutes: 48,
    fitness_score: 78,
    fitness_analysis: 'High cardiovascular intensity during Set 3 caused heart rate to linger above 180 BPM, contributing to late-match footwork fatigue.',
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
    sport: 'Badminton',
    title: 'Quarter-Final vs Vikram Patel',
    date: '2026-07-28',
    opponentName: 'Vikram Patel',
    opponentStyle: 'High-Lift Defensive Playmaker',
    tournament: 'California State Open 2026',
    category: "Men's Singles",
    durationMinutes: 36,
    result: 'Win',
    score: '21-14, 21-16',
    avg_heart_rate: 152,
    peak_heart_rate: 178,
    calories: 410,
    steps: 3250,
    active_minutes: 36,
    fitness_score: 88,
    fitness_analysis: 'Controlled heart rate zone throughout both sets allowed maximum power explosion on smashes without physical exhaustion.',
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
  {
    id: 'match_03',
    sport: 'Tennis',
    title: 'Final vs Carlos Alcaraz (Clay Court Masters)',
    date: '2026-08-05',
    opponentName: 'Carlos Alcaraz',
    opponentStyle: 'Aggressive Baseline Heavy Topspin',
    tournament: 'Pacific Masters 2026',
    category: "Men's Singles",
    durationMinutes: 112,
    result: 'Win',
    score: '6-4, 3-6, 7-5',
    avg_heart_rate: 158,
    peak_heart_rate: 184,
    calories: 1180,
    steps: 8900,
    active_minutes: 112,
    fitness_score: 92,
    fitness_analysis: 'High cardiovascular endurance on clay court allowed sustained 20+ shot baseline rallies into Set 3.',
    aiSummary: 'Tremendous 3-set clay court battle! High first serve percentage (71%) and dominant baseline forehand depth pushed Carlos back behind the baseline. Net approaches were clinical at 14/18 points won.',
    sportDetails: {
      surface: 'Clay',
      setFormat: 'Best of 3'
    },
    player_weaknesses: [
      'Second serve speed dropping under 145 km/h on breakpoint pressure',
      'Occasional late baseline footwork recovery against heavy topspin moonballs'
    ],
    improvement_areas: [
      'Kick serve placement drills targeting high backhand bounce',
      'Heavy topspin baseline footwork shuffles for clay recovery'
    ],
    physical_recommendations: 'Focus on lower body rotational power and hip flexor mobility for heavy clay court slide recovery.',
    recommended_exercises: [
      { exercise: 'Weighted Rotational Medicine Ball Slams', sets: '4', reps: '12 per side' },
      { exercise: 'Lateral Slide Band Walk Drills', sets: '3', reps: '20 steps' },
      { exercise: 'Second Serve Target Practice', sets: '5', reps: '20 serves' }
    ],
    opponent_weaknesses: [
      'Inconsistent drop shot execution when forced behind baseline',
      'Over-committing on cross-court forehand passing shots'
    ],
    opponent_strategy: 'Target Carlos’s high backhand with kick serves, then slice deep to delay his forehand setup.',
    overall_rating: {
      score: 9.2,
      reasoning: 'Masterful baseline tactics, clutch serving in Set 3, and exceptional net approach efficiency.'
    },
    weaknesses: [
      {
        title: 'Second Serve Speed Drop under Pressure',
        description: 'Averaged 138 km/h on second serves on break points compared to 158 km/h baseline.',
        impact: 'High',
        category: 'Shot Selection',
      }
    ],
    improvementAreas: [
      {
        area: 'First Serve Consistency',
        drillName: 'Target Precision Kick Serve Drill',
        drillDescription: 'Hit 50 kick serves into the outer T-box to maintain 70%+ first serve accuracy under pressure.',
        priority: 'Urgent',
      }
    ],
    opponentPatterns: [
      {
        pattern: 'Inside-Out Forehand on Short Returns',
        triggerCondition: 'When return lands shallow in the mid-court.',
        suggestedCounter: 'Deep slice return down the line to neutralize angle.',
        frequency: 'High',
      }
    ],
    shotDistribution: { smash: 15, drop: 12, clear: 25, drive: 28, net: 15, lift: 5 },
    opponentShotDistribution: { smash: 18, drop: 15, clear: 22, drive: 30, net: 10, lift: 5 },
    stats: {
      smashAccuracy: 88,
      avgSmashSpeedKmH: 185,
      unforcedErrors: 19,
      winners: 42,
      netControlPercentage: 78,
      avgRallyShots: 8.4,
      backhandSuccessRate: 74,
    },
    courtHeatmap: {
      userPrimaryZone: 'Deep Baseline Center & Net Area',
      weakZone: 'Wide Backhand Double Alley',
      opponentExploitedZone: 'Short Mid-Court',
    },
    keyRallies: [
      {
        timestamp: '45:10',
        seconds: 2710,
        description: '22-shot baseline rally ending in a forehand down-the-line winner.',
        outcome: 'Won Point',
        highlightType: 'Smash Winner',
      }
    ]
  },
  {
    id: 'match_04',
    sport: 'Squash',
    title: 'Semi-Final vs Paul Coll (Glass Court Open)',
    date: '2026-07-15',
    opponentName: 'Paul Coll',
    opponentStyle: 'High-Endurance T-Control & Rail Specialist',
    tournament: 'US Open Squash Championship 2026',
    category: "Men's Singles",
    durationMinutes: 62,
    result: 'Loss',
    score: '11-9, 8-11, 11-13, 9-11',
    avg_heart_rate: 168,
    peak_heart_rate: 192,
    calories: 720,
    steps: 5800,
    active_minutes: 62,
    fitness_score: 72,
    fitness_analysis: 'Peak heart rate reached 192 BPM in Game 3; sustained cardiovascular stress impaired front corner lunge recovery in Game 4.',
    aiSummary: 'Intense 4-game squash battle on glass court. Exceptional T-positioning in Game 1, but Paul’s relentless rail accuracy and nick drop shots gradually wore down court lunging efficiency in Game 3 & 4.',
    sportDetails: {
      ballType: 'Double Yellow Dot',
      courtType: 'Traditional Glass Wall'
    },
    player_weaknesses: [
      'Lunge recovery speed from front right nick corner in Game 4',
      'Over-using cross-court boasts when under backwall pressure'
    ],
    improvement_areas: [
      'Ghosting T-positioning drills to sharpen 4-corner footwork',
      'Tight straight rail length control target practice'
    ],
    physical_recommendations: 'Strengthen quad eccentric load capacity and ankle stability for deep front-court lunging.',
    recommended_exercises: [
      { exercise: 'Deep Lunge Hold with Iso-Metric Split', sets: '4', reps: '30 seconds per leg' },
      { exercise: 'Ghosting 4-Corner Court Drills', sets: '6', reps: '60 seconds' },
      { exercise: 'Boast-Rail Target Hitting', sets: '4', reps: '25 shots' }
    ],
    opponent_weaknesses: [
      'Reluctant to attack overhead volley boasts on high lob returns',
      'Weak backhand drop when forced off the T early'
    ],
    opponent_strategy: 'Maintain tight straight rails along the side walls to starve Paul of middle court volley chances.',
    overall_rating: {
      score: 8.4,
      reasoning: 'Terrific racket control and boast accuracy, but late game physical fatigue affected corner lunge recovery.'
    },
    weaknesses: [
      {
        title: 'Front Corner Lunge Recovery',
        description: 'Lunging too low without active core engagement delayed return to the T-zone.',
        impact: 'High',
        category: 'Footwork',
      }
    ],
    improvementAreas: [
      {
        area: 'T-Position Dominance',
        drillName: 'Ghosting T-Zone Sprint Drill',
        drillDescription: 'Rapid 4-corner ghosting focusing on immediate T-recentering.',
        priority: 'Urgent',
      }
    ],
    opponentPatterns: [
      {
        pattern: 'Straight Drop into Left Front Nick on Short Length',
        triggerCondition: 'Whenever return length lands in front of the half-court line.',
        suggestedCounter: 'Anticipate and hold T-position closer to front wall.',
        frequency: 'High',
      }
    ],
    shotDistribution: { smash: 10, drop: 28, clear: 30, drive: 20, net: 8, lift: 4 },
    opponentShotDistribution: { smash: 8, drop: 32, clear: 25, drive: 25, net: 6, lift: 4 },
    stats: {
      smashAccuracy: 80,
      avgSmashSpeedKmH: 190,
      unforcedErrors: 11,
      winners: 28,
      netControlPercentage: 65,
      avgRallyShots: 14.2,
      backhandSuccessRate: 70,
    },
    courtHeatmap: {
      userPrimaryZone: 'T-Position & Back Left Wall',
      weakZone: 'Front Right Nick Corner',
      opponentExploitedZone: 'Back Right Wall Pocket',
    },
    keyRallies: [
      {
        timestamp: '18:30',
        seconds: 1110,
        description: '38-shot grinding rally ending in a rolling nick drop winner.',
        outcome: 'Won Point',
        highlightType: 'Net Kill',
      }
    ]
  },
  {
    id: 'match_05',
    sport: 'Table Tennis',
    title: 'Final vs Fan Zhendong (World Tour)',
    date: '2026-06-20',
    opponentName: 'Fan Zhendong',
    opponentStyle: 'Power Third-Ball Heavy Spin Looper',
    tournament: 'WTT Grand Smash 2026',
    category: "Men's Singles",
    durationMinutes: 42,
    result: 'Win',
    score: '11-8, 9-11, 11-7, 11-9',
    avg_heart_rate: 148,
    peak_heart_rate: 172,
    calories: 380,
    steps: 2900,
    active_minutes: 42,
    fitness_score: 94,
    fitness_analysis: 'Optimal cardiovascular composure maintained high hand-eye coordination for close-table counter-loops.',
    aiSummary: 'Spectacular 4-game table tennis triumph! Your reverse pendulum serve variations and close-table forehand counter-loops suppressed Fan Zhendong’s explosive third-ball attacks.',
    sportDetails: {
      rubberType: 'Inverted High-Tension (Tenergy 05)',
      playingStyle: 'Attacker / Looper'
    },
    player_weaknesses: [
      'Mid-distance backhand push consistency when forced 2 meters back',
      'Occasional high pop-up returns on heavy underspin short serves'
    ],
    improvement_areas: [
      'Short banana flip service return drills',
      'Mid-distance to close-table transition footwork shuffles'
    ],
    physical_recommendations: 'Enhance wrist snap acceleration and fast lateral footwork shuffle speed.',
    recommended_exercises: [
      { exercise: 'Multi-Ball Forehand Counter-Loop Drills', sets: '5', reps: '30 balls' },
      { exercise: 'Side-to-Side Table Shuffle Footwork', sets: '4', reps: '45 seconds' },
      { exercise: 'Wrist Snap Resistance Band Pulls', sets: '3', reps: '20 reps' }
    ],
    opponent_weaknesses: [
      'Slight hesitation on deep fast side-spin serves to middle crossover zone',
      'Vulnerable to wide forehand hook loops when pinned backhand'
    ],
    opponent_strategy: 'Serve short to Fan Zhendong’s forehand, then counter-loop aggressively into his middle crossover body position.',
    overall_rating: {
      score: 9.5,
      reasoning: 'World-class serve variation, lightning counter-spin reaction, and superb mental composure under pressure.'
    },
    weaknesses: [
      {
        title: 'Mid-Distance Backhand Push Stability',
        description: '2 missed pushes when stepped back from the table edge.',
        impact: 'Medium',
        category: 'Defensive Technique',
      }
    ],
    improvementAreas: [
      {
        area: 'Banana Flip Return',
        drillName: 'Short Underspin Banana Flip Drill',
        drillDescription: 'Practice wrist flick over the table against short heavy backspin serves.',
        priority: 'Recommended',
      }
    ],
    opponentPatterns: [
      {
        pattern: 'Third-Ball Power Forehand Loop down the Line',
        triggerCondition: 'When return is pushed long into his backhand.',
        suggestedCounter: 'Block early to wide forehand corner to catch him off guard.',
        frequency: 'High',
      }
    ],
    shotDistribution: { smash: 30, drop: 15, clear: 10, drive: 35, net: 8, lift: 2 },
    opponentShotDistribution: { smash: 28, drop: 12, clear: 15, drive: 38, net: 5, lift: 2 },
    stats: {
      smashAccuracy: 92,
      avgSmashSpeedKmH: 125,
      unforcedErrors: 6,
      winners: 38,
      netControlPercentage: 82,
      avgRallyShots: 7.8,
      backhandSuccessRate: 85,
    },
    courtHeatmap: {
      userPrimaryZone: 'Close-Table Center & Forehand Wing',
      weakZone: 'Mid-Distance Backhand Corner',
      opponentExploitedZone: 'Body Crossover Zone',
    },
    keyRallies: [
      {
        timestamp: '12:05',
        seconds: 725,
        description: '16-shot high-speed counter-loop exchange ending in a forehand smash winner.',
        outcome: 'Won Point',
        highlightType: 'Smash Winner',
      }
    ]
  },
  {
    id: 'match_06',
    sport: 'Pickleball',
    title: 'Gold Medal Match vs Ben Johns (PPA Tour)',
    date: '2026-08-10',
    opponentName: 'Ben Johns',
    opponentStyle: 'Dink Specialist & Kitchen Line Control Master',
    tournament: 'PPA National Championship 2026',
    category: "Men's Singles",
    durationMinutes: 38,
    result: 'Win',
    score: '11-7, 8-11, 11-9',
    avg_heart_rate: 142,
    peak_heart_rate: 166,
    calories: 350,
    steps: 2600,
    active_minutes: 38,
    fitness_score: 90,
    fitness_analysis: 'Steady heart rate recovery during soft kitchen dink exchanges preserved mental patience for key speed-ups.',
    aiSummary: 'Clutch Pickleball victory at the Kitchen line! Third-shot drops were pinpoint at 84% accuracy, neutralising Ben’s speed-up attacks. Cross-court dink battles proved decisive in Game 3.',
    sportDetails: {
      ballType: 'Outdoor 40-Hole',
      paddleType: 'Raw Carbon Fiber 16mm'
    },
    player_weaknesses: [
      'Pop-up errors when rushed on low backhand kitchen dinks',
      'Occasional early speed-up attempts off low-bouncing dinks'
    ],
    improvement_areas: [
      'Kitchen dink patience and soft wrist control drills',
      'Third-shot drop transition to kitchen line footwork'
    ],
    physical_recommendations: 'Strengthen lateral hip stability and forearm soft-touch control for kitchen line firefights.',
    recommended_exercises: [
      { exercise: 'Kitchen Dink Target Control Drills', sets: '5', reps: '50 shots' },
      { exercise: 'Third-Shot Drop Baseline-to-Kitchen Shuffles', sets: '4', reps: '15 drops' },
      { exercise: 'Fast Hands Volley Reset Drills', sets: '4', reps: '30 seconds' }
    ],
    opponent_weaknesses: [
      'Vulnerable to body speed-ups when forced onto his non-dominant hip',
      'Over-commits on ATP (Around-The-Post) attempts when stretched wide'
    ],
    opponent_strategy: 'Sustain patient cross-court dink rallies until Ben pops up, then speed up directly at his right hip.',
    overall_rating: {
      score: 9.1,
      reasoning: 'Superb soft-game control, high third-shot drop conversion, and disciplined kitchen line positioning.'
    },
    weaknesses: [
      {
        title: 'Backhand Kitchen Pop-Up Errors',
        description: '2 dinks popped up above net tape when reaching off-balance.',
        impact: 'Medium',
        category: 'Defensive Technique',
      }
    ],
    improvementAreas: [
      {
        area: 'Third Shot Drop Precision',
        drillName: 'Kitchen Line Soft Touch Drill',
        drillDescription: 'Practice dropping balls smoothly into the kitchen zone from baseline.',
        priority: 'Urgent',
      }
    ],
    opponentPatterns: [
      {
        pattern: 'Speed-Up down the Line on Short Dinks',
        triggerCondition: 'When dink bounces high near the kitchen line.',
        suggestedCounter: 'Keep paddle high at chest level for rapid volley block.',
        frequency: 'High',
      }
    ],
    shotDistribution: { smash: 18, drop: 35, clear: 15, drive: 22, net: 8, lift: 2 },
    opponentShotDistribution: { smash: 15, drop: 38, clear: 12, drive: 25, net: 8, lift: 2 },
    stats: {
      smashAccuracy: 88,
      avgSmashSpeedKmH: 82,
      unforcedErrors: 7,
      winners: 26,
      netControlPercentage: 85,
      avgRallyShots: 11.5,
      backhandSuccessRate: 76,
    },
    courtHeatmap: {
      userPrimaryZone: 'Kitchen Line Center & Left Dink Corner',
      weakZone: 'Right Baseline Corner',
      opponentExploitedZone: 'Left Hip Body Zone',
    },
    keyRallies: [
      {
        timestamp: '14:20',
        seconds: 860,
        description: '28-shot kitchen dink battle ending in a body speed-up winner.',
        outcome: 'Won Point',
        highlightType: 'Net Kill',
      }
    ]
  }
];
