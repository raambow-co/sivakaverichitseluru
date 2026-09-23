import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../../constants/tokens';

export default function FAQSection({ lang }) {
  const [openIndices, setOpenIndices] = useState({ "0-0": true });

  // Extract all questions preserving their exact original content and adding category metadata
  const allFaqs = FAQS.flatMap((cat, catIdx) =>
    cat.questions.map((q, qIdx) => ({
      ...q,
      category: cat.category,
      teluguCategory: cat.teluguCategory,
      id: `${catIdx}-${qIdx}`,
    }))
  );

  // Split into left and right columns for independent side-by-side accordion expansion
  const leftColFaqs = allFaqs.filter((_, idx) => idx % 2 === 0);
  const rightColFaqs = allFaqs.filter((_, idx) => idx % 2 === 1);

  const toggleAccordion = (id) => {
    setOpenIndices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderFaqCard = (item) => {
    const isOpen = !!openIndices[item.id];

    return (
      <div
        key={item.id}
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'border-navy dark:border-gold bg-white dark:bg-navy-dark shadow-3d-card ring-1 ring-navy/10 dark:ring-gold/25'
            : 'border-surface-border dark:border-gold/20 bg-white dark:bg-navy-dark hover:border-navy/40 dark:hover:border-gold/40 shadow-sm'
        }`}
      >
        <button
          onClick={() => toggleAccordion(item.id)}
          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4"
          aria-expanded={isOpen}
        >
          <div className="space-y-1.5 flex-1 pr-2">
            <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-subtle dark:bg-navy text-gold-dark dark:text-gold-light border border-surface-border dark:border-gold/20">
              {lang === 'te' ? item.teluguCategory : item.category}
            </span>

            <p className="font-display font-bold text-sm sm:text-base text-navy dark:text-white leading-snug">
              {item.q}
            </p>
            <p className="text-xs font-mono text-gold-dark dark:text-gold-light">
              {item.teluguQ}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-surface-subtle dark:bg-navy flex items-center justify-center text-navy dark:text-gold-light shrink-0 mt-0.5 border border-surface-border dark:border-gold/30 transition-transform">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isOpen && (
          <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-surface-border dark:border-gold/15 text-xs sm:text-sm space-y-2 text-charcoal-light dark:text-white/80 leading-relaxed font-body bg-surface-subtle/40 dark:bg-navy-deep/40">
            <p>{item.a}</p>
            <p className="text-xs font-mono text-navy dark:text-gold-light font-medium pt-1 border-t border-surface-border/60 dark:border-gold/10">
              {item.teluguA}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="relative py-24 bg-surface-subtle dark:bg-navy-deep/40 border-t border-surface-border dark:border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Clarifications & Legal FAQ</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-navy dark:text-white leading-tight">
            {lang === 'te' ? (
              <>తరచుగా అడిగే ప్రశ్నలు <span className="metallic-gold-text">• FAQs</span></>
            ) : (
              <>Frequently Asked <span className="metallic-gold-text">Questions</span></>
            )}
          </h2>
        </div>

        {/* 2-Column Side-by-Side Questions Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          
          {/* Left Column Questions */}
          <div className="space-y-4">
            {leftColFaqs.map((faq) => renderFaqCard(faq))}
          </div>

          {/* Right Column Questions */}
          <div className="space-y-4">
            {rightColFaqs.map((faq) => renderFaqCard(faq))}
          </div>

        </div>

      </div>
    </section>
  );
}
