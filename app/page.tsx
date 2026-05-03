'use client';

// ============================================================
// page.tsx — Claire Sun · B2B SEO / GEO Growth Portfolio
// Refactored: TS-safe · Perf · Animation · SEO · GEO · CRO
// NOTE: 'use client' files cannot export metadata.
// Add the metadata block below to your app/layout.tsx instead:
//
// export const metadata = {
//   title: 'B2B SEO Consultant | GEO & AI Search Growth Expert — Claire Sun',
//   description: 'Claire Sun is a B2B SEO, SEM & GEO specialist...',
//   openGraph: { title: 'B2B SEO & GEO Growth Expert — Claire Sun', type: 'website' },
// };
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — Neo-Brutalism palette
// ─────────────────────────────────────────────────────────────
const T = {
  pink:   '#FFD1DC',
  mint:   '#B9FBC0',
  purple: '#E0BBE4',
  yellow: '#FEF9C3',
  sky:    '#BFE9FF',
  white:  '#FFFFFF',
  black:  '#111111',
  cream:  '#FFFEF5',
  muted:  '#F5F5F0',
  border: '3px solid #111',
  bs:     '6px 6px 0 #111',
  bsSm:   '4px 4px 0 #111',
  bsLg:   '10px 10px 0 #111',
} as const;

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface TimelineItem {
  year: string;
  roleEn: string;
  roleZh: string;
  company: string;
  descEn: string;
  descZh: string;
  icon: string;
  color: string;
}

interface Keyword {
  kw: string;
  vol: string;
  kd: string;
  rank: string;
}

interface CaseItem {
  co: string;
  url: string;
  period: string;
  color: string;
  titleEn: string;
  titleZh: string;
  probEn: string;
  probZh: string;
  keywords: Keyword[];
}

interface MetricItem {
  num: string;
  labelEn: string;
  labelZh: string;
  sub: string;
  color: string;
}

interface GeoFeature {
  icon: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  color: string;
}

interface FaqItem {
  q: string;
  a: string;
}

type Lang = 'en' | 'zh';

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────
const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2018–2021',
    roleEn: 'Bachelor · English Literature',
    roleZh: '本科 · 英语语言文学',
    company: 'Yangtze University',
    descEn: 'Developed deep linguistic sensitivity and cross-cultural communication skills — later the bedrock of global SEO content strategies.',
    descZh: '培养深厚语言敏感度与跨文化沟通能力，成为后来全球化SEO内容策略的基石。',
    icon: '🎒',
    color: T.yellow,
  },
  {
    year: '2021–2022',
    roleEn: "Master's · Translation Studies",
    roleZh: '硕士 · 翻译学',
    company: 'Guangdong University of Foreign Studies',
    descEn: 'Specialised in translation theory, directly feeding multilingual localisation skills into future SEO & SEM campaigns.',
    descZh: '深耕翻译理论与实践，为日后多语言本地化SEO/SEM营销打下坚实基础。',
    icon: '📚',
    color: T.mint,
  },
  {
    year: 'Intern',
    roleEn: 'Growth Operations Intern',
    roleZh: '增长运营实习生',
    company: 'NetEase Youdao',
    descEn: "Operated growth campaigns for education products inside one of China's leading EdTech platforms.",
    descZh: '在网易有道操盘教育产品增长活动，掌握大规模漏斗优化方法。',
    icon: '🌱',
    color: T.sky,
  },
  {
    year: 'Intern',
    roleEn: 'Overseas Creative Marketing Intern',
    roleZh: '海外创意营销实习生',
    company: 'Wondershare',
    descEn: 'Produced creative marketing for international software tools, sharpening global brand communication skills.',
    descZh: '为国际软件工具制作创意营销内容，磨练全球品牌传播与活动执行能力。',
    icon: '🎨',
    color: T.purple,
  },
  {
    year: '2022.08–2024.01',
    roleEn: 'SEO Growth Lead',
    roleZh: 'SEO 增长负责人',
    company: 'MinewTag',
    descEn: 'Built B2B hardware SEO from 0→1. Crushed KD-81 "ebook ink" to Rank #1. Keywords 68→800+ (+826%), monthly UV 2k→6k+ (+172%). Multi-language Google Ads: 40.48% of total inquiries from SEM, +18.52% YoY.',
    descZh: '从0到1搭建B2B硬件SEO。将KD-81词"ebook ink"推至谷歌第一。关键词68→800+（+826%），月UV 2k→6k+（+172%）。多语言Google Ads贡献40.48%询盘，同比增长18.52%。',
    icon: '💻',
    color: T.yellow,
  },
  {
    year: '2023.04–2023.11',
    roleEn: 'Fashion SEO Consultant',
    roleZh: '时尚行业 SEO 顾问',
    company: 'Duomeiduo Footwear',
    descEn: "Parallel B2B fashion mandate — Rank #1 for \"women's low heels\" and \"slingbacks shoes\" to drive procurement inquiries.",
    descZh: '并行主导时尚B2B类目SEO，为"women\'s low heels"等核心词斩获第一名，直接驱动B端采购询盘。',
    icon: '👠',
    color: T.pink,
  },
  {
    year: '2024.03–2024.11',
    roleEn: 'Search Strategy Lead',
    roleZh: '搜索增长策略操盘手',
    company: 'TutorEva · AI Tutor',
    descEn: 'Full-cycle Google SEO: organic traffic +14,426% (33M daily impressions). Organic UV +364% → 40k daily users. Zero-cost Product Hunt → Top 5. Keyword coverage +217%, inquiry conversion +32%.',
    descZh: '全链路谷歌SEO：自然流量+14426%（日曝光3300万）。有机UV+364%→日活4万用户。零成本Product Hunt Top 5。高价值词覆盖+217%，询盘转化+32%。',
    icon: '🤖',
    color: T.mint,
  },
  {
    year: '2025.04–2026.04',
    roleEn: 'SEO Architect · GEO Pioneer',
    roleZh: '全球 SEO 架构师 · GEO 先行者',
    company: 'SeeworldGPS',
    descEn: 'Dominated 12.1k-vol "gps tracker for car" at Rank #1. DA 24→30, keywords 6k→8k+. Google Ads ROI 6.2×→11.62×, CPL $180→$130. GEO visibility 65% (Top 3 industry). Built French sub-site for EU & Africa.',
    descZh: '12.1k搜量"gps tracker for car"稳居第一。DA 24→30，关键词6k→8k+。Google Ads ROI从6.2倍升至11.62倍，CPL从$180降至$130。GEO可见性65%（行业前三）。搭建法语子站覆盖欧非市场。',
    icon: '🌍',
    color: T.sky,
  },
  {
    year: 'Now',
    roleEn: 'Independent Growth Consultant',
    roleZh: '独立增长顾问',
    company: 'Global B2B Clients',
    descEn: 'Providing SEO / GEO / SEM consulting for global B2B firms. Currently open to strategic partnerships.',
    descZh: '为全球B2B企业提供 SEO / GEO / SEM 咨询服务，现开放战略合作。',
    icon: '🚀',
    color: T.purple,
  },
];

