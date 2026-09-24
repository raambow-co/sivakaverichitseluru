import React, { useState, useEffect } from 'react';
import { Star, MapPin, Users, ShieldCheck, Quote, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Building, Landmark, Award } from 'lucide-react';
import { TESTIMONIALS } from '../../constants/tokens';

const HIGHLIGHTS = [
  {
    icon: "🌾",
    category: "Agricultural Trade Liquidity",
    teluguCategory: "వ్యవసాయ వాణిజ్య మూలధనం",
    impact: "48-Hour RTGS Disbursal for Paddy Season",
    teluguImpact: "48 గంటల్లో RTGS ద్వారా నిధుల చెల్లింపు",
  },
  {
    icon: "🎓",
    category: "Family Milestone Planning",
    teluguCategory: "కుటుంబ భవిష్యత్ ప్రణాళిక",
    impact: "Daughter's Engineering Admission Funded On-Time",
    teluguImpact: "సకాలంలో ఇంజనీరింగ్ కళాశాల ఫీజుల చెల్లింపు",
  },
  {
    icon: "🦐",
    category: "Commercial Aqua Farming",
    teluguCategory: "ఆక్వా కల్చర్ ప్రాజెక్ట్ ఫండింగ్",
    impact: "100% Bank Lien Security with Zero Risk",
    teluguImpact: "నేషనలైజ్డ్ బ్యాంక్ సెక్యూరిటీ డిపాజిట్ రక్షణ",
  }
];

export default function PeopleLocalPresenceSection({ lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const SLIDE_DURATION = 6000; // 6 seconds

  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          triggerSlideChange((currentIndex + 1) % TESTIMONIALS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const triggerSlideChange = (newIdx) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIdx);
      setProgress(0);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    triggerSlideChange((currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    triggerSlideChange((currentIndex + 1) % TESTIMONIALS.length);
  };

  // Touch swipe gesture handlers
  const minSwipeDistance = 45;
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

  const review = TESTIMONIALS[currentIndex];
  const highlight = HIGHLIGHTS[currentIndex] || HIGHLIGHTS[0];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  };

  return (
    <section
      id="community"
      className="relative py-24 bg-surface-subtle dark:bg-navy-deep border-t border-surface-border dark:border-gold/20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <Award className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>{lang === 'te' ? 'సభ్యుల అనుభవాలు' : 'Subscriber Stories'}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <span className="metallic-gold-text">ఖాతాదారుల అనుభవాలు</span>
            ) : (
              <>Subscriber <span className="metallic-gold-text">Experiences</span></>
            )}
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-charcoal-light dark:text-white/80 font-body">
            Real stories of financial self-reliance from paddy traders, educators, and aqua farmers across West Godavari.
          </p>
        </div>

        {/* Cinematic VIP Stage (Single Review Showcase with Touch Swiping) */}
        <div 
          className="relative rounded-3xl bg-navy text-white border-2 border-gold/40 shadow-3d-navy-card overflow-hidden touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* Ambient Lighting Accents inside Stage */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Stage Control Header */}
          <div className="relative z-10 px-6 sm:px-10 py-5 border-b border-white/10 flex items-center justify-between">
            
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{highlight.icon}</span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-champagne font-bold block">
                  {lang === 'te' ? highlight.teluguCategory : highlight.category}
                </span>
                <span className="text-xs font-mono text-white/60">
                  Chit Funds Act, 1982 Registered Member
                </span>
              </div>
            </div>

            {/* Scheme Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold-light border border-gold/40 shadow-sm font-mono text-xs font-black">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{review.scheme}</span>
            </div>

          </div>

          {/* Main Showcase Body: Split 4 cols / 8 cols */}
          <div className={`relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-opacity duration-200 ${animating ? 'opacity-30' : 'opacity-100'}`}>
            
            {/* Left 4 Cols: VIP Subscriber Emblem Card */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:border-r lg:border-white/10 lg:pr-8">
              
              {/* Circle-Shaped Customer Photo Holder (Enlarged) */}
              <div className="relative shrink-0 my-1">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-gold-dark via-gold to-gold-light shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-navy-dark border-2 border-navy">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'font-display', 'font-black', 'text-2xl', 'text-gold');
                        e.target.parentElement.innerText = getInitials(review.name);
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-navy flex items-center justify-center" title="Verified Chit Member">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Name & Occupation */}
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  {review.name}
                </h3>
                <p className="text-xs font-mono text-gold-light font-bold mt-0.5">
                  {review.teluguName}
                </p>
                <p className="text-xs font-semibold text-white/80 font-body mt-1">
                  {review.role}
                </p>
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-mono font-bold text-white/80 ml-1.5">
                  5.0 Rating
                </span>
              </div>

              {/* Location & Loyalty Badges */}
              <div className="pt-2 space-y-2 w-full">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-white/70 bg-white/5 py-2 px-3 rounded-xl border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>{review.location}</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-gold-champagne bg-gold/10 py-2 px-3 rounded-xl border border-gold/25 font-bold">
                  <Landmark className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>{review.yearJoined}</span>
                </div>
              </div>

            </div>

            {/* Right 8 Cols: Large Narrative & Telugu Parchment */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Giant Decorative 3D Gold Quote Icon */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold-light flex items-center justify-center border border-gold/40 shadow-inner">
                  <Quote className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-light uppercase tracking-wider">
                  Verified Subscriber Experience
                </span>
              </div>

              {/* English Testimonial Narrative */}
              <blockquote className="text-lg sm:text-2xl font-display font-bold text-white leading-relaxed">
                “{review.text}”
              </blockquote>

              {/* Telugu Translation Card */}
              <div className="p-5 rounded-2xl bg-navy-dark/90 border-l-4 border-gold border-y border-r border-gold/25 shadow-inner">
                <p className="text-xs sm:text-sm font-teluguBody text-gold-champagne leading-relaxed font-semibold">
                  “{review.teluguText}”
                </p>
              </div>

              {/* Impact Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'te' ? highlight.teluguImpact : highlight.impact}</span>
                </div>

                <span className="text-[11px] font-mono text-white/50">
                  Auto-rotating in 6s • Hover to pause
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Controls Bar */}
          <div className="relative z-10 px-6 sm:px-10 py-4 bg-navy-deep/80 border-t border-white/10 flex items-center justify-between">
            
            {/* Prev / Next Action Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Subscriber Story"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-gold hover:text-navy text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-white/15 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Story</span>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Subscriber Story"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-gold hover:text-navy text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-white/15 shadow-sm"
              >
                <span>Next Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Dots & Counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerSlideChange(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === idx
                        ? 'w-7 h-2 bg-gold shadow-sm'
                        : 'w-2 h-2 bg-white/25 hover:bg-gold/50'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-gold-light">
                0{currentIndex + 1} <span className="text-white/40">/ 0{TESTIMONIALS.length}</span>
              </span>
            </div>

          </div>

          {/* Active Timer Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-gold via-gold-light to-amber-300 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
