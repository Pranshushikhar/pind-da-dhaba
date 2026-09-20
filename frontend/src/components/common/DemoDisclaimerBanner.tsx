import React, { useState } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const DemoDisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-charcoal-950/95 border-b border-charcoal-800/80 text-cream-400 text-[10px] sm:text-[11px] py-1 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-1 h-1 rounded-full bg-saffron-500/80 shrink-0" />
          <span className="font-medium text-saffron-400/90 uppercase tracking-widest text-[9px] sm:text-[10px]">{siteConfig.demoDisclaimer}:</span>
          <span className="text-cream-400/80 hidden sm:inline text-[10px]">Fictional portfolio demo concept.</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/admin"
            className="text-terracotta-400/90 hover:text-terracotta-300 underline underline-offset-2 transition-colors text-[10px] tracking-wider uppercase"
          >
            Demo Admin →
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-cream-400/60 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss demo notice"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
