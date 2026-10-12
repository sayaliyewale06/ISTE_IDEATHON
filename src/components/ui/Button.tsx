import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  if (variant === 'primary') {
    return (
      <button
        className={`
          flex items-center justify-center gap-2
          px-5 py-2.5 rounded-xl
          bg-gradient-to-r from-[#FF8A4C] to-[#F26B21]
          hover:from-[#FF7E36] hover:to-[#E25C14]
          text-white text-xs md:text-sm font-bold
          shadow-[0_4px_14px_rgba(242,107,33,0.3)]
          hover:shadow-[0_6px_20px_rgba(242,107,33,0.42)]
          hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-200 cursor-pointer disabled:opacity-50
          ${className}
        `}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        className={`
          flex items-center justify-center gap-2
          px-4 py-2 rounded-xl
          bg-white/90 hover:bg-white
          text-[#1B2559] text-xs md:text-sm font-semibold
          border border-slate-200/80
          shadow-xs hover:shadow-sm
          hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-200 cursor-pointer
          ${className}
        `}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      className={`
        flex items-center justify-center gap-2
        px-3 py-1.5 rounded-xl
        text-[#5B6B8C] hover:text-[#1B2559] hover:bg-white/60
        text-xs md:text-sm font-medium
        transition-all duration-200 cursor-pointer
        ${className}
      `}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
