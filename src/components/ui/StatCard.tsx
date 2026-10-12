import React from 'react';

export type StatTint = 'peach' | 'lavender' | 'mint' | 'blue';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  icon: React.ReactNode;
  tint: StatTint;
  badgeRight?: string;
  sparklineColor?: string;
  sparklineData?: number[];
}

const tintStyles: Record<StatTint, {
  cardBg: string;
  iconBadgeBg: string;
  iconColor: string;
  sparklineDefault: string;
}> = {
  peach: {
    cardBg: 'bg-gradient-to-br from-[#FFF5EE] via-[#FFF8F3] to-[#FFEFE6]',
    iconBadgeBg: 'bg-[#FFE9DC]',
    iconColor: 'text-[#F26B21]',
    sparklineDefault: '#F26B21'
  },
  lavender: {
    cardBg: 'bg-gradient-to-br from-[#F8F5FF] via-[#FBF9FF] to-[#F1EBFF]',
    iconBadgeBg: 'bg-[#EDE7FF]',
    iconColor: 'text-[#7048E8]',
    sparklineDefault: '#7048E8'
  },
  mint: {
    cardBg: 'bg-gradient-to-br from-[#F0FDF8] via-[#F6FEFA] to-[#E6FAF2]',
    iconBadgeBg: 'bg-[#DDF6EC]',
    iconColor: 'text-[#0CA678]',
    sparklineDefault: '#0CA678'
  },
  blue: {
    cardBg: 'bg-gradient-to-br from-[#F2F7FF] via-[#F8FBFF] to-[#E8F1FF]',
    iconBadgeBg: 'bg-[#E3EFFF]',
    iconColor: 'text-[#228BE6]',
    sparklineDefault: '#228BE6'
  }
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  icon,
  tint,
  badgeRight,
  sparklineColor,
}) => {
  const styles = tintStyles[tint];
  const color = sparklineColor || styles.sparklineDefault;

  return (
    <div className={`
      relative rounded-[20px] p-5.5
      border border-white/85 shadow-[0_8px_30px_rgba(242,107,33,0.06)]
      backdrop-blur-[12px]
      ${styles.cardBg}
      hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(242,107,33,0.1)]
      transition-all duration-200
      flex flex-col justify-between
    `}>
      {/* Top Row: Icon Badge + Optional Right Badge */}
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-full ${styles.iconBadgeBg} ${styles.iconColor} flex items-center justify-center shadow-xs`}>
          {icon}
        </div>

        {badgeRight && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-slate-100 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{badgeRight}</span>
          </div>
        )}
      </div>

      {/* Middle: Title & Big Bold Number */}
      <div className="mt-3.5">
        <span className="text-[12.5px] font-semibold text-[#5B6B8C] tracking-wide block">
          {title}
        </span>
        <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight mt-0.5 flex items-baseline gap-1.5">
          <span>{value}</span>
          {unit && <span className="text-sm font-semibold text-[#8F9BBA]">{unit}</span>}
        </div>
      </div>

      {/* Bottom Row: Green '↑ %' Pill + Small Sparkline */}
      <div className="flex items-center justify-between mt-4 pt-1">
        {change ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-bold bg-[#DDF6EC] text-[#0CA678] border border-[#0CA678]/15">
            <span>↑</span> {change}
          </span>
        ) : <div />}

        {/* Small Sparkline */}
        <div className="w-24 h-7">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 28" fill="none">
            <path
              d="M0,22 Q20,20 35,14 T65,16 T85,6 T100,4"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
