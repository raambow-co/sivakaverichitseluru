export const BRAND = {
  name: "Siva Kaveri Chits",
  legalName: "Shiva Kaveri Chits Private Limited (శివ కావేరి చిట్స్)",
  shortName: "SKC Chits",
  teluguName: "శివ కావేరి చిట్స్ RBT",
  tagline: "Telugu Cultural Heritage × Modern Institutional Trust",
  teluguTagline: "విశ్వాసానికి చిరునామా • శతాబ్దాల తెలుగు సంస్కృతి • సురక్షిత పొదుపు",
  establishedYear: 1998,
  yearsOfTrust: "26+",
  act: "Chit Funds Act, 1982 (Central Act No. 40 of 1982)",
  apRules: "Andhra Pradesh Chit Funds Rules, 2008",
  registrationNo: "AP/ELR/CFT/1998/4429",
  cin: "U65992AP1998PTC029811",
  pan: "AABCS1298K",
  headquarters: "Eluru, West Godavari District, Andhra Pradesh",
  address: "D.No. 28-8-25/1, Eluru Properties Road, Opp. SR Studio, Vuppu Rama Rao Area, Narasimharao Pet, Eluru, Andhra Pradesh - 534006",
  phone: "+91 99299 22469",
  phoneDisplay: "+91 99299 22469",
  landline: "08812 - 222229",
  whatsappNumber: "919929922469",
  email: "contact@sivakaverichits.com",
  officeHours: "Monday to Saturday: 9:30 AM – 7:30 PM | Sunday: 10:00 AM – 1:30 PM (Auctions)",
  stats: [
    { label: "Years of Trust", teluguLabel: "విశ్వసనీయ ప్రస్థానం", value: "26+", suffix: "Years" },
    { label: "Active Subscribers", teluguLabel: "సంతృప్త ఖాతాదారులు", value: "15,000+", suffix: "Families" },
    { label: "Auction Payout Delay", teluguLabel: "వేలం చెల్లింపు జాప్యం", value: "₹0", suffix: "Zero Delay" },
    { label: "Govt. Statutory Compliance", teluguLabel: "ప్రభుత్వ చట్టబద్ధత", value: "100%", suffix: "Chit Act 1982" },
  ]
};

