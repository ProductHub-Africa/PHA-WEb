
import React, { useState } from 'react';
import { COLORS } from '../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Added h-[46px] and md:h-auto to maintain exact mobile height requirement
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors duration-300 font-bold focus:outline-none focus:ring-4 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed h-[46px] md:h-auto";
  
  const sizeStyles = {
    sm: "px-5 py-2 text-[14px]",
    md: "px-8 py-3 text-[16px]",
    lg: "px-10 py-4 text-[18px]",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isHovered ? COLORS.primary[600] : COLORS.primary[500],
          color: '#fff',
          boxShadow: isHovered ? '0 10px 15px -3px rgba(19, 82, 145, 0.2), 0 4px 6px -2px rgba(19, 82, 145, 0.1)' : '0 4px 6px -1px rgba(19, 82, 145, 0.1), 0 2px 4px -1px rgba(19, 82, 145, 0.06)'
        };
      case 'secondary':
        return {
          backgroundColor: isHovered ? COLORS.secondary[400] : COLORS.secondary[500],
          color: COLORS.grey[900],
          boxShadow: isHovered ? '0 10px 15px -3px rgba(218, 167, 40, 0.2)' : 'none'
        };
      case 'outline':
        return {
          backgroundColor: isHovered ? COLORS.primary[50] : 'transparent',
          border: `2px solid ${COLORS.primary[500]}`,
          color: COLORS.primary[500],
        };
      case 'text':
        return {
          backgroundColor: isHovered ? COLORS.primary[50] : 'transparent',
          color: COLORS.primary[500],
        };
      default:
        return {};
    }
  };

  const variantStyle = getVariantStyles();
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${widthClass} ${className}`}
      style={{
        ...variantStyle,
        borderColor: variant === 'outline' ? variantStyle.border?.split(' ')[2] : undefined,
        borderWidth: variant === 'outline' ? '2px' : '0px',
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};
