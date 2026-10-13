import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { 
  Network, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Plus, 
  ChevronDown, 
  RotateCcw
} from 'lucide-react';

interface ActiveCoordination {
  id: string;
  name: string;
  category: string;
  agentsCount: number;
  status: 'Active' | 'Pending';
  timeAgo: string;
}

const mockCoordinations: ActiveCoordination[] = [
  { id: 'c-1', name: 'Medical Triage Network', category: 'Healthcare', agentsCount: 12, status: 'Active', timeAgo: '2m ago' },
  { id: 'c-2', name: 'Logistics Network', category: 'Supply Chain', agentsCount: 8, status: 'Active', timeAgo: '5m ago' },
  { id: 'c-3', name: 'Finance Mesh', category: 'Payments', agentsCount: 6, status: 'Active', timeAgo: '8m ago' },
  { id: 'c-4', name: 'Research Network', category: 'Data Analysis', agentsCount: 4, status: 'Active', timeAgo: '12m ago' },
];

const CoordinationPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [selectedTopologyView, setSelectedTopologyView] = useState('Real-Time');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeshName, setNewMeshName] = useState('');
  const [newMeshCategory, setNewMeshCategory] = useState('Healthcare');
  const [coordinations, setCoordinations] = useState<ActiveCoordination[]>(mockCoordinations);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCreateCoordination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeshName.trim()) {
      showError('Please provide a coordination mesh name.');
      return;
    }
    const newCoord: ActiveCoordination = {
      id: `c-${Date.now()}`,
      name: newMeshName.trim(),
      category: newMeshCategory,
      agentsCount: Math.floor(Math.random() * 8) + 4,
      status: 'Active',
      timeAgo: 'Just now'
    };
    setCoordinations([newCoord, ...coordinations]);
    setNewMeshName('');
    setIsModalOpen(false);
    showSuccess(`Coordination mesh "${newCoord.name}" deployed to P2P network!`);
  };

  const triggerMeshPulse = () => {
    setIsSimulating(true);
    showSuccess('Mesh coordination pulse broadcasted across peers.');
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="P2P Coordination Mesh"
          subtitle="Real-time coordination between AI agents across the network."
          tagline="Swarm intelligence at scale ✦"
          action={
            <div className="flex items-center gap-3">
              <button
                onClick={triggerMeshPulse}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 border border-slate-200/80 text-xs font-bold text-[#1B2559] hover:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin text-[#F26B21]' : 'text-[#8F9BBA]'}`} />
                <span>Simulate Pulse</span>
              </button>
              <Button
                onClick={() => setIsModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                New Coordination
              </Button>
            </div>
          }
        />

        {/* ================= 4 STAT CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Meshes"
            value="8"
            change="12%"
            tint="mint"
            icon={<Network className="w-5 h-5" />}
          />
          <StatCard
            title="Pending Meshes"
            value="3"
            change="2"
            tint="blue"
            icon={<Layers className="w-5 h-5" />}
          />
          <StatCard
            title="Avg. Latency"
            value="28"
            unit="ms"
            change="14%"
            tint="lavender"
            icon={<Activity className="w-5 h-5" />}
          />
          <StatCard
            title="Success Rate"
            value="98.5%"
            change="0.8%"
            tint="peach"
            icon={<ShieldCheck className="w-5 h-5" />}
          />
        </div>

        {/* ================= MAIN TWO PANELS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Live Network Topology (7 cols) */}
          <GlassCard className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Live Network Topology</h2>
                <p className="text-xs text-[#5B6B8C] font-medium mt-0.5">Central AI routing peer links with orbiting agents</p>
              </div>

              <button 
                onClick={() => setSelectedTopologyView(selectedTopologyView === 'Real-Time' ? 'Historical' : 'Real-Time')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/80 text-xs font-bold text-[#5B6B8C] hover:bg-white transition-colors cursor-pointer"
              >
                <span>{selectedTopologyView}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8F9BBA]" />
              </button>
            </div>

            {/* Topology Interactive SVG Visualization */}
            <div className="relative w-full h-[320px] md:h-[350px] flex items-center justify-center my-3 bg-gradient-to-b from-white/40 via-white/80 to-white/40 rounded-2xl border border-dashed border-orange-200/50 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 350">
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="topologyMeshGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="0.75" fill="#E2E8F0" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topologyMeshGrid)" />

                {/* Orbiting concentric rings */}
                <circle cx="250" cy="175" r="75" fill="none" stroke="#FFE9DC" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="250" cy="175" r="130" fill="none" stroke="#E3EFFF" strokeWidth="1" strokeDasharray="4 4" />

                {/* Connection Lines from Center Hub (250, 175) to Orbiting Nodes */}
                <line x1="250" y1="175" x2="250" y2="70" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="250" y1="175" x2="380" y2="105" stroke="#F26B21" strokeWidth="2.5" />
                <line x1="250" y1="175" x2="370" y2="255" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="250" y1="175" x2="250" y2="290" stroke="#0CA678" strokeWidth="2" />
                <line x1="250" y1="175" x2="130" y2="255" stroke="#F26B21" strokeWidth="2.5" />
                <line x1="250" y1="175" x2="120" y2="105" stroke="#228BE6" strokeWidth="2" />

                {/* Animated Pulsing Data Flow Packets */}
                <circle cx="315" cy="140" r="4.5" fill="#F26B21" className="animate-pulse" />
                <circle cx="190" cy="215" r="4.5" fill="#F26B21" className="animate-pulse" />
                <circle cx="250" cy="235" r="4" fill="#0CA678" />

                {/* Outer Node: Idle */}
                <g transform="translate(250, 70)">
                  <circle r="15" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                  <circle r="4" fill="#94A3B8" />
                  <text y="24" textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="700">Idle Node</text>
                </g>

                {/* Outer Node: Medical Triage */}
                <g transform="translate(380, 105)">
                  <circle r="18" fill="#DDF6EC" stroke="#0CA678" strokeWidth="2" />
                  <circle r="6" fill="#0CA678" />
                  <text y="28" textAnchor="middle" fontSize="11" fill="#1B2559" fontWeight="700">Medical AI</text>
                </g>

                {/* Outer Node: Logistics */}
                <g transform="translate(370, 255)">
                  <circle r="17" fill="#EDE7FF" stroke="#7048E8" strokeWidth="2" />
                  <circle r="5" fill="#7048E8" />
                  <text y="27" textAnchor="middle" fontSize="11" fill="#1B2559" fontWeight="700">Logistics</text>
                </g>

                {/* Outer Node: Finance */}
                <g transform="translate(250, 290)">
                  <circle r="18" fill="#FFE9DC" stroke="#F26B21" strokeWidth="2" />
                  <circle r="6" fill="#F26B21" />
                  <text y="28" textAnchor="middle" fontSize="11" fill="#1B2559" fontWeight="700">Finance</text>
                </g>

                {/* Outer Node: Research */}
                <g transform="translate(130, 255)">
                  <circle r="17" fill="#E3EFFF" stroke="#228BE6" strokeWidth="2" />
                  <circle r="5" fill="#228BE6" />
                  <text y="27" textAnchor="middle" fontSize="11" fill="#1B2559" fontWeight="700">Research</text>
                </g>

                {/* Outer Node: Customer Support */}
                <g transform="translate(120, 105)">
                  <circle r="17" fill="#FFF3BF" stroke="#F59F00" strokeWidth="2" />
                  <circle r="5" fill="#F59F00" />
                  <text y="27" textAnchor="middle" fontSize="11" fill="#1B2559" fontWeight="700">Support</text>
                </g>

                {/* Center Hub: AI Coordinator Chip */}
                <g transform="translate(250, 175)">
                  <circle r="34" fill="#FFE9DC" opacity="0.6" className="animate-ping" />
                  <circle r="28" fill="#F26B21" />
                  <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" />
                  <circle cx="0" cy="0" r="5" fill="#F26B21" />
                  <text y="42" textAnchor="middle" fontSize="12" fill="#1B2559" fontWeight="800">AI Coordinator</text>
                </g>
              </svg>
            </div>

            {/* Bottom Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-slate-100/60 text-[11px] font-bold text-[#5B6B8C]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26B21]"></span>
                Coordinator
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0CA678]"></span>
                Agent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26B21]"></span>
                Data Flow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#228BE6]"></span>
                Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                Idle
              </span>
            </div>
          </GlassCard>

          {/* RIGHT: Active Coordinations List (5 cols) */}
          <GlassCard className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Active Coordinations</h2>
                <button className="text-xs font-bold text-[#F26B21] hover:text-[#E25C14] flex items-center gap-0.5 cursor-pointer">
                  View all →
                </button>
              </div>

              {/* Coordination Cards List */}
              <div className="space-y-3">
                {coordinations.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-[16px] bg-white/70 border border-white hover:border-orange-200 hover:bg-white transition-all flex items-center justify-between shadow-2xs hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="text-[14px] font-extrabold text-[#1B2559] tracking-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">
                        {item.category} • {item.agentsCount} agents
                      </div>
                      <div className="text-[11px] text-[#8F9BBA] font-medium mt-1">
                        {item.timeAgo}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="mint" pulse>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100/60 text-center">
              <span className="text-xs font-semibold text-[#8F9BBA]">
                Peer-to-peer consensus verified with zero central bottlenecks
              </span>
            </div>
          </GlassCard>

        </div>

        {/* Modal: New Coordination */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
            <GlassCard className="max-w-md w-full p-6 animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-extrabold text-[#1B2559]">Deploy New Coordination Mesh</h3>
              <p className="text-xs text-[#5B6B8C] mt-1 font-medium">Initiate autonomous peer-to-peer consensus across available network agents.</p>

              <form onSubmit={handleCreateCoordination} className="space-y-4 mt-5">
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Mesh Name</label>
                  <input
                    type="text"
                    required
                    value={newMeshName}
                    onChange={(e) => setNewMeshName(e.target.value)}
                    placeholder="e.g. Critical Trauma Ambulance Mesh"
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Domain / Category</label>
                  <select
                    value={newMeshCategory}
                    onChange={(e) => setNewMeshCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Payments">Payments</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="Emergency Relief">Emergency Relief</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#5B6B8C] hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit">
                    Deploy Mesh
                  </Button>
                </div>
              </form>
            </GlassCard>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default CoordinationPage;
