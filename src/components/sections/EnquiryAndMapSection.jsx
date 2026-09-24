import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, MapPin, Clock, ShieldCheck, CheckCircle2, Building, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND, CHIT_SCHEMES } from '../../constants/tokens';
import TiltCard from '../3d/TiltCard';

export default function EnquiryAndMapSection({ lang, selectedScheme }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Eluru',
    schemeId: selectedScheme ? selectedScheme.id : CHIT_SCHEMES[1].id,
    language: 'Telugu',
    comment: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedScheme) {
      setFormData((prev) => ({
        ...prev,
        schemeId: selectedScheme.id,
      }));
    }
  }, [selectedScheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const currentSchemeObj = CHIT_SCHEMES.find((s) => s.id === formData.schemeId) || CHIT_SCHEMES[0];

  const generateWhatsAppUrl = () => {
    const commentSection = formData.comment?.trim()
      ? `💬 *Message/Comment:* ${formData.comment.trim()}\n`
      : '';

    const text = encodeURIComponent(
      `🙏 *Namaste Siva Kaveri Chits, Eluru*\n\n` +
      `I am interested in joining a government-registered chit fund scheme.\n\n` +
      `📌 *Scheme Chosen:* ${currentSchemeObj.name} (${currentSchemeObj.formattedValue} - ${currentSchemeObj.tenure} Months)\n` +
      `👤 *My Name:* ${formData.name || 'Interested Member'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not Provided'}\n` +
      `📍 *Location:* ${formData.location}\n` +
      `🗣️ *Preferred Language:* ${formData.language}\n` +
      commentSection +
      `\nPlease provide more details on the upcoming group launch and enrollment procedure.`
    );
    return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

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

    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <section id="enquiry" className="relative py-24 bg-white dark:bg-navy-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle dark:bg-navy-dark border border-surface-border dark:border-gold/30 text-xs font-mono font-bold text-navy dark:text-gold-light uppercase tracking-wider shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>{lang === 'te' ? 'సంప్రదించండి' : 'Direct Enquiry'}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            {lang === 'te' ? (
              <><span className="metallic-gold-text">మాతో</span> <span className="text-navy dark:text-white">సంప్రదించండి</span></>
            ) : (
              <><span className="metallic-gold-text">Get In</span> <span className="text-navy dark:text-white">Touch</span></>
            )}
          </h2>
        </div>

        {/* 50/50 Split Grid in Clean White */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Lead Capture Form (6 cols) */}
          <div className="lg:col-span-6">
            <TiltCard maxTilt={6} className="bg-white dark:bg-navy-dark p-6 sm:p-8 rounded-3xl border-2 border-surface-border dark:border-gold/40 shadow-3d-card">
              
              <div className="flex items-center justify-between border-b border-surface-border dark:border-gold/20 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-black text-lg text-navy dark:text-white">
                    Instant Chit Consultation
                  </h3>
                  <p className="text-xs font-mono text-gold-dark dark:text-gold-light font-bold">
                    WhatsApp Connected • Direct Officer Response
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                  Active Desk
                </span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-navy text-white text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-gradient text-navy flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-xl text-gold-light">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80">
                    We have redirected your details ({currentSchemeObj.name} - {currentSchemeObj.formattedValue}) to our registered WhatsApp desk.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {/* Scheme Dropdown */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                      Selected Chit Scheme *
                    </label>
                    <select
                      name="schemeId"
                      value={formData.schemeId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-navy"
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
                    <div>
                      <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Ramesh Varma"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 99299 22469"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-navy"
                      />
                    </div>
                  </div>

                  {/* Location & Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                        Location / Town
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy"
                      >
                        <option value="Eluru">Eluru (ఏలూరు)</option>
                        <option value="Tadepalligudem">Tadepalligudem (తాడేపల్లిగూడెం)</option>
                        <option value="Bhimavaram">Bhimavaram (భీమవరం)</option>
                        <option value="Jangareddygudem">Jangareddygudem (జంగారెడ్డిగూడెం)</option>
                        <option value="Tanuku">Tanuku (తణుకు)</option>
                        <option value="Other WG Location">Other West Godavari Location</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                        Language
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy"
                      >
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                  </div>

                  {/* Comment / Message Box */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-muted dark:text-white/70 uppercase tracking-wider mb-1.5">
                      {lang === 'te' ? 'మీ సందేశం / ప్రశ్న (ఐచ్ఛికం)' : 'Your Comments / Query (Optional)'}
                    </label>
                    <textarea
                      name="comment"
                      rows="3"
                      placeholder={lang === 'te' ? 'మీ చిట్ ప్రణాళిక, సందేహాలు లేదా సంప్రదించవలసిన సమయం గురించి రాయండి...' : 'Enter any specific questions, required chit amount, or preferred consultation timing...'}
                      value={formData.comment}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-subtle dark:bg-navy-deep text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-navy resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl navy-primary-btn font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4 text-gold-light" />
                      <span>Send Inquiry on WhatsApp</span>
                      <Send className="w-4 h-4 text-gold-light" />
                    </button>
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
