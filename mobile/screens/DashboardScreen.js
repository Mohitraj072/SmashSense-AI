import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { apiService } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSport, setSelectedSport] = useState('Badminton');

  const fetchDashboardData = async () => {
    try {
      const data = await apiService.getStats(selectedSport);
      setStats(data);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedSport]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C853" />
        <Text style={styles.loadingText}>Loading SmashSense Stats...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00C853" />
      }
    >
      {/* Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Player Dashboard</Text>
          <Text style={styles.headerSubtitle}>Real-time Gemini AI performance overview</Text>
        </View>

        <TouchableOpacity 
          style={styles.uploadNavBtn} 
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.uploadNavBtnText}>+ Analyze</Text>
        </TouchableOpacity>
      </View>

      {/* Sport Selector Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportScroll}>
        {['Badminton', 'Tennis', 'Squash', 'Table Tennis', 'Pickleball'].map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[styles.sportPill, selectedSport === sport && styles.sportPillActive]}
            onPress={() => setSelectedSport(sport)}
          >
            <Text style={[styles.sportPillText, selectedSport === sport && styles.sportPillTextActive]}>
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Primary KPI Stats Grid Cards */}
      <View style={styles.statsGrid}>
        
        {/* Card 1: AI Rating */}
        <View style={[styles.statCard, styles.ratingCard]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>AI PERFORMANCE RATING</Text>
            <Text style={styles.cardIcon}>⚡</Text>
          </View>
          <Text style={styles.ratingValue}>{stats?.aiRating || '8.4'}</Text>
          <Text style={styles.cardSubtext}>Top 15% in Advanced Tier</Text>
        </View>

        {/* Card 2: Win Rate */}
        <View style={styles.statCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>WIN RATE</Text>
            <Text style={styles.cardIcon}>🏆</Text>
          </View>
          <Text style={styles.winRateValue}>{stats?.winRate || 68}%</Text>
          <Text style={styles.cardSubtext}>{stats?.totalMatches || 12} Matches Analyzed</Text>
        </View>

        {/* Card 3: Weakness Index */}
        <View style={styles.statCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>WEAKNESS INDEX</Text>
            <Text style={styles.cardIcon}>⚠️</Text>
          </View>
          <Text style={styles.weaknessValue}>{stats?.weaknessIndex || 32}</Text>
          <Text style={styles.cardSubtext}>Low Vulnerability Score</Text>
        </View>

      </View>

      {/* Top Weakness Highlight Card */}
      <View style={styles.weaknessBanner}>
        <View style={styles.weaknessHeader}>
          <Text style={styles.weaknessTitle}>⚠️ Primary Target Vulnerability</Text>
          <Text style={styles.weaknessTag}>HIGH PRIORITY</Text>
        </View>
        <Text style={styles.weaknessDesc}>
          {stats?.mostCommonWeakness || 'Late shoulder turn when returning deep overhead clears.'}
        </Text>
        <TouchableOpacity 
          style={styles.drillActionBtn}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.drillActionText}>View Prescribed Drills →</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Action Navigation Buttons */}
      <View style={styles.actionGrid}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.actionIcon}>📹</Text>
          <Text style={styles.actionTitle}>Upload Match Video</Text>
          <Text style={styles.actionSub}>Gemini 2.5 Flash Vision</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.actionIcon}>📜</Text>
          <Text style={styles.actionTitle}>Match History</Text>
          <Text style={styles.actionSub}>Cached Reports</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  contentContainer: {
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
  uploadNavBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  uploadNavBtnText: {
    color: '#0A0F1E',
    fontWeight: '900',
    fontSize: 12,
  },
  sportScroll: {
    marginBottom: 20,
  },
  sportPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginRight: 8,
  },
  sportPillActive: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  sportPillText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  sportPillTextActive: {
    color: '#0A0F1E',
    fontWeight: '900',
  },
  statsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  ratingCard: {
    borderColor: 'rgba(0, 200, 83, 0.4)',
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
  cardIcon: {
    fontSize: 16,
  },
  ratingValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00C853',
  },
  winRateValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#3B82F6',
  },
  weaknessValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F59E0B',
  },
  cardSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  weaknessBanner: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  weaknessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weaknessTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F43F5E',
  },
  weaknessTag: {
    fontSize: 9,
    fontWeight: '900',
    color: '#F43F5E',
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weaknessDesc: {
    fontSize: 13,
    color: '#E5E7EB',
    lineHeight: 18,
    marginBottom: 12,
  },
  drillActionBtn: {
    alignSelf: 'flex-start',
  },
  drillActionText: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '800',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  actionSub: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 2,
  },
});
