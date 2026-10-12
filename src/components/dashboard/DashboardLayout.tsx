import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div 
      className="min-h-screen flex relative overflow-x-hidden text-[#1B2559]"
      style={{
        background: 'linear-gradient(180deg, #FFF6EE 0%, #FFEFE3 100%)'
      }}
    >
      {/* Soft blurred radial blobs (peach #FFD9BF, lavender #E6DDFB, light blue #DCEBFF at ~35% opacity) */}
      <div 
        className="fixed -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none filter blur-3xl z-0"
        style={{ background: '#FFD9BF', opacity: 0.35 }}
      />
      <div 
        className="fixed top-12 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none filter blur-3xl z-0"
        style={{ background: '#E6DDFB', opacity: 0.35 }}
      />
      <div 
        className="fixed bottom-12 -left-20 w-[450px] h-[450px] rounded-full pointer-events-none filter blur-3xl z-0"
        style={{ background: '#DCEBFF', opacity: 0.35 }}
      />
      <div 
        className="fixed -bottom-24 right-1/4 w-[380px] h-[380px] rounded-full pointer-events-none filter blur-3xl z-0"
        style={{ background: '#FFD9BF', opacity: 0.35 }}
      />

      {/* Sidebar with soft warm background & right border */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5 md:p-8 lg:p-9 overflow-auto max-w-[1440px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
