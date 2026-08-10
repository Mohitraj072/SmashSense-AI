import React from 'react';
import { LayoutDashboard, Upload, History, User as UserIcon } from 'lucide-react';

interface BottomNavProps {
  currentPage: 'login' | 'dashboard' | 'upload' | 'history' | 'profile';
  setCurrentPage: (page: 'login' | 'dashboard' | 'upload' | 'history' | 'profile') => void;
  isLoggedIn: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
}) => {
  if (!isLoggedIn) return null;

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'upload' as const,
      label: 'Upload',
      icon: Upload,
    },
    {
      id: 'history' as const,
      label: 'History',
      icon: History,
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: UserIcon,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0F1E]/95 backdrop-blur-lg border-t border-[#1F2937] md:hidden shadow-2xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-all cursor-pointer ${
                isActive ? 'text-[#00C853]' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-110 bg-[#00C853]/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold mt-0.5 tracking-tight ${isActive ? 'text-[#00C853]' : 'text-[#9CA3AF]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
