import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Coins, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Instagram, 
  CheckCircle2,
  HeartHandshake,
  Car,
  Home as HomeIcon
} from 'lucide-react';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';

const SLIDES = [
  {
    id: 'marriage',
    imageWebp: '/marriage_image.webp',
    imagePng: '/marriage_image.png',
    objectPosition: 'object-[center_top] sm:object-[center_12%]',
    icon: HeartHandshake,
    badgeEn: 'Marriage & Auspicious Milestones',
    badgeTe: 'వివాహం & కుటుంబ శుభకార్యాలు',
    titleEn: 'Auspicious Marriage Celebrations',
    titleTe: 'సురక్షితమైన పొదుపుతో ఘనమైన వివాహ వేడుకలు',
    subtitleEn: 'Plan your family’s proudest moments with complete peace of mind. Guaranteed liquidity & high dividend payouts.',
    subtitleTe: 'అప్పుల భారం లేకుండా కుటుంబ నిశ్చింత వివాహ శుభకార్యాల కోసం నమ్మకమైన పొదుపు మార్గం.',
    scheme: CHIT_SCHEMES[0] || null,
  },
  {
    id: 'car',
    imageWebp: '/car_image.webp',
    imagePng: '/car_image.png',
    objectPosition: 'object-center',
    icon: Car,
    badgeEn: 'Dream Vehicle Savings Plan',
    badgeTe: 'వాహన కొనుగోలు పొదుపు ప్లాన్',
    titleEn: 'Drive Your Dream Car with Disciplined Savings',
    titleTe: 'మీ కలల వాహనాన్ని సొంతం చేసుకోండి',
    subtitleEn: 'Avoid heavy bank interest rates. Use monthly chit auction dividends to purchase your dream vehicle with pride.',
    subtitleTe: 'బ్యాంకు వడ్డీల భారం లేకుండా అత్యధిక డివిడెండ్లతో మీ కలల కారును సులభంగా సొంతం చేసుకోండి.',
    scheme: CHIT_SCHEMES[1] || null,
  },
  {
    id: 'house',
    imageWebp: '/home_image.webp',
    imagePng: '/home_image.png',
    objectPosition: 'object-center',
    icon: HomeIcon,
    badgeEn: 'Home Construction & Land Assets',
    badgeTe: 'గృహ నిర్మాణం & ఆస్తి పొదుపు',
    titleEn: 'Own Your Dream House & Build Lasting Wealth',
    titleTe: 'మీ సొంత ఇల్లు - కుటుంబానికి శాశ్వత భరోసా',
    subtitleEn: 'Transform monthly contributions into permanent real estate assets. Fully protected under AP Chit Funds Act 1982.',
    subtitleTe: 'నెలవారీ పొదుపుతో మీ సొంతింటి కలను నెరవేర్చుకుని భవిష్యత్తుకి బలమైన పునాది వేయండి.',
    scheme: CHIT_SCHEMES[2] || null,
  },
];

