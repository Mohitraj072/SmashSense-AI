import { ProPlayer } from '../types';

export const PRO_PLAYERS: ProPlayer[] = [
  {
    id: 'viktor-axelsen',
    name: 'Viktor Axelsen',
    country: 'Denmark',
    countryCode: 'DK',
    flag: '🇩🇰',
    playingStyle: 'Aggressive Attacker',
    styleSubtitle: 'High-Elevation Steep Power Dominator',
    worldRanking: 'World #1 (2x Olympic Gold)',
    avatar: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '194 cm (6 ft 4 in)',
    careerTitles: 34,
    racket: 'Yonex Astrox 100ZZ (31 lbs)',
    bio: 'Two-time Olympic Gold Medalist (Tokyo 2020, Paris 2024) and 2x World Champion. Renowned for unreturnable steep smashes, imposing wingspan reach, and clinical front-to-back court coverage.',
    stats: {
      smashSpeedKmH: 418,
      defenseRating: 94,
      deceptiveShotRating: 88,
      staminaRating: 98,
      netAccuracy: 93,
      winRate: 89,
      unforcedErrorsPerGame: 3.4
    },
    recommendedMatches: [
      {
        id: 'va-match-1',
        title: '2024 Paris Olympics Gold Medal Final',
        tournament: 'Paris Olympic Games 2024',
        year: 2024,
        duration: '52 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'Kunlavut Vitidsarn (Thailand)',
        outcome: 'Won (21-11, 21-11)',
        keyLearning: 'Steep downward smash angles on flat lifts and rapid front-court cutoff transitions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'va-match-2',
        title: '2022 BWF World Championships Final',
        tournament: 'BWF World Championships Tokyo',
        year: 2022,
        duration: '50 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Kunlavut Vitidsarn (Thailand)',
        outcome: 'Won (21-5, 21-16)',
        keyLearning: 'First 3 shots dominance: lethal service returns pinning the opponent deep into backhand corners.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'va-match-3',
        title: '2023 All England Open Final',
        tournament: 'All England Open Badminton Championships',
        year: 2023,
        duration: '64 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Shi Yuqi (China)',
        outcome: 'Won (21-14, 21-17)',
        keyLearning: 'Patience in neutral baseline exchanges before launching the 400+ km/h cross-court kill.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Viktor Axelsen',
      signature_moves: [
        'High-Point Steep Jump Smash (400+ km/h) targeted at opponent body/hip seam',
        'Cross-Court Fast Slice Drop from rear backhand corner',
        'Two-Step Scissor Kick recovery into center "T" positioning',
        'Aggressive Flat Push on low service returns right at bodyline',
        'Stick Smash punch kill to intercept defensive floaters'
      ],
      movement_style: 'Long stride efficiency utilizing high reach and minimal step counts. Glides with 2-step corner lunges rather than hurried 3-step footwork, conserving peak energy for explosive jumps.',
      attack_patterns: 'Heavy offensive pressure starting from high neutral clears. Forces shallow opponent returns with deceptive fast drops, then immediately punishes with steep downward vertical smashes.',
      defensive_style: 'Uses immense wingspan for wall-like block redirects. Defends deep smashes with tight cross-court net tumble blocks that strip attacking momentum from opponents.',
      mental_game: 'Immovable tactical discipline and icy composure under pressure. Maintains aggressive tempo when trailing and rarely commits back-to-back unforced errors.',
      lessons_for_amateurs: [
        'Hit the shuttle at the highest vertical point possible to create unreturnable downward angles',
        'Master the first-step split jump timing to react 0.2s faster to opponent shots',
        'Avoid guessing opponent smashes; hold base position and use forearm pronation for block defense',
        'Push service returns deep to rear corners rather than always playing safe high lifts',
        'Develop physical core stability to execute heavy smashes without losing balance'
      ],
      training_drills: [
        '2-Corner High-Point Jump Smash & Net Intercept Transition Drill (6 sets x 20 reps)',
        'Footwork Shadow Glides: 6-Corner Court Agility with weighted vest (5 mins x 4 rounds)',
        'Rapid Service Return Pushes against multi-shuttle feeder (100 shuttles x 3 sets)',
        'Cross-Court Net Tumble Block Defense vs heavy smash machine (15 mins continuous)',
        'Core & Rotational Power: Russian Twists & Medicine Ball Slams (4 sets x 25 reps)'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Viktor Axelsen - Olympic Championship Tactical Biomechanics'
    }
  },
  {
    id: 'kento-momota',
    name: 'Kento Momota',
    country: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    playingStyle: 'Defensive Specialist',
    styleSubtitle: 'Precision Control & Master of Neutralization',
    worldRanking: 'Former World #1 (2x World Champion)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Left',
    height: '175 cm (5 ft 9 in)',
    careerTitles: 28,
    racket: 'Yonex Astrox 99 Pro (32 lbs)',
    bio: 'Historic world record holder for 11 international titles in a single season. Renowned for impenetrable defense, flawless left-handed net deception, and clinical endurance that dismantled top power smashers.',
    stats: {
      smashSpeedKmH: 375,
      defenseRating: 99,
      deceptiveShotRating: 97,
      staminaRating: 98,
      netAccuracy: 99,
      winRate: 91,
      unforcedErrorsPerGame: 1.8
    },
    recommendedMatches: [
      {
        id: 'km-match-1',
        title: '2019 BWF World Tour Finals Epic 3-Game Final',
        tournament: 'BWF World Tour Finals Guangzhou',
        year: 2019,
        duration: '87 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'Anthony Sinisuka Ginting (Indonesia)',
        outcome: 'Won (17-21, 21-17, 21-14)',
        keyLearning: 'Neutralizing high-speed attacks through ultra-tight net spinning drops and relentless baseline consistency.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'km-match-2',
        title: '2018 BWF World Championships Final',
        tournament: 'World Championships Nanjing',
        year: 2018,
        duration: '49 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Shi Yuqi (China)',
        outcome: 'Won (21-11, 21-13)',
        keyLearning: 'Laser-accurate left-handed cross court lifts right onto the doubles service back line.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'km-match-3',
        title: '2019 All England Open Championship Final',
        tournament: 'All England Open Birmingham',
        year: 2019,
        duration: '81 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Viktor Axelsen (Denmark)',
        outcome: 'Won (21-11, 15-21, 21-15)',
        keyLearning: 'Patience and defensive shot height variation to tire out taller power opponents in deciding games.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Kento Momota',
      signature_moves: [
        'Hairpin Net Spinning Drop that hugs the tape by millimeters',
        'Disguised Reverse Slice Cross Drop from forehand rear court',
        'Deep High Defensive Lift to baseline rear line (exhausts attacking opponent)',
        'Left-Handed Straight Drive Block turning defense into immediate attack',
        'Sudden Cross-Court Net Flick over opponent charging the front court'
      ],
      movement_style: 'Light-footed zero-friction footwork. Never seems rushed; moves like water with perfect center-of-gravity balance and instant directional transitions.',
      attack_patterns: 'Builds attack through relentless construction. Weakens opponent balance with 15-20 shot rallies before executing surgical punch smashes into open court corners.',
      defensive_style: 'The gold standard of world badminton defense. Absorbs 400+ km/h smashes with soft grip fingers, converting opponent power into delicate drop returns.',
      mental_game: 'Extraordinary patience and mental endurance. Waits out opponents who lose discipline and commit impatient errors.',
      lessons_for_amateurs: [
        'Prioritize low error rates over raw power; forcing 3 unforced errors wins more points than 1 risky smash',
        'Tighten your grip ONLY at moment of impact to generate maximum control and touch at the net',
        'Recover to center before your opponent even makes contact with their shot',
        'Vary the height and trajectory of your defensive lifts to prevent opponents from timing smashes',
        'Stay calm during long rallies and breathe deeply between service points'
      ],
      training_drills: [
        '100-Shuttle Consecutive Net Spinning & Tumble Drill with feather shuttles',
        'Multi-Shuttle Defensive Lift & Cross Block Endurance Routine (30 mins)',
        'Blind Reaction Split-Step Agility Drill to 4 court corners',
        'Left/Right Precision Corner Targeting (Lifting into 1x1m taped baseline boxes)',
        'Aerobic Shuttle-Run Intervals (20m shuttle sprints x 15 sets)'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Kento Momota - Masterclass in Defense & Net Control'
    }
  },
  {
    id: 'lee-zii-jia',
    name: 'Lee Zii Jia',
    country: 'Malaysia',
    countryCode: 'MY',
    flag: '🇲🇾',
    playingStyle: 'Aggressive Attacker',
    styleSubtitle: 'Explosive Jump Smash & Backhand Powerhouse',
    worldRanking: 'World #7 (Olympic Bronze & All England Champ)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '186 cm (6 ft 1 in)',
    careerTitles: 12,
    racket: 'Victor Thruster Ryuga II (31 lbs)',
    bio: 'Olympic Bronze Medalist (Paris 2024) and 2021 All England Champion. Possesses the fastest backhand smash recorded in tournament history (over 380 km/h) and breathtaking aerial jump attack power.',
    stats: {
      smashSpeedKmH: 426,
      defenseRating: 86,
      deceptiveShotRating: 92,
      staminaRating: 91,
      netAccuracy: 88,
      winRate: 83,
      unforcedErrorsPerGame: 4.8
    },
    recommendedMatches: [
      {
        id: 'lzj-match-1',
        title: '2021 All England Open Men\'s Singles Final',
        tournament: 'All England Championships Birmingham',
        year: 2021,
        duration: '73 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'Viktor Axelsen (Denmark)',
        outcome: 'Won (30-29, 20-22, 21-9)',
        keyLearning: 'All-out attacking dominance and aggressive wrist snaps to break down towering defensive walls.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'lzj-match-2',
        title: '2024 Paris Olympics Bronze Medal Match',
        tournament: 'Paris Olympic Games 2024',
        year: 2024,
        duration: '71 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Lakshya Sen (India)',
        outcome: 'Won (13-21, 21-16, 21-11)',
        keyLearning: 'Clutch mental reset and shifting from raw baseline smashes to deceptive mid-court drives.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'lzj-match-3',
        title: '2022 Thailand Open Final Thriller',
        tournament: 'Toyota Thailand Open Bangkok',
        year: 2022,
        duration: '70 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Li Shifeng (China)',
        outcome: 'Won (17-21, 23-21, 21-8)',
        keyLearning: 'Devastating backhand jump smashes creating sudden counter-attack winner openings.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Lee Zii Jia',
      signature_moves: [
        'Historic 380+ km/h Backhand Jump Smash from rear deep court',
        'Explosive 360 Scissor Kick Smash with full body uncoiling',
        'Cross-Court Fast Drive Rush intercepting flat exchanges',
        'Aggressive Body-Line Smash into opponent dominant hip',
        'Spinning Net Tap with quick wrist tap follow-through'
      ],
      movement_style: 'Dynamic, high-twitch explosive athleticism. Covers massive court ground with fewer explosive strides and leaps higher than almost any competitor in modern badminton.',
      attack_patterns: 'Continuous relentless bombardment. Attacks not just on high lifts, but on flat half-court drives, creating intense pressure and forcing hurried defensive pops.',
      defensive_style: 'High-risk, high-reward counter-defending. Prefers driving flat returns or counter-smashing from deep backhand rather than playing neutral high clears.',
      mental_game: 'Thrives on momentum and emotional adrenaline. When in the flow state, can string together 7-8 unanswered winner points.',
      lessons_for_amateurs: [
        'Utilize forearm and wrist pronation instead of swinging purely from the shoulder to avoid rotator cuff injury',
        'Do not shy away from your backhand; learn proper grip rotation and elbow lead mechanics',
        'Attack into the body and hip crease when the sidelines are well protected',
        'Turn defensive blocks into fast flat pushes to strip your opponent of time',
        'Work on explosive plyometric leg training for jump smash elevation'
      ],
      training_drills: [
        'Backhand Power Smash & Drop Mechanics on feeding machine (4 sets x 25 reps)',
        'Box Jump Plyometrics & Depth Jumps for vertical explosion (5 sets x 12 reps)',
        'Mid-Court Fast Drive & Intercept Reaction Battles (15 mins high pace)',
        'Multi-Shuttle Smash-Run-Smash continuous stamina loop (6 sets x 15 shuttles)',
        'Wrist & Forearm Strengthening with weighted badminton training racquet'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Lee Zii Jia - Explosive Backhand & Vertical Jump Smash Analysis'
    }
  },
  {
    id: 'lakshya-sen',
    name: 'Lakshya Sen',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    playingStyle: 'All-Court Player',
    styleSubtitle: 'Lightning Speed, Acrobatic Diving & All-Court Agility',
    worldRanking: 'World #12 (Commonwealth Gold & Olympic Semifinalist)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '178 cm (5 ft 10 in)',
    careerTitles: 8,
    racket: 'Yonex Arcsaber 11 Pro (30 lbs)',
    bio: 'Commonwealth Games Gold Medalist and 2024 Olympic Semifinalist. Celebrated worldwide for heart-stopping diving saves, electric foot speed, and rapid front-court net transitions.',
    stats: {
      smashSpeedKmH: 395,
      defenseRating: 96,
      deceptiveShotRating: 90,
      staminaRating: 97,
      netAccuracy: 92,
      winRate: 81,
      unforcedErrorsPerGame: 3.1
    },
    recommendedMatches: [
      {
        id: 'ls-match-1',
        title: '2022 All England Open Semifinal Classic',
        tournament: 'All England Open Birmingham',
        year: 2022,
        duration: '76 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'Lee Zii Jia (Malaysia)',
        outcome: 'Won (21-13, 12-21, 21-19)',
        keyLearning: 'Absorbing massive smashes with diving defense and instantly bouncing back into play.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'ls-match-2',
        title: '2022 Commonwealth Games Gold Medal Match',
        tournament: 'Birmingham Commonwealth Games',
        year: 2022,
        duration: '65 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Ng Tze Yong (Malaysia)',
        outcome: 'Won (19-21, 21-9, 21-16)',
        keyLearning: 'Pacing control: picking up rally speed in game 2 to completely overwhelm the opponent.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'ls-match-3',
        title: '2024 Paris Olympics Quarterfinal Triumph',
        tournament: 'Paris Olympic Games 2024',
        year: 2024,
        duration: '75 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Chou Tien Chen (Chinese Taipei)',
        outcome: 'Won (19-21, 21-15, 21-12)',
        keyLearning: 'Tenacious long rally endurance and explosive cross-court net tumble finishes.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Lakshya Sen',
      signature_moves: [
        'Acrobatic Full-Body Floor Dive with instant 0.4s recovery return',
        'Rapid Forehand Cross-Net Kill off flat mid-court pushes',
        'Steep Slice Drop from deep rear forehand corner',
        'Fast Baseline Push to backhand corner on defensive turnaround',
        'Deceptive Hold-and-Flick at front net'
      ],
      movement_style: 'Pure kinetic speed and agility. Low center of gravity with rapid split-steps that allow him to retrieve seemingly impossible shuttles off the floor.',
      attack_patterns: 'Utilizes rapid tempo shifts. Drags opponents into high-speed mid-court exchanges, then accelerates with a surprise jump smash or net tap.',
      defensive_style: 'Relentless and athletic. Capable of diving 3 times in a single rally and still winning the point on a counter-punch.',
      mental_game: 'Fierce competitive fighting spirit. Refuses to give up on any point regardless of the score deficit.',
      lessons_for_amateurs: [
        'Never stop running on a shot; badminton rallies are won on the 2nd and 3rd recovery step',
        'Keep your knees bent and stay on the balls of your feet during defensive readiness',
        'Practice floor recovery drills to get back on your feet in under half a second',
        'Use quick wrist holds at the net to freeze your opponent before selecting your shot',
        'Maintain high cardiovascular fitness so your technique doesn\'t deteriorate in game 3'
      ],
      training_drills: [
        'Diving & Rapid Pop-Up Agility Reaction Drill (4 sets x 12 reps)',
        'Speed Shuttle Run: 6-Corner Touch Circuit (under 14 seconds x 10 sets)',
        'High-Pace 2-on-1 Fast Counter-Attacking Drill (20 mins)',
        'Net Hold-and-Flick Deception Repetitions (150 shuttles)',
        'Agility Ladder Footwork & Lateral Shuffle Drills (20 mins daily)'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Lakshya Sen - High Speed Court Coverage & Defensive Acrobatics'
    }
  },
  {
    id: 'pv-sindhu',
    name: 'PV Sindhu',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    playingStyle: 'Aggressive Attacker',
    styleSubtitle: 'High-Altitude Power & Steep Angle Finisher',
    worldRanking: 'World #11 (2x Olympic Medalist & World Champion)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '179 cm (5 ft 10 in)',
    careerTitles: 18,
    racket: 'Li-Ning Axforce 80 (30 lbs)',
    bio: 'World Champion (2019) and two-time Olympic Medalist (Silver in Rio 2016, Bronze in Tokyo 2020). Known for lethal steep angle cross-court smashes and immense physical stamina on big stages.',
    stats: {
      smashSpeedKmH: 389,
      defenseRating: 90,
      deceptiveShotRating: 86,
      staminaRating: 96,
      netAccuracy: 90,
      winRate: 85,
      unforcedErrorsPerGame: 3.8
    },
    recommendedMatches: [
      {
        id: 'pvs-match-1',
        title: '2019 BWF World Championships Final Masterclass',
        tournament: 'BWF World Championships Basel',
        year: 2019,
        duration: '38 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'Nozomi Okuhara (Japan)',
        outcome: 'Won (21-7, 21-7)',
        keyLearning: 'Total offensive blitz: attacking every shuttle with unrelenting pace and precision.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'pvs-match-2',
        title: '2016 Rio Olympics Gold Medal Final',
        tournament: 'Rio Olympic Games 2016',
        year: 2016,
        duration: '83 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Carolina Marin (Spain)',
        outcome: 'Loss (21-19, 12-21, 15-21) - Silver',
        keyLearning: 'Endurance under intense pace and tactical battles from deep baseline to tape.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'pvs-match-3',
        title: '2020 Tokyo Olympics Bronze Medal Match',
        tournament: 'Tokyo Olympic Games 2020',
        year: 2021,
        duration: '53 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'He Bingjiao (China)',
        outcome: 'Won (21-13, 21-15)',
        keyLearning: 'Steep down-the-line smashes targeted at backhand tramlines.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'PV Sindhu',
      signature_moves: [
        'Steep Cross-Court Jump Smash taking advantage of height reach',
        'Punch Clear to baseline pushing opponent off-balance',
        'Forehand Net Kill wiping across the tape',
        'Straight Bodyline Smash forcing rushed block pops',
        'Overhead Reverse Slice Drop into forehand corner'
      ],
      movement_style: 'Long graceful strides that cover the court with minimal exertion. Uses height to intercept shuttles early before they drop below the tape.',
      attack_patterns: 'Relentless downward pressure. Sets up attacks with deep driving clears and finishes aggressively with steep jump smashes.',
      defensive_style: 'Sturdy long-reach defense. Uses wrist flexibility to lift deep to baseline even when stretched wide.',
      mental_game: 'Big tournament performer. Plays her absolute best badminton during World Championships and Olympic Games.',
      lessons_for_amateurs: [
        'Take the shuttle as early as possible in front of your body to maximize downward angle',
        'Use punch clears to push opponents deep rather than always hitting high defensive clears',
        'Dominate the net with positive aggressive racquet carriage (keep racquet head up!)',
        'Target the opponent\'s body when they are defending wide',
        'Stay aggressive even on tight scorelines in deciding games'
      ],
      training_drills: [
        'High Overhead Steep Smash Accuracy Drill targeting baseline plastic cups (100 shuttles)',
        'Racquet Head Height Net Interception Drill (15 mins continuous)',
        'Deep Corner Lunges & Reach Resistance Training (5 sets x 15 reps)',
        'Multi-Shuttle Continuous Jump Smash Routine (8 sets x 12 shuttles)',
        'Shoulder Rotator Cuff Stability & Power Band Exercises'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'PV Sindhu - Steep Smash Angles & Championship Aggression'
    }
  },
  {
    id: 'carolina-marin',
    name: 'Carolina Marin',
    country: 'Spain',
    countryCode: 'ES',
    flag: '🇪🇸',
    playingStyle: 'Aggressive Attacker',
    styleSubtitle: 'High-Intensity Left-Handed Power & Relentless Tempo',
    worldRanking: 'World #5 (Olympic Gold & 3x World Champion)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Left',
    height: '172 cm (5 ft 8 in)',
    careerTitles: 38,
    racket: 'Yonex Nanoflare 1000Z (31 lbs)',
    bio: 'Olympic Gold Medalist (Rio 2016) and 3-time World Champion. Widely considered one of the most ferocious and intense competitors in badminton history, dominating opponents with left-handed angles and blistering speed.',
    stats: {
      smashSpeedKmH: 402,
      defenseRating: 92,
      deceptiveShotRating: 93,
      staminaRating: 97,
      netAccuracy: 94,
      winRate: 88,
      unforcedErrorsPerGame: 3.6
    },
    recommendedMatches: [
      {
        id: 'cm-match-1',
        title: '2016 Rio Olympics Gold Medal Final',
        tournament: 'Rio Olympic Games 2016',
        year: 2016,
        duration: '83 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'PV Sindhu (India)',
        outcome: 'Won (19-21, 21-12, 21-15) - Olympic Gold',
        keyLearning: 'Unmatched intensity and left-handed cross-court attacking angles from the first point.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'cm-match-2',
        title: '2018 BWF World Championships Final',
        tournament: 'World Championships Nanjing',
        year: 2018,
        duration: '45 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'PV Sindhu (India)',
        outcome: 'Won (21-19, 21-10) - 3rd World Title',
        keyLearning: 'Rapid net charging and flat drive pace forcing opponent defensive errors.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'cm-match-3',
        title: '2024 All England Open Championship Final',
        tournament: 'All England Open Birmingham',
        year: 2024,
        duration: '35 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Akane Yamaguchi (Japan)',
        outcome: 'Won (26-24, 11-1 ret)',
        keyLearning: 'Tactical patience blended with high-speed left-handed net kills on decisive game points.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Carolina Marin',
      signature_moves: [
        'Left-Handed Sharp Cross-Court Slice Smash into right tramline',
        'Aggressive Front-Court Net Intercept and Tap Kill',
        'Fast Flat Drive down the center line restricting opponent angles',
        'Disguised Straight Drop from left rear court',
        'High-Pressure Service Return driving deep to backhand'
      ],
      movement_style: 'Explosive, hyper-aggressive forward momentum. Always moving towards the net to cut off opponent responses early.',
      attack_patterns: 'Plays at the highest tempo in women\'s singles. Pins opponents with fast drives, then steps in to kill anything floating above net height.',
      defensive_style: 'Active attacking defense. Never simply lifts; counters smashes with flat cross-court drives.',
      mental_game: 'Intense mental dominance, vocal presence, and fearless body language that intimidates opponents.',
      lessons_for_amateurs: [
        'Maintain aggressive body language and energy on every single point',
        'Attack the net after hitting a deep clear or drop instead of retreating to base',
        'Master the flat drive to keep rallies fast and take away opponent smash opportunities',
        'Learn left-handed attacking angles to exploit right-handed player backhand weaknesses',
        'Play with supreme self-belief during critical 19-19 point scenarios'
      ],
      training_drills: [
        'Left-Handed Angle Smash & Net Rush Sequence Drill (6 sets x 20 shuttles)',
        'Flat Drive Rapid Reflex Battle across the net (15 mins high tempo)',
        'Speed Shadow Footwork with audible cadence cues (5 sets x 3 mins)',
        'Front-Court Interception Kill Reaction Drill (150 shuttles)',
        'High-Intensity Interval Sprints: 30s max effort / 15s rest (10 rounds)'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Carolina Marin - Left-Handed Attack Speed & Mental Dominance'
    }
  },
  {
    id: 'an-se-young',
    name: 'An Se-young',
    country: 'South Korea',
    countryCode: 'KR',
    flag: '🇰🇷',
    playingStyle: 'Defensive Specialist',
    styleSubtitle: 'The Iron Wall & Master of Counter-Attack',
    worldRanking: 'World #1 (Olympic Gold & World Champion)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '170 cm (5 ft 7 in)',
    careerTitles: 26,
    racket: 'Yonex Astrox 77 Pro (30 lbs)',
    bio: 'Olympic Gold Medalist (Paris 2024), World Champion (2023), and reigning World #1. Nicknamed the "Iron Wall" for her unbreakable defensive resilience, supernatural anticipation, and flawless stamina.',
    stats: {
      smashSpeedKmH: 378,
      defenseRating: 99,
      deceptiveShotRating: 95,
      staminaRating: 100,
      netAccuracy: 98,
      winRate: 93,
      unforcedErrorsPerGame: 1.5
    },
    recommendedMatches: [
      {
        id: 'asy-match-1',
        title: '2024 Paris Olympics Women\'s Singles Final',
        tournament: 'Paris Olympic Games 2024',
        year: 2024,
        duration: '52 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'He Bingjiao (China)',
        outcome: 'Won (21-13, 21-16) - Olympic Gold',
        keyLearning: 'Flawless defensive resets and converting opponent power into pinpoint drop shots.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'asy-match-2',
        title: '2023 BWF World Championships Final',
        tournament: 'World Championships Copenhagen',
        year: 2023,
        duration: '42 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Carolina Marin (Spain)',
        outcome: 'Won (21-12, 21-10) - World Title',
        keyLearning: 'Completely neutralizing hyper-aggressive left-handed smashes with soft touch cross drops.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'asy-match-3',
        title: '2023 All England Open Final Thriller',
        tournament: 'All England Open Birmingham',
        year: 2023,
        duration: '75 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Chen Yufei (China)',
        outcome: 'Won (21-17, 10-21, 21-19)',
        keyLearning: 'Unmatched 3rd game stamina and tactical discipline when physically exhausted.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'An Se-young',
      signature_moves: [
        'Cross-Court Soft Block converting 380 km/h smashes into tight drops',
        'Deceptive Backhand Cross Net Tumble with delayed wrist release',
        'Deep High Arching Clearance pinning opponent to extreme baseline',
        'Surgical Punch Smash down the line on loose mid-court returns',
        'Anticipation Split-Step intercepting cross drops before the bounce'
      ],
      movement_style: 'Virtually weightless court coverage. Moves with effortless gliding footwork, staying perfectly upright to maintain vision of the opponent\'s racquet head.',
      attack_patterns: 'Calculated counter-punching. Absorbs 10-15 aggressive shots until opponent leaves open court space, then strikes with lethal precision.',
      defensive_style: 'The premier defensive wall in modern badminton. Impeccable racquet carriage and soft grip cushioning that deadens all incoming shuttle speed.',
      mental_game: 'Imperturbable Zen-like focus. Doesn\'t celebrate prematurely and remains completely composed regardless of point swings.',
      lessons_for_amateurs: [
        'Defense is not passive; soft block returns force your attacking opponent to sprint forward and expend 2x energy',
        'Watch the opponent\'s racquet angle rather than the shuttle in the air to anticipate shot direction',
        'Build unbeatable stamina; when both players are tired in game 3, the disciplined defender wins',
        'Eliminate unforced errors; keeping the shuttle in play 1 extra time wins 70% of amateur points',
        'Master the soft grip touch at the net'
      ],
      training_drills: [
        '30-Minute Continuous Smash Defense vs 2 Feeders (Multi-Shuttle)',
        'Net Drop Precision Tumble Drill: Shuttles must land within 30cm of tape (100 reps)',
        'Footwork Anticipation Reaction with strobe light or visual cue triggers',
        'Baseline-to-Baseline High Clear Depth Consistency (150 continuous rallies)',
        'Endurance Leg Stamina: Wall sits, Bulgarian split squats, and 5km steady runs'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'An Se-young - The Iron Wall Defensive Biomechanics'
    }
  },
  {
    id: 'tai-tzu-ying',
    name: 'Tai Tzu-ying',
    country: 'Taiwan',
    countryCode: 'TW',
    flag: '🇹🇼',
    playingStyle: 'Net Dominator',
    styleSubtitle: 'The Queen of Deception & Wrist Artistry',
    worldRanking: 'Former World #1 (Olympic Silver & Deception Queen)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1000&auto=format&fit=crop&q=80',
    dominantHand: 'Right',
    height: '163 cm (5 ft 4 in)',
    careerTitles: 32,
    racket: 'Victor Thruster F Enhanced (30 lbs)',
    bio: 'Longest-reigning World #1 in women\'s singles history (214 weeks). Universally acclaimed as the greatest trickster and deceptive artist the sport has ever seen, freezing world champions with impossible wrist holds.',
    stats: {
      smashSpeedKmH: 382,
      defenseRating: 92,
      deceptiveShotRating: 100,
      staminaRating: 94,
      netAccuracy: 99,
      winRate: 87,
      unforcedErrorsPerGame: 4.1
    },
    recommendedMatches: [
      {
        id: 'tty-match-1',
        title: '2023 BWF World Tour Finals Semifinal Miracle Comeback',
        tournament: 'BWF World Tour Finals Hangzhou',
        year: 2023,
        duration: '72 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        opponent: 'An Se-young (South Korea)',
        outcome: 'Won (19-21, 21-15, 22-20) - Erased 10-19 3rd game deficit',
        keyLearning: 'Magical deception at the net and fearless shot-making under impossible match point pressure.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'tty-match-2',
        title: '2020 Tokyo Olympics Women\'s Singles Final',
        tournament: 'Tokyo Olympic Games 2020',
        year: 2021,
        duration: '81 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        opponent: 'Chen Yufei (China)',
        outcome: 'Loss (18-21, 21-19, 18-21) - Olympic Silver Classic',
        keyLearning: 'High-risk high-reward corner painting and jaw-dropping deceptive flick winners.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'tty-match-3',
        title: '2020 All England Open Championship Final',
        tournament: 'All England Open Birmingham',
        year: 2020,
        duration: '44 mins',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        opponent: 'Chen Yufei (China)',
        outcome: 'Won (21-19, 21-15) - 3rd All England Title',
        keyLearning: 'Dominating front-court exchanges with reverse wrist slices and freeze-frame holds.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
      }
    ],
    defaultAnalysis: {
      player_name: 'Tai Tzu-ying',
      signature_moves: [
        'The "Tai Freeze" Delayed Wrist Hold and Reverse Slice Cross Drop',
        'Disguised Cross-Court Net Flick sending opponent running the wrong way',
        'Backhand Overhead Cross Net Tumble with finger snap',
        'Steep Forehand Cross Smash landing on the outer tramline corner',
        'Deceptive Low-Serve Return pushing into empty backcourt'
      ],
      movement_style: 'Effortless and unpredictable. Changes direction with supreme core rotational flexibility, creating deception with her body angle even before racquet contact.',
      attack_patterns: 'Psychological manipulation of opponent anticipation. Shows smash preparation to force deep defensive stance, then plays feather-light drops.',
      defensive_style: 'Creative touch defense. Instead of defensive lifting, Tai plays unexpected cross-court slices that reverse rally dynamics.',
      mental_game: 'Artistic freedom and supreme courage. Will attempt a high-difficulty deceptive slice at 20-20 match point without hesitation.',
      lessons_for_amateurs: [
        'Prepare your racquet swing identically for both smashes and drops to disguise shot intentions',
        'Hold your shot for an extra 0.1 second at the net to force the opponent to commit their weight first',
        'Loosen your grip tension; relaxed fingers allow deceptive wrist snaps that stiff arms cannot execute',
        'Do not be afraid to make mistakes when experimenting with new angles and drops in practice',
        'Strengthen your wrist and forearm for rapid directional changes at the point of contact'
      ],
      training_drills: [
        'Disguised Hold-and-Drop / Hold-and-Flick Net Deception Repetitions (200 shuttles)',
        'Reverse Slice Overhead Drop Drill from Rear Corners (6 sets x 20 shuttles)',
        'Wrist Snap Reaction Drill with heavy training racquet (15 mins)',
        '4-Corner Unpredictable Feeding Routine (25 mins high variability)',
        'Core Rotational Flexibility & Resistance Band Wrist Work'
      ],
      analyzed_at: '2026-08-15',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: 'Tai Tzu-ying - The Art of Badminton Deception & Wrist Mastery'
    }
  }
];
