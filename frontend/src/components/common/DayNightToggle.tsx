import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export const DayNightToggle: React.FC<{ className?: string; compact?: boolean }> = ({
  className,
  compact = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === 'day';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center rounded-full p-1 border transition-all duration-700 ease-out cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950",
        isDay
          ? "bg-earth-900/60 border-amber-600/40 text-cream-100 shadow-[0_2px_12px_rgba(229,169,60,0.15)]"
          : "bg-charcoal-900/90 border-charcoal-700/80 text-cream-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
        compact ? "h-7 text-[10px]" : "h-8 text-[11px]",
        className
      )}
      role="switch"
      aria-checked={!isDay}
      aria-label={`Switch atmosphere to ${isDay ? 'Night' : 'Day'} mode`}
      title={`Current: ${isDay ? 'Day' : 'Night'} Haveli Atmosphere. Click to switch.`}
    >
      {/* Sliding Pill Indicator */}
      <span
        className={cn(
          "absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-out",
          isDay
            ? "left-1 right-[50%] bg-gradient-to-r from-amber-600/40 to-saffron-500/40 border border-saffron-400/50 shadow-[0_0_8px_rgba(229,169,60,0.3)]"
            : "left-[50%] right-1 bg-charcoal-800 border border-amber-500/30 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        )}
      />

      {/* DAY Option */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-1 px-2.5 py-0.5 uppercase tracking-widest font-medium transition-colors duration-300 select-none",
          isDay ? "text-saffron-300 font-semibold" : "text-cream-400/70 hover:text-cream-200"
        )}
      >
        <Sun className="w-3 h-3 text-amber-400 shrink-0" />
        <span className={compact ? "hidden sm:inline" : "inline"}>Day</span>
      </span>

      {/* Divider */}
      <span className="relative z-10 text-charcoal-700 select-none text-[9px]">•</span>

      {/* NIGHT Option */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-1 px-2.5 py-0.5 uppercase tracking-widest font-medium transition-colors duration-300 select-none",
          !isDay ? "text-saffron-300 font-semibold" : "text-cream-400/70 hover:text-cream-200"
        )}
      >
        <Moon className="w-3 h-3 text-saffron-400 shrink-0" />
        <span className={compact ? "hidden sm:inline" : "inline"}>Night</span>
      </span>
    </button>
  );
};
