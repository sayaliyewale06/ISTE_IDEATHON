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
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-1">
      {/* Left Column: Heading + Subtitle (Vertically centered against hero) */}
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl md:text-[38px] font-extrabold text-[#1B2559] tracking-tight leading-tight flex items-center gap-2.5">
          <span>{title}</span> {emoji && <span>{emoji}</span>}
        </h1>
        <p className="text-[#5B6B8C] text-sm md:text-[15px] mt-2 leading-relaxed max-w-2xl font-medium">
          {subtitle}
        </p>

        {action && (
          <div className="mt-4 flex items-center gap-3">
            {action}
          </div>
        )}
      </div>

      {/* Right Column: Hero Banner Illustration Card (Aligned flush with right edge) */}
      <div className="relative shrink-0 flex items-center justify-end max-w-full">
        {/* Soft pastel aura container */}
        <div className="relative w-[280px] sm:w-[330px] md:w-[360px] h-[150px] md:h-[165px] rounded-2xl md:rounded-[24px] bg-gradient-to-br from-[#DCEBFF]/60 via-[#E6DDFB]/50 to-[#FFD9BF]/50 p-4 border border-white/70 shadow-2xs flex items-center justify-between overflow-hidden">
          
          {/* Decorative soft blurred circles */}
          <div className="absolute top-2 left-4 w-20 h-20 bg-[#FFD9BF]/60 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-2 right-6 w-24 h-16 bg-[#DCEBFF]/60 rounded-full blur-xl pointer-events-none" />

          {/* Floating Tagline (Caveat Font) */}
          <div 
            className="absolute top-3 right-4 z-20 pointer-events-none"
            style={{ transform: 'rotate(-5deg)' }}
          >
            <span 
              className="text-[#1B2559] font-handwriting text-[18px] md:text-[20px] font-bold leading-tight block text-right filter drop-shadow-xs select-none"
              style={{ letterSpacing: '0.01em' }}
            >
              {tagline}
            </span>
          </div>

          {/* Robot mascot image */}
          <div className="absolute bottom-0 right-3 sm:right-5 w-[150px] sm:w-[175px] h-[130px] sm:h-[145px] z-10 flex items-end justify-center pointer-events-none">
            <img 
              src="/images/robot_assistant.jpg" 
              alt="AlgoVerse AI Assistant" 
              className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
