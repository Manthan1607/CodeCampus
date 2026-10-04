import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { soundFx } from "../utils/audio";

interface StoryScene {
  id: number;
  act: string;
  title: string;
  narrative: string;
  image: string;
  tag: string;
  ctaText: string;
  ctaPath: string;
}

const storyScenes: StoryScene[] = [
  {
    id: 1,
    act: "ACT I: THE SPARK",
    title: "FIRST ALGORITHM",
    narrative: "You write your first LRU Cache algorithm in C++17 late at night. Compiler output: GCC 13.2 Accepted in 12ms (Top 94% execution speed).",
    image: "/assets/story_scene_1.jpg",
    tag: "MODULE 1 · SYSTEM ALGORITHMS",
    ctaText: "PRACTICE ALGORITHM IN IDE →",
    ctaPath: "/ide/1",
  },
  {
    id: 2,
    act: "ACT II: THE CRUCIBLE",
    title: "1v1 BATTLE ARENA",
    narrative: "Step into the esports coding arena. Radar sweeps match you against top solvers nationwide in live side-by-side code diff battles.",
    image: "/assets/story_scene_2.jpg",
    tag: "LIVE BATTLES · REAL-TIME SYNC",
    ctaText: "ENTER 1v1 BATTLES ARENA →",
    ctaPath: "/battles",
  },
  {
    id: 3,
    act: "ACT III: THE MASTERY",
    title: "COLLEGE LEAGUE CUP",
    narrative: "Register your university, lead your campus team to victory, climb the national leaderboard, and claim the Inter-College Trophy Cup.",
    image: "/assets/story_scene_3.jpg",
    tag: "INTER-COLLEGE CHAMPIONSHIP",
    ctaText: "REGISTER COLLEGE TEAM →",
    ctaPath: "/colleges/contests",
  },
  {
    id: 4,
    act: "ACT IV: THE OFFER",
    title: "SENIOR FAANG ROLE",
    narrative: "Pass the 3D AI FAANG technical interview with Dr. Julian Thorne. Land your dream Senior Software Engineer offer letter.",
    image: "/assets/story_scene_4.jpg",
    tag: "FAANG PLACEMENT ARENA",
    ctaText: "TAKE 3D AI MOCK INTERVIEW →",
    ctaPath: "/interview/mock",
  },
];

const STATS = [
  { label: "Active Solvers", value: "48,000+", sub: "● 1,240 Online Now" },
  { label: "Code Submissions", value: "2.4M+", sub: "⚡ 99.8% Compile Rate" },
  { label: "FAANG Offers", value: "1,250+", sub: "🏆 Verified Placements" },
];

export default function LandingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const activeScene = storyScenes[activeSceneIdx];

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Navbar variant="landing" />

      {/* ── REALISTIC DEVELOPER STORY HERO ──────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden bg-[#0D0D0D]">
        
        {/* Story Background Stream Image with Natural Depth & Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {storyScenes.map((sc, idx) => (
            <img
              key={sc.id}
              src={sc.image}
              alt={sc.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-105 contrast-[1.05] brightness-90 ${
                activeSceneIdx === idx ? "opacity-55 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-[#0D0D0D]/70 z-20"></div>
        </div>

        <div className="relative z-30 flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col justify-center pt-28 pb-16">
          
          {/* Story Chapter Selector Bar */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
            {storyScenes.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveSceneIdx(idx);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                  activeSceneIdx === idx
                    ? "bg-[#E44D26] text-white shadow-lg scale-105 border border-[#E44D26]"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {sc.act}
              </button>
            ))}
          </div>

          {/* Full-Width Story Hero Header */}
          <div className="flex flex-col gap-6 text-white max-w-3xl">
            <div
              className={`transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-4 uppercase bg-[#E44D26]/20 border border-[#E44D26]/40 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E44D26] animate-ping"></span>
                {activeScene.tag}
              </div>

              <h1 className="font-display font-black text-[clamp(48px,8vw,110px)] leading-[0.88] tracking-tight uppercase drop-shadow-md">
                {activeScene.title}
              </h1>
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-white/90 text-base leading-relaxed font-mono bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 max-w-2xl">
                "{activeScene.narrative}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                to={activeScene.ctaPath}
                onClick={() => soundFx.playSuccess()}
                className="bg-[#E44D26] text-white font-mono font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-2xl"
              >
                {activeScene.ctaText}
              </Link>
            </div>

            {/* Platform Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-4 border-t border-white/15 max-w-2xl">
              {STATS.map((st) => (
                <div key={st.label} className="bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="font-display font-black text-2xl text-white">{st.value}</div>
                  <div className="text-[10px] font-mono text-white/60 font-bold uppercase mt-0.5">{st.label}</div>
                  <div className="text-[9px] font-mono text-[#28C840] mt-1">{st.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0D0D0D] text-white border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-2">JOIN CODECAMPUS</div>
          <h2 className="font-display font-black text-4xl uppercase mb-6">START YOUR DEVELOPER NARRATIVE TODAY</h2>
          <Link
            to="/onboarding"
            className="bg-[#E44D26] text-white font-mono font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-xl"
          >
            CREATE YOUR PROFILE →
          </Link>
        </div>
      </section>
    </div>
  );
}
