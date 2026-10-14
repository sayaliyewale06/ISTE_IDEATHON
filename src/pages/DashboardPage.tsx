import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import { 
  Zap, 
  Users, 
  ShieldCheck, 
  Wallet, 
  ChevronDown, 
  HeartHandshake, 
  Truck, 
  CircleDollarSign, 
  Search, 
  Headphones, 
  Share2, 
  Cpu, 
  CreditCard,
  ArrowRight
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const [greetingText, setGreetingText] = useState('Good afternoon, Meera');

  // Dynamic greeting by time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreetingText('Good morning, Meera');
    } else if (hour >= 12 && hour < 17) {
      setGreetingText('Good afternoon, Meera');
    } else {
      setGreetingText('Good afternoon, Meera'); // Defaulting to afternoon as shown in reference or evening if desired
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        
        {/* ================= ROW 1: HERO HEADER ================= */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 pb-1">
          {/* Left: Greeting + Subtitle */}
          <div className="relative z-10 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[40px] font-extrabold text-[#1B2559] tracking-tight leading-tight flex items-center gap-3 whitespace-nowrap">
              <span>{greetingText}</span>
              {/* Cute Stylized Sun SVG matching reference */}
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F26B21] shrink-0" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="6" stroke="#F59E0B" strokeWidth="2.5" fill="#FEF3C7" />
                <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.2 2.2M23 23l2.2 2.2M6.8 25.2l2.2-2.2M23 9l2.2-2.2" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="text-[#5B6B8C] text-xs sm:text-sm md:text-[14.5px] mt-2 leading-relaxed font-medium">
              Your AI agents are working across the P2P mesh.<br className="hidden sm:inline" />
              Here's what's happening in your network today.
            </p>
          </div>

          {/* Right: Friendly White Robot Mascot + Soft Blobs + Caveat Tagline */}
          <div className="relative flex items-center justify-end min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] h-[150px] md:h-[175px] -mt-2 shrink-0">
            
            {/* Soft blurred pastel background aura */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-8">
              <div className="w-56 h-36 bg-gradient-to-tr from-[#FFD9BF]/40 via-[#E6DDFB]/45 to-[#DCEBFF]/50 rounded-full blur-2xl"></div>
              <div className="absolute top-2 right-16 w-24 h-24 bg-[#FFD9BF]/35 rounded-full blur-xl"></div>
              <div className="absolute bottom-2 right-32 w-28 h-20 bg-[#DCEBFF]/45 rounded-full blur-xl"></div>
            </div>

            {/* Robot Mascot SVG + Laptop + Clouds */}
            <div className="relative z-10 w-[210px] h-[170px] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-sm overflow-visible">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="cloudPeach" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE5D3" />
                    <stop offset="100%" stopColor="#FFD2B2" />
                  </linearGradient>
                  <linearGradient id="cloudLavender" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EFEBFF" />
                    <stop offset="100%" stopColor="#D8CAFD" />
                  </linearGradient>
                  <linearGradient id="cloudBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2EFFF" />
                    <stop offset="100%" stopColor="#CBE2FE" />
                  </linearGradient>
                  <linearGradient id="robotBody" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EEF2F6" />
                  </linearGradient>
                  <linearGradient id="robotVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                  <linearGradient id="earModule" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CBE2FE" />
                    <stop offset="100%" stopColor="#93C5FD" />
                  </linearGradient>
                  <linearGradient id="laptopLid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2A3859" />
                    <stop offset="100%" stopColor="#18233C" />
                  </linearGradient>
                </defs>

                {/* Soft Puffy Cloud Blobs at Robot Base */}
                <ellipse cx="65" cy="165" rx="36" ry="22" fill="url(#cloudLavender)" opacity="0.85" />
                <ellipse cx="145" cy="168" rx="42" ry="24" fill="url(#cloudPeach)" opacity="0.9" />
                <ellipse cx="105" cy="174" rx="46" ry="22" fill="url(#cloudBlue)" opacity="0.85" />
                <ellipse cx="178" cy="158" rx="26" ry="18" fill="url(#cloudPeach)" opacity="0.75" />
                <ellipse cx="38" cy="156" rx="24" ry="16" fill="url(#cloudLavender)" opacity="0.7" />

                {/* Small floating spheres & sparkles */}
                <circle cx="32" cy="120" r="4" fill="#8B5CF6" opacity="0.4" />
                <circle cx="195" cy="128" r="5" fill="#F26B21" opacity="0.4" />
                <circle cx="48" cy="85" r="3" fill="#3B82F6" opacity="0.5" />
                <path d="M190 70 L192 75 L197 77 L192 79 L190 84 L188 79 L183 77 L188 75 Z" fill="#F26B21" opacity="0.7" />
                <path d="M40 60 L41.5 64 L45.5 65.5 L41.5 67 L40 71 L38.5 67 L34.5 65.5 L38.5 64 Z" fill="#3B82F6" opacity="0.6" />

                {/* Antenna */}
                <line x1="110" y1="46" x2="110" y2="34" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                <circle cx="110" cy="32" r="5.5" fill="#38BDF8" />
                <circle cx="110" cy="32" r="3" fill="#FFFFFF" opacity="0.7" />

                {/* Robot Head Body */}
                <rect x="68" y="46" width="84" height="68" rx="28" fill="url(#robotBody)" stroke="#E2E8F0" strokeWidth="1.5" />

                {/* Robot Ears / Side Modules */}
                <rect x="61" y="64" width="8" height="24" rx="4" fill="url(#earModule)" />
                <rect x="151" y="64" width="8" height="24" rx="4" fill="url(#earModule)" />

                {/* Dark Visor Screen */}
                <rect x="76" y="56" width="68" height="46" rx="18" fill="url(#robotVisor)" />

                {/* Specular Highlight on Visor */}
                <path d="M84 62 Q110 56 136 62" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" fill="none" />

                {/* Smiling Eyes inside Visor */}
                <path d="M88 78 Q96 70 102 78" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M118 78 Q124 70 132 78" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />

                {/* Friendly Smile */}
                <path d="M106 88 Q110 92 114 88" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Robot Torso / Arms */}
                <rect x="80" y="112" width="60" height="42" rx="16" fill="url(#robotBody)" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="90" cy="132" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="130" cy="132" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

                {/* Laptop Lid (Held by Robot) */}
                <polygon points="85,145 135,145 142,122 78,122" fill="url(#laptopLid)" stroke="#334155" strokeWidth="1" />
                {/* 4-point Sparkle Star on Back of Laptop Lid */}
                <path 
                  d="M110 128 C110 133 108 134 103 134 C108 134 110 135 110 140 C110 135 112 134 117 134 C112 134 110 133 110 128 Z" 
                  fill="#FFFFFF" 
                  filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
                />
              </svg>
            </div>

            {/* Handwritten Tagline using Caveat font */}
            <div 
              className="relative z-20 pointer-events-none ml-1 sm:ml-2" 
              style={{ transform: 'rotate(-6deg)' }}
            >
              <div className="text-left">
                {/* 3 Small Orange Accent Strokes Above */}
                <div className="flex items-center gap-1 mb-1 pl-1">
                  <span className="w-2.5 h-0.5 bg-[#F26B21] rounded-full transform -rotate-25"></span>
                  <span className="w-3.5 h-0.5 bg-[#F26B21] rounded-full transform -rotate-12"></span>
                  <span className="w-2 h-0.5 bg-[#F26B21] rounded-full transform rotate-6"></span>
                </div>

                <span 
                  className="text-[#1B2559] font-handwriting text-[22px] md:text-[24px] font-bold leading-tight block filter drop-shadow-2xs select-none"
                  style={{ letterSpacing: '0.01em' }}
                >
                  Networks<br />
                  create<br />
                  opportunities
                </span>

                {/* 3 Small Orange Accent Strokes Below */}
                <div className="flex items-center gap-1 mt-1 pl-3">
                  <span className="w-3 h-0.5 bg-[#F26B21] rounded-full transform -rotate-12"></span>
                  <span className="w-2.5 h-0.5 bg-[#F26B21] rounded-full transform rotate-12"></span>
                  <span className="w-1.5 h-0.5 bg-[#F26B21] rounded-full transform rotate-25"></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= ROW 2: 4 STAT CARDS IN ONE CONTAINER ================= */}
        <div className="p-2 sm:p-2.5 bg-white/80 backdrop-blur-[12px] rounded-[24px] border border-white/90 shadow-[0_8px_30px_rgba(242,107,33,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* Card 1: Requests Today (Orange/Peach Tint) */}
            <div className="relative rounded-[20px] p-5 border border-white/80 shadow-2xs backdrop-blur-[12px] bg-gradient-to-br from-[#FFF5EE] via-[#FFF9F5] to-[#FFEFE6] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(242,107,33,0.09)] transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center shadow-2xs">
                  <Zap className="w-5 h-5 fill-[#F26B21]" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-[12px] font-semibold text-[#5B6B8C] tracking-wide block">Requests Today</span>
                <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight mt-0.5">42</div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF6EC] text-[#0CA678] border border-[#0CA678]/15">
                  <span>↑</span> 12%
                </span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32" fill="none">
                    <defs>
                      <linearGradient id="sparkOrange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F26B21" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#F26B21" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,24 Q20,22 35,16 T65,18 T85,8 T100,6 L100,32 L0,32 Z" fill="url(#sparkOrange)" />
                    <path d="M0,24 Q20,22 35,16 T65,18 T85,8 T100,6" stroke="#F26B21" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Active Agents (Lavender Tint) */}
            <div className="relative rounded-[20px] p-5 border border-white/80 shadow-2xs backdrop-blur-[12px] bg-gradient-to-br from-[#F8F5FF] via-[#FAF8FF] to-[#F2EDFF] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(139,92,246,0.09)] transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#EDE7FF] text-[#8B5CF6] flex items-center justify-center shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-[12px] font-semibold text-[#5B6B8C] tracking-wide block">Active Agents</span>
                <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight mt-0.5">5</div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF6EC] text-[#0CA678] border border-[#0CA678]/15">
                  <span>↑</span> 2
                </span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32" fill="none">
                    <defs>
                      <linearGradient id="sparkPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,24 Q20,26 40,18 T70,20 T90,12 T100,14 L100,32 L0,32 Z" fill="url(#sparkPurple)" />
                    <path d="M0,24 Q20,26 40,18 T70,20 T90,12 T100,14" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Success Rate (Mint Tint) */}
            <div className="relative rounded-[20px] p-5 border border-white/80 shadow-2xs backdrop-blur-[12px] bg-gradient-to-br from-[#F0FDF8] via-[#F6FEFA] to-[#E6FAF2] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(16,185,129,0.09)] transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#DDF6EC] text-[#10B981] flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-[12px] font-semibold text-[#5B6B8C] tracking-wide block">Success Rate</span>
                <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight mt-0.5">98.5%</div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF6EC] text-[#0CA678] border border-[#0CA678]/15">
                  <span>↑</span> 0.8%
                </span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32" fill="none">
                    <defs>
                      <linearGradient id="sparkGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,26 Q25,24 50,17 T75,14 T100,8 L100,32 L0,32 Z" fill="url(#sparkGreen)" />
                    <path d="M0,26 Q25,24 50,17 T75,14 T100,8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 4: Settled Volume (Light Blue Tint) */}
            <div className="relative rounded-[20px] p-5 border border-white/80 shadow-2xs backdrop-blur-[12px] bg-gradient-to-br from-[#F2F7FF] via-[#F8FBFF] to-[#E8F1FF] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(59,130,246,0.09)] transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#E3EFFF] text-[#3B82F6] flex items-center justify-center shadow-2xs">
                  <Wallet className="w-5 h-5" />
                </div>
                {/* 5 agents online badge at top right */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 border border-slate-100 text-[10.5px] font-semibold text-slate-700 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>5 agents online</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-[12px] font-semibold text-[#5B6B8C] tracking-wide block">Settled Volume</span>
                <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight mt-0.5">
                  $148.50 <span className="text-sm font-semibold text-[#8F9BBA]">USD</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF6EC] text-[#0CA678] border border-[#0CA678]/15">
                  <span>↑</span> 24%
                </span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32" fill="none">
                    <defs>
                      <linearGradient id="sparkBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,27 Q20,28 45,20 T75,18 T100,9 L100,32 L0,32 Z" fill="url(#sparkBlue)" />
                    <path d="M0,27 Q20,28 45,20 T75,18 T100,9" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= PS FOCUS: AUTONOMOUS AGENT MESH & DEADLOCK BANNER ================= */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-gradient-to-r from-[#FFF5EE] via-[#FFF9F5] to-[#EDE7FF] border border-[#F26B21]/20 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFE9DC] text-[#F26B21] border border-[#F26B21]/20 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider">
                PS 2: Agentic AI & Autonomous Systems
              </span>
              <span className="text-[11px] text-[#5B6B8C] font-semibold">Chandy-Misra-Haas Deadlock Detection &amp; Invariant Safety</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B2559] tracking-tight">
              Coordination Without Central Control: Autonomous Agent Resilience
            </h2>
            <p className="text-xs text-[#5B6B8C] max-w-3xl leading-relaxed">
              Equipped with distributed bilateral negotiation, real-time edge-chasing cycle detection (&lt;180ms), fault injection suites, and quantitative benchmark against centralized baselines.
            </p>
          </div>
          <Link
            to="/dashboard/coordination"
            className="w-full sm:w-auto text-center px-4.5 py-2.5 bg-gradient-to-r from-[#FF8A4C] to-[#F26B21] hover:from-[#FF7E36] hover:to-[#E25C14] text-white font-bold text-xs rounded-xl shadow-[0_4px_14px_rgba(242,107,33,0.3)] transition-all shrink-0 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <span>Launch P2P Framework →</span>
          </Link>
        </div>

        {/* ================= ROW 3: 3-COLUMN SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ================= COLUMN 1 (LEFT, WIDE ~ 5 COLS) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* 7. Network Performance Card */}
            <GlassCard className="flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Network Performance</h2>
                <button 
                  onClick={() => setTimeRange(timeRange === 'Last 7 days' ? 'Last 30 days' : 'Last 7 days')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/80 text-xs font-bold text-[#5B6B8C] hover:bg-white transition-colors cursor-pointer"
                >
                  <span>{timeRange}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8F9BBA]" />
                </button>
              </div>

              {/* Multi-line Area Chart with smooth curves & soft gradient fills */}
              <div className="relative w-full h-52 my-1">
                <svg className="w-full h-full" viewBox="0 0 460 170" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F26B21" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#F26B21" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="areaSuccessful" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="areaFailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="areaAgents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="30" y1="20" x2="450" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="55" x2="450" y2="55" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="90" x2="450" y2="90" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="125" x2="450" y2="125" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="150" x2="450" y2="150" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Y Axis labels: 0 to 40 in steps of 10 */}
                  <text x="5" y="24" fontSize="10" fill="#8F9BBA" fontWeight="600">40</text>
                  <text x="5" y="59" fontSize="10" fill="#8F9BBA" fontWeight="600">30</text>
                  <text x="5" y="94" fontSize="10" fill="#8F9BBA" fontWeight="600">20</text>
                  <text x="5" y="129" fontSize="10" fill="#8F9BBA" fontWeight="600">10</text>
                  <text x="12" y="153" fontSize="10" fill="#8F9BBA" fontWeight="600">0</text>

                  {/* Fills under each line */}
                  {/* Requests Area Fill */}
                  <path 
                    d="M 40,118 C 80,105 110,120 145,108 C 180,95 210,102 245,80 C 275,60 310,65 345,45 C 380,48 410,62 445,42 L 445,150 L 40,150 Z" 
                    fill="url(#areaRequests)" 
                  />
                  {/* Successful Area Fill */}
                  <path 
                    d="M 40,132 C 80,122 110,132 145,124 C 180,115 210,118 245,102 C 275,88 310,95 345,80 C 380,82 410,95 445,78 L 445,150 L 40,150 Z" 
                    fill="url(#areaSuccessful)" 
                  />
                  {/* Failed Area Fill */}
                  <path 
                    d="M 40,146 C 80,140 110,144 145,138 C 180,134 210,136 245,126 C 275,118 310,122 345,112 C 380,115 410,124 445,110 L 445,150 L 40,150 Z" 
                    fill="url(#areaFailed)" 
                  />
                  {/* Active Agents Area Fill */}
                  <path 
                    d="M 40,154 C 80,152 110,150 145,148 C 180,146 210,145 245,138 C 275,134 310,138 345,132 C 380,134 410,138 445,130 L 445,150 L 40,150 Z" 
                    fill="url(#areaAgents)" 
                  />

                  {/* 4 Line series */}
                  {/* Requests (orange, highest) */}
                  <path 
                    d="M 40,118 C 80,105 110,120 145,108 C 180,95 210,102 245,80 C 275,60 310,65 345,45 C 380,48 410,62 445,42" 
                    fill="none" 
                    stroke="#F26B21" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                  />
                  {/* Successful (blue) */}
                  <path 
                    d="M 40,132 C 80,122 110,132 145,124 C 180,115 210,118 245,102 C 275,88 310,95 345,80 C 380,82 410,95 445,78" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                  {/* Failed (green) */}
                  <path 
                    d="M 40,146 C 80,140 110,144 145,138 C 180,134 210,136 245,126 C 275,118 310,122 345,112 C 380,115 410,124 445,110" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                  />
                  {/* Active Agents (purple, lowest) */}
                  <path 
                    d="M 40,154 C 80,152 110,150 145,148 C 180,146 210,145 245,138 C 275,134 310,138 345,132 C 380,134 410,138 445,130" 
                    fill="none" 
                    stroke="#8B5CF6" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>

              {/* X Axis Dates */}
              <div className="flex justify-between pl-6 pr-2 text-[10.5px] font-bold text-[#8F9BBA]">
                <span>Oct 12</span>
                <span>Oct 13</span>
                <span>Oct 14</span>
                <span>Oct 15</span>
                <span>Oct 16</span>
                <span>Oct 17</span>
                <span>Oct 18</span>
              </div>

              {/* Legend at bottom in ONE single line */}
              <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-slate-100/60 text-[11px] font-bold text-[#5B6B8C]">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F26B21]"></span>
                  Requests
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                  Successful
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  Failed
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                  Active Agents
                </span>
              </div>
            </GlassCard>

            {/* 11. Bottom Banner Card (under Network Performance) */}
            <GlassCard className="bg-gradient-to-r from-[#FFF5EE] via-[#FFF9F5] to-[#FFEFE6] border-orange-100/80 flex flex-col sm:flex-row items-center gap-5 p-5.5">
              {/* Mesh Illustration with central purple AI chip node and orbiting colored nodes */}
              <div className="w-32 h-32 shrink-0 relative flex items-center justify-center">
                <div className="absolute inset-1 rounded-full bg-orange-200/35 animate-pulse pointer-events-none"></div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
                  <line x1="70" y1="70" x2="30" y2="32" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70" y1="70" x2="110" y2="28" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70" y1="70" x2="118" y2="92" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70" y1="70" x2="32" y2="105" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70" y1="70" x2="70" y2="128" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {/* Central Purple "AI" chip node */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-purple-200/80 flex flex-col items-center justify-center text-purple-600 relative z-10 group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <span className="text-[8.5px] font-extrabold text-purple-700 tracking-wider">AI</span>
                </div>

                {/* Orbiting nodes (red, purple, orange, blue) */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-rose-100 border border-rose-200 text-rose-500 flex items-center justify-center shadow-2xs">
                  <HeartHandshake className="w-3 h-3" />
                </div>
                <div className="absolute top-1 right-3 w-6 h-6 rounded-full bg-purple-100 border border-purple-200 text-purple-600 flex items-center justify-center shadow-2xs">
                  <Truck className="w-3 h-3" />
                </div>
                <div className="absolute bottom-8 right-0.5 w-6 h-6 rounded-full bg-orange-100 border border-orange-200 text-orange-500 flex items-center justify-center shadow-2xs">
                  <CircleDollarSign className="w-3 h-3" />
                </div>
                <div className="absolute bottom-4 left-3 w-6 h-6 rounded-full bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shadow-2xs">
                  <Search className="w-3 h-3" />
                </div>
              </div>

              {/* Description & Action */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] font-extrabold text-[#F26B21] uppercase tracking-wider block mb-1">
                  P2P COORDINATION MESH
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1B2559] leading-snug">
                  Distributed Negotiation, Edge Efficiency
                </h3>
                <p className="text-[#5B6B8C] text-xs mt-1.5 leading-relaxed font-medium">
                  Your agents are finding the best matches, negotiating in real-time, and executing tasks across the decentralized mesh.
                </p>

                <div className="mt-3.5">
                  <Link
                    to="/dashboard/coordination"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A4C] to-[#F26B21] text-white font-bold text-xs shadow-[0_4px_14px_rgba(242,107,33,0.3)] hover:shadow-[0_6px_20px_rgba(242,107,33,0.42)] hover:-translate-y-0.5 transition-all"
                  >
                    <span>View Network</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>

          </div>

          {/* ================= COLUMN 2 (MIDDLE ~ 4 COLS) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* 8. Request Types Card */}
            <GlassCard className="flex flex-col justify-between">
              <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight mb-2">Request Types</h2>

              <div className="flex items-center justify-between gap-4 py-3 my-auto">
                {/* Donut SVG with "42" and "Total" in the center */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Payment 38% (orange #F26B21) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="transparent"
                      stroke="#F26B21"
                      strokeWidth="13"
                      strokeDasharray="86 226"
                      strokeDashoffset="0"
                    />
                    {/* Escrow 24% (purple #8B5CF6) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="transparent"
                      stroke="#8B5CF6"
                      strokeWidth="13"
                      strokeDasharray="54.2 226"
                      strokeDashoffset="-86"
                    />
                    {/* Data Fetch 18% (green #10B981) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="13"
                      strokeDasharray="40.7 226"
                      strokeDashoffset="-140.2"
                    />
                    {/* Other 20% (blue #3B82F6) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="transparent"
                      stroke="#3B82F6"
                      strokeWidth="13"
                      strokeDasharray="45.2 226"
                      strokeDashoffset="-180.9"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-[#1B2559] leading-none">42</span>
                    <span className="text-[10px] text-[#8F9BBA] font-bold mt-0.5">Total</span>
                  </div>
                </div>

                {/* Legend with percentages */}
                <div className="flex flex-col gap-2.5 text-xs text-[#5B6B8C] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F26B21]"></span>
                      Payment
                    </span>
                    <span className="font-extrabold text-[#1B2559]">38%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                      Escrow
                    </span>
                    <span className="font-extrabold text-[#1B2559]">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                      Data Fetch
                    </span>
                    <span className="font-extrabold text-[#1B2559]">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                      Other
                    </span>
                    <span className="font-extrabold text-[#1B2559]">20%</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 10. Recent Activity Card */}
            <GlassCard className="flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Recent Activity</h2>
                <Link to="/dashboard/logs" className="text-xs font-bold text-[#F26B21] hover:text-[#E25C14] flex items-center gap-0.5">
                  <span>View all</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Vertical timeline with a dot per item and colored round icon */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 py-1 border-b border-slate-100/60">
                  <div className="w-8 h-8 rounded-full bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center shrink-0 shadow-2xs">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[#1B2559] whitespace-nowrap">P2P Coordination Mesh</div>
                    <div className="text-[11px] text-[#5B6B8C] font-medium flex items-center gap-1 mt-0.5">
                      <span>New request matched</span>
                      <span>•</span>
                      <span>2m ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-100/60">
                  <div className="w-8 h-8 rounded-full bg-[#EDE7FF] text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[#1B2559] whitespace-nowrap">Edge-Chasing Deadlock Engine</div>
                    <div className="text-[11px] text-[#5B6B8C] font-medium flex items-center gap-1 mt-0.5">
                      <span>Agent resolved conflict</span>
                      <span>•</span>
                      <span>5m ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-100/60">
                  <div className="w-8 h-8 rounded-full bg-[#DDF6EC] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[#1B2559] whitespace-nowrap">Payment Settlement</div>
                    <div className="text-[11px] text-[#5B6B8C] font-medium flex items-center gap-1 mt-0.5">
                      <span>$148.50 USD settled</span>
                      <span>•</span>
                      <span>12m ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-full bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center shrink-0 shadow-2xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[#1B2559] whitespace-nowrap">Logistics Agent</div>
                    <div className="text-[11px] text-[#5B6B8C] font-medium flex items-center gap-1 mt-0.5">
                      <span>New task assigned</span>
                      <span>•</span>
                      <span>18m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

          </div>

          {/* ================= COLUMN 3 (RIGHT ~ 3 COLS): LIVE AGENT ACTIVITY ================= */}
          <div className="lg:col-span-3 flex flex-col">
            <GlassCard className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Live Agent Activity</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/80 border border-slate-100 text-[10.5px] font-semibold text-[#5B6B8C] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>5 agents online</span>
                  </div>
                </div>

                {/* Five rows with thin dividers */}
                <div className="flex flex-col divide-y divide-slate-100/70">
                  
                  {/* Row 1: Medical Triage AI (red heart icon), 28ms (mint pill) */}
                  <div className="flex items-center justify-between py-3.5 first:pt-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-full bg-[#FFE3E3] text-[#FA5252] flex items-center justify-center shrink-0 shadow-2xs">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#1B2559] leading-tight">Medical Triage AI</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#DDF6EC] text-[#0CA678] text-[11px] font-bold border border-[#0CA678]/15 shadow-2xs">
                      28ms
                    </span>
                  </div>

                  {/* Row 2: Logistics Agent (purple truck icon), 42ms (mint pill) */}
                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-full bg-[#EDE7FF] text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#1B2559] leading-tight">Logistics Agent</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#DDF6EC] text-[#0CA678] text-[11px] font-bold border border-[#0CA678]/15 shadow-2xs">
                      42ms
                    </span>
                  </div>

                  {/* Row 3: Finance Agent (green $ icon), 36ms (mint pill) */}
                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-full bg-[#DDF6EC] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
                        <CircleDollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#1B2559] leading-tight">Finance Agent</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#DDF6EC] text-[#0CA678] text-[11px] font-bold border border-[#0CA678]/15 shadow-2xs">
                      36ms
                    </span>
                  </div>

                  {/* Row 4: Research Agent (blue magnifier icon), 31ms (mint pill) */}
                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-full bg-[#E3EFFF] text-[#3B82F6] flex items-center justify-center shrink-0 shadow-2xs">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#1B2559] leading-tight">Research Agent</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#DDF6EC] text-[#0CA678] text-[11px] font-bold border border-[#0CA678]/15 shadow-2xs">
                      31ms
                    </span>
                  </div>

                  {/* Row 5: Customer Support (purple headset icon), 45ms (peach/orange pill, the others are mint) */}
                  <div className="flex items-center justify-between py-3.5 last:pb-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8.5 h-8.5 rounded-full bg-[#EDE7FF] text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#1B2559] leading-tight">Customer Support</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFE9DC] text-[#F26B21] text-[11px] font-bold border border-[#F26B21]/15 shadow-2xs">
                      45ms
                    </span>
                  </div>

                </div>
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