export const CHIT_SCHEMES = [
  {
    id: "skc-1l",
    name: "Gold Savings & Emergency Chit",
    teluguName: "స్వర్ణ గోల్డ్ సేవింగ్స్ & అత్యవసర చిట్",
    value: 100000,
    formattedValue: "₹1,00,000",
    tenure: 25,
    tenureUnit: "Months",
    monthlyInstallment: 4000,
    formattedMonthly: "₹4,000",
    estimatedDividendRange: "₹400 - ₹1,000",
    averageEffectiveMonthly: "₹3,300",
    maxBidLimit: "40%",
    maxPrizeMoney: "₹60,000 - ₹95,000",
    foremanCommission: "5%",
    category: "gold",
    image3d: "/assets/schemes/gold_pot_3d.png",
    visualTitle: "3D Swarna Kalash & Pure Gold",
    featureBadge: "24K Gold Accumulation",
    subBadge: "Emergency Liquidity",
    targetAudience: "Jewellery, Festival Gold & Emergency Fund",
    teluguTarget: "బంగారం కొనుగోలు, పండుగ ఆభరణాలు & కుటుంబ అత్యవసర నిధి",
    badge: "Gold & Emergency Saver",
    popular: false,
    description: "Disciplined savings scheme designed for festival gold jewellery purchases, annual school fees, and dependable household emergency security.",
    benefits: [
      "Accessible monthly installment of just ₹4,000",
      "25-month fast-track wealth & gold accumulation",
      "Up to 20% savings via regular dividend distributions",
      "Instant emergency liquidity upon winning auction"
    ]
  },
  {
    id: "skc-5l",
    name: "Small Business Growth Chit",
    teluguName: "చిరు వ్యాపార & MSME గ్రోత్ చిట్",
    value: 500000,
    formattedValue: "₹5,00,000",
    tenure: 40,
    tenureUnit: "Months",
    monthlyInstallment: 12500,
    formattedMonthly: "₹12,500",
    estimatedDividendRange: "₹1,500 - ₹3,500",
    averageEffectiveMonthly: "₹10,300",
    maxBidLimit: "40%",
    maxPrizeMoney: "₹3,00,000 - ₹4,75,000",
    foremanCommission: "5%",
    category: "business",
    image3d: "/assets/schemes/business_store_3d.png",
    visualTitle: "3D MSME Trade Hub & Store",
    featureBadge: "+24% ROI Growth",
    subBadge: "24-48h Working Capital",
    targetAudience: "Retail Inventory, MSME Working Capital & Shop Setup",
    teluguTarget: "రిటైల్ వ్యాపారం, ఇన్వెంటరీ స్టాకింగ్ & వర్కింగ్ క్యాపిటల్",
    badge: "Most Popular for MSME",
    popular: true,
    description: "Tailored for West Godavari retail merchants, trade vendors, and entrepreneurs seeking instant working capital without heavy collateral or bank delays.",
    benefits: [
      "Disbursal within 24-48 hours after auction win",
      "Zero bank collateral registration charges or hidden fees",
      "Substantial monthly dividend deductions for non-prized savers",
      "Tax-efficient working capital financing for business accounting"
    ]
  },
  {
    id: "skc-10l",
    name: "Higher Education & Career Chit",
    teluguName: "ఉన్నత విద్య & ఓవర్‌సీస్ కెరీర్ చిట్",
    value: 1000000,
    formattedValue: "₹10,00,000",
    tenure: 40,
    tenureUnit: "Months",
    monthlyInstallment: 25000,
    formattedMonthly: "₹25,000",
    estimatedDividendRange: "₹3,000 - ₹7,000",
    averageEffectiveMonthly: "₹20,500",
    maxBidLimit: "40%",
    maxPrizeMoney: "₹6,00,000 - ₹9,50,000",
    foremanCommission: "5%",
    category: "education",
    image3d: "/assets/schemes/education_books_3d.png",
    visualTitle: "3D Academic Degrees & Career",
    featureBadge: "University Admissions Ready",
    subBadge: "Zero Student Loan Debt",
    targetAudience: "Overseas University, Medical/Engineering Degrees & Career",
    teluguTarget: "విదేశీ విద్య, మెడికల్/ఇంజనీరింగ్ ఫీజులు & గ్లోబల్ కెరీర్",
    badge: "Academic & Career Flagship",
    popular: true,
    description: "Engineered for visionary parents planning children's university admissions, engineering degrees, and overseas postgraduate tuition without high-interest student loans.",
    benefits: [
      "Instant liquidity of up to ₹9.5 Lakhs right when semester fees are due",
      "Save lakhs compared to predatory education loan compound interest",
      "Predictable 40-month planned financing with dividend support",
      "Direct RTGS transfer to verified institutional accounts"
    ]
  },
  {
    id: "skc-20l",
    name: "Dream Car & Luxury Asset Chit",
    teluguName: "డ్రీమ్ కార్ & లగ్జరీ వెహికల్ చిట్",
    value: 2000000,
    formattedValue: "₹20,00,000",
    tenure: 40,
    tenureUnit: "Months",
    monthlyInstallment: 50000,
    formattedMonthly: "₹50,000",
    estimatedDividendRange: "₹6,000 - ₹14,000",
    averageEffectiveMonthly: "₹41,000",
    maxBidLimit: "40%",
    maxPrizeMoney: "₹12,00,000 - ₹19,00,000",
    foremanCommission: "5%",
    category: "vehicle",
    image3d: "/assets/schemes/luxury_car_3d.png",
    visualTitle: "3D Luxury Sedan & Smart Key",
    featureBadge: "Clean 100% RC Ownership",
    subBadge: "Zero Bank Hypothecation",
    targetAudience: "Luxury SUV / Sedan, Property Advance & Dream Upgrades",
    teluguTarget: "కొత్త లగ్జరీ కారు కొనుగోలు, ఇంటి ఆధునికీకరణ & స్థలాల అడ్వాన్స్",
    badge: "Zero-Interest Dream Car",
    popular: false,
    description: "The premier zero-interest alternative to high-interest auto loans and hypothecation debt for driving home your dream luxury SUV or car.",
    benefits: [
      "Avoid predatory 12-16% auto loan hypothecation interest",
      "Lift up to ₹19 Lakhs lump sum when vehicle showroom delivery is ready",
      "Dividend cuts reduce your net payment by up to ₹14,000/month",
      "Full vehicle ownership without bank hypothecation liens on RC book"
    ]
  },
  {
    id: "skc-50l",
    name: "Large Business Expansion Chit",
    teluguName: "భారీ వ్యాపార విస్తరణ & ఎంటర్‌ప్రైజ్ చిట్",
    value: 5000000,
    formattedValue: "₹50,00,000",
    tenure: 50,
    tenureUnit: "Months",
    monthlyInstallment: 100000,
    formattedMonthly: "₹1,00,000",
    estimatedDividendRange: "₹12,000 - ₹30,000",
    averageEffectiveMonthly: "₹82,500",
    maxBidLimit: "40%",
    maxPrizeMoney: "₹30,00,000 - ₹47,50,000",
    foremanCommission: "5%",
    category: "enterprise",
    image3d: "/assets/schemes/large_business_3d.png",
    visualTitle: "3D Corporate Towers & BUSINESS",
    featureBadge: "Enterprise Sovereign Tier",
    subBadge: "₹47.5L Max Payout",
    targetAudience: "Commercial Machinery, Real Estate Projects & Enterprise Scaling",
    teluguTarget: "భారీ ప్రాజెక్టులు, పారిశ్రామిక యంత్రాలు & కార్పొరేట్ విస్తరణ",
    badge: "Enterprise Flagship",
    popular: true,
    description: "Our elite institutional tier for prominent entrepreneurs, real estate builders, processing mill owners, and large commercial operations requiring high-volume capital injection.",
    benefits: [
      "Access up to ₹47.5 Lakhs immediately upon winning early auction",
      "Dedicated VIP Senior Relationship Manager & priority auction lounge",
      "Section 20 statutory protection with 100% bank-deposited foreman guarantee",
      "Substantial monthly dividend gains of up to ₹30,000/month for non-prized savers"
    ]
  }
];

