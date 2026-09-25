import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Building, 
  ExternalLink, 
  AlertTriangle, 
  FileText, 
  Lock,
  Copy,
  Check,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

const STORAGE_KEY = 'skc_consultation_leads';

/**
 * Clean and normalize phone number string
 * Handles "+91 ", "0", spaces, hyphens
 */
const sanitizeIndianPhoneNumber = (input = '') => {
  let cleaned = input.replace(/\D/g, ''); // Remove non-digits
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned.slice(0, 10);
};

/**
 * Validate 10-digit Indian mobile number: starts with 6, 7, 8, or 9
 */
const isValidIndianMobile = (phone = '') => {
  return /^[6-9]\d{9}$/.test(phone);
};

export default function EnquiryAndMapSection({ lang, selectedScheme, onOpenLegal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Eluru',
    schemeId: selectedScheme ? selectedScheme.id : CHIT_SCHEMES[1].id,
    language: 'Telugu',
    comment: '',
  });

  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (selectedScheme) {
      setFormData((prev) => ({
        ...prev,
        schemeId: selectedScheme.id,
      }));
    }
  }, [selectedScheme]);

  const currentSchemeObj = CHIT_SCHEMES.find((s) => s.id === formData.schemeId) || CHIT_SCHEMES[0];

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));
    if (nameTouched) {
      if (!val.trim()) {
        setNameError(lang === 'te' ? 'దయచేసి మీ పూర్తి పేరును నమోదు చేయండి' : 'Please enter your full name');
      } else if (val.trim().length < 2) {
        setNameError(lang === 'te' ? 'పేరు కనీసం 2 అక్షరాలు ఉండాలి' : 'Name must be at least 2 characters');
      } else {
        setNameError('');
      }
    }
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    const sanitized = sanitizeIndianPhoneNumber(rawVal);
    setFormData((prev) => ({ ...prev, phone: sanitized }));

    if (phoneTouched || sanitized.length > 0) {
      if (!sanitized) {
        setPhoneError(lang === 'te' ? 'దయచేసి మొబైల్ నంబరును నమోదు చేయండి' : 'Please enter mobile number');
      } else if (sanitized.length < 10) {
        setPhoneError(
          lang === 'te' 
            ? `ఇంకా ${10 - sanitized.length} అంకెలు అవసరం (10 అంకెలు ఉండాలి)` 
            : `Enter 10-digit number (${10 - sanitized.length} more digits needed)`
        );
      } else if (!isValidIndianMobile(sanitized)) {
        setPhoneError(
          lang === 'te' 
            ? 'సరైన భారతీయ మొబైల్ నంబరు నమోదు చేయండి (6, 7, 8, 9 తో ప్రారంభం కావాలి)' 
            : 'Number must start with 6, 7, 8, or 9'
        );
      } else {
        setPhoneError('');
      }
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppUrl = (leadData = formData) => {
    const commentSection = leadData.comment?.trim()
      ? `💬 *Message/Query:* ${leadData.comment.trim()}\n`
      : '';

    const text = encodeURIComponent(
      `🙏 *Namaste Siva Kaveri Chits, Eluru*\n\n` +
      `I am interested in enrolling in a government-registered chit scheme.\n\n` +
      `📌 *Chosen Scheme:* ${currentSchemeObj.name} (${currentSchemeObj.formattedValue} - ${currentSchemeObj.tenure} Months)\n` +
      `👤 *Full Name:* ${leadData.name.trim() || 'Interested Member'}\n` +
      `📞 *Mobile Number:* +91 ${leadData.phone}\n` +
      `📍 *Location:* ${leadData.location}\n` +
      `🗣️ *Language:* ${leadData.language}\n` +
      commentSection +
      `\n✅ *Note:* I understand that enrollment & subscriptions are strictly in-person / direct Bank-to-Bank.`
    );
    return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
  };

  // Lead Storage Backup in localStorage
  const saveLeadToLocalStorage = (leadPayload) => {
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existingList = existingRaw ? JSON.parse(existingRaw) : [];
      
      const updatedList = [leadPayload, ...existingList].slice(0, 100); // Keep last 100 leads
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.warn('Could not save lead to localStorage:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameTouched(true);
    setPhoneTouched(true);

    const trimmedName = formData.name.trim();
    const sanitizedPhone = sanitizeIndianPhoneNumber(formData.phone);

    let hasError = false;

    if (!trimmedName || trimmedName.length < 2) {
      setNameError(lang === 'te' ? 'దయచేసి మీ పూర్తి పేరును నమోదు చేయండి' : 'Please enter your full name (at least 2 characters)');
      hasError = true;
    }

    if (!isValidIndianMobile(sanitizedPhone)) {
      setPhoneError(
        lang === 'te' 
          ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబరును నమోదు చేయండి (6-9 తో ప్రారంభం కావాలి)' 
          : 'Please enter a valid 10-digit Indian mobile number (starts with 6-9)'
      );
      hasError = true;
    }

    if (hasError) return;

    // Build lead payload
    const leadId = `SKC-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const leadPayload = {
      leadId,
      name: trimmedName,
      phone: sanitizedPhone,
      location: formData.location,
      schemeId: currentSchemeObj.id,
      schemeName: currentSchemeObj.name,
      schemeValue: currentSchemeObj.formattedValue,
      schemeTenure: currentSchemeObj.tenure,
      monthlyInstallment: currentSchemeObj.formattedMonthly,
      language: formData.language,
      comment: formData.comment.trim(),
      timestamp: now.toISOString(),
      formattedTime: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: 'web_consultation_form',
      status: 'saved_locally',
    };

    // Save backup to localStorage
    saveLeadToLocalStorage(leadPayload);
    setSubmittedLead(leadPayload);

    // Particle celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#E6C665', '#C59B27', '#071A36', '#FFFFFF']
      });
    } catch (err) {
      // ignore
    }

    // Direct WhatsApp redirect with popup blocker consideration
    const waUrl = generateWhatsAppUrl(leadPayload);
    const newWindow = window.open(waUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Popup was blocked, user can click the button on the success card
    }
  };

  const handleCopySummary = () => {
    if (!submittedLead) return;
    const summaryText = 
      `Siva Kaveri Chits - Consultation Booking\n` +
      `Reference: ${submittedLead.leadId}\n` +
      `Name: ${submittedLead.name}\n` +
      `Phone: +91 ${submittedLead.phone}\n` +
      `Scheme: ${submittedLead.schemeName} (${submittedLead.schemeValue})\n` +
      `Branch / Area: ${submittedLead.location}\n` +
      `Time: ${submittedLead.formattedTime}`;
    
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleResetForm = () => {
    setSubmittedLead(null);
    setPhoneTouched(false);
    setNameTouched(false);
    setPhoneError('');
    setNameError('');
    setFormData({
      name: '',
      phone: '',
      location: 'Eluru',
      schemeId: selectedScheme ? selectedScheme.id : CHIT_SCHEMES[1].id,
      language: 'Telugu',
      comment: '',
    });
  };

  const isPhoneValid = isValidIndianMobile(formData.phone);

  return (
    <section id="enquiry" className="relative py-24 bg-white dark:bg-navy-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>{lang === 'te' ? 'సంప్రదించండి' : 'Direct Enquiry & Office Visit'}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            {lang === 'te' ? (
              <><span className="metallic-gold-text">మాతో</span> <span className="text-navy dark:text-white">సంప్రదించండి</span></>
            ) : (
              <><span className="metallic-gold-text">Schedule</span> <span className="text-navy dark:text-white">Consultation</span></>
            )}
          </h2>
          
          <p className="mt-3 text-xs sm:text-sm text-charcoal-light dark:text-white/80 font-body">
            {lang === 'te'
              ? 'చిట్ ప్లాన్ల వివరాలు, ఆఫీస్ అపాయింట్‌మెంట్ లేదా ఏజెంట్ సంప్రదింపుల కొరకు మీ వివరాలను నమోదు చేయండి.'
              : 'Submit your query to connect with our branch officers. Enrollment and payments occur strictly in-person or via direct Bank-to-Bank transfer.'}
          </p>
        </div>

        {/* 50/50 Split Grid in Clean White */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Lead Capture Form (6 cols) */}
          <div className="lg:col-span-6">
            <TiltCard maxTilt={6} className="bg-white dark:bg-navy-dark p-6 sm:p-8 rounded-3xl border-2 border-surface-border dark:border-gold/40 shadow-3d-card">
              
              <div className="flex items-center justify-between border-b border-surface-border dark:border-gold/20 pb-4 mb-5">
                <div>
                  <h3 className="font-display font-black text-lg text-navy dark:text-white">
                    {lang === 'te' ? 'ఉచిత చిట్ సంప్రదింపు ఫారమ్' : 'Instant Chit Consultation'}
                  </h3>
                  <p className="text-xs font-mono text-gold-dark dark:text-gold-light font-bold">
                    Official Branch Desk • Direct Officer Response
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                  Active Desk
                </span>
              </div>

              {/* In-Person & Bank-to-Bank Verification Notice */}
              <div className="mb-5 p-3.5 rounded-xl bg-surface-subtle dark:bg-navy-deep border border-surface-border dark:border-gold/25 flex items-start gap-2.5 text-xs text-charcoal-light dark:text-white/85 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy dark:text-gold-light font-mono text-[11px] uppercase tracking-wider">
                    {lang === 'te' ? '100% పారదర్శక బ్యాంకింగ్ విధానం' : 'Strict In-Person & Bank-to-Bank Protocol'}
                  </p>
                  <p className="text-[11px] mt-0.5">
                    {lang === 'te'
                      ? 'ఈ వెబ్‌సైట్ ద్వారా ఎటువంటి ఆన్‌లైన్ చెల్లింపులు తీసుకోబడవు. మా అధికారి మీతో మాట్లాడి కార్యాలయ సందర్శన లేదా బ్యాంక్ ఖాతా వివరాలను అందజేస్తారు.'
                      : 'Zero payments accepted on this website. Our officer will guide you through in-person office verification and verified Bank-to-Bank payment channels.'}
                  </p>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SUCCESS STATE WITH LEAD REFERENCE & POPUP FALLBACK */}
              {/* ========================================================================= */}
              {submittedLead ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-navy text-white text-center space-y-5 border border-gold/40 shadow-inner">
                  <div className="w-14 h-14 rounded-full bg-gold-gradient text-navy flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-navy" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light border border-gold/30 font-mono text-[11px] font-bold mb-2">
                      <span>Ref #{submittedLead.leadId}</span>
                      <span>•</span>
                      <span>Saved Securely</span>
                    </div>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                      Inquiry Logged Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      Your consultation details for <strong>{submittedLead.schemeName} ({submittedLead.schemeValue})</strong> have been securely recorded.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-xl bg-navy-dark/90 border border-white/10 text-left space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/70">
                      <span>Name:</span>
                      <span className="font-bold text-white">{submittedLead.name}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Mobile:</span>
                      <span className="font-bold text-gold-light">+91 {submittedLead.phone}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Area / Branch:</span>
                      <span className="text-white">{submittedLead.location}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Chit Plan:</span>
                      <span className="text-emerald-400 font-bold">{submittedLead.schemeValue} ({submittedLead.schemeTenure} Mo)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppUrl(submittedLead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow hover:scale-102 transition-transform"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue to WhatsApp Desk</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                    >
                      {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gold-light" />}
                      <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/60">
                      Need another plan?
                    </span>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs font-mono text-gold-light hover:underline font-bold"
                    >
                      + Submit New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* HARDENED FORM WITH REAL-TIME VALIDATION & ACCESSIBLE LABELS */
                /* ========================================================================= */
                <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
                  
                  {/* Scheme Dropdown */}
                  <div>
                    <label 
                      htmlFor="enquiry-schemeId" 
                      className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5"
                    >
                      Selected Chit Scheme <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="enquiry-schemeId"
                      name="schemeId"
                      value={formData.schemeId}
                      onChange={handleFieldChange}
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-navy dark:focus:border-gold"
                    >
                      {CHIT_SCHEMES.map((scheme) => (
                        <option key={scheme.id} value={scheme.id}>
                          {scheme.formattedValue} — {scheme.name} ({scheme.tenure} Mo @ {scheme.formattedMonthly}/mo)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name Input */}
                    <div>
                      <label 
                        htmlFor="enquiry-name" 
                        className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5"
                      >
                        Your Full Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!nameError}
                        aria-describedby={nameError ? 'enquiry-name-error' : undefined}
                        placeholder="e.g. Ramesh Varma"
                        value={formData.name}
                        onChange={handleNameChange}
                        onBlur={() => setNameTouched(true)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                          nameError 
                            ? 'border-red-500 dark:border-red-400 focus:border-red-600' 
                            : 'border-surface-border focus:border-navy dark:focus:border-gold'
                        }`}
                      />
                      {nameError && (
                        <p id="enquiry-name-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                          <span>⚠️ {nameError}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Input with Strict Indian Format Validation */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label 
                          htmlFor="enquiry-phone" 
                          className="text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider"
                        >
                          10-Digit Mobile <span className="text-amber-500">*</span>
                        </label>
                        {isPhoneValid && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Valid Indian Number
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-muted dark:text-white/50 text-xs font-mono font-bold">
                          +91
                        </div>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          name="phone"
                          required
                          autoComplete="tel"
                          inputMode="numeric"
                          maxLength={10}
                          aria-required="true"
                          aria-invalid={!!phoneError}
                          aria-describedby={phoneError ? 'enquiry-phone-error' : undefined}
                          placeholder="99299 22469"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onBlur={() => setPhoneTouched(true)}
                          className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm font-mono tracking-wider focus:outline-none transition-colors ${
                            phoneError 
                              ? 'border-red-500 dark:border-red-400 focus:border-red-600' 
                              : isPhoneValid
                              ? 'border-emerald-500 dark:border-emerald-400 focus:border-emerald-600'
                              : 'border-surface-border focus:border-navy dark:focus:border-gold'
                          }`}
                        />
                      </div>

                      {phoneError ? (
                        <p id="enquiry-phone-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                          <span>⚠️ {phoneError}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] font-mono text-charcoal-muted dark:text-white/50 mt-1">
                          Starts with 6, 7, 8, or 9 (Direct SMS/Call)
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Location & Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="enquiry-location" 
                        className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5"
                      >
                        Preferred Town / Area
                      </label>
                      <select
                        id="enquiry-location"
                        name="location"
                        value={formData.location}
                        onChange={handleFieldChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy dark:focus:border-gold"
                      >
                        <option value="Eluru">Eluru (ఏలూరు - HQ)</option>
                        <option value="Chintalapudi">Chintalapudi (చింతలపూడి)</option>
                        <option value="Sathupalli">Sathupalli (సత్తుపల్లి)</option>
                        <option value="Narayanapuram">Narayanapuram (నారాయణపురం)</option>
                        <option value="Tadepalligudem">Tadepalligudem (తాడేపల్లిగూడెం)</option>
                        <option value="Bhimavaram">Bhimavaram (భీమవరం)</option>
                        <option value="Jangareddygudem">Jangareddygudem (జంగారెడ్డిగూడెం)</option>
                        <option value="Tanuku">Tanuku (తణుకు)</option>
                        <option value="Other WG Location">Other West Godavari Location</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="enquiry-language" 
                        className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5"
                      >
                        Consultation Language
                      </label>
                      <select
                        id="enquiry-language"
                        name="language"
                        value={formData.language}
                        onChange={handleFieldChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy dark:focus:border-gold"
                      >
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                  </div>

                  {/* Comment / Message Box */}
                  <div>
                    <label 
                      htmlFor="enquiry-comment" 
                      className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5"
                    >
                      {lang === 'te' ? 'మీ ప్రశ్న లేదా కోరుకున్న సమయం (ఐచ్ఛికం)' : 'Specific Queries or Timing (Optional)'}
                    </label>
                    <textarea
                      id="enquiry-comment"
                      name="comment"
                      rows="3"
                      placeholder={lang === 'te' ? 'మీ చిట్ ప్రణాళిక, సందేహాలు లేదా సంప్రదించవలసిన సమయం గురించి రాయండి...' : 'Enter any specific questions, required chit amount, or preferred consultation timing...'}
                      value={formData.comment}
                      onChange={handleFieldChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy dark:focus:border-gold resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl navy-primary-btn font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-101 transition-transform"
                    >
                      <MessageSquare className="w-4 h-4 text-gold-light" />
                      <span>Send Inquiry to Official Desk</span>
                      <Send className="w-4 h-4 text-gold-light" />
                    </button>

                    <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-charcoal-muted dark:text-white/60 font-mono">
                      <button
                        type="button"
                        onClick={() => onOpenLegal && onOpenLegal('terms')}
                        className="hover:text-navy dark:hover:text-gold-light underline flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Chit Byelaws</span>
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenLegal && onOpenLegal('privacy')}
                        className="hover:text-navy dark:hover:text-gold-light underline flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Privacy Policy</span>
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenLegal && onOpenLegal('no-payment')}
                        className="hover:text-navy dark:hover:text-gold-light underline flex items-center gap-1 text-amber-600 dark:text-amber-300 font-bold"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>No Web Payments</span>
                      </button>
                    </div>
                  </div>

                </form>
              )}

            </TiltCard>
          </div>

          {/* Right: Map (ABOVE) & Branch Info (BELOW) (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Embedded Google Map (ABOVE) */}
            <div className="rounded-3xl border-2 border-surface-border dark:border-gold/40 overflow-hidden shadow-3d-card bg-surface-muted h-[280px] relative">
              <iframe
                title="Siva Kaveri Chits Eluru Branch Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.669866164998!2d81.095!3d16.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361cf!2sEluru%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Registered Headquarters Info (BELOW THE MAP) */}
            <TiltCard maxTilt={6} className="p-6 rounded-3xl bg-white dark:bg-navy-dark border border-surface-border dark:border-gold/30 shadow-3d-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-subtle dark:bg-navy-deep text-navy dark:text-gold-light flex items-center justify-center shadow-sm border border-surface-border dark:border-gold/30 shrink-0">
                  <Building className="w-6 h-6 text-navy dark:text-gold-light" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg text-navy dark:text-white">
                    Registered Headquarters (Eluru)
                  </h3>
                  <p className="text-xs font-mono text-gold-dark dark:text-gold-light font-bold">
                    D.No. 28-8-25/1, Narasimharao Pet, Eluru - 534006
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-charcoal-light dark:text-white/80 pt-2 border-t border-surface-border dark:border-gold/15">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-navy dark:text-gold-light shrink-0 mt-0.5" />
                  <p>{BRAND.address}</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-navy dark:text-gold-light shrink-0" />
                  <span>
                    Call: <a href={`tel:${BRAND.phone}`} className="font-bold text-navy dark:text-gold-light">{BRAND.phoneDisplay}</a> / {BRAND.landline}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-navy dark:text-gold-light shrink-0 mt-0.5" />
                  <p>{BRAND.officeHours}</p>
                </div>
              </div>
            </TiltCard>

          </div>

        </div>

      </div>
    </section>
  );
}


