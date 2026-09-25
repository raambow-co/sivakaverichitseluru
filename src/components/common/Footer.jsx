import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock, Instagram, FileText, Lock, Scale, AlertTriangle, ChevronRight } from 'lucide-react';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';

export default function Footer({ lang, onOpenLegal }) {
  return (
    <footer className="relative bg-navy text-white pt-16 pb-12 overflow-hidden border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Statutory Advisory Ribbon: No Website Payments */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono font-bold text-xs sm:text-sm text-amber-300 uppercase tracking-wider">
                {lang === 'te' ? 'ఆన్‌లైన్ చెల్లింపుల ప్రకటన — సురక్షిత బ్యాంకింగ్' : 'Statutory Advisory: Zero Website Payments Accepted'}
              </p>
              <p className="text-xs text-white/80 mt-0.5">
                {lang === 'te'
                  ? 'ఈ వెబ్‌సైట్ కేవలం సమాచార ప్రయోజనాల కొరకు మాత్రమే. చిట్ నమోదులు మరియు చెల్లింపులు కేవలం మా కార్యాలయం లేదా అధికారిక ప్రతినిధి ద్వారా నేరుగా బ్యాంక్-టు-బ్యాంక్ మాత్రమే జరుగుతాయి.'
                  : 'This website is strictly informational for institutional credibility. Chit subscriptions & disbursements occur only in-person at our office or via direct Bank-to-Bank transfers.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenLegal && onOpenLegal('no-payment')}
            className="px-4 py-2 rounded-xl bg-amber-400 text-navy hover:bg-amber-300 font-mono text-xs font-black shrink-0 transition-colors shadow flex items-center gap-1.5"
          >
            <span>{lang === 'te' ? 'వివరాలు చదవండి' : 'Read Notice'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          
          {/* Col 1: Brand & Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shadow">
                <img
                  src="/logo.webp"
                  alt="Siva Kaveri Chits Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white tracking-wide">
                  SIVA KAVERI CHITS
                </h3>
                <p className="text-xs font-mono text-gold-light font-bold">
                  శివ కావేరి చిట్స్ RBT
                </p>
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed font-body">
              Premier Government-Registered Chit Fund enterprise serving Eluru and West Godavari. Committed to ethical savings, transparent reverse auctions, and statutory peace of mind.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/30 text-gold-light text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-gold-light" />
                <span>Act 1982 • Reg #{BRAND.registrationNo}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Schemes */}
          <div>
            <h4 className="font-mono font-bold text-xs text-gold-champagne tracking-wider uppercase mb-4">
              Chit Schemes
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {CHIT_SCHEMES.map((scheme) => (
                <li key={scheme.id}>
                  <a
                    href="#plans"
                    className="hover:text-gold-light transition-colors flex items-center justify-between group"
                  >
                    <span>{scheme.name}</span>
                    <span className="font-mono text-gold-light font-bold">{scheme.formattedValue}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory Policies */}
          <div>
            <h4 className="font-mono font-bold text-xs text-gold-champagne tracking-wider uppercase mb-4">
              {lang === 'te' ? 'చట్టబద్ధ పాలసీలు & చట్టాలు' : 'Compliance & Governance'}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('terms')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>{lang === 'te' ? 'నిబంధనలు & షరతులు (బైలాస్)' : 'Terms & Conditions (Chit Bylaws)'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('privacy')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 text-left"
                >
                  <Lock className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>{lang === 'te' ? 'గోప్యతా విధానం (DPDP 2023)' : 'Privacy Policy (Data Protection)'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('grievance')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>{lang === 'te' ? 'ఫిర్యాదుల పరిష్కారం (నోడల్ ఆఫీసర్)' : 'Grievance Redressal (Nodal Desk)'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('no-payment')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 text-left text-amber-300"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{lang === 'te' ? 'నో ఆన్‌లైన్ పేమెంట్స్ నోటీస్' : 'No Online Payments Policy'}</span>
                </button>
              </li>
              <li className="pt-1">
                <a href="#trust" className="hover:text-gold-light transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-light shrink-0" />
                  <span>Section 20 Bank Lien Security</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-xs text-gold-champagne tracking-wider uppercase mb-4">
              Registered Office (Eluru)
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-white/80">
              <MapPin className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
              <p className="leading-relaxed">{BRAND.address}</p>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80 font-mono">
              <Phone className="w-4 h-4 text-gold-light shrink-0" />
              <a href={`tel:${BRAND.phone}`} className="hover:text-gold-light font-bold">
                {BRAND.phoneDisplay} / {BRAND.landline}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80 font-mono">
              <Mail className="w-4 h-4 text-gold-light shrink-0" />
              <a href={`mailto:${BRAND.email}`} className="hover:text-gold-light">
                {BRAND.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80 font-mono">
              <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
              <a
                href={BRAND.instagramUrl || "https://www.instagram.com/sivakaverichits/"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light"
              >
                {BRAND.instagramHandle || "@sivakaverichits"}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-white/80">
              <Clock className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
              <p>{BRAND.officeHours}</p>
            </div>
          </div>

        </div>

        {/* Legal notice */}
        <div className="mt-8 p-4 rounded-xl bg-navy-dark/90 border border-gold/30 text-[11px] text-white/70 leading-relaxed font-body shadow-inner">
          <p className="font-mono font-bold text-gold-light uppercase tracking-wider mb-1">
            Statutory Legal Notice & Zero Online Payment Mandate:
          </p>
          <p>
            Siva Kaveri Chits Private Limited is an incorporated company operating pursuant to the Chit Funds Act, 1982 (Central Act No. 40 of 1982) and Andhra Pradesh Chit Funds Rules, 2008. In accordance with Section 20, 100% of the aggregate chit value of every group is deposited in nationalized banks under the lien of the Government Registrar of Chit Funds prior to auction launch. All subscriber agreements and financial transactions occur exclusively in-person through authorized branch offices and institutional Bank-to-Bank settlement.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-mono">
          <span>© {new Date().getFullYear()} Siva Kaveri Chits RBT. All Rights Reserved.</span>
          <span>CIN: {BRAND.cin} • West Godavari District, Andhra Pradesh</span>
        </div>

      </div>
    </footer>
  );
}

