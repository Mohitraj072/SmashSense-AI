import React from 'react';
import { MatchAnalysis, User } from '../types';
import {
  Trophy,
  Zap,
  ShieldAlert,
  Target,
  Upload,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Video,
  Flame,
  CheckCircle2,
  History,
  Bot,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface PeerComparisonData {
  status: string;
  level: string;
  rating_tier: string;
  player_data: {
    rating: number;
    win_rate: number;
    smash_speed: number;
    footwork: number;
    technique: number;
    stamina: number;
  };
  community_averages: {
    level: string;
    tier_range: string;
    avg_rating: number;
    avg_win_rate: number;
    avg_smash_speed: number;
    most_common_weakness: string;
    avg_footwork: number;
    avg_technique: number;
    avg_stamina: number;
  };
  radar_comparison: Array<{
    attribute: string;
    you: number;
    levelAverage: number;
  }>;
  percentile_summary: string;
  motivational_message: string;
}

interface DashboardPageProps {
  user: User;
  matches: MatchAnalysis[];
  onSelectMatch: (match: MatchAnalysis) => void;
  onNavigateToUpload: () => void;
  onNavigateToHistory: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  matches,
  onSelectMatch,
  onNavigateToUpload,
  onNavigateToHistory,
}) => {
  const latestMatch = matches[0];
  const [peerData, setPeerData] = React.useState<PeerComparisonData | null>(null);

  React.useEffect(() => {
    fetch('/api/peer_comparison')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.status === 'success') {
          setPeerData(data);
        }
      })
      .catch((err) => console.log('Peer comparison fetch error:', err));
  }, []);

  // Aggregate Shot Distribution for overview
  const totalShotDistribution = matches.reduce(
    (acc, m) => {
      acc.smash += m.shotDistribution.smash;
      acc.drop += m.shotDistribution.drop;
      acc.clear += m.shotDistribution.clear;
      acc.drive += m.shotDistribution.drive;
      acc.net += m.shotDistribution.net;
      acc.lift += m.shotDistribution.lift;
      return acc;
    },
    { smash: 0, drop: 0, clear: 0, drive: 0, net: 0, lift: 0 }
  );

  const pieData = [
    { name: 'Smash', value: totalShotDistribution.smash, color: '#f43f5e' },
    { name: 'Drop', value: totalShotDistribution.drop, color: '#38bdf8' },
    { name: 'Clear', value: totalShotDistribution.clear, color: '#a855f7' },
    { name: 'Drive', value: totalShotDistribution.drive, color: '#10b981' },
    { name: 'Net Shot', value: totalShotDistribution.net, color: '#f59e0b' },
    { name: 'Lift', value: totalShotDistribution.lift, color: '#64748b' },
  ];

  // Skill Radar Data
  const radarData = [
    { subject: 'Smash Power', score: 88 },
    { subject: 'Net Control', score: 76 },
    { subject: 'Footwork Speed', score: 68 },
    { subject: 'Backhand Defense', score: 58 },
    { subject: 'Stamina', score: 72 },
    { subject: 'Tactical Reading', score: 82 },
  ];

  // Community Comparison Radar Data (5 Axes: AI Rating, Win Rate, Footwork, Technique, Stamina)
  const communityRadarData = peerData?.radar_comparison
    ? peerData.radar_comparison.map((item) => ({
        attribute: item.attribute,
        You: item.you,
        'Level Average': item.levelAverage,
      }))
    : [
        { attribute: 'AI Rating', You: user.overallRating || 84, 'Level Average': 81.2 },
        { attribute: 'Win Rate', You: user.winRate || 68, 'Level Average': 58.5 },
        { attribute: 'Footwork', You: 78, 'Level Average': 74 },
        { attribute: 'Technique', You: 86, 'Level Average': 80 },
        { attribute: 'Stamina', You: 82, 'Level Average': 76 },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0A0F1E_0%,#0c1a1a_50%,#0D2818_100%)] border border-emerald-500/20 p-6 sm:p-8 md:p-10 shadow-2xl">
        
        {/* Subtle Animated Court Line Pattern Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <svg className="w-full h-full text-emerald-400 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Outer Boundary */}
            <rect x="20" y="20" width="760" height="360" fill="none" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse" />
            {/* Center Line & Net */}
            <line x1="400" y1="20" x2="400" y2="380" strokeWidth="3" strokeDasharray="6 3" />
            <line x1="400" y1="10" x2="400" y2="390" strokeWidth="5" className="text-emerald-300" />
            {/* Service Lines */}
            <line x1="320" y1="20" x2="320" y2="380" strokeWidth="1.5" />
            <line x1="480" y1="20" x2="480" y2="380" strokeWidth="1.5" />
            {/* Side Lines */}
            <line x1="20" y1="50" x2="780" y2="50" strokeWidth="1.5" />
            <line x1="20" y1="350" x2="780" y2="350" strokeWidth="1.5" />
            {/* Center Service Line */}
            <line x1="20" y1="200" x2="320" y2="200" strokeWidth="1.5" />
            <line x1="480" y1="200" x2="780" y2="200" strokeWidth="1.5" />
            {/* Subtle Center Circle */}
            <circle cx="400" cy="200" r="45" fill="none" strokeWidth="1" className="animate-spin" style={{ animationDuration: '30s' }} />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Main Content Area */}
          <div className="max-w-2xl space-y-4 text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>SmashSense AI Engine</span>
            </div>

            {/* Dynamic Welcome Title */}
            <h1 className="hero-heading text-[28px] sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">{user.name}</span> 👋
            </h1>

            {/* Highlighted Insight Pill Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span>🔴 Backhand weakness detected in last 3 matches</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Your telemetry shows clear footwork recovery delays in the rear deep court. Upload your next match video or review opponent tactical dossiers.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions-stacked pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <button
                onClick={onNavigateToUpload}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[44px] cursor-pointer"
              >
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Analyze New Video</span>
              </button>
              
              <button
                onClick={onNavigateToHistory}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border-2 border-white/80 hover:border-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[44px] cursor-pointer"
              >
                <History className="w-4 h-4" />
                <span>View History ({matches.length})</span>
              </button>
            </div>

          </div>

          {/* Small AI Coach Avatar Card on Right Side */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0 self-center md:self-auto">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-25 blur-md group-hover:opacity-50 transition-opacity"></div>
              
              {/* Card Body */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-950/80 border border-emerald-500/30 p-3 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-emerald-400">
                    <Bot className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                <span className="mt-2 text-xs font-extrabold text-white tracking-wide">AI Coach</span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Redesigned Stats Quick Cards with Visual Hierarchy (2x2 Grid on Mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 stats-grid-mobile">
        
        {/* Card 1: Overall AI Rating (2x Width / 2 Cols) */}
        {(() => {
          const ratingVal = Number(user.overallRating) || 84;
          const ringColorClass = ratingVal >= 70 ? 'stroke-emerald-400' : ratingVal >= 50 ? 'stroke-amber-400' : 'stroke-rose-500';
          const ringTextColorClass = ratingVal >= 70 ? 'text-emerald-400' : ratingVal >= 50 ? 'text-amber-400' : 'text-rose-400';
          const topBorderClass = ratingVal >= 70 ? 'border-t-emerald-500' : ratingVal >= 50 ? 'border-t-amber-500' : 'border-t-rose-500';
          const r = 38;
          const circ = 2 * Math.PI * r;
          const dashOffset = circ - (ratingVal / 100) * circ;

          return (
            <div className={`col-span-1 md:col-span-2 lg:col-span-2 p-5 rounded-2xl bg-slate-900 border-x border-b border-slate-800 border-t-4 ${topBorderClass} shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-700 flex flex-col justify-between group`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Overall AI Rating</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      PRO LEVEL
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-4xl font-black text-white">{ratingVal}</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3 mr-1" /> +3 this month
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    Level: <span className="text-white font-bold">{user.level}</span> • Style: <span className="text-slate-300">{user.playingStyle}</span>
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400 border-t border-slate-800/80 mt-2">
                    <span>Precision: <strong className="text-emerald-400">88%</strong></span>
                    <span>Coverage: <strong className="text-teal-400">82%</strong></span>
                    <span>Stamina: <strong className="text-cyan-400">85%</strong></span>
                  </div>
                </div>

                {/* Circular Progress Ring around Rating Number */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center p-1 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                    {/* Track */}
                    <circle
                      cx="48"
                      cy="48"
                      r={r}
                      className="stroke-slate-800/80"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    {/* Ring */}
                    <circle
                      cx="48"
                      cy="48"
                      r={r}
                      className={`${ringColorClass} transition-all duration-1000 ease-out`}
                      strokeWidth="8"
                      strokeDasharray={circ}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className={`text-2xl font-black ${ringTextColorClass}`}>{ratingVal}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">/ 100</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Card 2: Win Rate with Mini Bar Chart */}
        <div className="p-5 rounded-2xl bg-slate-900 border-x border-b border-slate-800 border-t-4 border-t-cyan-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-700 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Win Rate</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{user.winRate}%</span>
              <span className="text-xs font-semibold text-slate-400">14 Matches</span>
            </div>
          </div>

          {/* Mini Bar Chart showing last 5 match results as W/L colored bars */}
          <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>LAST 5 MATCHES</span>
              <span className="text-emerald-400">4W - 1L</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-10 pt-1">
              {[
                { result: 'W', height: 'h-8', bg: 'bg-emerald-500', label: 'W' },
                { result: 'W', height: 'h-8', bg: 'bg-emerald-500', label: 'W' },
                { result: 'L', height: 'h-4', bg: 'bg-rose-500', label: 'L' },
                { result: 'W', height: 'h-8', bg: 'bg-emerald-500', label: 'W' },
                { result: 'W', height: 'h-8', bg: 'bg-emerald-500', label: 'W' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar">
                  <div
                    className={`w-full ${bar.height} ${bar.bg} rounded-md transition-all group-hover/bar:brightness-125 shadow-sm`}
                    title={`Match ${idx + 1}: ${bar.result === 'W' ? 'Win' : 'Loss'}`}
                  ></div>
                  <span className={`text-[9px] font-extrabold ${bar.result === 'W' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Weakness Index with Color-Coded Severity Indicator */}
        {(() => {
          const score = user.weaknessScore || 62;
          const isHigh = score > 50;
          const isLow = score < 30;
          const cardBgClass = isHigh
            ? 'bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 border-rose-500/30'
            : isLow
            ? 'bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-500/30'
            : 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/30';
          const badgeClass = isHigh
            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            : isLow
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            : 'bg-amber-500/20 text-amber-400 border-amber-500/30';
          const badgeText = isHigh ? 'HIGH RISK' : isLow ? 'LOW RISK' : 'MODERATE';

          return (
            <div className={`p-5 rounded-2xl ${cardBgClass} border-x border-b border-t-4 border-t-rose-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-rose-500/40 flex flex-col justify-between`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Weakness Index</span>
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-white">{score}<span className="text-xs font-bold text-slate-400">/100</span></span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${badgeClass}`}>
                    {badgeText}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400">VULNERABILITY</span>
                  <span className="text-rose-400">Backhand Corner</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${isHigh ? 'bg-rose-500' : isLow ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Card 4: Avg Smash Speed with Speedometer Gauge */}
        <div className="p-5 rounded-2xl bg-slate-900 border-x border-b border-slate-800 border-t-4 border-t-amber-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-700 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Avg Smash Speed</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white">282</span>
              <span className="text-xs font-bold text-amber-400 uppercase">km/h</span>
            </div>
          </div>

          {/* Speedometer Gauge Visual */}
          <div className="pt-2 border-t border-slate-800/80 mt-2 flex flex-col items-center">
            <div className="relative w-32 h-14 overflow-hidden flex items-end justify-center">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Track */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Gauge Arc (282 out of 350 max km/h = 80.5%) */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="url(#speedometerGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="125.66"
                  strokeDashoffset={125.66 * (1 - 282 / 350)}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="speedometerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="60%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 text-center">
                <span className="text-[10px] font-extrabold text-slate-300">Peak: 298 km/h</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Community Comparison: How You Stack Up Card */}
      <div id="community-comparison" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shadow-md shadow-emerald-500/10">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Community Comparison</h3>
            </div>
            <p className="text-xs text-slate-400 pl-11">
              Anonymous aggregate benchmarks for players at your skill tier
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {peerData?.level || user.level || 'Advanced'} Tier ({peerData?.rating_tier || '75-100'})
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 text-xs font-semibold border border-slate-700/80">
              🔒 Fully Anonymous Data
            </span>
          </div>
        </div>

        {/* Top Percentile Summary Banner */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-emerald-500/5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                How You Stack Up
              </span>
              <p className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight">
                {peerData?.percentile_summary || `You are in the top 28% for Win Rate at ${user.level || 'Advanced'} level`}
              </p>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300 self-start sm:self-auto shrink-0 shadow-inner">
            Tier Top Quartile ⚡
          </span>
        </div>

        {/* Two Column Layout: Radar Chart vs Community Benchmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          
          {/* Radar Chart (5 Axes) */}
          <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                5-Axis Skill Radar Comparison
              </h4>
              <span className="text-[11px] font-bold text-slate-400">
                You (Green) vs {peerData?.level || user.level || 'Advanced'} Avg (Gray)
              </span>
            </div>

            <div className="h-72 sm:h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={communityRadarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis
                    dataKey="attribute"
                    stroke="#94a3b8"
                    tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar
                    name="You"
                    dataKey="You"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Level Average"
                    dataKey="Level Average"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.25}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '12px', fontSize: '12px', fontWeight: 'bold' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column: Aggregated Benchmarks + Gemini Motivational Note */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* 4 Community Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Avg AI Rating
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-100">
                    {peerData?.community_averages?.avg_rating || 81.2}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    (You: {peerData?.player_data?.rating || user.overallRating || 84})
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Avg Win Rate
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-100">
                    {peerData?.community_averages?.avg_win_rate || 58.5}%
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    (You: {peerData?.player_data?.win_rate || user.winRate || 68}%)
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Avg Smash Speed
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-100">
                    {peerData?.community_averages?.avg_smash_speed || 265} <span className="text-[10px] text-slate-400">km/h</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-400">
                    (You: 282)
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Top Level Weakness
                </span>
                <p className="text-xs font-bold text-rose-400 truncate">
                  {peerData?.community_averages?.most_common_weakness || 'Deep Backhand Corner Recovery'}
                </p>
              </div>
            </div>

            {/* Gemini Motivational Coaching Note */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-2.5 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                    Gemini AI Coach Insights
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-medium">
                "{peerData?.motivational_message || `Your offensive execution and ${user.winRate || 68}% win rate comfortably outperform the ${user.level || 'Advanced'} benchmark! Focus on sharpening your backhand corner recovery to lock in your spot in the top 10%.`}"
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Charts & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skill Radar & Shot Selection */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Skill Profile Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Player Skill Attributes
                </h3>
                <p className="text-xs text-slate-400">AI motion tracking calculation from recent match footage</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                {user.playingStyle}
              </span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar name="Alex Chen" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shot Distribution Pie Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Aggregate Shot Selection
                </h3>
                <p className="text-xs text-slate-400">Proportion of strokes played across all matches</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Weaknesses & Opponent Patterns */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Latest AI Match Summary Card */}
          {latestMatch && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-4 h-4" /> Latest Analyzed Match
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  latestMatch.result === 'Win' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {latestMatch.result} ({latestMatch.score})
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{latestMatch.title}</h4>
                <p className="text-xs text-slate-400">{latestMatch.date} • vs {latestMatch.opponentName}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                "{latestMatch.aiSummary}"
              </p>

              <button
                onClick={() => onSelectMatch(latestMatch)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                Inspect Full Match AI Report <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Key Weaknesses Highlight */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Active Tactical Weaknesses
              </h3>
              <span className="text-xs text-rose-400 font-semibold">Priority Focus</span>
            </div>

            <div className="space-y-3">
              {latestMatch?.weaknesses.map((w, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{w.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      w.impact === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {w.impact} Impact
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{w.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opponent Pattern Intelligence */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Detected Opponent Habits
              </h3>
            </div>

            <div className="space-y-3">
              {latestMatch?.opponentPatterns.slice(0, 2).map((p, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{p.pattern}</span>
                    <span className="text-[10px] text-slate-400">{p.frequency} Frequency</span>
                  </div>
                  <p className="text-[11px] text-slate-400"><strong>Trigger:</strong> {p.triggerCondition}</p>
                  <p className="text-[11px] text-emerald-400 font-medium"><strong>Counter:</strong> {p.suggestedCounter}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
