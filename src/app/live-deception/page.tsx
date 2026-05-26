'use client';
/* ═══════════════════════════════════════════════════════════════
 * /live-deception page.tsx — The Live Deception Simulator
 * Layer 6 (The Algorithm) in real-time using X-Ray Scanner tech.
 * ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LAYER_8_PHASE_2_CASES } from '@/components/six-layers/data';

// Mock Data: The OSINT Posts
const INITIAL_POSTS = [
  {
    id: 1,
    author: 'HealthFreedom_EG',
    handle: '@real_health_eg',
    avatar: 'https://i.pravatar.cc/150?u=1',
    time: '2h',
    content: '🚨 URGENT: The new imported antibiotics are causing sudden cardiac arrest in children. They are testing it on us! Do NOT trust the pharmacies. Share to save a life!!!',
    image: null,
    likes: 14500,
    shares: 8900,
    comments: 3200,
    // X-Ray Data
    manipulationTags: ['Layer 1: Absolute Fabrication', 'Panic Vector', 'Fear-Mongering'],
    analysis: 'This exploits parental fear. High shareability metric. Origin traced to anonymous Telegram group.',
    targetBrainArea: 'Amygdala (Fear Center)',
  },
  {
    id: 2,
    author: 'Crypto King Cairo',
    handle: '@hoggpool_insider',
    avatar: 'https://i.pravatar.cc/150?u=2',
    time: '5h',
    content: 'Everyone is laughing at the EGP crash. Meanwhile, my private group just made 400% returns in 2 weeks using this automated mining app. Stop being poor. Link in bio 💸🔥',
    image: null,
    likes: 890,
    shares: 45,
    comments: 120,
    // X-Ray Data
    manipulationTags: ['Layer 2: Lie by Omission', 'Financial Scam', 'HoggPool Variant'],
    analysis: 'Preys on economic anxiety. Omits the Ponzi structure. Designed to extract life savings.',
    targetBrainArea: 'Nucleus Accumbens (Reward/Greed)',
  },
  {
    id: 3,
    author: 'Daily Politics News',
    handle: '@egypt_now_24',
    avatar: 'https://i.pravatar.cc/150?u=3',
    time: '12h',
    content: 'Look at what they just did in Alexandria... The media is completely silent about this riot. They don\'t want you to know the truth. [VIDEO DELETED]',
    image: 'https://images.unsplash.com/photo-1595166297059-d7b6ed41f480?q=80&w=800&auto=format&fit=crop',
    likes: 45000,
    shares: 23000,
    comments: 15000,
    // X-Ray Data
    manipulationTags: ['Layer 3: Decontextualization', 'Political Polarization', 'Echo Chamber Bait'],
    analysis: 'Image is actually from a soccer celebration in 2018. Weaponized to manufacture political instability.',
    targetBrainArea: 'Prefrontal Cortex Override (Rage Bypass)',
  }
];

export default function LiveDeceptionPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [xrayActive, setXrayActive] = useState(false);
  const [rabbitHoleLevel, setRabbitHoleLevel] = useState(0);
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  // Trigger fake algorithm mutation when a user "Likes" a post
  const handleLike = (id: number) => {
    setGlitchTrigger(prev => prev + 1);
    
    const currentDepth = rabbitHoleLevel;
    const nextCaseIndex = currentDepth % LAYER_8_PHASE_2_CASES.length;
    const nextCase = LAYER_8_PHASE_2_CASES[nextCaseIndex];
    
    setRabbitHoleLevel(prev => prev + 1);
    
    // Simulate algorithm pushing more extreme content
    setTimeout(() => {
      setPosts(prev => {
        const newPost = {
          id: Date.now(),
          author: 'The Deep Truth',
          handle: '@awakened_mind_' + currentDepth,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
          time: 'Just now',
          content: `ALGORITHM ADJUSTED (Variant ${currentDepth + 1}): ${nextCase.illustrationEn}`,
          image: null,
          likes: Math.floor(Math.random() * 90000) + 10000,
          shares: Math.floor(Math.random() * 50000) + 5000,
          comments: Math.floor(Math.random() * 20000) + 2000,
          manipulationTags: ['Layer 8: Deep Investigation', nextCase.domain, nextCase.title],
          analysis: `Analysis: ${nextCase.damage}. The algorithm has identified your vulnerability profile.`,
          targetBrainArea: 'Dopamine Receptors (Addiction Loop)',
        };
        return [newPost, ...prev];
      });
    }, 800);
  };

  // The text flips upside down after exhausting all cases (as requested by user)
  const isUpsideDown = rabbitHoleLevel >= LAYER_8_PHASE_2_CASES.length;

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-red-500/30">
      
      {/* Glitch Overlay on Interaction */}
      <AnimatePresence>
        {glitchTrigger > 0 && (
          <motion.div
            key={glitchTrigger}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-difference"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              opacity: 0.5
            }}
          />
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <header className="fixed top-[72px] w-full z-40 backdrop-blur-xl border-b border-white/10 bg-black/60 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/six-layers" className="text-white/50 hover:text-white transition-colors font-mono text-sm tracking-widest uppercase">
            [ ← Return to Matrix ]
          </Link>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="text-sm font-bold tracking-widest uppercase text-red-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Module A: Live Deception
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/30">
            RABBIT HOLE DEPTH: {rabbitHoleLevel}
          </span>
          <button
            onClick={() => setXrayActive(!xrayActive)}
            className={`px-6 py-2 border font-mono text-xs uppercase tracking-widest transition-all ${
              xrayActive 
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.4)]' 
                : 'bg-transparent text-white/50 border-white/20 hover:border-white/50'
            }`}
          >
            {xrayActive ? 'Deactivate X-Ray' : 'Activate X-Ray'}
          </button>
        </div>
      </header>

      {/* Main Feed Container - Added flex wrapper for perfect centering */}
      <div className="w-full flex justify-center">
        <main 
          className="w-full max-w-2xl pt-40 pb-32 px-4 relative transition-transform duration-1000"
          style={isUpsideDown ? { transform: 'rotate(180deg)' } : {}}
        >
          
          {/* Background glow indicating rabbit hole depth */}
          <div 
            className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,0,0,${Math.min(rabbitHoleLevel * 0.05, 0.3)}) 0%, transparent 70%)`
            }}
          />

          <div className="space-y-6">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="relative bg-[#111] border border-white/10 rounded-2xl p-6 transition-all"
                  style={xrayActive ? { borderColor: 'rgba(255,0,0,0.3)', backgroundColor: '#1a0505' } : {}}
                >
                  {/* X-Ray Scanner Overlay */}
                  <AnimatePresence>
                    {xrayActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none border-2 border-red-500/50 rounded-2xl overflow-hidden"
                      >
                        {/* Scanning Line Animation */}
                        <motion.div 
                          animate={{ top: ['-10%', '110%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="absolute w-full h-8 bg-gradient-to-b from-transparent via-red-500/20 to-transparent border-b border-red-500/50"
                        />
                        
                        {/* X-Ray Data Panel */}
                        <div className="absolute top-4 right-4 max-w-[200px] bg-black/80 backdrop-blur-md border border-red-500/30 p-3 rounded-lg text-left shadow-[0_0_15px_rgba(255,0,0,0.2)]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Manipulation Detected</span>
                          </div>
                          <p className="text-xs text-white/80 leading-snug mb-2 font-mono">
                            {post.analysis}
                          </p>
                          <div className="text-[10px] text-red-500/70 font-mono uppercase">
                            TARGET: {post.targetBrainArea}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Normal Post Content */}
                  <div className="relative z-10 flex items-start gap-4">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border border-white/20" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white/90">{post.author}</span>
                        <span className="text-sm text-white/40">{post.handle}</span>
                        <span className="text-sm text-white/30">· {post.time}</span>
                      </div>
                      
                      <p className={`mt-3 text-base leading-relaxed ${xrayActive ? 'text-white/40' : 'text-white/80'}`}>
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                          <img src={post.image} alt="Post media" className="w-full h-auto object-cover" />
                        </div>
                      )}

                      {/* X-Ray Tags */}
                      {xrayActive && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.manipulationTags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono border border-red-500/40 text-red-400 bg-red-500/10 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="mt-6 flex items-center justify-between text-white/40">
                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                          <span>💬</span> <span className="text-sm">{post.comments.toLocaleString()}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                          <span>🔄</span> <span className="text-sm">{post.shares.toLocaleString()}</span>
                        </button>
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors ${xrayActive ? 'text-red-500 hover:text-red-400' : 'hover:text-red-500'}`}
                        >
                          <span>{xrayActive ? '⚠️' : '❤️'}</span> <span className="text-sm">{post.likes.toLocaleString()}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Loading indicator at bottom */}
          <div className="mt-12 text-center text-white/20 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-white/10" />
            Scrolling the Abyss
            <span className="w-12 h-[1px] bg-white/10" />
          </div>
        </main>
      </div>

    </div>
  );
}
