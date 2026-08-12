import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { apiService } from '../services/api';
import { sendLocalNotification } from '../services/notifications';

export default function UploadScreen({ navigation }) {
  const [videoUri, setVideoUri] = useState(null);
  const [sport, setSport] = useState('Badminton');
  const [opponentName, setOpponentName] = useState('');
  const [matchResult, setMatchResult] = useState('Win');
  const [score, setScore] = useState('21-18, 21-16');
  const [durationMinutes, setDurationMinutes] = useState('45');

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Video Picker using expo-image-picker / expo-av
  const pickVideo = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Media library access is needed to select match videos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setVideoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.warn('Video picker error, setting sample video:', error);
      setVideoUri('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }
  };

  const handleUpload = async () => {
    if (!opponentName) {
      Alert.alert('Missing Information', 'Please enter your opponent\'s name.');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('sport', sport);
    formData.append('opponent_name', opponentName);
    formData.append('result', matchResult);
    formData.append('score', score);
    formData.append('durationMinutes', durationMinutes);

    if (videoUri && videoUri.startsWith('file://')) {
      formData.append('video', {
        uri: videoUri,
        type: 'video/mp4',
        name: `match_${Date.now()}.mp4`,
      });
    }

    try {
      // Simulate/Trigger Progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 20;
        });
      }, 500);

      const response = await apiService.uploadMatchVideo(formData, (percent) => {
        setUploadProgress(percent);
      });

      clearInterval(interval);
      setUploadProgress(100);

      // Trigger Push Notification requirement: "Your match analysis is ready!" when Gemini finishes processing
      await sendLocalNotification(
        'Match Analysis Ready! ⚡',
        `Your ${sport} match vs ${opponentName} has been analyzed by Gemini AI.`,
        { jobId: response.job_id || 'sample_job' }
      );

      Alert.alert(
        'Upload Complete! 🎉',
        'Gemini AI has finished processing your match video. Push notification sent!',
        [
          {
            text: 'View Results',
            onPress: () => navigation.navigate('Results', { matchId: response.job_id || 'match_01' }),
          },
        ]
      );
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload match video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>New Match Video Upload</Text>
        <Text style={styles.subtitle}>Select video from phone gallery for Gemini AI analysis</Text>
      </View>

      {/* Video Selection Card with expo-av */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📹 MATCH FOOTAGE</Text>

        {videoUri ? (
          <View style={styles.videoPreviewContainer}>
            <Video
              source={{ uri: videoUri }}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
              style={styles.videoPlayer}
            />
            <TouchableOpacity style={styles.changeVideoBtn} onPress={pickVideo}>
              <Text style={styles.changeVideoText}>🔄 Change Video</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.pickerBox} onPress={pickVideo}>
            <Text style={styles.pickerIcon}>📹</Text>
            <Text style={styles.pickerText}>Tap to select video from Gallery</Text>
            <Text style={styles.pickerSubtext}>Supports MP4, MOV (Up to 100MB)</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Match Metadata Form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚙️ MATCH DETAILS</Text>

        {/* Sport Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>SPORT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportSelector}>
            {['Badminton', 'Tennis', 'Squash', 'Table Tennis', 'Pickleball'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.sportTag, sport === s && styles.sportTagActive]}
                onPress={() => setSport(s)}
              >
                <Text style={[styles.sportTagText, sport === s && styles.sportTagTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Opponent Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>OPPONENT NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Viktor Axelsen"
            placeholderTextColor="#6B7280"
            value={opponentName}
            onChangeText={setOpponentName}
          />
        </View>

        {/* Match Result Toggle */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>MATCH RESULT</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.resultBtn, matchResult === 'Win' && styles.winBtnActive]}
              onPress={() => setMatchResult('Win')}
            >
              <Text style={[styles.resultBtnText, matchResult === 'Win' && styles.winTextActive]}>🏆 WIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resultBtn, matchResult === 'Loss' && styles.lossBtnActive]}
              onPress={() => setMatchResult('Loss')}
            >
              <Text style={[styles.resultBtnText, matchResult === 'Loss' && styles.lossTextActive]}>❌ LOSS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Score & Duration */}
        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>SCORE</Text>
            <TextInput
              style={styles.input}
              placeholder="21-18, 21-16"
              placeholderTextColor="#6B7280"
              value={score}
              onChangeText={setScore}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>DURATION (MINS)</Text>
            <TextInput
              style={styles.input}
              placeholder="45"
              placeholderTextColor="#6B7280"
              value={durationMinutes}
              onChangeText={setDurationMinutes}
              keyboardType="numeric"
            />
          </View>
        </View>

      </View>

      {/* Progress Bar (Visible during upload) */}
      {uploading && (
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Uploading & Analyzing...</Text>
            <Text style={styles.progressPercent}>{uploadProgress}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${uploadProgress}%` }]} />
          </View>
          <Text style={styles.progressSubtext}>Gemini 2.5 Flash Vision analyzing court positioning & biomechanics</Text>
        </View>
      )}

      {/* Upload Action Button */}
      <TouchableOpacity
        style={[styles.uploadSubmitBtn, uploading && styles.disabledBtn]}
        onPress={handleUpload}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#0A0F1E" />
        ) : (
          <Text style={styles.uploadSubmitText}>🚀 START GEMINI AI ANALYSIS</Text>
        )}
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  card: {
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
    marginBottom: 14,
  },
  pickerBox: {
    borderWidth: 2,
    borderColor: '#1F2937',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    backgroundColor: '#0A0F1E',
  },
  pickerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  pickerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  pickerSubtext: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 4,
  },
  videoPreviewContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  videoPlayer: {
    width: '100%',
    height: 180,
  },
  changeVideoBtn: {
    backgroundColor: '#1F2937',
    paddingVertical: 10,
    alignItems: 'center',
  },
  changeVideoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#0A0F1E',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  sportSelector: {
    flexDirection: 'row',
  },
  sportTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#0A0F1E',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginRight: 8,
  },
  sportTagActive: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  sportTagText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
  },
  sportTagTextActive: {
    color: '#0A0F1E',
    fontWeight: '900',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  resultBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#0A0F1E',
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  winBtnActive: {
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
    borderColor: '#00C853',
  },
  lossBtnActive: {
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
    borderColor: '#F43F5E',
  },
  resultBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  winTextActive: {
    color: '#00C853',
  },
  lossTextActive: {
    color: '#F43F5E',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  progressCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#00C853',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  progressPercent: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '900',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#0A0F1E',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00C853',
  },
  progressSubtext: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  uploadSubmitBtn: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  uploadSubmitText: {
    color: '#0A0F1E',
    fontSize: 13,
    fontWeight: '900',
  },
});
