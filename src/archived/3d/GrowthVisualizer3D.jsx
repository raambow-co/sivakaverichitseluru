import React, { useState } from 'react';
import TiltCard from './TiltCard';

export default function GrowthVisualizer3D() {
  const [selectedPlanAmount, setSelectedPlanAmount] = useState(500000);

  const tenureYears = 3.33; // 40 months

  // Projected returns
  const skcTotalPaid = Math.round(selectedPlanAmount * 0.82); // average 18% savings via dividends
  const skcProfit = selectedPlanAmount - skcTotalPaid;
  const skcROI = ((skcProfit / skcTotalPaid) * (1 / tenureYears) * 100).toFixed(1);

  const bankDepositGrowth = Math.round(skcTotalPaid * Math.pow(1 + 0.068 / 1, tenureYears * 1));
  const bankProfit = bankDepositGrowth - skcTotalPaid;

  return (
    <TiltCard className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 shadow-3d-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border dark:border-gold/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-navy dark:text-gold-light font-bold">
            3D Wealth Growth Simulator
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-navy dark:text-white">
            Dividend Compounding Comparison
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {[100000, 500000, 1000000, 2000000, 5000000].map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedPlanAmount(amt)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedPlanAmount === amt
                  ? 'bg-navy text-white dark:bg-gold-light dark:text-navy shadow-sm'
                  : 'bg-surface-subtle dark:bg-navy-deep text-charcoal-muted dark:text-white/60 hover:text-navy'
              }`}
            >
              ₹{(amt / 100000).toFixed(0)}L
            </button>
          ))}
        </div>
      </div>

      {/* 3D Visual Comparison Bars */}
      <div className="mt-8 space-y-6">
        
        {/* Bar 1: Siva Kaveri Chit */}
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
            <span className="flex items-center gap-2 text-navy dark:text-gold-light">
              <span className="w-2.5 h-2.5 rounded-full bg-navy dark:bg-gold inline-block" />
              <span>Siva Kaveri Chit Fund (Dividends + Liquidity)</span>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
              ₹{selectedPlanAmount.toLocaleString('en-IN')} (~{skcROI}% p.a. Dividend Yield)
            </span>
          </div>
          <div className="w-full h-5 rounded-full bg-surface-muted dark:bg-navy-deep p-0.5 border border-navy/20 dark:border-gold/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-navy to-emerald-500 transition-all duration-700 shadow-sm"
              style={{ width: '100%' }}
            />
          </div>
          <p className="text-[11px] text-charcoal-muted dark:text-white/60 mt-1">
            Total out-of-pocket payment: ~₹{skcTotalPaid.toLocaleString('en-IN')}. Plus instant borrowing access at any auction without bank paperwork.
          </p>
        </div>

        {/* Bar 2: Bank Recurring/Fixed Deposit */}
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
            <span className="flex items-center gap-2 text-charcoal-light dark:text-white/80">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>Commercial Bank FD / RD (Fixed Return)</span>
            </span>
            <span className="font-mono text-charcoal-light dark:text-white/80">
              ₹{bankDepositGrowth.toLocaleString('en-IN')} (6.8% p.a. - Taxable)
            </span>
          </div>
          <div className="w-full h-4 rounded-full bg-surface-muted dark:bg-navy-deep p-0.5 border border-surface-border dark:border-gold/20">
            <div
              className="h-full rounded-full bg-blue-500/70 transition-all duration-700"
              style={{ width: '74%' }}
            />
          </div>
          <p className="text-[11px] text-charcoal-muted dark:text-white/50 mt-1">
            Locked capital. Premature withdrawal incurs 1% penalty. Zero emergency cash flow.
          </p>
        </div>

      </div>
    </TiltCard>
  );
}
