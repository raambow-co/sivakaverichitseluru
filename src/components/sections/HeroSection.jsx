import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Phone, TrendingUp, CheckCircle, ChevronDown, Coins, Zap, Instagram } from 'lucide-react';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';
import GoldCoin3D from '../3d/GoldCoin3D';
import Hero3DGoldCoins from '../3d/Hero3DGoldCoins';

export default function HeroSection({ lang, onExplorePlans, onOpenEnquiry, onSelectScheme }) {
  const [autoLang, setAutoLang] = useState(lang || 'en');
  const [isFading, setIsFading] = useState(false);

  // Auto-switch heading text between English and Telugu every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setAutoLang((prev) => (prev === 'en' ? 'te' : 'en'));
        setIsFading(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-44 pb-16 sm:pt-48 sm:pb-20 flex items-center justify-center bg-white dark:bg-navy-deep overflow-x-clip">
      
      {/* 3D Floating Gold Coins System (5 medium sized moving coins with physics) */}
      <Hero3DGoldCoins />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Narrative (7 cols on desktop, full width on mobile with balanced spacing) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-navy/20 dark:border-gold/40 bg-surface-subtle dark:bg-navy-dark shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-navy dark:text-gold-light">
                {autoLang === 'te' ? 'ఆంధ్రప్రదేశ్ ప్రభుత్వ గుర్తింపు పొందిన సంస్థ' : 'Govt. Registered Chit Fund Enterprise'}
              </span>
            </div>

            {/* Main Punchy Heading with 5-Second Auto Language Switcher */}
            <div className="mt-5 sm:mt-7 min-h-[170px] sm:min-h-[140px] lg:min-h-[150px] flex items-center">
              <h1 className={`font-display text-4xl sm:text-5xl lg:text-5xl xl:text-[3.5rem] font-black tracking-tight text-navy dark:text-white leading-[1.18] transition-all duration-300 ease-in-out ${
                isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                {autoLang === 'te' ? (
                  <span className="block font-sans font-black tracking-normal leading-[1.25]">
                    సురక్షితమైన <br className="sm:hidden" />
                    పొదుపు. <br className="hidden sm:inline" />
                    <span className="metallic-gold-text">
                      తక్షణ ఆర్థిక <br className="sm:hidden" />
                      భరోసా.
                    </span>
                  </span>
                ) : (
                  <span className="block">
                    Disciplined Wealth. <br />
                    <span className="metallic-gold-text whitespace-nowrap">Guaranteed Liquidity.</span>
                  </span>
                )}
              </h1>
            </div>

            {/* Action Buttons: Navy Primary + Gold Accents */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#plans"
                onClick={onExplorePlans}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl navy-primary-btn font-extrabold text-sm sm:text-base hover:scale-102 transition-transform"
              >
                <Coins className="w-5 h-5 text-gold-light" />
                <span>{lang === 'te' ? 'చిట్ ప్లాన్లు చూడండి' : 'Explore 5 Chit Schemes'}</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </a>

              <a
                href="#enquiry"
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white dark:bg-navy-dark text-navy dark:text-white font-bold text-sm sm:text-base border-2 border-navy/20 dark:border-gold/40 hover:border-gold shadow hover:scale-102 transition-all"
              >
                <Phone className="w-4 h-4 text-gold-dark dark:text-gold-light" />
                <span>{lang === 'te' ? 'ఉచిత సంప్రదింపు' : 'Free Consultation'}</span>
              </a>
            </div>

            {/* Clean & Minimalist Metric Pods */}
            <div className="pt-6 border-t border-navy/10 dark:border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              
              {/* Metric 1: 26+ */}
              <div className="p-2.5 sm:p-4 rounded-2xl bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-white/10 shadow-sm">
                <p className="text-xl sm:text-3xl font-black font-mono text-navy dark:text-gold-light tracking-tight">
                  26+
                </p>
                <p className="text-[10px] sm:text-sm font-bold text-charcoal-muted dark:text-white/80 font-display mt-0.5 sm:mt-1 leading-tight">
                  {lang === 'te' ? 'ఏళ్ల నమ్మకం' : 'Years of Trust'}
                </p>
              </div>

              {/* Metric 2: 15K+ */}
              <div className="p-2.5 sm:p-4 rounded-2xl bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-white/10 shadow-sm">
                <p className="text-xl sm:text-3xl font-black font-mono text-navy dark:text-white tracking-tight">
                  15K+
                </p>
                <p className="text-[10px] sm:text-sm font-bold text-charcoal-muted dark:text-white/80 font-display mt-0.5 sm:mt-1 leading-tight">
                  {lang === 'te' ? 'సంతృప్త కుటుంబాలు' : 'Active Families'}
                </p>
              </div>

              {/* Metric 3: 100% */}
              <div className="p-2.5 sm:p-4 rounded-2xl bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-white/10 shadow-sm">
                <p className="text-xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                  100%
                </p>
                <p className="text-[10px] sm:text-sm font-bold text-charcoal-muted dark:text-white/80 font-display mt-0.5 sm:mt-1 leading-tight">
                  {lang === 'te' ? 'చట్టబద్ధ రక్షణ' : 'Act 1982 Compliant'}
                </p>
              </div>
            </div>

            {/* Minimal Classic Instagram Button */}
            <div className="pt-2 flex justify-center sm:justify-start">
              <a
                href={BRAND.instagramUrl || "https://www.instagram.com/sivakaverichits/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-navy-dark text-navy dark:text-white font-mono text-xs font-bold border border-surface-border dark:border-white/20 shadow-sm hover:border-gold hover:text-gold-dark dark:hover:text-gold-light hover:shadow-md transition-all duration-200"
              >
                <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>{lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో ఫాలో అవ్వండి' : 'Follow Us on Instagram'}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

          </div>

          {/* Right: 3D Interactive Deep Navy Card (Desktop Only - Kept clean on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center">
            
            <TiltCard 
              maxTilt={12} 
              scale={1.02}
              className="w-full max-w-md rounded-3xl bg-navy text-white p-7 border-2 border-gold/40 shadow-3d-navy-card relative overflow-hidden"
            >
              {/* Header inside 3D Card */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <GoldCoin3D size={44} />
                  <div>
                    <h3 className="font-display font-black text-base text-white">
                      Small Business Growth Chit
                    </h3>
                    <span className="text-[11px] font-mono text-gold-champagne font-bold">
                      MSME ₹5,00,000 Scheme
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold-light text-[10px] font-mono font-bold uppercase">
                  Popular
                </span>
              </div>

              {/* 3D Tier Metrics */}
              <div className="my-6 space-y-3">
                <div className="p-4 rounded-2xl bg-navy-dark/80 border border-gold/30 flex items-baseline justify-between shadow-inner">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white/60">Total Chit Pool</p>
                    <p className="text-2xl font-black font-mono text-white">₹5,00,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono uppercase text-gold-champagne font-bold">Avg Net Monthly</p>
                    <p className="text-lg font-bold font-mono text-gold-light">~₹10,300/mo</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-navy-dark/80 border border-white/15 shadow-inner">
                    <p className="text-white/60 text-[10px] uppercase font-mono">Tenure</p>
                    <p className="font-bold text-white mt-0.5">40 Months</p>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-dark/80 border border-white/15 shadow-inner">
                    <p className="text-white/60 text-[10px] uppercase font-mono">Dividend Yield</p>
                    <p className="font-bold text-emerald-400 mt-0.5">Up to 12% p.a.</p>
                  </div>
                </div>
              </div>

              {/* Card Action Button */}
              <button
                onClick={() => onSelectScheme && onSelectScheme(CHIT_SCHEMES[1])}
                className="w-full py-3.5 px-4 rounded-xl metallic-gold-btn text-navy font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
              >
                <span>Instant Enrollment Pre-Fill</span>
                <ArrowRight className="w-4 h-4 text-navy" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/60 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-light" />
                <span>Section 20 Bank Lien Protected</span>
              </div>

            </TiltCard>

          </div>

        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-navy/40 dark:text-gold-light opacity-60 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>

    </section>
  );
}
