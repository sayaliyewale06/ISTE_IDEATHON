import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PageHeader from '../components/ui/PageHeader';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { 
  Network, 
  Clock, 
  Globe, 
  Sun
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState<'General' | 'Network' | 'Agents' | 'Notifications' | 'Security'>('General');

  // General Settings state
  const [networkName, setNetworkName] = useState('AlgoVerse P2P Mesh');
  const [timezone, setTimezone] = useState('(GMT+5:30) India Standard Time');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');

  // Toggles in orange
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [peerDiscovery, setPeerDiscovery] = useState(true);
  const [instantSettlement, setInstantSettlement] = useState(true);

  // Editing state
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const startEdit = (field: string, currentVal: string) => {
    setEditingField(field);
    setTempValue(currentVal);
  };

  const saveEdit = (field: string) => {
    if (field === 'Network Name') setNetworkName(tempValue);
    if (field === 'Timezone') setTimezone(tempValue);
    if (field === 'Language') setLanguage(tempValue);
    if (field === 'Theme') setTheme(tempValue);

    setEditingField(null);
    showSuccess(`${field} updated successfully!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-7 pb-12 max-w-5xl">
        
        {/* ================= HERO HEADER ================= */}
        <PageHeader
          title="Settings"
          subtitle="Configure your network, agents, and preferences."
          tagline="Tailor your intelligent node ✦"
        />

        {/* ================= SUB-TABS ROW ================= */}
        <div className="flex items-center gap-6 border-b border-orange-100/70 text-xs font-bold overflow-x-auto">
          {(['General', 'Network', 'Agents', 'Notifications', 'Security'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 transition-all duration-200 whitespace-nowrap border-b-2 font-extrabold cursor-pointer ${
                  isSelected
                    ? 'border-[#F26B21] text-[#F26B21]'
                    : 'border-transparent text-[#5B6B8C] hover:text-[#1B2559]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================= SECTION 1: GENERAL SETTINGS GLASS CARD ================= */}
        <GlassCard className="p-7 md:p-9 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-extrabold text-[#1B2559] tracking-tight">
              General Configuration
            </h2>
            <span className="text-xs font-semibold text-[#8F9BBA]">Node ID: #AG-78921</span>
          </div>

          <div className="divide-y divide-slate-100/70">
            
            {/* Setting 1: Network Name */}
            <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE9DC] text-[#F26B21] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13.5px] font-extrabold text-[#1B2559]">Network Name</div>
                  {editingField === 'Network Name' ? (
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="mt-1.5 text-xs px-3 py-1.5 rounded-[12px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559] font-bold"
                    />
                  ) : (
                    <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">{networkName}</div>
                  )}
                </div>
              </div>

              <div>
                {editingField === 'Network Name' ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => saveEdit('Network Name')} className="py-1.5 px-3 text-xs">
                      Save
                    </Button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#8F9BBA] hover:text-[#1B2559] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit('Network Name', networkName)}
                    className="text-xs font-bold text-[#8F9BBA] hover:text-[#F26B21] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Setting 2: Timezone */}
            <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E3EFFF] text-[#228BE6] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13.5px] font-extrabold text-[#1B2559]">Timezone</div>
                  {editingField === 'Timezone' ? (
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="mt-1.5 text-xs px-3 py-1.5 rounded-[12px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559] font-bold"
                    />
                  ) : (
                    <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">{timezone}</div>
                  )}
                </div>
              </div>

              <div>
                {editingField === 'Timezone' ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => saveEdit('Timezone')} className="py-1.5 px-3 text-xs">
                      Save
                    </Button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#8F9BBA] hover:text-[#1B2559] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit('Timezone', timezone)}
                    className="text-xs font-bold text-[#8F9BBA] hover:text-[#F26B21] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Setting 3: Language */}
            <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EDE7FF] text-[#7048E8] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13.5px] font-extrabold text-[#1B2559]">Language</div>
                  {editingField === 'Language' ? (
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="mt-1.5 text-xs px-3 py-1.5 rounded-[12px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559] font-bold"
                    />
                  ) : (
                    <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">{language}</div>
                  )}
                </div>
              </div>

              <div>
                {editingField === 'Language' ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => saveEdit('Language')} className="py-1.5 px-3 text-xs">
                      Save
                    </Button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#8F9BBA] hover:text-[#1B2559] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit('Language', language)}
                    className="text-xs font-bold text-[#8F9BBA] hover:text-[#F26B21] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Setting 4: Theme */}
            <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF3BF] text-[#F59F00] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13.5px] font-extrabold text-[#1B2559]">Theme</div>
                  {editingField === 'Theme' ? (
                    <select
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="mt-1.5 text-xs px-3 py-1.5 rounded-[12px] bg-white border border-slate-200 focus:outline-hidden focus:border-[#F26B21] focus:ring-3 focus:ring-[#F26B21]/15 text-[#1B2559] font-bold"
                    >
                      <option value="Light">Light (Warm Peach Aesthetic)</option>
                      <option value="Dark">Dark Mode</option>
                      <option value="System">System Default</option>
                    </select>
                  ) : (
                    <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">{theme}</div>
                  )}
                </div>
              </div>

              <div>
                {editingField === 'Theme' ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => saveEdit('Theme')} className="py-1.5 px-3 text-xs">
                      Save
                    </Button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#8F9BBA] hover:text-[#1B2559] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit('Theme', theme)}
                    className="text-xs font-bold text-[#8F9BBA] hover:text-[#F26B21] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

          </div>
        </GlassCard>

        {/* ================= SECTION 2: TOGGLES IN ORANGE ================= */}
        <GlassCard className="p-7 md:p-9 space-y-6">
          <h2 className="text-[17px] font-extrabold text-[#1B2559] tracking-tight">
            Mesh Automation & Privacy Toggles
          </h2>

          <div className="divide-y divide-slate-100/70">
            {/* Toggle 1: Auto-rebalance */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-extrabold text-[#1B2559]">Autonomous Deadlock Resolution</div>
                <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">Automatically break cyclic resource dependencies across peer agents</div>
              </div>

              <button
                onClick={() => setAutoRebalance(!autoRebalance)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  autoRebalance ? 'bg-[#F26B21]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    autoRebalance ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Peer Discovery */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-extrabold text-[#1B2559]">P2P Multi-Cast Peer Discovery</div>
                <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">Allow nearby regional agent nodes to establish low-latency links</div>
              </div>

              <button
                onClick={() => setPeerDiscovery(!peerDiscovery)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  peerDiscovery ? 'bg-[#F26B21]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    peerDiscovery ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Instant Settlement */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-extrabold text-[#1B2559]">x402 Micro-Settlements</div>
                <div className="text-xs text-[#5B6B8C] font-semibold mt-0.5">Enable immediate off-chain optimistic payment channels</div>
              </div>

              <button
                onClick={() => setInstantSettlement(!instantSettlement)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  instantSettlement ? 'bg-[#F26B21]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    instantSettlement ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
