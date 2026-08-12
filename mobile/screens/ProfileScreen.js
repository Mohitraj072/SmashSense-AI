import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Alert 
} from 'react-native';
import { signOut, auth } from '../services/firebase';
import { apiService } from '../services/api';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUser(data);
      } catch (err) {
        console.warn('Profile load error:', err);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of SmashSense.AI?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (err) {
              console.warn('Sign out error:', err);
            }
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Player Header Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>AC</Text>
        </View>

        <Text style={styles.userName}>{user?.name || 'Alex Chen'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'alex.chen@smashsense.ai'}</Text>
        
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>⚡ {user?.level || 'Advanced Tier'}</Text>
        </View>
      </View>

      {/* Player Stats Overview */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>📊 ATHLETE PROFILE METRICS</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statVal}>{user?.overallRating || 84}</Text>
            <Text style={styles.statLbl}>AI Rating</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statVal}>{user?.winRate || 68}%</Text>
            <Text style={styles.statLbl}>Win Rate</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statVal}>{user?.matchesAnalyzed || 12}</Text>
            <Text style={styles.statLbl}>Analyzed</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚙️ APP SETTINGS</Text>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDesc}>Notify when Gemini analysis completes</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#1F2937', true: '#00C853' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>AsyncStorage Offline Cache</Text>
            <Text style={styles.settingDesc}>Cache last 5 match reports offline</Text>
          </View>
          <Switch
            value={offlineCacheEnabled}
            onValueChange={setOfflineCacheEnabled}
            trackColor={{ false: '#1F2937', true: '#00C853' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* App Info & Backend Link */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 APP & API DETAILS</Text>
        <Text style={styles.infoText}>Backend API: Flask + Gemini 2.5 Flash</Text>
        <Text style={styles.infoText}>SDK Version: Expo 51 / React Native 0.74</Text>
        <Text style={styles.infoText}>Firebase Auth: JS SDK v9 Active</Text>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>🚪 Sign Out of SmashSense.AI</Text>
      </TouchableOpacity>

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
  profileCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
    borderWidth: 2,
    borderColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#00C853',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 83, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    color: '#00C853',
    fontSize: 11,
    fontWeight: '900',
  },
  statsCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#00C853',
    letterSpacing: 1,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLbl: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#1F2937',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  settingDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  logoutBtn: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.4)',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#F43F5E',
    fontSize: 13,
    fontWeight: '900',
  },
});
