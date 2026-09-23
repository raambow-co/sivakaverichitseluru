import React from 'react';
import { Gavel, Clock, Users, ShieldCheck, CheckCircle2, Sparkles, Building, Video } from 'lucide-react';
import InteractiveAuctionConsole from '../3d/InteractiveAuctionConsole';

export default function AuctionExperienceSection({ lang, onApplyScheme }) {
  return (
    <section id="auction-room" className="relative py-24 bg-white dark:bg-navy-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider">
            <Gavel className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Live Reverse Auction Hub</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>పారదర్శక రివర్స్ వేలం <span className="metallic-gold-text">సిమ్యులేటర్</span></>
            ) : (
              <>3D Live Reverse <span className="metallic-gold-text">Auction Room</span></>
            )}
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-charcoal-light dark:text-white/80 font-body">
            Experience our 100% transparent bidding mechanism. Adjust the discount slider below to simulate real-time prize money payouts and subscriber dividend returns.
          </p>
        </div>

        {/* 3D Live Interactive Auction Console */}
        <InteractiveAuctionConsole onApplyScheme={onApplyScheme} />

      </div>
    </section>
  );
}
