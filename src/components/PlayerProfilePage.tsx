import React, { useState } from 'react';
import { User } from '../types';
import {
  User as UserIcon,
  Award,
  Zap,
  Target,
  ShieldCheck,
  Save,
  CheckCircle2,
  Trophy,
  Flame,
  Activity,
  Sliders,
} from 'lucide-react';

interface PlayerProfilePageProps {
  user: User;
  onUpdateUser: (updated: User) => void;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [level, setLevel] = useState<User['level']>(user.level);
  const [dominantHand, setDominantHand] = useState<User['dominantHand']>(user.dominantHand);
  const [playingStyle, setPlayingStyle] = useState<User['playingStyle']>(user.playingStyle);
  const [racketModel, setRacketModel] = useState(user.racketModel);
  const [stringTension, setStringTension] = useState(user.stringTension);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      level,
      dominantHand,
      playingStyle,
      racketModel,
      stringTension,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-xl"
            referrerPolicy="no-referrer"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {user.level} Level
              </span>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              {user.dominantHand}-Handed • {user.playingStyle} • Racket: {user.racketModel} ({user.stringTension})
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Overall Rating: <span className="text-emerald-400">{user.overallRating}</span></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Win Rate: <span className="text-cyan-400">{user.winRate}%</span></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Matches Analyzed: <span className="text-amber-400">{user.matchesAnalyzed}</span></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Settings Form & Drills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Profile & Equipment Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Player Equipment & Athletic Profile
            </h3>
            {isSaved && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Updated!
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Classification</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as User['level'])}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dominant Hand</label>
                <select
                  value={dominantHand}
                  onChange={(e) => setDominantHand(e.target.value as User['dominantHand'])}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Right">Right Handed</option>
                  <option value="Left">Left Handed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Playing Style</label>
              <select
                value={playingStyle}
                onChange={(e) => setPlayingStyle(e.target.value as User['playingStyle'])}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Aggressive Attacker">Aggressive Attacker (Heavy Smash)</option>
                <option value="Defensive Counter-Attacker">Defensive Counter-Attacker</option>
                <option value="Control / Net Specialist">Control / Net Specialist</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Racquet Model</label>
                <input
                  type="text"
                  value={racketModel}
                  onChange={(e) => setRacketModel(e.target.value)}
                  placeholder="e.g. Yonex Astrox 88D Pro"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">String & Tension</label>
                <input
                  type="text"
                  value={stringTension}
                  onChange={(e) => setStringTension(e.target.value)}
                  placeholder="e.g. BG80 @ 28 lbs"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all mt-4"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </form>

        {/* Right Side: AI Customized Weekly Training Plan */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                AI Prescribed Weekly Drills
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Drill #1: Corner Footwork Shadow</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">Urgent</span>
                </div>
                <p className="text-xs text-white font-medium">Deep Backhand Corner Recovery</p>
                <p className="text-[11px] text-slate-400 mt-1">4 sets x 15 corner transitions focusing on hip turn and immediate split step back to T.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">Drill #2: High-Speed Multi-Shuttle</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">Recommended</span>
                </div>
                <p className="text-xs text-white font-medium">Set 3 Stamina & Flat Drive Endurance</p>
                <p className="text-[11px] text-slate-400 mt-1">20 shuttles continuous rapid feeding with 30s rest intervals.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Drill #3: Net Tumbling Precision</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">Secondary</span>
                </div>
                <p className="text-xs text-white font-medium">Spinning Net Drops under Pressure</p>
                <p className="text-[11px] text-slate-400 mt-1">Practice brushing bottom of shuttle near net tape to force high lifts.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
