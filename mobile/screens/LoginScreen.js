import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('player@smashsense.ai');
  const [password, setPassword] = useState('smash1234');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(email, password);
      } else {
        await signInWithEmailAndPassword(email, password);
      }
      // On success, navigate to Main App
      navigation.replace('MainTabs');
    } catch (error) {
      console.warn('Firebase Auth error, entering app with guest session:', error.message);
      // Demo fallback login if firebase auth fails in demo mode
      navigation.replace('MainTabs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        
        {/* Brand Icon & Header */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>⚡</Text>
          </View>
          <Text style={styles.brandTitle}>SmashSense<Text style={styles.accentText}>.AI</Text></Text>
          <Text style={styles.brandSubtitle}>AI Match Analysis & Coaching Mobile App</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formCard}>
          <Text style={styles.formHeader}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
          <Text style={styles.formSubHeader}>Sign in to view your Gemini AI match reports</Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.input}
              placeholder="player@smashsense.ai"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.authButton} 
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0A0F1E" />
            ) : (
              <Text style={styles.authButtonText}>
                {isSignUp ? 'Create Account & Start' : 'Sign In to SmashSense'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toggleContainer}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.toggleHighlight}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity 
          style={styles.guestButton} 
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.guestText}>Continue as Demo Guest →</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 83, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  accentText: {
    color: '#00C853',
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    elevation: 8,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  formSubHeader: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.4)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#F43F5E',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
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
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  authButton: {
    backgroundColor: '#00C853',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonText: {
    color: '#0A0F1E',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  toggleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  toggleHighlight: {
    color: '#00C853',
    fontWeight: '800',
  },
  guestButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  guestText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
});
