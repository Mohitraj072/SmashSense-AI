import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  TextInput 
} from 'react-native';
import { apiService } from '../services/api';

export default function HistoryScreen({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMatchHistory = async () => {
    try {
      const result = await apiService.getMatches('All');
      setMatches(result.matches || []);
      setIsOfflineMode(result.isOffline || false);
    } catch (err) {
      console.warn('Failed fetching match history:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMatchHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadMatchHistory();
  };

  const filteredMatches = matches.filter((m) => {
    const opp = (m.opponentName || m.opponent_name || '').toLowerCase();
    const sport = (m.sport || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return opp.includes(query) || sport.includes(query);
  });

  const renderMatchCard = ({ item }) => {
    const isWin = item.result === 'Win' || item.result === 'WIN';
    const ratingScore = item.overall_rating?.score || item.ai_rating || 8.2;

    return (
      <TouchableOpacity 
        style={styles.matchCard}
        onPress={() => navigation.navigate('Results', { matchId: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.sportBadgeRow}>
            <Text style={styles.sportBadgeText}>{item.sport || 'Badminton'}</Text>
            <Text style={styles.matchDate}>{item.date || '2026-08-10'}</Text>
          </View>

          <View style={[styles.resultPill, isWin ? styles.winPill : styles.lossPill]}>
            <Text style={[styles.resultPillText, isWin ? styles.winPillText : styles.lossPillText]}>
              {isWin ? 'WIN' : 'LOSS'}
            </Text>
          </View>
        </View>

        <Text style={styles.opponentName}>
          vs {item.opponentName || item.opponent_name || 'Opponent'}
        </Text>

        <Text style={styles.scoreText}>Score: {item.score || '21-18, 21-16'}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.weaknessSnippet} numberOfLines={1}>
            ⚠️ {item.weaknesses?.[0]?.description || item.player_weaknesses?.[0] || 'Overhead backhand corner recovery'}
          </Text>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingScore}>{ratingScore}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C853" />
        <Text style={styles.loadingText}>Loading Match History...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Match History</Text>
          <Text style={styles.headerSubtitle}>
            {matches.length} Total Gemini AI Reports
          </Text>
        </View>

        {isOfflineMode && (
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineBadgeText}>⚡ OFFLINE CACHE (5 MATCHES)</Text>
          </View>
        )}
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search opponent or sport..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Match Cards FlatList */}
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id || String(Math.random())}
        renderItem={renderMatchCard}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No match reports found.</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  offlineBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offlineBadgeText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '900',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  matchCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sportBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sportBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#00C853',
    textTransform: 'uppercase',
  },
  matchDate: {
    fontSize: 10,
    color: '#6B7280',
  },
  resultPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  winPill: {
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
  },
  lossPill: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
  },
  resultPillText: {
    fontSize: 10,
    fontWeight: '900',
  },
  winPillText: {
    color: '#00C853',
  },
  lossPillText: {
    color: '#F43F5E',
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  scoreText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    paddingTop: 10,
  },
  weaknessSnippet: {
    fontSize: 11,
    color: '#E5E7EB',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    backgroundColor: '#0A0F1E',
    borderWidth: 1,
    borderColor: '#00C853',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '900',
    color: '#00C853',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 13,
  },
});
