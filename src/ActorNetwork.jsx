import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const ActorNetwork = () => {
  const [selectedActor, setSelectedActor] = useState(null);
  const [hoveredActor, setHoveredActor] = useState(null);
  const [showFlows, setShowFlows] = useState({ authority: true, value: true, data: true });
  const [expandedSection, setExpandedSection] = useState(null);

  const actors = {
    human: [
      { 
        id: 'government', 
        name: 'Government', 
        x: 400, 
        y: 40, 
        color: '#3b82f6',
        role: 'Policy Steering & Digital Mandate',
        desc: 'Ultimate policy authority through Digital India initiative, DBT schemes, and FASTag. Functions as "Second-Order Demand Aggregator" by mandating UPI for public benefit distribution.',
        power: 'Co-owns NPCI via RBI, sets strategic vision, guarantees critical early transaction volumes through government schemes',
        connections: ['Direct oversight of RBI', 'Policy guidance to NPCI', 'Coordinates with state governments for UPI acceptance'],
        keyInsight: 'Government utilization of UPI as essential national infrastructure creates virtuous cycle of adoption and trust'
      },
      { 
        id: 'rbi', 
        name: 'RBI & Regulators', 
        x: 200, 
        y: 130, 
        color: '#3b82f6',
        role: 'Licensing, Oversight & Systemic Risk Management',
        desc: 'Core statutory authority under Payment and Settlement Systems Act, 2007. Mandates data localization, security standards (two-factor auth), and ISO 20022 migration.',
        power: 'Issues licenses, nominates NPCI board members, enforces compliance through SAR audits, can penalize non-compliant entities',
        connections: ['Direct control over NPCI board', 'Oversees all PSP banks', 'Coordinates with SEBI and telecom regulators'],
        keyInsight: 'Leverages private banking infrastructure investment as public good to secure India\'s strategic position in global payments'
      },
      { 
        id: 'npci', 
        name: 'NPCI', 
        x: 400, 
        y: 150, 
        color: '#8b5cf6',
        role: 'Quasi-Regulatory Operator & System Owner',
        desc: 'Section 8 non-profit company (est. 2008) owned by bank consortium. Absolute rule-setting power over UPI platform. Operates switch, prescribes liability matrix, manages settlement.',
        power: 'Gatekeeper function—can delink any participant. Controls protocol evolution. NIPL subsidiary monetizes UPI IP globally while domestic entity remains public utility',
        connections: ['Central hub connecting 600+ banks and 30+ fintechs', 'Operates centralized FRM system', 'Manages BharatQR standard'],
        keyInsight: 'Strategic duality: non-profit domestic utility + commercial export arm (NIPL) for global soft power projection'
      },
      { 
        id: 'banks', 
        name: 'Banks (PSPs)', 
        x: 250, 
        y: 270, 
        color: '#3b82f6',
        role: 'Payment Service Providers & Delegated Regulators',
        desc: 'Mandatory participants connecting to NPCI switch. Maintain customer accounts, perform KYC/authentication, onboard TPAPs. Major banks (SBI, HDFC, ICICI) own NPCI.',
        power: 'Act as "Delegated Regulators" over fintech layer—must audit TPAP security. Large banks wield influence on NPCI board. Bear fraud liability per NPCI rules',
        connections: ['Direct technical link to NPCI Switch', 'Sponsor fintech apps', 'Execute AML/CFT compliance'],
        keyInsight: 'Delegation of regulatory oversight to banks mitigates systemic risk from rapid fintech deployment'
      },
      { 
        id: 'fintech', 
        name: 'Fintech (TPAPs)', 
        x: 550, 
        y: 270, 
        color: '#3b82f6',
        role: 'Application Layer & Innovation Drivers',
        desc: 'Third-Party App Providers (PhonePe, Google Pay, Paytom) build consumer interfaces. PhonePe + Google Pay control 86%+ of transaction volume, creating structural monopoly concern.',
        power: 'User engagement dominance gives bargaining power. Drive feature requests. Collect rich behavioral data. Add value-added services (BNPL, credit lines)',
  connections: ['Integrate via PSP bank APIs', 'Must comply with 30% volume cap (extended 2 years)', 'Cross-sell financial products', 'Influence media narratives via PR/advertising'],
    keyInsight: 'Paradox: open-source protocol enables concentrated duopoly at application layer, requiring continuous regulatory intervention'
      },
      { 
        id: 'merchants', 
        name: 'Merchants', 
        x: 600, 
        y: 400, 
        color: '#3b82f6',
        role: 'Digital Payment Acceptors & Adoption Catalysts',
        desc: 'From kirana shops to large retailers. Display BharatQR codes. Benefit from zero MDR and instant settlement. UPI QR PoS terminals grew 111% in H1 2024.',
        power: 'Collectively numerous—form large user base. Local merchant associations amplify adoption. Generate transaction data for analytics',
        connections: ['Accept payments via QR codes', 'Reconcile via fintech/bank apps', 'Participate in NPCI dispute resolution'],
        keyInsight: 'Adoption friction shifted from technical/economic barriers to sociological trust ("fear of being cheated", lack of awareness)'
      },
      { 
        id: 'users', 
        name: 'Citizens / Users', 
        x: 200, 
        y: 400, 
        color: '#3b82f6',
        role: 'Primary Payers/Payees & Demand Drivers',
        desc: 'Over 640 million daily transactions. Link bank accounts via Aadhaar eKYC. Use VPA (Virtual Payment Address) for P2P/P2M payments. Largest real-time payment system globally.',
        power: 'Collectively exert influence through usage patterns and complaints. Trust shaped by media narratives and word-of-mouth. Consent required for data use',
        connections: ['Authenticate via PIN/biometrics', 'Generate behavioral data', 'Provide KYC data to banks'],
        keyInsight: 'Individual users powerless, but as group shape policy through collective behavior and RBI surveys/complaints'
      }
    ],
    nonHuman: [
      { 
        id: 'protocol', 
        name: 'UPI Protocol', 
        x: 400, 
        y: 270, 
        color: '#10b981',
        role: 'Technical Rulebook & Interoperability Layer',
        desc: 'Open-source API layer built on IMPS network. Defines message formats, VPA mapping, authorization flow. Technology-agnostic design enables universal connectivity.',
        power: 'Determines what is technically possible. Embodies RBI security mandates. Updated periodically (recurring payments, biometric auth). "Digital railway gauge"',
        connections: ['Connects all banks and apps', 'Enables 24x7 real-time settlement', 'Standardizes transaction lifecycle'],
        keyInsight: 'Open architecture paradoxically led to application-layer concentration; protocol neutrality vs market capture tension'
      },
      { 
        id: 'qr', 
        name: 'QR Codes (BharatQR)', 
        x: 500, 
        y: 360, 
        color: '#10b981',
        role: 'Physical-Digital Bridge & Interoperability Standard',
        desc: 'Standardized by NPCI (2017) to prevent fragmentation. Encodes merchant VPA/account details. Works across all UPI apps, RuPay, Visa mVisa, Mastercard Masterpass.',
        power: 'Eliminates expensive POS terminals. Single QR works universally. Reduces technical barriers for micro-merchants. Embodies interoperability mandate',
        connections: ['Displayed by merchants', 'Scanned by smartphones', 'Decoded by fintech apps'],
        keyInsight: 'Simple non-human actor (image) enables massive social impact by democratizing digital payment acceptance'
      },
      { 
        id: 'smartphones', 
        name: 'Smartphones', 
        x: 300, 
        y: 360, 
        color: '#10b981',
        role: 'User Interface Hardware & Security Anchor',
        desc: 'Essential hardware node for UPI experience. Hosts apps, performs biometric/PIN authentication, device binding. 650M+ internet subscribers enabled by cheap data.',
        power: 'Distributed edge nodes. Secure elements (biometrics, encrypted storage) anchor security. Device binding prevents unauthorized access. *99# USSD for feature phones',
        connections: ['Captures QR codes', 'Transmits to NPCI servers', 'Stores user credentials securely'],
        keyInsight: 'Smartphone proliferation + cheap data were key enablers. Malware risk creates continuous security arms race'
      },
      { 
        id: 'aadhaar', 
        name: 'Aadhaar / eKYC', 
        x: 150, 
        y: 270, 
        color: '#10b981',
        role: 'Digital Identity Backbone & Onboarding Accelerator',
        desc: 'National biometric ID system. Aadhaar Paperless Offline eKYC (reference ID + digitally signed data, no full Aadhaar number shared). Enables instant bank account opening.',
        power: 'User controls data disclosure. UIDAI digital signature verifies authenticity. Reduces fraud vs paper docs. Bundled with Jan Dhan for merchant onboarding',
        connections: ['Links to PSP banks for KYC', 'Enables UPI registration', 'Governed by DPDP Act 2023'],
        keyInsight: 'Privacy-preserving design (masked Aadhaar, encrypted data) balances identity verification with user control; ubiquity creates single-point trust concentration'
      },
      { 
        id: 'switch', 
        name: 'NPCI Switch & Servers', 
        x: 400, 
        y: 200, 
        color: '#10b981',
        role: 'Central Nervous System & Transaction Router',
        desc: 'Centralized hub processing ALL UPI transactions. Real-time authorization, routing between issuing/acquiring banks, settlement coordination. 99.9% uptime. Runs centralized FRM.',
        power: 'Star topology—all participants connect here. Enforces standardized protocols. Eliminates bilateral bank agreements. Enables network-level security and fraud detection',
        connections: ['Integrate via PSP bank APIs', 'Must comply with 30% volume cap (extended 2 years)', 'Cross-sell financial products', 'Influences media narratives through PR and advertising'],
        keyInsight: 'Deliberate centralization yields strategic benefits: instant interoperability, uniform security, single point of control for NPCI'
      },
      { 
        id: 'media', 
        name: 'Media Narratives', 
        x: 100, 
        y: 160, 
        color: '#10b981',
        role: 'Perception Shaper & Trust Builder/Eroder',
        desc: 'PIB releases, news outlets, social media. Positive narratives (20B+ monthly transactions) build trust. Negative coverage (fraud, outages) drives policy changes.',
        power: 'Creates social proof and inevitability. Watchdog function scrutinizes concentration. Educates users. Frames UPI as "empowerment tool" or "global innovation"',
        connections: ['Influences user trust', 'Prompts NPCI policy responses', 'Amplifies success/failure stories'],
        keyInsight: 'Media both reflects and shapes network by connecting disconnected actors through shared narratives; fraud exposés directly led to NPCI rule changes'
      }
    ],
    peripheral: [
      { 
        id: 'fraud', 
        name: 'Fraud Detection AI', 
        x: 550, 
        y: 140, 
        color: '#f59e0b',
        role: 'Real-Time Risk Mitigation & Security Gatekeeper',
        desc: 'ML algorithms in centralized FRM system (NPCI mandated). Federated AI pilot: banks share risk scores without raw data. Assigns risk scores based on patterns, device, geo-location.',
        power: 'Can pop warnings before transaction finalization. Blacklists suspect accounts. Mandatory integration for all participants. Decides what constitutes "fraud"',
        connections: ['Integrated with NPCI Switch', 'Receives data from all transactions', 'Sends alerts to users/compliance teams'],
        keyInsight: 'Raises algorithmic accountability questions: whose model decides fraud? False positives can lock out legitimate users'
      },
      { 
        id: 'credit', 
        name: 'Credit Scoring (DPS)', 
        x: 650, 
        y: 280, 
        color: '#f59e0b',
        role: 'Financial Inclusion Engine & Alternative Credit',
        desc: 'NPCI Digital Payments Score: computes creditworthiness from UPI transaction history (timeliness, frequency, amounts). Enables BNPL, instant credit lines linked to UPI ID.',
        power: 'Transforms UPI from payment rail to foundational financial services layer. Extends credit to previously credit-invisible populations. Sidelines traditional bureaus',
        connections: ['Accesses UPI transaction data (with consent)', 'Enables fintech BNPL services', 'Interfaces with lending platforms'],
        keyInsight: 'Evolution from payments to credit underwriting signals UPI\'s transition to broader financial infrastructure; requires strict data governance'
      },
      { 
        id: 'brokers', 
        name: 'Data Brokers', 
        x: 650, 
        y: 370, 
        color: '#f59e0b',
        role: 'Data Aggregators & Privacy Risk',
        desc: 'Opaque entities seeking to profit from UPI metadata. Combine transaction patterns with ad-tracking, telecom data for consumer profiling. DPDP Act 2023 requires consent.',
        power: 'Tangential but emerging threat. Could undermine trust if leaks occur. May lobby for looser data portability rules. "Potential parasites on ecosystem"',
        connections: ['Target fintech platforms for data access', 'Correlate UPI data with other consumer data', 'Constrained by RBI/NPCI data storage rules'],
        keyInsight: 'Same openness enabling UPI success creates vulnerability if data flows not strictly controlled; represent surveillance capitalism risk'
      },
      { 
        id: 'community', 
        name: 'Merchant Communities', 
        x: 500, 
        y: 470, 
        color: '#f59e0b',
        role: 'Grassroots Trust Networks & Diffusion Catalysts',
        desc: 'Informal networks of small businesses, trade associations. Share knowledge, organize peer workshops. Early adopter success drives collective adoption decisions.',
        power: 'Numerical strength—large motivated network boosts usage. Collectively resist fraud. Raise usability concerns to NPCI. Social substrate for technical network',
        connections: ['Interact with NGO/government outreach', 'Receive QR codes from fintechs', 'Feed back ground-level issues to regulators'],
        keyInsight: 'Shape trust and diffusion in ways pure technology cannot; if merchants see neighbors benefit, they trust the system more'
      }
    ],
    surveillance: [
      {
        id: 'finint',
        name: 'Financial Intelligence Unit (FIU)',
        x: 50,
        y: 40,
        color: '#dc2626', // Dark Red: Surveillance State
        role: 'Central AML/CFT Intelligence Hub & Real-Time Monitoring Coordinator',
        desc: 'Receives automated SARs from NPCI switch via banks. Operates with significantly enhanced capabilities post-UPI: real-time transaction pattern analysis, cross-border intelligence sharing (Egmont Group), predictive risk modeling.',
        power: 'Direct pipeline to centralized NPCI data. Can mandate algorithmic SAR triggers. Immediate intelligence sharing with ED/CBI/NIA. Power to blacklist entities across entire UPI ecosystem.',
        connections: ['Receives automated SARs from NPCI/Banks', 'Coordinates international FIU network', 'Feeds real-time intelligence to enforcement agencies', 'Sets suspicious pattern definitions'],
        keyInsight: 'UPI transformed FIU from reactive report processor to proactive surveillance coordinator—every digital transaction now potentially visible in real-time.'
      },
      {
        id: 'incometax',
        name: 'Income Tax Department',
        x: 100,
        y: 300,
        color: '#dc2626',
        role: 'Comprehensive Transaction Surveillance & Automated Tax Compliance',
        desc: 'Post-UPI: Direct access to aggregated transaction data via NPCI integration. Project Insight upgraded with ML algorithms correlating UPI patterns with tax returns. Annual Information Returns (AIR) replaced by continuous monitoring.',
        power: 'Real-time high-value transaction alerts. PAN-linked UPI monitoring. Can issue automated notices for spending-income mismatches. Access to merchant settlement data for GST cross-verification.',
        connections: ['Continuous data feed from NPCI', 'Cross-references UPI spending with declared income', 'Coordinates with GST network for merchant surveillance', 'Issues automated compliance notices'],
        keyInsight: 'UPI created unprecedented wealth surveillance capability—spending patterns, transaction frequency, and merchant relationships now fully visible to tax authorities.'
      },
      {
        id: 'enforcement',
        name: 'Enforcement Directorate (ED)',
        x: 50,
        y: 180,
        color: '#dc2626',
        role: 'Real-Time Economic Crime Investigation & Asset Tracking',
        desc: 'Post-UPI capabilities: Instant account freezing via NPCI coordination. Real-time transaction trail analysis. Can track fund flows across multiple UPI IDs. Integration with centralized fraud detection for money laundering patterns.',
        power: 'Freezes UPI IDs instantly (not just bank accounts). Full transaction history access. Can request NPCI to flag and monitor specific VPAs. Coordination with international law enforcement via NPCI data.',
        connections: ['Direct intelligence from FIU', 'Real-time freeze orders via NPCI', 'Tracks transaction chains across ecosystem', 'Coordinates with CBI and state police agencies'],
        keyInsight: 'Digital trail permanence eliminates traditional investigation bottlenecks—every UPI transaction creates immutable forensic evidence.'
      },
      {
        id: 'aadhaar_dedup',
        name: 'Aadhaar CIDR (Deduplication)',
        x: 50,
        y: 330,
        color: '#dc2626',
        role: 'Biometric Identity Verification & Cross-System Tracking',
        desc: 'Central Identities Data Repository links Aadhaar biometrics to bank accounts, UPI IDs, PAN, and government services. Enables cross-database identity correlation. Deduplication prevents multiple fake identities.',
        power: 'Ultimate identity verification authority. Can link all financial activity to single biometric profile. Prevents anonymous account creation. Enables government to build comprehensive citizen financial profiles.',
        connections: ['Verifies identity for bank KYC', 'Links to PAN and UPI registration', 'Enables eKYC for instant onboarding', 'Cross-references with government databases'],
        keyInsight: 'Aadhaar-UPI integration creates unique identifier tying biometric identity to every digital transaction—no modern precedent for such comprehensive citizen financial tracking.'
      },
      {
        id: 'gstn',
        name: 'GST Network (GSTN)',
        x: 700,
        y: 450,
        color: '#dc2626',
        role: 'Merchant Transaction Surveillance & Tax Compliance Verification',
        desc: 'GST Network cross-references merchant UPI collections with reported revenues. Real-time invoice matching system. Flags discrepancies between settlement amounts and GST filings. Integrated with Income Tax for comprehensive business surveillance.',
        power: 'Access to all merchant settlement data via banks. Can audit transaction-by-transaction. Automated mismatch detection triggers investigations. Power to suspend GST registration (effectively killing business).',
        connections: ['Monitors merchant UPI settlements', 'Cross-verifies with GST returns', 'Coordinates with Income Tax Department', 'Receives data from acquiring banks'],
        keyInsight: 'UPI merchant adoption created unintended surveillance consequence—every kirana shop sale now potentially traceable and taxable. Formalization through surveillance.'
      },
      {
        id: 'reserve_bank',
        name: 'RBI Supervision (DEEPP)',
        x: 150,
        y: 100,
        color: '#dc2626',
        role: 'Systemic Risk Monitoring & Macroprudential Surveillance',
        desc: 'RBI\'s Data and Analytics Platform (DEEPP) monitors real-time UPI transaction volumes, concentration risks, liquidity flows. Tracks PSP market shares, identifies systemic vulnerabilities. Enhanced post-UPI with granular transaction visibility.',
        power: 'Complete visibility into payment system health. Can identify concentration risks (PhonePe/GPay dominance). Monitors cross-border transaction patterns. Power to mandate operational changes via NPCI.',
        connections: ['Monitors NPCI switch operations', 'Tracks PSP compliance', 'Analyzes macroeconomic payment trends', 'Coordinates with FIU on systemic risks'],
        keyInsight: 'Centralized switch gives RBI unprecedented real-time view of India\'s economic activity—UPI becomes de facto economic vital signs monitor.'
      },
      {
        id: 'surveillance_infrastructure',
        name: 'Total Surveillance Infrastructure',
        x: 400,
        y: 520,
        color: '#991b1b', // Darkest Red: Panopticon
        role: 'The Panopticon Effect: Comprehensive Digital Transaction Visibility',
        desc: 'The convergence of NPCI Switch + Aadhaar CIDR + FIU + Income Tax + GSTN creates unprecedented surveillance infrastructure. Every digital transaction leaves permanent, cross-referenced, biometrically-linked trail. Cash\'s anonymity eliminated.',
        power: 'Architectural power—the system itself enables surveillance by design. No single actor controls all data, but integration creates comprehensive visibility. Chilling effect on transaction behavior.',
        connections: ['Represents integrated surveillance capability', 'Enables financial profiling', 'Eliminates cash anonymity', 'Creates permanent audit trail'],
        keyInsight: 'UPI success paradox: financial inclusion achieved through surveillance infrastructure. Digital literacy now means surveillance literacy. The state gained what the pre-UPI cash economy denied—total transaction visibility.'
      }
    ]
  };

  const connections = [
    // Authority Flow (Top-Down Hierarchical)
    { from: 'government', to: 'rbi', strength: 3, type: 'authority', label: 'Policy mandate' },
    { from: 'rbi', to: 'npci', strength: 3, type: 'authority', label: 'Licensing & oversight' },
    { from: 'npci', to: 'switch', strength: 3, type: 'authority', label: 'Operational control' },
    { from: 'npci', to: 'banks', strength: 3, type: 'authority', label: 'Rule prescription' },
    { from: 'banks', to: 'fintech', strength: 2, type: 'authority', label: 'Delegated regulation' },
    
    // Value Flow (Transactional)
    { from: 'users', to: 'fintech', strength: 3, type: 'value', label: 'Payment initiation' },
    { from: 'fintech', to: 'banks', strength: 3, type: 'value', label: 'Transaction request' },
    { from: 'banks', to: 'switch', strength: 3, type: 'value', label: 'Fund transfer' },
    { from: 'switch', to: 'banks', strength: 3, type: 'value', label: 'Real-time settlement' },
    { from: 'banks', to: 'merchants', strength: 3, type: 'value', label: 'Credit account' },
    { from: 'users', to: 'merchants', strength: 3, type: 'value', label: 'P2M payment' },
    
    // Data Flow (Ubiquitous)
    { from: 'users', to: 'fintech', strength: 2, type: 'data', label: 'Behavioral data' },
    { from: 'fintech', to: 'switch', strength: 3, type: 'data', label: 'Transaction metadata' },
    { from: 'switch', to: 'fraud', strength: 3, type: 'data', label: 'Real-time monitoring' },
    { from: 'switch', to: 'credit', strength: 2, type: 'data', label: 'Transaction history' },
    { from: 'fintech', to: 'credit', strength: 2, type: 'data', label: 'UPI patterns' },
    { from: 'fintech', to: 'brokers', strength: 1, type: 'data', label: 'Potential leakage' },
    { from: 'users', to: 'aadhaar', strength: 2, type: 'data', label: 'KYC data' },
    { from: 'aadhaar', to: 'banks', strength: 2, type: 'data', label: 'Identity verification' },
    
    // Technical Infrastructure
    { from: 'protocol', to: 'switch', strength: 3, type: 'authority', label: 'API specification' },
    { from: 'protocol', to: 'banks', strength: 2, type: 'authority', label: 'Standards compliance' },
    { from: 'protocol', to: 'fintech', strength: 2, type: 'authority', label: 'Integration rules' },
    { from: 'users', to: 'smartphones', strength: 3, type: 'value', label: 'User interface' },
    { from: 'smartphones', to: 'qr', strength: 2, type: 'value', label: 'QR scanning' },
    { from: 'merchants', to: 'qr', strength: 3, type: 'value', label: 'Display code' },
    
    // Peripheral Connections
    { from: 'fraud', to: 'fintech', strength: 2, type: 'authority', label: 'Risk alerts' },
    { from: 'fintech', to: 'media', strength: 2, type: 'data', label: 'PR & narrative influence' },
    { from: 'media', to: 'government', strength: 1, type: 'data', label: 'Public pressure' },
    { from: 'media', to: 'users', strength: 2, type: 'data', label: 'Trust shaping' },
    { from: 'community', to: 'merchants', strength: 2, type: 'value', label: 'Peer influence' },
    { from: 'credit', to: 'users', strength: 2, type: 'value', label: 'Credit access' },
    
    // Surveillance Flow (Dark Red) - State Monitoring Architecture
    { from: 'switch', to: 'finint', strength: 3, type: 'data', label: 'Real-time transaction data feed' },
    { from: 'banks', to: 'finint', strength: 3, type: 'data', label: 'Automated SAR generation' },
    { from: 'switch', to: 'incometax', strength: 3, type: 'data', label: 'Aggregated transaction monitoring' },
    { from: 'finint', to: 'enforcement', strength: 3, type: 'data', label: 'Real-time intelligence sharing' },
    { from: 'enforcement', to: 'npci', strength: 3, type: 'authority', label: 'Instant VPA freeze orders' },
    { from: 'enforcement', to: 'banks', strength: 3, type: 'authority', label: 'Account freezing' },
    { from: 'aadhaar_dedup', to: 'incometax', strength: 3, type: 'data', label: 'Identity-transaction linking' },
    { from: 'aadhaar', to: 'aadhaar_dedup', strength: 3, type: 'data', label: 'Biometric verification' },
    { from: 'aadhaar_dedup', to: 'banks', strength: 2, type: 'data', label: 'KYC verification' },
    { from: 'merchants', to: 'gstn', strength: 3, type: 'data', label: 'Settlement data reporting' },
    { from: 'gstn', to: 'incometax', strength: 3, type: 'data', label: 'Tax cross-verification' },
    { from: 'banks', to: 'gstn', strength: 2, type: 'data', label: 'Merchant transaction data' },
    { from: 'reserve_bank', to: 'npci', strength: 3, type: 'authority', label: 'Systemic monitoring (DEEPP)' },
    { from: 'switch', to: 'reserve_bank', strength: 3, type: 'data', label: 'Real-time transaction analytics' },
    { from: 'reserve_bank', to: 'finint', strength: 2, type: 'data', label: 'Macroprudential intelligence' },
    { from: 'fraud', to: 'finint', strength: 2, type: 'data', label: 'Algorithmic threat detection' },
    { from: 'users', to: 'surveillance_infrastructure', strength: 3, type: 'data', label: 'Every transaction tracked' },
    { from: 'merchants', to: 'surveillance_infrastructure', strength: 3, type: 'data', label: 'Business activity monitored' },
    { from: 'fintech', to: 'surveillance_infrastructure', strength: 2, type: 'data', label: 'User behavioral data' },
    { from: 'protocol', to: 'surveillance_infrastructure', strength: 3, type: 'authority', label: 'Surveillance by design' }
  ];

  const allActors = [...actors.human, ...actors.nonHuman, ...actors.peripheral, ...actors.surveillance];

  const getActorById = (id) => allActors.find(a => a.id === id);

  const getConnections = (actorId) => {
    return connections.filter(c => c.from === actorId || c.to === actorId);
  };

  const isConnected = (actor1, actor2) => {
    if (!actor1 || !actor2) return false;
    return connections.some(c => 
      (c.from === actor1 && c.to === actor2) || 
      (c.from === actor2 && c.to === actor1)
    );
  };

  const getFilteredConnections = () => {
    return connections.filter(c => {
      if (c.type === 'authority' && !showFlows.authority) return false;
      if (c.type === 'value' && !showFlows.value) return false;
      if (c.type === 'data' && !showFlows.data) return false;
      return true;
    });
  };

  const displayedActor = selectedActor || hoveredActor;

  const getFlowColor = (type) => {
    switch(type) {
      case 'authority': return '#ef4444';
      case 'value': return '#10b981';
      case 'data': return '#8b5cf6';
      default: return '#94a3b8';
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">UPI/NPCI Comprehensive Actor Network</h1>
          <p className="text-slate-600 mb-3">Sociotechnical analysis of India's Digital Public Infrastructure: Authority, Value & Data Flows</p>
          
          <div className="flex gap-4 items-center flex-wrap">
            <div className="bg-white rounded-lg shadow p-3 flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showFlows.authority}
                  onChange={(e) => setShowFlows({...showFlows, authority: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="flex items-center gap-1 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  Authority Flow
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showFlows.value}
                  onChange={(e) => setShowFlows({...showFlows, value: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="flex items-center gap-1 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Value Flow
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showFlows.data}
                  onChange={(e) => setShowFlows({...showFlows, data: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="flex items-center gap-1 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  Data Flow
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {/* Network Visualization */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 relative" style={{minHeight: '600px'}}>
            <svg width="100%" height="600" viewBox="0 0 800 550">
              {/* Draw connections */}
              <g>
                {getFilteredConnections().map((conn, idx) => {
                  const from = getActorById(conn.from);
                  const to = getActorById(conn.to);
                  const isHighlighted = displayedActor && 
                    (conn.from === displayedActor || conn.to === displayedActor);
                  
                  return (
                    <line
                      key={idx}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isHighlighted ? getFlowColor(conn.type) : '#94a3b8'}
                      strokeWidth={isHighlighted ? conn.strength * 1.5 : conn.strength * 0.5}
                      opacity={isHighlighted ? 0.8 : 0.2}
                      strokeDasharray={conn.type === 'data' ? '5,5' : 'none'}
                    />
                  );
                })}
              </g>

              {/* Draw actors */}
              {allActors.map((actor) => {
                const isSelected = selectedActor === actor.id;
                const isHovered = hoveredActor === actor.id;
                const isConnectedToDisplay = displayedActor && isConnected(displayedActor, actor.id);
                const shouldHighlight = isSelected || isHovered || isConnectedToDisplay;

                return (
                  <g key={actor.id}>
                    <circle
                      cx={actor.x}
                      cy={actor.y}
                      r={shouldHighlight ? 28 : 24}
                      fill={actor.color}
                      opacity={shouldHighlight ? 1 : 0.7}
                      stroke="white"
                      strokeWidth="3"
                      onMouseEnter={() => setHoveredActor(actor.id)}
                      onMouseLeave={() => setHoveredActor(null)}
                      onClick={() => setSelectedActor(selectedActor === actor.id ? null : actor.id)}
                      className="cursor-pointer transition-all"
                      style={{ filter: shouldHighlight ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none' }}
                    />
                    <text
                      x={actor.x}
                      y={actor.y + 45}
                      textAnchor="middle"
                      className="text-xs font-semibold pointer-events-none"
                      fill="#1e293b"
                    >
                      {actor.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg shadow-md text-sm">
              <div className="font-semibold mb-2">Actor Types</div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Human Actors</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Non-Human Actors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Peripheral Actors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-600"></div>
                <span>Surveillance Apparatus</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-96 bg-white rounded-lg shadow-lg p-6 overflow-auto" style={{maxHeight: '600px'}}>
            {displayedActor ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: getActorById(displayedActor).color }}
                  ></div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {getActorById(displayedActor).name}
                  </h2>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-1">Role</h3>
                    <p className="text-xs text-slate-600">{getActorById(displayedActor).role}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-1">Description</h3>
                    <p className="text-xs text-slate-600">{getActorById(displayedActor).desc}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-1">Power & Control</h3>
                    <p className="text-xs text-slate-600">{getActorById(displayedActor).power}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-1">Key Connections</h3>
                    <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                      {getActorById(displayedActor).connections.map((conn, idx) => (
                        <li key={idx}>{conn}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 p-2 rounded border border-amber-200">
                    <h3 className="font-semibold text-amber-800 text-sm mb-1">Key Insight</h3>
                    <p className="text-xs text-amber-700 italic">{getActorById(displayedActor).keyInsight}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-2">Network Connections ({getConnections(displayedActor).length})</h3>
                    <div className="space-y-1">
                      {getConnections(displayedActor).map((conn, idx) => {
                        const connectedId = conn.from === displayedActor ? conn.to : conn.from;
                        const connectedActor = getActorById(connectedId);
                        const direction = conn.from === displayedActor ? '→' : '←';
                        return (
                          <div 
                            key={idx}
                            className="text-xs text-slate-600 flex items-center gap-2 cursor-pointer hover:text-slate-900 p-1 hover:bg-slate-50 rounded"
                            onClick={() => setSelectedActor(connectedId)}
                          >
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: getFlowColor(conn.type) }}
                            ></div>
                            <span className="flex-1">
                              {direction} {connectedActor.name}
                              <span className="text-slate-400 ml-1">({conn.label})</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedActor(null)}
                  className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-semibold mb-2">Explore the Network</p>
                <p className="text-sm">Click or hover over any actor to see detailed analysis, power dynamics, and strategic insights</p>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="space-y-4">
          {/* Multi-Layered Analysis */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('flows')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-800">Multi-Layered Flow Analysis</h3>
              {expandedSection === 'flows' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'flows' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Authority Flow (Top-Down Hierarchical)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Governance and compliance dictated hierarchically through the regulatory triad:
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>RBI</strong> (Licensor/Policy) → <strong>NPCI</strong> (Rule Setter/Operator) → <strong>PSPs</strong> (Gatekeepers/Auditors) → <strong>TPAPs</strong> (Service Providers)
                  </p>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    Banks act as "Delegated Regulators" over fintech layer, transferring legal liability for operational security to established, regulated banking sector.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Value Flow (P2P/P2M Transactional)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Core transactional flow handling 640M+ daily transactions:
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>User/Remitter</strong> (via TPAP) → <strong>PSP Bank</strong> → <strong>NPCI Switch</strong> (real-time processing) → <strong>Beneficiary PSP</strong> → <strong>Merchant/User</strong>
                  </p>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    Zero MDR model and instant settlement distinguish UPI from traditional card networks, driving micro-merchant adoption (111% growth in H1 2024).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Data Flow (Ubiquitous and Concurrent)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Transaction data flows simultaneously in multiple directions:
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li><strong>Central:</strong> TPAP/User → NPCI Switch (processing)</li>
                    <li><strong>Security:</strong> Switch → Centralized FRM (fraud detection)</li>
                    <li><strong>Peripheral:</strong> Behavioral data → Credit Scoring Systems & Data Brokers</li>
                    <li><strong>Identity:</strong> User → Aadhaar eKYC → PSP Banks</li>
                  </ul>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    RBI data localization mandate requires ALL payment data permanently stored in India, imposing constant compliance stress on global TPAPs.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Vulnerabilities */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('vulnerabilities')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-800">Key Vulnerabilities & Strategic Stress Tests</h3>
              {expandedSection === 'vulnerabilities' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'vulnerabilities' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🚨 Monopolistic Encirclement</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Issue:</strong> PhonePe + Google Pay control 86%+ of transaction volume despite open-source protocol
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Risk:</strong> "Utility monopoly" at application layer creates innovation bottlenecks, allows private value capture from public infrastructure
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Current Mitigation:</strong> 30% transaction volume cap (extended 2 years) — unsustainable constant friction requiring organic competition fostering
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">⚠️ Data Privacy vs. Innovation</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Issue:</strong> UPI transaction data leveraged for Credit Scoring (DPS) and BNPL services
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Risk:</strong> High-frequency behavioral data exploitation by unregulated Data Brokers without explicit regulatory boundaries
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Gap:</strong> No clear definition of data ownership, mandatory user consent mechanisms, or comprehensive audit trails for credit services expansion
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🌐 Geopolitical Compliance Stress</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Issue:</strong> Strict data localization mandate (all payment data permanently in India)
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Impact:</strong> Constant operational stress on global tech firms (Google Pay), requires intensive SAR audits and network architecture guarantees
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Risk:</strong> Any compliance lapse → regulatory penalties → potential destabilization of major TPAP actors → market disruption
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🧠 Sociological Trust Barriers</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Issue:</strong> Non-adoption driven by "fear of being cheated," lack of awareness, not technical/economic barriers
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Gap:</strong> Infrastructure excellence hasn't translated to universal acceptance; cultural and trust-based friction persists
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Need:</strong> Investment in sociological integration—digital literacy programs, fraud awareness training at grassroots merchant community level
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('recommendations')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-800">Strategic Recommendations for Sustainable Growth</h3>
              {expandedSection === 'recommendations' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'recommendations' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-green-800 mb-2">1. Sustain Application Layer Competition Beyond Volume Caps</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Recommendation:</strong> Develop standardized, easy-to-integrate value-added services (beyond core payments) equally accessible to all PSPs and TPAPs
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    <strong>Impact:</strong> Reduces competitive advantage from user base size alone. Forces dominant TPAPs to compete on innovation and UX rather than market inertia.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Formalize the Data Broker and Credit Perimeter</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Recommendation:</strong> RBI should issue explicit guidelines governing collection, sharing, and permissible uses of UPI behavioral data by lending institutions and data brokers
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    <strong>Impact:</strong> Establishes secure regulatory perimeter, protecting consumer privacy while ensuring data-driven credit model remains safe engine for financial inclusion.
                  </p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-semibold text-purple-800 mb-2">3. Invest in Sociological Integration</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Recommendation:</strong> Allocate centralized funding to PSPs and local merchant communities for standardized, verified digital literacy and fraud awareness programs
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    <strong>Impact:</strong> Addresses psychological barriers (fear of cheating, lack of awareness), moving beyond technical feasibility to genuine universal market acceptance, especially among micro-merchants.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Surveillance Architecture */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('surveillance')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-800">UPI Surveillance Architecture: Total Transaction Visibility</h3>
              {expandedSection === 'surveillance' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'surveillance' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🔴 The Paradigm Shift: From Cash Anonymity to Digital Transparency</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Fundamental Transformation:</strong> UPI eliminated the "Surveillance Gap" that characterized the pre-UPI era. The 80% of transactions previously invisible (cash-based) are now being systematically digitized and made traceable.
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Architectural Change:</strong>
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1 mb-2">
                    <li><strong>Centralization:</strong> NPCI Switch as single obligatory passage point—every UPI transaction flows through one system</li>
                    <li><strong>Real-Time Processing:</strong> Transaction data available instantly vs. monthly/quarterly SAR batches in pre-UPI era</li>
                    <li><strong>Permanent Trail:</strong> Every transaction creates immutable digital forensic evidence linked to biometric identity (Aadhaar)</li>
                    <li><strong>Cross-System Integration:</strong> FIU + Income Tax + GSTN + Aadhaar CIDR create comprehensive citizen financial profiles</li>
                  </ul>
                  <p className="text-sm text-slate-600 font-semibold mb-2">
                    Key Metric: Pre-UPI surveillance covered ~20% of transactions. Post-UPI surveillance potentially covers 80%+ as digital adoption grows.
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    The state gained what cash denied: total visibility into citizen economic behavior. This is the largest expansion of financial surveillance capability in India's history.
                  </p>
                </div>

                <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-white">
                  <h4 className="font-semibold text-slate-200 mb-2">🕸️ The Surveillance Network: How It Works</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-300 font-semibold mb-1">Layer 1: Transaction Capture (NPCI Switch)</p>
                      <p className="text-xs text-slate-400">
                        Every UPI transaction logged with: Sender VPA, Receiver VPA, Amount, Timestamp, Device ID, Location (if available), Transaction purpose. Data stored permanently with data localization mandate.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 font-semibold mb-1">Layer 2: Identity Linking (Aadhaar CIDR)</p>
                      <p className="text-xs text-slate-400">
                        VPAs linked to bank accounts → linked to Aadhaar → linked to PAN → linked to mobile number. One biometric identity = complete financial profile. Cross-database correlation enabled by design.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 font-semibold mb-1">Layer 3: Behavioral Analysis (FIU + Fraud Detection AI)</p>
                      <p className="text-xs text-slate-400">
                        ML algorithms analyze transaction patterns for suspicious activity. Automated SAR generation when thresholds exceeded. Predictive risk scoring for money laundering/terror finance. Real-time alerts to enforcement agencies.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 font-semibold mb-1">Layer 4: Tax Surveillance (Income Tax + GSTN)</p>
                      <p className="text-xs text-slate-400">
                        Spending patterns cross-referenced with declared income. Merchant settlements verified against GST filings. Automated mismatch detection triggers investigations. No more manual annual reconciliation—continuous monitoring.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 font-semibold mb-1">Layer 5: Enforcement Action (ED + Police)</p>
                      <p className="text-xs text-slate-400">
                        Instant VPA/account freezing capability via NPCI. Complete transaction history for investigations. Fund flow tracking across multiple identities. Coordination with international law enforcement via FIU network.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mt-3 font-semibold border-t border-slate-600 pt-3">
                    Integration Effect: No single agency has complete surveillance power, but system integration creates comprehensive visibility. The "Total Surveillance Infrastructure" actor represents this emergent property.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">⚖️ The Privacy-Inclusion Paradox</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>The Dilemma:</strong> UPI's success in financial inclusion is inseparable from its surveillance architecture. The same features that enable convenience also enable comprehensive monitoring:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b-2 border-amber-300">
                          <th className="text-left p-2 font-semibold text-amber-900">Inclusion Feature</th>
                          <th className="text-left p-2 font-semibold text-amber-900">Surveillance Consequence</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        <tr className="border-b border-amber-200">
                          <td className="p-2">Aadhaar eKYC (instant account opening)</td>
                          <td className="p-2">Biometric linking of all financial activity</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                          <td className="p-2">Centralized NPCI switch (interoperability)</td>
                          <td className="p-2">Single point of transaction surveillance</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                          <td className="p-2">Real-time settlement (convenience)</td>
                          <td className="p-2">Real-time monitoring capability</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                          <td className="p-2">Zero MDR (merchant adoption)</td>
                          <td className="p-2">Merchant revenue fully visible for tax surveillance</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                          <td className="p-2">VPA aliases (user-friendly identifiers)</td>
                          <td className="p-2">Persistent identity across all transactions</td>
                        </tr>
                        <tr>
                          <td className="p-2">Data localization (sovereignty)</td>
                          <td className="p-2">Government-accessible data repository</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-700 mt-3 font-semibold">
                    Critical Question: Can financial inclusion be achieved without surveillance infrastructure, or is this trade-off inevitable in digital public infrastructure?
                  </p>
                  <p className="text-sm text-slate-600 italic mt-2">
                    UPI demonstrates that "public utility" status doesn't prevent surveillance—architectural design choices (centralization, identity linking, data retention) embedded surveillance capability from the start.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Surveillance Capability Comparison: Pre-UPI vs. Post-UPI</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-blue-300">
                          <th className="text-left p-2 font-semibold text-blue-900">Capability</th>
                          <th className="text-left p-2 font-semibold text-blue-900">Pre-UPI (Cash Era)</th>
                          <th className="text-left p-2 font-semibold text-blue-900">Post-UPI (Digital Era)</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Transaction Visibility</td>
                          <td className="p-2">~20% (bank-mediated only)</td>
                          <td className="p-2">80%+ (expanding with digital adoption)</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Data Timeliness</td>
                          <td className="p-2">Monthly/Quarterly batches</td>
                          <td className="p-2">Real-time</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Identity Verification</td>
                          <td className="p-2">Paper KYC, PAN linking</td>
                          <td className="p-2">Biometric Aadhaar + VPA + PAN</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Merchant Surveillance</td>
                          <td className="p-2">Manual audit, sample checks</td>
                          <td className="p-2">100% digital settlements tracked</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Cross-System Integration</td>
                          <td className="p-2">Siloed databases, manual correlation</td>
                          <td className="p-2">Automated linking (NPCI-FIU-IT-GSTN)</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Behavioral Profiling</td>
                          <td className="p-2">Limited, post-facto analysis</td>
                          <td className="p-2">Real-time ML-driven pattern detection</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Enforcement Speed</td>
                          <td className="p-2">Weeks to months (investigation lag)</td>
                          <td className="p-2">Instant (VPA freeze via NPCI)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Privacy Protection</td>
                          <td className="p-2">Cash = de facto anonymity</td>
                          <td className="p-2">Every transaction traceable by design</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 italic font-semibold">
                    Historical Significance: This represents the largest expansion of state financial surveillance capability in any democracy. No Western payment system (not even China's WeChat/Alipay initially) achieved this level of integrated visibility.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🎭 The Panopticon Effect: Behavioral Implications</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Foucauldian Analysis:</strong> UPI creates a digital panopticon where the permanent possibility of surveillance shapes citizen behavior—even when not actively monitored.
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Observable Effects:</strong>
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1 mb-2">
                    <li><strong>Self-Policing:</strong> Users avoid "suspicious" transaction patterns even when legitimate (fear of false flags)</li>
                    <li><strong>Chilling Effect:</strong> Political donations, sensitive purchases, privacy-conscious behavior increasingly difficult</li>
                    <li><strong>Formalization Pressure:</strong> Small merchants forced into tax net—informal economy shrinking under surveillance pressure</li>
                    <li><strong>Resistance Strategies:</strong> Return to cash for sensitive transactions, use of intermediaries, transaction splitting</li>
                    <li><strong>Normalization:</strong> Younger generation accepting surveillance as "price of convenience"—privacy expectations shifting</li>
                  </ul>
                  <p className="text-sm text-slate-600 italic">
                    The power of panoptic surveillance isn't just what the state can do, but how citizens modify behavior knowing they might be watched. UPI's success has made financial privacy seem antiquated rather than fundamental.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 text-white">
                  <h4 className="font-semibold text-red-200 mb-2">⚠️ Critical Vulnerabilities & Governance Gaps</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-red-100">1. Mission Creep Risk</p>
                      <p className="text-red-200 text-xs">
                        Surveillance infrastructure built for AML/tax compliance can be repurposed for political surveillance, social control, or mass profiling. No statutory limits on data use expansion.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-100">2. Algorithmic Opacity</p>
                      <p className="text-red-200 text-xs">
                        FIU/fraud detection algorithms determine "suspiciousness" without transparency. No public audit of false positive rates or bias. Users can be flagged without explanation.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-100">3. Data Breach Catastrophe Potential</p>
                      <p className="text-red-200 text-xs">
                        Centralized NPCI switch holds comprehensive transaction data for 640M+ users. Single point of failure—breach would expose entire nation's financial behavior. Data localization doesn't prevent insider threats.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-100">4. Lack of Privacy-Preserving Alternatives</p>
                      <p className="text-red-200 text-xs">
                        No technical option for anonymous digital payments (unlike cash or cryptocurrencies). Users must choose between digital exclusion or total surveillance—no middle ground.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-100">5. Weak Oversight Mechanisms</p>
                      <p className="text-red-200 text-xs">
                        No independent body auditing surveillance use. Parliamentary oversight limited. DPDP Act 2023 provides user consent framework but doesn't restrict government surveillance powers. Citizens lack visibility into how their data is used.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-red-100 mt-3 font-semibold border-t border-red-700 pt-3">
                    Urgent Need: India requires robust surveillance oversight framework—independent audit, algorithmic transparency, statutory limitations on data use, and privacy-preserving payment alternatives before surveillance infrastructure becomes politically entrenched.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ANT Framework */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Actor-Network Theory (ANT) Framework Applied</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Heterogeneous Network</h4>
                <p className="text-slate-300">
                  UPI demonstrates symmetrical treatment of human (users, merchants, banks) and non-human actors (protocols, QR codes, algorithms). Both exercise agency in shaping network outcomes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Translation & Enrollment</h4>
                <p className="text-slate-300">
                  NPCI acts as "obligatory passage point" translating interests of diverse actors. Users enrolled through multiple pathways (Aadhaar, banks, fintechs) creating redundancy and lock-in.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Materiality of Technology</h4>
                <p className="text-slate-300">
                  QR codes, smartphones, and centralized switch aren't mere tools—they actively structure social relations, determine what's possible, and embody policy decisions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Power as Relational Effect</h4>
                <p className="text-slate-300">
                  Power emerges from network position, not inherent attributes. NPCI's control derives from being central hub connecting all actors; users gain collective power through volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorNetwork;
