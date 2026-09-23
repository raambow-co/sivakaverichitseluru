import React, { useState, useEffect } from 'react';
import { Phone, Moon, Sun, Menu, X, ChevronRight, Globe, MessageSquare } from 'lucide-react';
import { BRAND } from '../../constants/tokens';

export default function Header({ theme, toggleTheme, lang, toggleLang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'te' ? "చిట్ ప్లాన్లు" : "Chit Schemes", href: "#plans" },
    { name: lang === 'te' ? "క్యాలిక్యులేటర్" : "Calculator", href: "#calculator" },
    { name: lang === 'te' ? "విధానం" : "How It Works", href: "#how-it-works" },
    { name: lang === 'te' ? "చట్టబద్ధత" : "Trust & Legal", href: "#trust" },
    { name: lang === 'te' ? "సందేహాలు" : "FAQs", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 rectangular-nav transition-all duration-300 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Official Brand Logo & Clean White Brand Text */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-1 bg-white flex items-center justify-center shadow group-hover:scale-105 transition-transform overflow-hidden border border-white/20">
            <img
              src="/logo.png"
              alt="Siva Kaveri Chits Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white">
                SIVA KAVERI
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-black bg-white/20 text-white leading-none">
                RBT
              </span>
            </div>
            <span className="text-xs font-semibold text-white/70 font-mono mt-1 leading-none">
              {lang === 'te' ? 'శివ కావేరి చిట్స్ • ఏలూరు' : 'Chit Funds Act 1982 • Eluru'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Clean White Text */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Controls in Clean White & Solid Navy */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label="Toggle Language"
            className="h-9 sm:h-10 px-3 rounded-xl border border-white/20 bg-white/5 text-xs font-mono font-bold text-white hover:bg-white/15 transition-all shadow-sm flex items-center justify-center gap-1.5"
            title="Switch English / Telugu"
          >
            <Globe className="w-3.5 h-3.5 text-white/90" />
            <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-all shadow-sm flex items-center justify-center"
          >
            {theme === 'dark-navy' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-white/90" />
            )}
          </button>

          {/* Instant CTA Button */}
          <a
            href="#enquiry"
            className="hidden sm:inline-flex h-9 sm:h-10 px-4 rounded-xl bg-white text-navy hover:bg-slate-100 text-xs font-black items-center justify-center gap-1.5 shadow transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-navy" />
            <span>{lang === 'te' ? 'చేరండి' : 'Join Chit'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-navy" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl border border-white/20 text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 border-t border-white/10 space-y-1.5 bg-navy shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-white/10"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-navy text-xs font-black shadow"
            >
              <Phone className="w-4 h-4 text-navy" />
              <span>Call Branch: {BRAND.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
