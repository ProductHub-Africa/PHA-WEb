
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

  // Strictly enforced 46px height for all buttons
  const baseStyles = "inline-flex items-center justify-center rounded-xl transition-all duration-300 font-bold focus:outline-none focus:ring-4 focus:ring-opacity-20 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed h-[46px] text-sm md:text-base";
  
  const sizeStyles = {
    sm: "px-5",
    md: "px-8",
    lg: "px-10",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isHovered ? COLORS.primary[600] : COLORS.primary[500],
          color: '#fff',
        };
      case 'secondary':
        return {
          backgroundColor: isHovered ? COLORS.secondary[400] : COLORS.secondary[500],
          color: COLORS.grey[900],
        };
      case 'outline':
        return {
          backgroundColor: isHovered ? COLORS.primary[50] : 'transparent',
          border: `1.5px solid ${COLORS.primary[500]}`,
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
      style={{ ...variantStyle, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};
