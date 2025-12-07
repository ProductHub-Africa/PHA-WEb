import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  className = '',
}) => {
  return (
    <div className={className} style={{ width }}>
      {children}
    </div>
  );
};