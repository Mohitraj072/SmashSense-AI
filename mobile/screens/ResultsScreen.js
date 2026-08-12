import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { apiService } from '../services/api';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ResultsScreen({ route, navigation }) {
  const matchId = route.params?.matchId || 'match_01';
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    weaknesses: true,
    drills: true,
    shots: false,
    opponent: false,
    exercises: false,
  });

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const { matches } = await apiService.getMatches('All');
        const found = matches.find((m) => m.id === matchId) || matches[0];
        setMatchData(found);
      } catch (err) {
        console.warn('Error loading match details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [matchId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C853" />
        <Text style={styles.loadingText}>Fetching Gemini AI Match Report...</Text>
      </View>
    );
  }

  const match = matchData || {};
  const ratingScore = match.overall_rating?.score || match.ai_rating || 8.5;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Header Banner */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTag}>GEMINI 2.5 FLASH REPORT</Text>
      </View>

      {/* Match Headline Banner */}
      <View style={styles.matchHeroCard}>
        <View style={styles.heroTextCol}>
          <Text style={styles.sportBadge}>{match.sport || 'Badminton'} Match</Text>
          <Text style={styles.matchTitle}>vs {match.opponentName || match.opponent_name || 'Opponent'}</Text>
          <Text style={styles.matchDate}>{match.date || '2026-08-12'} • {match.score || '21-18, 21-16'}</Text>
        </View>

        <View style={styles.ratingBadge}>
          <Text style={styles.ratingLabel}>AI RATING</Text>
          <Text style={styles.ratingScore}>{ratingScore}</Text>
          <Text style={styles.ratingSub}>/ 10</Text>
        </View>
      </View>

      {/* SECTION 1: AI Coach Summary (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('summary')}>
          <Text style={styles.sectionTitle}>⚡ AI COACH SYNTHESIS</Text>
          <Text style={styles.expandIcon}>{expandedSections.summary ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.summary && (
          <View style={styles.sectionBody}>
            <Text style={styles.summaryText}>
              {match.aiSummary || match.summary || 'Player displayed high explosive movement during early sets, maintaining 72% net tape control. Strategic improvements identified in rear court overhead clearance.'}
            </Text>
          </View>
        )}
      </View>

      {/* SECTION 2: Observed Vulnerabilities (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('weaknesses')}>
          <Text style={styles.sectionTitle}>⚠️ OBSERVED VULNERABILITIES</Text>
          <Text style={styles.expandIcon}>{expandedSections.weaknesses ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.weaknesses && (
          <View style={styles.sectionBody}>
            {(match.player_weaknesses || match.weaknesses || [
              { description: 'Late shoulder turn on backhand rear corner recovery.' },
              { description: 'Over-relying on high risk flat drives during Set 3.' }
            ]).map((w, idx) => (
              <View key={idx} style={styles.weaknessItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.weaknessItemText}>{typeof w === 'string' ? w : w.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* SECTION 3: Prescribed Drills (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('drills')}>
          <Text style={styles.sectionTitle}>🎯 PRESCRIBED CORRECTION DRILLS</Text>
          <Text style={styles.expandIcon}>{expandedSections.drills ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.drills && (
          <View style={styles.sectionBody}>
            {(match.improvement_areas || match.improvementAreas || [
              { drillName: 'Scissor Kick Rear Corner Recovery', drillDescription: '4 sets x 15 reps shadow court shuffles.' },
              { drillName: 'Precision Drop Shot Net Clearance', drillDescription: 'Multi-shuttle feeding drill (50 shuttles).' }
            ]).map((drill, idx) => (
              <View key={idx} style={styles.drillBox}>
                <Text style={styles.drillName}>📍 {typeof drill === 'string' ? drill : drill.drillName}</Text>
                {drill.drillDescription ? (
                  <Text style={styles.drillDesc}>{drill.drillDescription}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* SECTION 4: Shot Distribution (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('shots')}>
          <Text style={styles.sectionTitle}>📊 SHOT FREQUENCY DISTRIBUTION</Text>
          <Text style={styles.expandIcon}>{expandedSections.shots ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.shots && (
          <View style={styles.sectionBody}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Smash Percentage</Text>
              <Text style={styles.statVal}>30% (High Power)</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Drop Shots</Text>
              <Text style={styles.statVal}>22%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>High Defensive Clears</Text>
              <Text style={styles.statVal}>18%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Net Tumbling Controls</Text>
              <Text style={styles.statVal}>14%</Text>
            </View>
          </View>
        )}
      </View>

      {/* SECTION 5: Opponent Tactical Counter (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('opponent')}>
          <Text style={styles.sectionTitle}>⚔️ OPPONENT SCOUTING COUNTER</Text>
          <Text style={styles.expandIcon}>{expandedSections.opponent ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.opponent && (
          <View style={styles.sectionBody}>
            <Text style={styles.opponentStrategyText}>
              {match.opponent_strategy || 'Opponent exhibits slight hesitation on rapid cross-court returns. Maintain flat low drive exchanges to suppress their jump smash zone.'}
            </Text>
          </View>
        )}
      </View>

      {/* SECTION 6: Biomechanical Conditioning (Expandable) */}
      <View style={styles.sectionCard}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('exercises')}>
          <Text style={styles.sectionTitle}>💪 BIOMECHANICAL CONDITIONING</Text>
          <Text style={styles.expandIcon}>{expandedSections.exercises ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSections.exercises && (
          <View style={styles.sectionBody}>
            {(match.recommended_exercises || [
              { exercise: 'Weighted Rotational Medicine Ball Slams', sets: '4', reps: '12 per side' },
              { exercise: 'Single-Leg Lateral Bounds', sets: '3', reps: '15 reps' }
            ]).map((ex, idx) => (
              <View key={idx} style={styles.exRow}>
                <Text style={styles.exTitle}>{ex.exercise}</Text>
                <Text style={styles.exSpecs}>{ex.sets} Sets x {ex.reps}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  headerTag: {
    fontSize: 10,
    fontWeight: '900',
    color: '#00C853',
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchHeroCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTextCol: {
    flex: 1,
    marginRight: 12,
  },
  sportBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00C853',
    textTransform: 'uppercase',
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  matchDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  ratingBadge: {
    backgroundColor: '#0A0F1E',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: '#00C853',
    alignItems: 'center',
    minWidth: 75,
  },
  ratingLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#9CA3AF',
  },
  ratingScore: {
    fontSize: 26,
    fontWeight: '900',
    color: '#00C853',
    lineHeight: 28,
  },
  ratingSub: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 14,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111827',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  expandIcon: {
    fontSize: 12,
    color: '#00C853',
    fontWeight: '800',
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    paddingTop: 12,
  },
  summaryText: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 20,
  },
  weaknessItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletDot: {
    color: '#F43F5E',
    fontSize: 16,
    marginRight: 8,
    lineHeight: 18,
  },
  weaknessItemText: {
    color: '#E5E7EB',
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  drillBox: {
    backgroundColor: '#0A0F1E',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 8,
  },
  drillName: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '800',
  },
  drillDesc: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  opponentStrategyText: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  exRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  exTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  exSpecs: {
    color: '#00C853',
    fontSize: 11,
    fontWeight: '800',
  },
});
