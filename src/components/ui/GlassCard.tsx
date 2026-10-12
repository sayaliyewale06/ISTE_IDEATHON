import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white/85 backdrop-blur-[12px]
        rounded-[20px] border border-white/80
        shadow-[0_8px_30px_rgba(242,107,33,0.08)]
        p-6
        ${hover ? 'hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(242,107,33,0.12)] transition-all duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
