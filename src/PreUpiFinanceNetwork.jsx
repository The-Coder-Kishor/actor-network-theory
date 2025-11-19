import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Clock, CreditCard, Banknote, Maximize2, Minimize2 } from 'lucide-react';

const PreUpiFinanceNetwork = () => {
  const [selectedActor, setSelectedActor] = useState(null);
  const [hoveredActor, setHoveredActor] = useState(null);
  const [showFlows, setShowFlows] = useState({ authority: true, value: true, data: true });
  const [expandedSection, setExpandedSection] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const actors = {
    human: [
      { 
        id: 'rbi', 
        name: 'RBI & Regulators', 
        x: 400, 
        y: 40, 
        color: '#3b82f6', // Blue: Regulatory
        role: 'Monetary Authority & Systemic Risk Manager',
        desc: 'Primary authority managing system liquidity, interest rates, and compliance (KYC, AML). Focused on banking stability and slow, phased digitization (NEFT/RTGS mandate).',
        power: 'Ultimate licensing power, sets CRR/SLR, mandates infrastructure, conducts SAR audits.',
        connections: ['Direct control over Banks', 'Sets rules for Card Networks', 'Oversees NEFT/RTGS operation'],
        keyInsight: 'Prioritized macroeconomic stability and banking sector health over mass financial inclusion speed.'
      },
      { 
        id: 'banks', 
        name: 'Banks (PSUs & Pvt)', 
        x: 400, 
        y: 170, 
        color: '#3b82f6',
        role: 'Core Financial Intermediaries & Gatekeepers',
        desc: 'Maintain customer accounts (CASA), operate branches, and manage the core payment infrastructure (NEFT/RTGS/IMPS). High transaction costs for retail services.',
        power: 'Control access to national clearing systems; high branch network density; primary source of credit.',
        connections: ['Issue Cards/Checks to Users', 'Connect to NEFT/RTGS system', 'Report compliance data to RBI'],
        keyInsight: 'Profitability relied on fee extraction (e.g., NEFT/RTGS charges) and large physical branch networks.'
      },
      { 
        id: 'card_nets', 
        name: 'Visa/Mastercard', 
        x: 600, 
        y: 170, 
        color: '#8b5cf6', // Purple: Global Network Operators
        role: 'Proprietary Global Payment Schemes',
        desc: 'Provide the technological backbone for credit/debit card transactions (PoS). Revenue derived from high Merchant Discount Rate (MDR) and interchange fees.',
        power: 'Dictated interchange fees, owned proprietary network standards (PoS terminal infrastructure).',
        connections: ['Partner with Banks to issue cards', 'Charge Fees to Merchants', 'Subject to RBI data rules'],
        keyInsight: 'Their high transaction fees acted as a de facto tax on digital commerce, limiting its reach.'
      },
      { 
        id: 'merchants', 
        name: 'Merchants (Kirana & Retail)', 
        x: 600, 
        y: 400, 
        color: '#3b82f6',
        role: 'Payment Acceptors (Low Digital Adoption)',
        desc: 'Overwhelmingly preferred cash due to high card MDR, long settlement times, and cost of PoS terminal infrastructure. Digital was a high-friction expense.',
        power: 'Collective resistance to high MDR schemes; high numerical mass made cash the dominant rail.',
        connections: ['Accept Cash from Users', 'Pay Card Nets (MDR)'],
        keyInsight: 'The high cost of digital acceptance was the primary barrier to widespread retail digitization.'
      },
      { 
        id: 'users', 
        name: 'Citizens / Users', 
        x: 200, 
        y: 400, 
        color: '#3b82f6',
        role: 'Dominantly Cash-Reliant Payers',
        desc: 'Relied heavily on cash (P2P/P2M). Digital use was primarily for high-value P2P (bank transfers) or structured retail (cards). High friction for bank account opening.',
        power: 'No direct leverage; power only existed collectively through cash preference.',
        connections: ['Use Checks/Cards/Cash', 'Provide KYC to Banks'],
        keyInsight: 'The system failed the user on convenience and cost, reinforcing the dominance of cash ($cash$).'
      }
    ],
    nonHuman: [
      { 
        id: 'cash', 
        name: 'Cash (Physical Currency)', 
        x: 400, 
        y: 350, 
        color: '#10b981', // Green: Dominant Exchange Medium
        role: 'Universal Medium of Exchange & Immediate Settlement',
        desc: 'The most efficient "payment system." Offers immediate finality, zero transaction fees, and anonymity. The default exchange mechanism for >80% of transactions.',
        power: 'Sets the benchmark for speed and cost; its efficiency suppresses digital alternatives.',
        connections: ['Exchanged between Users and Merchants', 'Stored in Banks'],
        keyInsight: 'Its ubiquity and efficiency were the primary non-human barrier to digitization.'
      },
      { 
        id: 'neft_rtgs', 
        name: 'NEFT/RTGS/IMPS', 
        x: 200, 
        y: 200, 
        color: '#10b981',
        role: 'Legacy Digital Transfer Protocols',
        desc: 'RBI-mandated systems for digital bank-to-bank transfers. NEFT/RTGS were slow (batch/hourly) and charged fees, making them unsuitable for retail P2M.',
        power: 'Enabled high-value digital movement but lacked 24/7 real-time speed needed for mass retail adoption.',
        connections: ['Used by Banks for settlement', 'Replaced IMPS as faster option'],
        keyInsight: 'Technology was architected for banks, not for end-user convenience.'
      },
      { 
        id: 'checks', 
        name: 'Paper Checks', 
        x: 550, 
        y: 280, 
        color: '#10b981',
        role: 'Physical Deferred Payment Instrument',
        desc: 'Used for large payments or when bank details were unavailable. Required complex clearing cycle (days) and significant physical infrastructure/logistics.',
        power: 'Legally binding; process friction served as a time anchor for the financial system.',
        connections: ['Issued by Banks', 'Exchanged between Users/Merchants'],
        keyInsight: 'Its inefficiency highlighted the massive gap in real-time retail payment solutions.'
      },
      { 
        id: 'pos_terminals', 
        name: 'PoS Terminals', 
        x: 700, 
        y: 280, 
        color: '#10b981',
        role: 'Card Network Access Hardware',
        desc: 'Expensive proprietary hardware required for card acceptance. Merchant deployment costs were high, limiting adoption to large retail chains.',
        power: 'Acts as a physical barrier to entry for micro-merchants into the digital system.',
        connections: ['Connects Merchants to Card Nets', 'Used by Users to swipe'],
        keyInsight: 'High cost of acceptance hardware prevented scaling digital payments to the masses.'
      }
    ],
    peripheral: [
      { 
        id: 'telecom', 
        name: 'Telecom Operators', 
        x: 200, 
        y: 100, 
        color: '#f59e0b', // Amber: Enabler/Siloed
        role: 'Mobile Connectivity Providers',
        desc: 'Enabled the rise of basic feature phone connectivity and early SMS-based finance, but mobile money was siloed (e.g., wallet-to-wallet transfers only).',
        power: 'Controlled access to the mobile digital channel; SIM card was the identity anchor.',
        connections: ['Provides connectivity to Users', 'Early Mobile Wallet partner'],
        keyInsight: 'Data and connectivity costs were too high to unleash mass mobile payments.'
      },
      { 
        id: 'wallets', 
        name: 'Closed Wallets (Paytm etc.)', 
        x: 650, 
        y: 80, 
        color: '#f59e0b',
        role: 'Siloed Digital Payment Containers',
        desc: 'Pre-paid instruments (PPIs) that required loading money and were often not interoperable with bank accounts or other wallets (closed-loop).',
        power: 'Built initial user habits for mobile payments, but regulatory friction limited scale.',
        connections: ['Used by Users', 'Regulated by RBI', 'Limited connection to Banks'],
        keyInsight: 'Showed user demand for mobile payments but failed due to lack of interoperability (the core problem UPI solved).'
      }
    ],
    surveillance: [
      {
        id: 'finint',
        name: 'Financial Intelligence Unit (FIU)',
        x: 50,
        y: 40,
        color: '#dc2626', // Dark Red: Surveillance State
        role: 'National Money Laundering & Terror Finance Surveillance Center',
        desc: 'Central nodal agency under Ministry of Finance receiving, processing, and analyzing Suspicious Activity Reports (SARs) from all financial entities. Mandated under PMLA 2002. Acts as India\'s Financial Intelligence Unit.',
        power: 'Direct access to all SAR filings from banks. Power to demand granular data. Shares intelligence with law enforcement (ED, CBI, NIA). Can trigger account freezes through PMLA provisions.',
        connections: ['Receives all SARs from Banks and RBI', 'Coordinates with International FIUs (Egmont Group)', 'Feeds data to Enforcement Directorate', 'Mandates additional KYC rules'],
        keyInsight: 'Pre-UPI surveillance architecture was reactive and bank-mediated, requiring manual SAR submissions with significant delay—financial opacity allowed significant informal economy activity.'
      },
      {
        id: 'incometax',
        name: 'Income Tax Department',
        x: 100,
        y: 280,
        color: '#dc2626',
        role: 'Tax Compliance Surveillance & Wealth Tracking',
        desc: 'Uses Section 285BA (Annual Information Return) to collect transaction data from banks. Project Insight system cross-references bank data with tax returns. Focuses on high-value cash deposits and unexplained transactions.',
        power: 'Can demand bank account details for investigation. Issues notices based on transaction anomalies. Access to PAN-linked accounts. Limited real-time visibility—primarily annual reconciliation.',
        connections: ['Requests data from Banks periodically', 'Cross-checks cash deposits', 'Issues PAN mandate for high-value transactions', 'Limited real-time surveillance capability'],
        keyInsight: 'Pre-UPI era: surveillance limited to post-facto analysis of aggregated bank data. Cash dominance created massive blind spots—80%+ transactions invisible to state apparatus.'
      },
      {
        id: 'enforcement',
        name: 'Enforcement Directorate (ED)',
        x: 50,
        y: 200,
        color: '#dc2626',
        role: 'Anti-Money Laundering Enforcement & Asset Seizure',
        desc: 'Economic intelligence agency enforcing PMLA and FEMA. Conducts investigations based on FIU intelligence. Power to attach and confiscate proceeds of crime. High-profile enforcement in political/corporate cases.',
        power: 'Can freeze bank accounts and assets under PMLA. Summon individuals for interrogation. Arrests for money laundering. Access to banking channels post-flagging by FIU.',
        connections: ['Receives intelligence from FIU', 'Investigates flagged accounts with Banks', 'Coordinates with CBI and police agencies', 'Limited pre-digital visibility'],
        keyInsight: 'Enforcement reactive, not proactive. Lacked real-time payment trail visibility—investigations took months. Cash economy provided natural evasion mechanism for illicit flows.'
      },
      {
        id: 'surveillance_gap',
        name: 'Surveillance Gap (Cash Economy)',
        x: 300,
        y: 475,
        color: '#991b1b', // Darkest Red: Blind Spot
        role: 'The State\'s Visibility Void',
        desc: 'The massive ~80% cash-based transaction economy represented a structural blind spot in state surveillance. No transaction trails, no digital footprints, no real-time monitoring. Informal sector, hawala networks, and parallel economy thrived.',
        power: 'Paradoxically powerful through its absence—enabled widespread tax evasion, informal economy resilience, and citizen financial privacy by default. State had minimal visibility.',
        connections: ['Represents Cash transactions invisible to surveillance', 'Enables informal economy', 'Limits effectiveness of FIU, Income Tax, ED'],
        keyInsight: 'Cash was the ultimate privacy-preserving technology and the state\'s greatest surveillance challenge. Pre-UPI surveillance was fundamentally constrained by physical currency dominance—this changed dramatically post-UPI.'
      }
    ]
  };

  const connections = [
    // Authority Flow (Red)
    { from: 'rbi', to: 'banks', strength: 3, type: 'authority', label: 'Licensing & Audit' },
    { from: 'rbi', to: 'card_nets', strength: 2, type: 'authority', label: 'Rules & Data Mandates' },
    { from: 'rbi', to: 'neft_rtgs', strength: 3, type: 'authority', label: 'Protocol Ownership' },
    { from: 'rbi', to: 'wallets', strength: 1, type: 'authority', label: 'PPI Regulation' },
    
    // Surveillance Flow (Dark Red) - State Monitoring
    { from: 'finint', to: 'rbi', strength: 2, type: 'authority', label: 'Surveillance Mandates' },
    { from: 'banks', to: 'finint', strength: 3, type: 'data', label: 'SAR Submissions' },
    { from: 'banks', to: 'incometax', strength: 2, type: 'data', label: 'Annual Information Returns (AIR)' },
    { from: 'finint', to: 'enforcement', strength: 3, type: 'data', label: 'Intelligence Sharing' },
    { from: 'enforcement', to: 'banks', strength: 2, type: 'authority', label: 'Account Freeze Orders' },
    { from: 'incometax', to: 'banks', strength: 2, type: 'authority', label: 'Data Requests (Section 285BA)' },
    { from: 'card_nets', to: 'finint', strength: 1, type: 'data', label: 'Limited Transaction Reporting' },
    { from: 'rbi', to: 'finint', strength: 2, type: 'data', label: 'Aggregated SAR Data' },
    { from: 'cash', to: 'surveillance_gap', strength: 4, type: 'value', label: 'Invisible Transactions' },
    { from: 'users', to: 'surveillance_gap', strength: 3, type: 'value', label: 'Untraceable P2P/P2M' },
    { from: 'merchants', to: 'surveillance_gap', strength: 3, type: 'value', label: 'Unreported Sales' },
    
    // Value Flow (Green) - Core financial transactions
    { from: 'users', to: 'cash', strength: 4, type: 'value', label: 'Primary Payment (P2M/P2P)' },
    { from: 'cash', to: 'merchants', strength: 4, type: 'value', label: 'Cash Acceptance' },
    { from: 'users', to: 'banks', strength: 2, type: 'value', label: 'Deposit/Withdrawal' },
    { from: 'users', to: 'card_nets', strength: 3, type: 'value', label: 'Card Payment' },
    { from: 'merchants', to: 'card_nets', strength: 2, type: 'value', label: 'MDR Payment (Fee)' },
    { from: 'users', to: 'checks', strength: 2, type: 'value', label: 'Paper Payment' },
    { from: 'banks', to: 'neft_rtgs', strength: 3, type: 'value', label: 'Inter-bank Transfer' },
    { from: 'users', to: 'wallets', strength: 1, type: 'value', label: 'Closed-Loop Transfer' },

    // Data Flow (Purple) - KYC and Compliance
    { from: 'users', to: 'banks', strength: 3, type: 'data', label: 'Paper/Physical KYC' },
    { from: 'banks', to: 'rbi', strength: 2, type: 'data', label: 'SAR Reporting' },
    { from: 'card_nets', to: 'banks', strength: 2, type: 'data', label: 'Transaction Reconciliation' },
    { from: 'telecom', to: 'users', strength: 1, type: 'data', label: 'Mobile Connection/SMS' },
    
    // Technical/Material Connections
    { from: 'banks', to: 'checks', strength: 2, type: 'authority', label: 'Issue & Honor' },
    { from: 'banks', to: 'pos_terminals', strength: 2, type: 'authority', label: 'Deployment & Maintenance' },
    { from: 'card_nets', to: 'pos_terminals', strength: 3, type: 'authority', label: 'Proprietary Standard' },
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
      case 'authority': return '#ef4444'; // Red
      case 'value': return '#10b981';    // Green
      case 'data': return '#8b5cf6';     // Purple
      default: return '#94a3b8';
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Utility function for icon based on ID
  const getActorIcon = (id) => {
    switch(id) {
      case 'rbi': return <Info className="w-4 h-4" />;
      case 'cash': return <Banknote className="w-4 h-4" />;
      case 'card_nets': return <CreditCard className="w-4 h-4" />;
      case 'neft_rtgs': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  }

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-slate-100' : 'w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100'} p-6 overflow-auto`}>
      <div className={`${isFullScreen ? 'max-w-none' : 'max-w-7xl'} mx-auto`}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Pre-UPI Indian Finance Actor Network (c. 2010-2015)</h1>
            <button
              onClick={toggleFullScreen}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg shadow-md transition-colors"
              title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              <span className="text-sm font-medium">{isFullScreen ? "Exit Full Screen" : "Full Screen"}</span>
            </button>
          </div>
          <p className="text-slate-600 mb-3">Sociotechnical Analysis of the Fragmented, Cash-Dominant Era</p>
          
          <div className="flex gap-4 items-center flex-wrap">
            <div className="bg-white rounded-lg shadow p-3 flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showFlows.authority}
                  onChange={(e) => setShowFlows({...showFlows, authority: e.target.checked})}
                  className="w-4 h-4 accent-red-500"
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
                  className="w-4 h-4 accent-green-500"
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
                  className="w-4 h-4 accent-purple-500"
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
                  // Safety check
                  if (!from || !to) return null;

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
                      strokeDasharray={conn.type === 'data' ? '5,5' : (conn.type === 'value' && conn.strength === 4 ? '1, 4' : 'none')}
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
                <span>Human Actors (Regulators/Banks)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Non-Human Actors (Systems/Cash)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Peripheral/Emerging Actors</span>
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
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0" 
                    style={{ backgroundColor: getActorById(displayedActor).color }}
                  >
                    {getActorIcon(getActorById(displayedActor).id)}
                  </div>
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
                <p className="font-semibold mb-2">Explore the Legacy Network</p>
                <p className="text-sm">Click or hover over any actor to see how the system operated before UPI revolutionized it.</p>
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
              <h3 className="text-lg font-bold text-slate-800">Pre-UPI Flow Analysis: Fragmentation and Friction</h3>
              {expandedSection === 'flows' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'flows' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Authority Flow (Bank-Centric)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    The system was hierarchically controlled by the **RBI** and enforced through **Banks**, which acted as the sole gateways:
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>RBI</strong> (Policy) → <strong>Banks</strong> (Gatekeepers) → **Users/Merchants** (Fee Payers)
                  </p>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    The regulatory focus on stability meant authority was vested in a small set of established, risk-averse actors.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Value Flow (Fragmented and Slow)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Value was routed along three highly friction-laden paths:
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>**Dominant:** **Cash** ($cash$) for P2P/P2M (Immediate, Zero Cost).</li>
                    <li>**Medium Value:** **Card Networks** ($card\_nets$) (High Fees, Requires PoS $pos\_terminals$).</li>
                    <li>**High Value:** **NEFT/RTGS** ($neft\_rtgs$) (Slow, Charged Fees, Not 24/7).</li>
                  </ul>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    The lack of a real-time, zero-MDR option ensured that the non-human actor, **Cash**, maintained a controlling position in the value chain (Strength 4 connection).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Data Flow (Physical and Compliance-Driven)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Data flow was slow and paper-intensive, centered around KYC and compliance:
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>**Onboarding:** Users provided physical KYC data to Banks.</li>
                    <li>**Reporting:** Banks submitted regulatory (SAR) reports to RBI.</li>
                    <li>**Siloed:** Early mobile wallet data remained trapped in closed loops, preventing cross-system use.</li>
                  </ul>
                  <p className="text-sm text-slate-600 mt-2 italic">
                    The entire system lacked the digital identity backbone and real-time transaction data flow that characterizes the UPI ecosystem.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Strategic Void */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('void')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-800">The Strategic Void: The Need for UPI</h3>
              {expandedSection === 'void' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'void' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🛑 The Failure of Interoperability</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    **Core Issue:** There was no common technical **Protocol** (like UPI) that could instantly connect any bank account to any other bank account or merchant at a retail scale.
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    Closed **Wallets** ($wallets$) could not talk to each other, and banks' **NEFT/RTGS** ($neft\_rtgs$) were too slow. This void was where **Cash** thrived.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">💰 Cost Barrier to Digital Inclusion</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    **Core Issue:** The digital options ($card\_nets$, $neft\_rtgs$) were expensive for both the sender (user fees) and the receiver (high MDR for merchants).
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    The reliance on proprietary **PoS Terminals** ($pos\_terminals$) and high MDR meant that only large enterprises could afford to abandon cash, excluding micro-merchants ($merchants$).
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🔒 User Friction & Identity Gaps</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    **Core Issue:** Opening a bank account was tedious (physical **KYC** to $banks$), and transactions required sensitive data (account number/IFSC).
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    The system lacked a **virtual identifier** (like VPA/Aadhaar) to de-link identity from bank account details, making it too risky and cumbersome for daily use.
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
              <h3 className="text-lg font-bold text-slate-800">Pre-UPI Surveillance Architecture: Limited Visibility</h3>
              {expandedSection === 'surveillance' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'surveillance' && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🕵️ Reactive, Bank-Mediated Surveillance Model</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Architecture:</strong> Surveillance operated through mandatory bank reporting channels—Banks submitted Suspicious Activity Reports (SARs) to FIU, which analyzed and forwarded intelligence to Enforcement Directorate.
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Limitations:</strong>
                  </p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1 mb-2">
                    <li><strong>Time Lag:</strong> SARs filed monthly/quarterly—no real-time flagging of suspicious transactions</li>
                    <li><strong>Manual Process:</strong> Banks determined what constituted "suspicious"—inconsistent standards across institutions</li>
                    <li><strong>Limited Scope:</strong> Only covered transactions routed through formal banking channels (~20% of total economy)</li>
                    <li><strong>Post-Facto Analysis:</strong> Income Tax Department cross-referenced bank data with returns annually—reactive enforcement</li>
                  </ul>
                  <p className="text-sm text-slate-600 italic">
                    The state had visibility only into digitized, bank-intermediated transactions. The surveillance apparatus was fundamentally constrained by technological limitations.
                  </p>
                </div>

                <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-white">
                  <h4 className="font-semibold text-slate-200 mb-2">🕳️ The Surveillance Gap: Cash as Privacy Technology</h4>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>The Paradox:</strong> Cash ($cash$) was simultaneously:
                  </p>
                  <ul className="text-sm text-slate-300 list-disc list-inside space-y-1 mb-2">
                    <li><strong>Economic Efficiency:</strong> Zero transaction cost, instant settlement, universal acceptance</li>
                    <li><strong>Privacy Shield:</strong> Complete anonymity, no digital trail, no state visibility into ~80% of transactions</li>
                    <li><strong>Parallel Economy Enabler:</strong> Facilitated tax evasion, hawala networks, informal sector resilience</li>
                    <li><strong>State Surveillance Failure:</strong> The FIU, Income Tax, and ED had minimal insight into actual economic activity</li>
                  </ul>
                  <p className="text-sm text-slate-300 mb-2 font-semibold">
                    Key Insight: Pre-UPI, citizens enjoyed de facto financial privacy—not by design or right, but as a structural consequence of cash dominance.
                  </p>
                  <p className="text-sm text-slate-300 italic">
                    The **Surveillance Gap** actor represents this blind spot. UPI's emergence represents a fundamental regime shift: from surveillance constraint to surveillance abundance.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">📊 Surveillance Data Flows (Pre-UPI)</h4>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <strong>Banks → FIU:</strong> Manual SAR submissions for transactions exceeding ₹10 lakh or exhibiting suspicious patterns. Monthly/quarterly batches, significant reporting delays.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <strong>Banks → Income Tax:</strong> Annual Information Returns (Section 285BA) for high-value transactions. No real-time access—annual reconciliation only.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <strong>FIU → Enforcement Directorate:</strong> Intelligence packages for suspected money laundering cases. Investigations took months due to lack of real-time transaction visibility.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <strong>RBI → FIU:</strong> Aggregated SAR data and systemic risk reports. Macro-level visibility only—no individual transaction monitoring.
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 italic">
                    Compare this to post-UPI architecture: centralized NPCI switch enables real-time transaction monitoring, algorithmic fraud detection, and instant SAR generation—surveillance moved from reactive to predictive.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 State Surveillance Objectives vs. Capabilities</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-blue-300">
                          <th className="text-left p-2 font-semibold text-blue-900">Objective</th>
                          <th className="text-left p-2 font-semibold text-blue-900">Pre-UPI Capability</th>
                          <th className="text-left p-2 font-semibold text-blue-900">Constraint</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        <tr className="border-b border-blue-200">
                          <td className="p-2">Anti-Money Laundering (AML)</td>
                          <td className="p-2">Low—Manual SARs only</td>
                          <td className="p-2">Cash dominance, reporting delays</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2">Tax Compliance</td>
                          <td className="p-2">Very Low—Annual AIR only</td>
                          <td className="p-2">80% transactions invisible (cash)</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2">Terror Finance Tracking</td>
                          <td className="p-2">Low—Post-facto only</td>
                          <td className="p-2">Hawala networks, cash couriers</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2">Real-Time Fraud Prevention</td>
                          <td className="p-2">None—Banks handled internally</td>
                          <td className="p-2">No centralized monitoring system</td>
                        </tr>
                        <tr>
                          <td className="p-2">Financial Profiling</td>
                          <td className="p-2">Minimal—PAN linking only</td>
                          <td className="p-2">No behavioral transaction data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 italic font-semibold">
                    Critical Insight: The pre-UPI state was surveillance-aspirational but capability-constrained. Cash-based economy created structural privacy protection—UPI eliminated this constraint entirely.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ANT Framework */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Actor-Network Theory (ANT) Framework Applied to Pre-UPI</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">The Power of the Non-Human ($cash$)</h4>
                <p className="text-slate-300">
                  **Cash** was the dominant non-human actor, whose high efficiency and zero-cost structure defined the limits of the entire network. No human regulator or bank could match its efficiency.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Lack of an Obligatory Passage Point</h4>
                <p className="text-slate-300">
                  The network lacked a central **Obligatory Passage Point (OPP)**. Banks and Card Networks tried to be OPPs, but users could easily bypass them via **Cash**. UPI's strength came from establishing the **NPCI Switch** as the unavoidable OPP.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Heterogeneous Black Box</h4>
                <p className="text-slate-300">
                  The process of writing and clearing a **Check** ($checks$) or performing an **NEFT** transaction was a complex, time-consuming "black box" that users neither understood nor trusted for instant payments.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-slate-200">Translation Failure</h4>
                <p className="text-slate-300">
                  The incumbent actors failed to **translate** the need for high-speed, low-cost retail payments into viable technical or policy solutions, leaving the vast majority of the population unenrolled in the digital network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreUpiFinanceNetwork;
