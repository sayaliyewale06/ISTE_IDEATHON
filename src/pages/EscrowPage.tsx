import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

interface EscrowItem {
  id: string;
  parties: string;
  amount: string;
  status: 'Active' | 'Completed' | 'Disputed';
  created: string;
  progress: number;
}

const initialEscrows: EscrowItem[] = [
  { id: 'ESC-001034', parties: 'User A ⇄ Agent B', amount: '$120.00', status: 'Active', created: '2h ago', progress: 65 },
  { id: 'ESC-001033', parties: 'User C ⇄ Agent D', amount: '$75.00', status: 'Active', created: '5h ago', progress: 40 },
  { id: 'ESC-001032', parties: 'User E ⇄ Agent F', amount: '$200.00', status: 'Completed', created: '1d ago', progress: 100 },
  { id: 'ESC-001031', parties: 'User G ⇄ Agent H', amount: '$50.00', status: 'Completed', created: '2d ago', progress: 100 },
  { id: 'ESC-001030', parties: 'User I ⇄ Agent J', amount: '$90.00', status: 'Completed', created: '3d ago', progress: 100 },
];

const EscrowPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [escrows, setEscrows] = useState<EscrowItem[]>(initialEscrows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyA, setPartyA] = useState('User Meera');
  const [partyB, setPartyB] = useState('Medical Triage AI');
  const [escrowAmount, setEscrowAmount] = useState('80.00');

  const handleCreateEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escrowAmount || parseFloat(escrowAmount) <= 0) {
      showError('Please enter a valid escrow amount.');
      return;
    }
    const created: EscrowItem = {
      id: `ESC-00${Math.floor(Math.random() * 9000) + 1040}`,
      parties: `${partyA} ⇄ ${partyB}`,
      amount: `$${parseFloat(escrowAmount).toFixed(2)}`,
      status: 'Active',
      created: 'Just now',
      progress: 25
    };
    setEscrows([created, ...escrows]);
    setIsModalOpen(false);
    showSuccess(`Smart Escrow ${created.id} locked with programmatic refund safeguard!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="Escrow"
          subtitle="Secure and transparent transactions with smart escrow."
          tagline="Trustless agreement, guaranteed ✦"
          action={
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Create Escrow
            </Button>
          }
        />

        {/* ================= 4 STAT CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Escrow"
            value="12"
            change="2"
            tint="peach"
            icon={<Lock className="w-5 h-5 text-[#F26B21]" />}
          />
          <StatCard
            title="Active"
            value="2"
            change="1"
            tint="mint"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            title="Completed"
            value="10"
            change="5"
            tint="blue"
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <StatCard
            title="Disputed"
            value="0"
            tint="lavender"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </div>

        {/* ================= ESCROW CARDS WITH LOCK BADGE, STATUS & TIMELINE ================= */}
        <div className="space-y-4">
          <h2 className="text-[16px] font-extrabold text-[#1B2559] tracking-tight">Active & Recent Escrows</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {escrows.map((escrow) => (
              <GlassCard key={escrow.id} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center shadow-2xs shrink-0">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[15px] font-extrabold text-[#1B2559]">
                          {escrow.id}
                        </div>
                        <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">
                          {escrow.parties}
                        </div>
                      </div>
                    </div>

                    {escrow.status === 'Active' ? (
                      <Badge variant="mint" pulse>Active</Badge>
                    ) : (
                      <Badge variant="blue">Completed</Badge>
                    )}
                  </div>

                  <div className="mt-4 pt-3 flex items-baseline justify-between border-t border-slate-100/60">
                    <span className="text-xs font-bold text-[#8F9BBA]">Locked Amount</span>
                    <span className="text-2xl font-extrabold text-[#1B2559]">{escrow.amount}</span>
                  </div>
                </div>

                {/* Progress / Timeline */}
                <div className="mt-4 pt-3 border-t border-slate-100/60">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#5B6B8C] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8F9BBA]" />
                      Created {escrow.created}
                    </span>
                    <span className="text-[#1B2559]">{escrow.progress}% Settled</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        escrow.status === 'Completed' ? 'bg-[#0CA678]' : 'bg-gradient-to-r from-[#FF8A4C] to-[#F26B21]'
                      }`}
                      style={{ width: `${escrow.progress}%` }}
                    />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Modal: Create Escrow */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
            <GlassCard className="max-w-md w-full p-6 animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-extrabold text-[#1B2559]">Lock Smart Escrow</h3>
              <p className="text-xs text-[#5B6B8C] mt-1 font-medium">Smart contract escrow with automated time-locked dispute resolution.</p>

              <form onSubmit={handleCreateEscrow} className="space-y-4 mt-5">
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Payer (Party A)</label>
                  <input
                    type="text"
                    required
                    value={partyA}
                    onChange={(e) => setPartyA(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Beneficiary (Party B)</label>
                  <input
                    type="text"
                    required
                    value={partyB}
                    onChange={(e) => setPartyB(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={escrowAmount}
                    onChange={(e) => setEscrowAmount(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  />
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
                    Deposit Escrow
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

export default EscrowPage;
