import React, { useState, useEffect } from 'react';
import MaximumBackground from './components/backgrounds/MaximumBackground';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BranchCallDialer from './components/common/BranchCallDialer';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';
import HeroSection from './components/sections/HeroSection';
import BrandStory from './components/sections/BrandStory';
import ChitPlansSection from './components/sections/ChitPlansSection';
import ChitCalculator from './components/sections/ChitCalculator';
import HowChitsWorkSection from './components/sections/HowChitsWorkSection';
import TrustTransparencySection from './components/sections/TrustTransparencySection';
import PeopleLocalPresenceSection from './components/sections/PeopleLocalPresenceSection';
import EnquiryAndMapSection from './components/sections/EnquiryAndMapSection';
import FAQSection from './components/sections/FAQSection';
import { CHIT_SCHEMES } from './constants/tokens';

export default function App() {
  // Theme State: 'crisp-white' (default: Dominant White Background + Navy Primary + Gold Accents)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skc_theme') || 'crisp-white';
  });

  // Language State: 'en' (default) or 'te'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('skc_lang') || 'en';
  });

  // Selected Chit Scheme State
  const [selectedScheme, setSelectedScheme] = useState(CHIT_SCHEMES[1]); // ₹5L Small Business Growth Chit

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skc_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('skc_lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'crisp-white' ? 'dark-navy' : 'crisp-white'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPlans = () => {
    const plansEl = document.getElementById('plans');
    if (plansEl) {
      plansEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToEnquiry = () => {
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col transition-colors duration-300 bg-white text-navy selection:bg-gold selection:text-navy">
      {/* 3D Illuminated White Mesh Grid */}
      <MaximumBackground />

      {/* Modern Floating Glassmorphic Pill Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
      />

      {/* Main Flow */}
      <main className="flex-grow z-10">
        {/* 01. 3D Hero Section in Luminous White */}
        <HeroSection
          lang={lang}
          onExplorePlans={handleScrollToPlans}
          onOpenEnquiry={handleScrollToEnquiry}
          onSelectScheme={handleSelectScheme}
        />

        {/* 02. 3D Tilt Chit Schemes Portfolio */}
        <ChitPlansSection
          lang={lang}
          onSelectScheme={handleSelectScheme}
        />

        {/* 03. Interactive 3D Modeler & Dividend Simulator */}
        <ChitCalculator
          lang={lang}
          onSelectSchemeForEnquiry={handleSelectScheme}
        />

        {/* 04. 5-Stage Chit Lifecycle Timeline */}
        <HowChitsWorkSection lang={lang} />

        {/* 05. Institutional Trust & Bank Lien Disclosures */}
        <TrustTransparencySection lang={lang} />

        {/* 06. Institutional Brand Legacy & MD Profile */}
        <BrandStory lang={lang} />

        {/* 07. Community Proof & Verified Reviews */}
        <PeopleLocalPresenceSection lang={lang} />

        {/* 08. Categorized FAQs */}
        <FAQSection lang={lang} />

        {/* 09. Consultation Studio & Branch Google Maps */}
        <EnquiryAndMapSection
          lang={lang}
          selectedScheme={selectedScheme}
        />
      </main>

      {/* Statutory Legal Footer in Deep Navy */}
      <Footer lang={lang} />

      {/* Floating Action Cluster */}
      <WhatsAppFloatingButton lang={lang} />
      <BranchCallDialer lang={lang} />
    </div>
  );
}
