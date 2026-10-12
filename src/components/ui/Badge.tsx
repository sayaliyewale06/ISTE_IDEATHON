import React from 'react';

export type BadgeVariant = 'peach' | 'lavender' | 'mint' | 'blue' | 'rose' | 'amber';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  peach: 'bg-[#FFE9DC] text-[#F26B21] border-[#F26B21]/20',
  lavender: 'bg-[#EDE7FF] text-[#7048E8] border-[#7048E8]/20',
  mint: 'bg-[#DDF6EC] text-[#0CA678] border-[#0CA678]/20',
  blue: 'bg-[#E3EFFF] text-[#228BE6] border-[#228BE6]/20',
  rose: 'bg-[#FFE3E3] text-[#FA5252] border-[#FA5252]/20',
  amber: 'bg-[#FFF3BF] text-[#F59F00] border-[#F59F00]/20'
};

const dotStyles: Record<BadgeVariant, string> = {
  peach: 'bg-[#F26B21]',
  lavender: 'bg-[#7048E8]',
  mint: 'bg-[#0CA678]',
  blue: 'bg-[#228BE6]',
  rose: 'bg-[#FA5252]',
  amber: 'bg-[#F59F00]'
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'peach',
  pulse = false,
  className = ''
}) => {
  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-2.5 py-0.5 rounded-full
      text-[11px] font-bold border
      shadow-2xs
      ${variantStyles[variant]}
      ${className}
    `}>
      {pulse && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]} animate-pulse`}></span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
