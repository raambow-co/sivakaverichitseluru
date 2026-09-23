import React, { useState } from 'react';
import { UserCheck, Coins, Gavel, Banknote, PieChart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOW_CHITS_WORK_STEPS } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

export default function HowChitsWorkSection({ lang }) {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // default on auction

  const iconMap = {
    UserCheck: UserCheck,
    Coins: Coins,
    Gavel: Gavel,
    Banknote: Banknote,
    PieChart: PieChart,
  };

  return (
    <section id="how-it-works" className="relative py-24 bg-white dark:bg-navy-deep border-y border-surface-border dark:border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <Gavel className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>5-Stage Financial Lifecycle</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>చిట్ ఎలా పనిచేస్తుంది? <span className="metallic-gold-text">5 సులభమైన దశలు</span></>
            ) : (
              <>How Chit Funds Work <span className="metallic-gold-text">in 5 Steps</span></>
            )}
          </h2>
        </div>

        {/* Steps Navigation Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {HOW_CHITS_WORK_STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.icon] || Coins;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                  isActive
                    ? 'bg-navy text-white border-navy shadow-3d-navy-card scale-102 ring-2 ring-gold/40'
                    : 'bg-surface-subtle dark:bg-navy-dark text-navy dark:text-white/80 border-surface-border dark:border-gold/20 hover:border-navy/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    isActive ? 'bg-gold-gradient text-navy' : 'bg-surface-muted dark:bg-navy text-navy dark:text-gold-light border border-surface-border'
                  }`}>
                    0{idx + 1}
                  </span>
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-gold-light' : 'text-navy dark:text-gold-light'}`} />
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm leading-tight">
                    {step.title}
                  </h4>
                  <p className={`text-[11px] mt-0.5 truncate font-mono ${isActive ? 'text-gold-champagne' : 'text-charcoal-muted dark:text-white/50'}`}>
                    {step.teluguTitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage 3D Spotlight Card in Clean White */}
        {(() => {
          const current = HOW_CHITS_WORK_STEPS[activeStepIndex];
          const IconComponent = iconMap[current.icon] || Coins;

          return (
            <div className="mt-8">
              <TiltCard className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-navy-dark border-2 border-surface-border dark:border-gold/40 shadow-3d-card relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Visual Pill in Deep Navy */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-navy text-white border border-gold/30 text-center shadow-md">
                    <div className="w-16 h-16 rounded-2xl bg-gold-gradient text-navy flex items-center justify-center shadow-lg mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-xs text-gold-champagne font-bold uppercase tracking-widest">
                      Stage {current.step} of 05
                    </span>
                    <h3 className="font-display font-black text-xl text-white mt-1">
                      {current.title}
                    </h3>
                    <p className="text-xs font-mono text-gold-light mt-0.5 font-bold">
                      {current.teluguTitle}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold border border-gold/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-light" />
                      <span>{current.keyHighlight}</span>
                    </div>
                  </div>

                  {/* Right Walkthrough */}
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-navy dark:text-white">
                        {current.teluguSummary}
                      </h4>
                      <p className="mt-2 text-sm sm:text-base text-charcoal-light dark:text-white/80 leading-relaxed font-body">
                        {current.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-surface-border dark:border-gold/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20">
                        <p className="font-bold text-navy dark:text-gold-light font-mono">
                          ⚖️ Statutory Compliance
                        </p>
                        <p className="text-charcoal-muted dark:text-white/70 mt-1">
                          Monitored strictly under Andhra Pradesh Chit Fund Rules with certified bank security deposits.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20">
                        <p className="font-bold text-navy dark:text-gold-light font-mono">
                          🔒 100% Member Protection
                        </p>
                        <p className="text-charcoal-muted dark:text-white/70 mt-1">
                          Foreman corporate indemnity ensures zero disruption in prize money even if any subscriber delays payment.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 4))}
                        className="text-xs font-bold font-mono text-charcoal-muted dark:text-white/60 hover:text-navy"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={() => setActiveStepIndex((prev) => (prev < 4 ? prev + 1 : 0))}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy/10 text-navy dark:bg-gold/15 dark:text-gold-light font-mono font-bold text-xs transition-colors"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </TiltCard>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
