import React from 'react';
import { Check, X, Shield, Sparkles, Scale } from 'lucide-react';
import { COMPARISON_MATRIX } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

export default function WhyChooseUsSection({ lang }) {
  return (
    <section id="comparison" className="relative py-24 bg-white dark:bg-navy-deep border-y border-surface-border dark:border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <Scale className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Financial Comparison</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>చిట్ ఫండ్ vs ఇతర మార్గాలు: <span className="metallic-gold-text">స్పష్టమైన పోలిక</span></>
            ) : (
              <>Chit Funds vs <span className="metallic-gold-text">Traditional Banking</span></>
            )}
          </h2>
        </div>

        {/* 3D Modern Comparison Matrix in Clean White Table */}
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[760px] rounded-3xl border border-surface-border dark:border-gold/30 bg-white dark:bg-navy-dark shadow-3d-card overflow-hidden">
            
            {/* Header in Deep Navy */}
            <div className="grid grid-cols-12 bg-navy text-white p-5 border-b border-gold/30 items-center">
              <div className="col-span-4 text-xs font-mono font-bold uppercase tracking-wider text-gold-champagne">
                Financial Metric
              </div>
              <div className="col-span-3 text-center text-xs font-mono font-extrabold text-gold-light p-2 rounded-xl bg-navy-dark/90 border border-gold/40 shadow-inner">
                ⭐ Siva Kaveri Chits
              </div>
              <div className="col-span-3 text-center text-xs font-mono font-semibold text-white/80">
                Bank Fixed Deposits & Loans
              </div>
              <div className="col-span-2 text-center text-xs font-mono font-semibold text-red-300">
                Private Moneylenders
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-surface-border dark:divide-gold/15">
              {COMPARISON_MATRIX.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm transition-colors ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-surface-subtle/50 dark:bg-navy/20'
                  }`}
                >
                  <div className="col-span-4 pr-3">
                    <p className="font-bold text-navy dark:text-white">
                      {row.feature}
                    </p>
                    <p className="text-[11px] font-mono text-charcoal-muted dark:text-white/60 mt-0.5">
                      {row.teluguFeature}
                    </p>
                  </div>

                  {/* Siva Kaveri Chit (Winner Column) */}
                  <div className="col-span-3 px-3 text-center font-bold text-navy dark:text-gold-light bg-navy/5 dark:bg-gold/5 py-2.5 rounded-xl border border-navy/10 dark:border-gold/30">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-mono">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{row.skc}</span>
                    </div>
                  </div>

                  {/* Bank */}
                  <div className="col-span-3 px-3 text-center text-charcoal-light dark:text-white/70 text-xs">
                    {row.bankFd}
                  </div>

                  {/* Moneylender */}
                  <div className="col-span-2 px-2 text-center text-red-600 dark:text-red-400 font-semibold text-xs flex items-center justify-center gap-1">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>{row.moneylender}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
