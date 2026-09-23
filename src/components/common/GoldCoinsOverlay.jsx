import React from 'react';
import { Coins, Sparkles, TrendingUp } from 'lucide-react';

export default function GoldCoinsOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Badge 1 - Top Left */}
      <div className="absolute top-[12%] left-[4%] hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-ivory-light/90 dark:bg-forest-dark/90 border border-gold/40 shadow-card-soft backdrop-blur-md animate-float-gentle">
        <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-forest-deep shadow-sm">
          <Coins className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-charcoal-muted dark:text-ivory/60 font-medium">Monthly Dividend Yield</p>
          <p className="text-xs font-bold font-mono text-gold-dark dark:text-gold-light">Up to 12% p.a.</p>
        </div>
      </div>

      {/* Floating Badge 2 - Top Right */}
      <div 
        className="absolute top-[18%] right-[5%] hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-ivory-light/90 dark:bg-forest-dark/90 border border-gold/40 shadow-card-soft backdrop-blur-md animate-float-gentle"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="w-8 h-8 rounded-full bg-forest text-gold-light border border-gold/30 flex items-center justify-center shadow-sm">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-charcoal-muted dark:text-ivory/60 font-medium">Auction Disbursal</p>
          <p className="text-xs font-bold font-mono text-forest-dark dark:text-ivory">24 - 48 Hours</p>
        </div>
      </div>
    </div>
  );
}
