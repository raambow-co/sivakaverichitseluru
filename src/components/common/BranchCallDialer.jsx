import React, { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';

const BRANCH_OPTIONS = [
  {
    id: 'chintalapudi',
    name: 'Chintalapudi',
    teluguName: 'చింతలపూడి',
    phone: '08823-222229',
    tel: 'tel:08823222229',
    isHQ: false,
    // Compact Arc Coordinates (Top to Left)
    x: -5,
    y: -168,
  },
  {
    id: 'eluru',
    name: 'Eluru (HQ)',
    teluguName: 'ఏలూరు (ప్రధాన)',
    phone: '08812-222229',
    tel: 'tel:08812222229',
    isHQ: true,
    x: -72,
    y: -120,
  },
  {
    id: 'sathupalli',
    name: 'Sathupalli',
    teluguName: 'సత్తుపల్లి',
    phone: '9055595559',
    tel: 'tel:9055595559',
    isHQ: false,
    x: -122,
    y: -64,
  },
  {
    id: 'narayanapuram',
    name: 'Narayanapuram',
    teluguName: 'నారాయణపురం',
    phone: '9893123789',
    tel: 'tel:9893123789',
    isHQ: false,
    x: -150,
    y: 0,
  },
];

export default function BranchCallDialer({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialerRef = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialerRef.current && !dialerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dialerRef} className="fixed bottom-6 right-6 z-50 print:hidden select-none">
      
      {/* Subtle backdrop scrim when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/35 backdrop-blur-[1.5px] transition-opacity duration-200 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Compact Radial Arc Branch Options */}
      <div className="relative z-40">
        {BRANCH_OPTIONS.map((branch, index) => {
          return (
            <div
              key={branch.id}
              style={{
                transform: isOpen
                  ? `translate(${branch.x}px, ${branch.y}px) scale(1)`
                  : 'translate(0px, 0px) scale(0.4)',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
                transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease',
                transitionDelay: isOpen ? `${index * 30}ms` : '0ms',
              }}
              className="absolute bottom-1 right-1 origin-bottom-right"
            >
              <a
                href={branch.tel}
                aria-label={`Call ${branch.name} branch at ${branch.phone}`}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white dark:bg-navy text-navy dark:text-white border border-surface-border dark:border-white/20 shadow-lg hover:border-[#0284C7] dark:hover:border-sky-400 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 whitespace-nowrap"
              >
                {/* Compact Classic Blue Phone Circle */}
                <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-3.5 h-3.5 fill-white text-white" />
                </div>

                {/* Branch Info */}
                <div className="text-left pr-1 leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-display font-black text-navy dark:text-white">
                      {lang === 'te' ? branch.teluguName : branch.name}
                    </span>
                    {branch.isHQ && (
                      <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[8px] font-mono font-bold uppercase">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-[10.5px] font-mono font-bold text-[#0284C7] dark:text-sky-300 mt-0.5">
                    {branch.phone}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Main Classic Blue Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close branch phone directory' : 'Open branch phone directory'}
        className={`relative z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ease-out focus:outline-none ${
          isOpen
            ? 'bg-navy text-white border-2 border-white/30 shadow-2xl scale-105'
            : 'bg-[#0284C7] hover:bg-[#0369A1] text-white border-2 border-white/90 shadow-[0_4px_20px_rgba(2,132,199,0.45)] hover:scale-105 active:scale-95'
        }`}
      >
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
          )}
        </div>
      </button>

      {/* Compact Prompt Pill when closed */}
      {!isOpen && (
        <div className="absolute right-16 bottom-2.5 pointer-events-none hidden sm:block">
          <div className="px-3 py-1 rounded-full bg-white dark:bg-navy text-navy dark:text-white text-[11px] font-mono font-bold shadow-md border border-surface-border dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span>{lang === 'te' ? 'శాఖల నంబర్లు' : 'Call Branches'}</span>
          </div>
        </div>
      )}

    </div>
  );
}
