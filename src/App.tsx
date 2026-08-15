import React, { useState, useEffect } from 'react';
import { MatchAnalysis, User } from './types';
import { INITIAL_MATCHES, INITIAL_USER } from './mockData';
import { fetchMatchesFromSupabase, saveMatchToSupabase } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { UploadMatchPage } from './components/UploadMatchPage';
import { MatchHistoryPage } from './components/MatchHistoryPage';
import { PlayerProfilePage } from './components/PlayerProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'upload' | 'history' | 'profile'>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [matches, setMatches] = useState<MatchAnalysis[]>(INITIAL_MATCHES);
  const [selectedMatch, setSelectedMatch] = useState<MatchAnalysis | null>(null);

  // Load real matches from Supabase database (Requirement 4 & 5)
  useEffect(() => {
    fetchMatchesFromSupabase()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMatches(data);
        } else {
          // Fallback to server API /matches
          fetch('/api/matches')
            .then((res) => (res.ok ? res.json() : null))
            .then((serverData) => {
              if (serverData && Array.isArray(serverData) && serverData.length > 0) {
                setMatches(serverData);
              }
            })
            .catch((err) => console.log('Using local initial matches fallback', err));
        }
      })
      .catch((err) => {
        console.warn('Supabase fetch notice:', err);
      });

    fetch('/api/user')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => console.log('Using local user initial fallback', err));
  }, []);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleMatchAnalyzed = async (newMatch: MatchAnalysis) => {
    setMatches((prev) => [newMatch, ...prev]);
    setSelectedMatch(newMatch);
    setCurrentPage('history');

    // Save to Supabase (Requirement 3 & 6)
    try {
      await saveMatchToSupabase(newMatch);
      if (typeof (window as any).showSupabaseToast === 'function') {
        (window as any).showSupabaseToast('Match analysis saved to Supabase database successfully! ⚡', true);
      }
    } catch (err) {
      console.warn('Supabase auto-save notice:', err);
    }
  };

  const handleDeleteMatch = (id: string) => {
    fetch(`/api/matches/${id}`, { method: 'DELETE' })
      .then(() => {
        setMatches((prev) => prev.filter((m) => m.id !== id));
        if (selectedMatch?.id === id) setSelectedMatch(null);
      })
      .catch((err) => {
        setMatches((prev) => prev.filter((m) => m.id !== id));
        if (selectedMatch?.id === id) setSelectedMatch(null);
      });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    }).catch((err) => console.log('Error persisting user update:', err));
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F9FAFB] font-sans selection:bg-[#00C853] selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Dynamic View Rendering */}
      <main className="pb-20 mobile-bottom-padding">
        {!isLoggedIn || currentPage === 'login' ? (
          <LoginPage onLogin={handleLogin} defaultUser={user} />
        ) : currentPage === 'dashboard' ? (
          <DashboardPage
            user={user}
            matches={matches}
            onSelectMatch={(match) => {
              setSelectedMatch(match);
              setCurrentPage('history');
            }}
            onNavigateToUpload={() => setCurrentPage('upload')}
            onNavigateToHistory={() => setCurrentPage('history')}
          />
        ) : currentPage === 'upload' ? (
          <UploadMatchPage
            onMatchAnalyzed={handleMatchAnalyzed}
            onCancel={() => setCurrentPage('dashboard')}
          />
        ) : currentPage === 'history' ? (
          <MatchHistoryPage
            matches={matches}
            onDeleteMatch={handleDeleteMatch}
            selectedMatch={selectedMatch}
            onSelectMatch={setSelectedMatch}
            onNavigateToUpload={() => setCurrentPage('upload')}
          />
        ) : currentPage === 'profile' ? (
          <PlayerProfilePage
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        ) : null}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SmashSense.AI — Badminton Video Performance Analytics</p>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Powered by Gemini AI Engine</span>
            <span>•</span>
            <span>Biomechanical Computer Vision</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
