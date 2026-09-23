import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, ShieldCheck } from 'lucide-react';
import { CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

export default function ChitCalculator({ lang, onSelectSchemeForEnquiry }) {
  const [selectedSchemeId, setSelectedSchemeId] = useState(CHIT_SCHEMES[1].id); // default ₹5L Small Business Growth Chit
  const [auctionDiscountPercent, setAuctionDiscountPercent] = useState(25);
  const [memberRole, setMemberRole] = useState('saver'); // 'saver' or 'bidder'

  const currentScheme = CHIT_SCHEMES.find((s) => s.id === selectedSchemeId) || CHIT_SCHEMES[0];

  const totalValue = currentScheme.value;
  const tenure = currentScheme.tenure;
  const baseMonthly = Math.round(totalValue / tenure);

  const auctionDiscountTotal = Math.round(totalValue * (auctionDiscountPercent / 100));
  const foremanCommission = Math.round(totalValue * 0.05);
  const distributableDividendTotal = Math.max(0, auctionDiscountTotal - foremanCommission);
  const monthlyDividendPerMember = Math.round(distributableDividendTotal / tenure);

  const netPrizeMoney = totalValue - auctionDiscountTotal;
  const effectiveMonthly = Math.max(0, baseMonthly - monthlyDividendPerMember);
  const estimatedTotalPaid = effectiveMonthly * tenure;
  const netProfitForSaver = totalValue - estimatedTotalPaid;
  const annualizedReturnRate = ((netProfitForSaver / estimatedTotalPaid) * (12 / tenure) * 100).toFixed(1);

  return (
    <section id="calculator" className="relative py-24 bg-surface-subtle dark:bg-navy-deep/60 border-y border-surface-border dark:border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Interactive Financial Modeler</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>చిట్ పొదుపు & డివిడెండ్ <span className="metallic-gold-text">కాలిక్యులేటర్</span></>
            ) : (
              <>Installment & Dividend <span className="metallic-gold-text">Simulator</span></>
            )}
          </h2>
        </div>

        {/* Interactive Calculator Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls in Clean White (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-white dark:bg-navy-dark p-6 sm:p-8 rounded-3xl border border-surface-border dark:border-gold/30 shadow-3d-card">
            
            {/* Step 1: Scheme Presets */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted dark:text-white/70 mb-3">
                1. Select Chit Denomination:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CHIT_SCHEMES.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => setSelectedSchemeId(scheme.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedSchemeId === scheme.id
                        ? 'border-navy bg-navy/5 text-navy dark:border-gold dark:bg-gold/15 dark:text-white shadow-sm'
                        : 'border-surface-border bg-surface-subtle dark:bg-navy-deep text-charcoal dark:text-white/70 hover:border-navy/40'
                    }`}
                  >
                    <p className="font-mono font-black text-sm sm:text-base text-navy dark:text-white">
                      {scheme.formattedValue}
                    </p>
                    <p className="text-[11px] font-semibold text-gold-dark dark:text-gold-light truncate">
                      {scheme.name}
                    </p>
                    <p className="text-[10px] font-mono text-charcoal-muted dark:text-white/50 mt-1">
                      {scheme.tenure} Mo • {scheme.formattedMonthly}/mo
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Goal Persona */}
            <div className="pt-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted dark:text-white/70 mb-3">
                2. Your Financial Objective:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMemberRole('saver')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    memberRole === 'saver'
                      ? 'border-navy bg-navy text-white shadow'
                      : 'border-surface-border bg-surface-subtle dark:bg-navy-deep text-charcoal dark:text-white/70'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 text-gold-light shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-xs sm:text-sm">Long-Term Wealth</p>
                    <p className="text-[10px] opacity-75">Maximize Monthly Dividends</p>
                  </div>
                </button>

                <button
                  onClick={() => setMemberRole('bidder')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    memberRole === 'bidder'
                      ? 'border-navy bg-navy text-white shadow'
                      : 'border-surface-border bg-surface-subtle dark:bg-navy-deep text-charcoal dark:text-white/70'
                  }`}
                >
                  <PieChart className="w-5 h-5 text-gold-light shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-xs sm:text-sm">Instant Capital Need</p>
                    <p className="text-[10px] opacity-75">Auction Prize Money Payout</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Estimated Discount Slider */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted dark:text-white/70">
                  3. Estimated Average Auction Discount (%):
                </label>
                <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-sm bg-navy/10 text-navy dark:bg-gold/20 dark:text-gold-light border border-navy/20 dark:border-gold/30">
                  {auctionDiscountPercent}% (₹{auctionDiscountTotal.toLocaleString('en-IN')})
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={auctionDiscountPercent}
                onChange={(e) => setAuctionDiscountPercent(Number(e.target.value))}
                className="w-full h-3 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-navy dark:accent-gold-light"
              />
              <div className="flex justify-between text-[10px] font-mono text-charcoal-muted dark:text-white/50 mt-1.5">
                <span>5% Min (Foreman)</span>
                <span>25% (Realistic Avg)</span>
                <span className="text-amber-600 font-bold">40% (Govt Legal Max Cap)</span>
              </div>
            </div>

          </div>

          {/* Right Summary Result Panel in Deep Navy (5 cols) */}
          <div className="lg:col-span-5 bg-navy text-white p-6 sm:p-8 rounded-3xl border-2 border-gold shadow-3d-navy-card relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-champagne font-bold">
                  {currentScheme.tenure} Months Simulation
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  {currentScheme.formattedValue}
                </h3>
              </div>
              <span className="font-mono text-xl text-gold-light font-bold">
                ₹
              </span>
            </div>

            {/* Metric Breakdown */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs sm:text-sm">
                <span className="text-white/70">Base Monthly Installment:</span>
                <span className="font-mono font-bold text-white">{currentScheme.formattedMonthly}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs sm:text-sm">
                <span className="text-gold-light font-semibold">Monthly Dividend Benefit:</span>
                <span className="font-mono font-bold text-emerald-400">- ₹{monthlyDividendPerMember.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-dark/80 border border-gold/30 flex items-center justify-between shadow-inner">
                <div>
                  <p className="text-[10px] font-mono font-semibold text-gold-champagne uppercase tracking-wider">
                    Effective Monthly Payment
                  </p>
                  <p className="text-[10px] text-white/60">Your actual estimated contribution</p>
                </div>
                <p className="text-2xl font-black font-mono text-white">
                  ₹{effectiveMonthly.toLocaleString('en-IN')}
                </p>
              </div>

              {memberRole === 'saver' ? (
                <div className="p-4 rounded-2xl bg-gold/15 border border-gold/30 space-y-1">
                  <p className="text-[11px] font-bold text-gold-light uppercase tracking-wider font-mono">
                    💰 Saver's Wealth Projection
                  </p>
                  <div className="flex justify-between text-xs text-white/90">
                    <span>Total Net Paid over {tenure} Mo:</span>
                    <span className="font-mono font-bold">₹{estimatedTotalPaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Total Dividend Gain:</span>
                    <span className="font-mono">₹{netProfitForSaver.toLocaleString('en-IN')} (~{annualizedReturnRate}% p.a.)</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gold/15 border border-gold/30 space-y-1">
                  <p className="text-[11px] font-bold text-gold-light uppercase tracking-wider font-mono">
                    ⚡ Instant Prize Money Disbursal
                  </p>
                  <div className="flex justify-between text-xs text-white/90">
                    <span>Net Disbursed to Bank:</span>
                    <span className="font-mono font-bold text-xl text-white">₹{netPrizeMoney.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-white/70 mt-1">
                    Disbursed directly via RTGS within 24-48 hrs of valid surety verification.
                  </p>
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="mt-6 pt-4 border-t border-white/15">
              <button
                onClick={() => onSelectSchemeForEnquiry && onSelectSchemeForEnquiry(currentScheme)}
                className="w-full py-3.5 px-4 rounded-xl metallic-gold-btn text-navy font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
              >
                <span>Apply for {currentScheme.formattedValue} Scheme</span>
                <ArrowRight className="w-4 h-4 text-navy" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