export default function HeroSection({ lang = 'en', onExplorePlans, onOpenEnquiry, onSelectScheme }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const timerRef = useRef(null);

  // 5-second slide auto-rotation logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const activeSlide = SLIDES[currentIndex];

  return (
    <section className="relative w-full pt-16 sm:pt-20 bg-navy-deep text-white overflow-hidden">
      
      {/* Landscape Slideshow Canvas Container (Optimized height for all screen sizes) */}
      <div 
        className="relative w-full h-[60vh] min-h-[460px] max-h-[720px] sm:h-[70vh] lg:h-[76vh] xl:h-[80vh] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Landscape Images Array with Smooth Crossfade */}
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              {/* Picture Tag for Optimized WebP with PNG fallback */}
              <picture className="w-full h-full block">
                <source srcSet={slide.imageWebp} type="image/webp" />
                <img
                  src={slide.imagePng}
                  alt={lang === 'te' ? slide.titleTe : slide.titleEn}
                  className={`w-full h-full object-cover ${slide.objectPosition} filter brightness-[0.98] contrast-[1.02]`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>

              {/* Rich Left Gradient Shade for Text Legibility */}
              <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-r from-navy-deep/95 via-navy-deep/75 to-transparent" />
              {/* Bottom Gradient Shade for Tab Indicators & Controls */}
              <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-navy-deep/95 via-navy-deep/50 to-transparent" />
            </div>
          );
        })}

        {/* Play/Pause Rotation Control */}
        <div className="absolute top-3.5 sm:top-5 left-4 sm:left-8 z-30">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1.5 sm:p-2 rounded-full bg-navy-dark/90 border border-white/20 text-white/90 hover:text-white hover:border-gold backdrop-blur-md transition-all shadow"
            title={isPlaying ? 'Pause Rotation' : 'Play Rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Main Content Hero Overlay (Classic presentation directly on the left shade) */}
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start">
          <div className="max-w-lg lg:max-w-xl space-y-3 sm:space-y-4 text-left pl-1 sm:pl-3">
            
            {/* Govt Registered Chit Enterprise Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-dark/90 border border-gold/40 shadow-lg backdrop-blur-md animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-display font-extrabold text-gold-light uppercase tracking-wider">
                {lang === 'te' ? 'ఆంధ్రప్రదేశ్ ప్రభుత్వ గుర్తింపు సంస్థ • ఏలూరు' : 'Govt. Registered Chit Enterprise • Eluru'}
              </span>
            </div>

            {/* Dynamic Animated Title (Classic Elegant Display Typography) */}
            <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4.5xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
              {lang === 'te' ? (
                <span className="block font-sans">{activeSlide.titleTe}</span>
              ) : (
                <span className="block">{activeSlide.titleEn}</span>
              )}
            </h1>

            {/* Hero Action Buttons (Classic Navy & Gold Buttons) */}
            <div className="pt-1 sm:pt-2 flex flex-col items-start gap-2.5 sm:gap-3">
              {/* Row 1: Main CTA Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="#plans"
                  onClick={() => {
                    if (activeSlide.scheme && onSelectScheme) {
                      onSelectScheme(activeSlide.scheme);
                    }
                    if (onExplorePlans) onExplorePlans();
                  }}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl metallic-gold-btn font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform"
                >
                  <Coins className="w-4 h-4 text-navy" />
                  <span>{lang === 'te' ? 'చిట్ ప్లాన్లు చూడండి' : 'Explore Chit Schemes'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-navy" />
                </a>

                <a
                  href="#enquiry"
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-navy-dark/90 hover:bg-navy text-white font-bold text-xs sm:text-sm border border-white/30 hover:border-gold backdrop-blur-md shadow-lg hover:scale-105 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-light" />
                  <span>{lang === 'te' ? 'ఉచిత సంప్రదింపు' : 'Free Consultation'}</span>
                </a>
              </div>

              {/* Row 2: Instagram Button placed below the two buttons */}
              <a
                href={BRAND.instagramUrl || "https://www.instagram.com/sivakaverichits/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold border border-white/20 backdrop-blur-md transition-all shadow-md hover:scale-105"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Quick Trust Badges Strip (Classic Institutional Trust Strip) */}
            <div className="pt-2 flex items-center gap-4 text-[11px] sm:text-xs font-sans font-semibold text-slate-200">
              <div className="flex items-center gap-1.5 drop-shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-light" />
                <span>Chit Act 1982 Compliant</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 drop-shadow">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'te' ? '15+ ఏళ్ల విశ్వాసం' : '15+ Years Legacy'}</span>
              </div>
              <div className="flex items-center gap-1.5 drop-shadow">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>15,000+ Happy Families</span>
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Arrows (Classic Widescreen Buttons) */}
        <button
          onClick={goToPrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-xl bg-navy-dark/80 hover:bg-navy border border-white/20 hover:border-gold text-white backdrop-blur-md shadow-xl transition-all hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-xl bg-navy-dark/80 hover:bg-navy border border-white/20 hover:border-gold text-white backdrop-blur-md shadow-xl transition-all hover:scale-110"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Slide Indicators Bar with Live 5-Second Timer Bar */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex flex-col items-center gap-2 px-4">
          
          {/* Slide Tab Buttons (On mobile: Icon ONLY. On desktop: Icon + Text) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-xl bg-navy-dark/90 border border-white/20 backdrop-blur-xl shadow-xl max-w-full overflow-x-auto no-scrollbar">
            {SLIDES.map((slide, idx) => {
              const SlideIcon = slide.icon;
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-sans font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gold text-navy shadow font-black scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  title={lang === 'te' ? slide.badgeTe : slide.badgeEn}
                >
                  <SlideIcon className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isActive ? 'text-navy' : 'text-gold-light'}`} />
                  <span className="hidden sm:inline">{lang === 'te' ? slide.badgeTe : slide.badgeEn}</span>
                </button>
              );
            })}
          </div>

          {/* 5-Second Animated Progress Bar */}
          <div className="w-40 sm:w-56 h-1 rounded-full bg-white/20 overflow-hidden relative">
            {isPlaying && (
              <div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-gold-light to-gold rounded-full"
                style={{
                  animation: 'heroSlideProgress 5000ms linear forwards'
                }}
              />
            )}
          </div>

        </div>

      </div>

      {/* Progress Bar Keyframe Inline Styling */}
      <style>{`
        @keyframes heroSlideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

    </section>
  );
}



