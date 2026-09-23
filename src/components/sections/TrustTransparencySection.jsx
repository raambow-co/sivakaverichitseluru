import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Landmark, FileText, Lock, CheckCircle2, Award, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { BRAND } from '../../constants/tokens';

export default function TrustTransparencySection({ lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const securityPillars = [
    {
      id: 0,
      icon: Landmark,
      title: "100% Section 20 Bank Guarantee",
      teluguTitle: "నేషనలైజ్డ్ బ్యాంకులో 100% సెక్యూరిటీ డిపాజిట్",
      desc: "Under Section 20 of the Chit Funds Act, 1982, the foreman deposits the full 100% aggregate chit value in nationalized banks (SBI / Union Bank) under the lien of the Chit Registrar before group commencement.",
      tag: "Statutory Requirement",
      color: "from-amber-500/20 to-yellow-500/5",
      borderGlow: "border-gold/60"
    },
    {
      id: 1,
      icon: ShieldCheck,
      title: "40% Maximum Reverse Bid Cap",
      teluguTitle: "గరిష్ట వేలం పరిమితి 40% రక్షణ",
      desc: "Strictly enforced ceiling prevents reckless underbidding, ensuring every winning subscriber receives at least 60% of the chit value while non-prized savers enjoy lucrative monthly dividends.",
      tag: "Investor Protection",
      color: "from-emerald-500/20 to-teal-500/5",
      borderGlow: "border-emerald-500/60"
    },
    {
      id: 2,
      icon: FileText,
      title: "Direct Bank RTGS / NEFT Disbursal",
      teluguTitle: "నేరుగా బ్యాంకు ఖాతాలోకి నగదు బదిలీ",
      desc: "All prize money disbursements are settled directly through verified RTGS / NEFT banking channels within 24–48 hours of surety approval. 100% digital audit trail.",
      tag: "Zero Cash Leakage",
      color: "from-cyan-500/20 to-blue-500/5",
      borderGlow: "border-cyan-400/60"
    },
    {
      id: 3,
      icon: Lock,
      title: "Foreman Default Indemnity",
      teluguTitle: "ఫోర్‌మన్ పూర్తి ఆర్థిక బాధ్యత",
      desc: "If any prized subscriber delays their monthly installments, Siva Kaveri Chits bridges the deficit immediately from its corporate reserves. Non-prized members experience zero pause in dividends.",
      tag: "Unbroken Dividend Flow",
      color: "from-indigo-500/20 to-purple-500/5",
      borderGlow: "border-indigo-400/60"
    },
  ];

  // Auto-scroll 3D carousel every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % securityPillars.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, securityPillars.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + securityPillars.length) % securityPillars.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % securityPillars.length);
  };

  // Touch swipe gesture handlers
  const minSwipeDistance = 40;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section id="trust" className="relative py-24 bg-surface-subtle dark:bg-navy-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-dark text-navy dark:text-gold-light border border-surface-border dark:border-gold/40 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-gold-dark dark:text-gold-light" />
            <span>Statutory Safeguards</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>చట్టబద్ధమైన భద్రత & <span className="metallic-gold-text">పూర్తి పారదర్శకత</span></>
            ) : (
              <>Institutional Trust & <span className="metallic-gold-text">Statutory Safeguards</span></>
            )}
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-charcoal-light dark:text-white/80 font-body">
            Every rupee invested with Siva Kaveri Chits is legally protected by central government mandates and state registrar bank guarantees.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3D INTERACTIVE CAROUSEL STAGE (with Mobile Touch Swiping) */}
        {/* ========================================================================= */}
        <div 
          className="relative max-w-5xl mx-auto py-8 px-2 sm:px-4 touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* 3D Carousel Container */}
          <div 
            className="relative h-[380px] sm:h-[400px] w-full flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {securityPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              
              // Calculate circular offset relative to active card
              const total = securityPillars.length;
              let diff = (idx - currentIndex + total) % total;
              if (diff > total / 2) diff -= total; // Normalized to -1, 0, 1, 2

              const isActive = diff === 0;
              const isPrev = diff === -1 || (diff === 3 && total === 4);
              const isNext = diff === 1 || (diff === -3 && total === 4);
              const isHidden = Math.abs(diff) > 1;

              // 3D Transforms based on position
              let transformStyle = '';
              let zIndex = 10;
              let opacity = 0;
              let pointerEvents = 'none';

              if (isActive) {
                transformStyle = 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)';
                zIndex = 30;
                opacity = 1;
                pointerEvents = 'auto';
              } else if (isNext) {
                transformStyle = 'translateX(55%) translateZ(-120px) rotateY(-22deg) scale(0.88)';
                zIndex = 20;
                opacity = 0.55;
                pointerEvents = 'auto';
              } else if (isPrev) {
                transformStyle = 'translateX(-55%) translateZ(-120px) rotateY(22deg) scale(0.88)';
                zIndex = 20;
                opacity = 0.55;
                pointerEvents = 'auto';
              } else {
                transformStyle = 'translateX(0%) translateZ(-250px) scale(0.7)';
                zIndex = 5;
                opacity = 0;
                pointerEvents = 'none';
              }

              return (
                <div
                  key={pillar.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`absolute w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-3xl transition-all duration-500 ease-out select-none cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-navy-dark border-2 border-gold shadow-3d-navy-card ring-1 ring-gold/40'
                      : 'bg-white/90 dark:bg-navy-dark/90 border border-surface-border dark:border-gold/30 shadow-lg hover:opacity-80'
                  }`}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                    pointerEvents,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Top Header in Card */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-surface-subtle dark:bg-navy-deep text-navy dark:text-gold-light flex items-center justify-center shadow-inner border border-surface-border dark:border-gold/30 p-3">
                      <IconComp className="w-7 h-7 text-gold-dark dark:text-gold-light" />
                    </div>
                    
                    <span className="px-3.5 py-1 rounded-full bg-navy/5 dark:bg-gold/15 text-navy dark:text-gold-light font-mono text-[11px] font-black uppercase tracking-wider border border-navy/10 dark:border-gold/30">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Telugu Title */}
                  <h3 className="mt-5 font-display font-black text-xl sm:text-2xl text-navy dark:text-white leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-bold text-gold-dark dark:text-gold-light mt-1">
                    {pillar.teluguTitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-charcoal-light dark:text-white/80 leading-relaxed font-body">
                    {pillar.desc}
                  </p>

                  {/* Verified Footer */}
                  <div className="mt-6 pt-4 border-t border-surface-border dark:border-gold/20 flex items-center gap-2 text-xs text-navy dark:text-gold-light font-mono font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Verified under Chit Funds Act, 1982 Section 20</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3D Carousel Navigation Bar */}
          <div className="mt-6 flex items-center justify-between max-w-md mx-auto">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Safeguard"
              className="w-10 h-10 rounded-full bg-white dark:bg-navy-dark text-navy dark:text-gold-light border border-surface-border dark:border-gold/40 shadow hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2">
              {securityPillars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-7 h-2.5 bg-gold shadow-sm'
                      : 'w-2.5 h-2.5 bg-surface-border dark:bg-white/20 hover:bg-gold/40'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Safeguard"
              className="w-10 h-10 rounded-full bg-white dark:bg-navy-dark text-navy dark:text-gold-light border border-surface-border dark:border-gold/40 shadow hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Statutory Certificate Banner in Deep Navy */}
        <div className="mt-12 p-8 rounded-3xl bg-navy text-white border-2 border-gold shadow-3d-navy-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/20 text-gold-light text-xs font-mono font-bold">
                <Award className="w-4 h-4" />
                <span>OFFICIAL STATUTORY DISCLOSURE</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                Shiva Kaveri Chits Private Limited
              </h3>
              <p className="text-xs font-mono text-gold-champagne font-bold">
                Registration No: {BRAND.registrationNo} • CIN: {BRAND.cin}
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Operating with valid Prior Sanction from the Registrar of Chit Funds, Government of Andhra Pradesh. All chit agreements are registered in the state registry prior to accepting public subscriptions.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-navy-dark/80 border border-gold/30 text-center shadow-inner">
              <ShieldCheck className="w-10 h-10 text-gold-light mb-2" />
              <p className="font-mono text-xs font-bold text-gold-light uppercase tracking-wider">
                100% Legal & Regulated
              </p>
              <p className="text-[10px] text-white/60 mt-1 font-mono">
                Zero Default Record (1998–Present)
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
