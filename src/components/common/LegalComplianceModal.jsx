import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  Building2, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Landmark, 
  UserCheck, 
  ExternalLink 
} from 'lucide-react';
import { BRAND } from '../../constants/tokens';

export default function LegalComplianceModal({ isOpen, onClose, initialTab = 'terms', lang = 'en' }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    {
      id: 'terms',
      title: lang === 'te' ? 'నిబంధనలు & షరతులు' : 'Terms & Conditions',
      icon: FileText,
      badge: lang === 'te' ? 'చిట్ బైలాస్' : 'Chit Bylaws',
    },
    {
      id: 'privacy',
      title: lang === 'te' ? 'గోప్యతా విధానం' : 'Privacy Policy',
      icon: Lock,
      badge: 'DPDP 2023',
    },
    {
      id: 'grievance',
      title: lang === 'te' ? 'ఫిర్యాదుల పరిష్కారం' : 'Grievance Redressal',
      icon: Scale,
      badge: lang === 'te' ? 'నోడల్ ఆఫీసర్' : 'Nodal Officer',
    },
    {
      id: 'no-payment',
      title: lang === 'te' ? 'ఆన్‌లైన్ చెల్లింపుల నోటీస్' : 'No Online Payments Notice',
      icon: AlertTriangle,
      badge: lang === 'te' ? 'ముఖ్యమైనది' : 'Important',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 select-none overflow-y-auto">
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-deep/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-navy-dark text-navy dark:text-white rounded-3xl border-2 border-surface-border dark:border-gold/40 shadow-3d-navy-card flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-surface-border dark:border-gold/20 bg-surface-subtle dark:bg-navy-deep flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/40 text-gold-dark dark:text-gold-light flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-lg sm:text-xl tracking-tight text-navy dark:text-white">
                  {lang === 'te' ? 'చట్టబద్ధ పాలసీ & నిబంధనల వివరాలు' : 'Statutory & Compliance Disclosures'}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-navy/10 dark:bg-gold/20 text-navy dark:text-gold-light">
                  Act 1982
                </span>
              </div>
              <p className="text-xs font-mono text-charcoal-muted dark:text-white/60">
                Siva Kaveri Chits Private Limited • Reg #{BRAND.registrationNo}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="w-9 h-9 rounded-xl bg-surface-subtle dark:bg-navy text-navy dark:text-white/80 hover:text-navy dark:hover:text-gold border border-surface-border dark:border-gold/30 flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Alert Banner: NO ONLINE PAYMENTS */}
        <div className="bg-amber-500/10 dark:bg-amber-500/20 border-b border-amber-500/30 px-6 py-3 flex items-start sm:items-center gap-3 text-xs font-mono text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-snug">
            <strong>{lang === 'te' ? 'ముఖ్య గమనిక: ' : 'ZERO ONLINE PAYMENTS NOTICE: '}</strong>
            {lang === 'te' 
              ? 'ఈ వెబ్‌సైట్ కేవలం సమాచారం మరియు సంస్థ విశ్వసనీయత కొరకు మాత్రమే. మేము వెబ్‌సైట్ ద్వారా ఎటువంటి నగదు లేదా ఆన్‌లైన్ పేమెంట్లను స్వీకరించము. చిట్ ప్రవేశం మరియు లావాదేవీలు కేవలం మా ఏలూరు కార్యాలయం లేదా అధికారిక ప్రతినిధి సమక్షంలో నేరుగా బ్యాంక్-టు-బ్యాంక్ ఖాతా ద్వారా మాత్రమే జరుగుతాయి.'
              : 'This website is strictly for informational transparency and institutional credibility. We do NOT accept any payments on this website. Chit enrollment and subscriptions are processed in-person at our registered Eluru office or through verified direct Bank-to-Bank channels.'}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex border-b border-surface-border dark:border-gold/20 bg-surface-subtle/50 dark:bg-navy/50 overflow-x-auto no-scrollbar shrink-0 px-4 sm:px-6 gap-2 pt-3 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-navy text-white dark:bg-gold dark:text-navy shadow-md'
                    : 'bg-white dark:bg-navy-dark text-charcoal-muted dark:text-white/70 hover:text-navy dark:hover:text-white border border-surface-border dark:border-gold/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.title}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  isActive 
                    ? 'bg-white/20 text-white dark:bg-navy/20 dark:text-navy' 
                    : 'bg-surface-subtle dark:bg-navy-deep text-charcoal-muted dark:text-white/50'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left flex-grow">
          
          {/* ========================================================================= */}
          {/* TAB 1: TERMS & CONDITIONS */}
          {/* ========================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-navy dark:text-gold-light">
                  {lang === 'te' ? 'నిబంధనలు మరియు షరతులు (Terms & Conditions)' : 'Terms & Conditions of Chit Subscription'}
                </h3>
                <p className="text-xs text-charcoal-muted dark:text-white/70 font-mono">
                  Governed by Chit Funds Act, 1982 (Central Act 40 of 1982) & Andhra Pradesh Chit Funds Rules, 2008.
                </p>
              </div>

              {/* Core Policy Highlight Card */}
              <div className="p-5 rounded-2xl bg-navy text-white border-2 border-gold/40 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-gold-light font-bold text-sm font-mono uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>1. Official In-Person & Bank-to-Bank Model (నో ఆన్‌లైన్ పేమెంట్స్)</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-body">
                  <strong>a. Informational Website Only:</strong> This web portal operates exclusively to provide clear information on registered schemes, mathematical simulation, auction guidelines, and branch contact details. <em>No online checkout, payment gateway, UPI auto-debit, or digital wallet is hosted on this website.</em>
                </p>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-body">
                  <strong>b. In-Person Enrollment:</strong> To enroll in any chit scheme, subscribers must meet with our authorized branch officers or field agents, visit our Registered Office in Eluru (or branch locations), verify KYC documentation (Aadhaar & PAN), and sign the physical Chit Agreement (చట్టబద్ధ చిట్ ఒప్పందం).
                </p>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-body">
                  <strong>c. Strictly Bank-to-Bank Transactions:</strong> All monthly chit subscription payments and auction prize money disbursements must occur strictly through designated nationalized commercial bank accounts (NEFT / RTGS / Crossed Cheque / Demand Draft / Branch official POS counter). Official stamped receipts are issued for every payment.
                </p>
              </div>

              {/* Section 2: Statutory Lien & Safety */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-navy dark:text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold-dark dark:text-gold" />
                  <span>2. Section 20 100% Security Guarantee</span>
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/80 leading-relaxed">
                  Before the commencement of any chit group and prior to inviting public tenders, 100% of the aggregate chit value is deposited as a fixed deposit in a nationalized commercial bank in the name of the Registrar of Chit Funds, Andhra Pradesh. This guarantees full principal protection under Section 20 of the Central Chit Funds Act, 1982.
                </p>
              </div>

              {/* Section 3: Reverse Auction & 40% Bid Ceiling */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-navy dark:text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-gold-dark dark:text-gold" />
                  <span>3. Auction Conduct & 40% Statutory Ceiling</span>
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/80 leading-relaxed">
                  Monthly reverse auctions are conducted openly on scheduled dates at our registered office in Eluru. By state law, the maximum discount bid is legally capped at 40% of the gross chit value. The net auction discount (minus 5% statutory foreman commission) is distributed equally among all non-prized subscribers as dividend credit to reduce their subsequent monthly installment.
                </p>
              </div>

              {/* Section 4: Prize Disbursal & Sureties */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-navy dark:text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-gold-dark dark:text-gold" />
                  <span>4. Prize Disbursal & Security Sureties</span>
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/80 leading-relaxed">
                  Upon winning an auction, the prized subscriber must furnish standard co-subscriber or financial sureties (salary certificates, property documents, or bank guarantees) matching remaining future liability as mandated by the Act. Once verified, prize money is transferred directly via RTGS/NEFT to the subscriber’s verified bank account within 24 to 48 hours.
                </p>
              </div>

              {/* Section 5: Default & Foreman Corporate Guarantee */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-navy dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-dark dark:text-gold" />
                  <span>5. Foreman Indemnity on Default</span>
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/80 leading-relaxed">
                  Under statutory law, the foreman (Siva Kaveri Chits Private Limited) bears 100% civil liability for bridging any subscriber defaults from company reserves. Non-prized subscribers suffer zero loss and experience uninterrupted monthly dividend distributions.
                </p>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PRIVACY POLICY */}
          {/* ========================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-navy dark:text-gold-light">
                  {lang === 'te' ? 'గోప్యతా విధానం (Privacy Policy)' : 'Privacy Policy & Data Protection'}
                </h3>
                <p className="text-xs text-charcoal-muted dark:text-white/70 font-mono">
                  Compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20 space-y-2">
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-white/90 leading-relaxed font-body">
                  At <strong>Siva Kaveri Chits Private Limited</strong>, we maintain uncompromising standards regarding subscriber confidentiality and privacy. We treat our members' financial and personal information with utmost integrity.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-light dark:text-white/80">
                <div className="space-y-1">
                  <h4 className="font-bold text-navy dark:text-white font-mono text-xs uppercase tracking-wider">
                    1. Information We Collect
                  </h4>
                  <p className="leading-relaxed">
                    When you submit an inquiry form or reach out via WhatsApp/Phone, we collect basic contact information such as your Name, Mobile Phone Number, Preferred Location, and Selected Chit Plan. Physical KYC documentation (Aadhaar, PAN, Bank details) is only gathered in-person during official agreement signing.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-navy dark:text-white font-mono text-xs uppercase tracking-wider">
                    2. Purpose of Collection
                  </h4>
                  <p className="leading-relaxed">
                    Your contact information is strictly used by our authorized relationship officers to answer your scheme queries, schedule branch appointments, provide chit schedule calculation sheets, and fulfill statutory compliance required by the Chit Funds Act, 1982.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-navy dark:text-white font-mono text-xs uppercase tracking-wider">
                    3. Zero Third-Party Sharing or Selling
                  </h4>
                  <p className="leading-relaxed">
                    We <strong>NEVER</strong> sell, rent, trade, or share your contact number or personal data with external third-party advertisers, lenders, lead aggregators, or telemarketers.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-navy dark:text-white font-mono text-xs uppercase tracking-wider">
                    4. Data Security & Storage
                  </h4>
                  <p className="leading-relaxed">
                    Digital records are encrypted and retained within secure institutional servers. In-person physical records are maintained securely in our Eluru Registered Office vault in accordance with Government archival rules.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-navy dark:text-white font-mono text-xs uppercase tracking-wider">
                    5. Subscriber Rights
                  </h4>
                  <p className="leading-relaxed">
                    You have the right to request access to your submitted inquiry records or request deletion of pre-enrollment consultation data by emailing <a href={`mailto:${BRAND.email}`} className="text-navy dark:text-gold-light underline font-bold">{BRAND.email}</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: GRIEVANCE REDRESSAL MATRIX */}
          {/* ========================================================================= */}
          {activeTab === 'grievance' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-navy dark:text-gold-light">
                  {lang === 'te' ? 'ఫిర్యాదుల పరిష్కార యంత్రాంగం (Grievance Redressal)' : 'Statutory Grievance Redressal Mechanism'}
                </h3>
                <p className="text-xs text-charcoal-muted dark:text-white/70 font-mono">
                  Mandatory escalation matrix in compliance with Chit Registrar and State regulations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/20 text-xs sm:text-sm text-charcoal-light dark:text-white/90">
                Siva Kaveri Chits is committed to prompt, transparent dispute resolution. If you have any questions or grievances regarding chit auctions, dividend allocations, or prize money disbursal, follow our 3-tier escalation ladder:
              </div>

              {/* 3 Tier Grid */}
              <div className="space-y-4">
                
                {/* Level 1: Branch Support */}
                <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-surface-border dark:border-gold/30 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-navy/10 dark:bg-gold/20 text-navy dark:text-gold-light">
                      LEVEL 1: Branch Relationship Desk
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      TAT: 24 Hours
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-navy dark:text-white">
                    Branch Manager / Customer Desk (Eluru Headquarters)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-charcoal-muted dark:text-white/70 pt-1">
                    <div>📞 Phone: {BRAND.phoneDisplay}</div>
                    <div>🏢 Landline: {BRAND.landline}</div>
                    <div>✉️ Email: {BRAND.email}</div>
                    <div>⏰ Mon–Sat: 9:30 AM – 7:30 PM</div>
                  </div>
                </div>

                {/* Level 2: Nodal Grievance Officer */}
                <div className="p-5 rounded-2xl bg-navy text-white border-2 border-gold/40 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-gold/20 text-gold-light">
                      LEVEL 2: Corporate Nodal Officer
                    </span>
                    <span className="text-[11px] font-mono text-gold-champagne font-bold">
                      TAT: 48–72 Hours
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-gold-light">
                    Nodal Grievance Redressal Officer
                  </h4>
                  <div className="space-y-1.5 text-xs text-white/90 pt-1">
                    <p><strong>Name / Designation:</strong> Narendra Varma, Managing Director</p>
                    <p><strong>Direct Desk:</strong> D.No. 28-8-25/1, Narasimharao Pet, Eluru, AP - 534006</p>
                    <p><strong>Official Grievance Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-gold-light underline">{BRAND.email}</a></p>
                    <p><strong>Direct Mobile:</strong> <a href={`tel:${BRAND.phone}`} className="text-gold-light underline">{BRAND.phoneDisplay}</a></p>
                  </div>
                </div>

                {/* Level 3: Government Chit Registrar */}
                <div className="p-5 rounded-2xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300">
                      LEVEL 3: Statutory Authority
                    </span>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                      Chit Funds Act 1982 Section 64/65
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-navy dark:text-white">
                    Registrar of Chit Funds / Deputy Registrar
                  </h4>
                  <p className="text-xs text-charcoal-light dark:text-white/80 leading-relaxed">
                    If your dispute remains unaddressed after 15 working days, you have the statutory right to file a dispute petition under Section 64 of the Central Chit Funds Act, 1982 with the <strong>Office of the Deputy Registrar of Chits, West Godavari District, Eluru, Andhra Pradesh</strong>.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: NO ONLINE PAYMENT NOTICE */}
          {/* ========================================================================= */}
          {activeTab === 'no-payment' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{lang === 'te' ? 'ఆన్‌లైన్ చెల్లింపుల ప్రకటన' : 'Strict Advisory: No Website Payments'}</span>
                </h3>
                <p className="text-xs text-charcoal-muted dark:text-white/70 font-mono">
                  Official Public Advisory for Subscriber Safety and Fraud Prevention.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border-2 border-amber-500/40 text-xs sm:text-sm text-amber-950 dark:text-amber-100 space-y-3 font-body">
                <p className="font-bold text-sm sm:text-base font-display">
                  ⚠️ Siva Kaveri Chits Private Limited strictly operates on an In-Person & Institutional Bank Transfer Protocol:
                </p>
                <ul className="space-y-2.5 list-disc pl-5">
                  <li>
                    <strong>No Web Gateway / No UPI Links on Website:</strong> We do NOT host payment gateways, QR code checkout, or credit/debit card processing on this website.
                  </li>
                  <li>
                    <strong>Never Pay to Personal UPI Accounts:</strong> Never transfer funds to any personal UPI IDs, third-party wallets, or unverified phone numbers claiming to represent Siva Kaveri Chits.
                  </li>
                  <li>
                    <strong>Official Bank Account Only:</strong> Subscriptions are deposited only into our designated corporate bank accounts in nationalized banks under the company name <em>"Siva Kaveri Chits Private Limited"</em>.
                  </li>
                  <li>
                    <strong>Always Demand Official Stamped Receipts:</strong> Every installment payment must be accompanied by an official computerized/stamped passbook entry or branch counter receipt.
                  </li>
                  <li>
                    <strong>Fraud Reporting:</strong> If anyone solicits online payments on unauthorized portals claiming to represent us, immediately report to <a href={`tel:${BRAND.phone}`} className="font-bold underline">{BRAND.phoneDisplay}</a> or email <a href={`mailto:${BRAND.email}`} className="font-bold underline">{BRAND.email}</a>.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle dark:bg-navy border border-surface-border dark:border-gold/20 flex items-center gap-3 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-charcoal-light dark:text-white/90">
                  {lang === 'te'
                    ? 'మీ నిధుల భద్రత మా మొదటి ప్రాధాన్యత — పారదర్శక బ్యాంకింగ్ మరియు ప్రభుత్వ చట్టబద్ధ రక్షణ.'
                    : 'Your financial security is our utmost priority — 100% transparent institutional banking.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-surface-border dark:border-gold/20 bg-surface-subtle dark:bg-navy-deep flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted dark:text-white/60">
            <Building2 className="w-3.5 h-3.5 text-gold-dark dark:text-gold-light" />
            <span>Eluru HQ: {BRAND.phoneDisplay}</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl navy-primary-btn text-xs font-black uppercase tracking-wider"
          >
            {lang === 'te' ? 'అర్థమైంది / మూసివేయి' : 'I Understand & Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