export const HOW_CHITS_WORK_STEPS = [
  {
    step: "01",
    title: "Enrollment & KYC",
    teluguTitle: "నమోదు & కేవైసీ ధృవీకరణ",
    summary: "Select your desired chit value and complete quick KYC with Aadhaar and PAN verification under statutory registrar guidelines.",
    teluguSummary: "మీ బడ్జెట్‌కు తగిన చిట్ ప్లాన్‌ను ఎంచుకుని, ఆధార్ మరియు పాన్ కార్డుతో చట్టబద్ధమైన నమోదు పూర్తి చేయండి.",
    icon: "UserCheck",
    keyHighlight: "100% Legal Registration"
  },
  {
    step: "02",
    title: "Monthly Subscription Pool",
    teluguTitle: "నెలవారీ పొదుపు నిధి సమీకరణ",
    summary: "All members pool their monthly subscription into a common fund on or before the auction date through UPI, NEFT, or Branch counter.",
    teluguSummary: "సభ్యులందరూ ప్రతి నెలా తమ వాయిదా మొత్తాన్ని వేలం తేదీకి ముందే నిర్ణీత నిధిలో జమ చేస్తారు.",
    icon: "Coins",
    keyHighlight: "Automated SMS & Passbook"
  },
  {
    step: "03",
    title: "Live Reverse Auction",
    teluguTitle: "పారదర్శక రివర్స్ వేలం పాట",
    summary: "Members in need of funds place open discount bids (capped legally at 40%). The highest bidder (lowest net payout) wins the prize money.",
    teluguSummary: "డబ్బు అవసరమైన సభ్యులు పారదర్శకంగా వేలం పాటలో పాల్గొంటారు (గరిష్ట వేలం పరిమితి 40%). అత్యధిక డిస్కౌంట్ వేసిన వారు విజేత.",
    icon: "Gavel",
    keyHighlight: "Live In-Person & Digital"
  },
  {
    step: "04",
    title: "Prize Disbursal in 24-48 Hrs",
    teluguTitle: "ఖాతాలోకి తక్షణ బదిలీ",
    summary: "Winning subscriber submits standard security sureties and receives direct RTGS/NEFT transfer to their bank account without arbitrary cuts.",
    teluguSummary: "వేలం గెలిచిన సభ్యునికి అవసరమైన పూచీకత్తు పరిశీలన అనంతరం 24-48 గంటల్లో నేరుగా బ్యాంకు ఖాతాలోకి నగదు జమ చేయబడుతుంది.",
    icon: "Banknote",
    keyHighlight: "Zero Hidden Deductions"
  },
  {
    step: "05",
    title: "Equal Dividend Distribution",
    teluguTitle: "సమాన డివిడెండ్ లాభాల పంపిణీ",
    summary: "The entire auction discount (minus 5% statutory foreman commission) is divided equally among all non-prized subscribers to reduce next month's installment.",
    teluguSummary: "వేలం పాటలో వచ్చిన డిస్కౌంట్ లాభం (5% ఫోర్‌మన్ కమీషన్ మినహా) సభ్యులందరికీ సమానంగా పంపిణీ చేయబడి తరువాతి వాయిదాను తగ్గిస్తుంది.",
    icon: "PieChart",
    keyHighlight: "Earn While Saving"
  }
];

