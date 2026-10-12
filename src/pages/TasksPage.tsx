import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Plus, 
  MoreVertical, 
  CircleDollarSign, 
  Search, 
  Truck, 
  ShieldCheck
} from 'lucide-react';

interface TaskRecord {
  id: string;
  name: string;
  agent: string;
  agentIcon: React.ReactNode;
  agentBg: string;
  agentColor: string;
  status: 'Live' | 'Pending' | 'Done';
  progress: number;
  started: string;
}

const initialTasks: TaskRecord[] = [
  {
    id: 't-1',
    name: 'Verify KYC Documents',
    agent: 'Finance Agent',
    agentIcon: <CircleDollarSign className="w-4 h-4" />,
    agentBg: 'bg-[#DDF6EC]',
    agentColor: 'text-[#0CA678]',
    status: 'Live',
    progress: 75,
    started: '2m ago'
  },
  {
    id: 't-2',
    name: 'Fetch Market Data',
    agent: 'Research Agent',
    agentIcon: <Search className="w-4 h-4" />,
    agentBg: 'bg-[#E3EFFF]',
    agentColor: 'text-[#228BE6]',
    status: 'Live',
    progress: 30,
    started: '5m ago'
  },
  {
    id: 't-3',
    name: 'Process Payment',
    agent: 'Payment Agent',
    agentIcon: <CircleDollarSign className="w-4 h-4" />,
    agentBg: 'bg-[#FFE9DC]',
    agentColor: 'text-[#F26B21]',
    status: 'Live',
    progress: 45,
    started: '8m ago'
  },
  {
    id: 't-4',
    name: 'Update Inventory',
    agent: 'Logistics Agent',
    agentIcon: <Truck className="w-4 h-4" />,
    agentBg: 'bg-[#EDE7FF]',
    agentColor: 'text-[#7048E8]',
    status: 'Live',
    progress: 90,
    started: '12m ago'
  },
  {
    id: 't-5',
    name: 'Validate Healthcare Node Credential',
    agent: 'Medical Triage AI',
    agentIcon: <ShieldCheck className="w-4 h-4" />,
    agentBg: 'bg-[#FFE3E3]',
    agentColor: 'text-[#FA5252]',
    status: 'Done',
    progress: 100,
    started: '1h ago'
  },
  {
    id: 't-6',
    name: 'P2P Route Telemetry Sync',
    agent: 'Logistics Agent',
    agentIcon: <Truck className="w-4 h-4" />,
    agentBg: 'bg-[#EDE7FF]',
    agentColor: 'text-[#7048E8]',
    status: 'Done',
    progress: 100,
    started: '2h ago'
  }
];

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks] = useState<TaskRecord[]>(initialTasks);
  const [filter, setFilter] = useState<'All' | 'Live' | 'Pending' | 'Done'>('All');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="Tasks"
          subtitle="Track and manage all active and completed tasks."
          tagline="Execution without bottlenecks ✦"
          action={
            <Button
              onClick={() => navigate('/dashboard/new-request')}
              icon={<Plus className="w-4 h-4" />}
            >
              Create Task
            </Button>
          }
        />

        {/* ================= FILTER TABS ================= */}
        <div className="flex items-center gap-2.5">
          {(['All', 'Live', 'Pending', 'Done'] as const).map((tab) => {
            const isSelected = filter === tab;
            const countLabel = tab === 'All' ? '(16)' : tab === 'Live' ? '(4)' : '';
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
                {countLabel && <span className={`ml-1.5 ${isSelected ? 'text-[#F26B21]' : 'text-[#8F9BBA]'}`}>{countLabel}</span>}
              </button>
            );
          })}
        </div>

        {/* ================= TASKS LIST IN GLASS CARD ================= */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF8F3]/60 border-b border-orange-100/60 text-[#8F9BBA] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Task Name</th>
                  <th className="py-4 px-6">Agent</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 min-w-[170px]">Progress</th>
                  <th className="py-4 px-6">Started</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {filteredTasks.map((task) => {
                  return (
                    <tr key={task.id} className="hover:bg-white/90 transition-colors">
                      
                      {/* Task Name */}
                      <td className="py-4.5 px-6 font-extrabold text-[#1B2559] text-[13.5px]">
                        {task.name}
                      </td>

                      {/* Agent */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-2.5 text-[#1B2559] font-bold">
                          <span className={`w-7 h-7 rounded-lg ${task.agentBg} ${task.agentColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                            {task.agentIcon}
                          </span>
                          <span>{task.agent}</span>
                        </div>
                      </td>

                      {/* Status Pills */}
                      <td className="py-4.5 px-6">
                        {task.status === 'Live' && (
                          <Badge variant="mint" pulse>Live</Badge>
                        )}
                        {task.status === 'Pending' && (
                          <Badge variant="peach">Pending</Badge>
                        )}
                        {task.status === 'Done' && (
                          <Badge variant="blue">Done</Badge>
                        )}
                      </td>

                      {/* Progress Bar */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-slate-100/90 overflow-hidden shadow-inner">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                task.status === 'Done' ? 'bg-[#0CA678]' : 'bg-gradient-to-r from-[#FF8A4C] to-[#7048E8]'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-[11.5px] font-extrabold text-[#5B6B8C] min-w-[32px]">
                            {task.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Started */}
                      <td className="py-4.5 px-6 text-[#8F9BBA] font-semibold">
                        {task.started}
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-6 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1B2559] transition-colors cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
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

export default TasksPage;
