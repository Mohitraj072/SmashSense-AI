import React, { useState } from 'react';
import { User } from '../types';
import { Zap, ShieldCheck, Video, Flame, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
  defaultUser: User;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, defaultUser }) => {
  const [email, setEmail] = useState('alex.chen@badmintonai.com');
  const [password, setPassword] = useState('••••••••••••');
  const [playerName, setPlayerName] = useState('Alex Chen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      ...defaultUser,
      name: playerName || defaultUser.name,
      email: email || defaultUser.email,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: App Feature Highlights */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> AI Badminton Video Analytics Platform
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
            Analyze Match Video.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Expose Weaknesses & Opponent Patterns.
            </span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed">
            Upload your singles or doubles badminton recordings. Our specialized Gemini AI motor vision engine segments rallies, calculates smash speeds, maps court coverage heatmaps, and prescribes personalized drills.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Video Processing</h4>
                <p className="text-xs text-slate-400 mt-0.5">Automated rally length, shot type detection & error identification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Opponent Habit Engine</h4>
                <p className="text-xs text-slate-400 mt-0.5">Detect recurring opponent serves, drop triggers, & counter-tactics.</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Court Heatmap Tracking</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Biomechanical Analysis</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Customized Drills</span>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Player Portal Sign In</h2>
            <p className="text-xs text-slate-400 mt-1">Access your match analysis dashboard & AI performance reports</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Player Full Name</label>
              <input
                type="text"
                value={playerName ?? ''}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. Alex Chen"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email ?? ''}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="player@badminton.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password ?? ''}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all mt-2"
            >
              Sign In to Player Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <p className="text-xs text-center text-slate-400 mb-3">Or continue with pre-loaded demo account:</p>
            <button
              onClick={() => onLogin(defaultUser)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <img src={defaultUser.avatar} alt="Demo" className="w-6 h-6 rounded-full object-cover" />
                <span className="font-bold text-white">{defaultUser.name}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">{defaultUser.level}</span>
              </div>
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
