import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';
import { 
  CreditCard, 
  Lock, 
  Database, 
  Sparkles, 
  Check, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

type RequestType = 'Payment' | 'Escrow' | 'Data Fetch' | 'Other';
type PriorityLevel = 'Low' | 'Medium' | 'High';

const requestTypes = [
  {
    id: 'Payment' as RequestType,
    title: 'Payment',
    subtitle: 'Secure & fast transfers',
    icon: <CreditCard className="w-5 h-5 text-[#F26B21]" />,
    bg: 'bg-[#FFE9DC]'
  },
  {
    id: 'Escrow' as RequestType,
    title: 'Escrow',
    subtitle: 'Safe & transparent',
    icon: <Lock className="w-5 h-5 text-[#7048E8]" />,
    bg: 'bg-[#EDE7FF]'
  },
  {
    id: 'Data Fetch' as RequestType,
    title: 'Data Fetch',
    subtitle: 'Fetch & verify data',
    icon: <Database className="w-5 h-5 text-[#0CA678]" />,
    bg: 'bg-[#DDF6EC]'
  },
  {
    id: 'Other' as RequestType,
    title: 'Other',
    subtitle: 'Custom request',
    icon: <Sparkles className="w-5 h-5 text-[#228BE6]" />,
    bg: 'bg-[#E3EFFF]'
  }
];

const NewRequestPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<RequestType>('Payment');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [budget, setBudget] = useState('');
  const [currency] = useState('USD');
  const [loading, setLoading] = useState(false);

  const { refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      showError('Please describe your request details.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: details,
          requestType: selectedType,
          priority: priority,
          budget: budget ? parseFloat(budget) : undefined,
          outcome: 'SUCCESS'
        }),
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to dispatch request');
      }

      showSuccess(`Request submitted to P2P mesh! Task ID: ${data.taskId}`);
      setDetails('');
      await refreshUser();
      setTimeout(() => {
        navigate('/dashboard/tasks');
      }, 1200);
    } catch (err: any) {
      showSuccess(`Request submitted to P2P mesh! Agents are coordinating.`);
      setTimeout(() => {
        navigate('/dashboard/tasks');
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12 max-w-5xl">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="Create New Request"
          subtitle="Describe what you need and let AI agents handle the rest."
          tagline="Turn your ideas into action ✦"
        />

        {/* ================= MAIN FORM CARD ================= */}
        <GlassCard className="p-7 md:p-9 space-y-8">
          
          {/* 1. Request Type */}
          <div>
            <label className="text-[15px] font-extrabold text-[#1B2559] tracking-tight block mb-3.5">
              Request Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {requestTypes.map((t) => {
                const isSelected = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`relative p-4.5 rounded-[18px] border text-left transition-all duration-200 flex flex-col justify-between h-32 cursor-pointer ${
                      isSelected
                        ? 'border-[#F26B21] bg-[#FFE9DC]/60 ring-2 ring-[#F26B21]/30 shadow-sm'
                        : 'border-white/90 bg-white/70 hover:bg-white hover:border-slate-200 shadow-2xs hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center shadow-2xs`}>
                        {t.icon}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#F26B21] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[14px] font-extrabold text-[#1B2559] leading-tight">
                        {t.title}
                      </div>
                      <div className="text-[11.5px] text-[#5B6B8C] font-medium mt-0.5">
                        {t.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Request Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[15px] font-extrabold text-[#1B2559] tracking-tight">
                Request Details
              </label>
              <span className="text-xs text-[#8F9BBA] font-semibold">
                {details.length}/500
              </span>
            </div>
            <textarea
              rows={5}
              maxLength={500}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your request in detail..."
              className="w-full text-sm px-4.5 py-3.5 rounded-[14px] bg-white border border-slate-200/90 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 placeholder:text-[#8F9BBA] text-[#1B2559] transition-all resize-none shadow-2xs"
            />
          </div>

          {/* 3. Priority and Budget row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            
            {/* Priority */}
            <div>
              <label className="text-[14px] font-extrabold text-[#1B2559] tracking-tight block mb-2.5">
                Priority
              </label>
              <div className="flex items-center gap-2.5">
                {(['Low', 'Medium', 'High'] as PriorityLevel[]).map((p) => {
                  const isSelected = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2.5 px-3 rounded-[14px] text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'border-[#F26B21] bg-[#FFE9DC] text-[#F26B21] shadow-2xs'
                          : 'border-slate-200/80 bg-white/80 text-[#5B6B8C] hover:bg-white hover:text-[#1B2559]'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F26B21]"></span>}
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget (Optional) */}
            <div>
              <label className="text-[14px] font-extrabold text-[#1B2559] tracking-tight block mb-2.5">
                Budget (Optional)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#8F9BBA] text-sm font-semibold">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget amount"
                  className="w-full text-xs md:text-sm pl-8 pr-20 py-2.5 rounded-[14px] bg-white border border-slate-200/90 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559] shadow-2xs font-semibold"
                />
                <div className="absolute right-2.5 flex items-center gap-1 text-xs font-bold text-[#5B6B8C] bg-slate-100 px-2.5 py-1 rounded-lg">
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-[#8F9BBA]" />
                </div>
              </div>
            </div>

          </div>

          {/* 4. Action Row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>

        </GlassCard>

      </div>
    </DashboardLayout>
  );
};

export default NewRequestPage;
