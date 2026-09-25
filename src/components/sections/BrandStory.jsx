import React from 'react';
import { Landmark, Award, Shield, CheckCircle2, History, Sparkles, MapPin, User, Quote } from 'lucide-react';
import { BRAND } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

export default function BrandStory({ lang }) {
  return (
    <section id="story" className="relative py-24 bg-surface-subtle dark:bg-navy-deep border-t border-surface-border dark:border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-widest shadow-sm">
            <History className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Institutional Chit Legacy</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>26 ఏళ్ల <span className="metallic-gold-text">విశ్వసనీయ ప్రస్థానం</span></>
            ) : (
              <>Built on 26 Years of <span className="metallic-gold-text">Institutional Trust</span></>
            )}
          </h2>
        </div>

        {/* Narrative Grid: Left Office Showcase & Right Managing Director Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Full HQ Image Showcase with Bottom Dark Gradient Shade (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <TiltCard 
              maxTilt={5} 
              className="relative w-full h-[460px] sm:h-[500px] rounded-3xl overflow-hidden border-2 border-surface-border dark:border-gold/40 shadow-3d-card group bg-navy-deep flex flex-col justify-between"
            >
              {/* Office Image */}
              <img
                src="/siva_kaveri_sem_fin.webp"
                alt="Siva Kaveri Chits Eluru Headquarters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Top Institutional Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20 flex items-center gap-1.5 shadow-lg">
                  <Landmark className="w-3.5 h-3.5 text-gold-light" />
                  <span>Central Registered Office</span>
                </span>
              </div>

              {/* Subtle Bottom Black Gradient Shade (strictly confined to bottom text area) */}
              <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Headquartered in Eluru Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-left text-white space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold uppercase shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>Eluru, Andhra Pradesh</span>
                </div>

                <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-snug">
                  Headquartered in Eluru
                </h3>

                <p className="text-xs sm:text-sm font-mono text-white/90 font-medium leading-relaxed">
                  {BRAND.address}
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Right: Managing Director Profile Card (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <TiltCard
              maxTilt={5}
              className="relative w-full h-full min-h-[460px] sm:min-h-[500px] rounded-3xl p-7 sm:p-9 bg-white dark:bg-navy-dark border-2 border-surface-border dark:border-gold/40 shadow-3d-card flex flex-col justify-between"
            >
              <div>
                
                {/* Top Role Badge */}
                <div className="flex items-center justify-between gap-3 pb-6 border-b border-surface-border dark:border-gold/20">
                  <span className="px-3.5 py-1 rounded-full bg-navy/5 dark:bg-gold/15 text-navy dark:text-gold-light font-mono text-xs font-black uppercase tracking-wider border border-navy/10 dark:border-gold/30 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
                    <span>Leadership & Direction</span>
                  </span>
                  
                  <span className="font-mono text-xs font-bold text-charcoal-muted dark:text-white/60">
                    Est. 1998
                  </span>
                </div>

                {/* MD Avatar & Identity Header */}
                <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
                  
                  {/* Animated Circular Frame for MD Photo (Enlarged) */}
                  <div className="relative shrink-0 group/avatar">
                    
                    {/* Outer Rotating / Pulsing Gold Shimmer Ring */}
                    <div 
                      className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-gold-dark via-gold-light to-amber-500 opacity-80 blur-[3px] animate-spin"
                      style={{ animationDuration: '10s' }}
                    />

                    {/* Clean Circular Photo Container (Enlarged) */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-surface-subtle dark:bg-navy-deep border-2 border-gold p-1 shadow-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src="/md_narendra_varma.webp"
                        alt="Narendra Varma - Managing Director"
                        className="w-full h-full rounded-full object-cover object-top transform group-hover/avatar:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-navy dark:text-white tracking-tight leading-snug">
                      Narendra Varma
                    </h3>
                    <p className="font-mono text-sm sm:text-base font-black text-gold-dark dark:text-gold-light">
                      {lang === 'te' ? 'మేనేజింగ్ డైరెక్టర్' : 'Managing Director'}
                    </p>
                    <p className="text-xs sm:text-sm text-charcoal-muted dark:text-white/70 font-body">
                      Siva Kaveri Chits Private Limited
                    </p>
                  </div>

                </div>

                {/* MD Message / Philosophy */}
                <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20 relative">
                  <Quote className="w-4 h-4 text-gold-dark/50 dark:text-gold/50 mb-1" />
                  <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/90 leading-relaxed italic font-body">
                    {lang === 'te' ? (
                      '"ప్రజల నమ్మకమే మా బలం — ప్రతి చిట్ సభ్యుడు కుటుంబంలాంటివారు, ప్రతి రూపాయికి 100% బ్యాంక్ డిపాజిట్ల చట్టబద్ధ రక్షణ మా బాధ్యత."'
                    ) : (
                      '"Our guiding principle is unwavering integrity — every subscriber is family, and every single rupee is protected by 100% statutory bank guarantees."'
                    )}
                  </p>
                </div>

              </div>

              {/* Bottom Trust Milestones Badges */}
              <div className="mt-5 pt-3.5 border-t border-surface-border dark:border-gold/20 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-navy dark:text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs">{lang === 'te' ? '15+ ఏళ్ల అనుభవం' : '15+ Years Experience'}</span>
                </div>
                <div className="flex items-center gap-2 text-navy dark:text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs">{lang === 'te' ? '15,000+ కుటుంబాలు' : '15,000+ Happy Families'}</span>
                </div>
              </div>

            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
