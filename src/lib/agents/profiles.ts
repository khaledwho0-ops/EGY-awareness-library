/**
 * ══════════════════════════════════════════════════════════
 *  AI AGENT PROFILES — The Five Pillars of Truth
 * ══════════════════════════════════════════════════════════
 */

import type { AgentProfile } from './types';

export const AGENT_PROFILES: AgentProfile[] = [
  {
    id: 'source-hunter',
    name: 'Source Hunter',
    nameAr: 'صياد المصادر',
    role: 'Origin Tracer',
    avatar: '🔍',
    specialty: 'Traces claim origins across global databases, identifies Patient Zero, and maps the propagation chain from inception to viral spread.',
    tools: [
      'OpenAlex Academic Search',
      'EuropePMC Literature Scan',
      'Snopes Archive Cross-Reference',
      'IFCN Verified Claims Database',
      'Google Fact Check API',
    ],
  },
  {
    id: 'bias-detector',
    name: 'Bias Detector',
    nameAr: 'كاشف التحيز',
    role: 'Multi-Perspective Analyst',
    avatar: '⚖️',
    specialty: 'Performs multi-perspective analysis to identify cognitive biases, logical fallacies, and rhetorical manipulation tactics embedded in claims.',
    tools: [
      'Cognitive Bias Framework (180+ biases)',
      'Logical Fallacy Classifier',
      'Rhetorical Device Scanner',
      'Sentiment Polarity Analysis',
      'Framing Effect Detector',
    ],
  },
  {
    id: 'arabic-linguist',
    name: 'Arabic Linguist',
    nameAr: 'اللغوي العربي',
    role: 'Dialect & Manipulation Analyst',
    avatar: '📝',
    specialty: 'Analyzes Egyptian Arabic dialect patterns, identifies linguistic manipulation techniques, and detects culturally-specific misinformation markers.',
    tools: [
      'Egyptian Dialect Classifier',
      'Arabic NLP Tokenizer',
      'Religious Text Verification',
      'Colloquial Manipulation Detector',
      'Translation Distortion Scanner',
    ],
  },
  {
    id: 'timeline-builder',
    name: 'Timeline Builder',
    nameAr: 'بانٍ الجدول الزمني',
    role: 'Chronological Spread Tracker',
    avatar: '📊',
    specialty: 'Tracks chronological spread patterns, identifies amplification nodes, and maps the temporal evolution of misinformation campaigns.',
    tools: [
      'Temporal Spread Mapper',
      'Virality Curve Analyzer',
      'Platform Cross-Reference Engine',
      'Bot Network Fingerprinter',
      'Amplification Node Detector',
    ],
  },
  {
    id: 'counter-narrative',
    name: 'Counter-Narrative Expert',
    nameAr: 'خبير الرد المضاد',
    role: 'Cultural Response Strategist',
    avatar: '🛡️',
    specialty: 'Crafts culturally appropriate counter-narratives for the Egyptian audience using truth sandwiches, inoculation theory, and community-resonant framing.',
    tools: [
      'Truth Sandwich Generator',
      'Inoculation Theory Engine',
      'Egyptian Cultural Context DB',
      'Community Trust Builder',
      'Shareable Rebuttal Creator',
    ],
  },
];
