import React, { useState } from 'react';
import { MatchAnalysis } from '../types';
import {
  Search,
  Zap,
  ChevronDown,
  X,
  Sparkles,
  ShieldAlert,
  Target,
  Flame,
  Activity,
  Trophy,
  ExternalLink,
  Share2,
  Trash2,
  Calendar,
  Clock,
  PlusCircle,
} from 'lucide-react';

interface MatchHistoryPageProps {
  matches: MatchAnalysis[];
  onDeleteMatch: (id: string) => void;
  selectedMatch: MatchAnalysis | null;
  onSelectMatch: (match: MatchAnalysis | null) => void;
  onNavigateToUpload: () => void;
}

export const MatchHistoryPage: React.FC<MatchHistoryPageProps> = ({
  matches,
  onDeleteMatch,
  selectedMatch,
  onSelectMatch,
  onNavigateToUpload,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Wins' | 'Losses' | 'This Month'>('All');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Filter logic
  const filteredMatches = matches.filter((m) => {
    const opponent = (m.opponentName || '').toLowerCase();
    const matchesSearch = opponent.includes(searchTerm.toLowerCase().trim());

    const isWin = m.result === 'Win' || m.result === 'WIN';
    const isLoss = m.result === 'Loss' || m.result === 'LOSS';

    let matchesFilter = true;
    if (activeFilter === 'Wins') {
      matchesFilter = isWin;
    } else if (activeFilter === 'Losses') {
      matchesFilter = isLoss;
    } else if (activeFilter === 'This Month') {
      if (m.date) {
        const matchDate = new Date(m.date);
        const now = new Date();
        matchesFilter =
          matchDate.getMonth() === now.getMonth() &&
          matchDate.getFullYear() === now.getFullYear();
      } else {
        matchesFilter = true;
      }
    }

    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* TOP HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F2937]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center text-[#00C853] font-bold text-xl">
            🏸
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F9FAFB] tracking-tight">
              Match History
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-xs font-bold font-mono">
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </span>
          </div>
        </div>

        <button
          onClick={onNavigateToUpload}
          className="px-4 py-2.5 rounded-xl bg-[#00C853] hover:bg-[#00C853]/90 text-[#0A0F1E] font-bold text-xs shadow-lg shadow-[#00C853]/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          <span>Upload New Match</span>
        </button>
      </div>

      {/* FILTER BUTTONS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#111827] p-4 rounded-2xl border border-[#1F2937]">
        
        {/* Row of filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Wins', 'Losses', 'This Month'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#00C853] text-[#0A0F1E] shadow-md shadow-[#00C853]/20'
                    : 'bg-[#0A0F1E] text-[#9CA3AF] hover:text-[#F9FAFB] border border-[#1F2937] hover:border-[#374151]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Search bar to search by opponent name */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by opponent name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0F1E] border border-[#1F2937] text-[#F9FAFB] text-base placeholder-[#9CA3AF]/60 focus:outline-none focus:border-[#00C853] transition-colors min-h-[44px] input-responsive"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* MATCH CARDS CONTAINER */}
      {filteredMatches.length > 0 ? (
        <div className="space-y-4">
          {filteredMatches.map((match, index) => {
            const isWin = match.result === 'Win' || match.result === 'WIN';
            const isExpanded = expandedCardId === match.id;

            // Rating logic fallback
            const ratingScore = match.overall_rating?.score
              ? match.overall_rating.score
              : isWin ? 8.5 : 6.8;

            // Key AI Insights extracted
            const keyVulnerability =
              match.player_weaknesses?.[0] ||
              match.weaknesses?.[0]?.description ||
              'Late shoulder turn and slow recovery in rear backhand corner.';

            const tacticalInsight =
              match.opponent_strategy ||
              match.aiSummary ||
              'Pin opponent to deep forehand corner and capitalize on weak net returns.';

            const coachRecommendation =
              match.improvement_areas?.[0] ||
              (match.improvementAreas?.[0]?.drillName
                ? `${match.improvementAreas[0].drillName}: ${match.improvementAreas[0].drillDescription}`
                : 'Execute daily shadow footwork drills focused on rapid rear recovery.');

            return (
              <div
                key={match.id}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`animate-fade-in-card bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[#374151] ${
                  isWin ? 'border-l-4 border-l-[#00C853]' : 'border-l-4 border-l-[#FF6B35]'
                }`}
              >
                {/* CARD MAIN ROW */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* LEFT & CENTER CONTENT */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    
                    {/* Large W or L badge with color */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-sm ${
                        isWin
                          ? 'bg-[#00C853]/15 text-[#00C853] border border-[#00C853]/30'
                          : 'bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30'
                      }`}
                    >
                      {isWin ? 'W' : 'L'}
                    </div>

                    {/* Center details */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[18px] font-bold text-[#F9FAFB] leading-tight truncate">
                          {match.opponentName || 'Opponent Player'}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0A0F1E] border border-[#1F2937] text-[#9CA3AF] font-medium">
                          {match.category || "Men's Singles"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[12px] text-[#9CA3AF]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#00C853]" />
                          {match.date || '2026-08-08'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#3B82F6]" />
                          {match.durationMinutes || 45} mins
                        </span>
                        {match.tournament && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[150px]">{match.tournament}</span>
                          </>
                        )}
                      </div>

                      <div className="text-sm font-bold font-mono text-[#F9FAFB] pt-0.5">
                        {match.score || '21-18, 19-21, 21-15'}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT SIDE ACTIONS */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    
                    {/* Small Circular AI Rating Badge (Hidden on iPhone SE / <= 375px) */}
                    <div className="ai-rating-badge w-11 h-11 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 flex flex-col items-center justify-center shrink-0 shadow-sm">
                      <span className="text-xs font-black text-[#00C853] leading-none">
                        {ratingScore}
                      </span>
                      <span className="text-[7px] font-bold text-[#9CA3AF] uppercase tracking-tighter mt-0.5">
                        RATING
                      </span>
                    </div>

                    {/* Green View Analysis Button */}
                    <button
                      onClick={() => toggleExpand(match.id)}
                      className="bg-[#00C853] hover:bg-[#00C853]/90 text-[#0A0F1E] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#00C853]/10 flex items-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <span>{isExpanded ? 'Hide Analysis' : 'View Analysis'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                  </div>

                </div>

                {/* EXPANDED INLINE AI INSIGHTS */}
                {isExpanded && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-[#1F2937] space-y-3 bg-[#0A0F1E]/60 transition-all duration-300">
                    <div className="p-4 rounded-xl bg-[#0A0F1E] border border-[#1F2937] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]">
                        <h4 className="text-xs font-bold text-[#00C853] uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" /> AI Key Analysis Insights
                        </h4>
                        <span className="text-[11px] text-[#9CA3AF]">
                          Biomechanical & Tactical Breakdown
                        </span>
                      </div>

                      {/* 3 Bullet Points of AI Insights Inline */}
                      <ul className="space-y-2.5 text-xs">
                        <li className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#FF6B35] mt-1 shrink-0" />
                          <div>
                            <strong className="text-[#FF6B35]">Key Vulnerability:</strong>{' '}
                            <span className="text-[#F9FAFB]">{keyVulnerability}</span>
                          </div>
                        </li>

                        <li className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#3B82F6] mt-1 shrink-0" />
                          <div>
                            <strong className="text-[#3B82F6]">Tactical Insight:</strong>{' '}
                            <span className="text-[#F9FAFB]">{tacticalInsight}</span>
                          </div>
                        </li>

                        <li className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#00C853] mt-1 shrink-0" />
                          <div>
                            <strong className="text-[#00C853]">Coach Recommendation:</strong>{' '}
                            <span className="text-[#F9FAFB]">{coachRecommendation}</span>
                          </div>
                        </li>
                      </ul>

                      {/* Footer Actions Inside Expanded Card */}
                      <div className="pt-3 border-t border-[#1F2937] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectMatch(match)}
                            className="px-3 py-1.5 rounded-lg bg-[#00C853]/10 hover:bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Full Modal Breakdown
                          </button>

                          <a
                            href={`/results.html?id=${match.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[#00C853] border border-[#00C853]/40 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Share2 className="w-3.5 h-3.5" /> Share Report
                          </a>
                        </div>

                        <button
                          onClick={() => onDeleteMatch(match.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#FF6B35]/20 text-[#9CA3AF] hover:text-[#FF6B35] border border-[#1F2937] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Record
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE WHEN NO MATCHES MATCH FILTERS OR LIST IS EMPTY */
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-12 text-center space-y-4 flex flex-col items-center justify-center my-6">
          <div className="w-20 h-20 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center text-4xl text-[#00C853]">
            🏸
          </div>
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-xl font-bold text-[#F9FAFB]">No matches yet</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Upload your first match video to receive comprehensive AI biomechanical & tactical breakdown.
            </p>
          </div>
          <button
            onClick={onNavigateToUpload}
            className="px-6 py-3 rounded-xl bg-[#00C853] hover:bg-[#00C853]/90 text-[#0A0F1E] font-bold text-sm shadow-lg shadow-[#00C853]/20 transition-all flex items-center gap-2 cursor-pointer mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Your First Match</span>
          </button>
        </div>
      )}

      {/* DETAILED MATCH ANALYSIS MODAL (when selectedMatch is set) */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 bg-[#0A0F1E]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border border-[#1F2937] rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => onSelectMatch(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0F1E] hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="space-y-2 pr-12">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                  selectedMatch.result === 'Win' || selectedMatch.result === 'WIN'
                    ? 'bg-[#00C853] text-[#0A0F1E]'
                    : 'bg-[#FF6B35] text-white'
                }`}>
                  {selectedMatch.result} ({selectedMatch.score})
                </span>
                <span className="text-xs text-[#9CA3AF]">{selectedMatch.tournament} • {selectedMatch.category}</span>
              </div>
              <h2 className="text-2xl font-black text-[#F9FAFB]">{selectedMatch.title}</h2>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <p className="text-xs text-[#9CA3AF]">
                  vs <strong className="text-[#F9FAFB]">{selectedMatch.opponentName}</strong> ({selectedMatch.opponentStyle})
                </p>
                <a
                  href="/results.html"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    try {
                      localStorage.setItem('latest_match_analysis', JSON.stringify({
                        player_weaknesses: selectedMatch.player_weaknesses || selectedMatch.weaknesses.map(w => w.description),
                        improvement_areas: selectedMatch.improvement_areas || selectedMatch.improvementAreas.map(a => a.drillDescription),
                        physical_recommendations: selectedMatch.physical_recommendations || 'Focus on lateral mobility and core rotational stability.',
                        recommended_exercises: selectedMatch.recommended_exercises || [
                          { exercise: 'Single-Leg Bounds', sets: '4', reps: '12 per side' },
                          { exercise: 'Rotational Throws', sets: '3', reps: '15 per side' }
                        ],
                        opponent_weaknesses: selectedMatch.opponent_weaknesses || ['Shallow clears when under pressure'],
                        opponent_strategy: selectedMatch.opponent_strategy || 'Pin to deep forehand corner and drop tight.',
                        overall_rating: selectedMatch.overall_rating || { score: 8, reasoning: selectedMatch.aiSummary }
                      }));
                    } catch(e) {}
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#0A0F1E] hover:bg-[#1F2937] text-[#00C853] border border-[#00C853]/30 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View HTML Report (/results.html)
                </a>
              </div>
            </div>

            {/* AI Summary Banner */}
            <div className="p-4 rounded-2xl bg-[#0A0F1E] border border-[#1F2937] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#00C853] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> AI Executive Summary
                </h4>
                {selectedMatch.overall_rating && (
                  <span className="px-3 py-1 rounded-full bg-[#00C853]/20 border border-[#00C853]/40 text-[#00C853] text-xs font-black">
                    Overall Rating: {selectedMatch.overall_rating.score}/10
                  </span>
                )}
              </div>
              <p className="text-xs text-[#F9FAFB] leading-relaxed">{selectedMatch.aiSummary}</p>
              {selectedMatch.overall_rating?.reasoning && (
                <p className="text-[11px] text-[#9CA3AF] italic pt-1 border-t border-[#1F2937]">
                  Coach Rating Reasoning: {selectedMatch.overall_rating.reasoning}
                </p>
              )}
            </div>

            {/* Coach Prescribed Specific Keys Section */}
            {(selectedMatch.player_weaknesses?.length > 0 || selectedMatch.physical_recommendations) && (
              <div className="p-5 rounded-2xl bg-[#0A0F1E] border border-[#1F2937] space-y-5">
                <h3 className="text-sm font-extrabold text-[#F9FAFB] flex items-center gap-2 border-b border-[#1F2937] pb-2">
                  <Trophy className="w-4 h-4 text-amber-400" /> Gemini Coach Report Breakdown
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Player Weaknesses */}
                  {selectedMatch.player_weaknesses?.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                      <h4 className="text-xs font-bold text-[#FF6B35] flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" /> Player Weaknesses Observed
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#9CA3AF] list-disc list-inside">
                        {selectedMatch.player_weaknesses.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvement Areas */}
                  {selectedMatch.improvement_areas?.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                      <h4 className="text-xs font-bold text-[#00C853] flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" /> Improvement Areas & Drills
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#9CA3AF] list-disc list-inside">
                        {selectedMatch.improvement_areas.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Opponent Weaknesses */}
                  {selectedMatch.opponent_weaknesses?.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" /> Opponent Weaknesses Observed
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#9CA3AF] list-disc list-inside">
                        {selectedMatch.opponent_weaknesses.map((ow, idx) => (
                          <li key={idx}>{ow}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Opponent Strategy */}
                  {selectedMatch.opponent_strategy && (
                    <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                      <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> Strategy vs Opponent
                      </h4>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">{selectedMatch.opponent_strategy}</p>
                    </div>
                  )}
                </div>

                {/* Physical Recommendations */}
                {selectedMatch.physical_recommendations && (
                  <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-1.5">
                    <h4 className="text-xs font-bold text-purple-400">Physical Conditioning Advice</h4>
                    <p className="text-xs text-[#9CA3AF]">{selectedMatch.physical_recommendations}</p>
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#1F2937] flex justify-end">
              <button
                onClick={() => onSelectMatch(null)}
                className="px-6 py-2.5 rounded-xl bg-[#00C853] hover:bg-[#00C853]/90 text-[#0A0F1E] font-bold text-xs cursor-pointer"
              >
                Close Analysis Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
