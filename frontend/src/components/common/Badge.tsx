import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '../../lib/utils';

export const DietaryBadge: React.FC<{ vegetarian: boolean; className?: string }> = ({ vegetarian, className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 border p-0.5 rounded-sm shrink-0",
        vegetarian ? "border-emerald-600 bg-emerald-950/20" : "border-rose-700 bg-rose-950/20",
        className
      )}
      title={vegetarian ? "Vegetarian" : "Non-Vegetarian"}
      aria-label={vegetarian ? "Vegetarian" : "Non-Vegetarian"}
    >
      {vegetarian ? (
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
      ) : (
        <div className="w-0 h-0 border-x-4 border-x-transparent border-b-[8px] border-b-rose-500" />
      )}
    </div>
  );
};

export const SpicyBadge: React.FC<{ spicy?: boolean; className?: string }> = ({ spicy, className }) => {
  if (!spicy) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-terracotta-500/15 text-terracotta-400 border border-terracotta-500/30",
        className
      )}
      title="Spicy dish"
    >
      <Flame className="w-3 h-3 text-terracotta-500 fill-terracotta-500" />
      <span>Spicy</span>
    </span>
  );
};

export const StatusBadge: React.FC<{
  status: 'pending' | 'confirmed' | 'cancelled' | 'unread' | 'read' | 'resolved';
  className?: string;
}> = ({ status, className }) => {
  const styles = {
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    cancelled: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    unread: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    read: 'bg-charcoal-700 text-cream-300 border-charcoal-600',
    resolved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wider uppercase border",
        styles[status],
        className
      )}
    >
      {status}
    </span>
  );
};
