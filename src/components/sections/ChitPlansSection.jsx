import React, { useState } from 'react';
import { Coins, Check, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Calculator, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';
import SchemeVisual3D from '../3d/SchemeVisual3D';

export default function ChitPlansSection({ lang, onSelectScheme }) {
  const [currentIndex, setCurrentIndex] = useState(1); // default ₹5L Small Business Growth Chit
  const [animating, setAnimating] = useState(false);

  const scheme = CHIT_SCHEMES[currentIndex] || CHIT_SCHEMES[0];

  const triggerSchemeChange = (newIdx) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIdx);
      setAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    triggerSchemeChange((currentIndex - 1 + CHIT_SCHEMES.length) % CHIT_SCHEMES.length);
  };

  const handleNext = () => {
    triggerSchemeChange((currentIndex + 1) % CHIT_SCHEMES.length);
  };

  return (
    <section id="plans" className="relative py-24 bg-white dark:bg-navy-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <Coins className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Structured Chit Schemes</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>మీ లక్ష్యానికి తగిన <span className="metallic-gold-text">5 చిట్ ప్లాన్లు</span></>
            ) : (
              <>Institutional <span className="metallic-gold-text">Chit Portfolios</span></>
            )}
          </h2>
        </div>

        {/* Scheme Selector Tabs: All 5 Schemes in a Clean Single Line */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-12">
          {CHIT_SCHEMES.map((s, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => triggerSchemeChange(idx)}
                className={`p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-navy text-white border-navy dark:border-gold shadow-3d-navy-card ring-2 ring-gold/40 scale-[1.02]'
                    : 'bg-surface-subtle dark:bg-navy-dark text-navy dark:text-white border-surface-border dark:border-gold/20 hover:border-navy/40 dark:hover:border-gold/50 shadow-sm hover:scale-[1.01]'
                }`}
              >
                {/* Top Row: Thumbnail + Popular Tag */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <img 
                    src={s.image3d} 
                    alt={s.name} 
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-contain border ${
                      isSelected ? 'border-gold shadow-sm' : 'border-surface-border dark:border-gold/30'
                    }`}
                  />
                  {s.popular ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md font-mono font-black bg-gold text-navy uppercase leading-none shadow-sm">
                      Popular
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono opacity-50 font-bold uppercase">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Scheme Short Name */}
                <p className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-white' : 'text-navy dark:text-white'}`}>
                  {s.name.replace(' & Emergency Chit', '').replace(' Growth Chit', '').replace(' & Career Chit', '').replace(' & Luxury Asset Chit', '').replace(' Expansion Chit', '')}
                </p>

                {/* Value & Tenure */}
                <div className="mt-1.5 pt-1.5 border-t border-navy/10 dark:border-white/10 flex items-baseline justify-between gap-1">
                  <span className={`font-mono font-black text-xs sm:text-sm ${isSelected ? 'text-gold-light' : 'text-navy dark:text-gold-light'}`}>
                    {s.formattedValue}
                  </span>
                  <span className="text-[10px] font-mono opacity-70">
                    ({s.tenure} Mo)
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Focused Scheme Showcase (Left: Data & Breakdown, Right: 3D Floating Visual) */}
        <div className="max-w-7xl mx-auto relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Scheme Details Card (7 Cols) */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={6}
                className={`h-full rounded-3xl p-6 sm:p-9 transition-all duration-300 flex flex-col justify-between ${
                  scheme.popular
                    ? 'bg-navy text-white border-2 border-gold/60 shadow-3d-navy-card ring-1 ring-gold/40'
                    : 'bg-white dark:bg-navy-dark text-navy dark:text-white border-2 border-surface-border dark:border-gold/40 shadow-3d-card'
                }`}
              >
                <div className={`transition-opacity duration-150 flex flex-col justify-between h-full ${animating ? 'opacity-30' : 'opacity-100'}`}>
                  
                  <div>
                    {/* Header: Title, Telugu Title, Badge, and Tenure */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border dark:border-gold/20">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider ${
                            scheme.popular ? 'bg-gold/20 text-gold-light border border-gold/40' : 'bg-surface-subtle dark:bg-navy text-navy dark:text-gold-light border border-surface-border dark:border-gold/20'
                          }`}>
                            {scheme.badge || `${scheme.tenure} Months Tenure`}
                          </span>
                          {scheme.popular && (
                            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-black bg-gold text-navy uppercase">
                              ⭐ Most Preferred
                            </span>
                          )}
                        </div>

                        <h3 className={`font-display font-black text-2xl sm:text-3xl ${scheme.popular ? 'text-white' : 'text-navy dark:text-white'}`}>
                          {scheme.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono font-bold text-gold-dark dark:text-gold-light mt-0.5">
                          {scheme.teluguName}
                        </p>
                      </div>

                      {/* Tenure Pill */}
                      <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border font-mono text-xs font-black shrink-0 self-start sm:self-auto ${
                        scheme.popular ? 'bg-navy-dark/90 border-gold/40 text-gold-light' : 'bg-surface-subtle dark:bg-navy border-surface-border dark:border-gold/30 text-navy dark:text-gold-light'
                      }`}>
                        <span>{scheme.tenure} Months Cycle</span>
                      </div>
                    </div>

                    {/* Main Financial Pool & Base Monthly Grid */}
                    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Total Pool */}
                      <div className={`p-4 sm:p-5 rounded-2xl border flex items-baseline justify-between shadow-inner ${
                        scheme.popular ? 'bg-navy-dark/90 border-gold/40' : 'bg-surface-subtle dark:bg-navy border-surface-border dark:border-gold/20'
                      }`}>
                        <div>
                          <p className={`text-[11px] font-mono uppercase font-bold tracking-wider ${scheme.popular ? 'text-white/70' : 'text-charcoal-muted dark:text-white/60'}`}>
                            Total Chit Pool
                          </p>
                          <p className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${scheme.popular ? 'text-white' : 'text-navy dark:text-white'}`}>
                            {scheme.formattedValue}
                          </p>
                        </div>
                        <Coins className="w-7 h-7 text-gold-light opacity-80" />
                      </div>

                      {/* Base Monthly */}
                      <div className={`p-4 sm:p-5 rounded-2xl border flex items-baseline justify-between shadow-inner ${
                        scheme.popular ? 'bg-navy-dark/90 border-gold/40' : 'bg-surface-subtle dark:bg-navy border-surface-border dark:border-gold/20'
                      }`}>
                        <div>
                          <p className={`text-[11px] font-mono uppercase font-bold tracking-wider ${scheme.popular ? 'text-gold-champagne' : 'text-charcoal-muted dark:text-white/60'}`}>
                            Base Installment
                          </p>
                          <p className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${scheme.popular ? 'text-gold-light' : 'text-navy dark:text-gold-light'}`}>
                            {scheme.formattedMonthly}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-white/50">/month</span>
                      </div>

                    </div>

                    {/* 3 Detailed Breakdown Metric Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      
                      <div className={`p-3 rounded-xl border ${scheme.popular ? 'bg-navy-dark/70 border-white/15' : 'bg-surface-subtle/80 dark:bg-navy/80 border-surface-border dark:border-gold/15'}`}>
                        <p className={`text-[10px] font-mono uppercase ${scheme.popular ? 'text-white/60' : 'text-charcoal-muted dark:text-white/60'}`}>
                          Avg. Net Monthly
                        </p>
                        <p className="font-mono font-black text-sm sm:text-base text-emerald-500 mt-0.5">
                          ~{scheme.averageEffectiveMonthly}
                        </p>
                        <p className="text-[10px] text-white/50 font-mono mt-0.5">With dividends cut</p>
                      </div>

                      <div className={`p-3 rounded-xl border ${scheme.popular ? 'bg-navy-dark/70 border-white/15' : 'bg-surface-subtle/80 dark:bg-navy/80 border-surface-border dark:border-gold/15'}`}>
                        <p className={`text-[10px] font-mono uppercase ${scheme.popular ? 'text-white/60' : 'text-charcoal-muted dark:text-white/60'}`}>
                          Monthly Dividend
                        </p>
                        <p className="font-mono font-black text-sm sm:text-base text-gold-dark dark:text-gold-light mt-0.5">
                          {scheme.estimatedDividendRange}
                        </p>
                        <p className="text-[10px] text-white/50 font-mono mt-0.5">Per month savings</p>
                      </div>

                      <div className={`p-3 rounded-xl border ${scheme.popular ? 'bg-navy-dark/70 border-white/15' : 'bg-surface-subtle/80 dark:bg-navy/80 border-surface-border dark:border-gold/15'}`}>
                        <p className={`text-[10px] font-mono uppercase ${scheme.popular ? 'text-white/60' : 'text-charcoal-muted dark:text-white/60'}`}>
                          Max Prize Disbursal
                        </p>
                        <p className={`font-mono font-black text-sm sm:text-base mt-0.5 ${scheme.popular ? 'text-white' : 'text-navy dark:text-white'}`}>
                          {scheme.maxPrizeMoney}
                        </p>
                        <p className="text-[10px] text-white/50 font-mono mt-0.5">24-48 hrs bank transfer</p>
                      </div>

                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-surface-border dark:border-gold/20 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => onSelectScheme && onSelectScheme(scheme)}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl metallic-gold-btn text-navy font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-101 transition-transform"
                    >
                      <span>Apply for {scheme.formattedValue} Scheme</span>
                      <ArrowRight className="w-4 h-4 text-navy" />
                    </button>

                    <a
                      href="#calculator"
                      className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-surface-border dark:border-gold/30 bg-surface-subtle dark:bg-navy text-navy dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:border-gold transition-colors"
                    >
                      <Calculator className="w-4 h-4 text-gold-dark dark:text-gold-light" />
                      <span>Simulate</span>
                    </a>
                  </div>

                </div>
              </TiltCard>
            </div>

            {/* Right Side: 3D Purpose Visual Illustration (5 Cols) */}
            <div className="lg:col-span-5 h-full">
              <div className={`h-full transition-opacity duration-150 ${animating ? 'opacity-30' : 'opacity-100'}`}>
                <SchemeVisual3D 
                  schemeId={scheme.id}
                  schemeName={scheme.name}
                  formattedValue={scheme.formattedValue}
                  category={scheme.category}
                />
              </div>
            </div>

          </div>

          {/* Slider Navigation Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Chit Scheme"
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-navy-dark hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy text-navy dark:text-gold-light font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-surface-border dark:border-gold/30 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Scheme</span>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Chit Scheme"
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-navy-dark hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy text-navy dark:text-gold-light font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-surface-border dark:border-gold/30 shadow-sm"
              >
                <span>Next Scheme</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Dots & Counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {CHIT_SCHEMES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerSchemeChange(idx)}
                    aria-label={`Go to scheme ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === idx
                        ? 'w-7 h-2.5 bg-navy dark:bg-gold shadow-sm'
                        : 'w-2.5 h-2.5 bg-surface-border dark:bg-white/20 hover:bg-navy/40 dark:hover:bg-gold/40'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-navy dark:text-gold-light">
                Scheme 0{currentIndex + 1} <span className="text-charcoal-muted dark:text-white/40">/ 0{CHIT_SCHEMES.length}</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
