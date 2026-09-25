import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { BRAND } from '../../constants/tokens';

export default function SealBadge({ size = "md", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md shadow-sm text-navy dark:text-white ${className}`}>
      <div className="relative flex items-center justify-center">
        <span className="absolute w-5 h-5 rounded-full bg-gold/30 animate-ping" />
        <ShieldCheck className="w-4 h-4 text-gold dark:text-gold-light relative z-10" />
      </div>
      <div className="text-left flex flex-col">
        <span className="text-[11px] font-semibold tracking-wider uppercase font-mono text-gold-dark dark:text-gold-light">
          Govt. Registered
        </span>
        <span className="text-[10px] text-charcoal-muted dark:text-white/70 leading-none">
          Chit Funds Act, 1982 • Eluru, AP
        </span>
      </div>
    </div>
  );
}