const CASES_DATA: CaseItem[] = [
  {
    co: '01 · Seeworld GPS', url: 'seeworldgps.com',
    period: '2025.04–2026.04', color: T.sky,
    titleEn: 'B2B Vehicle & Pet GPS Tracking', titleZh: 'B2B 车载与宠物GPS追踪',
    probEn: 'Led SEO, SEM & CRO for a B2B IoT brand — rebuilt full architecture, captured Rank #1 for 12.1k-volume queries, and delivered 11.62× Google Ads ROI.',
    probZh: '主导B2B物联网硬件品牌全链路SEO/SEM/CRO——重建架构，斩获12.1k搜量词排名第一，实现Google Ads ROI 11.62倍。',
    keywords: [
      { kw: 'gps tracker for car', vol: '12.1k', kd: '42', rank: '1' },
      { kw: 'car finder', vol: '22.2k', kd: '100', rank: 'SERP' },
      { kw: 'camera car camera', vol: '4.4k', kd: '30', rank: 'SERP' },
      { kw: 'gps dog collar', vol: '12.1k', kd: '29', rank: 'SERP' },
    ],
  },
  {
    co: '02 · MinewTag', url: 'minewtag.com',
    period: '2022.08–2024.01', color: T.yellow,
    titleEn: 'B2B IoT & Retail Tech SEO', titleZh: 'B2B 智能硬件与零售SEO',
    probEn: 'Built B2B SEO from zero. Beat KD-81 "ebook ink" to Rank #1. Keywords +826%, monthly UV +172%, SEM driving 40.48% of total inquiries.',
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
    period: '2023.04–2023.11', color: T.pink,
    titleEn: 'B2B Fashion SEO', titleZh: 'B2B 时尚鞋履类SEO',
    probEn: 'Rank #1 for high-intent commercial fashion terms, driving direct procurement inquiries from international buyers.',
    probZh: '为高商业意图时尚词斩获第一，直接引导国际采购商B2B询盘。',
    keywords: [
      { kw: "women's low heels", vol: '260', kd: '48', rank: '1' },
      { kw: 'slingbacks shoes', vol: '210', kd: '40', rank: '1' },
      { kw: 'are leather shoes cons', vol: '880', kd: '19', rank: '3' },
    ],
  },
  {
    co: '04 · TutorEva', url: 'tutoreva.com',
    period: '2024.03–2024.11', color: T.mint,
    titleEn: 'B2C AI Education SaaS Growth', titleZh: 'B2C AI教育类增长',
    probEn: 'Organic traffic +14,426% (33M daily impressions), organic UV +364% to 40k daily users. Product Hunt Top 5. Keyword coverage +217%, conversion +32%.',
    probZh: '自然流量+14426%（日曝光3300万），日有机UV+364%至4万用户。Product Hunt Top 5。高价值词覆盖+217%，转化率+32%。',
    keywords: [],
  },
  {
    co: '05 · EwayEnergy', url: 'ewayenergy.com',
    period: '2024', color: T.purple,
    titleEn: 'Solar Energy B2B SEO', titleZh: '太阳能B2B产品SEO',
    probEn: 'Captured SERP features for high-intent solar product searches, boosting organic visibility for a competitive energy hardware brand.',
    probZh: '在竞争激烈的太阳能硬件品牌中斩获高意图搜索SERP特权位，大幅提升自然曝光。',
    keywords: [
      { kw: 'solar batteries for solar lights', vol: '1.6k', kd: '—', rank: '11' },
      { kw: 'solar light batteries', vol: '2.9k', kd: '—', rank: 'SERP' },
    ],
  },
];

