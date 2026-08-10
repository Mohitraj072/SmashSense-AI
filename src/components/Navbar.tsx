import React, { useState } from 'react';
import { User } from '../types';
import {
  LayoutDashboard,
  Upload,
  History,
  Users,
  TrendingUp,
  Calendar,
  LogOut,
  Zap,
  Menu,
  X,
  Star,
  User as UserIcon,
} from 'lucide-react';

interface NavbarProps {
  currentPage: 'login' | 'dashboard' | 'upload' | 'history' | 'profile';
  setCurrentPage: (page: 'login' | 'dashboard' | 'upload' | 'history' | 'profile') => void;
  user: User | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  user,
  isLoggedIn,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 font-sans shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Brand Logo & Title Only */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() => setCurrentPage(isLoggedIn ? 'dashboard' : 'login')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              SmashSense<span className="text-emerald-400">.AI</span>
            </span>
          </div>

          {/* Center: Clean Navigation Links with Icons (Desktop >= 1024px) */}
          {isLoggedIn && (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  currentPage === 'dashboard'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 border-transparent'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('upload');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  currentPage === 'upload'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 border-transparent'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Match</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('history');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  currentPage === 'history'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 border-transparent'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Match History</span>
              </button>

              <a
                href="/opponent_report.html"
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 transition-all flex items-center gap-1.5 border border-transparent"
              >
                <Users className="w-4 h-4" />
                <span>Opponents</span>
              </a>

              <a
                href="/progress.html"
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 transition-all flex items-center gap-1.5 border border-transparent"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Progress</span>
              </a>

              <a
                href="/training_plan.html"
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 transition-all flex items-center gap-1.5 border border-transparent"
              >
                <Calendar className="w-4 h-4" />
                <span>Training Plan</span>
              </a>
            </nav>
          )}

          {/* Right Side: Profile Avatar + Name + Rating Badge + Sign Out */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center gap-2.5 bg-slate-950/60 hover:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left leading-tight">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</p>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mt-0.5">
                      <Star className="w-2.5 h-2.5 fill-emerald-400 stroke-emerald-400" />
                      <span>{user.overallRating || 8.5}</span> Rating
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-bold border border-slate-700 hover:border-rose-500/30 transition-all flex items-center gap-1.5"
                  title="Sign out of your account"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Right Side Hamburger Icon (< 1024px / <=768px) */}
          {isLoggedIn && (
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Full-Width Drawer from Left (< 1024px / <=768px) */}
      {isLoggedIn && mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] w-full h-full bg-[#0A0F1E] text-[#F9FAFB] flex flex-col justify-between p-6 overflow-y-auto animate-slide-in-left shadow-2xl">
          
          {/* Drawer Top Header with Logo and Close Button */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                  <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  SmashSense<span className="text-[#00C853]">.AI</span>
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vertical Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border min-h-[44px] cursor-pointer ${
                  currentPage === 'dashboard'
                    ? 'text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30'
                    : 'text-[#9CA3AF] hover:bg-[#111827] hover:text-white border-transparent'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('upload');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border min-h-[44px] cursor-pointer ${
                  currentPage === 'upload'
                    ? 'text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30'
                    : 'text-[#9CA3AF] hover:bg-[#111827] hover:text-white border-transparent'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>Upload Match</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('history');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border min-h-[44px] cursor-pointer ${
                  currentPage === 'history'
                    ? 'text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30'
                    : 'text-[#9CA3AF] hover:bg-[#111827] hover:text-white border-transparent'
                }`}
              >
                <History className="w-5 h-5" />
                <span>Match History</span>
              </button>

              <a
                href="/opponent_report.html"
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-[#9CA3AF] hover:bg-[#111827] hover:text-white transition-all flex items-center gap-3 border border-transparent min-h-[44px]"
              >
                <Users className="w-5 h-5" />
                <span>Opponents Dossier</span>
              </a>

              <a
                href="/progress.html"
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-[#9CA3AF] hover:bg-[#111827] hover:text-white transition-all flex items-center gap-3 border border-transparent min-h-[44px]"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Progress Analytics</span>
              </a>

              <a
                href="/training_plan.html"
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-[#9CA3AF] hover:bg-[#111827] hover:text-white transition-all flex items-center gap-3 border border-transparent min-h-[44px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Training Plan</span>
              </a>

              <button
                onClick={() => {
                  setCurrentPage('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border min-h-[44px] cursor-pointer ${
                  currentPage === 'profile'
                    ? 'text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30'
                    : 'text-[#9CA3AF] hover:bg-[#111827] hover:text-white border-transparent'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile Settings</span>
              </button>
            </div>
          </div>

          {/* Drawer Bottom Footer with User Profile Info & Sign Out */}
          <div className="pt-6 border-t border-[#1F2937] space-y-4 my-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#111827] border border-[#1F2937]">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00C853]/40"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#00C853]/20 text-[#00C853] flex items-center justify-center font-bold">
                    👤
                  </div>
                )}
                <div>
                  <span className="text-sm font-bold text-white block">{user?.name || 'Lee Zii Jia'}</span>
                  <span className="text-xs text-[#00C853] font-extrabold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#00C853] stroke-[#00C853]" />
                    <span>{user?.overallRating || 8.5}</span> Rating
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/30 transition-all flex items-center gap-1.5 min-h-[44px] cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};

