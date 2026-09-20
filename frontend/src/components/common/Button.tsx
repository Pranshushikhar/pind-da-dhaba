import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-none focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:ring-offset-2 focus:ring-offset-charcoal-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wider uppercase text-xs sm:text-sm';

    const variants = {
      primary: 'bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-lg shadow-terracotta-500/20 border border-terracotta-400/30',
      secondary: 'bg-saffron-500 text-charcoal-950 hover:bg-saffron-400 font-semibold shadow-lg shadow-saffron-500/20 border border-saffron-300/30',
      outline: 'border border-terracotta-500/50 text-cream-100 hover:border-terracotta-400 hover:bg-terracotta-500/10 hover:text-white',
      ghost: 'text-cream-300 hover:text-white hover:bg-charcoal-800/60',
      danger: 'bg-red-900/80 text-red-200 hover:bg-red-800 border border-red-700/50',
    };

    const sizes = {
      sm: 'px-3 py-2 text-xs min-h-[36px]',
      md: 'px-6 py-3 min-h-[44px]',
      lg: 'px-8 py-4 text-base min-h-[52px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
