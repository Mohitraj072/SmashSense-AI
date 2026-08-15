import React, { useState, useEffect } from 'react';
import { ProPlayer, ProPlayerAnalysis, ProComparisonResult, User, MatchAnalysis } from '../types';
import { PRO_PLAYERS } from '../data/proPlayersData';
import { 
  Award, 
  Sparkles, 
  Play, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  Brain, 
  Dumbbell, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Filter,
  Flame,
  ArrowRight,
  Calendar,
  Layers
} from 'lucide-react';

interface ProAnalysisPageProps {
  user: User | null;
  recentMatches: MatchAnalysis[];
}

export const ProAnalysisPage: React.FC<ProAnalysisPageProps> = ({ user, recentMatches }) => {
  const [players, setPlayers] = useState<ProPlayer[]>(PRO_PLAYERS);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePlayer, setActivePlayer] = useState<ProPlayer>(PRO_PLAYERS[0]);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(PRO_PLAYERS[0].recommendedMatches[0]?.youtubeUrl || '');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ProPlayerAnalysis>(PRO_PLAYERS[0].defaultAnalysis);
  
  const [comparePlayer, setComparePlayer] = useState<ProPlayer>(PRO_PLAYERS[0]);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [comparisonResult, setComparisonResult] = useState<ProComparisonResult | null>(null);

  // Load backend data if available
  useEffect(() => {
    fetch('/api/pro_players')
      .then(res => res.json())
      .then(data => {
        if (data.players && data.players.length > 0) {
          setPlayers(data.players);
          setActivePlayer(data.players[0]);
          setComparePlayer(data.players[0]);
          setCurrentAnalysis(data.players[0].defaultAnalysis);
        }
      })
      .catch(() => {
        // Fallback to imported PRO_PLAYERS
      });
  }, []);

  // Fetch initial comparison
  useEffect(() => {
    if (comparePlayer) {
      handleFetchComparison(comparePlayer.id);
    }
  }, [comparePlayer.id]);

  const handleSelectPlayer = (player: ProPlayer, customUrl?: string) => {
    setActivePlayer(player);
    setCurrentAnalysis(player.defaultAnalysis);
    setYoutubeUrl(customUrl || player.recommendedMatches[0]?.youtubeUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    
    const analyzeElem = document.getElementById('react-analyze-section');
    if (analyzeElem) {
      analyzeElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnalyzeVideo = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/pro_analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_name: activePlayer.name,
          player_id: activePlayer.id,
          youtube_url: youtubeUrl
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setCurrentAnalysis(data.analysis);
      }
    } catch (e) {
      console.error('Failed to analyze pro video:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFetchComparison = async (playerId: string) => {
    const targetPro = players.find(p => p.id === playerId) || players[0];
    setComparePlayer(targetPro);
    setIsComparing(true);

    try {
      const res = await fetch('/api/compare_with_pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pro_player_id: targetPro.id,
          pro_player_name: targetPro.name,
          player_name: user?.name || 'You',
          user_matches: recentMatches
        })
      });
      const data = await res.json();
      if (data.comparison) {
        setComparisonResult(data.comparison);
      }
    } catch (e) {
      console.error('Error fetching pro comparison:', e);
    } finally {
      setIsComparing(false);
    }
  };

  const filteredPlayers = selectedFilter === 'All'
    ? players
    : players.filter(p => p.playingStyle === selectedFilter);

  const getStyleBadgeClass = (style: string) => {
    if (style.includes('Attacker')) return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    if (style.includes('Defensive')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (style.includes('Net')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Header */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>World Champions Biomechanics & Tactical Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pro Player Analysis & Comparison
          </h1>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Study 8 of badminton's greatest world champions. Extract signature shots, movement kinetics, and tactical lessons via Gemini AI vision, then compare your stats directly against pro benchmarks.
          </p>
        </div>
      </div>

      {/* SECTION 1: PRO PLAYER LIBRARY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-[#00C853]" />
              <span>Pro Player Library</span>
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              Browse 8 legendary international champions with real tournament profiles and bio metrics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Aggressive Attacker', 'Defensive Specialist', 'Net Dominator', 'All-Court Player'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedFilter === f
                    ? 'bg-[#00C853] text-black border-[#00C853] shadow-md shadow-[#00C853]/20'
                    : 'bg-[#111827] hover:bg-[#1F2937] text-[#9CA3AF] border-[#1F2937]'
                }`}
              >
                {f === 'All' ? `All (${players.length})` : f}
              </button>
            ))}
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPlayers.map(p => (
            <div
              key={p.id}
              className={`bg-[#111827] border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-[#00C853]/5 group ${
                activePlayer.id === p.id ? 'border-[#00C853] ring-1 ring-[#00C853]' : 'border-[#1F2937] hover:border-[#00C853]/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#1F2937] group-hover:border-[#00C853]/40 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{p.flag}</span>
                      <h3 className="text-base font-black text-white group-hover:text-[#00C853] transition-colors">{p.name}</h3>
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{p.country}</p>
                    <span className="inline-block text-[10px] font-mono text-slate-400 mt-1">
                      {p.height}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getStyleBadgeClass(p.playingStyle)}`}>
                    {p.playingStyle}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#0A0F1E] text-slate-300 text-[10px] font-bold border border-[#1F2937]">
                    {p.worldRanking}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {p.bio}
                </p>

                {/* Key stats metrics */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-center">
                  <div className="bg-[#0A0F1E] p-2 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#9CA3AF]">Max Smash</div>
                    <div className="text-xs font-black text-[#00C853]">{p.stats.smashSpeedKmH} km/h</div>
                  </div>
                  <div className="bg-[#0A0F1E] p-2 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#9CA3AF]">Defense Rating</div>
                    <div className="text-xs font-black text-blue-400">{p.stats.defenseRating}/100</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F2937]">
                <button
                  onClick={() => handleSelectPlayer(p)}
                  className="px-3 py-2 rounded-xl bg-[#00C853]/10 hover:bg-[#00C853] text-[#00C853] hover:text-black text-xs font-bold border border-[#00C853]/30 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze</span>
                </button>

                <button
                  onClick={() => {
                    handleFetchComparison(p.id);
                    const compElem = document.getElementById('react-compare-section');
                    if (compElem) compElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-3 py-2 rounded-xl bg-[#0A0F1E] hover:bg-[#1F2937] text-white text-xs font-bold border border-[#1F2937] transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Compare</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: ANALYZE PRO STYLE (Interactive Workspace) */}
      <section id="react-analyze-section" className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center text-[#00C853] text-2xl font-black">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activePlayer.flag}</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Analyze Pro Style: {activePlayer.name}
                </h2>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {activePlayer.playingStyle} • {activePlayer.worldRanking}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Gemini 3.7 Vision Ready</span>
            </span>
          </div>
        </div>

        {/* Video URL Input */}
        <div className="space-y-3">
          <label className="block text-xs sm:text-sm font-bold text-slate-300">
            Paste a YouTube match video URL of {activePlayer.name}:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3.5 bg-[#0A0F1E] border border-[#1F2937] rounded-xl text-white text-sm focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] font-mono transition-all"
              />
            </div>
            <button
              onClick={handleAnalyzeVideo}
              disabled={isAnalyzing}
              className="px-6 py-3.5 bg-[#00C853] hover:bg-[#00B048] text-black font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00C853]/20 cursor-pointer min-w-[170px] disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Style</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Pick Buttons from Curated Matches */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-[#9CA3AF]">Quick Picks:</span>
            {activePlayer.recommendedMatches.map(m => (
              <button
                key={m.id}
                onClick={() => setYoutubeUrl(m.youtubeUrl)}
                className="px-2.5 py-1 rounded-lg bg-[#0A0F1E] hover:bg-[#1F2937] text-slate-300 text-[11px] font-medium border border-[#1F2937] transition-all cursor-pointer"
              >
                {m.title.split(' ')[0]} {m.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card Breakdown */}
        {currentAnalysis && (
          <div className="space-y-6 pt-4 border-t border-[#1F2937]">
            
            {/* Banner */}
            <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={activePlayer.avatar}
                    alt={activePlayer.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00C853]/40 shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activePlayer.flag}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{activePlayer.name}</h3>
                    </div>
                    <p className="text-xs text-[#00C853] font-bold mt-0.5">{activePlayer.styleSubtitle}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF] mt-2">
                      <span>Dominant: <strong className="text-white">{activePlayer.dominantHand}-Handed</strong></span>
                      <span>•</span>
                      <span>Height: <strong className="text-white">{activePlayer.height}</strong></span>
                      <span>•</span>
                      <span>Titles: <strong className="text-white">{activePlayer.careerTitles}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <div className="bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1F2937] text-center">
                    <div className="text-[10px] text-[#9CA3AF]">Max Smash</div>
                    <div className="text-sm font-black text-[#00C853]">{activePlayer.stats.smashSpeedKmH} km/h</div>
                  </div>
                  <div className="bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1F2937] text-center">
                    <div className="text-[10px] text-[#9CA3AF]">Net Precision</div>
                    <div className="text-sm font-black text-amber-400">{activePlayer.stats.netAccuracy}%</div>
                  </div>
                  <div className="bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1F2937] text-center">
                    <div className="text-[10px] text-[#9CA3AF]">Win Rate</div>
                    <div className="text-sm font-black text-blue-400">{activePlayer.stats.winRate}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. SIGNATURE MOVES (5 Cards) */}
            <div className="space-y-3">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00C853]" />
                <span>1. Signature Shots & Repeat Tactical Patterns</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentAnalysis.signature_moves.map((move, idx) => (
                  <div key={idx} className="bg-[#0A0F1E] border border-[#1F2937] rounded-xl p-4 space-y-1.5 hover:border-[#00C853]/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black font-mono text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
                        MOVE #{idx + 1}
                      </span>
                      <span className="text-xs text-slate-500">Signature</span>
                    </div>
                    <p className="text-xs font-semibold text-white leading-relaxed">{move}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2, 3, 4, 5. DEEP TACTICAL BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>2. Movement Style & Court Coverage</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{currentAnalysis.movement_style}</p>
              </div>

              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>3. Attack Patterns & Setups</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{currentAnalysis.attack_patterns}</p>
              </div>

              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>4. Defensive Style Under Pressure</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{currentAnalysis.defensive_style}</p>
              </div>

              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>5. Mental Game & Tactical Management</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{currentAnalysis.mental_game}</p>
              </div>
            </div>

            {/* 6. LESSONS FOR AMATEURS */}
            <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-4">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>6. Lessons for Amateurs: What You Can Copy</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentAnalysis.lessons_for_amateurs.map((lesson, idx) => (
                  <div key={idx} className="bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 space-y-1">
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Lesson {idx + 1}</div>
                    <p className="text-xs text-slate-200 leading-relaxed">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. TRAINING DRILLS */}
            <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-4">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#00C853]" />
                <span>7. Targeted Training Drills to Build Similar Skills</span>
              </h4>
              <div className="space-y-2">
                {currentAnalysis.training_drills.map((drill, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#111827] p-3.5 rounded-xl border border-[#1F2937]">
                    <span className="w-6 h-6 rounded-lg bg-[#00C853]/10 text-[#00C853] text-xs font-black font-mono flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{drill}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 3: COMPARE WITH ME (Side-by-Side Comparison Workspace) */}
      <section id="react-compare-section" className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Head-to-Head Technical Gap Analysis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Compare Your Game With The Pros</h2>
            <p className="text-xs text-[#9CA3AF]">
              Evaluates your recent matches against world champion benchmarks with a 30-day technical roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#9CA3AF]">Compare With:</label>
            <select
              value={comparePlayer.id}
              onChange={(e) => handleFetchComparison(e.target.value)}
              className="bg-[#0A0F1E] border border-[#1F2937] text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#00C853] cursor-pointer"
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>
                  {p.flag} {p.name} ({p.playingStyle})
                </option>
              ))}
            </select>
          </div>
        </div>

        {isComparing ? (
          <div className="p-8 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#00C853]/30 border-t-[#00C853] rounded-full animate-spin"></div>
            <p className="text-xs text-[#9CA3AF]">Comparing your stats & style with {comparePlayer.name}...</p>
          </div>
        ) : comparisonResult && (
          <div className="space-y-8">
            
            {/* Coach Motivational Banner */}
            <div className="bg-gradient-to-r from-[#00C853]/15 via-[#111827] to-blue-500/15 border border-[#00C853]/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00C853] text-black font-black flex items-center justify-center shrink-0 text-lg">
                  💬
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white">AI Coach Encouragement & Synergy</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{comparisonResult.encouragement}</p>
                </div>
              </div>
            </div>

            {/* TWO COLUMN LAYOUT: Player vs Pro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEFT: Player Stats */}
              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <h3 className="text-base font-black text-white">{comparisonResult.player_name} (Your Game)</h3>
                    <p className="text-xs text-[#9CA3AF]">Aggregated from your analyzed matches</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/30">
                    Amateur Profile
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Smash Speed</span>
                    <span className="font-bold text-white">{comparisonResult.player_stats.smash_speed} km/h</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Match Win Rate</span>
                    <span className="font-bold text-white">{comparisonResult.player_stats.win_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Net Control</span>
                    <span className="font-bold text-white">{comparisonResult.player_stats.net_control}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Unforced Errors / Game</span>
                    <span className="font-bold text-rose-400">{comparisonResult.player_stats.unforced_errors}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Defensive Rating</span>
                    <span className="font-bold text-white">{comparisonResult.player_stats.defense_rating}/100</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Pro Player Stats */}
              <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={comparisonResult.pro_player_avatar}
                      alt={comparisonResult.pro_player_name}
                      className="w-9 h-9 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-base font-black text-white">
                        {comparisonResult.pro_player_flag} {comparisonResult.pro_player_name}
                      </h3>
                      <p className="text-xs text-[#00C853] font-bold">{comparisonResult.pro_player_style}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#00C853]/10 text-[#00C853] text-xs font-bold border border-[#00C853]/30">
                    Pro Benchmark
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Top Smash Speed</span>
                    <span className="font-bold text-[#00C853]">{comparisonResult.pro_stats.smash_speed} km/h</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Career Win Rate</span>
                    <span className="font-bold text-[#00C853]">{comparisonResult.pro_stats.win_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Net Accuracy</span>
                    <span className="font-bold text-[#00C853]">{comparisonResult.pro_stats.net_control}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Unforced Errors / Game</span>
                    <span className="font-bold text-emerald-400">{comparisonResult.pro_stats.unforced_errors}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                    <span className="text-slate-400">Defensive Rating</span>
                    <span className="font-bold text-[#00C853]">{comparisonResult.pro_stats.defense_rating}/100</span>
                  </div>
                </div>
              </div>

            </div>

            {/* SIMILARITIES */}
            <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>What You Already Do Like {comparisonResult.pro_player_name}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {comparisonResult.similarities.map((sim, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-[#1F2937] flex items-start gap-2">
                    <span className="text-[#00C853] font-bold">✓</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{sim}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TOP 5 TECHNICAL GAPS */}
            <div className="space-y-4">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00C853]" />
                <span>Top 5 Specific Differences in Technique & Execution</span>
              </h4>
              <div className="space-y-3">
                {comparisonResult.gaps.map((gap, idx) => (
                  <div key={idx} className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-5 space-y-3 hover:border-[#00C853]/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
                          GAP #{idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-white">{gap.gap}</h5>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase border ${
                        gap.impact === 'Critical' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                        gap.impact === 'High' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                        'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      }`}>
                        {gap.impact} Priority
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{gap.technical_detail}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className="bg-[#111827] p-2.5 rounded-xl border border-[#1F2937]">
                        <span className="text-[#9CA3AF]">Your Current Metric:</span>
                        <div className="font-bold text-rose-300 mt-0.5">{gap.amateur_metric}</div>
                      </div>
                      <div className="bg-[#111827] p-2.5 rounded-xl border border-[#1F2937]">
                        <span className="text-[#9CA3AF]">Pro Benchmark ({comparisonResult.pro_player_name}):</span>
                        <div className="font-bold text-[#00C853] mt-0.5">{gap.pro_benchmark}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 30-DAY IMPROVEMENT ROADMAP */}
            <div className="bg-[#0A0F1E] border border-[#1F2937] rounded-2xl p-6 space-y-5">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00C853]" />
                  <span>30-Day Technical Improvement Roadmap</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Structured 4-week progression designed to close your primary gap with {comparisonResult.pro_player_name}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisonResult.improvement_roadmap.map((week, idx) => (
                  <div key={idx} className="bg-[#111827] border border-[#1F2937] rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black font-mono text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
                          {week.week}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">Phase {idx + 1}</span>
                      </div>
                      <h5 className="text-xs font-black text-white">{week.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{week.focus_drill}</p>
                    </div>

                    <div className="bg-[#0A0F1E] p-2.5 rounded-xl border border-[#1F2937] text-[10px]">
                      <span className="text-[#00C853] font-bold">🎯 Target Outcome:</span>
                      <p className="text-slate-300 mt-0.5">{week.target_outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 4: PRO MATCH YOUTUBE LIBRARY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-[#00C853]" />
              <span>Pro Match YouTube Library</span>
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              Curated championship finals and milestone matches with tactical learning breakdowns.
            </p>
          </div>

          <div className="text-xs font-mono text-[#00C853] bg-[#00C853]/10 px-3 py-1.5 rounded-lg border border-[#00C853]/20">
            24 Curated Tournament Matches
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {players.flatMap(p => p.recommendedMatches.map(m => ({ ...m, player: p }))).map(m => (
            <div
              key={m.id}
              className="bg-[#111827] border border-[#1F2937] hover:border-[#00C853]/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0A0F1E] border border-[#1F2937]">
                  <img
                    src={m.thumbnailUrl}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono font-bold text-white rounded">
                    {m.duration}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#00C853] text-black text-[10px] font-black rounded">
                    {m.player.flag} {m.player.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-400">{m.tournament} ({m.year})</span>
                  <h4 className="text-xs font-black text-white group-hover:text-[#00C853] transition-colors line-clamp-1">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    vs <strong className="text-slate-200">{m.opponent}</strong> ({m.outcome})
                  </p>
                </div>

                <div className="bg-[#0A0F1E] p-2.5 rounded-xl border border-[#1F2937] text-[11px]">
                  <span className="text-[#00C853] font-bold">Key Insight:</span>
                  <p className="text-slate-300 line-clamp-2 mt-0.5">{m.keyLearning}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1F2937]">
                <button
                  onClick={() => handleSelectPlayer(m.player, m.youtubeUrl)}
                  className="px-3 py-2 rounded-xl bg-[#00C853] hover:bg-[#00B048] text-black text-xs font-black transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze</span>
                </button>
                <a
                  href={m.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#0A0F1E] hover:bg-[#1F2937] text-white text-xs font-bold border border-[#1F2937] transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>Watch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