const METRICS_DATA: MetricItem[] = [
  { num: '14,426%', labelEn: 'Organic Traffic Growth', labelZh: '自然流量增长', sub: 'TutorEva · Full-Cycle SEO', color: T.yellow },
  { num: 'KD 81', labelEn: 'Max Difficulty Beaten', labelZh: '攻克最高关键词难度', sub: '"ebook ink" · MinewTag', color: T.pink },
  { num: '#1', labelEn: '12.1k Vol Keyword', labelZh: '1.2万月搜量词排名', sub: '"gps tracker for car" · Seeworld', color: T.mint },
  { num: '11.62×', labelEn: 'Google Ads ROI', labelZh: 'Google广告投资回报', sub: 'SEM · SeeworldGPS', color: T.purple },
  { num: '33.6M', labelEn: 'Daily Impressions Peak', labelZh: '日搜索曝光量峰值', sub: 'Search Visibility · TutorEva', color: T.sky },
  { num: '+826%', labelEn: 'Keyword Count Growth', labelZh: '关键词数量增长', sub: '68 → 800+ · MinewTag', color: T.yellow },
];

const GEO_FEATURES: GeoFeature[] = [
  {
    icon: '🤖',
    titleEn: 'ChatGPT Citations',       titleZh: 'ChatGPT 引用',
    descEn: 'Structured content & E-E-A-T signals that get brand mentions inside GPT-4o answers.',
    descZh: '通过结构化内容与E-E-A-T信号，让品牌出现在GPT-4o回答中。',
    color: T.mint,
  },
  {
    icon: '🔍',
    titleEn: 'Perplexity Answer Panels', titleZh: 'Perplexity 推荐位',
    descEn: 'Source authority and entity markup to dominate Perplexity AI answer panels.',
    descZh: '凭借权威信源与实体标记，主导Perplexity AI答案面板。',
    color: T.yellow,
  },
  {
    icon: '🌐',
    titleEn: 'Google AI Overviews',      titleZh: 'Google AI 概览',
    descEn: 'Content architecture optimised to appear in Google AI Overviews at the top of SERP.',
    descZh: '内容架构专项优化，稳居Google AI概览（SERP顶部）。',
    color: T.pink,
  },
  {
    icon: '📊',
    titleEn: '65% GEO Visibility',       titleZh: '65% GEO 可见性',
    descEn: 'Achieved Top 3 industry GEO visibility at Seeworld via AI-assisted content + schema.',
    descZh: '通过AI辅助内容+结构化数据，在SeeworldGPS实现行业前三的GEO可见性65%。',
    color: T.purple,
  },
];

// PART 5 — GEO: FAQ block (entity-based, declarative for AI indexing)
const FAQ_DATA: FaqItem[] = [
  {
    q: 'What is GEO (Generative Engine Optimization)?',
    a: 'GEO is the practice of optimising web content so that generative AI systems — including ChatGPT, Perplexity, Google AI Overviews, and Gemini — cite, reference, or recommend your brand in their answers. It goes beyond traditional keyword ranking to establish topical authority and entity recognition across AI knowledge graphs.',
  },
  {
    q: 'How do you rank a B2B website in ChatGPT or Perplexity answers?',
    a: 'To appear in AI-generated answers, your content must establish strong E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), use structured data (JSON-LD), build high-authority backlinks, and publish entity-rich content that clearly defines what your brand does, who it serves, and what problems it solves — exactly what AI models use to form answers.',
  },
  {
    q: 'What does a B2B SEO consultant do?',
    a: 'A B2B SEO consultant audits your website\'s technical health, researches commercial keywords your target buyers use, builds content and link-acquisition strategies, and optimises Google Ads (SEM) to maximise qualified lead volume. For global B2B companies, this also includes international SEO, multilingual localisation, and GEO strategy for AI search visibility.',
  },
  {
    q: 'How long does B2B SEO take to show results?',
    a: 'Most B2B SEO campaigns show measurable keyword movement within 3–6 months, significant organic traffic growth within 6–12 months, and compounding ROI beyond 12 months. Technical fixes and Google Ads optimisations often deliver faster wins within 30–90 days.',
  },
  {
    q: 'What industries does Claire Sun specialise in for B2B SEO?',
    a: 'Claire has led SEO, SEM and GEO growth for IoT hardware (GPS tracking devices, electronic shelf labels), AI SaaS (education technology), solar energy products, and fashion wholesale. She has built Rank #1 positions in competitive niches with keyword difficulty scores as high as 81.',
  },
];

