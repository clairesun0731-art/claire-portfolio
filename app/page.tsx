'use client';

import { useState, useEffect, useRef } from 'react';

// ── Inline styles for neo-brutalism tokens not covered by Tailwind ──────────
const BS = '6px 6px 0px 0px #000'; // hard shadow
const BS_SM = '4px 4px 0px 0px #000';
const BS_LG = '10px 10px 0px 0px #000';
const BORDER = '3px solid #000';

// ── Candy colour palette ─────────────────────────────────────────────────────
const PINK   = '#FFD1DC';
const MINT   = '#B9FBC0';
const PURPLE = '#E0BBE4';
const YELLOW = '#FEF9C3';
const SKY    = '#BFE9FF';
const WHITE  = '#FFFFFF';

export default function Home() {
  const [lang, setLang]               = useState('en');
  const [activeCase, setActiveCase]   = useState(null);
  const [kwIndex, setKwIndex]         = useState(0);
  const [copied, setCopied]           = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroBounce, setHeroBounce]   = useState(false);
  const timelineRef = useRef(null);

  const keywordsEn = ['SEO Systems', 'SEM Engines', 'GEO / AI Search', 'Growth Strategy'];
  const keywordsZh = ['SEO 系统搭建', 'SEM 付费优化', 'GEO / AI 搜索', '全渠道增长'];

  useEffect(() => {
    const interval = setInterval(() => setKwIndex(p => (p + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const progress = -(rect.top - window.innerHeight * 0.15) / (rect.height - window.innerHeight * 0.3);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero avatar bounce on load
  useEffect(() => { setTimeout(() => setHeroBounce(true), 800); }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('claire_growth');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── DATA ──────────────────────────────────────────────────────────────────
  const timelineData = [
    {
      year: '2018 – 2021',
      roleEn: 'Bachelor · English Literature',
      roleZh: '本科 · 英语语言文学',
      company: 'Yangtze University',
      descEn: 'Developed deep linguistic sensitivity and cross-cultural communication skills that later became the bedrock of global SEO content strategies.',
      descZh: '培养深厚的语言敏感度与跨文化沟通能力，成为后来全球化SEO内容策略的基石。',
      icon: '🎒', color: YELLOW,
    },
    {
      year: '2021 – 2022',
      roleEn: "Master's · Translation Studies",
      roleZh: '硕士 · 翻译学',
      company: 'Guangdong University of Foreign Studies',
      descEn: 'Specialised in translation theory and practice, directly feeding high-quality multilingual localisation skills into future SEO & SEM campaigns.',
      descZh: '深耕翻译理论与实践，为日后的多语言本地化SEO/SEM营销工作打下坚实基础。',
      icon: '📚', color: MINT,
    },
    {
      year: 'Intern',
      roleEn: 'Growth Operations Intern',
      roleZh: '增长运营实习生',
      company: 'NetEase Youdao',
      descEn: 'Operated growth campaigns for education products, learning funnel optimisation at scale inside one of China\'s leading edtech platforms.',
      descZh: '在网易有道操盘教育产品增长活动，掌握大规模漏斗优化方法。',
      icon: '🌱', color: SKY,
    },
    {
      year: 'Intern',
      roleEn: 'Overseas Creative Marketing Intern',
      roleZh: '海外创意营销实习生',
      company: 'Wondershare',
      descEn: 'Produced creative marketing for international software tools, sharpening global brand communication and campaign execution skills.',
      descZh: '为国际软件工具制作创意营销内容，磨练全球品牌传播与活动执行能力。',
      icon: '🎨', color: PURPLE,
    },
    {
      year: '2022.08 – 2024.01',
      roleEn: 'SEO Growth Lead',
      roleZh: 'SEO 增长负责人',
      company: 'MinewTag',
      descEn: 'Built B2B hardware SEO from 0 → 1. Crushed KD-81 keyword "ebook ink" to Rank #1. Scaled keywords 68 → 800+ (+826%), monthly UV 2k → 6k+ (+172%). Managed multi-language Google Ads for ESL product line — 40.48% of total inquiries from SEM, +18.52% YoY.',
      descZh: '从0到1搭建B2B硬件SEO体系。将KD-81词"ebook ink"推至谷歌第一。关键词规模68→800+（+826%），月UV 2k→6k+（+172%）。多语言Google Ads管理，SEM贡献40.48%询盘，同比增长18.52%。',
      icon: '💻', color: YELLOW,
    },
    {
      year: '2023.04 – 2023.11',
      roleEn: 'Fashion SEO Consultant',
      roleZh: '时尚行业 SEO 顾问',
      company: 'Duomeiduo Footwear',
      descEn: "Parallel B2B fashion mandate — hit Rank #1 for commercial-intent keywords like \"women's low heels\" and \"slingbacks shoes\" to drive direct procurement inquiries.",
      descZh: '并行主导时尚B2B类目SEO，为"women\'s low heels"等高商业意图词斩获第一名，直接驱动B端采购询盘。',
      icon: '👠', color: PINK,
    },
    {
      year: '2024.03 – 2024.11',
      roleEn: 'Search Strategy Lead',
      roleZh: '搜索增长策略操盘手',
      company: 'TutorEva · AI Tutor',
      descEn: 'Full-cycle Google SEO: organic traffic +14,426% (33M daily impressions). Organic UV +364% → 40k daily users. Zero-cost Product Hunt campaign → Top 5. High-value keyword coverage +217%, inquiry conversion +32%.',
      descZh: '全链路谷歌SEO：自然流量+14426%（日曝光3300万）。有机UV+364%→日活4万用户。零成本Product Hunt冲榜Top 5。高价值词覆盖+217%，询盘转化+32%。',
      icon: '🤖', color: MINT,
    },
    {
      year: '2025.04 – 2026.04',
      roleEn: 'SEO Architect · GEO Pioneer',
      roleZh: '全球 SEO 架构师 · GEO 先行者',
      company: 'SeeworldGPS',
      descEn: 'Dominated 12.1k-vol "gps tracker for car" at Rank #1. DA 24→30, keywords 6k→8k+. Google Ads ROI 6.2→11.62×, CPL $180→$130. GEO visibility 65% (Top 3 industry). Built French sub-site for EU & Africa.',
      descZh: '12.1k搜量"gps tracker for car"稳居第一。DA 24→30，关键词6k→8k+。Google Ads ROI 6.2→11.62倍，CPL从$180降至$130。GEO可见性65%（行业前三）。搭建法语子站覆盖欧非市场。',
      icon: '🌍', color: SKY,
    },
    {
      year: 'Now',
      roleEn: 'Independent Growth Consultant',
      roleZh: '独立增长顾问',
      company: 'Global B2B Clients',
      descEn: 'Providing SEO / GEO / SEM consulting for global B2B firms. Currently open to strategic partnerships.',
      descZh: '为全球B2B企业提供 SEO / GEO / SEM 咨询服务，现开放战略合作。',
      icon: '🚀', color: PURPLE,
    },
  ];

  const casesData = [
    {
      co: '01 · Seeworld GPS', url: 'seeworldgps.com',
      period: '2025.04 – 2026.04', color: SKY,
      titleEn: 'B2B Vehicle & Pet GPS Tracking', titleZh: 'B2B 车载与宠物GPS追踪',
      probEn: 'Led SEO, SEM, and CRO for a B2B IoT hardware brand — rebuilt full architecture, captured Rank #1 for 12.1k-volume queries, and delivered 11.62× Google Ads ROI.',
      probZh: '主导B2B物联网硬件品牌的SEO/SEM/CRO全链路——重建架构，斩获12.1k搜量词排名第一，实现Google Ads ROI 11.62倍。',
      keywords: [
        { kw: 'gps tracker for car', vol: '12.1k', kd: '42', rank: '1' },
        { kw: 'car finder', vol: '22.2k', kd: '100', rank: 'SERP' },
        { kw: 'camera car camera', vol: '4.4k', kd: '30', rank: 'SERP' },
        { kw: 'gps dog collar', vol: '12.1k', kd: '29', rank: 'SERP' },
      ],
    },
    {
      co: '02 · MinewTag', url: 'minewtag.com',
      period: '2022.08 – 2024.01', color: YELLOW,
      titleEn: 'B2B IoT & Retail Tech SEO', titleZh: 'B2B 智能硬件与零售SEO',
      probEn: 'Built SEO from zero. Beat KD-81 "ebook ink" to Rank #1. Scaled keywords +826%, monthly UV +172%, SEM driving 40.48% of total inquiries.',
      probZh: '从零搭建SEO体系。攻克KD-81词"ebook ink"夺下第一。关键词+826%，月UV+172%，SEM贡献40.48%询盘。',
      keywords: [
        { kw: 'ebook ink', vol: '6.6k', kd: '81', rank: '1' },
        { kw: 'circle labels', vol: '1k', kd: '31', rank: '1' },
        { kw: 'digital shelf labels', vol: '720', kd: '55', rank: '1' },
        { kw: 'e label', vol: '210', kd: '9', rank: '1' },
      ],
    },
    {
      co: '03 · Duomeiduo Footwear', url: 'duomeiduofootwear.com',
      period: '2023.04 – 2023.11', color: PINK,
      titleEn: 'B2B Fashion SEO', titleZh: 'B2B 时尚鞋履类 SEO',
      probEn: 'Achieved Rank #1 for commercial fashion terms to drive direct procurement leads from international buyers.',
      probZh: '为高商业意图时尚词斩获第一，直接引导国际采购商询盘。',
      keywords: [
        { kw: "women's low heels", vol: '260', kd: '48', rank: '1' },
        { kw: 'slingbacks shoes', vol: '210', kd: '40', rank: '1' },
        { kw: 'are leather shoes cons', vol: '880', kd: '19', rank: '3' },
      ],
    },
    {
      co: '04 · TutorEva', url: 'tutoreva.com',
      period: '2024.03 – 2024.11', color: MINT,
      titleEn: 'B2C AI Education SaaS', titleZh: 'B2C AI教育类增长',
      probEn: 'Organic traffic +14,426% (33M daily impressions), daily UV +364% to 40k users. Product Hunt Top 5. Keyword coverage +217%, conversion +32%.',
      probZh: '自然流量+14426%（日曝光3300万），日有机UV+364%至4万用户。Product Hunt Top 5。高价值词覆盖+217%，转化率+32%。',
      keywords: [],
    },
    {
      co: '05 · EwayEnergy', url: 'ewayenergy.com',
      period: '2025-2026', color: PURPLE,
      titleEn: 'Solar Energy SEO', titleZh: '太阳能产品SEO',
      probEn: 'Captured SERP features for high-intent solar product searches, boosting organic visibility for a competitive energy hardware brand.',
      probZh: '在竞争激烈的太阳能硬件品牌中斩获高意图搜索SERP特权位，大幅提升自然曝光。',
      keywords: [
        { kw: 'solar batteries for solar lights', vol: '1.6k', kd: '—', rank: '11' },
        { kw: 'solar light batteries', vol: '2.9k', kd: '—', rank: 'SERP' },
      ],
    },
  ];

  const metrics = [
    { num: '14,426%', labelEn: 'Organic Traffic Growth', labelZh: '自然流量增长', sub: 'TutorEva · Full Cycle SEO', color: YELLOW },
    { num: '81 KD', labelEn: 'Max Difficulty Beaten', labelZh: '攻克最高关键词难度', sub: '"ebook ink" · MinewTag', color: PINK },
    { num: '#1', labelEn: '12.1k Vol Keyword', labelZh: '1.2万月搜量词排名', sub: '"gps tracker for car" · Seeworld', color: MINT },
    { num: '11.62×', labelEn: 'Google Ads ROI', labelZh: 'Google广告投资回报', sub: 'SEM · SeeworldGPS', color: PURPLE },
    { num: '33.6M', labelEn: 'Daily Impressions Peak', labelZh: '日搜索曝光量峰值', sub: 'Search Visibility · TutorEva', color: SKY },
    { num: '826%', labelEn: 'Keyword Count Growth', labelZh: '关键词数量增长', sub: '68 → 800+ · MinewTag', color: YELLOW },
  ];

  const geoFeatures = [
    { icon: '🤖', titleEn: 'ChatGPT Citations', titleZh: 'ChatGPT 引用', descEn: 'Structured content & E-E-A-T signals that get brand mentions in GPT-4o responses.', descZh: '通过结构化内容与E-E-A-T信号，让品牌出现在GPT-4o回答中。', color: MINT },
    { icon: '🔍', titleEn: 'Perplexity Panels', titleZh: 'Perplexity 推荐位', descEn: 'Source authority and entity markup to dominate Perplexity AI answer panels.', descZh: '凭借权威信源与实体标记，主导Perplexity AI答案面板。', color: YELLOW },
    { icon: '🌐', titleEn: 'SGE / AI Overviews', titleZh: 'SGE / AI 概览', descEn: 'Content architecture optimised to appear in Google AI Overviews at top of SERP.', descZh: '内容架构专项优化，稳居Google AI概览（SERP顶部）。', color: PINK },
    { icon: '📊', titleEn: '65% GEO Visibility', titleZh: '65% GEO 可见性', descEn: 'Achieved Top 3 industry GEO visibility at Seeworld through AI-assisted content + schema.', descZh: '通过AI辅助内容+结构化数据，在Seeworld实现行业前三的GEO可见性65%。', color: PURPLE },
  ];

  // ── Anime Girl SVG (inline, no external dependency) ─────────────────────
  const AnimeGirl = ({ size = 52, bounce = true }) => (
    <div style={{
      width: size, height: size,
      animation: bounce ? 'girlBounce 0.6s ease-in-out infinite alternate' : 'none',
      filter: 'drop-shadow(3px 3px 0 #000)',
    }}>
      <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Body */}
        <rect x="20" y="46" width="24" height="22" rx="4" fill="#FFD1DC" stroke="#000" strokeWidth="2"/>
        {/* Legs */}
        <rect x="22" y="64" width="8" height="14" rx="3" fill="#E0BBE4" stroke="#000" strokeWidth="2"/>
        <rect x="34" y="64" width="8" height="14" rx="3" fill="#E0BBE4" stroke="#000" strokeWidth="2"/>
        {/* Arms */}
        <rect x="10" y="48" width="10" height="6" rx="3" fill="#FFD1DC" stroke="#000" strokeWidth="2"/>
        <rect x="44" y="48" width="10" height="6" rx="3" fill="#FFD1DC" stroke="#000" strokeWidth="2"/>
        {/* Head */}
        <ellipse cx="32" cy="32" rx="14" ry="15" fill="#FFEEDD" stroke="#000" strokeWidth="2"/>
        {/* Hair top */}
        <path d="M18 28 Q18 14 32 13 Q46 14 46 28 Q44 18 32 17 Q20 18 18 28Z" fill="#3D2B1F" stroke="#000" strokeWidth="1.5"/>
        {/* Side-swept bangs */}
        <path d="M18 26 Q20 20 28 22 Q24 24 22 30Z" fill="#3D2B1F"/>
        {/* Hair sides */}
        <rect x="16" y="26" width="5" height="14" rx="2" fill="#3D2B1F" stroke="#000" strokeWidth="1.5"/>
        <rect x="43" y="26" width="5" height="12" rx="2" fill="#3D2B1F" stroke="#000" strokeWidth="1.5"/>
        {/* Eyes */}
        <ellipse cx="26" cy="32" rx="3" ry="3.5" fill="#1a1a2e"/>
        <ellipse cx="38" cy="32" rx="3" ry="3.5" fill="#1a1a2e"/>
        <circle cx="27" cy="31" r="1" fill="white"/>
        <circle cx="39" cy="31" r="1" fill="white"/>
        {/* Blush */}
        <ellipse cx="22" cy="36" rx="3" ry="2" fill="#FFB3C1" opacity="0.6"/>
        <ellipse cx="42" cy="36" rx="3" ry="2" fill="#FFB3C1" opacity="0.6"/>
        {/* Smile */}
        <path d="M28 39 Q32 42 36 39" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Collar / outfit detail */}
        <path d="M26 46 L32 50 L38 46" stroke="#000" strokeWidth="1.5" fill="none"/>
      </svg>
      <style>{`
        @keyframes girlBounce {
          from { transform: translateY(0px) rotate(-2deg); }
          to   { transform: translateY(-8px) rotate(2deg); }
        }
      `}</style>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Space Grotesk', 'Sora', 'DM Sans', system-ui, sans-serif", background: '#FFFEF5', color: '#111', minHeight: '100vh' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #FFD1DC; color: #000; }
        body { overflow-x: hidden; }

        .nb-card {
          border: ${BORDER};
          box-shadow: ${BS};
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .nb-card:hover {
          box-shadow: ${BS_LG};
          transform: translate(-2px,-2px);
        }
        .nb-btn {
          border: ${BORDER};
          box-shadow: ${BS_SM};
          font-weight: 700;
          cursor: pointer;
          transition: box-shadow 0.1s ease, transform 0.1s ease;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .nb-btn:hover {
          box-shadow: none;
          transform: translate(4px, 4px);
        }
        .nb-btn:active { box-shadow: none; transform: translate(6px,6px); }

        .kw-badge {
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
          font-weight: 700; font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .rank-1 { background: #B9FBC0; }
        .rank-serp { background: #FEF9C3; }
        .rank-other { background: #E0BBE4; }

        @keyframes ticker {
          0%   { opacity:0; transform:translateY(10px); }
          15%  { opacity:1; transform:translateY(0);    }
          85%  { opacity:1; transform:translateY(0);    }
          100% { opacity:0; transform:translateY(-10px);}
        }
        .kw-ticker { animation: ticker 2.5s ease-in-out infinite; }

        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .pulse-ring {
          position: absolute; inset: -6px;
          border-radius: 50%; border: 2px solid #000;
          animation: pulseRing 1.6s ease-out infinite;
        }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .accordion-content { overflow: hidden; }
        .accordion-open { animation: accordionOpen 0.3s ease forwards; }
        @keyframes accordionOpen {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background:'rgba(255,254,245,0.92)', backdropFilter:'blur(12px)',
        borderBottom: BORDER,
      }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Logo */}
          <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:20, letterSpacing:-1 }}>
            Claire<span style={{ color:'#000', background: PINK, padding:'0 4px', border:BORDER, marginLeft:2 }}>Sun</span>
          </div>

          {/* Nav Links */}
          <div style={{ display:'flex', gap:28, fontSize:13, fontWeight:600, alignItems:'center' }}>
            {['journey','metrics','cases','geo','cta'].map(id => (
              <a key={id} href={`#${id}`} style={{ textDecoration:'none', color:'#333' }}
                 onMouseEnter={e=>e.target.style.textDecoration='underline'}
                 onMouseLeave={e=>e.target.style.textDecoration='none'}>
                {id === 'journey' ? (lang==='en'?'Journey':'履历')
                : id === 'metrics' ? (lang==='en'?'Results':'成果')
                : id === 'cases'   ? (lang==='en'?'Cases':'案例')
                : id === 'geo'     ? 'GEO/AI'
                : (lang==='en'?"Let's Talk":'联系我')}
              </a>
            ))}
          </div>

          {/* Lang Toggle */}
          <div style={{ display:'flex', border:BORDER, boxShadow:BS_SM, background:WHITE, borderRadius:8, overflow:'hidden' }}>
            {['en','zh'].map(l => (
              <button key={l} onClick={()=>setLang(l)} style={{
                padding:'6px 16px', fontWeight:700, fontSize:13, cursor:'pointer', border:'none',
                background: lang===l ? '#000' : WHITE,
                color: lang===l ? WHITE : '#000',
                transition:'all 0.15s',
              }}>{l === 'en' ? 'EN' : '中'}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop:120, paddingBottom:80, maxWidth:1100, margin:'0 auto', padding:'120px 24px 80px', position:'relative', overflow:'hidden' }}>
        {/* Background decorative blocks */}
        <div style={{ position:'absolute', top:80, right:-40, width:320, height:320, background:PINK, border:BORDER, boxShadow:BS_LG, borderRadius:24, transform:'rotate(12deg)', zIndex:0, opacity:0.4 }}/>
        <div style={{ position:'absolute', bottom:0, left:-60, width:200, height:200, background:MINT, border:BORDER, boxShadow:BS, borderRadius:16, transform:'rotate(-8deg)', zIndex:0, opacity:0.3 }}/>

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Status pill */}
          <div className="nb-card" style={{ display:'inline-flex', alignItems:'center', gap:8, background:MINT, padding:'6px 16px', borderRadius:100, marginBottom:32, fontSize:13, fontWeight:700 }}>
            <span style={{ position:'relative', display:'inline-flex' }}>
              <span className="pulse-ring" style={{ position:'absolute', inset:-4, borderRadius:'50%', border:'2px solid #000', animation:'pulseRing 1.6s ease-out infinite' }}/>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#000', display:'block', position:'relative' }}/>
            </span>
            {lang==='en' ? 'Open to B2B Growth Consulting' : '开放 B2B 增长咨询合作'}
          </div>

          {/* H1 */}
          <h1 style={{ fontSize:'clamp(42px,7vw,88px)', fontFamily:'Sora', fontWeight:800, lineHeight:1.05, letterSpacing:-3, marginBottom:24 }}>
            {lang==='en' ? (
              <>I turn <span style={{ background:YELLOW, padding:'0 6px', border:BORDER, boxShadow:BS_SM }}>search</span> into<br/>compounding <span style={{ background:PINK, padding:'0 6px', border:BORDER, boxShadow:BS_SM }}>growth.</span></>
            ) : (
              <>将<span style={{ background:YELLOW, padding:'0 6px', border:BORDER, boxShadow:BS_SM }}>搜索</span>转化为<br/>复利式<span style={{ background:PINK, padding:'0 6px', border:BORDER, boxShadow:BS_SM }}>增长。</span></>
            )}
          </h1>

          {/* Ticker */}
          <div style={{ height:52, marginBottom:32, overflow:'hidden', display:'flex', alignItems:'center' }}>
            <span style={{ fontSize:28, fontWeight:700, color:'#555', marginRight:12 }}>→</span>
            <span className="kw-ticker" key={kwIndex} style={{ fontSize:'clamp(20px,3vw,30px)', fontWeight:700, color:'#111' }}>
              {lang==='en' ? keywordsEn[kwIndex] : keywordsZh[kwIndex]}
            </span>
          </div>

          <p style={{ fontSize:17, lineHeight:1.75, maxWidth:580, color:'#444', marginBottom:40 }}>
            {lang==='en'
              ? 'SEO · SEM · GEO (AI Search) — I build systems that turn search demand into compounding business growth for global B2B companies.'
              : 'SEO · SEM · GEO（AI搜索优化）——我为全球B2B企业构建系统化搜索增长引擎，让流量实现复利式持续增长。'}
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'center' }}>
            <a href="mailto:clairesun0731@gmail.com" className="nb-btn" style={{ background:YELLOW, color:'#000', padding:'14px 28px', borderRadius:10, fontSize:15, textDecoration:'none' }}>
              ✉ {lang==='en'?'Email Me':'发邮件联系'}
            </a>
            <button onClick={handleCopy} className="nb-btn" style={{ background:WHITE, color:'#000', padding:'14px 28px', borderRadius:10, fontSize:15, position:'relative' }}>
              💬 {lang==='en'?'Copy WeChat: claire_growth':'复制微信: claire_growth'}
              {copied && (
                <span style={{ position:'absolute', top:-36, left:'50%', transform:'translateX(-50%)', background:'#000', color:WHITE, fontSize:11, padding:'4px 12px', borderRadius:6, whiteSpace:'nowrap' }}>
                  {lang==='en'?'Copied!':'已复制！'}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ────────────────────────────────────────────────── */}
      <section id="metrics" style={{ background:'#111', borderTop:BORDER, borderBottom:BORDER, overflow:'hidden' }}>
        <div style={{ display:'flex', overflowX:'auto', scrollbarWidth:'none' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              flex:'0 0 auto', minWidth:220,
              padding:'40px 32px',
              borderRight: i < metrics.length-1 ? '2px solid #333' : 'none',
              textAlign:'center',
            }}>
              <div style={{ fontSize:42, fontWeight:800, fontFamily:'Sora', color:m.color, letterSpacing:-2, marginBottom:8 }}>{m.num}</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#ccc', marginBottom:4 }}>{lang==='en'?m.labelEn:m.labelZh}</div>
              <div style={{ fontSize:11, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────────────────── */}
      <section id="journey" style={{ padding:'80px 24px', background:'#FFFEF5', position:'relative' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <h2 style={{ fontSize:'clamp(32px,5vw,56px)', fontFamily:'Sora', fontWeight:800, letterSpacing:-2, marginBottom:16 }}>
              {lang==='en'?'The Journey':'成长轨迹'}
            </h2>
            <p style={{ color:'#666', fontSize:16 }}>
              {lang==='en'?'From campus linguist to global growth architect.':'从校园语言学者到全球增长架构师。'}
            </p>
          </div>

          {/* Timeline container */}
          <div ref={timelineRef} style={{ position:'relative', paddingLeft:56, paddingRight:0 }}>
            {/* Background track */}
            <div style={{ position:'absolute', left:20, top:0, bottom:0, width:4, background:'#E8E8E0', borderRadius:4 }}/>
            {/* Progress fill */}
            <div style={{ position:'absolute', left:20, top:0, width:4, background:'#000', borderRadius:4, transition:'height 0.1s linear', height:`${scrollProgress*100}%` }}/>

            {/* Walking Anime Girl */}
            <div style={{
              position:'absolute', left:20, zIndex:10,
              transform:'translate(-50%, -50%)',
              top:`clamp(0px, ${scrollProgress*100}%, 100%)`,
              transition:'top 0.1s linear',
            }}>
              <AnimeGirl size={52} bounce={scrollProgress > 0.02 && scrollProgress < 0.98} />
            </div>

            {/* Timeline Items */}
            <div style={{ display:'flex', flexDirection:'column', gap:40, paddingTop:16, paddingBottom:16 }}>
              {timelineData.map((item, idx) => (
                <div key={idx} style={{ display:'flex', gap:20, alignItems:'flex-start', position:'relative' }}>
                  {/* Dot */}
                  <div style={{
                    position:'absolute', left:-44, top:20,
                    width:16, height:16, borderRadius:'50%',
                    background: item.color, border:BORDER,
                    boxShadow:BS_SM, zIndex:5,
                  }}/>

                  {/* Card */}
                  <div className="nb-card" style={{ background:WHITE, borderRadius:16, padding:'24px 28px', flex:1 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', marginBottom:12 }}>
                      <span style={{ fontSize:24 }}>{item.icon}</span>
                      <span style={{ background:item.color, border:BORDER, boxShadow:'2px 2px 0 #000', padding:'3px 12px', borderRadius:100, fontSize:12, fontWeight:700 }}>
                        {item.year}
                      </span>
                      <span style={{ fontSize:13, color:'#666', fontWeight:600 }}>@ {item.company}</span>
                    </div>
                    <h3 style={{ fontSize:19, fontWeight:700, marginBottom:10, letterSpacing:-0.5 }}>
                      {lang==='en'?item.roleEn:item.roleZh}
                    </h3>
                    <p style={{ fontSize:14, lineHeight:1.7, color:'#555' }}>
                      {lang==='en'?item.descEn:item.descZh}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
      <section id="cases" style={{ padding:'80px 24px', background:'#F5F5F0', borderTop:BORDER }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(32px,5vw,56px)', fontFamily:'Sora', fontWeight:800, letterSpacing:-2, marginBottom:12 }}>
            {lang==='en'?'Proof of Work.':'硬核实战排名。'}
          </h2>
          <p style={{ color:'#666', fontSize:16, marginBottom:48 }}>
            {lang==='en'?'Real clients. Real rankings. No vanity metrics.':'真实客户。真实排名。没有虚荣数据。'}
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {casesData.map((c, i) => (
              <div key={i} className="nb-card" style={{ background:WHITE, borderRadius:16, overflow:'hidden' }}>
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveCase(activeCase===i ? null : i)}
                  style={{
                    width:'100%', textAlign:'left', padding:'24px 28px',
                    background: activeCase===i ? c.color : WHITE,
                    border:'none', cursor:'pointer',
                    display:'flex', justifyContent:'space-between', alignItems:'center', gap:16,
                    transition:'background 0.2s',
                  }}
                >
                  <div>
                    <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:6, color:'#666' }}>{c.co}</div>
                    <div style={{ fontSize:20, fontWeight:700, letterSpacing:-0.5 }}>{lang==='en'?c.titleEn:c.titleZh}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                    <span style={{ background:'#111', color:WHITE, fontSize:11, padding:'3px 12px', borderRadius:100, fontWeight:600 }}>{c.period}</span>
                    <span style={{ fontSize:28, fontWeight:300, transition:'transform 0.25s', transform: activeCase===i?'rotate(45deg)':'rotate(0deg)', display:'block' }}>+</span>
                  </div>
                </button>

                {/* Accordion Body */}
                {activeCase === i && (
                  <div className="accordion-open" style={{ padding:'28px', borderTop:BORDER, background:'#FFFEF5', display:'grid', gridTemplateColumns:'1fr 1fr', gap:28 }}>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#888', marginBottom:12 }}>
                        {lang==='en'?'Challenge & Impact':'挑战与成果'}
                      </div>
                      <p style={{ fontSize:14, lineHeight:1.75, color:'#444', marginBottom:20 }}>{lang==='en'?c.probEn:c.probZh}</p>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700 }}>
                        <span style={{ width:8, height:8, borderRadius:'50%', background:'#000', display:'block' }}/>
                        {c.url}
                      </div>
                    </div>

                    {c.keywords.length > 0 ? (
                      <div className="nb-card" style={{ background:WHITE, borderRadius:12, padding:'20px', overflow:'auto' }}>
                        <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#888', marginBottom:16 }}>
                          {lang==='en'?'Core Ranking Keywords':'核心斩获词汇'}
                        </div>
                        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                          <thead>
                            <tr style={{ borderBottom:'2px solid #000' }}>
                              {['Keyword','Vol','KD','Rank'].map(h => (
                                <th key={h} style={{ textAlign:'left', padding:'6px 8px', fontWeight:700, fontSize:11, textTransform:'uppercase', letterSpacing:1 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {c.keywords.map((kw, ki) => (
                              <tr key={ki} style={{ borderBottom:'1px solid #eee' }}>
                                <td style={{ padding:'8px', fontWeight:600, color:'#222' }}>{kw.kw}</td>
                                <td style={{ padding:'8px', color:'#555' }}>{kw.vol}</td>
                                <td style={{ padding:'8px', color:'#555' }}>{kw.kd}</td>
                                <td style={{ padding:'8px' }}>
                                  <span className={`kw-badge ${kw.rank==='1'?'rank-1':kw.rank==='SERP'?'rank-serp':'rank-other'}`}>
                                    {kw.rank==='SERP'?'SERP Feature':`#${kw.rank}`}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="nb-card" style={{ background:c.color, borderRadius:12, padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center', gap:16 }}>
                        {[
                          { num:'+14,426%', lbl: lang==='en'?'Organic Traffic':'自然流量增长' },
                          { num:'+364%',    lbl: lang==='en'?'Daily Organic UV':'日有机UV增长' },
                          { num:'Top 5',    lbl: 'Product Hunt' },
                          { num:'+217%',    lbl: lang==='en'?'Keyword Coverage':'高价值词覆盖' },
                        ].map((stat,si) => (
                          <div key={si} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(0,0,0,0.1)', paddingBottom:8 }}>
                            <span style={{ fontSize:13, fontWeight:600, color:'#444' }}>{stat.lbl}</span>
                            <span style={{ fontSize:18, fontWeight:800 }}>{stat.num}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEO / AI SEARCH ──────────────────────────────────────────────── */}
      <section id="geo" style={{ padding:'80px 24px', background:'#111', borderTop:BORDER }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ marginBottom:56 }}>
            <div className="nb-card" style={{ display:'inline-flex', alignItems:'center', gap:8, background:PURPLE, padding:'5px 16px', borderRadius:100, fontSize:12, fontWeight:700, marginBottom:20 }}>
              🤖 GEO · Generative Engine Optimization
            </div>
            <h2 style={{ fontSize:'clamp(28px,4.5vw,52px)', fontFamily:'Sora', fontWeight:800, letterSpacing:-2, color:WHITE, lineHeight:1.1, marginBottom:16 }}>
              {lang==='en'?'Beyond Google rankings':'超越谷歌排名'}
            </h2>
            <p style={{ color:'#aaa', fontSize:16, maxWidth:560 }}>
              {lang==='en'
                ? "SEO is table stakes. The next frontier is making your brand the answer inside ChatGPT, Perplexity, and Google's AI Overviews."
                : 'SEO只是基础门槛。下一个前沿是让你的品牌成为ChatGPT、Perplexity和谷歌AI概览中的权威答案。'}
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 }}>
            {geoFeatures.map((f, i) => (
              <div key={i} className="nb-card" style={{ background:f.color, borderRadius:16, padding:'24px 20px' }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{lang==='en'?f.titleEn:f.titleZh}</h3>
                <p style={{ fontSize:13, lineHeight:1.65, color:'#333' }}>{lang==='en'?f.descEn:f.descZh}</p>
              </div>
            ))}
          </div>

          {/* GEO stat callout */}
          <div className="nb-card" style={{ background:YELLOW, borderRadius:16, padding:'32px', marginTop:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            <div>
              <div style={{ fontSize:52, fontWeight:800, fontFamily:'Sora', letterSpacing:-2, lineHeight:1 }}>65%</div>
              <div style={{ fontSize:15, fontWeight:600, marginTop:4 }}>{lang==='en'?'GEO Visibility · Top 3 in Industry':'GEO 可见性 · 行业前三'}</div>
              <div style={{ fontSize:12, color:'#555', marginTop:4 }}>SeeworldGPS · AI Content + Schema</div>
            </div>
            <div style={{ maxWidth:320, fontSize:14, lineHeight:1.7, color:'#333' }}>
              {lang==='en'
                ? 'Achieved by combining AI-assisted content generation, structured data markup, and E-E-A-T optimisation — making SeeworldGPS visible across ChatGPT, Gemini, and Perplexity.'
                : '通过AI辅助内容生成、结构化数据标记和E-E-A-T优化三管齐下，让SeeworldGPS在ChatGPT、Gemini和Perplexity中均获得高度可见性。'}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / FOOTER ─────────────────────────────────────────────────── */}
      <footer id="cta" style={{ background:'#FFFEF5', borderTop:BORDER, padding:'80px 24px 48px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          {/* Big CTA */}
          <div className="nb-card" style={{ background:PINK, borderRadius:24, padding:'64px 48px', textAlign:'center', marginBottom:64 }}>
            <div style={{ fontSize:20, marginBottom:16 }}>
              <AnimeGirl size={72} bounce />
            </div>
            <h2 style={{ fontSize:'clamp(28px,5vw,56px)', fontFamily:'Sora', fontWeight:800, letterSpacing:-2, marginBottom:20, lineHeight:1.1 }}>
              {lang==='en' ? "Let's build your next growth system." : '一起搭建你的下一个增长引擎吧。'}
            </h2>
            <p style={{ color:'#555', fontSize:16, marginBottom:36, maxWidth:440, margin:'0 auto 36px' }}>
              {lang==='en'
                ? 'B2B companies looking to dominate organic and AI search — let\'s talk strategy.'
                : '希望主导自然搜索和AI搜索的B2B企业——欢迎来聊策略。'}
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="mailto:clairesun0731@gmail.com" className="nb-btn" style={{ background:'#000', color:WHITE, padding:'14px 32px', borderRadius:10, fontSize:15, textDecoration:'none', boxShadow:`4px 4px 0 ${PURPLE}` }}>
                ✉ clairesun0731@gmail.com
              </a>
              <button onClick={handleCopy} className="nb-btn" style={{ background:YELLOW, color:'#000', padding:'14px 32px', borderRadius:10, fontSize:15, position:'relative' }}>
                💬 WeChat: claire_growth
                {copied && (
                  <span style={{ position:'absolute', top:-40, left:'50%', transform:'translateX(-50%)', background:'#000', color:WHITE, fontSize:11, padding:'5px 12px', borderRadius:6, whiteSpace:'nowrap' }}>
                    {lang==='en'?'Copied!':'已复制！'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Skills tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', marginBottom:48 }}>
            {['Technical SEO','Content Strategy','Google Ads / SEM','GEO / AI Search','International SEO','CRO / Lead Gen','Keyword Research','Link Building','Analytics & GSC','Prompt Engineering'].map((tag,i) => (
              <span key={i} className="nb-card" style={{ background:[YELLOW,MINT,PINK,PURPLE,SKY][i%5], padding:'6px 16px', borderRadius:100, fontSize:13, fontWeight:700 }}>{tag}</span>
            ))}
          </div>

          {/* Footer bar */}
          <div style={{ borderTop:BORDER, paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16, fontSize:13, color:'#666' }}>
            <span>© {new Date().getFullYear()} Claire Sun · SEO · SEM · GEO</span>
            <span style={{ fontWeight:600 }}>{lang==='en'?'Built for growth. Designed to convert.':'为增长而生，为转化而设计。'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}