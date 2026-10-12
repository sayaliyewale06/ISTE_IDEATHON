import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';

const suggestions = [
  'Emergency ICU & ambulance triage',
  'Inter-hospital O- blood logistics',
  'Oxygen concentrator convoy routing',
  'Disaster relief food & shelter supply',
  'High-bandwidth telemetry mesh compute',
  'Critical trauma resource reservation',
];

const agents = [
  { name: 'Medical Triage AI', icon: '🚑', desc: 'Prioritizes critical trauma cases & ICU transfers.' },
  { name: 'Blood Bank AI', icon: '🩸', desc: 'Brokers O-negative blood reserves across hubs.' },
  { name: 'Disaster Logistics AI', icon: '📦', desc: 'Routes oxygen and relief convoys peer-to-peer.' },
  { name: 'Grid Telemetry AI', icon: '📡', desc: 'Computes real-time congestion-avoidance paths.' },
  { name: 'Escrow Settlement AI', icon: '💳', desc: 'Manages decentralized resource leases & deposits.' },
];

const NewRequestPage: React.FC = () => {
  const [budget, setBudget] = useState(50);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [simulationOutcome, setSimulationOutcome] = useState<'SUCCESS' | 'ROLLED_BACK'>('SUCCESS');

  const { refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSuggestionClick = (s: string) => {
    setGoal(prev => prev ? `${prev} and ${s.toLowerCase()}` : `Dispatch autonomous coordination for ${s.toLowerCase()}`);
  };

  const handleCreateRequest = async () => {
    if (!goal.trim()) {
      showError('Please describe your request.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: goal,
          outcome: simulationOutcome,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create task');
      }

      showSuccess(`Task launched successfully! Task ID: ${data.taskId}`);
      setGoal('');
      
      // Refresh user balance in header
      await refreshUser();
      
      setTimeout(() => {
        navigate('/dashboard/tasks');
      }, 1500);

    } catch (err: any) {
      showError(err.message || 'Failed to connect to Hono backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[24px] md:text-[32px] font-bold font-display text-navy leading-tight">Dispatch Coordinated Task</h1>
          <p className="text-[14px] md:text-[15px] text-slate-500 mt-1">
            Specify an objective and autonomous agents will negotiate shared resources and execute without central bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* 1. Request Description */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <h3 className="text-[16px] font-bold text-navy mb-4">1. Objective Description</h3>

              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full h-[140px] bg-slate-50 border border-line rounded-[16px] p-5 text-[14px] text-ink focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none placeholder-slate-400"
                placeholder={'Example:\nCoordinate 4 trauma ambulances and 3 ICU beds for Pune Disaster Center while reserving 5 units of O-negative blood.'}
              ></textarea>
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestions.map(s => (
                  <span 
                    key={s} 
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[12px] font-medium rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors border border-transparent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Execution Mode */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <h3 className="text-[16px] font-bold text-navy mb-4">2. Coordination Protocol</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="border-[2px] border-indigo-600 bg-indigo-50/40 rounded-[16px] p-5 cursor-pointer relative">
                  <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h4 className="text-[14px] font-bold text-navy mb-1 pr-6">P2P Decentralized <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full ml-1">Proposed</span></h4>
                  <p className="text-[12.5px] text-slate-500">Autonomous peer negotiation with edge-chasing deadlock prevention.</p>
                </div>
                
                <div className="border border-line bg-white rounded-[16px] p-5 cursor-pointer hover:border-slate-300 transition-colors">
                  <h4 className="text-[14px] font-bold text-navy mb-1">Centralized Baseline</h4>
                  <p className="text-[12.5px] text-slate-500">Traditional single-router sequential queue baseline.</p>
                </div>
              </div>
            </div>

            {/* 3. Budget */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[16px] font-bold text-navy">3. Resource Allocation Credit Cap</h3>
                <div className="text-[18px] font-display font-bold text-indigo-600">
                  ${budget.toFixed(2)} USDC
                </div>
              </div>
              
              <div className="relative pt-2 pb-6">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-line rounded-full appearance-none cursor-pointer accent-indigo-600 outline-none"
                />
                <div className="flex justify-between items-center mt-3 text-[12px] font-medium text-slate-400">
                  <span>$5 USDC</span>
                  <span>$100 USDC</span>
                </div>
              </div>
            </div>
            
            {/* 4. Simulation Outcome */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <h3 className="text-[16px] font-bold text-navy mb-4">4. Fault & Resilience Verification</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div 
                  onClick={() => setSimulationOutcome('SUCCESS')}
                  className={`border-[2px] rounded-[16px] p-5 cursor-pointer relative transition-all ${
                    simulationOutcome === 'SUCCESS' 
                      ? 'border-indigo-600 bg-indigo-50/40' 
                      : 'border-line bg-white hover:border-slate-300'
                  }`}
                >
                  {simulationOutcome === 'SUCCESS' && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <h4 className="text-[14px] font-bold text-navy mb-1 pr-6">Normal: Full Coordination</h4>
                  <p className="text-[12.5px] text-slate-500">Autonomous peer bartering resolves shared resources safely.</p>
                </div>
                
                <div 
                  onClick={() => setSimulationOutcome('ROLLED_BACK')}
                  className={`border-[2px] rounded-[16px] p-5 cursor-pointer relative transition-all ${
                    simulationOutcome === 'ROLLED_BACK' 
                      ? 'border-indigo-600 bg-indigo-50/40' 
                      : 'border-line bg-white hover:border-slate-300'
                  }`}
                >
                  {simulationOutcome === 'ROLLED_BACK' && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <h4 className="text-[14px] font-bold text-navy mb-1 pr-6">Failure Injection: Auto-Rollback</h4>
                  <p className="text-[12.5px] text-slate-500">Simulate peer failure. Atomic escrow auto-refunds all reserved credits.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleCreateRequest}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-4 text-[15px] font-bold transition-colors shadow-md mt-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Negotiating Peer Allocations...' : 'Launch Coordinated Task'}
            </button>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1: Selected AI Agents */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <h3 className="text-[16px] font-bold text-navy mb-5">Autonomous Agent Peers</h3>
              <div className="flex flex-col gap-4">
                {agents.map((agent) => (
                  <div key={agent.name} className="flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-[16px] text-indigo-600 shrink-0">
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-[14px] font-bold text-navy">{agent.name}</div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Autonomous
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-snug">{agent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Card 2: Request Summary */}
            <div className="bg-white rounded-[24px] p-7 border border-line shadow-[0_4px_24px_rgba(15,27,61,0.02)]">
              <h3 className="text-[16px] font-bold text-navy mb-5">Request Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">Execution Mode</span>
                  <span className="font-bold text-navy">Smart Routing</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">Estimated Cost</span>
                  <span className="font-bold text-navy">₹45 - ₹120</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">Estimated Time</span>
                  <span className="font-bold text-navy">4 - 8 seconds</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">Agents Selected</span>
                  <span className="font-bold text-navy">5</span>
                </div>
              </div>

              <div className="pt-5 border-t border-line">
                <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Security</div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="text-[16px]">🔒</div>
                  <div className="text-[13px] font-bold text-navy">x402 Secure Payments</div>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <div className="text-[12px] text-slate-500">Powered by Algorand</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewRequestPage;
