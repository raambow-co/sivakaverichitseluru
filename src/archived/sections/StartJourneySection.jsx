import React from 'react';
import { UserCheck, FileText, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

export default function StartJourneySection({ onStartEnquiry }) {
  const steps = [
    {
      step: "01",
      title: "Select Your Plan",
      telugu: "చిట్ ప్లాన్ ఎంచుకోండి",
      desc: "Pick a purpose-driven savings target ranging from ₹1,00,000 to ₹50,00,000 based on your goal.",
    },
    {
      step: "02",
      title: "Quick KYC Verification",
      telugu: "ఆధార్ & పాన్ ధృవీకరణ",
      desc: "Submit simple Aadhaar & PAN identification for legally registered subscriber enrollment.",
    },
    {
      step: "03",
      title: "Receive Passbook & Allotment",
      telugu: "అధికారిక పాస్‌బుక్ రశీదు",
      desc: "Get your computerized passbook, unique member ID, and SMS notification for monthly auctions.",
    }
  ];

  return (
    <section className="relative py-20 bg-forest dark:bg-forest-deep text-ivory overflow-hidden border-y-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Onboarding</span>
          </div>

          <h2 className="mt-3 font-teluguDisplay text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ivory leading-tight">
            సులభమైన 3 దశల్లో మీ <span className="text-gold-light font-display">పొదుపు ప్రయాణం ప్రారంభించండి</span>
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-ivory/80 font-body">
            Begin with complete peace of mind under the Chit Funds Act, 1982.
          </p>

          <OrnamentDivider light={true} />
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-forest-dark/80 border border-gold/30 relative flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="font-mono font-extrabold text-2xl text-gold-light opacity-60">
                  {s.step}
                </span>
                <h3 className="font-display font-bold text-lg text-ivory mt-2">
                  {s.title}
                </h3>
                <p className="font-teluguBody text-xs font-semibold text-gold-light mt-0.5">
                  {s.telugu}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-ivory/75 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center gap-2 text-xs text-gold-light">
                <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                <span>Zero processing charges</span>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion Action */}
        <div className="mt-12 text-center">
          <a
            href="#enquiry"
            onClick={onStartEnquiry}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gold-gradient text-forest-deep font-extrabold text-sm sm:text-base shadow-gold-glow hover:brightness-110 active:scale-95 transition-all shimmer-btn"
          >
            <span>Begin Free Consultation</span>
            <ArrowRight className="w-4 h-4 text-forest-deep" />
          </a>
        </div>

      </div>
    </section>
  );
}
