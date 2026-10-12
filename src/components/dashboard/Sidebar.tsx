import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Network,
  PlusCircle, 
  Bot, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  FileText, 
  Settings,
  Sparkles,
  X
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  badgeBg?: string;
  badgeText?: string;
}

const navItems: NavItem[] = [
  { 
    label: 'Home', 
    path: '/dashboard', 
    icon: <Home className="w-4 h-4" />
  },
  { 
    label: 'P2P Coordination', 
    path: '/dashboard/coordination', 
    icon: <Network className="w-4 h-4" />, 
    badge: 'NEW',
    badgeBg: 'bg-[#FFE9DC]',
    badgeText: 'text-[#F26B21]'
  },
  { 
    label: 'New Request', 
    path: '/dashboard/new-request', 
    icon: <PlusCircle className="w-4 h-4" />, 
    badge: 'HOT',
    badgeBg: 'bg-[#EDE7FF]',
    badgeText: 'text-[#7048E8]'
  },
  { 
    label: 'Agents', 
    path: '/dashboard/agents', 
    icon: <Bot className="w-4 h-4" />, 
    badge: '25',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-600'
  },
  { 
    label: 'Tasks', 
    path: '/dashboard/tasks', 
    icon: <CheckCircle2 className="w-4 h-4" />, 
    badge: '4 Live',
    badgeBg: 'bg-[#DDF6EC]',
    badgeText: 'text-[#0CA678]'
  },
  { 
    label: 'Payments', 
    path: '/dashboard/payments', 
    icon: <CreditCard className="w-4 h-4" />, 
    badge: 'x402',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-600'
  },
  { 
    label: 'Escrow', 
    path: '/dashboard/escrow', 
    icon: <Lock className="w-4 h-4" />, 
    badge: '2 Active',
    badgeBg: 'bg-[#FFE9DC]',
    badgeText: 'text-[#F26B21]'
  },
  { 
    label: 'Logs', 
    path: '/dashboard/logs', 
    icon: <FileText className="w-4 h-4" />, 
    badge: 'Live',
    badgeBg: 'bg-[#DDF6EC]',
    badgeText: 'text-[#0CA678]'
  },
  { 
    label: 'Settings', 
    path: '/dashboard/settings', 
    icon: <Settings className="w-4 h-4" />
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Fixed Left Sidebar ~280px wide */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        w-[280px] flex-shrink-0
        bg-[#FFFDFB]/95 backdrop-blur-md
        border-r border-orange-100/60
        flex flex-col justify-between py-6 px-4
        transition-transform duration-300 ease-in-out
        shadow-[4px_0_24px_rgba(242,107,33,0.03)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-2 mb-4">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              {/* Navy 4-point sparkle in a rounded square */}
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1B2559] shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                <svg className="w-5 h-5 text-[#1B2559]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5C12 7.7467 7.7467 12 2.5 12C7.7467 12 12 16.2533 12 21.5C12 16.2533 16.2533 12 21.5 12C16.2533 12 12 7.7467 12 2.5Z" />
                  <circle cx="4.5" cy="4.5" r="1.2" fill="#F26B21" />
                  <circle cx="19.5" cy="4.5" r="1.2" fill="#228BE6" />
                  <circle cx="19.5" cy="19.5" r="1.2" fill="#0CA678" />
                  <circle cx="4.5" cy="19.5" r="1.2" fill="#7048E8" />
                </svg>
              </div>
              <div>
                <div className="text-[17px] font-extrabold text-[#1B2559] leading-tight tracking-tight">AlgoVerse</div>
                <div className="text-[11px] text-[#8F9BBA] font-semibold">Multi-Agent P2P Mesh</div>
              </div>
            </Link>
            
            {/* Close button - mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1 overflow-y-auto no-scrollbar flex-1 pr-0.5">
            {navItems.map((item) => {
              const isHome = item.path === '/dashboard';
              const isActive = isHome 
                ? (location.pathname === '/dashboard' || location.pathname === '/')
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-3 py-1.5 rounded-xl font-bold text-[13px] transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FFE3D1] text-[#F26B21] shadow-2xs'
                      : 'text-[#5B6B8C] hover:bg-white/80 hover:text-[#1B2559]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Round icon badge on left */}
                    <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-transparent text-[#F26B21]' 
                        : 'bg-white/90 text-[#8F9BBA] group-hover:text-[#F26B21] group-hover:bg-[#FFE9DC]'
                    }`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border border-black/5 shadow-2xs ${item.badgeBg || 'bg-[#FFE9DC]'} ${item.badgeText || 'text-[#F26B21]'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Card: "Smarter agents. Stronger networks." over wave illustration */}
        <div className="relative pt-3 mt-3 border-t border-orange-100/60 overflow-hidden rounded-2xl bg-gradient-to-b from-white/70 to-white/95 p-3 shadow-2xs">
          <div className="flex items-center gap-2 relative z-10">
            <Sparkles className="w-4 h-4 text-[#1B2559] shrink-0" />
            <span className="text-[11.5px] font-extrabold text-[#1B2559] leading-snug">
              Smarter agents.<br />
              <span className="text-[#5B6B8C] font-semibold">Stronger networks.</span>
            </span>
          </div>

          {/* Soft peach and blue wave illustration */}
          <div className="h-8 -mb-3 -mx-3 mt-1.5 opacity-80 pointer-events-none">
            <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="sidebarWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD9BF" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#E6DDFB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DCEBFF" stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <path
                d="M0,12 C40,28 80,0 120,16 C160,32 180,8 200,20 L200,40 L0,40 Z"
                fill="url(#sidebarWaveGrad)"
              />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
