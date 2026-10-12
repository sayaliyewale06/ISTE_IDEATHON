import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Lock, 
  Database,
  Wallet
} from 'lucide-react';

interface PaymentItem {
  id: string;
  type: 'Payment' | 'Escrow' | 'Data Fetch';
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

const initialTransactions: PaymentItem[] = [
  { id: 'TXN-001234', type: 'Payment', amount: '$25.00', status: 'Completed', date: 'Oct 18, 12:45' },
  { id: 'TXN-001233', type: 'Escrow', amount: '$120.00', status: 'Pending', date: 'Oct 18, 11:20' },
  { id: 'TXN-001232', type: 'Payment', amount: '$45.00', status: 'Completed', date: 'Oct 18, 10:05' },
  { id: 'TXN-001231', type: 'Data Fetch', amount: '$15.00', status: 'Completed', date: 'Oct 18, 09:12' },
  { id: 'TXN-001230', type: 'Payment', amount: '$60.00', status: 'Failed', date: 'Oct 18, 08:30' },
];

const PaymentsPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [transactions, setTransactions] = useState<PaymentItem[]>(initialTransactions);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending' | 'Failed'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAmount, setNewAmount] = useState('25.00');
  const [newType, setNewType] = useState<'Payment' | 'Escrow' | 'Data Fetch'>('Payment');

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount || parseFloat(newAmount) <= 0) {
      showError('Please enter a valid amount.');
      return;
    }
    const created: PaymentItem = {
      id: `TXN-00${Math.floor(Math.random() * 9000) + 1240}`,
      type: newType,
      amount: `$${parseFloat(newAmount).toFixed(2)}`,
      status: 'Completed',
      date: 'Just now'
    };
    setTransactions([created, ...transactions]);
    setIsModalOpen(false);
    showSuccess(`Payment of ${created.amount} settled on AlgoVerse ledger!`);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const getTypeIcon = (type: PaymentItem['type']) => {
    switch (type) {
      case 'Payment':
        return <CreditCard className="w-4 h-4 text-[#F26B21]" />;
      case 'Escrow':
        return <Lock className="w-4 h-4 text-[#7048E8]" />;
      case 'Data Fetch':
        return <Database className="w-4 h-4 text-[#0CA678]" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="Payments"
          subtitle="Manage your transactions and settlements."
          tagline="Instant zero-friction settlements ✦"
          action={
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              New Payment
            </Button>
          }
        />

        {/* ================= 4 STAT CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Volume"
            value="$148.50"
            unit="USD"
            change="24%"
            tint="blue"
            icon={<Wallet className="w-5 h-5" />}
          />
          <StatCard
            title="Successful"
            value="98.5%"
            change="0.8%"
            tint="mint"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            title="Pending"
            value="2"
            change="1.2%"
            tint="peach"
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            title="Failed"
            value="0"
            tint="lavender"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>

        {/* ================= FILTER TABS ================= */}
        <div className="flex items-center gap-2.5">
          {(['All', 'Completed', 'Pending', 'Failed'] as const).map((tab) => {
            const isSelected = filter === tab;
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
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================= TRANSACTIONS TABLE IN GLASS CARD ================= */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF8F3]/60 border-b border-orange-100/60 text-[#8F9BBA] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/90 transition-colors">
                    
                    {/* Transaction ID */}
                    <td className="py-4.5 px-6 font-extrabold text-[#1B2559] text-[13.5px]">
                      {tx.id}
                    </td>

                    {/* Type */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-2.5 text-[#1B2559] font-bold">
                        {getTypeIcon(tx.type)}
                        <span>{tx.type}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4.5 px-6 font-extrabold text-[#1B2559] text-[14px]">
                      {tx.amount}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4.5 px-6">
                      {tx.status === 'Completed' && (
                        <Badge variant="mint">Completed</Badge>
                      )}
                      {tx.status === 'Pending' && (
                        <Badge variant="peach">Pending</Badge>
                      )}
                      {tx.status === 'Failed' && (
                        <Badge variant="rose">Failed</Badge>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4.5 px-6 text-[#8F9BBA] font-semibold">
                      {tx.date}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Modal: New Payment */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
            <GlassCard className="max-w-md w-full p-6 animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-extrabold text-[#1B2559]">Initiate New Payment</h3>
              <p className="text-xs text-[#5B6B8C] mt-1 font-medium">Execute immediate peer settlement or escrow authorization.</p>

              <form onSubmit={handleCreatePayment} className="space-y-4 mt-5">
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Payment Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-[14px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559]"
                  >
                    <option value="Payment">Direct Payment</option>
                    <option value="Escrow">Smart Escrow</option>
                    <option value="Data Fetch">Data Fetch Query</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1B2559] block mb-1">Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
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
                    Confirm Settlement
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

export default PaymentsPage;
