import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  tagline: string;
  emoji?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  tagline,
  emoji,
  action,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pt-1 pb-2">
      {/* Left Column: Heading + Subtitle */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-3xl md:text-[36px] font-extrabold text-[#1B2559] tracking-tight leading-tight flex items-center gap-2">
          {title} {emoji && <span>{emoji}</span>}
        </h1>
        <p className="text-[#5B6B8C] text-sm md:text-[15px] mt-2 leading-relaxed">
          {subtitle}
        </p>

        {action && (
          <div className="mt-4 flex items-center gap-3">
            {action}
          </div>
        )}
      </div>

      {/* Right Column: Robot Mascot + Pastel Blobs + Handwriting Tagline */}
      <div className="relative flex items-end justify-end md:justify-center min-w-[280px] lg:min-w-[340px] h-[150px] md:h-[175px] -mt-2 md:-mt-4">
        
        {/* Pastel gradient background blob aura */}
        <div className="absolute inset-0 rounded-bl-[60px] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#DCEBFF]/50 via-[#E6DDFB]/40 to-[#FFD9BF]/40 rounded-bl-[60px]"></div>
          {/* Decorative soft blurred circles */}
          <div className="absolute top-2 left-6 w-16 h-16 bg-[#FFD9BF]/60 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-20 h-14 bg-[#E6DDFB]/50 rounded-full blur-xl"></div>
          <div className="absolute top-6 right-10 w-16 h-16 bg-[#DCEBFF]/60 rounded-full blur-lg"></div>
          
          {/* Small decorative sparkles */}
          <div className="absolute top-4 left-18 w-2 h-2 bg-[#F26B21] rounded-full opacity-60"></div>
          <div className="absolute top-14 left-6 w-1.5 h-1.5 bg-[#228BE6] rounded-full opacity-50"></div>
        </div>

        {/* Floating Handwriting Tagline (Caveat Font) */}
        <div 
          className="absolute -top-1 right-1 lg:right-4 z-20 pointer-events-none" 
          style={{ transform: 'rotate(-7deg)' }}
        >
          <span 
            className="text-[#1B2559] font-handwriting text-[20px] md:text-[22px] font-bold leading-tight block text-right filter drop-shadow-xs"
            style={{ letterSpacing: '0.02em', color: '#1B2559' }}
          >
            {tagline}
          </span>
        </div>

        {/* Robot Image Container */}
        <div className="relative z-10 w-[175px] h-[150px] md:w-[210px] md:h-[175px] flex items-end justify-center mr-6 lg:mr-10">
          <img 
            src="/images/robot_assistant.jpg" 
            alt="AlgoVerse AI Assistant" 
            className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
