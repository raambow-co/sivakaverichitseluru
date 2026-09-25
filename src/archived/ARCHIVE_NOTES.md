# Archived Components

This directory contains legacy/experimental components that were superseded during the redesign and audit:

### Sections (`src/archived/sections/`)
1. **`AuctionExperienceSection.jsx`**: Early mock bidding console concept, superseded by the live Chit Calculator and Section 20 legal transparency flows.
2. **`StartJourneySection.jsx`**: Early static CTA card, superseded by the comprehensive Consultation Studio & Map section (`EnquiryAndMapSection.jsx`).
3. **`WhyChooseUsSection.jsx`**: Redundant feature cards, merged into `TrustTransparencySection.jsx` and `BrandStory.jsx`.

### 3D & Visuals (`src/archived/3d/`)
1. **`InteractiveAuctionConsole.jsx`**: Mock auction slider tool superseded by the accurate `ChitCalculator.jsx`.
2. **`GrowthVisualizer3D.jsx`**: Legacy canvas visualizer superseded by `SchemeVisual3D.jsx` and `Hero3DGoldCoins.jsx`.

### Common UI Components (`src/archived/common/`)
1. **`GoldCoinsCanvas.jsx`**: Early 2D HTML5 canvas coin particles, replaced by the physics-based 3D CSS tumbling system (`Hero3DGoldCoins.jsx`).
2. **`GoldCoinsOverlay.jsx`**: Static gold coin overlay, replaced by interactive 3D coins.
3. **`HeritageFrame.jsx`**: Heavy border wrapper replaced by modern Tailwind glassmorphism borders (`border-gold/40`).
4. **`OrnamentDivider.jsx`**: Traditional SVG flourish divider, replaced by modern minimalist gradient dividers.
5. **`SealBadge.jsx`**: Standalone seal badge replaced by dynamic regulatory trust badges in `Header.jsx` and `LegalComplianceModal.jsx`.
