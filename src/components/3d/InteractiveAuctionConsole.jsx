import React, { useState, useEffect } from 'react';
import { Gavel, TrendingUp, ShieldCheck, ArrowRight, Zap, RefreshCw, CheckCircle } from 'lucide-react';
import { CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from './TiltCard';

export default function InteractiveAuctionConsole({ onApplyScheme }) {
  const [selectedScheme, setSelectedScheme] = useState(CHIT_SCHEMES[1]); // ₹5 Lakhs Small Business Growth Chit by default
  const [discountPercent, setDiscountPercent] = useState(25);
  const [liveBids, setLiveBids] = useState([
    { id: 1, bidder: "Sub-18 (Eluru)", discount: 15, time: "10:14 AM" },
    { id: 2, bidder: "Sub-04 (Tadepalligudem)", discount: 20, time: "10:15 AM" },
    { id: 3, bidder: "Sub-29 (Bhimavaram)", discount: 25, time: "10:16 AM" },
  ]);

  const chitValue = selectedScheme.value;
  const members = selectedScheme.tenure;
  const baseMonthly = Math.round(chitValue / members);

  // Financial calculations
  const discountTotal = Math.round(chitValue * (discountPercent / 100));
  const foremanCommission = Math.round(chitValue * 0.05); // 5% legal commission
  const netDividendPool = Math.max(0, discountTotal - foremanCommission);
  const dividendPerMember = Math.round(netDividendPool / members);
  const prizeMoneyDisbursed = chitValue - discountTotal;
  const effectiveMonthlyNext = baseMonthly - dividendPerMember;

  const handleDiscountChange = (val) => {
    setDiscountPercent(val);
  };

  return (
    <div className="w-full">
      <TiltCard className="rounded-3xl p-6 sm:p-10 bg-navy text-white border-2 border-gold/40 shadow-3d-navy-card relative overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold-light text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>3D Live Reverse Auction Simulator</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Live Transparent Bidding Console
            </h3>
            <p className="text-xs text-white/70 font-body">
              Simulate real-time reverse bidding under the Chit Funds Act, 1982 with strict 40% statutory safety ceiling.
            </p>
          </div>

          {/* Scheme Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {CHIT_SCHEMES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScheme(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedScheme.id === s.id
                    ? 'bg-gold-gradient text-navy shadow'
                    : 'bg-navy text-white/90 hover:bg-white/10 border border-white/10'
                }`}
              >
                {s.formattedValue}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Dial & Bid Slider (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bid Discount Slider */}
            <div className="p-6 rounded-2xl bg-navy-dark/80 border border-gold/30 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold">
                  Auction Discount Bid:
                </span>
                <span className="font-mono font-black text-2xl metallic-gold-text">
                  {discountPercent}% (₹{discountTotal.toLocaleString('en-IN')})
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={discountPercent}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                className="w-full h-3 bg-navy-deep rounded-lg appearance-none cursor-pointer accent-gold-light"
              />

              <div className="flex justify-between text-[11px] font-mono text-white/60 mt-2">
                <span>5% Min (Foreman)</span>
                <span>20% (Avg)</span>
                <span className="text-amber-400 font-bold">40% (Govt Legal Max Cap)</span>
              </div>
            </div>

            {/* Live Bids Feed */}
            <div className="p-4 rounded-2xl bg-navy-dark/80 border border-white/15 shadow-inner">
              <div className="flex items-center justify-between text-xs text-gold-light font-mono mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Gavel className="w-3.5 h-3.5 text-gold-light" />
                  <span>Recent Bids Stream (Eluru Branch)</span>
                </span>
                <span className="text-[10px] text-white/50">Simulated Feed</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                {liveBids.map((b) => (
                  <div key={b.id} className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-navy-deep/80 border border-white/10 text-white/90">
                    <span className="text-gold-champagne">{b.bidder}</span>
                    <span className="text-emerald-400 font-bold">{b.discount}% Discount</span>
                    <span className="text-white/40 text-[10px]">{b.time}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-gold/20 border border-gold/40 text-gold-light font-bold">
                  <span>Your Current Simulated Bid:</span>
                  <span className="text-amber-300">{discountPercent}% Discount (₹{discountTotal.toLocaleString('en-IN')})</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Result Metrics (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl bg-navy-dark/90 border-2 border-gold/40 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-champagne font-bold">
                  🏆 Winner Takes Home
                </span>
                <Zap className="w-4 h-4 text-gold-light" />
              </div>
              <p className="mt-2 text-3xl font-black font-mono text-white">
                ₹{prizeMoneyDisbursed.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-white/70 mt-1 font-body">
                Transferred via RTGS within 24-48 hours of surety submission.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-dark/80 border border-gold/30 shadow-inner">
              <div className="flex items-center justify-between text-xs text-gold-light font-mono font-bold">
                <span>💰 Every Saver Earns Dividend</span>
                <span>+{discountPercent - 5}% Bonus</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xs text-white/70">Dividend this month:</span>
                <span className="font-mono font-bold text-lg text-emerald-400">
                  ₹{dividendPerMember.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-baseline justify-between">
                <span className="text-xs text-white/70">Your payment drops to:</span>
                <span className="font-mono font-extrabold text-xl text-gold-light">
                  ₹{effectiveMonthlyNext.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onApplyScheme && onApplyScheme(selectedScheme)}
              className="w-full py-3.5 px-6 rounded-xl metallic-gold-btn text-navy font-black text-sm flex items-center justify-center gap-2"
            >
              <span>Join {selectedScheme.formattedValue} Scheme Group</span>
              <ArrowRight className="w-4 h-4 text-navy" />
            </button>

          </div>

        </div>

      </TiltCard>
    </div>
  );
}