export const COMPARISON_MATRIX = [
  {
    feature: "Dual Benefit (Savings + Borrowing)",
    teluguFeature: "పొదుపు మరియు అప్పు రెండూ ఒకే చోట",
    skc: "Yes (Save or Borrow at any month)",
    bankFd: "No (Savings Only; Loan requires break/penalty)",
    moneylender: "No (Expensive Debt Only)"
  },
  {
    feature: "Effective Cost of Borrowing",
    teluguFeature: "అప్పు తీసుకున్నప్పుడు అయ్యే ఖర్చు",
    skc: "Low (Subsidized by own dividends)",
    bankFd: "Moderate to High (Personal Loans 14-24%)",
    moneylender: "Exorbitant (24% to 36% compound interest)"
  },
  {
    feature: "Collateral & Mortgage Bureaucracy",
    teluguFeature: "హామీ పత్రాలు & తనఖా నిబంధనలు",
    skc: "Simple Personal / Co-subscriber Sureties",
    bankFd: "Heavy documentation, CIBIL hurdles, property deeds",
    moneylender: "Physical Gold / Blank Promissory Cheques"
  },
  {
    feature: "Returns for Non-Borrowing Savers",
    teluguFeature: "డబ్బు తీసుకోకుండా పొదుపు చేసేవారికి లాభం",
    skc: "High Dividend Yield (8% - 12% p.a.)",
    bankFd: "Fixed 6.5% - 7.2% (Subject to TDS taxation)",
    moneylender: "0% (No savings mechanism)"
  },
  {
    feature: "Legal Statutory Protection",
    teluguFeature: "ప్రభుత్వ చట్టబద్ధ రక్షణ",
    skc: "100% Protected (Chit Funds Act, 1982)",
    bankFd: "Protected (DICGC up to ₹5L)",
    moneylender: "Illegal & Unregulated (High Risk)"
  },
  {
    feature: "Community Trust & Relationship",
    teluguFeature: "స్థానిక అనుబంధం మరియు విశ్వాసం",
    skc: "26+ Years in Eluru (Personalized Service)",
    bankFd: "Impersonal corporate procedures",
    moneylender: "Aggressive recovery & social distress"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "K. Venkateswara Rao",
    teluguName: "కె. వెంకటేశ్వరరావు",
    role: "Wholesale Paddy Trader",
    location: "Tadepalligudem, WG Dist",
    scheme: "₹5,00,000 Small Business Growth Chit",
    image: "/assets/images/subscriber_1.jpg",
    rating: 5,
    yearJoined: "2012 (12 Years Member)",
    text: "During peak paddy harvesting season, bank loan approvals take weeks. Siva Kaveri Chits helped me lift auction funds within 48 hours to pay farmers on time. Their transparency in Eluru is unmatched.",
    teluguText: "వరి కోతల సమయంలో రైతులకు చెల్లింపులు చేయడానికి బ్యాంక్ రుణాలు ఆలస్యమవుతాయి. శివ కావేరి చిట్స్ ద్వారా 48 గంటల్లో నిధులు సమకూరాయి. గత 12 ఏళ్లుగా వీరి పారదర్శకతే నా వ్యాపారానికి కొండంత అండ."
  },
  {
    id: 2,
    name: "M. Lakshmi Prasanna",
    teluguName: "ఎం. లక్ష్మీ ప్రసన్న",
    role: "High School Teacher",
    location: "Narasimharao Pet, Eluru",
    scheme: "₹10,00,000 Higher Education & Career Chit",
    image: "/assets/images/subscriber_2.jpg",
    rating: 5,
    yearJoined: "2018 (6 Years Member)",
    text: "I enrolled in the Higher Education scheme for my daughter's engineering admission. Every month the dividend reduced my actual payment. I received the full prize amount exactly when university fees were due.",
    teluguText: "నా కుమార్తె ఇంజనీరింగ్ అడ్మిషన్ ఫీజుల కోసం ఉన్నత విద్య చిట్ చేరాను. ప్రతి నెలా డివిడెండ్ వల్ల తక్కువ కట్టాల్సి వచ్చింది. అనుకున్న సమయానికి ఎలాంటి ఇబ్బంది లేకుండా మొత్తం చేతికందింది."
  },
  {
    id: 3,
    name: "G. Srinivasa Reddy",
    teluguName: "జి. శ్రీనివాస రెడ్డి",
    role: "Aqua Culture Farmer & Contractor",
    location: "Bhimavaram",
    scheme: "₹50,00,000 Large Business Expansion Chit",
    image: "/assets/images/subscriber_3.jpg",
    rating: 5,
    yearJoined: "2015 (9 Years Member)",
    text: "For large scale pond maintenance, feed purchases, and cold storage setup, the 50 Lakh Expansion Chit is a boon. Siva Kaveri is officially registered and deposits the foreman guarantee in nationalized banks, giving 100% peace of mind.",
    teluguText: "ఆక్వా చెరువుల విస్తరణ మరియు కోల్డ్ స్టోరేజ్ ఏర్పాటుకు ₹50 లక్షల బిజినెస్ ఎక్స్‌పాన్షన్ చిట్ చాలా ఉపయోగపడింది. ప్రభుత్వ నిబంధనల ప్రకారం నేషనలైజ్డ్ బ్యాంకుల్లో ఫోర్‌మన్ డిపాజిట్ చేయడం వల్ల 100% నమ్మకం."
  },
  {
    id: 4,
    name: "P. Subba Rao",
    teluguName: "పి. సుబ్బారావు",
    role: "Textile Store Proprietor",
    location: "Jangareddygudem",
    scheme: "₹20,00,000 Dream Car & Luxury Asset Chit",
    image: "/assets/images/subscriber_4.jpg",
    rating: 5,
    yearJoined: "2020 (4 Years Member)",
    text: "Instead of taking a 14% bank auto loan with endless paperwork, I funded my new family vehicle through Siva Kaveri Chits. Clear passbook records and zero hidden deductions make them West Godavari's finest.",
    teluguText: "అధిక వడ్డీ బ్యాంక్ కార్ లోన్ బదులుగా శివ కావేరి చిట్స్ ద్వారా నా కొత్త కారును కొనుగోలు చేశాను. స్పష్టమైన పాస్‌బుక్, చెల్లించిన వెంటనే వాట్సాప్ రసీదులు వీరి ప్రత్యేకత."
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    title: "Sri Krishna Janmashtami Celebrations & Wealth Blessings",
    teluguTitle: "శ్రీ కృష్ణ జన్మాష్టమి శుభాకాంక్షలు & ఆర్థిక శ్రేయస్సు",
    tag: "Festival & Culture",
    date: "Aug 2024",
    likes: "1,240+",
    color: "from-amber-600 to-yellow-800",
    summary: "Celebrating Godavari cultural heritage with our Eluru branch community and honoring disciplined savers."
  },
  {
    id: "ig-2",
    title: "Financial Literacy Reel: How Reverse Chit Auctions Save You Money",
    teluguTitle: "ఆర్థిక అవగాహన: చిట్ రివర్స్ వేలం ఎలా పనిచేస్తుంది?",
    tag: "Fintech Education",
    date: "Sep 2024",
    likes: "2,890+",
    color: "from-emerald-700 to-teal-900",
    summary: "Explaining the 40% bid cap statutory safeguard and why chit fund dividends beat bank savings accounts."
  },
  {
    id: "ig-3",
    title: "Honoring West Godavari Teachers & Mentors on Guru Poornima",
    teluguTitle: "గురు పూజోత్సవం: మన మార్గదర్శకులకు సత్కారం",
    tag: "Community Connect",
    date: "Jul 2024",
    likes: "980+",
    color: "from-orange-700 to-red-950",
    summary: "Special savings milestone awards distributed to government and private school educators of West Godavari."
  }
];

