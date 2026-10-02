import React, { useState } from 'react';
import { UserCheck, Coins, Gavel, Banknote, PieChart, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { HOW_CHITS_WORK_STEPS } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';
import Hero3DGoldCoins from '../3d/Hero3DGoldCoins';

export default function HowChitsWorkSection({ lang }) {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // default on auction
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const iconMap = {
    UserCheck: UserCheck,
    Coins: Coins,
    Gavel: Gavel,
    Banknote: Banknote,
    PieChart: PieChart,
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : HOW_CHITS_WORK_STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev < HOW_CHITS_WORK_STEPS.length - 1 ? prev + 1 : 0));
  };

  // Touch swipe gesture handlers
  const minSwipeDistance = 45;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section id="how-it-works" className="relative py-24 bg-white dark:bg-navy-deep border-y border-surface-border dark:border-gold/20 overflow-hidden">
      {/* 3D Floating Gold Coins Physics System */}
      <Hero3DGoldCoins className="absolute inset-0 overflow-visible pointer-events-none hero-coin-container z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
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

        {/* Steps Navigation Bar: Placed side-by-side with horizontal touch scrolling on mobile */}
        <div className="mt-8 sm:mt-12 flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2.5 sm:gap-3 lg:grid lg:grid-cols-5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {HOW_CHITS_WORK_STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.icon] || Coins;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`snap-start shrink-0 w-[140px] sm:w-[165px] lg:w-auto p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between select-none ${
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
                  <h4 className="font-display font-bold text-xs sm:text-sm leading-tight truncate">
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

        {/* Active Stage 3D Spotlight Card with Touch Swipe Support */}
        {(() => {
          const current = HOW_CHITS_WORK_STEPS[activeStepIndex];
          const IconComponent = iconMap[current.icon] || Coins;

          // Stage-specific icon clusters & unique visual badges
          const stageFeatureMap = [
            {
              icons: [UserCheck, ShieldCheck, CheckCircle2],
              badges: ["Aadhaar & PAN Verification", "AP Govt Registered Bylaws"],
            },
            {
              icons: [Coins, Sparkles, CheckCircle2],
              badges: ["UPI / NEFT / Branch Counter", "Automated Passbook Receipts"],
            },
            {
              icons: [Gavel, Sparkles, ShieldCheck],
              badges: ["Live In-Person & Digital", "40% Max Bid Statutory Cap"],
            },
            {
              icons: [Banknote, Coins, ShieldCheck],
              badges: ["Direct RTGS Bank Transfer", "24-48 Hours Express Payout"],
            },
            {
              icons: [PieChart, Sparkles, Coins],
              badges: ["100% Equal Dividend Share", "Reduced Monthly Installment"],
            },
          ];

          const currentFeature = stageFeatureMap[activeStepIndex] || stageFeatureMap[0];

          return (
            <div 
              className="mt-8 touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <TiltCard className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-navy-dark border-2 border-surface-border dark:border-gold/40 shadow-3d-card relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Visual Pill in Deep Navy */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-7 sm:p-8 rounded-2xl bg-navy text-white border-2 border-gold/40 text-center shadow-2xl relative overflow-hidden group">
                    
                    {/* Glowing Gold Backdrop Shimmer */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-gold/15 rounded-full filter blur-xl pointer-events-none" />

                    {/* Multi-Icon Visual Cluster ON TOP of Text */}
                    <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
                      {/* Left Accent Icon */}
                      <div className="w-9 h-9 rounded-xl bg-navy-dark border border-gold/40 flex items-center justify-center shadow-md transform -rotate-6 group-hover:rotate-0 transition-transform">
                        {React.createElement(currentFeature.icons[1] || ShieldCheck, { className: "w-4 h-4 text-gold-light" })}
                      </div>

                      {/* Center Primary Stage Icon (Gold Gradient Box) */}
                      <div className="w-16 h-16 rounded-2xl bg-gold-gradient text-navy flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform ring-4 ring-gold/25">
                        <IconComponent className="w-8 h-8 text-navy" />
                      </div>

                      {/* Right Accent Icon */}
                      <div className="w-9 h-9 rounded-xl bg-navy-dark border border-gold/40 flex items-center justify-center shadow-md transform rotate-6 group-hover:rotate-0 transition-transform">
                        {React.createElement(currentFeature.icons[2] || CheckCircle2, { className: "w-4 h-4 text-amber-300" })}
                      </div>
                    </div>

                    {/* Stage Number & Title Text directly below the icon cluster */}
                    <span className="font-mono text-xs text-gold-champagne font-bold uppercase tracking-widest">
                      Stage {current.step} of 05
                    </span>
                    <h3 className="font-display font-black text-xl text-white mt-1 leading-snug">
                      {current.title}
                    </h3>
                    <p className="text-xs font-mono text-gold-light mt-1 font-bold">
                      {current.teluguTitle}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold-light text-xs font-bold border border-gold/40 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-light" />
                      <span>{current.keyHighlight}</span>
                    </div>
                  </div>

                  {/* Right Walkthrough with Unique Icons Cluster ON TOP of Title & Text */}
                  <div className="lg:col-span-8 space-y-5">
                    
                    {/* Unique Stage Icons & Feature Badges Bar ABOVE Title */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-border dark:border-gold/20">
                      {/* 3 Glowing Stage Icons Cluster */}
                      <div className="flex items-center gap-2">
                        {currentFeature.icons.map((IconItem, i) => (
                          <div 
                            key={i} 
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm border transition-all ${
                              i === 0 
                                ? 'bg-gold-gradient text-navy border-gold scale-105' 
                                : 'bg-surface-subtle dark:bg-navy border-surface-border dark:border-white/15 text-navy dark:text-gold-light'
                            }`}
                          >
                            <IconItem className="w-4 h-4" />
                          </div>
                        ))}
                      </div>

                      {/* Unique Feature Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {currentFeature.badges.map((badgeText, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-lg bg-gold/15 dark:bg-gold/20 text-navy dark:text-gold-light border border-gold/30 text-[11px] font-mono font-bold"
                          >
                            {badgeText}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stage Titles & Text */}
                    <div>
                      <div className="flex items-center gap-2 text-gold-dark dark:text-gold-light font-mono text-xs font-bold uppercase tracking-wider mb-1">
                        <span>{current.title}</span>
                        <span>•</span>
                        <span>{current.keyHighlight}</span>
                      </div>
                      
                      <h4 className="font-display text-lg sm:text-2xl font-black text-navy dark:text-white">
                        {current.teluguTitle}: <span className="metallic-gold-text">{current.teluguSummary}</span>
                      </h4>
                      
                      <p className="mt-2 text-sm sm:text-base text-charcoal-light dark:text-white/80 leading-relaxed font-body">
                        {current.summary}
                      </p>
                    </div>

                    {/* Statutory & Member Protection Pods */}
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20 shadow-sm">
                        <p className="font-bold text-navy dark:text-gold-light font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-gold-light" />
                          <span>Statutory Compliance</span>
                        </p>
                        <p className="text-charcoal-muted dark:text-white/70 mt-1">
                          Monitored strictly under Andhra Pradesh Chit Fund Rules with certified bank security deposits.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20 shadow-sm">
                        <p className="font-bold text-navy dark:text-gold-light font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>100% Member Protection</span>
                        </p>
                        <p className="text-charcoal-muted dark:text-white/70 mt-1">
                          Foreman corporate indemnity ensures zero disruption in prize money even if any subscriber delays payment.
                        </p>
                      </div>
                    </div>

                    {/* Next & Previous Step Controls */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 4))}
                        className="text-xs font-bold font-mono text-charcoal-muted dark:text-white/60 hover:text-navy dark:hover:text-gold-light transition-colors"
                      >
                        ← Previous Step
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {HOW_CHITS_WORK_STEPS.map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === activeStepIndex ? 'w-5 bg-gold' : 'bg-surface-border dark:bg-white/20'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveStepIndex((prev) => (prev < 4 ? prev + 1 : 0))}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white dark:bg-gold-gradient dark:text-navy font-mono font-bold text-xs shadow transition-transform hover:scale-105"
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
