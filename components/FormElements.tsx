
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  light?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, className = '', light = false }) => (
  <label className={`block text-xs font-bold ${light ? 'text-blue-200' : 'text-gray-700'} mb-2 uppercase tracking-wide flex items-center gap-1 ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const baseInputClasses = "w-full h-[46px] bg-transparent border border-gray-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#daa728]/50 focus:border-[#daa728] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";
const lightInputClasses = "w-full h-[46px] bg-transparent border border-white/20 rounded-xl px-4 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all text-sm disabled:opacity-30";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { light?: boolean }>(
  ({ className = '', light = false, ...props }, ref) => (
    <input
      ref={ref}
      className={`${light ? lightInputClasses : baseInputClasses} ${className}`}
      {...props}
    />
  )
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { light?: boolean }>(
  ({ className = '', children, light = false, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={`${light ? lightInputClasses : baseInputClasses} appearance-none cursor-pointer pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${light ? 'text-blue-200' : 'text-gray-400'}`} />
    </div>
  )
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { light?: boolean }>(
  ({ className = '', light = false, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`${light ? lightInputClasses : baseInputClasses} h-auto py-3 min-h-[100px] resize-none ${className}`}
      {...props}
    />
  )
);