export const FAQS = [
  {
    category: "Legality & Safety",
    teluguCategory: "చట్టబద్ధత & భద్రత",
    questions: [
      {
        q: "Is Siva Kaveri Chits legally registered with the Government?",
        teluguQ: "శివ కావేరి చిట్స్ ప్రభుత్వ గుర్తింపు పొందిన సంస్థేనా?",
        a: "Yes. Siva Kaveri Chits operates under the strict mandate of the Central Chit Funds Act, 1982 and the Andhra Pradesh Chit Fund Rules, 2008. Before launching any chit group, 100% of the aggregate chit value is deposited as a security guarantee in nationalized commercial banks with the Government Registrar.",
        teluguA: "అవును. శివ కావేరి చిట్స్ కేంద్ర ప్రభుత్వ చిట్ ఫండ్స్ చట్టం 1982 మరియు ఆంధ్రప్రదేశ్ చిట్ ఫండ్ నిబంధనల ప్రకారం నడుస్తుంది. ప్రతి చిట్ గ్రూప్ ప్రారంభించే ముందు మొత్తం విలువను నేషనలైజ్డ్ బ్యాంకుల్లో ప్రభుత్వ రిజిస్ట్రార్ పేరిట డిపాజిట్ చేయడం జరుగుతుంది."
      },
      {
        q: "What guarantees do subscribers have if another member defaults?",
        teluguQ: "ఏదైనా సభ్యుడు వాయిదా చెల్లించకపోతే ఇతర సభ్యుల పరిస్థితి ఏమిటి?",
        a: "As per the Chit Funds Act, the Foreman (Siva Kaveri Chits) is legally liable to bridge any non-payment. Non-prized members continue to receive their prize money and dividends without interruption or loss.",
        teluguA: "చట్ట ప్రకారం ఏ సభ్యుడైనా డీఫాల్ట్ అయితే ఆ బాధ్యతను ఫోర్‌మన్ (శివ కావేరి చిట్స్) భరిస్తుంది. ఇతర సభ్యుల చెల్లింపులకు లేదా డివిడెండ్‌లకు ఎటువంటి ఆటంకం ఉండదు."
      }
    ]
  },
  {
    category: "Auctions & Bidding",
    teluguCategory: "వేలం పాటలు & చెల్లింపులు",
    questions: [
      {
        q: "How is the auction conducted and what is the maximum bid limit?",
        teluguQ: "వేలం పాట ఎలా జరుగుతుంది? గరిష్ట వేలం పరిమితి ఎంత?",
        a: "Auctions occur monthly on designated dates at our Eluru office (and via verified online proxy). The bidding is a reverse auction where members offer a discount. By government law, the maximum bid discount is capped at 40% of the chit value to protect subscribers from predatory debt.",
        teluguA: "ప్రతి నెలా నిర్ణీత తేదీలలో ఏలూరు బ్రాంచ్‌లో పారదర్శకంగా రివర్స్ వేలం జరుగుతుంది. ప్రభుత్వ నిబంధనల ప్రకారం గరిష్ట వేలం పరిమితి 40% గా నిర్ణయించబడింది."
      },
      {
        q: "How soon is the prize money disbursed after winning the auction?",
        teluguQ: "వేలం గెలిచిన తర్వాత నగదు ఎన్ని రోజుల్లో చేతికందుతుంది?",
        a: "Once standard KYC and adequate co-subscriber sureties (salary slips, property tax receipts, or bank guarantees) are submitted, the prize amount is directly transferred via RTGS/NEFT within 24 to 48 hours.",
        teluguA: "అవసరమైన పూచీకత్తు పత్రాలు (ఆదాయ ఆధారాలు / స్థానిక పూచీకత్తు) సమర్పించిన 24 నుండి 48 గంటల్లో నేరుగా బ్యాంకు ఖాతాలోకి RTGS/NEFT ద్వారా నగదు జమ అవుతుంది."
      }
    ]
  },
  {
    category: "Dividends & Returns",
    teluguCategory: "డివిడెండ్ లాభాలు & పొదుపు",
    questions: [
      {
        q: "How do dividends reduce my monthly installment?",
        teluguQ: "డివిడెండ్ వల్ల నా నెలవారీ వాయిదా ఎలా తగ్గుతుంది?",
        a: "The discount offered by the auction winner (minus 5% foreman commission) is divided equally among all non-prized members. For example, in a ₹5,00,000 chit, if the discount is ₹1,00,000, each member gets ~₹2,375 dividend, reducing that month's payment from ₹12,500 down to ₹10,125.",
        teluguA: "వేలం డిస్కౌంట్ మొత్తాన్ని (5% కమీషన్ పోను) సభ్యులందరికీ సమానంగా పంచుతారు. ఉదాహరణకు ₹5 లక్షల చిట్‌లో డిస్కౌంట్ వస్తే, మీ వాయిదా ₹12,500 నుండి తగ్గి దాదాపు ₹10,125 మాత్రమే కట్టవలసి ఉంటుంది."
      },
      {
        q: "Can I participate in multiple chit schemes simultaneously?",
        teluguQ: "ఒకేసారి ఒకటి కంటే ఎక్కువ చిట్ ప్లాన్లలో చేరవచ్చా?",
        a: "Yes! Many families maintain one small starter chit for emergency liquidity and a larger business/gold chit for long-term wealth accumulation.",
        teluguA: "తప్పకుండా! అత్యవసరాల కోసం ఒక చిన్న చిట్, భవిష్యత్ అవసరాల లేదా వ్యాపారం కోసం మరొక పెద్ద చిట్ ప్లాన్లలో ఒకేసారి చేరవచ్చు."
      }
    ]
  }
];
