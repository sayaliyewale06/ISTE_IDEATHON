import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  MoreVertical,
  Bot,
  HeartHandshake,
  Truck,
  CircleDollarSign,
  Search,
  Headphones,
  Zap
} from 'lucide-react';

interface AgentItem {
  id: string;
  name: string;
  type: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  status: 'Online' | 'Idle' | 'Offline';
  responseTime: string;
}

const initialAgents: AgentItem[] = [
  {
    id: 'a-1',
    name: 'Medical Triage AI',
    type: 'Healthcare',
    iconBg: 'bg-[#FFE3E3]',
    iconColor: 'text-[#FA5252]',
    icon: <HeartHandshake className="w-5 h-5" />,
    status: 'Online',
    responseTime: '28ms'
  },
  {
    id: 'a-2',
    name: 'Logistics Agent',
    type: 'Logistics',
    iconBg: 'bg-[#EDE7FF]',
    iconColor: 'text-[#7048E8]',
    icon: <Truck className="w-5 h-5" />,
    status: 'Online',
    responseTime: '42ms'
  },
  {
    id: 'a-3',
    name: 'Finance Agent',
    type: 'Finance',
    iconBg: 'bg-[#DDF6EC]',
    iconColor: 'text-[#0CA678]',
    icon: <CircleDollarSign className="w-5 h-5" />,
    status: 'Online',
    responseTime: '30ms'
  },
  {
    id: 'a-4',
    name: 'Research Agent',
    type: 'Research',
    iconBg: 'bg-[#E3EFFF]',
    iconColor: 'text-[#228BE6]',
    icon: <Search className="w-5 h-5" />,
    status: 'Online',
    responseTime: '31ms'
  },
  {
    id: 'a-5',
    name: 'Customer Support',
    type: 'Support',
    iconBg: 'bg-[#FFF3BF]',
    iconColor: 'text-[#F59F00]',
    icon: <Headphones className="w-5 h-5" />,
    status: 'Online',
    responseTime: '45ms'
  },
  {
    id: 'a-6',
    name: 'Smart Escrow Guardian',
    type: 'Security',
    iconBg: 'bg-[#FFE9DC]',
    iconColor: 'text-[#F26B21]',
    icon: <Zap className="w-5 h-5" />,
    status: 'Online',
    responseTime: '24ms'
  }
];

const AgentsPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [agents, setAgents] = useState<AgentItem[]>(initialAgents);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Idle' | 'Offline'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentType, setNewAgentType] = useState('Healthcare');

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) {
      showError('Please enter an agent name.');
      return;
    }
    const created: AgentItem = {
      id: `a-${Date.now()}`,
      name: newAgentName.trim(),
      type: newAgentType,
      iconBg: 'bg-[#FFE9DC]',
      iconColor: 'text-[#F26B21]',
      icon: <Bot className="w-5 h-5" />,
      status: 'Online',
      responseTime: `${Math.floor(Math.random() * 20) + 20}ms`
    };
    setAgents([created, ...agents]);
    setNewAgentName('');
    setIsModalOpen(false);
    showSuccess(`Agent "${created.name}" registered to P2P mesh!`);
  };

  const filteredAgents = agents.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Active') return a.status === 'Online';
    if (filter === 'Idle') return a.status === 'Idle';
    if (filter === 'Offline') return a.status === 'Offline';
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="AI Agents"
          subtitle="Manage and monitor your AI agents in the P2P mesh."
          tagline="Specialized minds, working together ✦"
          action={
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Agent
            </Button>
          }
        />

        {/* ================= 4 STAT CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Agents"
            value="25"
            change="3"
            tint="blue"
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            title="Active Agents"
            value="22"
            change="1"
            tint="mint"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            title="Idle Agents"
            value="2"
            tint="peach"
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            title="Offline Agents"
            value="1"
            tint="lavender"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>

        {/* ================= FILTER TABS ================= */}
        <div className="flex items-center gap-2.5">
          {(['All', 'Active', 'Idle', 'Offline'] as const).map((tab) => {
            const isSelected = filter === tab;
            const counts = { All: 25, Active: 22, Idle: 2, Offline: 1 };
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-[14px] text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE3D1] text-[#F26B21] border border-[#F26B21]/30 shadow-2xs'
                    : 'bg-white/80 text-[#5B6B8C] border border-white hover:bg-white hover:text-[#1B2559]'
                }`}
              >
                <span>{tab}</span>
                <span className={`ml-1.5 ${isSelected ? 'text-[#F26B21]' : 'text-[#8F9BBA]'}`}>
                  ({counts[tab]})
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= AGENT CARDS GRID WITH HOVER LIFT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => (
            <GlassCard key={agent.id} className="p-6 flex flex-col justify-between h-48">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${agent.iconBg} ${agent.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-[#1B2559] tracking-tight leading-tight">
                      {agent.name}
                    </h3>
                    <span className="text-xs text-[#5B6B8C] font-semibold mt-0.5 block">
                      {agent.type}
                    </span>
                  </div>
                </div>

                <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#1B2559] hover:bg-white/80 transition-colors cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Status and Latency Row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100/60 mt-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-600">Online</span>
                </div>

                <Badge variant="mint">
                  {agent.responseTime}
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Modal: Add Agent */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
            <GlassCard className="max-w-md w-full p-6 animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-extrabold text-[#1B2559]">Add Autonomous AI Agent</h3>
              <p className="text-xs text-[#5B6B8C] mt-1 font-medium">Register a peer agent node to participate in decentralized routing.</p>

              <form onSubmit={handleAddAgent} className="space-y-4 mt-5">
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Agent Name</label>
                  <input
                    type="text"
                    required
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="e.g. Diagnostic Synthesis AI"
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Category / Domain</label>
                  <select
                    value={newAgentType}
                    onChange={(e) => setNewAgentType(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Finance">Finance</option>
                    <option value="Research">Research</option>
                    <option value="Support">Support</option>
                    <option value="Security">Security</option>
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
                    Register Agent
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

export default AgentsPage;