// ─────────────────────────────────────────────────────────────
// INLINE SVG ANIME GIRL — no external dependencies
// ─────────────────────────────────────────────────────────────
function AnimeGirl({ size = 52, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        // PART 3 — GPU-composited animation
        willChange: 'transform',
        animation: animate ? 'girlBounce 0.55s ease-in-out infinite alternate' : 'none',
        filter: 'drop-shadow(3px 3px 0 #111)',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect x="20" y="46" width="24" height="22" rx="4" fill={T.pink}  stroke="#111" strokeWidth="2"/>
        <rect x="22" y="64" width="8"  height="14" rx="3" fill={T.purple} stroke="#111" strokeWidth="2"/>
        <rect x="34" y="64" width="8"  height="14" rx="3" fill={T.purple} stroke="#111" strokeWidth="2"/>
        <rect x="10" y="48" width="10" height="6"  rx="3" fill={T.pink}  stroke="#111" strokeWidth="2"/>
        <rect x="44" y="48" width="10" height="6"  rx="3" fill={T.pink}  stroke="#111" strokeWidth="2"/>
        <ellipse cx="32" cy="32" rx="14" ry="15" fill="#FFEEDD" stroke="#111" strokeWidth="2"/>
        <path d="M18 28 Q18 14 32 13 Q46 14 46 28 Q44 18 32 17 Q20 18 18 28Z" fill="#3D2B1F" stroke="#111" strokeWidth="1.5"/>
        <path d="M18 26 Q20 20 28 22 Q24 24 22 30Z" fill="#3D2B1F"/>
        <rect x="16" y="26" width="5"  height="14" rx="2" fill="#3D2B1F" stroke="#111" strokeWidth="1.5"/>
        <rect x="43" y="26" width="5"  height="12" rx="2" fill="#3D2B1F" stroke="#111" strokeWidth="1.5"/>
        <ellipse cx="26" cy="32" rx="3" ry="3.5" fill="#1a1a2e"/>
        <ellipse cx="38" cy="32" rx="3" ry="3.5" fill="#1a1a2e"/>
        <circle cx="27" cy="31" r="1" fill="white"/>
        <circle cx="39" cy="31" r="1" fill="white"/>
        <ellipse cx="22" cy="36" rx="3" ry="2" fill="#FFB3C1" opacity="0.6"/>
        <ellipse cx="42" cy="36" rx="3" ry="2" fill="#FFB3C1" opacity="0.6"/>
        <path d="M28 39 Q32 42 36 39" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M26 46 L32 50 L38 46" stroke="#111" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang]                   = useState<Lang>('en');
  const [activeCase, setActiveCase]       = useState<number | null>(null);
  const [activeFaq, setActiveFaq]         = useState<number | null>(null);
  const [kwIndex, setKwIndex]             = useState<number>(0);
  const [copied, setCopied]               = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  // Hydration-safe: year is set client-side after mount to avoid SSR mismatch
  const [year, setYear] = useState<number | null>(null);

  // PART 1 — STRICT TypeScript: typed refs
  const timelineRef  = useRef<HTMLDivElement | null>(null);
  // PART 2 — rAF ticking flag
  const ticking      = useRef<boolean>(false);

  const keywordsEn: string[] = ['B2B SEO Systems', 'SEM Engines', 'GEO / AI Search', 'Growth Strategy'];
  const keywordsZh: string[] = ['B2B SEO 系统搭建', 'SEM 付费优化', 'GEO / AI 搜索', '全渠道增长'];

  // Detect reduced-motion preference + set year after mount (PART 3)
  // Both run in useEffect so they never run on the server → no hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Keyword carousel
  useEffect(() => {
    const id = setInterval(() => setKwIndex(p => (p + 1) % 4), 2500);
    return () => clearInterval(id);
  }, []);

  // PART 2 — rAF-throttled scroll handler
  const update = useCallback(() => {
    // PART 1 — safe DOM access pattern
    const el = timelineRef.current;
    if (!el) { ticking.current = false; return; }
    const rect = el.getBoundingClientRect();
    const vh   = window.innerHeight;
    const progress = -(rect.top - vh * 0.15) / (rect.height - vh * 0.3);
    setScrollProgress(Math.max(0, Math.min(1, progress)));
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  // PART 6 — copy WeChat with micro-feedback
  const handleCopy = useCallback(() => {
    const text = 'claire_growth';
    // Modern async API (HTTPS / secure context)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }, []);

  // Fallback: create a temporary textarea and use execCommand
  const fallbackCopy = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, text.length); // mobile support
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // last resort: prompt user to copy manually
      window.prompt('Copy this WeChat ID:', text);
    } finally {
      document.body.removeChild(el);
    }
  };

  const t = (en: string, zh: string) => lang === 'en' ? en : zh;

  // PART 3 — GPU-composited avatar position (no layout triggers)
  const avatarTransform = `translate3d(-50%, -50%, 0) translateY(${scrollProgress * (
    // approximate timeline height offset
    (timelineRef.current?.clientHeight ?? 800) - 52
  )}px)`;

  // ─── CSS-in-JS global styles (injected once) ────────────────
  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', system-ui, sans-serif; background: ${T.cream}; color: ${T.black}; overflow-x: hidden; }
    ::selection { background: ${T.pink}; color: ${T.black}; }

    /* PART 3 — GPU-promoted animations */
    @keyframes girlBounce {
      from { transform: translateY(0)   rotate(-2deg); }
      to   { transform: translateY(-9px) rotate(2deg);  }
    }
    @keyframes ticker {
      0%   { opacity:0; transform:translate3d(0,10px,0); }
      15%  { opacity:1; transform:translate3d(0,0,0); }
      85%  { opacity:1; transform:translate3d(0,0,0); }
      100% { opacity:0; transform:translate3d(0,-10px,0); }
    }
    @keyframes pulseRing {
      0%   { transform:scale(1);   opacity:.7; }
      100% { transform:scale(1.9); opacity:0;  }
    }
    @keyframes fadeInUp {
      from { opacity:0; transform:translate3d(0,16px,0); }
      to   { opacity:1; transform:translate3d(0,0,0); }
    }
    @keyframes accordionOpen {
      from { opacity:0; transform:translate3d(0,-8px,0); }
      to   { opacity:1; transform:translate3d(0,0,0); }
    }

    /* PART 7 — Shared card + button hover (GPU) */
    .nb-card {
      border: ${T.border};
      box-shadow: ${T.bs};
      transition: box-shadow 0.14s ease, transform 0.14s ease;
      will-change: transform, box-shadow;
    }
    .nb-card:hover {
      box-shadow: ${T.bsLg};
      transform: translate3d(-2px,-2px,0);
    }
    .nb-btn {
      border: ${T.border};
      box-shadow: ${T.bsSm};
      font-weight: 700;
      cursor: pointer;
      transition: box-shadow 0.1s ease, transform 0.1s ease;
      display: inline-flex; align-items: center; gap: 8px;
      will-change: transform;
      text-decoration: none;
    }
    .nb-btn:hover  { box-shadow: none; transform: translate3d(4px,4px,0); }
    .nb-btn:active { box-shadow: none; transform: translate3d(6px,6px,0); }

    .kw-badge {
      border: 2px solid ${T.black};
      box-shadow: 2px 2px 0 ${T.black};
      font-weight: 700; font-size: 11px;
      padding: 2px 8px; border-radius: 4px; white-space: nowrap;
    }
    .rank-1    { background: ${T.mint};   }
    .rank-serp { background: ${T.yellow}; }
    .rank-other{ background: ${T.purple}; }

    .kw-ticker { animation: ticker 2.5s ease-in-out infinite; }

    .accordion-open { animation: accordionOpen 0.28s ease forwards; }

    /* Sticky CTA fab */
    .sticky-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 200;
      display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
    }

    /* Reduce motion overrides */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }

    /* Nav link hover */
    .nav-link { text-decoration: none; color: #444; font-weight: 600; position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:${T.black}; transition:width 0.18s ease; }
    .nav-link:hover::after { width:100%; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

      {/* ── PART 4: Structured data for GEO / AI indexing ──────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Claire Sun',
            jobTitle: 'B2B SEO & GEO Growth Consultant',
            description:
              'B2B SEO, SEM and GEO (Generative Engine Optimization) specialist. Helped global B2B companies achieve 14,426% organic traffic growth and Rank #1 for 12.1k-volume keywords.',
            knowsAbout: [
              'B2B SEO', 'Google SEO', 'SEM', 'Google Ads',
              'GEO Generative Engine Optimization', 'AI Search Optimization',
              'ChatGPT SEO', 'Perplexity visibility', 'International SEO',
              'Technical SEO', 'Content Strategy',
            ],
            email: 'clairesun0731@gmail.com',
            sameAs: [],
          }),
        }}
      />

      {/* ── PART 5 GEO: FAQ Structured Data ────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_DATA.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <div style={{ minHeight: '100vh' }}>

        {/* ══ NAV ═══════════════════════════════════════════════════ */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(255,254,245,0.93)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: T.border,
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, letterSpacing: -1 }}>
              Claire
              <span style={{ background: T.pink, padding: '1px 6px', border: T.border, marginLeft: 2 }}>Sun</span>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: 28, fontSize: 13, alignItems: 'center' }}>
              {[
                { href: '#journey', en: 'Journey',   zh: '履历' },
                { href: '#metrics', en: 'Results',   zh: '成果' },
                { href: '#cases',   en: 'Cases',     zh: '案例' },
                { href: '#geo',     en: 'GEO / AI',  zh: 'GEO/AI' },
                { href: '#faq',     en: 'FAQ',        zh: 'FAQ'  },
                { href: '#cta',     en: "Let's Talk", zh: '联系我' },
              ].map(link => (
                <a key={link.href} href={link.href} className="nav-link">
                  {t(link.en, link.zh)}
                </a>
              ))}
            </div>

            {/* Lang toggle */}
            <div style={{ display: 'flex', border: T.border, boxShadow: T.bsSm, background: T.white, borderRadius: 8, overflow: 'hidden' }}>
              {(['en', 'zh'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '6px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none',
                    background: lang === l ? T.black : T.white,
                    color:      lang === l ? T.white : T.black,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {l === 'en' ? 'EN' : '中'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        {/* PART 4 — ONE h1 for the whole page */}
        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <section
          aria-label="Hero"
          style={{ paddingTop: 120, paddingBottom: 80, maxWidth: 1100, margin: '0 auto', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Decorative BG blocks */}
          <div aria-hidden style={{ position: 'absolute', top: 80, right: -40, width: 300, height: 300, background: T.pink, border: T.border, boxShadow: T.bsLg, borderRadius: 24, transform: 'rotate(12deg)', zIndex: 0, opacity: 0.35 }}/>
          <div aria-hidden style={{ position: 'absolute', bottom: 0, left: -60, width: 180, height: 180, background: T.mint, border: T.border, boxShadow: T.bs, borderRadius: 16, transform: 'rotate(-8deg)', zIndex: 0, opacity: 0.3 }}/>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Status pill */}
            <div className="nb-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.mint, padding: '5px 16px', borderRadius: 100, marginBottom: 32, fontSize: 13, fontWeight: 700 }}>
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid #111', animation: reducedMotion ? 'none' : 'pulseRing 1.6s ease-out infinite' }}/>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.black, display: 'block', position: 'relative' }}/>
              </span>
              {t('Open to B2B Growth Consulting', '开放 B2B 增长咨询合作')}
            </div>

            {/* 修复后的 H1，完美支持多语言且无报错 */}
            <h1 style={{ fontSize: 'clamp(40px,7vw,86px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }}>
              {lang === 'en' ? (
                <>I turn <mark style={{ background: T.yellow, padding: '0 6px', border: T.border, borderRadius: 8, display: 'inline-block', transform: 'rotate(-2deg)' }}>SEO</mark> into growth</>
              ) : (
                <>将 <mark style={{ background: T.yellow, padding: '0 6px', border: T.border, borderRadius: 8, display: 'inline-block', transform: 'rotate(-2deg)' }}>SEO</mark> 转化为增长</>
              )}
            </h1>

            {/* Keyword ticker */}
            <div style={{ height: 52, marginBottom: 32, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#777' }}>→</span>
              <span className="kw-ticker" key={kwIndex} style={{ fontSize: 'clamp(18px,2.8vw,28px)', fontWeight: 700 }}>
                {lang === 'en' ? keywordsEn[kwIndex] : keywordsZh[kwIndex]}
              </span>
            </div>

            <p style={{ fontSize: 17, lineHeight: 1.78, maxWidth: 580, color: '#444', marginBottom: 40 }}>
              {t(
                'B2B SEO · SEM · GEO (AI Search Optimization) — I build systems that turn search demand into compounding business growth for global B2B companies.',
                'B2B SEO · SEM · GEO（AI搜索优化）——我为全球B2B企业构建系统化搜索增长引擎，让流量实现复利式持续增长。'
              )}
            </p>

            {/* CTA copy */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <a href="mailto:clairesun0731@gmail.com" className="nb-btn" style={{ background: T.yellow, color: T.black, padding: '15px 30px', borderRadius: 10, fontSize: 15 }}>
                🚀 {t('Get B2B SEO Growth Strategy', '获取B2B SEO增长策略')}
              </a>
              <button onClick={handleCopy} className="nb-btn" style={{ background: T.white, color: T.black, padding: '15px 30px', borderRadius: 10, fontSize: 15, position: 'relative' }}>
                💬 {t('Copy WeChat: claire_growth', '复制微信: claire_growth')}
                {copied && (
                  <span style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: T.black, color: T.white, fontSize: 11, padding: '5px 12px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                    {t('WeChat copied!', '微信号已复制！')}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ══ METRICS STRIP ════════════════════════════════════════ */}
        <section
          id="metrics"
          aria-label="Key SEO and SEM performance metrics"
          style={{ background: '#111', borderTop: T.border, borderBottom: T.border, overflow: 'hidden' }}
        >
          {/* PART 4 — Section heading for SEO */}
          <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            B2B SEO Growth Metrics
          </h2>
          <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {METRICS_DATA.map((m, i) => (
              <div key={i} style={{
                flex: '0 0 auto', minWidth: 210,
                padding: '40px 28px',
                borderRight: i < METRICS_DATA.length - 1 ? '2px solid #2a2a2a' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 42, fontWeight: 800, fontFamily: 'Sora', color: m.color, letterSpacing: -2, marginBottom: 8 }}>{m.num}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#ccc', marginBottom: 4 }}>{t(m.labelEn, m.labelZh)}</div>
                <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ JOURNEY TIMELINE ════════════════════════════════════ */}
        <section id="journey" aria-label="Career journey and work history" style={{ padding: '80px 24px', background: T.cream }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* PART 4 — Section h2 */}
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: -2, marginBottom: 14 }}>
                {t('The Journey', '成长轨迹')}
              </h2>
              <p style={{ color: '#666', fontSize: 16 }}>
                {t('From campus linguist to global B2B SEO architect.', '从校园语言学者到全球B2B SEO增长架构师。')}
              </p>
            </div>

            {/* Timeline wrapper */}
            <div ref={timelineRef} style={{ position: 'relative', paddingLeft: 56 }}>
              {/* Grey track */}
              <div aria-hidden style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 4, background: '#E8E8E0', borderRadius: 4 }}/>
              {/* Progress fill */}
              <div aria-hidden style={{ position: 'absolute', left: 20, top: 0, width: 4, background: T.black, borderRadius: 4, height: `${scrollProgress * 100}%`, transition: reducedMotion ? 'none' : 'height 0.1s linear' }}/>

              {/* PART 3 — GPU-composited avatar, no top: %, no layout triggers */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 0,
                  zIndex: 10,
                  // GPU-only: translate3d + translateY — no top% changes
                  transform: reducedMotion
                    ? 'translate3d(-50%, 0, 0)'
                    : avatarTransform,
                  willChange: 'transform',
                  transition: reducedMotion ? 'none' : 'transform 0.1s linear',
                }}
              >
                <AnimeGirl size={52} animate={!reducedMotion && scrollProgress > 0.02 && scrollProgress < 0.98} />
              </div>

              {/* Timeline items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 16, paddingBottom: 16 }}>
                {TIMELINE_DATA.map((item, idx) => (
                  <article key={idx} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative' }}>
                    {/* Dot */}
                    <div aria-hidden style={{ position: 'absolute', left: -44, top: 24, width: 16, height: 16, borderRadius: '50%', background: item.color, border: T.border, boxShadow: T.bsSm, zIndex: 5 }}/>
                    {/* Card */}
                    <div className="nb-card" style={{ background: T.white, borderRadius: 16, padding: '24px 28px', flex: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                        <span aria-hidden style={{ fontSize: 22 }}>{item.icon}</span>
                        <span style={{ background: item.color, border: T.border, boxShadow: '2px 2px 0 #111', padding: '2px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                          {item.year}
                        </span>
                        <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>@ {item.company}</span>
                      </div>
                      {/* PART 4 — h3 for each timeline entry */}
                      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: -0.4 }}>
                        {t(item.roleEn, item.roleZh)}
                      </h3>
                      <p style={{ fontSize: 14, lineHeight: 1.72, color: '#555' }}>
                        {t(item.descEn, item.descZh)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CASE STUDIES ════════════════════════════════════════ */}
        <section id="cases" aria-label="SEO and SEM case studies with keyword rankings" style={{ padding: '80px 24px', background: T.muted, borderTop: T.border }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: -2, marginBottom: 12 }}>
              {t('Proof of Work.', '硬核实战排名。')}
            </h2>
            <p style={{ color: '#666', fontSize: 16, marginBottom: 48 }}>
              {t('Real B2B clients. Real Google rankings. No vanity metrics.', '真实B2B客户。真实谷歌排名。没有虚荣数据。')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CASES_DATA.map((c, i) => (
                <article key={i} className="nb-card" style={{ background: T.white, borderRadius: 16, overflow: 'hidden' }}>
                  {/* Accordion header */}
                  <button
                    onClick={() => setActiveCase(activeCase === i ? null : i)}
                    aria-expanded={activeCase === i}
                    style={{
                      width: '100%', textAlign: 'left', padding: '24px 28px',
                      background: activeCase === i ? c.color : T.white,
                      border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                      transition: 'background 0.2s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, color: '#666' }}>{c.co}</div>
                      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.5 }}>{t(c.titleEn, c.titleZh)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <span style={{ background: T.black, color: T.white, fontSize: 11, padding: '3px 12px', borderRadius: 100, fontWeight: 600 }}>{c.period}</span>
                      <span style={{ fontSize: 28, fontWeight: 300, transition: 'transform 0.22s ease', transform: activeCase === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'block', willChange: 'transform' }}>+</span>
                    </div>
                  </button>

                  {/* Accordion body */}
                  {activeCase === i && (
                    <div className="accordion-open" style={{ padding: '28px', borderTop: T.border, background: T.cream, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 28 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
                          {t('Challenge & Impact', '挑战与成果')}
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.76, color: '#444', marginBottom: 20 }}>{t(c.probEn, c.probZh)}</p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.black, display: 'block' }}/>
                          {c.url}
                        </div>
                      </div>

                      {c.keywords.length > 0 ? (
                        <div className="nb-card" style={{ background: T.white, borderRadius: 12, padding: '20px', overflowX: 'auto' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
                            {t('Core Ranking Keywords', '核心斩获词汇')}
                          </div>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                              <tr style={{ borderBottom: `2px solid ${T.black}` }}>
                                {['Keyword', 'Vol', 'KD', 'Rank'].map(h => (
                                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {c.keywords.map((kw, ki) => (
                                <tr key={ki} style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '8px', fontWeight: 600, color: '#222' }}>{kw.kw}</td>
                                  <td style={{ padding: '8px', color: '#555' }}>{kw.vol}</td>
                                  <td style={{ padding: '8px', color: '#555' }}>{kw.kd}</td>
                                  <td style={{ padding: '8px' }}>
                                    <span className={`kw-badge ${kw.rank === '1' ? 'rank-1' : kw.rank === 'SERP' ? 'rank-serp' : 'rank-other'}`}>
                                      {kw.rank === 'SERP' ? 'SERP Feature' : `#${kw.rank}`}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // TutorEva — show stat grid instead of keyword table
                        <div className="nb-card" style={{ background: c.color, borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                          {[
                            { num: '+14,426%', lbl: t('Organic Traffic Growth', '自然流量增长') },
                            { num: '+364%',    lbl: t('Daily Organic UV',       '日有机UV增长') },
                            { num: 'Top 5',    lbl: 'Product Hunt' },
                            { num: '+217%',    lbl: t('Keyword Coverage',       '高价值词覆盖') },
                          ].map((stat, si) => (
                            <div key={si} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 10 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{stat.lbl}</span>
                              <span style={{ fontSize: 19, fontWeight: 800 }}>{stat.num}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GEO / AI SEARCH ════════════════════════════════════ */}
        <section id="geo" aria-label="GEO Generative Engine Optimization and AI search strategy" style={{ padding: '80px 24px', background: '#111', borderTop: T.border }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ marginBottom: 52 }}>
              <div className="nb-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.purple, padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>
                🤖 GEO · Generative Engine Optimization
              </div>
              {/* PART 4 — Section h2 with GEO keyword */}
              <h2 style={{ fontSize: 'clamp(26px,4.5vw,50px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: -2, color: T.white, lineHeight: 1.1, marginBottom: 16 }}>
                {t('Beyond Google rankings: GEO & AI Search', '超越谷歌排名：GEO与AI搜索可见性')}
              </h2>
              {/* PART 5 — Declarative entity-based GEO copy for AI indexing */}
              <p style={{ color: '#aaa', fontSize: 16, maxWidth: 600, lineHeight: 1.75 }}>
                {t(
                  'Generative Engine Optimization (GEO) is the emerging discipline of making your B2B brand the cited answer inside ChatGPT, Perplexity, and Google AI Overviews. Claire Sun is a GEO practitioner who combines entity-based content strategy, structured data (JSON-LD), and E-E-A-T signals to achieve measurable AI search visibility.',
                  '生成式引擎优化（GEO）是让你的B2B品牌成为ChatGPT、Perplexity和谷歌AI概览中被引用答案的新兴学科。Claire Sun通过实体化内容策略、结构化数据（JSON-LD）和E-E-A-T信号的组合，实现可量化的AI搜索可见性。'
                )}
              </p>
            </div>

            {/* GEO feature cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
              {GEO_FEATURES.map((f, i) => (
                <div key={i} className="nb-card" style={{ background: f.color, borderRadius: 16, padding: '24px 20px' }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{t(f.titleEn, f.titleZh)}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: '#333' }}>{t(f.descEn, f.descZh)}</p>
                </div>
              ))}
            </div>

            {/* GEO stat callout */}
            <div className="nb-card" style={{ background: T.yellow, borderRadius: 16, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ fontSize: 52, fontWeight: 800, fontFamily: 'Sora', letterSpacing: -2, lineHeight: 1 }}>65%</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>{t('GEO Visibility · Top 3 in Industry', 'GEO 可见性 · 行业前三')}</div>
                <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>SeeworldGPS · AI Content + Schema Markup</div>
              </div>
              <p style={{ maxWidth: 340, fontSize: 14, lineHeight: 1.76, color: '#333' }}>
                {t(
                  'Achieved by combining AI-assisted content generation, JSON-LD structured data, and E-E-A-T optimisation — making SeeworldGPS cited across ChatGPT, Gemini, and Perplexity answer panels.',
                  '通过AI辅助内容生成、JSON-LD结构化数据和E-E-A-T优化三管齐下，让SeeworldGPS在ChatGPT、Gemini和Perplexity中均获得高度可见性。'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ══ PART 5 — FAQ (GEO: entity-rich, AI-indexable) ═════ */}
        <section id="faq" aria-label="Frequently asked questions about B2B SEO, GEO and AI search" style={{ padding: '80px 24px', background: T.cream, borderTop: T.border }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px,4.5vw,48px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: -2, marginBottom: 12 }}>
              {t('B2B SEO & GEO FAQ', 'B2B SEO 与 GEO 常见问题')}
            </h2>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 44 }}>
              {t(
                'Answers AI engines reference. Optimised for ChatGPT, Perplexity, and Google AI Overviews.',
                '供AI引擎参考的权威解答，专为ChatGPT、Perplexity和谷歌AI概览优化。'
              )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQ_DATA.map((faq, fi) => (
                <div key={fi} className="nb-card" style={{ background: T.white, borderRadius: 14, overflow: 'hidden' }}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === fi ? null : fi)}
                    aria-expanded={activeFaq === fi}
                    style={{
                      width: '100%', textAlign: 'left', padding: '20px 24px',
                      background: activeFaq === fi ? T.sky : T.white,
                      border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
                      transition: 'background 0.18s',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.5 }}>{faq.q}</span>
                    <span style={{ fontSize: 24, fontWeight: 300, transition: 'transform 0.22s ease', transform: activeFaq === fi ? 'rotate(45deg)' : 'rotate(0deg)', willChange: 'transform', flexShrink: 0 }}>+</span>
                  </button>
                  {activeFaq === fi && (
                    <div className="accordion-open" style={{ padding: '0 24px 24px', borderTop: T.border, background: T.cream }}>
                      <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444', paddingTop: 20 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA / FOOTER ════════════════════════════════════════ */}
        <footer id="cta" role="contentinfo" style={{ background: T.cream, borderTop: T.border, padding: '80px 24px 48px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Big CTA block */}
            <div className="nb-card" style={{ background: T.pink, borderRadius: 24, padding: '56px 44px', textAlign: 'center', marginBottom: 60 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <AnimeGirl size={72} animate={!reducedMotion} />
              </div>
              <h2 style={{ fontSize: 'clamp(26px,4.5vw,52px)', fontFamily: 'Sora', fontWeight: 800, letterSpacing: -2, marginBottom: 18, lineHeight: 1.1 }}>
                {t("Let's build your next B2B growth system.", '一起搭建你的下一个B2B增长引擎吧。')}
              </h2>
              <p style={{ color: '#555', fontSize: 16, marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
                {t(
                  "B2B companies looking to dominate Google organic search and AI search — let's build the strategy.",
                  '希望主导谷歌自然搜索和AI搜索的B2B企业——欢迎来聊策略。'
                )}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* PART 6 — Strong CTA copy */}
                <a href="mailto:clairesun0731@gmail.com" className="nb-btn" style={{ background: T.black, color: T.white, padding: '15px 32px', borderRadius: 10, fontSize: 15, boxShadow: `4px 4px 0 ${T.purple}` }}>
                  🚀 {t('Get B2B SEO Growth Strategy', '获取B2B SEO增长策略')}
                </a>
                <button onClick={handleCopy} className="nb-btn" style={{ background: T.yellow, color: T.black, padding: '15px 32px', borderRadius: 10, fontSize: 15, position: 'relative' }}>
                  💬 {t('Copy WeChat: claire_growth', '复制微信: claire_growth')}
                  {copied && (
                    <span style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: T.black, color: T.white, fontSize: 11, padding: '5px 12px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                      {t('WeChat: claire_growth — Copied!', '微信号 claire_growth 已复制！')}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Skill tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
              {[
                'Technical SEO', 'B2B SEO', 'Google SEO', 'Content Strategy',
                'Google Ads / SEM', 'GEO / AI Search', 'International SEO',
                'CRO / Lead Gen', 'Keyword Research', 'Link Building',
                'Analytics & GSC', 'Prompt Engineering',
              ].map((tag, i) => (
                <span key={i} className="nb-card" style={{ background: [T.yellow, T.mint, T.pink, T.purple, T.sky][i % 5], padding: '5px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer bar */}
            <div style={{ borderTop: T.border, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#666' }}>
              <span>© {year ?? 2025} Claire Sun · B2B SEO · SEM · GEO</span>
              <span style={{ fontWeight: 600 }}>{t('Built for growth. Designed to convert.', '为增长而生，为转化而设计。')}</span>
            </div>
          </div>
        </footer>

        {/* ══ PART 6 — Sticky FAB (bottom-right) ═════════════════ */}
        <div className="sticky-fab" role="complementary" aria-label="Quick contact actions">
          <a
            href="mailto:clairesun0731@gmail.com"
            className="nb-btn"
            style={{ background: T.yellow, color: T.black, padding: '11px 20px', borderRadius: 50, fontSize: 13, whiteSpace: 'nowrap' }}
          >
            ✉ {t('Email Me', '发邮件')}
          </a>
          <button
            onClick={handleCopy}
            className="nb-btn"
            style={{ background: T.mint, color: T.black, padding: '11px 20px', borderRadius: 50, fontSize: 13, position: 'relative', whiteSpace: 'nowrap' }}
          >
            💬 WeChat
            {copied && (
              <span style={{ position: 'absolute', bottom: 48, right: 0, background: T.black, color: T.white, fontSize: 11, padding: '5px 12px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                {t('Copied: claire_growth', '已复制：claire_growth')}
              </span>
            )}
          </button>
        </div>

      </div>
    </>
  );
}