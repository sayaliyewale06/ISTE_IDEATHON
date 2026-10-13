import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { 
  ChevronRight,
  Clock
} from 'lucide-react';

interface LogItem {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  source: string;
}

const initialLogs: LogItem[] = [
  { id: 'l-1', time: '12:45:32', level: 'INFO', message: 'Payment settled successfully', source: 'Payment Agent' },
  { id: 'l-2', time: '12:43:01', level: 'INFO', message: 'Agent matched with request', source: 'Coordination Mesh' },
  { id: 'l-3', time: '12:41:15', level: 'WARN', message: 'High latency detected', source: 'Logistics Agent' },
  { id: 'l-4', time: '12:38:17', level: 'INFO', message: 'Task completed', source: 'Research Agent' },
  { id: 'l-5', time: '12:35:04', level: 'INFO', message: 'Escrow created', source: 'Finance Agent' },
  { id: 'l-6', time: '12:30:12', level: 'INFO', message: 'Consensus achieved across 4 peer nodes', source: 'P2P Mesh' },
  { id: 'l-7', time: '12:28:44', level: 'INFO', message: 'Decentralized state checkpoint saved', source: 'State Engine' },
];

const LogsPage: React.FC = () => {
  const [logs] = useState<LogItem[]>(initialLogs);
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [isLive, setIsLive] = useState(true);

  const filteredLogs = logs.filter(l => {
    if (filterLevel === 'All') return true;
    return l.level === filterLevel;
  });

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="System Logs"
          subtitle="Monitor system events, agent actions, and network activity."
          tagline="Transparency across the mesh ✦"
          action={
            <div className="flex items-center gap-3">
              {/* Live Pulsing Green Dot */}
              <button
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-xs font-bold text-[#1B2559] hover:bg-white shadow-2xs cursor-pointer transition-all"
              >
                <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 ${isLive ? 'animate-pulse' : 'opacity-40'}`}></span>
                <span>{isLive ? 'Live Stream' : 'Paused'}</span>
              </button>
            </div>
          }
        />

        {/* ================= FILTER CHIPS ================= */}
        <div className="flex items-center gap-2.5">
          {(['All', 'INFO', 'WARN', 'ERROR'] as const).map((chip) => {
            const isSelected = filterLevel === chip;
            return (
              <button
                key={chip}
                onClick={() => setFilterLevel(chip)}
                className={`px-4 py-2 rounded-[14px] text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE3D1] text-[#F26B21] border border-[#F26B21]/30 shadow-2xs'
                    : 'bg-white/80 text-[#5B6B8C] border border-white hover:bg-white hover:text-[#1B2559]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* ================= LOGS FEED IN GLASS CARD ================= */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF8F3]/60 border-b border-orange-100/60 text-[#8F9BBA] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Level</th>
                  <th className="py-4 px-6">Message</th>
                  <th className="py-4 px-6">Source</th>
                  <th className="py-4 px-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {filteredLogs.map((log) => {
                  return (
                    <tr key={log.id} className="hover:bg-white/90 transition-colors">
                      
                      {/* Time */}
                      <td className="py-4.5 px-6 font-semibold text-[#8F9BBA] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#8F9BBA]" />
                        <span>{log.time}</span>
                      </td>

                      {/* Level Badge */}
                      <td className="py-4.5 px-6">
                        {log.level === 'INFO' && (
                          <Badge variant="mint">INFO</Badge>
                        )}
                        {log.level === 'WARN' && (
                          <Badge variant="amber">WARN</Badge>
                        )}
                        {log.level === 'ERROR' && (
                          <Badge variant="rose">ERROR</Badge>
                        )}
                      </td>

                      {/* Message */}
                      <td className="py-4.5 px-6 font-extrabold text-[#1B2559] text-[13.5px]">
                        {log.message}
                      </td>

                      {/* Source */}
                      <td className="py-4.5 px-6 text-[#5B6B8C] font-bold">
                        {log.source}
                      </td>

                      {/* Expand / Details */}
                      <td className="py-4.5 px-6 text-right">
                        <ChevronRight className="w-4 h-4 text-[#8F9BBA] ml-auto" />
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};

export default LogsPage;
