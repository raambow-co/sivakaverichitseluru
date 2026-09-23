import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';

export default function Footer({ lang }) {
  return (
    <footer className="relative bg-navy text-white pt-16 pb-12 overflow-hidden border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          
          {/* Col 1: Brand & Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shadow">
                <img
                  src="/logo.png"
                  alt="Siva Kaveri Chits Logo"
                  className="w-full h-full object-contain"
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

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono font-bold text-xs text-gold-champagne tracking-wider uppercase mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <a href="#plans" className="hover:text-gold-light transition-colors">
                  Institutional Chit Portfolios
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-gold-light transition-colors">
                  Installment & Dividend Modeler
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-gold-light transition-colors">
                  5-Stage Lifecycle Guide
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-gold-light transition-colors">
                  Section 20 Bank Lien Safeguards
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-light transition-colors">
                  Frequently Asked Questions
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

            <div className="flex items-start gap-2.5 text-xs text-white/80">
              <Clock className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
              <p>{BRAND.officeHours}</p>
            </div>
          </div>

        </div>

        {/* Legal notice */}
        <div className="mt-8 p-4 rounded-xl bg-navy-dark/90 border border-gold/30 text-[11px] text-white/70 leading-relaxed font-body shadow-inner">
          <p className="font-mono font-bold text-gold-light uppercase tracking-wider mb-1">
            Statutory Legal Notice:
          </p>
          <p>
            Shiva Kaveri Chits Private Limited is an incorporated company operating pursuant to the Chit Funds Act, 1982 (Central Act No. 40 of 1982) and Andhra Pradesh Chit Funds Rules, 2008. In accordance with Section 20, 100% of the aggregate chit value of every group is deposited in nationalized banks under the lien of the Government Registrar of Chit Funds prior to auction launch.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-mono">
          <span>© {new Date().getFullYear()} Siva Kaveri Chits RBT. All Rights Reserved.</span>
          <span>West Godavari District, Andhra Pradesh</span>
        </div>

      </div>
    </footer>
  );
}
