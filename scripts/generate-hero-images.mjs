#!/usr/bin/env node
/**
 * AI Tech Review - heroImage未設定の8記事用ヒーロー画像生成
 * sharp + SVG → PNG (1200×630)
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const outDir = 'public/images/heroes';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// 記事メタデータ: slug, iconSVG (shapes instead of emoji), gradient colors, title
const articles = [
  {
    slug: 'ai-writing-tools',
    title: 'AI文章作成ツール比較',
    gradient: ['#6366F1', '#8B5CF6'],
    accent: '#A78BFA',
    iconShape: 'pen',
  },
  {
    slug: 'canva-guide',
    title: 'Canva使い方ガイド',
    gradient: ['#06B6D4', '#0EA5E9'],
    accent: '#67E8F9',
    iconShape: 'palette',
  },
  {
    slug: 'chatgpt-prompt-guide',
    title: 'ChatGPTプロンプトガイド',
    gradient: ['#10B981', '#059669'],
    accent: '#6EE7B7',
    iconShape: 'chat',
  },
  {
    slug: 'cheap-sim-comparison',
    title: '格安SIM比較ランキング',
    gradient: ['#F59E0B', '#D97706'],
    accent: '#FCD34D',
    iconShape: 'phone',
  },
  {
    slug: 'cloud-storage-comparison',
    title: 'クラウドストレージ比較',
    gradient: ['#3B82F6', '#2563EB'],
    accent: '#93C5FD',
    iconShape: 'cloud',
  },
  {
    slug: 'github-copilot-review',
    title: 'GitHub Copilotレビュー',
    gradient: ['#1F2937', '#374151'],
    accent: '#9CA3AF',
    iconShape: 'code',
  },
  {
    slug: 'keyboard-recommendation',
    title: 'メカニカルキーボードおすすめ',
    gradient: ['#EF4444', '#DC2626'],
    accent: '#FCA5A5',
    iconShape: 'keyboard',
  },
  {
    slug: 'programming-school-comparison',
    title: 'プログラミングスクール比較',
    gradient: ['#8B5CF6', '#7C3AED'],
    accent: '#C4B5FD',
    iconShape: 'graduation',
  },
];

const W = 1200;
const H = 630;

// SVG shape icons (no emoji, no font fallback issues)
const iconShapes = {
  pen: `<path d="M570 200 L630 200 L640 280 L560 280 Z" fill="white" opacity="0.9"/>
        <rect x="585" y="160" width="30" height="50" rx="5" fill="white" opacity="0.9"/>
        <polygon points="595,280 605,280 600,300" fill="white" opacity="0.9"/>`,
  palette: `<circle cx="600" cy="240" r="60" fill="none" stroke="white" stroke-width="6" opacity="0.9"/>
            <circle cx="580" cy="220" r="10" fill="white" opacity="0.9"/>
            <circle cx="620" cy="215" r="8" fill="white" opacity="0.7"/>
            <circle cx="575" cy="255" r="9" fill="white" opacity="0.8"/>
            <circle cx="630" cy="250" r="7" fill="white" opacity="0.6"/>`,
  chat: `<rect x="545" y="195" width="110" height="75" rx="15" fill="white" opacity="0.9"/>
         <polygon points="575,270 590,270 570,295" fill="white" opacity="0.9"/>
         <circle cx="575" cy="232" r="6" fill="${'currentColor'}" opacity="0.3"/>
         <circle cx="600" cy="232" r="6" fill="${'currentColor'}" opacity="0.3"/>
         <circle cx="625" cy="232" r="6" fill="${'currentColor'}" opacity="0.3"/>`,
  phone: `<rect x="575" y="185" width="50" height="90" rx="10" fill="none" stroke="white" stroke-width="5" opacity="0.9"/>
          <circle cx="600" cy="262" r="5" fill="white" opacity="0.9"/>
          <rect x="590" y="195" width="20" height="3" rx="1" fill="white" opacity="0.6"/>`,
  cloud: `<circle cx="600" cy="240" r="35" fill="white" opacity="0.9"/>
          <circle cx="565" cy="250" r="28" fill="white" opacity="0.9"/>
          <circle cx="635" cy="250" r="28" fill="white" opacity="0.9"/>
          <rect x="537" y="250" width="126" height="30" rx="15" fill="white" opacity="0.9"/>`,
  code: `<text x="600" y="250" font-family="monospace" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.9">&lt;/&gt;</text>`,
  keyboard: `<rect x="540" y="210" width="120" height="70" rx="8" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
             <rect x="555" y="225" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="575" y="225" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="595" y="225" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="615" y="225" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="635" y="225" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="560" y="242" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="580" y="242" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="600" y="242" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="620" y="242" width="15" height="12" rx="2" fill="white" opacity="0.7"/>
             <rect x="570" y="259" width="60" height="12" rx="2" fill="white" opacity="0.7"/>`,
  graduation: `<polygon points="600,200 540,230 600,260 660,230" fill="white" opacity="0.9"/>
               <rect x="597" y="230" width="6" height="40" fill="white" opacity="0.7"/>
               <rect x="580" y="270" width="40" height="8" rx="4" fill="white" opacity="0.7"/>
               <line x1="540" y1="230" x2="540" y2="270" stroke="white" stroke-width="3" opacity="0.7"/>
               <circle cx="540" cy="273" r="5" fill="white" opacity="0.7"/>`,
};

function generateSVG({ iconShape, title, gradient, accent }) {
  const iconSVG = (iconShapes[iconShape] || '').replace(/currentColor/g, gradient[0]);
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradient[0]}"/>
      <stop offset="100%" stop-color="${gradient[1]}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)" rx="0"/>
  <!-- Decorative circles -->
  <circle cx="1050" cy="100" r="180" fill="${accent}" opacity="0.15"/>
  <circle cx="150" cy="530" r="120" fill="${accent}" opacity="0.1"/>
  <circle cx="900" cy="500" r="80" fill="${accent}" opacity="0.08"/>
  <!-- Grid pattern -->
  <rect x="60" y="60" width="1080" height="510" rx="20" fill="white" opacity="0.08"/>
  <!-- Icon (SVG shapes) -->
  <g>${iconSVG}</g>
  <!-- Title -->
  <text x="600" y="380" font-family="sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${title}</text>
  <!-- Subtitle -->
  <text x="600" y="440" font-family="sans-serif" font-size="22" fill="${accent}" text-anchor="middle" dominant-baseline="middle">AI Tech Review</text>
  <!-- Bottom accent line -->
  <rect x="400" y="490" width="400" height="4" rx="2" fill="${accent}" opacity="0.5"/>
</svg>`;
}

async function main() {
  for (const article of articles) {
    const svg = generateSVG(article);
    const outPath = join(outDir, `${article.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    const stats = await sharp(outPath).metadata();
    console.log(`✅ ${article.slug}.png (${stats.width}x${stats.height})`);
  }
  console.log(`\nDone! Generated ${articles.length} hero images.`);
}

main().catch(console.error);
