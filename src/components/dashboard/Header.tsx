import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-[72px] bg-white/70 backdrop-blur-md border-b border-orange-100/50 flex items-center justify-between px-5 md:px-8 sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl hover:bg-orange-50/60 flex items-center justify-center text-slate-600 transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Pill */}
        <div className="w-full max-w-md">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#8F9BBA] shrink-0" />
            <input
              type="text"
              placeholder="Search events, agents, or requests..."
              className="w-full bg-white/90 border border-slate-200/80 rounded-full py-2 pl-10 pr-4 text-[13px] text-[#1B2559] placeholder-[#8F9BBA] focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Right side Profile & Notifications */}
      <div className="flex items-center gap-4">
        {/* Notifications with Orange Dot */}
        <button className="relative w-9 h-9 rounded-full bg-white/80 border border-slate-100 hover:bg-white flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-2xs">
          <Bell className="w-4 h-4 text-[#1B2559]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#F26B21] rounded-full border border-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 cursor-pointer bg-white/70 hover:bg-white/90 border border-slate-100/80 rounded-full py-1 px-1.5 pr-3 transition-all shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center font-bold text-xs flex-shrink-0">
            MS
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[13px] font-bold text-[#1B2559]">Meera Sharma</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8F9BBA]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
