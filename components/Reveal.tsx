import React, { useEffect, useRef, useState } from 'react';

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
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = '',
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(75px)';
      case 'down': return 'translateY(-75px)';
      case 'left': return 'translateX(75px)';
      case 'right': return 'translateX(-75px)';
      case 'none': return 'none';
      default: return 'translateY(75px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform(),
        transition: `all ${duration}s cubic-bezier(0.5, 0, 0, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};